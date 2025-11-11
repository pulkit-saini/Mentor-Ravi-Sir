import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UsersRound, CheckCircle2, Trophy, Clock, Play, StopCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface OverviewStats {
  totalParticipants: number;
  totalGroups: number;
  totalTasks: number;
  activeTasks: number;
  completedSubmissions: number;
}

const WorkshopOverviewTab = ({ workshopId }: { workshopId: string }) => {
  const { toast } = useToast();
  const [stats, setStats] = useState<OverviewStats>({
    totalParticipants: 0,
    totalGroups: 0,
    totalTasks: 0,
    activeTasks: 0,
    completedSubmissions: 0,
  });
  const [workshopStatus, setWorkshopStatus] = useState<string>('draft');

  useEffect(() => {
    fetchStats();
    fetchWorkshopStatus();

    // Real-time subscriptions
    const statsChannel = supabase
      .channel('workshop-stats-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_workshops', filter: `workshop_id=eq.${workshopId}` }, () => fetchStats())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'workshop_groups', filter: `workshop_id=eq.${workshopId}` }, () => fetchStats())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'workshop_tasks', filter: `workshop_id=eq.${workshopId}` }, () => fetchStats())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_task_submissions' }, () => fetchStats())
      .subscribe();

    return () => {
      supabase.removeChannel(statsChannel);
    };
  }, [workshopId]);

  const fetchStats = async () => {
    const [participants, groups, tasks, submissions] = await Promise.all([
      supabase.from('user_workshops').select('id', { count: 'exact', head: true }).eq('workshop_id', workshopId),
      supabase.from('workshop_groups').select('id', { count: 'exact', head: true }).eq('workshop_id', workshopId),
      supabase.from('workshop_tasks').select('id, is_active', { count: 'exact' }).eq('workshop_id', workshopId),
      supabase.from('team_task_submissions').select('id, status', { count: 'exact' }).eq('status', 'completed'),
    ]);

    const activeTasks = tasks.data?.filter(t => t.is_active).length || 0;

    setStats({
      totalParticipants: participants.count || 0,
      totalGroups: groups.count || 0,
      totalTasks: tasks.count || 0,
      activeTasks,
      completedSubmissions: submissions.count || 0,
    });
  };

  const fetchWorkshopStatus = async () => {
    const { data } = await supabase
      .from('workshops')
      .select('status')
      .eq('id', workshopId)
      .maybeSingle();
    
    if (data) {
      setWorkshopStatus(data.status || 'draft');
    }
  };

  const handleStartWorkshop = async () => {
    const { error } = await supabase
      .from('workshops')
      .update({ status: 'live', updated_at: new Date().toISOString() })
      .eq('id', workshopId);

    if (error) {
      toast({ title: "Error starting workshop", variant: "destructive" });
    } else {
      toast({ title: "Workshop started! 🚀 All systems active." });
      setWorkshopStatus('live');
    }
  };

  const handleEndWorkshop = async () => {
    // Deactivate all tasks
    await supabase
      .from('workshop_tasks')
      .update({ is_active: false, is_ended: true })
      .eq('workshop_id', workshopId);

    const { error } = await supabase
      .from('workshops')
      .update({ status: 'completed' })
      .eq('id', workshopId);

    if (error) {
      toast({ title: "Error ending workshop", variant: "destructive" });
    } else {
      toast({ title: "Workshop completed! 🎉 All tasks locked." });
      setWorkshopStatus('completed');
    }
  };

  const statCards = [
    {
      title: "Total Participants",
      value: stats.totalParticipants,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Groups",
      value: stats.totalGroups,
      icon: UsersRound,
      color: "text-purple-600",
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      title: "Active Tasks",
      value: stats.activeTasks,
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Completed Submissions",
      value: stats.completedSubmissions,
      icon: Trophy,
      color: "text-yellow-600",
    },
  ];

  const getStatusBadge = () => {
    switch (workshopStatus) {
      case 'live':
        return <Badge className="bg-green-600">🔴 Live</Badge>;
      case 'completed':
        return <Badge className="bg-gray-600">✅ Completed</Badge>;
      default:
        return <Badge variant="outline">📝 Draft</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Workshop Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Workshop Control Panel</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Current Status: {getStatusBadge()}</p>
            </div>
            <div className="flex gap-2">
              {workshopStatus !== 'live' && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Play className="h-4 w-4 mr-2" />
                      Start Workshop
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Start Workshop?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will activate the workshop for all participants. Tasks can be controlled individually.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleStartWorkshop}>Start</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              {workshopStatus === 'live' && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <StopCircle className="h-4 w-4 mr-2" />
                      End Workshop
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>End Workshop?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will lock all tasks, disable submissions, and freeze the leaderboard. This action is permanent.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleEndWorkshop}>End Workshop</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workshop Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Real-time workshop statistics and activity monitoring</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkshopOverviewTab;
