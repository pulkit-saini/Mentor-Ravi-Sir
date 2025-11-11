import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Clock, Award, CheckCircle2, Briefcase, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import AuthModal from "@/components/AuthModal";
import InternshipApplicationForm from "@/components/InternshipApplicationForm";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Internship {
  id: string;
  title: string;
  company: string;
  description: string | null;
  duration: string | null;
  location: string | null;
  mode: string | null;
  skills: string[] | null;
  responsibilities: string[] | null;
  requirements: string[] | null;
  created_at: string;
}

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { 
    showAuthModal, 
    setShowAuthModal, 
    executeProtectedAction, 
    completePendingAction 
  } = useProtectedAction();

  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);

  useEffect(() => {
    const fetchInternship = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('internships')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setInternship(data);
      } catch (error) {
        console.error('Error fetching internship:', error);
        toast({
          title: "Error",
          description: "Failed to load internship details",
          variant: "destructive",
        });
        navigate('/career');
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id, navigate, toast]);

  useEffect(() => {
    completePendingAction((action) => {
      if (action.type === 'apply_internship' && action.data?.internshipId === id) {
        setIsApplyDialogOpen(true);
      }
    });
  }, [completePendingAction, id]);

  const handleApplyClick = () => {
    if (!user) {
      setShowAuthModal(true);
      localStorage.setItem('pendingAction', JSON.stringify({ 
        type: 'apply_internship', 
        data: { internshipId: id } 
      }));
    } else {
      setIsApplyDialogOpen(true);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-20 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!internship) {
    return null;
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/career')}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Careers
          </Button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{internship.title}</h1>
                <p className="text-xl text-muted-foreground">{internship.company}</p>
              </div>
              <Button 
                onClick={handleApplyClick}
                className="gap-2"
              >
                <Briefcase className="w-4 h-4" />
                Apply Now
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 text-muted-foreground">
              {internship.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{internship.location}</span>
                </div>
              )}
              {internship.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{internship.duration}</span>
                </div>
              )}
              {internship.mode && (
                <Badge variant="outline">{internship.mode}</Badge>
              )}
            </div>
          </div>

          {/* Description */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>About the Role</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {internship.description}
              </p>
            </CardContent>
          </Card>

          {/* Responsibilities */}
          {internship.responsibilities && internship.responsibilities.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {internship.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Skills Required */}
          {internship.skills && internship.skills.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Requirements */}
          {internship.requirements && internship.requirements.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {internship.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Selection Process */}
          <Card className="mb-6 border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="text-2xl">Selection Process - 5 Day Hackathon Challenge</CardTitle>
              <CardDescription>
                Complete any one task below within 5 days for evaluation and shortlisting
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Task Options */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Choose Any One Task:</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "1. The Gemini-Powered Personalized Study Path Generator",
                      desc: "Use the Gemini API to analyze a student's performance data and dynamically generate personalized daily/weekly study plans, including links to resources and AI-generated flashcards."
                    },
                    {
                      title: "2. Automated Assignment Lifecycle Management System",
                      desc: "Allow faculty to create, schedule, and publish assignments digitally. Enable students to submit assignments through a unified online portal. Provide tools for automated grading or structured manual evaluation."
                    },
                    {
                      title: "3. Secure & Smart Exam Proctoring/Authentication with Vision AI",
                      desc: "Prototype a proof-of-concept for a secure exam environment. The system will leverage device camera data and Vision AI/Gemini (Visual Analysis) to continuously verify identity and detect unauthorized activity."
                    },
                    {
                      title: "4. The AI-Driven Code Review and Debugging Assistant",
                      desc: "Develop an integrated tool using Gemini's reasoning to perform an initial code review, identify bugs/non-optimal structures, and provide a natural language explanation of the issue and a suggested fix."
                    }
                  ].map((task, idx) => (
                    <Card key={idx} className="bg-muted/50">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Technology Stack */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-3">Technology Stack Options:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Frontend (for user-interface)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Backend (for logic and API's)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Google Workspace Tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>GitHub (CI/CD Integration) for version control and automated deployment</span>
                  </li>
                </ul>
              </div>

              {/* Submission Process */}
              <div>
                <h3 className="font-semibold mb-3">Submission Requirements:</h3>
                <div className="space-y-2">
                  {[
                    "Upload complete project code to GitHub (public repository)",
                    "Deploy your project on Vercel or Netlify",
                    "Submit live project link and GitHub repository link",
                    "Create a short PDF report describing your approach, design choices, and learning experience"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">
                        {idx + 1}
                      </span>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">
                  Note: Use of AI tools (ChatGPT, GitHub Copilot, etc.) is allowed — however, you must clearly understand and explain your code during the interview.
                </p>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <div>
                  <p className="font-semibold">Timeline: 5 Days</p>
                  <p className="text-sm text-muted-foreground">Complete and submit within 5 days from application</p>
                </div>
              </div>

              {/* Shortlisting Criteria */}
              <div>
                <h3 className="font-semibold mb-3">Shortlisting Criteria:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 bg-muted/50">Criteria</th>
                        <th className="text-right p-3 bg-muted/50">Weightage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">Innovation & Learning Capability</td>
                        <td className="text-right p-3 font-semibold text-primary">30%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Timely Project Completion</td>
                        <td className="text-right p-3 font-semibold text-primary">50%</td>
                      </tr>
                      <tr>
                        <td className="p-3">Enhanced Features & Implementation</td>
                        <td className="text-right p-3 font-semibold text-primary">20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Interview Call */}
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-700 dark:text-green-300">Final Interview</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Only shortlisted candidates based on evaluation will be invited for the online interview.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Perks */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What You'll Get</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                  <Award className="w-6 h-6 text-primary" />
                  <span className="font-medium">Certificate</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <span className="font-medium">Mentorship</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                  <Award className="w-6 h-6 text-primary" />
                  <span className="font-medium">Recommendation</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Apply Button */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={handleApplyClick}
              className="w-full md:w-auto min-w-[200px]"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <InternshipApplicationForm
        isOpen={isApplyDialogOpen}
        onClose={() => setIsApplyDialogOpen(false)}
        internshipId={internship.id}
        internshipTitle={internship.title}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <Footer />
    </>
  );
};

export default InternshipDetail;
