import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Trophy, ClipboardCheck, BarChart3 } from "lucide-react";
import { PageLoadingFallback } from "@/components/LoadingFallback";
import { JudgeEvaluationTab } from "@/components/judge/JudgeEvaluationTab";
import { JudgeLeaderboardTab } from "@/components/judge/JudgeLeaderboardTab";
import { JudgeTeamsTab } from "@/components/judge/JudgeTeamsTab";
import { JudgeTasksTab } from "@/components/judge/JudgeTasksTab";
import { JudgeJudgesTab } from "@/components/judge/JudgeJudgesTab";

interface Workshop {
  id: string;
  title: string;
  description: string | null;
  status: string;
  banner_url: string | null;
}

const JudgeWorkshopDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ teams: 0, tasks: 0, pending: 0 });

  useEffect(() => {
    if (!id || !user) return;
    fetchWorkshopData();

    // Real-time updates for workshop stats
    const submissionsChannel = supabase
      .channel('judge-workshop-submissions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_task_submissions'
        },
        () => fetchWorkshopData()
      )
      .subscribe();

    const tasksChannel = supabase
      .channel('judge-workshop-tasks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workshop_tasks',
          filter: `workshop_id=eq.${id}`
        },
        () => fetchWorkshopData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(submissionsChannel);
      supabase.removeChannel(tasksChannel);
    };
  }, [id, user]);

  const fetchWorkshopData = async () => {
    if (!id) return;

    try {
      // Fetch workshop
      const { data: workshopData, error: workshopError } = await supabase
        .from('workshops')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (workshopError) throw workshopError;
      if (!workshopData) {
        setLoading(false);
        return;
      }
      
      setWorkshop(workshopData);

      // Fetch stats using simpler queries
      const teamsResult = await supabase
        .from('workshop_groups')
        .select('id')
        .eq('workshop_id', id);
        
      const tasksResult = await supabase
        .from('workshop_tasks')
        .select('id')
        .eq('workshop_id', id);
        
      const submissionsResult = await supabase
        .from('team_task_submissions')
        .select('id')
        .eq('status', 'pending');

      setStats({
        teams: teamsResult.data?.length || 0,
        tasks: tasksResult.data?.length || 0,
        pending: submissionsResult.data?.length || 0
      });

    } catch (error) {
      console.error('Error fetching workshop:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoadingFallback />;
  if (!workshop) return <div>Workshop not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/judge')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold gradient-text">{workshop.title}</h1>
              <p className="text-muted-foreground mt-1">{workshop.description}</p>
            </div>
          </div>
          <Badge variant={workshop.status === 'active' ? 'default' : 'secondary'}>
            {workshop.status}
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.teams}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.tasks}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="evaluate" className="space-y-4">
          <TabsList>
            <TabsTrigger value="evaluate">Evaluate</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="judges">Judges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="evaluate">
            <JudgeEvaluationTab workshopId={id!} />
          </TabsContent>

          <TabsContent value="tasks">
            <JudgeTasksTab workshopId={id!} />
          </TabsContent>

          <TabsContent value="teams">
            <JudgeTeamsTab workshopId={id!} />
          </TabsContent>

          <TabsContent value="judges">
            <JudgeJudgesTab workshopId={id!} />
          </TabsContent>

          <TabsContent value="leaderboard">
            <JudgeLeaderboardTab workshopId={id!} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JudgeWorkshopDetail;
