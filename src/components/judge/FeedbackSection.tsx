import { MessageSquare, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FeedbackRecord {
  id: string;
  teamName: string;
  task: string;
  score: number;
  feedback: string;
  date: string;
}

const mockFeedback: FeedbackRecord[] = [
  {
    id: "1",
    teamName: "Team Alpha",
    task: "Task 3",
    score: 85,
    feedback: "Excellent work on the prototype. The user interface is intuitive and well-designed.",
    date: "2025-10-14",
  },
  {
    id: "2",
    teamName: "Team Beta",
    task: "Task 2",
    score: 78,
    feedback: "Good progress. Consider adding more detail to the user stories.",
    date: "2025-10-13",
  },
  {
    id: "3",
    teamName: "Team Gamma",
    task: "Task 4",
    score: 92,
    feedback: "Outstanding presentation! Clear communication and strong technical implementation.",
    date: "2025-10-12",
  },
];

export const FeedbackSection = () => {
  const handleExportFeedback = () => {
    // Mock export functionality
    console.log("Exporting feedback as PDF/CSV");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Feedback Summary</h1>
          <p className="text-muted-foreground">Review all feedback you've provided</p>
        </div>
        <Button onClick={handleExportFeedback} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="alpha">Team Alpha</SelectItem>
              <SelectItem value="beta">Team Beta</SelectItem>
              <SelectItem value="gamma">Team Gamma</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select task" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  Task {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-4">
        {mockFeedback.map((record) => (
          <div key={record.id} className="glass-card rounded-xl p-6 hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold mb-1">{record.teamName}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{record.task}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent">{record.score}</div>
                <div className="text-xs text-muted-foreground">/ 100</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm leading-relaxed">{record.feedback}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Evaluation Statistics</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Evaluations</p>
            <p className="text-3xl font-bold">{mockFeedback.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Average Score</p>
            <p className="text-3xl font-bold text-accent">
              {(mockFeedback.reduce((sum, f) => sum + f.score, 0) / mockFeedback.length).toFixed(1)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Teams Reviewed</p>
            <p className="text-3xl font-bold text-secondary">
              {new Set(mockFeedback.map(f => f.teamName)).size}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
