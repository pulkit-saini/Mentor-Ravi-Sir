import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Play, Square, StopCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  description: string | null;
  points: number;
  timer_minutes: number | null;
  is_active: boolean;
  is_ended: boolean;
  task_order: number;
  start_time: string | null;
}

const WorkshopTasksTab = ({ workshopId }: { workshopId: string }) => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: 10,
    timer_minutes: 30,
    task_order: 1,
  });

  useEffect(() => {
    fetchTasks();

    // Real-time subscription
    const channel = supabase
      .channel('workshop-tasks-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workshop_tasks',
          filter: `workshop_id=eq.${workshopId}`
        },
        () => fetchTasks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [workshopId]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('workshop_tasks')
      .select('*')
      .eq('workshop_id', workshopId)
      .order('task_order', { ascending: true });

    if (!error && data) {
      setTasks(data);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }

    const taskData = {
      ...formData,
      workshop_id: workshopId,
    };

    if (editingTask) {
      const { error } = await supabase
        .from('workshop_tasks')
        .update(taskData)
        .eq('id', editingTask.id);

      if (error) {
        toast({ title: "Error updating task", variant: "destructive" });
      } else {
        toast({ title: "Task updated successfully" });
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('workshop_tasks')
        .insert([taskData]);

      if (error) {
        toast({ title: "Error creating task", variant: "destructive" });
      } else {
        toast({ title: "Task created successfully" });
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      const { error } = await supabase
        .from('workshop_tasks')
        .delete()
        .eq('id', id);

      if (error) {
        toast({ title: "Error deleting task", variant: "destructive" });
      } else {
        toast({ title: "Task deleted successfully" });
      }
    }
  };

  const toggleTaskActive = async (task: Task) => {
    if (task.is_ended) {
      toast({ title: "Cannot activate an ended task", variant: "destructive" });
      return;
    }

    const { error } = await supabase
      .from('workshop_tasks')
      .update({ 
        is_active: !task.is_active,
        start_time: !task.is_active ? new Date().toISOString() : null
      })
      .eq('id', task.id);

    if (error) {
      toast({ title: "Error toggling task", variant: "destructive" });
    } else {
      toast({ title: task.is_active ? "Task deactivated" : "Task activated ✅" });
    }
  };

  const handleEndTask = async (task: Task) => {
    if (!confirm(`End "${task.title}"? This will close all submissions and cannot be undone.`)) {
      return;
    }

    // End the current task
    const { error: endError } = await supabase
      .from('workshop_tasks')
      .update({ 
        is_active: false, 
        is_ended: true 
      })
      .eq('id', task.id);

    if (endError) {
      toast({ title: "Error ending task", variant: "destructive" });
      return;
    }

    // Find and activate next task
    const nextTask = tasks.find(t => t.task_order === task.task_order + 1 && !t.is_ended);
    if (nextTask) {
      await supabase
        .from('workshop_tasks')
        .update({ 
          is_active: true,
          start_time: new Date().toISOString()
        })
        .eq('id', nextTask.id);
      
      toast({ title: `Task ended! Next task "${nextTask.title}" is now active. 🚀` });
    } else {
      toast({ title: "Task ended! No more tasks available." });
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", points: 10, timer_minutes: 30, task_order: 1 });
    setEditingTask(null);
    setShowDialog(false);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || "",
      points: task.points,
      timer_minutes: task.timer_minutes || 30,
      task_order: task.task_order,
    });
    setShowDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manage Tasks</h2>
          <p className="text-muted-foreground">Create and control workshop tasks</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setShowDialog(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTask ? 'Edit Task' : 'Create Task'}</DialogTitle>
              <DialogDescription>Configure task details and settings</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Task Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Task instructions and details"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Timer (minutes)</Label>
                  <Input
                    type="number"
                    value={formData.timer_minutes}
                    onChange={(e) => setFormData({ ...formData, timer_minutes: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Order</Label>
                  <Input
                    type="number"
                    value={formData.task_order}
                    onChange={(e) => setFormData({ ...formData, task_order: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingTask ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tasks ({tasks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Timer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">#{task.task_order}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.points} pts</TableCell>
                  <TableCell>{task.timer_minutes || 'N/A'} min</TableCell>
                  <TableCell>
                    <Badge variant={task.is_ended ? "destructive" : task.is_active ? "default" : "secondary"}>
                      {task.is_ended ? "Ended" : task.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {!task.is_ended && (
                        <>
                          <Button
                            size="sm"
                            variant={task.is_active ? "outline" : "default"}
                            onClick={() => toggleTaskActive(task)}
                          >
                            {task.is_active ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          {task.is_active && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleEndTask(task)}
                            >
                              <StopCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </>
                      )}
                      <Button size="sm" variant="outline" onClick={() => handleEdit(task)} disabled={task.is_ended}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(task.id)} disabled={task.is_ended}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkshopTasksTab;
