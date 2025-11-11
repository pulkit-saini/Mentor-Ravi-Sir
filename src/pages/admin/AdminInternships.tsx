import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit, Users, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Internship {
  id: string;
  title: string;
  company: string;
  description: string | null;
  duration: string | null;
  created_at: string | null;
}

interface Application {
  id: string;
  user_id: string;
  status: 'applied' | 'under_review' | 'accepted' | 'rejected';
  applied_at: string | null;
  full_name?: string;
  email?: string;
}

const AdminInternships = () => {
  const { toast } = useToast();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showApplicantsDialog, setShowApplicantsDialog] = useState(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [selectedInternshipApplicants, setSelectedInternshipApplicants] = useState<Application[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    duration: "",
  });

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    const { data, error } = await supabase
      .from('internships')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: "Error fetching internships", variant: "destructive" });
    } else {
      setInternships(data || []);
    }
  };

  const fetchApplicants = async (internshipId: string) => {
    const { data: applications, error } = await supabase
      .from('internship_applications')
      .select('*')
      .eq('internship_id', internshipId);

    if (error) {
      toast({ title: "Error fetching applicants", variant: "destructive" });
      return;
    }

    // Fetch profiles separately
    const userIds = applications?.map(app => app.user_id) || [];
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, full_name, email')
      .in('id', userIds);

    if (profilesError) {
      toast({ title: "Error fetching profiles", variant: "destructive" });
      return;
    }

    // Merge data
    const enrichedApplications = applications?.map(app => {
      const profile = profiles?.find(p => p.id === app.user_id);
      return {
        ...app,
        full_name: profile?.full_name || 'Unknown',
        email: profile?.email || 'Unknown',
      };
    });

    setSelectedInternshipApplicants(enrichedApplications || []);
    setShowApplicantsDialog(true);
  };

  const updateApplicationStatus = async (applicationId: string, status: 'applied' | 'under_review' | 'accepted' | 'rejected', internshipId: string) => {
    const { error } = await supabase
      .from('internship_applications')
      .update({ status })
      .eq('id', applicationId);

    if (error) {
      toast({ title: "Error updating status", variant: "destructive" });
    } else {
      toast({ title: "Status updated successfully" });
      // Refresh the applicants list
      fetchApplicants(internshipId);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.company) {
      toast({ title: "Title and company are required", variant: "destructive" });
      return;
    }

    if (editingInternship) {
      const { error } = await supabase
        .from('internships')
        .update(formData)
        .eq('id', editingInternship.id);

      if (error) {
        toast({ title: "Error updating internship", variant: "destructive" });
      } else {
        toast({ title: "Internship updated successfully" });
        fetchInternships();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('internships')
        .insert([formData]);

      if (error) {
        toast({ title: "Error creating internship", variant: "destructive" });
      } else {
        toast({ title: "Internship created successfully" });
        fetchInternships();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this internship?')) {
      const { error } = await supabase
        .from('internships')
        .delete()
        .eq('id', id);

      if (error) {
        toast({ title: "Error deleting internship", variant: "destructive" });
      } else {
        toast({ title: "Internship deleted successfully" });
        fetchInternships();
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: "", company: "", description: "", duration: "" });
    setEditingInternship(null);
    setShowDialog(false);
  };

  const handleEdit = (internship: Internship) => {
    setEditingInternship(internship);
    setFormData({
      title: internship.title,
      company: internship.company,
      description: internship.description || "",
      duration: internship.duration || "",
    });
    setShowDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'under_review': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Internships</h1>
          <p className="text-muted-foreground">Post internships and manage applications</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setShowDialog(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Internship
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingInternship ? 'Edit Internship' : 'Create Internship'}</DialogTitle>
              <DialogDescription>Fill in the internship details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Frontend Developer Intern"
                />
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company name"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Internship description"
                  rows={4}
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 3 months, 6 months"
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingInternship ? 'Update Internship' : 'Create Internship'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Internships ({internships.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internships.map((internship) => (
                <TableRow key={internship.id}>
                  <TableCell className="font-medium">{internship.title}</TableCell>
                  <TableCell>{internship.company}</TableCell>
                  <TableCell>{internship.duration || 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => fetchApplicants(internship.id)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Applicants
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(internship)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(internship.id)}>
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

      {/* Applicants Dialog */}
      <Dialog open={showApplicantsDialog} onOpenChange={setShowApplicantsDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Applicants</DialogTitle>
            <DialogDescription>Manage internship applications</DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedInternshipApplicants.map((app, idx) => {
                // Get the internship_id from the first app (they're all for the same internship)
                const internshipId = idx === 0 ? selectedInternshipApplicants[0]?.id : '';
                
                return (
                  <TableRow key={app.id}>
                    <TableCell>{app.full_name || 'N/A'}</TableCell>
                    <TableCell>{app.email || 'N/A'}</TableCell>
                    <TableCell>{app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={app.status} 
                        onValueChange={(value: 'applied' | 'under_review' | 'accepted' | 'rejected') => {
                          // Find the internship_id from the current view
                          const currentInternshipId = internships.find(i => 
                            selectedInternshipApplicants.some(a => a.id === app.id)
                          )?.id || '';
                          updateApplicationStatus(app.id, value, currentInternshipId);
                        }}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="applied">Applied</SelectItem>
                          <SelectItem value="under_review">Under Review</SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInternships;
