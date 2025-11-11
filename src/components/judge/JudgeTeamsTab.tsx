import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface Team {
  id: string;
  group_name: string;
  group_code: string;
  logo_url: string | null;
  slogan: string | null;
  members: Array<{
    user: {
      full_name: string;
      email: string;
    };
  }>;
}

export const JudgeTeamsTab = ({ workshopId }: { workshopId: string }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetchTeams();

    // Real-time updates for teams and members
    const groupsChannel = supabase
      .channel('judge-teams-groups-view')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workshop_groups',
          filter: `workshop_id=eq.${workshopId}`
        },
        () => fetchTeams()
      )
      .subscribe();

    const membersChannel = supabase
      .channel('judge-teams-members-view')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'group_members'
        },
        () => fetchTeams()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(groupsChannel);
      supabase.removeChannel(membersChannel);
    };
  }, [workshopId]);

  const fetchTeams = async () => {
    const { data: groups, error: groupsError } = await supabase
      .from('workshop_groups')
      .select('*')
      .eq('workshop_id', workshopId);

    if (groupsError || !groups) return;

    // Fetch members for each group
    const teamsWithMembers = await Promise.all(
      groups.map(async (group) => {
        const { data: members } = await supabase
          .from('group_members')
          .select(`
            user_id,
            profiles!inner(full_name, email)
          `)
          .eq('group_id', group.id);

        return {
          ...group,
          members: members?.map(m => ({
            user: {
              full_name: (m.profiles as any)?.full_name || '',
              email: (m.profiles as any)?.email || ''
            }
          })) || []
        };
      })
    );

    setTeams(teamsWithMembers);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map(team => (
          <Card key={team.id}>
            <CardHeader>
              <div className="flex items-start gap-4">
                {team.logo_url ? (
                  <img 
                    src={team.logo_url} 
                    alt={team.group_name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <CardTitle className="text-lg">{team.group_name}</CardTitle>
                  <Badge variant="outline" className="mt-1">{team.group_code}</Badge>
                </div>
              </div>
              {team.slogan && (
                <p className="text-sm text-muted-foreground italic mt-2">"{team.slogan}"</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-semibold">Team Members:</p>
                {team.members.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {member.user.full_name?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p>{member.user.full_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teams.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No teams registered yet
          </CardContent>
        </Card>
      )}
    </div>
  );
};
