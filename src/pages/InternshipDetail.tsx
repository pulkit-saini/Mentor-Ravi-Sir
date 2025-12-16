import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, Briefcase, CheckCircle2, Send, ArrowLeft, Award } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AuthModal from "@/components/AuthModal";
import { Skeleton } from "@/components/ui/skeleton";

interface Internship {
  id: string;
  title: string;
  company: string;
  duration: string;
  jobDescription?: string;
  description: string;
  location: string;
  mode: string;
  skills: string[];
  requirements: string[];
  responsibilities: string[];
}

export default function InternshipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    course_branch: "",
    year_semester: "",
    resume_url: "",
    selected_task: "",
    why_join: "",
    github_profile: "",
    portfolio_link: "",
  });

  useEffect(() => {
    fetchInternship();
  }, [id]);

  const fetchInternship = async () => {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 3000)
      );

      const fetchPromise = supabase
        .from('internships')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

      if (error) throw error;
      
      if (!data) {
        toast.error("Internship not found");
        navigate('/career');
        return;
      }

      setInternship(data);
    } catch (error: any) {
      console.error('Error fetching internship:', error);
      if (error.message === 'timeout') {
        toast.error("⏳ Server took too long to respond. Please try again.");
      } else {
        toast.error("Failed to load internship details");
      }
      navigate('/career');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowApplicationDialog(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !internship) {
      toast.error("Please login to apply");
      return;
    }

    if (!formData.full_name || !formData.email || !formData.phone || !formData.course_branch || 
        !formData.year_semester || !formData.resume_url || !formData.selected_task || !formData.why_join) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);

    try {
      const { data: existingApplication } = await supabase
        .from('internship_applications')
        .select('id')
        .eq('user_id', user.id)
        .eq('internship_id', internship.id)
        .maybeSingle();

      if (existingApplication) {
        toast.error("You have already applied for this internship");
        setSubmitting(false);
        return;
      }

      const { error: insertError } = await supabase
        .from('internship_applications')
        .insert({
          user_id: user.id,
          internship_id: internship.id,
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          course_branch: formData.course_branch,
          year_semester: formData.year_semester,
          resume_url: formData.resume_url,
          selected_task: formData.selected_task,
          why_join: formData.why_join,
          github_profile: formData.github_profile || null,
          portfolio_link: formData.portfolio_link || null,
          status: 'applied'
        });

      if (insertError) throw insertError;

      toast.success("Application submitted successfully!");
      setShowApplicationDialog(false);
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        course_branch: "",
        year_semester: "",
        resume_url: "",
        selected_task: "",
        why_join: "",
        github_profile: "",
        portfolio_link: "",
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-5xl mx-auto space-y-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!internship) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/career')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Internships
          </Button>

          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{internship.title}</h1>
            <p className="text-xl text-muted-foreground">
              {internship.company}
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {internship.location}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {internship.duration}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {internship.mode}
              </Badge>
            </div>

            <div className="flex gap-10 pt-6">
              <a href={internship.jobDescription} target="_blank">
              <Button size="lg" className="gap-2">
                <Send className="h-5 w-5" />
                Job Description
              </Button>
              </a>
              <Button size="lg" onClick={handleApplyClick} className="gap-2">
                <Send className="h-5 w-5" />
                I'm Interested - Apply Now
              </Button>
            </div>
          </div>

          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{internship.description}</p>
            </CardContent>
          </Card>

          {/* Tasks */}
          {internship.responsibilities && internship.responsibilities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>List of Tasks (Choose Any One)</CardTitle>
                <CardDescription>
                  Select and complete one project within 5 days
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {internship.responsibilities.map((task, index) => {
                  const [title, ...descParts] = task.split('<br>');
                  const description = descParts.join('<br>').trim();
                  
                  return (
                    <div key={index} className="space-y-2 pb-6 border-b last:border-0">
                      <h3 className="font-semibold text-lg flex items-start gap-2">
                        <span className="text-primary">{index + 1}.</span>
                        {title}
                      </h3>
                      {description && (
                        <p className="text-muted-foreground">{description}</p>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Technology Stack */}
          {internship.skills && internship.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Technology Stack Options</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {internship.skills.map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Submission Process */}
          {internship.requirements && internship.requirements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Submission Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal list-inside">
                  {internship.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ol>
                {internship.requirements[7] && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    <strong>Note:</strong> {internship.requirements[7].replace('Note: ', '')}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Evaluation Criteria */}
          <Card>
            <CardHeader>
              <CardTitle>Shortlisting Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Innovation & Learning Capability</span>
                  <Badge>30%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Timely Project Completion</span>
                  <Badge>50%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Enhanced Features & Implementation</span>
                  <Badge>20%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Timeline & Interview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>All students must complete and submit their chosen task within <strong>5 days</strong>.</p>
              <p className="text-sm text-muted-foreground">
                Only shortlisted candidates based on evaluation will be invited for the online interview.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-6">
            <Button size="lg" onClick={handleApplyClick} className="gap-2">
              <Send className="h-5 w-5" />
              I'm Interested - Apply Now
            </Button>
          </div>
        </div>
      </div>

      <Footer />

      <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {internship.title}</DialogTitle>
            <DialogDescription>
              Fill in all the required information to submit your application
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course_branch">Course / Branch *</Label>
                <Input
                  id="course_branch"
                  placeholder="e.g., B.Tech CSE"
                  value={formData.course_branch}
                  onChange={(e) => setFormData({ ...formData, course_branch: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year_semester">Year / Semester *</Label>
              <Input
                id="year_semester"
                placeholder="e.g., 3rd Year / 5th Semester"
                value={formData.year_semester}
                onChange={(e) => setFormData({ ...formData, year_semester: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume_url">Resume Link (Google Drive) *</Label>
              <Input
                id="resume_url"
                type="url"
                placeholder="https://drive.google.com/..."
                value={formData.resume_url}
                onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                Upload your resume to Google Drive and share the link with view access
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="selected_task">Which task will you complete? *</Label>
              <Select value={formData.selected_task} onValueChange={(value) => setFormData({ ...formData, selected_task: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a task" />
                </SelectTrigger>
                <SelectContent>
                  {internship.responsibilities && internship.responsibilities.map((task, index) => {
                    const title = task.split(' <br> ')[0];
                    return (
                      <SelectItem key={index} value={title}>
                        {title}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="why_join">Why do you want this internship? *</Label>
              <Textarea
                id="why_join"
                rows={4}
                placeholder="Tell us why you're interested in this internship..."
                value={formData.why_join}
                onChange={(e) => setFormData({ ...formData, why_join: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github_profile">GitHub Profile (Optional)</Label>
              <Input
                id="github_profile"
                type="url"
                placeholder="https://github.com/yourusername"
                value={formData.github_profile}
                onChange={(e) => setFormData({ ...formData, github_profile: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio_link">Portfolio Link (Optional)</Label>
              <Input
                id="portfolio_link"
                type="url"
                placeholder="https://yourportfolio.com"
                value={formData.portfolio_link}
                onChange={(e) => setFormData({ ...formData, portfolio_link: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}
