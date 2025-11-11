import { ClipboardCheck, Users, Award, TrendingUp, Clock, CheckCircle2, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface OverviewSectionProps {
  totalTeams: number;
  tasksCompleted: number;
  totalTasks: number;
  pendingEvaluations: number;
}

export const OverviewSection = ({
  totalTeams,
  tasksCompleted,
  totalTasks,
  pendingEvaluations,
}: OverviewSectionProps) => {
  const completionPercentage = (tasksCompleted / totalTasks) * 100;
  const avgScore = 78.5;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Event Overview</h1>
        <p className="text-muted-foreground">Track event progress and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-xl p-6 hover-lift">
          <div className="flex items-center justify-between mb-3">
            <Users className="h-8 w-8 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">TEAMS</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{totalTeams}</h3>
          <p className="text-sm text-muted-foreground">Participating</p>
        </div>

        <div className="glass-card rounded-xl p-6 hover-lift">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle2 className="h-8 w-8 text-success" />
            <span className="text-xs font-medium text-muted-foreground">COMPLETED</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{tasksCompleted}/{totalTasks}</h3>
          <p className="text-sm text-muted-foreground">Tasks Done</p>
        </div>

        <div className="glass-card rounded-xl p-6 hover-lift">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="h-8 w-8 text-secondary" />
            <span className="text-xs font-medium text-muted-foreground">AVG SCORE</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{avgScore}%</h3>
          <p className="text-sm text-muted-foreground">Overall Performance</p>
        </div>

        <div className="glass-card rounded-xl p-6 hover-lift">
          <div className="flex items-center justify-between mb-3">
            <Clock className="h-8 w-8 text-accent" />
            <span className="text-xs font-medium text-muted-foreground">PENDING</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{pendingEvaluations}</h3>
          <p className="text-sm text-muted-foreground">Reviews Needed</p>
        </div>
      </div>

      {/* Event Progress */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Event Progress</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Completion</span>
            <span className="font-semibold">{completionPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {tasksCompleted} of {totalTasks} tasks completed by all teams
          </p>
        </div>
      </div>

      {/* Top 3 Teams Mini Leaderboard */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" />
          Top 3 Teams
        </h3>
        <div className="space-y-3">
          {[
            { rank: 1, name: "Team Alpha", points: 450, color: "text-accent" },
            { rank: 2, name: "Team Beta", points: 425, color: "text-muted-foreground" },
            { rank: 3, name: "Team Gamma", points: 400, color: "text-muted-foreground" },
          ].map((team) => (
            <div key={team.rank} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold", 
                  team.rank === 1 ? "bg-gradient-primary text-white" : "bg-muted text-foreground")}>
                  {team.rank}
                </div>
                <span className="font-medium">{team.name}</span>
              </div>
              <span className={cn("font-bold", team.color)}>{team.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
