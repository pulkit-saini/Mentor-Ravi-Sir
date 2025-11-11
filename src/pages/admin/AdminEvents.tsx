import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit, Eye, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  description: string | null;
  start_at: string;
  end_at: string;
  location: string | null;
  banner_url: string | null;
  status: 'upcoming' | 'ongoing' | 'completed' | null;
  created_at: string | null;
}

const AdminEvents = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    start_at: string;
    end_at: string;
    location: string;
    banner_url: string;
    status: 'upcoming' | 'ongoing' | 'completed';
  }>({
    title: "",
    description: "",
    start_at: "",
    end_at: "",
    location: "",
    banner_url: "",
    status: "upcoming",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_at', { ascending: false });

    if (error) {
      toast({ title: "Error fetching events", variant: "destructive" });
    } else {
      setEvents(data || []);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.start_at || !formData.end_at) {
      toast({ title: "Title and dates are required", variant: "destructive" });
      return;
    }

    if (editingEvent) {
      const { error } = await supabase
        .from('events')
        .update(formData)
        .eq('id', editingEvent.id);

      if (error) {
        toast({ title: "Error updating event", variant: "destructive" });
      } else {
        toast({ title: "Event updated successfully" });
        fetchEvents();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('events')
        .insert([formData]);

      if (error) {
        toast({ title: "Error creating event", variant: "destructive" });
      } else {
        toast({ title: "Event created successfully" });
        fetchEvents();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        toast({ title: "Error deleting event", variant: "destructive" });
      } else {
        toast({ title: "Event deleted successfully" });
        fetchEvents();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      start_at: "",
      end_at: "",
      location: "",
      banner_url: "",
      status: "upcoming",
    });
    setEditingEvent(null);
    setShowDialog(false);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || "",
      start_at: event.start_at,
      end_at: event.end_at,
      location: event.location || "",
      banner_url: event.banner_url || "",
      status: event.status || "upcoming",
    });
    setShowDialog(true);
  };

  const exportRegistrations = async (eventId: string) => {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('event_id', eventId);

    if (error) {
      toast({ title: "Error exporting data", variant: "destructive" });
      return;
    }

    const csv = [
      ['Team Name', 'Team Leader', 'Selected Events', 'Status', 'Created At'].join(','),
      ...data.map(reg =>
        [
          reg.team_name,
          JSON.stringify(reg.team_leader),
          reg.selected_events.join('; '),
          reg.status,
          reg.created_at
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations-${eventId}.csv`;
    a.click();

    toast({ title: "Registrations exported successfully" });
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'ongoing': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Events</h1>
          <p className="text-muted-foreground">Create and manage platform events</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setShowDialog(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvent ? 'Edit Event' : 'Create Event'}</DialogTitle>
              <DialogDescription>Fill in the event details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Event title"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Event description"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date & Time</Label>
                  <Input
                    type="datetime-local"
                    value={formData.start_at}
                    onChange={(e) => setFormData({ ...formData, start_at: e.target.value })}
                  />
                </div>
                <div>
                  <Label>End Date & Time</Label>
                  <Input
                    type="datetime-local"
                    value={formData.end_at}
                    onChange={(e) => setFormData({ ...formData, end_at: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Event location or Online/Hybrid"
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
              <div>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: 'upcoming' | 'ongoing' | 'completed') => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingEvent ? 'Update Event' : 'Create Event'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Events ({events.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>
                    {new Date(event.start_at).toLocaleDateString()} - {new Date(event.end_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{event.location || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => exportRegistrations(event.id)}>
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(event)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>
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

export default AdminEvents;
