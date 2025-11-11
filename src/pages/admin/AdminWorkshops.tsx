import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit, Users, Calendar, LayoutGrid, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Workshop {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  banner_url: string | null;
  created_at: string | null;
}

interface WorkshopStats {
  participants: number;
  groups: number;
  tasks: number;
}

const AdminWorkshops = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [workshopStats, setWorkshopStats] = useState<Record<string, WorkshopStats>>({});
  const [showDialog, setShowDialog] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    banner_url: "",
  });

  useEffect(() => {
    fetchWorkshops();
  }, []);

  useEffect(() => {
    if (workshops.length > 0) {
      fetchWorkshopStats();
    }
  }, [workshops]);

  const fetchWorkshops = async () => {
    const { data, error } = await supabase
      .from('workshops')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: "Error fetching workshops", variant: "destructive" });
    } else {
      setWorkshops(data || []);
    }
  };

  const fetchWorkshopStats = async () => {
    const stats: Record<string, WorkshopStats> = {};
    
    for (const workshop of workshops) {
      const [participantsRes, groupsRes, tasksRes] = await Promise.all([
        supabase.from('user_workshops').select('id', { count: 'exact', head: true }).eq('workshop_id', workshop.id),
        supabase.from('workshop_groups').select('id', { count: 'exact', head: true }).eq('workshop_id', workshop.id),
        supabase.from('workshop_tasks').select('id', { count: 'exact', head: true }).eq('workshop_id', workshop.id),
      ]);

      stats[workshop.id] = {
        participants: participantsRes.count || 0,
        groups: groupsRes.count || 0,
        tasks: tasksRes.count || 0,
      };
    }

    setWorkshopStats(stats);
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }

    if (editingWorkshop) {
      const { error } = await supabase
        .from('workshops')
        .update(formData)
        .eq('id', editingWorkshop.id);

      if (error) {
        toast({ title: "Error updating workshop", variant: "destructive" });
      } else {
        toast({ title: "Workshop updated successfully" });
        fetchWorkshops();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('workshops')
        .insert([formData]);

      if (error) {
        toast({ title: "Error creating workshop", variant: "destructive" });
      } else {
        toast({ title: "Workshop created successfully" });
        fetchWorkshops();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this workshop?')) {
      const { error } = await supabase
        .from('workshops')
        .delete()
        .eq('id', id);

      if (error) {
        toast({ title: "Error deleting workshop", variant: "destructive" });
      } else {
        toast({ title: "Workshop deleted successfully" });
        fetchWorkshops();
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", duration: "", banner_url: "" });
    setEditingWorkshop(null);
    setShowDialog(false);
  };

  const handleEdit = (workshop: Workshop) => {
    setEditingWorkshop(workshop);
    setFormData({
      title: workshop.title,
      description: workshop.description || "",
      duration: workshop.duration || "",
      banner_url: workshop.banner_url || "",
    });
    setShowDialog(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Workshop Management</h1>
          <p className="text-muted-foreground">Create and manage workshop programs</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setShowDialog(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Create Workshop
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingWorkshop ? 'Edit Workshop' : 'Create Workshop'}</DialogTitle>
              <DialogDescription>Fill in the workshop details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Workshop title"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Workshop description"
                  rows={4}
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 2 weeks, 1 month"
                />
              </div>
              <div>
                <Label>Banner URL</Label>
                <Input
                  value={formData.banner_url}
                  onChange={(e) => setFormData({ ...formData, banner_url: e.target.value })}
                  placeholder="https://example.com/banner.jpg"
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingWorkshop ? 'Update Workshop' : 'Create Workshop'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Workshop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => {
          const stats = workshopStats[workshop.id] || { participants: 0, groups: 0, tasks: 0 };
          
          return (
            <Card key={workshop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {workshop.banner_url && (
                <div className="h-40 overflow-hidden bg-muted">
                  <img 
                    src={workshop.banner_url} 
                    alt={workshop.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{workshop.title}</CardTitle>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {workshop.description || 'No description'}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{workshop.duration || 'Duration not set'}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-b">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats.participants}</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats.groups}</div>
                    <div className="text-xs text-muted-foreground">Groups</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats.tasks}</div>
                    <div className="text-xs text-muted-foreground">Tasks</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => navigate(`/admin/workshops/${workshop.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={() => handleEdit(workshop)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="destructive" 
                    onClick={() => handleDelete(workshop.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {workshops.length === 0 && (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <LayoutGrid className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-semibold">No workshops yet</h3>
            <p className="text-muted-foreground">Create your first workshop to get started</p>
            <Button onClick={() => setShowDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Workshop
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminWorkshops;
