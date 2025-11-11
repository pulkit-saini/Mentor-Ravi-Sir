import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, Trash2, Trophy, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design System Architecture",
    description: "Create a comprehensive design system with reusable components, style guide, and documentation.",
    category: "Design",
    difficulty: "hard",
    points: 100,
    deadline: "2025-10-16T18:00",
    status: "in-progress",
    assignedTeams: 8,
  },
  {
    id: "2",
    title: "API Integration Challenge",
    description: "Build a RESTful API that handles user authentication and data management with proper error handling.",
    category: "Development",
    difficulty: "hard",
    points: 150,
    deadline: "2025-10-16T20:00",
    status: "in-progress",
    assignedTeams: 8,
  },
  {
    id: "3",
    title: "Pitch Deck Creation",
    description: "Design a compelling 10-slide pitch deck that presents your solution effectively to investors.",
    category: "Business",
    difficulty: "medium",
    points: 75,
    deadline: "2025-10-17T10:00",
    status: "pending",
    assignedTeams: 8,
  },
  {
    id: "4",
    title: "Database Schema Design",
    description: "Create an optimized database schema with proper relationships and indexing strategies.",
    category: "Development",
    difficulty: "medium",
    points: 80,
    deadline: "2025-10-16T16:00",
    status: "completed",
    assignedTeams: 8,
  },
];

const AdminTasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Development",
    difficulty: "medium" as "easy" | "medium" | "hard",
    points: 50,
    deadline: "",
    assignedTeams: 8,
  });

  const categories = ["Development", "Design", "Business", "Research", "Security"];

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...formData,
      status: "pending",
    };

    setTasks([newTask, ...tasks]);
    setIsCreateOpen(false);
    resetForm();
    
    toast({
      title: "Task created successfully",
      description: `${formData.title} has been added to the event`,
    });
  };

  const handleUpdate = () => {
    if (!editingTask) return;

    setTasks(tasks.map(task =>
      task.id === editingTask.id
        ? { ...task, ...formData }
        : task
    ));
    
    setEditingTask(null);
    resetForm();
    
    toast({
      title: "Task updated successfully",
      description: `${formData.title} has been updated`,
    });
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    
    toast({
      title: "Task deleted",
      description: "The task has been removed from the event",
      variant: "destructive",
    });
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      category: task.category,
      difficulty: task.difficulty,
      points: task.points,
      deadline: task.deadline,
      assignedTeams: task.assignedTeams,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Development",
      difficulty: "medium",
      points: 50,
      deadline: "",
      assignedTeams: 8,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500/20 text-green-500 border-green-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "hard": return "bg-red-500/20 text-red-500 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Task Management</h1>
          <p className="text-muted-foreground">
            Create and manage tasks for events
          </p>
        </div>

        <Dialog open={isCreateOpen || !!editingTask} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) {
            setEditingTask(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTask ? "Edit Task" : "Create New Task"}
              </DialogTitle>
              <DialogDescription>
                {editingTask
                  ? "Update the task details below"
                  : "Fill in the task details to create a new challenge"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Design System Architecture"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed task description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value: "easy" | "medium" | "hard") =>
                      setFormData({ ...formData, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input
                    id="points"
                    type="number"
                    min="1"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="datetime-local"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="teams">Assigned Teams</Label>
                <Input
                  id="teams"
                  type="number"
                  min="1"
                  value={formData.assignedTeams}
                  onChange={(e) => setFormData({ ...formData, assignedTeams: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateOpen(false);
                  setEditingTask(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button onClick={editingTask ? handleUpdate : handleCreate}>
                {editingTask ? "Update Task" : "Create Task"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
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

              {/* Meta */}
              <div className="flex flex-wrap gap-2 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Trophy className="h-4 w-4" />
                  <span>{task.points} pts</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{task.assignedTeams} teams</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(task.deadline).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline">{task.category}</Badge>
                <Badge variant="outline">{task.status}</Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openEdit(task)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => handleDelete(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card className="p-12 text-center">
          <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold text-lg mb-2">No tasks found</h3>
          <p className="text-muted-foreground mb-4">
            Create your first task to get started
          </p>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Task
          </Button>
        </Card>
      )}
    </div>
  );
};

export default AdminTasks;
