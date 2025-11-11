import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import InternshipApplicationModal from "@/components/InternshipApplicationModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Briefcase, MapPin, Clock, Code, Target, CheckCircle2, Award, ArrowRight, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
const GoogleWorkspaceIntern = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const handleApplyClick = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowApplicationModal(true);
    }
  };
  const tasks = [{
    title: "The Gemini-Powered Personalized Study Path Generator",
    problemStatement: "Many students struggle to organize and follow effective study routines. This system uses Gemini API to analyze performance data (test scores, weak areas, learning pace). If will include week/daily period to generate a dynamic AI-personalized study plan, with topics, resources and AI generated flash card for rapid learning.",
    objectives: ["Personalize study plans using AI", "Use Gemini API for generating study plans and flashcards", "Generate AI-based learning modules like flashcards", "Track and adjust plans based on ongoing learning"],
    keyFeatures: ["Student Profile and Performance Analytics Dashboard", "Gemini-driven Plan Generation (daily/weekly tasks)", "Integrated flashcards and resource recommendations", "Adaptive plan setting and evaluation tracker"],
    techStack: "Frontend (React) / Next.js Backend: Node.js / Django: AI Integration: Gemini API Database: MongoDB / Firestore: Hosting: Vercel / AWS"
  }, {
    title: "Automated Assignment Lifecycle Management System",
    problemStatement: "Manual assignment management is time-consuming for both faculty and students. This system streamlines assignment creation, submission, grading, and review through a unified digital portal.",
    objectives: ["Create digital workflow for assignments", "Simplify submission and grading processes", "Provide structured manual and automated grading tools", "Maintain transparency and timely notifications"],
    keyFeatures: ["Faculty dashboard to upload and schedule assignments", "Student submission interface with status tracking", "Auto-grading (MCQs, coding tests) and manual evaluation tools", "Plagiarism detection integration", "Notification and reminder system"],
    techStack: "Frontend: Angular / React: Backend: Django / Node.js: Database: PostgreSQL / Firestore: AI Tools: Check API (for grading assistance): Hosting: AWS / GCP"
  }, {
    title: "Secure & Smart Exam Proctoring/Authentication with Vision AI",
    problemStatement: "Online exams require major integrity issues like impersonation and cheating. This project uses Vision AI and Gemini's Visual (capability) to ensure identity verification and detect suspicious activities in real-time.",
    objectives: ["Build a secure online exam proctoring system", "Verify student identity using Vision AI", "Detect unauthorized behavior through continuous analysis", "Maintain privacy while ensuring exam integrity"],
    keyFeatures: ["Real-time location and activity tracking", "AI detection of multiple faces or mobile use", "Automated exam session logging", "Admin dashboard with real-time alerts"],
    techStack: "Frontend: React / Next.js: Backend: Python (FastAPI) / OpenCV: AI Integration: Gemini Visual AI / OpenCV / TensorFlow: Database: MongoDB / PostgreSQL: Hosting: Google Cloud / Azure"
  }, {
    title: "The AI-Driven Code Review and Debugging Assistant",
    problemStatement: "Manual code review is time-consuming and requires expertise. This system leverages Gemini's reasoning power to automatically analyze code, suggest performance and structural optimizations.",
    objectives: ["Automate code review and debugging", "Leverage Gemini AI for readable explanations of errors", "Suggest performance and structural optimizations", "Integrate with IDE or online editors"],
    keyFeatures: ["Code upload or editor-based review", "AI detection of errors and inefficient patterns", "Bug detection and explanation suggestions", "Explain and warnings module for students"],
    techStack: "Frontend: React / Monaco Editor: Backend: FastAPI / Node.js: AI Integration: Gemini API: Database: PostgreSQL / MongoDB: Hosting: Vercel / AWS"
  }];
  const techStack = [{
    category: "Frontend",
    items: ["React.js, Vue.js, or Angular for user interface development"]
  }, {
    category: "Backend",
    items: ["Node.js, Python (Flask/FastAPI), or PHP for logic and API development"]
  }, {
    category: "Google Workspace Tools",
    items: ["Google Apps Script, Google Sheets API, Google Drive API, Gemini API"]
  }, {
    category: "Version Control",
    items: ["GitHub with CI/CD Integration for automated deployment"]
  }];
  return <>
      <SEO title="Google Workspace Intern - MangosOrange" description="Apply for Google Workspace Internship at MangosOrange. Manage and automate Google Workspace tasks with AI integrations." keywords="google workspace internship, gemini api, google apps script, automation, tech internship" />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            
            <Button 
              variant="ghost" 
              onClick={() => navigate('/career')}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Button>
            
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      Google Workspace Intern
                    </h1>
                    <p className="text-lg text-muted-foreground">MangosOrange Services Private Limited</p>
                  </div>
                </div>
                <Button size="lg" onClick={handleApplyClick} className="gap-2 md:min-w-[140px]">
                  Apply Now
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Remote</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>3 Months</span>
                </div>
                <Badge variant="secondary">#AI Integration</Badge>
              </div>
            </div>

            {/* About the Role */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>About the Role</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Manage and automate Google Workspace tasks with AI integrations using Gemini API. All students applying for the internship 
                  must complete any one of the tasks listed below within 5 days. This task will be used for evaluating and shortlisting 
                  candidates for the final interview.
                </p>
                <p className="font-semibold text-foreground mt-4">Under the Aegis of MangosOrange Group</p>
              </CardContent>
            </Card>

            {/* Selection Process */}
            <Card className="mb-6 border-2 border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Code className="w-6 h-6 text-primary" />
                  Detailed Task Information
                </CardTitle>
                <CardDescription>
                  Complete any one task below within 5 days for evaluation and shortlisting
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {tasks.map((task, index) => <Card key={index} className="bg-muted/30 border-2 hover:border-primary/30 transition-colors">
                    <CardContent className="pt-6 space-y-4">
                      {/* Task Title */}
                      <div className="flex items-start gap-3 mb-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-base flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <h3 className="font-bold text-xl text-foreground">{task.title}</h3>
                      </div>

                      {/* Problem Statement */}
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">Problem Statement:</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {task.problemStatement}
                        </p>
                      </div>

                      {/* Objectives */}
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">Objectives:</h4>
                        <ul className="space-y-1.5">
                          {task.objectives.map((objective, idx) => <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{objective}</span>
                            </li>)}
                        </ul>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">Key Features:</h4>
                        <ul className="space-y-1.5">
                          {task.keyFeatures.map((feature, idx) => <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>)}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="pt-2 border-t">
                        
                      </div>
                    </CardContent>
                  </Card>)}
              </CardContent>
            </Card>

            {/* Technology Stack */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Technology Stack Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="space-y-4">
                    {techStack.map((stack, index) => <div key={index}>
                        <h4 className="font-semibold mb-2 text-sm text-foreground">{stack.category}:</h4>
                        <div className="space-y-2 ml-4">
                          {stack.items.map((item, idx) => <div key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </div>)}
                        </div>
                      </div>)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submission Process */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Submission Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["Upload complete project code to GitHub (public repository)", "Deploy your project on Vercel or Netlify", "Submit live project link and GitHub repository link", "Create a short PDF report describing your approach, design choices, and learning experience"].map((item, idx) => <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>)}
                </div>
                <p className="text-xs text-muted-foreground mt-3 italic">
                  <strong>Note:</strong> Use of AI tools (ChatGPT, GitHub Copilot, etc.) is allowed — however, 
                  you must clearly understand and explain your code during the interview.
                </p>
              </CardContent>
            </Card>

            {/* Timeline */}
            <div className="mb-6 flex items-center gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <div>
                <p className="font-semibold">Timeline: 5 Days</p>
                <p className="text-sm text-muted-foreground">Complete and submit within 5 days from application</p>
              </div>
            </div>

            {/* Shortlisting Criteria */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Shortlisting Criteria</CardTitle>
              </CardHeader>
              <CardContent>
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
                        <td className="p-3 text-muted-foreground">Innovation & Learning Capability</td>
                        <td className="text-right p-3 font-semibold text-primary">30%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 text-muted-foreground">Timely Project Completion</td>
                        <td className="text-right p-3 font-semibold text-primary">50%</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-muted-foreground">Enhanced Features & Implementation</td>
                        <td className="text-right p-3 font-semibold text-primary">20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Interview Call */}
            <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-700 dark:text-green-300">Final Interview</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Only shortlisted candidates based on evaluation will be invited for the online interview.
                  </p>
                </div>
              </div>
            </div>

            {/* Perks & Benefits */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Perks & Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <span className="font-medium">Certificate of Completion</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <span className="font-medium">Real Project Exposure</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <span className="font-medium">Mentorship Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Apply Button */}
            <div className="flex justify-center mb-6">
              <Button size="lg" onClick={handleApplyClick} className="w-full md:w-auto min-w-[200px] gap-2">
                Apply Now
              </Button>
            </div>

            {/* Company Info */}
            <Card className="bg-muted/30 border-muted">
              <CardContent className="p-6 text-center space-y-2">
                <p className="font-semibold">MangosOrange Services Private Limited</p>
                <p className="text-sm text-muted-foreground">
                  Corp. Off.: 1ST Floor, G-282, Sector-63, Noida, Uttar Pradesh – 201301
                </p>
                <p className="text-sm text-muted-foreground">
                  Contact: +91 1204164821 | Email: ravi@mangosorange.com | Web: www.mangosorange.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onSuccess={() => {
        setShowAuthModal(false);
        setShowApplicationModal(true);
      }} />

        <InternshipApplicationModal isOpen={showApplicationModal} onClose={() => setShowApplicationModal(false)} internshipId="google-workspace" internshipTitle="Google Workspace Intern" />
      </div>
    </>;
};
export default GoogleWorkspaceIntern;