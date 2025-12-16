import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  getPendingSubmissions, 
  initializeDefaultData,
  type Submission
} from "@/utils/dashboardData";
import { JudgeSidebar } from "@/components/judge/JudgeSidebar";
import { OverviewSection } from "@/components/judge/OverviewSection";
import { TeamsSection } from "@/components/judge/TeamsSection";
import { TasksSection } from "@/components/judge/TasksSection";
import { ScoringSection } from "@/components/judge/ScoringSection";
import { LeaderboardSection } from "@/components/judge/LeaderboardSection";
import { FeedbackSection } from "@/components/judge/FeedbackSection";

const JudgeDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("overview");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    initializeDefaultData();
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/get-started");
      return;
    }
    loadSubmissions();
  }, [navigate]);

  const loadSubmissions = () => {
    setSubmissions(getPendingSubmissions());
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };


  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const renderView = () => {
    switch (activeView) {
      case "overview":
        return (
          <OverviewSection
            totalTeams={8}
            tasksCompleted={48}
            totalTasks={80}
            pendingEvaluations={submissions.length}
          />
        );
      case "teams":
        return <TeamsSection />;
      case "tasks":
        return <TasksSection />;
      case "scoring":
        return (
          <ScoringSection
            submissions={submissions}
            onEvaluationComplete={loadSubmissions}
          />
        );
      case "leaderboard":
        return <LeaderboardSection />;
      case "feedback":
        return <FeedbackSection />;
      case "settings":
        return (
          <div className="glass-card rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-muted-foreground">Settings functionality coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <JudgeSidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4 flex-1">
              <div>
                <h1 className="text-xl font-bold">
                  Welcome, <span className="gradient-text">Judge {userData.name || "Panel"}</span>! 👋
                </h1>
                <p className="text-sm text-muted-foreground">Innovation Challenge 2025 • Oct 15-17, 2025</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search teams or tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </Button>

              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default JudgeDashboard;
