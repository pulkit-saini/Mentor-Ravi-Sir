import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  rank: number | null;
  total_score: number;
  tasks_completed: number;
  group: {
    group_name: string;
    group_code: string;
    logo_url: string | null;
  };
}

export const JudgeLeaderboardTab = ({ workshopId }: { workshopId: string }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetchLeaderboard();

    // Real-time subscription for judge scores and leaderboard
    const scoresChannel = supabase
      .channel('judge-view-leaderboard-scores')
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
      .channel('leaderboard-changes')
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
    const { data: entries, error: entriesError } = await supabase
      .from('workshop_leaderboard')
      .select('*')
      .eq('workshop_id', workshopId)
      .order('rank', { ascending: true });

    if (entriesError || !entries) return;

    // Fetch group details
    const groupIds = entries.map(e => e.group_id);
    const { data: groups } = await supabase
      .from('workshop_groups')
      .select('id, group_name, group_code, logo_url')
      .in('id', groupIds);

    const groupsMap = new Map(groups?.map(g => [g.id, g]) || []);

    const enrichedEntries: LeaderboardEntry[] = entries.map(entry => ({
      ...entry,
      group: groupsMap.get(entry.group_id) || { 
        group_name: 'Unknown', 
        group_code: 'N/A', 
        logo_url: null 
      }
    }));

    setLeaderboard(enrichedEntries);
  };

  const getRankBadge = (rank: number | null) => {
    if (!rank) return null;
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
    return <span className="font-semibold">#{rank}</span>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Live Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center">Tasks Completed</TableHead>
              <TableHead className="text-right">Total Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">
                  {getRankBadge(entry.rank)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {entry.group.logo_url && (
                      <img 
                        src={entry.group.logo_url} 
                        alt={entry.group.group_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{entry.group.group_name}</p>
                      <p className="text-sm text-muted-foreground">{entry.group.group_code}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">{entry.tasks_completed}</Badge>
                </TableCell>
                <TableCell className="text-right font-bold text-lg">
                  {entry.total_score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {leaderboard.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No teams have been scored yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};
