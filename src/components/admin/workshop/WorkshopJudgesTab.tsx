import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Judge {
  id: string;
  user_id: string;
  assigned_at: string;
  profiles: {
    full_name: string;
    email: string;
  } | null;
}

const WorkshopJudgesTab = ({ workshopId }: { workshopId: string }) => {
  const { toast } = useToast();
  const [judges, setJudges] = useState<Judge[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [foundUser, setFoundUser] = useState<any>(null);

  useEffect(() => {
    fetchJudges();

    // Real-time subscription for judge assignments
    const channel = supabase
      .channel('workshop-judges-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workshop_judges',
          filter: `workshop_id=eq.${workshopId}`
        },
        () => fetchJudges()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [workshopId]);

  const fetchJudges = async () => {
    try {
      const { data: judgesData, error: judgesError } = await supabase
        .from('workshop_judges')
        .select('id, user_id, assigned_at')
        .eq('workshop_id', workshopId)
        .order('assigned_at', { ascending: false });

      if (judgesError) {
        console.error('Error fetching workshop judges:', judgesError);
        throw judgesError;
      }

      if (!judgesData || judgesData.length === 0) {
        setJudges([]);
        return;
      }

      // Fetch profile data separately
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', judgesData.map(j => j.user_id));

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        // Continue with partial data if profiles fetch fails
      }

      // Combine the data
      const combinedData = judgesData.map(judge => ({
        ...judge,
        profiles: profilesData?.find(p => p.id === judge.user_id) || {
          full_name: 'Unknown',
          email: 'N/A'
        }
      }));

      setJudges(combinedData);
    } catch (error: any) {
      console.error('Error in fetchJudges:', error);
      toast({ 
        title: "Error loading judges", 
        description: error.message || "Check console for details.",
        variant: "destructive" 
      });
      setJudges([]);
    }
  };

  const searchUser = async () => {
    if (!searchEmail) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .eq('email', searchEmail)
      .single();

    if (error || !data) {
      toast({ title: "User not found", variant: "destructive" });
      setFoundUser(null);
    } else {
      setFoundUser(data);
    }
  };

  const handleAssignJudge = async () => {
    if (!foundUser) return;

    try {
      // Check database directly for existing assignment to avoid race conditions
      const { data: existingAssignment, error: checkError } = await supabase
        .from('workshop_judges')
        .select('id')
        .eq('workshop_id', workshopId)
        .eq('user_id', foundUser.id)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing assignment:', checkError);
        toast({ 
          title: "Error checking assignment", 
          description: checkError.message,
          variant: "destructive" 
        });
        return;
      }

      if (existingAssignment) {
        toast({ 
          title: "Already assigned", 
          description: "This user is already a judge for this workshop",
          variant: "destructive" 
        });
        return;
      }

      // First, ensure user has judge role
      const { error: roleError } = await supabase
        .from('user_roles')
        .upsert({
          user_id: foundUser.id,
          role: 'judge'
        }, {
          onConflict: 'user_id,role'
        });

      if (roleError) {
        console.error('Role assignment error:', roleError);
        toast({ 
          title: "Error assigning judge role", 
          description: roleError.message,
          variant: "destructive" 
        });
        return;
      }

      // Then assign to workshop
      const { error: assignError } = await supabase
        .from('workshop_judges')
        .insert([{
          workshop_id: workshopId,
          user_id: foundUser.id,
        }]);

      if (assignError) {
        console.error('Workshop judge assignment error:', assignError);
        toast({ 
          title: "Error assigning judge to workshop", 
          description: assignError.message,
          variant: "destructive" 
        });
      } else {
        toast({ title: "Judge assigned successfully ✅" });
        setShowDialog(false);
        setSearchEmail("");
        setFoundUser(null);
        // fetchJudges will be triggered by realtime subscription
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
      toast({ 
        title: "Unexpected error", 
        description: err.message,
        variant: "destructive" 
      });
    }
  };

  const handleRemove = async (id: string) => {
    if (confirm('Remove this judge from the workshop?')) {
      const { error } = await supabase
        .from('workshop_judges')
        .delete()
        .eq('id', id);

      if (error) {
        toast({ title: "Error removing judge", variant: "destructive" });
      } else {
        toast({ title: "Judge removed successfully" });
        fetchJudges();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Judges</h2>
          <p className="text-muted-foreground">Assign judges to this workshop</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Assign Judge
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Judge</DialogTitle>
              <DialogDescription>Search for a user by email to assign as judge</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>User Email</Label>
                <div className="flex gap-2">
                  <Input
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    placeholder="user@example.com"
                    onKeyDown={(e) => e.key === 'Enter' && searchUser()}
                  />
                  <Button onClick={searchUser}>Search</Button>
                </div>
              </div>
              {foundUser && (
                <div className="p-4 border rounded-lg space-y-2">
                  <p className="font-medium">{foundUser.full_name}</p>
                  <p className="text-sm text-muted-foreground">{foundUser.email}</p>
                  <Button onClick={handleAssignJudge} className="w-full">
                    Assign as Judge
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Judges ({judges.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Assigned Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {judges.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No judges assigned yet. Click "Assign Judge" to add one.
                  </TableCell>
                </TableRow>
              ) : (
                judges.map((judge) => (
                  <TableRow key={judge.id}>
                    <TableCell className="font-medium">
                      {judge.profiles?.full_name || 'N/A'}
                    </TableCell>
                    <TableCell>{judge.profiles?.email || 'N/A'}</TableCell>
                    <TableCell>{new Date(judge.assigned_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="destructive" onClick={() => handleRemove(judge.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkshopJudgesTab;
