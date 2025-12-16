import { useState } from "react";
import { ClipboardList, Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Submission, evaluateSubmission } from "@/utils/dashboardData";

interface ScoringSectionProps {
  submissions: Submission[];
  onEvaluationComplete: () => void;
}

export const ScoringSection = ({ submissions, onEvaluationComplete }: ScoringSectionProps) => {
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState<string>("1");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState("");

  const filteredSubmissions = submissions.filter(
    (sub) => sub.eventTitle.includes(`Task ${selectedTask}`)
  );

  const handleSubmitScore = () => {
    if (!selectedSubmission) {
      toast({
        title: "Error",
        description: "Please select a submission first",
        variant: "destructive",
      });
      return;
    }

    if (!feedback.trim()) {
      toast({
        title: "Error",
        description: "Please provide feedback",
        variant: "destructive",
      });
      return;
    }

    evaluateSubmission(selectedSubmission.id, score, feedback);
    onEvaluationComplete();
    
    toast({
      title: "Success",
      description: "Score submitted successfully ✅",
    });

    // Reset form
    setSelectedSubmission(null);
    setScore(0);
    setFeedback("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Task Evaluation</h1>
        <p className="text-muted-foreground">Review and score team submissions</p>
      </div>

      {/* Task Selector */}
      <div className="glass-card rounded-xl p-6">
        <Label className="mb-2 block">Select Task</Label>
        <Select value={selectedTask} onValueChange={setSelectedTask}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a task" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                Task {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submissions List */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          Task {selectedTask} Submissions
        </h3>

        {filteredSubmissions.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            No submissions available for this task
          </p>
        ) : (
          <div className="space-y-3">
            {filteredSubmissions.map((submission) => (
              <button
                key={submission.id}
                onClick={() => setSelectedSubmission(submission)}
                className={cn(
                  "w-full text-left p-4 rounded-lg border transition-all duration-300",
                  selectedSubmission?.id === submission.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{submission.studentName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Submitted {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedSubmission?.id === submission.id && (
                    <Star className="h-5 w-5 text-accent fill-accent" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Evaluation Form */}
      {selectedSubmission && (
        <div className="glass-card rounded-xl p-6 animate-fade-in">
          <h3 className="text-xl font-bold mb-6">
            Evaluating: {selectedSubmission.studentName}
          </h3>

          <div className="space-y-6">
            <div>
              <Label className="mb-2 block">Score: {score}/100</Label>
              <Slider
                value={[score]}
                onValueChange={(value) => setScore(value[0])}
                max={100}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>

            <div>
              <Label className="mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Detailed Feedback
              </Label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide constructive feedback for the team..."
                rows={6}
                className="resize-none"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSubmitScore}
                className="flex-1 bg-gradient-primary hover:shadow-primary"
              >
                Submit Evaluation
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedSubmission(null);
                  setScore(0);
                  setFeedback("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
