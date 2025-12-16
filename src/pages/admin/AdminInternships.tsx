import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Internship {
  id: string;
  title: string;
  company: string;
  description: string | null;
  jobDescription?: string | null;
  duration: string | null;
  location: string;
  mode: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
  created_at: string | null;
}

interface Application {
  id: string;
  user_id: string;
  status: 'applied' | 'under_review' | 'accepted' | 'rejected';
  applied_at: string | null;
  full_name?: string;
  email?: string;
  phone?: string;
  course_branch?: string;
  year_semester?: string;
  selected_task?: string;
  resume_url?: string;
  github_profile?: string;
  portfolio_link?: string;
  cover_letter?: string;
  why_join?: string;
}

const AdminInternships = () => {
  const { toast } = useToast();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showApplicantsDialog, setShowApplicantsDialog] = useState(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [selectedInternshipApplicants, setSelectedInternshipApplicants] = useState<Application[]>([]);
  const [currentInternshipId, setCurrentInternshipId] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    jobDescription: "",
    description: "",
    duration: "",
    location: "",
    mode: "",
    skills: [] as string[],
    responsibilities: [] as string[],
    requirements: [] as string[]
  });

  // Temporary state for array inputs
  const [skillInput, setSkillInput] = useState("");
  const [responsibilityInput, setResponsibilityInput] = useState("");
  const [requirementInput, setRequirementInput] = useState("");

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
    setCurrentInternshipId(internshipId);
    
    const { data: applications, error } = await supabase
      .from('internship_applications')
      .select('*')
      .eq('internship_id', internshipId);

    if (error) {
      toast({ title: "Error fetching applicants", variant: "destructive" });
      return;
    }

    const userIds = applications?.map(app => app.user_id) || [];
    let profiles: any[] = [];
    
    if (userIds.length > 0) {
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, email, mobile_number')
        .in('id', userIds);

      if (profilesError) {
        toast({ title: "Error fetching profiles", variant: "destructive" });
        return;
      }
      profiles = profilesData || [];
    }

    const enrichedApplications = applications?.map(app => {
      const profile = profiles?.find(p => p.id === app.user_id);
      return {
        ...app,
        full_name: app.full_name || profile?.full_name || 'Unknown',
        email: app.email || profile?.email || 'Unknown',
        phone: app.phone || profile?.mobile_number || 'N/A',
      };
    });

    setSelectedInternshipApplicants(enrichedApplications || []);
    setShowApplicantsDialog(true);
  };

  const updateApplicationStatus = async (applicationId: string, status: 'applied' | 'under_review' | 'accepted' | 'rejected') => {
    const { error } = await supabase
      .from('internship_applications')
      .update({ status })
      .eq('id', applicationId);

    if (error) {
      toast({ title: "Error updating status", variant: "destructive" });
    } else {
      toast({ title: "Status updated successfully" });
      if (currentInternshipId) {
        fetchApplicants(currentInternshipId);
      }
    }
  };

  const downloadCSV = () => {
    if (selectedInternshipApplicants.length === 0) {
      toast({ title: "No data to download", variant: "destructive" });
      return;
    }

    const headers = ['Name', 'Email', 'Phone', 'Course/Branch', 'Year/Semester', 'Status', 'Selected Task', 'Applied Date', 'Resume URL', 'GitHub', 'Portfolio'];
    
    const rows = selectedInternshipApplicants.map(app => [
      app.full_name || 'N/A',
      app.email || 'N/A',
      app.phone || 'N/A',
      app.course_branch || 'N/A',
      app.year_semester || 'N/A',
      app.status || 'N/A',
      app.selected_task || 'N/A',
      app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'N/A',
      app.resume_url || 'N/A',
      app.github_profile || 'N/A',
      app.portfolio_link || 'N/A',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `internship_applicants_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({ title: "CSV downloaded successfully" });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.company || !formData.location || !formData.mode) {
      toast({ title: "Title, company, location, and mode are required", variant: "destructive" });
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
    setFormData({
      title: "",
      company: "",
      jobDescription: "",
      description: "",
      duration: "",
      location: "",
      mode: "",
      skills: [],
      responsibilities: [],
      requirements: []
    });
    setSkillInput("");
    setResponsibilityInput("");
    setRequirementInput("");
    setEditingInternship(null);
    setShowDialog(false);
  };

  const handleEdit = (internship: Internship) => {
    setEditingInternship(internship);
    setFormData({
      title: internship.title,
      company: internship.company,
      jobDescription: internship.jobDescription,
      description: internship.description || "",
      duration: internship.duration || "",
      location: internship.location,
      mode: internship.mode,
      skills: internship.skills || [],
      responsibilities: internship.responsibilities || [],
      requirements: internship.requirements || []
    });
    setShowDialog(true);
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    setFormData({ ...formData, skills: formData.skills.filter((_, i) => i !== index) });
  };

  const addResponsibility = () => {
    if (responsibilityInput.trim()) {
      setFormData({ ...formData, responsibilities: [...formData.responsibilities, responsibilityInput.trim()] });
      setResponsibilityInput("");
    }
  };

  const removeResponsibility = (index: number) => {
    setFormData({ ...formData, responsibilities: formData.responsibilities.filter((_, i) => i !== index) });
  };

  const addRequirement = () => {
    if (requirementInput.trim()) {
      setFormData({ ...formData, requirements: [...formData.requirements, requirementInput.trim()] });
      setRequirementInput("");
    }
  };

  const removeRequirement = (index: number) => {
    setFormData({ ...formData, requirements: formData.requirements.filter((_, i) => i !== index) });
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingInternship ? 'Edit Internship' : 'Create Internship'}</DialogTitle>
              <DialogDescription>Fill in the internship details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Frontend Developer Intern"
                />
              </div>
              <div>
                <Label>Company *</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company name"
                />
              </div>
              <div>
                <Label>Location *</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Mumbai, Delhi, Remote"
                />
              </div>
              <div>
                <Label>Mode *</Label>
                <Select value={formData.mode} onValueChange={(value) => setFormData({ ...formData, mode: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 3 months, 6 months"
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
                <Label>Description</Label>
                <Textarea
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                  placeholder="Internship Job Description"
                  rows={4}
                />
              </div>
              <div>
                <Label>Skills</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(index)}>
                      {skill} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Responsibilities</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={responsibilityInput}
                    onChange={(e) => setResponsibilityInput(e.target.value)}
                    placeholder="Add a responsibility"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())}
                  />
                  <Button type="button" onClick={addResponsibility}>Add</Button>
                </div>
                <div className="space-y-1">
                  {formData.responsibilities.map((resp, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span className="flex-1">{resp}</span>
                      <Button type="button" size="sm" variant="ghost" onClick={() => removeResponsibility(index)}>×</Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Requirements</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    placeholder="Add a requirement"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                  />
                  <Button type="button" onClick={addRequirement}>Add</Button>
                </div>
                <div className="space-y-1">
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span className="flex-1">{req}</span>
                      <Button type="button" size="sm" variant="ghost" onClick={() => removeRequirement(index)}>×</Button>
                    </div>
                  ))}
                </div>
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
                <TableHead>Location</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internships.map((internship) => (
                <TableRow key={internship.id}>
                  <TableCell className="font-medium">{internship.title}</TableCell>
                  <TableCell>{internship.company}</TableCell>
                  <TableCell>{internship.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{internship.mode}</Badge>
                  </TableCell>
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

      <Dialog open={showApplicantsDialog} onOpenChange={setShowApplicantsDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <div>
                <DialogTitle>Applicants ({selectedInternshipApplicants.length})</DialogTitle>
                <DialogDescription>Manage internship applications</DialogDescription>
              </div>
              <Button onClick={downloadCSV} variant="outline" size="sm">
                Download CSV
              </Button>
            </div>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Course/Year</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedInternshipApplicants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No applicants found for this internship
                  </TableCell>
                </TableRow>
              ) : (
                selectedInternshipApplicants.map((app: any) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.full_name}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {app.course_branch && app.year_semester ? (
                        <div className="text-sm">
                          <div className="font-medium">{app.course_branch}</div>
                          <div className="text-muted-foreground text-xs">{app.year_semester}</div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {app.selected_task ? (
                        <span className="text-sm">{app.selected_task}</span>
                      ) : (
                        <span className="text-muted-foreground text-sm">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2 min-w-[140px]">
                        {app.phone && app.phone !== 'N/A' && (
                          <div className="text-xs text-muted-foreground">
                            Phone: {app.phone}
                          </div>
                        )}
                        {app.resume_url && (
                          <Button size="sm" variant="outline" asChild className="w-full">
                            <a href={app.resume_url} target="_blank" rel="noopener noreferrer">
                              View Resume
                            </a>
                          </Button>
                        )}
                        {app.github_profile && (
                          <Button size="sm" variant="outline" asChild className="w-full">
                            <a href={app.github_profile} target="_blank" rel="noopener noreferrer">
                              GitHub
                            </a>
                          </Button>
                        )}
                        {app.portfolio_link && (
                          <Button size="sm" variant="outline" asChild className="w-full">
                            <a href={app.portfolio_link} target="_blank" rel="noopener noreferrer">
                              Portfolio
                            </a>
                          </Button>
                        )}
                        <Select value={app.status} onValueChange={(value: 'applied' | 'under_review' | 'accepted' | 'rejected') => updateApplicationStatus(app.id, value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="applied">Applied</SelectItem>
                            <SelectItem value="under_review">Under Review</SelectItem>
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInternships;