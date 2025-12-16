import { Home, Users, ClipboardList, BarChart3, Trophy, MessageSquare, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface JudgeSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { id: "overview", icon: Home, label: "Overview" },
  { id: "teams", icon: Users, label: "Teams" },
  { id: "tasks", icon: ClipboardList, label: "Tasks" },
  { id: "scoring", icon: BarChart3, label: "Scoring" },
  { id: "leaderboard", icon: Trophy, label: "Leaderboard" },
  { id: "feedback", icon: MessageSquare, label: "Feedback" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export const JudgeSidebar = ({ activeView, onViewChange }: JudgeSidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-subtle border-r border-border shadow-lg z-40">
      <div className="p-6">
        <h2 className="text-xl font-bold gradient-text mb-8">Judge Panel</h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                  isActive
                    ? "bg-gradient-primary text-white shadow-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
