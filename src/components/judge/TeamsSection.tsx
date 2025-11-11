import { useState } from "react";
import { Users, ExternalLink, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Team {
  id: string;
  name: string;
  slogan: string;
  members: string[];
  currentTask: string;
  pointsEarned: number;
  status: "active" | "completed" | "pending";
}

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Team Alpha",
    slogan: "Innovation First",
    members: ["John Doe", "Jane Smith", "Mike Johnson"],
    currentTask: "Task 5 - Prototype Development",
    pointsEarned: 450,
    status: "active",
  },
  {
    id: "2",
    name: "Team Beta",
    slogan: "Code the Future",
    members: ["Sarah Wilson", "Tom Brown", "Lisa Anderson"],
    currentTask: "Task 6 - User Testing",
    pointsEarned: 425,
    status: "active",
  },
  {
    id: "3",
    name: "Team Gamma",
    slogan: "Think Different",
    members: ["Alex Chen", "Emma Davis", "Ryan Taylor"],
    currentTask: "Task 4 - Design Sprint",
    pointsEarned: 400,
    status: "completed",
  },
];

export const TeamsSection = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showTeamDialog, setShowTeamDialog] = useState(false);

  const handleViewSubmissions = (team: Team) => {
    setSelectedTeam(team);
    setShowTeamDialog(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">All Teams</h1>
        <p className="text-muted-foreground">View and manage team submissions</p>
      </div>

      {/* Teams Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {mockTeams.map((team) => (
          <div key={team.id} className="glass-card rounded-xl p-6 hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{team.name}</h3>
                <p className="text-sm text-muted-foreground italic">"{team.slogan}"</p>
              </div>
              <Badge variant={team.status === "active" ? "default" : "secondary"}>
                {team.status}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{team.members.length} members</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-accent" />
                <span className="font-semibold">{team.pointsEarned} points</span>
              </div>
            </div>

            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Current Progress</p>
              <p className="text-sm font-medium">{team.currentTask}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {team.members.map((member, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                  <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">
                    {member.charAt(0)}
                  </div>
                  <span className="text-xs font-medium">{member}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-gradient-primary hover:shadow-primary"
              onClick={() => handleViewSubmissions(team)}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Submissions
            </Button>
          </div>
        ))}
      </div>

      {/* Team Detail Dialog */}
      <Dialog open={showTeamDialog} onOpenChange={setShowTeamDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedTeam?.name}</DialogTitle>
            <DialogDescription>"{selectedTeam?.slogan}"</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Team Members</h4>
              <div className="space-y-2">
                {selectedTeam?.members.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                      {member.charAt(0)}
                    </div>
                    <span>{member}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Submission History</h4>
              <div className="space-y-2">
                {[1, 2, 3].map((task) => (
                  <div key={task} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Task {task}</span>
                      <Badge variant="secondary">Submitted</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Submitted on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
