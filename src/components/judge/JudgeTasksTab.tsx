import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Clock, CheckCircle, XCircle, Timer } from "lucide-react";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  description: string | null;
  points: number;
  timer_minutes: number | null;
  is_active: boolean;
  is_ended: boolean;
  task_order: number;
  start_time: string | null;
  created_at: string;
  submissionsCount: number;
  scoredCount: number;
}

export const JudgeTasksTab = ({ workshopId }: { workshopId: string }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();

    // Real-time subscription for tasks, submissions, and scores
    const tasksChannel = supabase
      .channel('judge-tasks-view-tasks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workshop_tasks',
          filter: `workshop_id=eq.${workshopId}`
        },
        () => fetchTasks()
      )
      .subscribe();

    const submissionsChannel = supabase
      .channel('judge-tasks-view-submissions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_task_submissions'
        },
        () => fetchTasks()
      )
      .subscribe();

    const scoresChannel = supabase
      .channel('judge-tasks-view-scores')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'judge_scores',
          filter: `workshop_id=eq.${workshopId}`
        },
        () => fetchTasks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(tasksChannel);
      supabase.removeChannel(submissionsChannel);
      supabase.removeChannel(scoresChannel);
    };
  }, [workshopId]);

  const fetchTasks = async () => {
    try {
      const { data: tasks, error: tasksError } = await supabase
        .from('workshop_tasks')
        .select('*')
        .eq('workshop_id', workshopId)
        .order('task_order', { ascending: true });

      if (tasksError || !tasks) {
        setTasks([]);
        setLoading(false);
        return;
      }

      // Fetch submission counts for each task
      const tasksWithCounts = await Promise.all(
        tasks.map(async (task) => {
          const { data: submissions } = await supabase
            .from('team_task_submissions')
            .select('id, status')
            .eq('task_id', task.id);

          const scoredSubmissions = submissions?.filter(s => s.status === 'scored') || [];

          return {
            ...task,
            submissionsCount: submissions?.length || 0,
            scoredCount: scoredSubmissions.length
          };
        })
      );

      setTasks(tasksWithCounts);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (task: Task) => {
    if (task.is_ended) {
      return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Ended</Badge>;
    }
    if (task.is_active) {
      return <Badge className="bg-green-600"><Clock className="h-3 w-3 mr-1" />Active</Badge>;
    }
    return <Badge variant="secondary">Inactive</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Workshop Tasks</h2>
        <p className="text-muted-foreground">Overview of all tasks and evaluation progress</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-lg" />
            </div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <ClipboardCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No tasks created yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">#{task.task_order}</Badge>
                      {getStatusBadge(task)}
                      <Badge variant="outline">{task.points} pts</Badge>
                    </div>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {task.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {task.description}
                  </p>
                )}

                {task.timer_minutes && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Timer className="h-4 w-4" />
                    <span>{task.timer_minutes} minutes</span>
                  </div>
                )}
                
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Submissions</span>
                    <span className="font-semibold">{task.submissionsCount}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Scored</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{task.scoredCount}</span>
                      {task.submissionsCount > 0 && (
                        <Badge 
                          variant={task.scoredCount === task.submissionsCount ? "default" : "secondary"} 
                          className="text-xs"
                        >
                          {Math.round((task.scoredCount / task.submissionsCount) * 100)}%
                        </Badge>
                      )}
                    </div>
                  </div>

                  {task.scoredCount === task.submissionsCount && task.submissionsCount > 0 && (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium pt-2">
                      <CheckCircle className="h-4 w-4" />
                      All submissions scored
                    </div>
                  )}
                </div>

                <div className="text-xs text-muted-foreground pt-2 border-t">
                  Created {format(new Date(task.created_at), 'MMM dd, yyyy')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
