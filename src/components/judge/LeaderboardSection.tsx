import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TeamRanking {
  rank: number;
  teamName: string;
  points: number;
  avgTime: string;
  tasksCompleted: number;
  totalTasks: number;
}

const mockLeaderboard: TeamRanking[] = [
  { rank: 1, teamName: "Team Alpha", points: 450, avgTime: "45 min", tasksCompleted: 9, totalTasks: 10 },
  { rank: 2, teamName: "Team Beta", points: 425, avgTime: "48 min", tasksCompleted: 8, totalTasks: 10 },
  { rank: 3, teamName: "Team Gamma", points: 400, avgTime: "52 min", tasksCompleted: 8, totalTasks: 10 },
  { rank: 4, teamName: "Team Delta", points: 375, avgTime: "55 min", tasksCompleted: 7, totalTasks: 10 },
  { rank: 5, teamName: "Team Epsilon", points: 350, avgTime: "58 min", tasksCompleted: 7, totalTasks: 10 },
];

export const LeaderboardSection = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-accent" />;
      case 2:
        return <Medal className="h-6 w-6 text-muted-foreground" />;
      case 3:
        return <Award className="h-6 w-6 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-gradient-primary text-white";
    if (rank === 2) return "bg-secondary text-white";
    if (rank === 3) return "bg-accent text-white";
    return "bg-muted text-foreground";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Trophy className="h-8 w-8 text-accent" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground">Real-time team rankings and performance</p>
      </div>

      {/* Top 3 Spotlight */}
      <div className="grid md:grid-cols-3 gap-6">
        {mockLeaderboard.slice(0, 3).map((team, idx) => (
          <div
            key={team.rank}
            className={cn(
              "glass-card rounded-xl p-6 hover-lift relative overflow-hidden",
              idx === 0 && "ring-2 ring-accent"
            )}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                {getRankIcon(team.rank)}
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg", getRankBadge(team.rank))}>
                  {team.rank}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{team.teamName}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Points</span>
                  <span className="text-2xl font-bold text-accent">{team.points}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg Time</span>
                  <span className="font-semibold">{team.avgTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <Badge variant="secondary">
                    {team.tasksCompleted}/{team.totalTasks}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Full Rankings
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Team</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Points</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Avg Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Progress</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.map((team) => (
                <tr key={team.rank} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold", getRankBadge(team.rank))}>
                      {team.rank}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {team.rank <= 3 && getRankIcon(team.rank)}
                      <span className="font-semibold">{team.teamName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-accent">{team.points}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm">{team.avgTime}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(team.tasksCompleted / team.totalTasks) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">
                        {team.tasksCompleted}/{team.totalTasks}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
