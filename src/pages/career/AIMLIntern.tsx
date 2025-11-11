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

const AIMLIntern = () => {
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

  const tasks = [
    {
      title: "AI-Powered Resume Screener",
      description: "Build an AI system that analyzes resumes, extracts key information, and scores candidates based on job requirements using NLP and machine learning."
    },
    {
      title: "Predictive Model for Student Success",
      description: "Create a predictive analytics model that forecasts student performance and identifies at-risk students early, enabling proactive interventions."
    },
    {
      title: "Chatbot using Gemini API for Mentorship Queries",
      description: "Develop an intelligent chatbot powered by Gemini API that answers student queries about mentorship programs, career guidance, and skill development."
    },
    {
      title: "Image Classification System",
      description: "Build a computer vision system that classifies and categorizes images for educational content, using deep learning frameworks like TensorFlow or PyTorch."
    }
  ];

  const techStack = [
    "Python & Machine Learning Libraries (TensorFlow, PyTorch, Scikit-learn)",
    "Natural Language Processing (NLTK, SpaCy, Transformers)",
    "Gemini API / OpenAI API for AI integrations",
    "Flask / FastAPI for backend development",
    "React.js for frontend interfaces",
    "GitHub for version control"
  ];

  return (
    <>
      <SEO 
        title="AI/ML Intern - MangosOrange"
        description="Apply for AI/ML Internship at MangosOrange. Work on real-world AI & ML projects, model training, and data operations."
        keywords="AI internship, ML internship, machine learning, artificial intelligence, tech internship"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/career')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Careers
              </Button>
              <Badge variant="secondary" className="text-base px-4 py-2">
                <Briefcase className="w-4 h-4 mr-2 inline" />
                AI/ML Internship
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold">
                AI/ML Intern - 5 Day Hackathon Challenge
              </h1>
              <p className="text-xl text-muted-foreground">
                Work on real-world AI & ML projects, model training, and data operations
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Remote / Hybrid</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>3–6 Months</span>
                </div>
              </div>

              <Button size="lg" onClick={handleApplyClick} className="mt-6">
                Apply Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    All students applying for the AI/ML internship must complete any one of the tasks listed below within 5 days. 
                    This task will be used for evaluating and shortlisting candidates for the final interview.
                  </p>
                  <p>
                    Join MangosOrange's AI/ML team and gain hands-on experience with cutting-edge artificial intelligence 
                    and machine learning technologies. Work alongside experienced mentors on real-world projects.
                  </p>
                </CardContent>
              </Card>

              {/* Task Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    List of Tasks (Choose Any One)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tasks.map((task, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:border-primary transition-colors">
                      <h3 className="font-semibold text-lg mb-2 flex items-start gap-2">
                        <span className="text-primary">{index + 1}.</span>
                        {task.title}
                      </h3>
                      <p className="text-muted-foreground">{task.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Technology Stack */}
              <Card>
                <CardHeader>
                  <CardTitle>Technology Stack Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {techStack.map((tech, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Submission Process */}
              <Card>
                <CardHeader>
                  <CardTitle>Submission Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li>Upload your complete project code to GitHub (make repository public)</li>
                    <li>Deploy your project on Vercel, Netlify, or Hugging Face Spaces</li>
                    <li>Submit the live project link and GitHub repository link</li>
                    <li>Create a short PDF report describing your approach, model architecture, and learning experience</li>
                  </ol>
                  <p className="text-sm text-muted-foreground mt-4">
                    <strong>Note:</strong> Use of AI tools (like ChatGPT, GitHub Copilot, etc.) is allowed — however, 
                    students must clearly understand and explain their own code during the interview.
                  </p>
                </CardContent>
              </Card>

              {/* Timeline & Criteria */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">5 Days</p>
                    <p className="text-muted-foreground text-sm">
                      All students must complete and submit their chosen task within 5 days.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Interview Call
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Only shortlisted candidates based on evaluation will be invited for the online interview.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Shortlisting Criteria */}
              <Card>
                <CardHeader>
                  <CardTitle>Shortlisting Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-semibold">Criteria</th>
                          <th className="text-right p-3 font-semibold">Weightage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3">Innovation & Learning Capability</td>
                          <td className="text-right p-3">30%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3">Timely Project Completion</td>
                          <td className="text-right p-3">50%</td>
                        </tr>
                        <tr>
                          <td className="p-3">Enhanced Features & Implementation</td>
                          <td className="text-right p-3">20%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center space-y-2">
                  <p className="font-semibold">MangosOrange Services Private Limited</p>
                  <p className="text-sm text-muted-foreground">
                    Corp. Off.: Top Floor, H-87, Sector-63, Noida, Uttar Pradesh – 201301
                  </p>
                  <p className="text-sm">
                    Contact: +91 1204164821 | Email: ravi@mangosorange.com | Web: www.mangosorange.com
                  </p>
                </CardContent>
              </Card>

              {/* Sticky Apply Button Mobile */}
              <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-lg">
                <Button size="lg" onClick={handleApplyClick} className="w-full">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            setShowApplicationModal(true);
          }}
        />

        <InternshipApplicationModal
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
          internshipId="ai-ml"
          internshipTitle="AI/ML Intern"
        />
      </div>
    </>
  );
};

export default AIMLIntern;
