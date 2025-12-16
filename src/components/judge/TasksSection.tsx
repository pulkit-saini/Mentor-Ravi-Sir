import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Clock, CheckCircle2, AlertCircle, Trophy, ClipboardList } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  deadline: string;
  status: "pending" | "in-progress" | "completed" | "overdue";
  assignedTeams: number;
  completedTeams: number;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design System Architecture",
    description: "Create a comprehensive design system with reusable components, style guide, and documentation.",
    category: "Design",
    difficulty: "hard",
    points: 100,
    deadline: "2025-10-16 18:00",
    status: "in-progress",
    assignedTeams: 8,
    completedTeams: 3,
  },
  {
    id: "2",
    title: "API Integration Challenge",
    description: "Build a RESTful API that handles user authentication and data management with proper error handling.",
    category: "Development",
    difficulty: "hard",
    points: 150,
    deadline: "2025-10-16 20:00",
    status: "in-progress",
    assignedTeams: 8,
    completedTeams: 2,
  },
  {
    id: "3",
    title: "Pitch Deck Creation",
    description: "Design a compelling 10-slide pitch deck that presents your solution effectively to investors.",
    category: "Business",
    difficulty: "medium",
    points: 75,
    deadline: "2025-10-17 10:00",
    status: "pending",
    assignedTeams: 8,
    completedTeams: 0,
  },
  {
    id: "4",
    title: "Database Schema Design",
    description: "Create an optimized database schema with proper relationships and indexing strategies.",
    category: "Development",
    difficulty: "medium",
    points: 80,
    deadline: "2025-10-16 16:00",
    status: "completed",
    assignedTeams: 8,
    completedTeams: 8,
  },
  {
    id: "5",
    title: "User Research & Personas",
    description: "Conduct user interviews and create detailed user personas based on research findings.",
    category: "Research",
    difficulty: "easy",
    points: 50,
    deadline: "2025-10-16 14:00",
    status: "overdue",
    assignedTeams: 8,
    completedTeams: 5,
  },
  {
    id: "6",
    title: "Security Audit",
    description: "Perform a comprehensive security audit and implement necessary security measures.",
    category: "Security",
    difficulty: "hard",
    points: 120,
    deadline: "2025-10-17 15:00",
    status: "pending",
    assignedTeams: 8,
    completedTeams: 0,
  },
];

export const TasksSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(mockTasks.map(t => t.category)))];
  const statuses = ["all", "pending", "in-progress", "completed", "overdue"];

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || task.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500/20 text-green-500 border-green-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "hard": return "bg-red-500/20 text-red-500 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return { icon: Clock, color: "bg-blue-500/20 text-blue-500 border-blue-500/30", label: "Pending" };
      case "in-progress":
        return { icon: AlertCircle, color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30", label: "In Progress" };
      case "completed":
        return { icon: CheckCircle2, color: "bg-green-500/20 text-green-500 border-green-500/30", label: "Completed" };
      case "overdue":
        return { icon: AlertCircle, color: "bg-red-500/20 text-red-500 border-red-500/30", label: "Overdue" };
      default:
        return { icon: Clock, color: "bg-muted text-muted-foreground", label: status };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Tasks & Challenges</h2>
        <p className="text-muted-foreground">
          Monitor task progress and team submissions across the event
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
              <p className="text-2xl font-bold">{mockTasks.length}</p>
            </div>
            <ClipboardList className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold">
                {mockTasks.filter(t => t.status === "in-progress").length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">
                {mockTasks.filter(t => t.status === "completed").length}
              </p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-2xl font-bold">
                {mockTasks.reduce((sum, t) => sum + t.points, 0)}
              </p>
            </div>
            <Trophy className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredTasks.map((task) => {
          const statusConfig = getStatusConfig(task.status);
          const StatusIcon = statusConfig.icon;
          const completionRate = (task.completedTeams / task.assignedTeams) * 100;

          return (
            <Card key={task.id} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{task.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {task.description}
                    </p>
                  </div>
                  <Badge className={`${getDifficultyColor(task.difficulty)} border`}>
                    {task.difficulty}
                  </Badge>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {task.category}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${statusConfig.color} border`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig.label}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Trophy className="h-3 w-3 mr-1" />
                    {task.points} pts
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(task.deadline).toLocaleString()}
                  </Badge>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Team Progress</span>
                    <span className="font-medium">
                      {task.completedTeams} / {task.assignedTeams} teams
                    </span>
                  </div>
                  <Progress value={completionRate} className="h-2" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <Card className="p-12 text-center">
          <ClipboardList className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold text-lg mb-2">No tasks found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </Card>
      )}
    </div>
  );
};
