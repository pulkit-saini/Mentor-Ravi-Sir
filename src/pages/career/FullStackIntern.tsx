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
import { Briefcase, MapPin, Clock, Code, Target, CheckCircle2, Award, ArrowRight, ExternalLink, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

const FullStackIntern = () => {
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
      title: "Temple Tourism Website",
      problemStatement: "Many tourists and locals lack a simple, well-organized, visually engaging resource to explore India's temples — their histories, beliefs, local legends, best routes, and timings. There is also limited web presence for discovering and research cultural architecture.",
      objectives: [
        "Provide searchable, well-structured temple profiles across India",
        "Include directions, beliefs, visiting tips, best season time, and travel routes for each temple",
        "Highlight cultural history, architecture, and rituals, attractive for local and international users"
      ],
      keyFeatures: [
        "Search and filter temples (region/language type) filters",
        "Temple profile pages: with details, best time to visit, and map routes",
        "Image/gallery views, ideally, or thumbnail",
        "Engage User Panel for feedback",
        "Multi-language support and accessibility compliance",
        "Admin panel to add/edit temple data"
      ]
    },
    {
      title: "HMIS – Hospital Management System",
      problemStatement: "Hospitals require efficient, unified, and clinical track on integrated system to manage patients, appointments, billing and staff, leading to inefficiencies.",
      objectives: [
        "Create an easy, unified dashboard for hospital operations",
        "Build a modular HMIS for patient registration, appointment, billing, and staff management",
        "Use role-based dashboard for admin, doctors, reception, and billing staff"
      ],
      keyFeatures: [
        "Patient registration, appointment scheduling, and medical history tracking",
        "Role-based dash with appointments and patient notes",
        "Billing and invoicing module with receipt generation",
        "Staff management and admin analytics"
      ]
    },
    {
      title: "Custom Jacket Design Website",
      problemStatement: "Users need a seamless platform to design jackets with live visualization before purchase.",
      objectives: [
        "Build a custom design tool for jackets",
        "Allow customization of color, size, fabric, and logo",
        "Show a real-time (2/3D) preview of the design"
      ],
      keyFeatures: [
        "Design studio with customization options",
        "Preview and estimate",
        "Live 2D/3D rendering",
        "Allow calculating and order summary",
        "Admin panel to manage designs and orders"
      ],
      reference: "https://varsitybase.com"
    },
    {
      title: "NGO – Training and Skill Development Website",
      problemStatement: "NGOs need a simple yet inspiring web presence to display programs, recruit volunteers, and collect donations.",
      objectives: [
        "Create an inspiring website to showcase NGO programs and impact",
        "Provide volunteer signup and donation collection"
      ],
      keyFeatures: [
        "About Us, Programs, Success Stories sections",
        "Volunteer/partnership inquiry system",
        "Event calendar and blog",
        "Admin panel for content management"
      ],
      reference: "https://edunetfoundation.org"
    },
    {
      title: "Skill Development Portal For State Govt.",
      problemStatement: "Students need a unified portal like Naan Mudhalvan for accessing career guidance, course details, and training programs.",
      objectives: [
        "Provide course listings, institute details, and career pathways",
        "Include login for students, training providers, and admins"
      ],
      keyFeatures: [
        "Student login and personalized dashboard",
        "Career guidance and skill/role overview",
        "Dive trained dashboards for users",
        "Admin moderation and analytics"
      ],
      reference: "https://www.naanmudhalvan.tn.gov.in"
    }
  ];

  const techStack = [
    "MERN Stack (MongoDB, Express.js, React.js, Node.js)",
    "HTML, CSS, JavaScript & PHP",
    "GitHub (CI/CD Integration) for version control and automated deployment"
  ];

  return (
    <>
      <SEO 
        title="Full Stack Intern - MangosOrange"
        description="Apply for Full Stack Internship at MangosOrange. Build and maintain MERN-based applications with real mentors."
        keywords="full stack internship, MERN stack, web development, React, Node.js, tech internship"
      />
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
                      Full Stack Development Intern
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
                  <span>Remote / Hybrid</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>3–6 Months</span>
                </div>
                <Badge variant="secondary">#Development</Badge>
              </div>
            </div>

            {/* About the Role */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>About the Role</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Build and maintain web applications using modern web technologies (MERN Stack). Work with real projects, mentors, and a 
                  collaborative tech team. All students applying for the internship must complete any one of the tasks listed below within 5 days. 
                  This task will be used for evaluating and shortlisting candidates for the final interview.
                </p>
                <p className="font-semibold text-foreground mt-4">Under the Aegis of MangosOrange Group</p>
              </CardContent>
            </Card>

            {/* Selection Process */}
            <Card className="mb-6 border-2 border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Code className="w-6 h-6 text-primary" />
                  List of Tasks (Choose Any One)
                </CardTitle>
                <CardDescription>
                  Complete any one task below within 5 days for evaluation and shortlisting
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {tasks.map((task, index) => (
                  <Card key={index} className="bg-muted/30 border-2 hover:border-primary/30 transition-colors">
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
                          {task.objectives.map((objective, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">Key Features:</h4>
                        <ul className="space-y-1.5">
                          {task.keyFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Reference Link */}
                      {task.reference && (
                        <div className="pt-2 border-t">
                          <a 
                            href={task.reference} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                          >
                            Frontend Base (React) + Backend (Node) Backend: Node.js/Express or Django | DB: PostgreSQL/MongoDB | Hosting: Vercel/Heroku
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Skills Required / Technology Stack */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Skills Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">HTML</Badge>
                  <Badge variant="secondary">CSS</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">React.js</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Express.js</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                  <Badge variant="secondary">Git</Badge>
                  <Badge variant="secondary">GitHub</Badge>
                  <Badge variant="secondary">PHP</Badge>
                </div>
                <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h4 className="font-semibold mb-3 text-sm">Technology Stack Options:</h4>
                  <ul className="space-y-2">
                    {techStack.map((tech, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Responsibilities / Submission Process */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Develop frontend and backend components</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Integrate APIs and databases</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Deploy and maintain applications</span>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-4">Submission Requirements:</h4>
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
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 italic">
                    <strong>Note:</strong> Use of AI tools (ChatGPT, GitHub Copilot, etc.) is allowed — however, 
                    you must clearly understand and explain your code during the interview.
                  </p>
                </div>
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
              <Button 
                size="lg" 
                onClick={handleApplyClick}
                className="w-full md:w-auto min-w-[200px] gap-2"
              >
                Apply Now
              </Button>
            </div>

            {/* Company Info */}
            <Card className="bg-muted/30 border-muted">
              <CardContent className="p-6 text-center space-y-2">
                <p className="font-semibold">MangosOrange Services Private Limited</p>
                <p className="text-sm text-muted-foreground">
                  Corp. Off.: Top Floor, H-87, Sector-63, Noida, Uttar Pradesh – 201301
                </p>
                <p className="text-sm text-muted-foreground">
                  Contact: +91 1204164821 | Email: ravi@mangosorange.com | Web: www.mangosorange.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

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
          internshipId="full-stack"
          internshipTitle="Full Stack Intern"
        />
      </div>
    </>
  );
};

export default FullStackIntern;
