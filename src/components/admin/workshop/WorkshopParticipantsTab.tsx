import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, User, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Participant {
  id: string;
  user_id: string;
  status: string;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
    mobile_number: string | null;
  } | null;
  group_info?: {
    group_name: string;
    group_code: string;
  } | null;
  tasks_completed?: number;
}

interface GroupWithMembers {
  id: string;
  group_name: string;
  group_code: string;
  members: Participant[];
}

const WorkshopParticipantsTab = ({ workshopId }: { workshopId: string }) => {
  const { toast } = useToast();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"all" | "teams">("all");
  const [groupedData, setGroupedData] = useState<GroupWithMembers[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParticipants();

    // Real-time subscription
    const channel = supabase
      .channel('workshop-participants-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_workshops',
          filter: `workshop_id=eq.${workshopId}`
        },
        () => fetchParticipants()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [workshopId]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredParticipants(
        participants.filter(p => 
          p.profiles?.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.profiles?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.group_info?.group_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredParticipants(participants);
    }
  }, [searchQuery, participants]);

  useEffect(() => {
    // Group participants by team
    const groups: { [key: string]: GroupWithMembers } = {};
    
    filteredParticipants.forEach(p => {
      if (p.group_info) {
        const groupId = p.group_info.group_code;
        if (!groups[groupId]) {
          groups[groupId] = {
            id: groupId,
            group_name: p.group_info.group_name,
            group_code: p.group_info.group_code,
            members: []
          };
        }
        groups[groupId].members.push(p);
      }
    });

    setGroupedData(Object.values(groups));
  }, [filteredParticipants]);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      
      // Fetch participants with profiles in one query
      const { data: participantsData, error } = await supabase
        .from('user_workshops')
        .select(`
          id,
          user_id,
          status,
          created_at,
          profiles (
            full_name,
            email,
            mobile_number
          )
        `)
        .eq('workshop_id', workshopId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching participants:', error);
        toast({ 
          title: "Error loading participants", 
          description: error.message,
          variant: "destructive" 
        });
        setLoading(false);
        return;
      }

      if (!participantsData || participantsData.length === 0) {
        setParticipants([]);
        setLoading(false);
        return;
      }

      const userIds = participantsData.map(p => p.user_id);

      // Fetch groups and memberships in parallel
      const [groupsResult, membershipsResult] = await Promise.all([
        supabase
          .from('workshop_groups')
          .select('id, group_name, group_code')
          .eq('workshop_id', workshopId),
        supabase
          .from('group_members')
          .select('user_id, group_id')
          .in('user_id', userIds)
      ]);

      const groupsMap = new Map(groupsResult.data?.map(g => [g.id, g]) || []);
      
      // Create map of user_id to group info
      const userGroupsMap = new Map();
      membershipsResult.data?.forEach(m => {
        const group = groupsMap.get(m.group_id);
        if (group) {
          userGroupsMap.set(m.user_id, { ...group, id: m.group_id });
        }
      });

      // Fetch task counts for groups that exist
      const groupIds = Array.from(groupsMap.keys());
      let groupTaskCounts = new Map();
      
      if (groupIds.length > 0) {
        const { data: submissions } = await supabase
          .from('team_task_submissions')
          .select('group_id')
          .in('group_id', groupIds)
          .eq('status', 'completed');

        submissions?.forEach(s => {
          groupTaskCounts.set(s.group_id, (groupTaskCounts.get(s.group_id) || 0) + 1);
        });
      }

      // Combine all data
      const participantsWithGroups = participantsData.map(participant => {
        const groupInfo = userGroupsMap.get(participant.user_id);
        const tasksCompleted = groupInfo ? (groupTaskCounts.get(groupInfo.id) || 0) : 0;

        return {
          ...participant,
          group_info: groupInfo || null,
          tasks_completed: tasksCompleted,
        };
      });

      setParticipants(participantsWithGroups as any);
    } catch (error) {
      console.error('Error in fetchParticipants:', error);
      toast({ 
        title: "Failed to load participants", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const exportParticipants = () => {
    const csv = participants.map(p => 
      `${p.profiles?.full_name || 'N/A'},${p.profiles?.email || 'N/A'},${p.profiles?.mobile_number || 'N/A'},${p.group_info?.group_name || 'Not Joined'},${p.tasks_completed || 0},${p.status},${new Date(p.created_at).toLocaleDateString()}`
    ).join('\n');
    
    const blob = new Blob(['Name,Email,Mobile,Group,Tasks Completed,Status,Joined Date\n' + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workshop-participants.csv';
    a.click();
    toast({ title: "Participants exported" });
  };

  const openDetails = (participant: Participant) => {
    setSelectedParticipant(participant);
    setDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Participants</h2>
          <p className="text-muted-foreground">Manage workshop registrations</p>
        </div>
        <Button onClick={exportParticipants}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Total: {filteredParticipants.length} participants</span>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "all" | "teams")}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">
                  <User className="h-4 w-4 mr-2" />
                  All Participants
                </TabsTrigger>
                <TabsTrigger value="teams">
                  <Users className="h-4 w-4 mr-2" />
                  Team View
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Group</TableHead>
                      <TableHead>Tasks Done</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParticipants.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                          No participants found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">
                          {participant.profiles?.full_name || 'N/A'}
                        </TableCell>
                        <TableCell>{participant.profiles?.email || 'N/A'}</TableCell>
                        <TableCell>
                          {participant.group_info ? (
                            <Badge variant="outline">{participant.group_info.group_name}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">Not joined</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{participant.tasks_completed || 0}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={participant.status === 'enrolled' ? 'default' : 'secondary'}>
                            {participant.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(participant.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost" onClick={() => openDetails(participant)}>
                            <User className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="teams">
              <div className="space-y-4">
                {groupedData.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No teams formed yet
                  </div>
                ) : (
                  groupedData.map((group) => (
                    <Card key={group.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            <span>{group.group_name}</span>
                            <Badge variant="outline">{group.group_code}</Badge>
                          </div>
                          <Badge variant="secondary">{group.members.length} members</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Tasks Done</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {group.members.map((member) => (
                              <TableRow key={member.id}>
                                <TableCell className="font-medium">
                                  {member.profiles?.full_name || 'N/A'}
                                </TableCell>
                                <TableCell>{member.profiles?.email || 'N/A'}</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">{member.tasks_completed || 0}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={member.status === 'enrolled' ? 'default' : 'secondary'}>
                                    {member.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Button size="sm" variant="ghost" onClick={() => openDetails(member)}>
                                    <User className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
          )}
        </CardContent>
      </Card>

      {/* Participant Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Participant Details</DialogTitle>
            <DialogDescription>Complete information about this participant</DialogDescription>
          </DialogHeader>
          {selectedParticipant && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="text-lg">{selectedParticipant.profiles?.full_name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{selectedParticipant.profiles?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mobile</p>
                <p>{selectedParticipant.profiles?.mobile_number || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Group</p>
                <p>
                  {selectedParticipant.group_info 
                    ? `${selectedParticipant.group_info.group_name} (${selectedParticipant.group_info.group_code})`
                    : 'Not joined any group'
                  }
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                <p>{selectedParticipant.tasks_completed || 0} tasks</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Registration Status</p>
                <Badge variant={selectedParticipant.status === 'enrolled' ? 'default' : 'secondary'}>
                  {selectedParticipant.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Joined On</p>
                <p>{new Date(selectedParticipant.created_at).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkshopParticipantsTab;
