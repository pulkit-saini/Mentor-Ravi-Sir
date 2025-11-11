import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Download, RefreshCw, Plus, Minus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LeaderboardEntry {
  id: string;
  group_id: string;
  total_score: number;
  tasks_completed: number;
  rank: number | null;
  workshop_groups: {
    group_name: string;
    group_code: string;
  } | null;
  members?: Array<{ full_name: string }>;
}

const WorkshopLeaderboardTab = ({ workshopId }: { workshopId: string }) => {
  const { toast } = useToast();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [adjustingEntry, setAdjustingEntry] = useState<LeaderboardEntry | null>(null);
  const [pointsAdjustment, setPointsAdjustment] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchLeaderboard();

    // Real-time subscription for judge scores
    const scoresChannel = supabase
      .channel('admin-leaderboard-scores')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'judge_scores',
          filter: `workshop_id=eq.${workshopId}`
        },
        () => fetchLeaderboard()
      )
      .subscribe();

    const leaderboardChannel = supabase
      .channel('workshop-leaderboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workshop_leaderboard',
          filter: `workshop_id=eq.${workshopId}`
        },
        () => fetchLeaderboard()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(scoresChannel);
      supabase.removeChannel(leaderboardChannel);
    };
  }, [workshopId]);

  const fetchLeaderboard = async () => {
    try {
      // Fetch from database leaderboard first
      const { data: existingLeaderboard } = await supabase
        .from('workshop_leaderboard')
        .select(`
          id,
          group_id,
          total_score,
          tasks_completed,
          rank,
          workshop_groups:group_id (
            group_name,
            group_code
          )
        `)
        .eq('workshop_id', workshopId)
        .order('total_score', { ascending: false });

      if (existingLeaderboard && existingLeaderboard.length > 0) {
        // Fetch members for all groups
        const groupIds = existingLeaderboard.map(e => e.group_id);
        const { data: allMembers } = await supabase
          .from('group_members')
          .select('group_id, user_id')
          .in('group_id', groupIds);

        const membersByGroup = new Map();
        allMembers?.forEach(m => {
          if (!membersByGroup.has(m.group_id)) {
            membersByGroup.set(m.group_id, []);
          }
          membersByGroup.get(m.group_id).push(m.user_id);
        });

        // Fetch profiles
        const allUserIds = allMembers?.map(m => m.user_id) || [];
        if (allUserIds.length > 0) {
          const { data: profiles } = await supabase
            .from('profiles')
            .select('id, full_name')
            .in('id', allUserIds);

          const profilesMap = new Map(profiles?.map(p => [p.id, p]) || []);

          // Attach members to entries
          const entriesWithMembers = existingLeaderboard.map(entry => {
            const memberIds = membersByGroup.get(entry.group_id) || [];
            const members = memberIds.map(id => profilesMap.get(id)).filter(Boolean);
            return { ...entry, members };
          });

          setLeaderboard(entriesWithMembers as any);
        } else {
          setLeaderboard(existingLeaderboard as any);
        }
      } else {
        setLeaderboard([]);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLeaderboard([]);
    }
  };

  const refreshLeaderboard = async () => {
    try {
      // Recalculate ranks based on current scores
      const sortedEntries = [...leaderboard].sort((a, b) => b.total_score - a.total_score);
      
      // Update ranks in batch
      const updates = sortedEntries.map((entry, index) => ({
        workshop_id: workshopId,
        group_id: entry.group_id,
        rank: index + 1
      }));

      for (const update of updates) {
        await supabase
          .from('workshop_leaderboard')
          .update({ rank: update.rank })
          .eq('workshop_id', workshopId)
          .eq('group_id', update.group_id);
      }

      toast({ title: "Leaderboard refreshed" });
      await fetchLeaderboard();
    } catch (error) {
      console.error('Error refreshing leaderboard:', error);
      toast({ title: "Error refreshing leaderboard", variant: "destructive" });
    }
  };

  const exportLeaderboard = () => {
    const csv = leaderboard.map(entry => 
      `${entry.rank || 'N/A'},${entry.workshop_groups?.group_name || 'N/A'},${entry.workshop_groups?.group_code || 'N/A'},${entry.members?.map(m => m.full_name).join('; ') || 'N/A'},${entry.total_score},${entry.tasks_completed}`
    ).join('\n');
    
    const blob = new Blob(['Rank,Team Name,Group Code,Members,Score,Tasks Completed\n' + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workshop-leaderboard.csv';
    a.click();
    toast({ title: "Leaderboard exported" });
  };

  const openAdjustPoints = (entry: LeaderboardEntry) => {
    setAdjustingEntry(entry);
    setPointsAdjustment(0);
    setDialogOpen(true);
  };

  const handleAdjustPoints = async () => {
    if (!adjustingEntry) return;

    const newScore = adjustingEntry.total_score + pointsAdjustment;
    
    const { error } = await supabase
      .from('workshop_leaderboard')
      .update({ total_score: newScore })
      .eq('workshop_id', workshopId)
      .eq('group_id', adjustingEntry.group_id);

    if (error) {
      console.error('Error adjusting points:', error);
      toast({ title: "Error adjusting points", description: error.message, variant: "destructive" });
    } else {
      toast({ title: `Points adjusted by ${pointsAdjustment > 0 ? '+' : ''}${pointsAdjustment}` });
      setDialogOpen(false);
      fetchLeaderboard();
    }
  };

  const getRankBadge = (rank: number | null) => {
    if (!rank) return null;
    if (rank === 1) return <Badge className="bg-yellow-500">🥇 1st</Badge>;
    if (rank === 2) return <Badge className="bg-gray-400">🥈 2nd</Badge>;
    if (rank === 3) return <Badge className="bg-orange-600">🥉 3rd</Badge>;
    return <Badge variant="secondary">#{rank}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Live Leaderboard</h2>
          <p className="text-muted-foreground">Real-time team rankings and scores</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshLeaderboard}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Ranks
          </Button>
          <Button onClick={exportLeaderboard}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Rankings ({leaderboard.length} teams)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Team Name</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Tasks</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((entry) => (
                <TableRow key={entry.id} className={entry.rank && entry.rank <= 3 ? 'bg-muted/50' : ''}>
                  <TableCell className="font-medium">
                    {getRankBadge(entry.rank)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{entry.workshop_groups?.group_name || 'Unknown Team'}</p>
                      <p className="text-xs text-muted-foreground">{entry.workshop_groups?.group_code}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">
                        {entry.members && entry.members.length > 0 
                          ? entry.members.slice(0, 2).map(m => m.full_name).join(', ') + (entry.members.length > 2 ? '...' : '')
                          : 'No members'
                        }
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-lg font-bold text-primary">{entry.total_score}</span> pts
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{entry.tasks_completed}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => openAdjustPoints(entry)}>
                      Adjust
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Points Adjustment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Points</DialogTitle>
            <DialogDescription>
              Manually adjust points for {adjustingEntry?.workshop_groups?.group_name}
            </DialogDescription>
          </DialogHeader>
          {adjustingEntry && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Score</p>
                <p className="text-2xl font-bold">{adjustingEntry.total_score} pts</p>
              </div>
              <div>
                <Label>Points Adjustment</Label>
                <div className="flex gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPointsAdjustment(prev => prev - 10)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={pointsAdjustment}
                    onChange={(e) => setPointsAdjustment(parseInt(e.target.value) || 0)}
                    className="text-center"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPointsAdjustment(prev => prev + 10)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Use +/- to add or remove points
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">New Score</p>
                <p className="text-2xl font-bold text-primary">
                  {adjustingEntry.total_score + pointsAdjustment} pts
                </p>
              </div>
              <Button onClick={handleAdjustPoints} className="w-full">
                Apply Adjustment
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkshopLeaderboardTab;
