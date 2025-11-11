import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileText, ExternalLink, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  points: number;
  is_active: boolean;
  is_ended: boolean;
}

interface Submission {
  id: string;
  group_id: string;
  task_id: string;
  text_submission: string | null;
  file_urls: string[] | null;
  submitted_at: string;
  status: string;
  group: {
    group_name: string;
    group_code: string;
  };
  existing_score?: {
    score: number;
    comment: string | null;
  } | null;
}

export const JudgeEvaluationTab = ({ workshopId }: { workshopId: string }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [score, setScore] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [workshopId]);

  useEffect(() => {
    if (selectedTaskId) {
      fetchSubmissions();
    }
  }, [selectedTaskId]);

  // Real-time subscription for submissions and scores
  useEffect(() => {
    if (!selectedTaskId) return;

    const submissionsChannel = supabase
      .channel('submissions-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'team_task_submissions',
          filter: `task_id=eq.${selectedTaskId}`
        },
        () => fetchSubmissions()
      )
      .subscribe();

    const scoresChannel = supabase
      .channel('judge-scores-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'judge_scores',
          filter: `task_id=eq.${selectedTaskId}`
        },
        () => fetchSubmissions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(submissionsChannel);
      supabase.removeChannel(scoresChannel);
    };
  }, [selectedTaskId]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('workshop_tasks')
      .select('*')
      .eq('workshop_id', workshopId)
      .order('task_order', { ascending: true });

    if (!error && data) {
      setTasks(data);
      if (data.length > 0 && !selectedTaskId) {
        setSelectedTaskId(data[0].id);
      }
    }
  };

  const fetchSubmissions = async () => {
    if (!selectedTaskId || !user) return;

    try {
      const { data: submissions, error: submissionsError } = await supabase
        .from('team_task_submissions')
        .select('id, group_id, task_id, text_submission, file_urls, submitted_at, status')
        .eq('task_id', selectedTaskId);

      if (submissionsError || !submissions) {
        setSubmissions([]);
        return;
      }

      // Fetch group names
      const groupIds = [...new Set(submissions.map((s: any) => s.group_id))];
      const { data: groups } = await supabase
        .from('workshop_groups')
        .select('id, group_name, group_code')
        .in('id', groupIds);

      // Fetch existing scores for these submissions
      const submissionIds = submissions.map((s: any) => s.id);
      const { data: scores } = await supabase
        .from('judge_scores')
        .select('*')
        .in('submission_id', submissionIds)
        .eq('judge_id', user.id);

      const groupsMap = new Map(groups?.map(g => [g.id, g]) || []);
      const scoresMap = new Map(scores?.map(s => [s.submission_id, s]) || []);
      
      const enrichedSubmissions: Submission[] = submissions.map((sub: any) => ({
        ...sub,
        group: groupsMap.get(sub.group_id) || { group_name: 'Unknown', group_code: 'N/A' },
        existing_score: scoresMap.get(sub.id) || null
      }));

      setSubmissions(enrichedSubmissions);
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setSubmissions([]);
    }
  };

  const handleEvaluate = (submission: Submission) => {
    setSelectedSubmission(submission);
    if (submission.existing_score) {
      setScore(submission.existing_score.score);
      setComment(submission.existing_score.comment || "");
    } else {
      setScore(0);
      setComment("");
    }
  };

  const handleSubmitScore = async () => {
    if (!selectedSubmission || !user) return;

    const selectedTask = tasks.find(t => t.id === selectedTaskId);
    if (!selectedTask) return;

    if (score > selectedTask.points || score < 0) {
      toast({
        title: "Invalid score",
        description: `Score must be between 0 and ${selectedTask.points}`,
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('judge_scores')
        .upsert({
          judge_id: user.id,
          workshop_id: workshopId,
          task_id: selectedTaskId,
          group_id: selectedSubmission.group_id,
          submission_id: selectedSubmission.id,
          score,
          comment
        }, {
          onConflict: 'judge_id,submission_id'
        });

      if (error) throw error;

      // Update submission status
      await supabase
        .from('team_task_submissions')
        .update({ status: 'scored' })
        .eq('id', selectedSubmission.id);

      toast({
        title: "Score submitted successfully! ✅",
        description: `Awarded ${score} points to ${selectedSubmission.group.group_name}`
      });

      setSelectedSubmission(null);
      fetchSubmissions();
    } catch (error: any) {
      toast({
        title: "Error submitting score",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Task to Evaluate</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedTaskId} onValueChange={setSelectedTaskId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a task" />
            </SelectTrigger>
            <SelectContent>
              {tasks.map(task => (
                <SelectItem key={task.id} value={task.id}>
                  {task.title} ({task.points} pts)
                  {task.is_active && " • Active"}
                  {task.is_ended && " • Ended"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedTask && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {submissions.map(submission => (
            <Card key={submission.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{submission.group.group_name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{submission.group.group_code}</p>
                  </div>
                  {submission.existing_score ? (
                    <Badge variant="default">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Scored
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Submitted: {format(new Date(submission.submitted_at), 'MMM dd, yyyy HH:mm')}
                </div>

                {submission.text_submission && (
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 mt-1 text-muted-foreground" />
                      <p className="text-sm line-clamp-3">{submission.text_submission}</p>
                    </div>
                  </div>
                )}

                {submission.file_urls && submission.file_urls.length > 0 && (
                  <div className="space-y-2">
                    {submission.file_urls.map((url, idx) => (
                      <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View Attachment {idx + 1}
                      </a>
                    ))}
                  </div>
                )}

                {submission.existing_score && (
                  <div className="p-3 bg-primary/10 rounded-md">
                    <p className="text-sm font-semibold">
                      Your Score: {submission.existing_score.score}/{selectedTask.points}
                    </p>
                    {submission.existing_score.comment && (
                      <p className="text-sm text-muted-foreground mt-1">{submission.existing_score.comment}</p>
                    )}
                  </div>
                )}

                <Button 
                  onClick={() => handleEvaluate(submission)}
                  className="w-full"
                  variant={submission.existing_score ? "outline" : "default"}
                >
                  {submission.existing_score ? "Update Score" : "Rate Now"}
                </Button>
              </CardContent>
            </Card>
          ))}

          {submissions.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="py-8 text-center text-muted-foreground">
                No submissions yet for this task
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Evaluation Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Evaluate Submission</DialogTitle>
          </DialogHeader>
          
          {selectedSubmission && selectedTask && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p><strong>Team:</strong> {selectedSubmission.group.group_name}</p>
                <p><strong>Task:</strong> {selectedTask.title}</p>
                <p><strong>Max Points:</strong> {selectedTask.points}</p>
              </div>

              {selectedSubmission.text_submission && (
                <div className="space-y-2">
                  <Label>Submission Text</Label>
                  <div className="p-3 bg-muted rounded-md max-h-40 overflow-y-auto">
                    <p className="text-sm">{selectedSubmission.text_submission}</p>
                  </div>
                </div>
              )}

              {selectedSubmission.file_urls && selectedSubmission.file_urls.length > 0 && (
                <div className="space-y-2">
                  <Label>Attachments</Label>
                  {selectedSubmission.file_urls.map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Attachment {idx + 1}
                    </a>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <Label>Score (0-{selectedTask.points})</Label>
                <Input
                  type="number"
                  min={0}
                  max={selectedTask.points}
                  value={score}
                  onChange={(e) => setScore(parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label>Feedback (Optional)</Label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Provide constructive feedback..."
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSubmitScore} disabled={loading} className="flex-1">
                  {loading ? "Submitting..." : "Submit Score"}
                </Button>
                <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
