import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle,
  PlayCircle,
  Lock,
  Star,
  Trophy,
  Zap,
  Download,
  ArrowLeft,
  FileText,
  Video,
  MessageSquare,
  Share2
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const coursesData: Record<string, any> = {
  "startup-incubation": {
    id: 1,
    title: "Startup Incubation Program",
    category: "Entrepreneurship",
    instructor: "Ravi Rautela",
    progress: 65,
    totalLessons: 48,
    completedLessons: 31,
    duration: "12 Weeks",
    enrolledDate: "Jan 15, 2025",
    status: "In Progress",
    points: 780,
    maxPoints: 1200,
    badges: ["Startup Visionary"],
    nextMilestone: "Business Strategist Badge",
    description: "Comprehensive program to turn your startup idea into a fundable business.",
    modules: [
      {
        id: 1,
        title: "Week 1-3: Idea Validation & Market Research",
        lessons: [
          { id: 1, title: "Introduction to Startup Ecosystem", duration: "45 min", completed: true, type: "video" },
          { id: 2, title: "Problem-Solution Fit", duration: "1 hr", completed: true, type: "video" },
          { id: 3, title: "Market Research Techniques", duration: "1.5 hr", completed: true, type: "video" },
          { id: 4, title: "Customer Interviews Workshop", duration: "2 hr", completed: true, type: "assignment" }
        ]
      },
      {
        id: 2,
        title: "Week 4-6: Business Model & Revenue Streams",
        lessons: [
          { id: 1, title: "Business Model Canvas Deep Dive", duration: "1 hr", completed: true, type: "video" },
          { id: 2, title: "Revenue Model Selection", duration: "1 hr", completed: true, type: "video" },
          { id: 3, title: "Pricing Strategies", duration: "45 min", completed: true, type: "video" },
          { id: 4, title: "Create Your Business Model", duration: "3 hr", completed: false, type: "assignment" }
        ]
      },
      {
        id: 3,
        title: "Week 7-9: Product Development & MVP",
        lessons: [
          { id: 1, title: "Lean Startup Methodology", duration: "1 hr", completed: true, type: "video" },
          { id: 2, title: "Building Your MVP", duration: "1.5 hr", completed: false, type: "video" },
          { id: 3, title: "Product Roadmap Planning", duration: "1 hr", completed: false, type: "video" },
          { id: 4, title: "MVP Development Project", duration: "4 hr", completed: false, type: "assignment" }
        ]
      },
      {
        id: 4,
        title: "Week 10-12: Fundraising & Investor Pitch",
        lessons: [
          { id: 1, title: "Fundraising Landscape", duration: "1 hr", completed: false, type: "video" },
          { id: 2, title: "Pitch Deck Mastery", duration: "1.5 hr", completed: false, type: "video" },
          { id: 3, title: "Investor Relations", duration: "1 hr", completed: false, type: "video" },
          { id: 4, title: "Final Pitch Presentation", duration: "2 hr", completed: false, type: "assignment" }
        ]
      }
    ]
  },
  "aws-cloud": {
    id: 2,
    title: "AWS Cloud Architecture Mastery",
    category: "Technology",
    instructor: "Ravi Rautela",
    progress: 30,
    totalLessons: 32,
    completedLessons: 10,
    duration: "8 Weeks",
    enrolledDate: "Feb 1, 2025",
    status: "In Progress",
    points: 300,
    maxPoints: 1000,
    badges: [],
    nextMilestone: "Cloud Architect Badge",
    description: "Master AWS cloud services and become a certified cloud architect.",
    modules: [
      {
        id: 1,
        title: "Week 1-2: Core AWS Services",
        lessons: [
          { id: 1, title: "AWS Introduction & Setup", duration: "45 min", completed: true, type: "video" },
          { id: 2, title: "EC2 Fundamentals", duration: "1 hr", completed: true, type: "video" },
          { id: 3, title: "S3 Storage Deep Dive", duration: "1 hr", completed: true, type: "video" },
          { id: 4, title: "EC2 & S3 Lab", duration: "2 hr", completed: false, type: "assignment" }
        ]
      },
      {
        id: 2,
        title: "Week 3-4: Advanced Networking & Security",
        lessons: [
          { id: 1, title: "VPC Architecture", duration: "1.5 hr", completed: false, type: "video" },
          { id: 2, title: "Security Groups & NACLs", duration: "1 hr", completed: false, type: "video" },
          { id: 3, title: "IAM Best Practices", duration: "1 hr", completed: false, type: "video" },
          { id: 4, title: "Network Security Lab", duration: "2 hr", completed: false, type: "assignment" }
        ]
      }
    ]
  },
  "leadership": {
    id: 3,
    title: "Leadership & Team Management",
    category: "Leadership",
    instructor: "Ravi Rautela",
    progress: 100,
    totalLessons: 24,
    completedLessons: 24,
    duration: "6 Weeks",
    enrolledDate: "Dec 1, 2024",
    status: "Completed",
    points: 750,
    maxPoints: 750,
    badges: ["Leadership Legend", "Team Builder", "Visionary Leader"],
    nextMilestone: "Certificate Available",
    description: "Develop essential leadership skills to build and manage high-performing teams.",
    modules: [
      {
        id: 1,
        title: "Week 1-2: Leadership Fundamentals",
        lessons: [
          { id: 1, title: "Leadership Styles Overview", duration: "45 min", completed: true, type: "video" },
          { id: 2, title: "Emotional Intelligence", duration: "1 hr", completed: true, type: "video" },
          { id: 3, title: "Self-Assessment Exercise", duration: "1 hr", completed: true, type: "assignment" }
        ]
      }
    ]
  }
};

const StudentCoursePage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("curriculum");
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/get-started");
    }
  }, [navigate]);

  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate downloading...",
      description: "Your certificate will be ready shortly.",
    });
  };

  const handleAskInstructor = () => {
    toast({
      title: "Message sent!",
      description: "Sir will respond to your question soon.",
    });
  };

  const course = courseId ? coursesData[courseId] : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
              <Button onClick={() => navigate("/dashboard/student/courses")}>
                Back to Courses
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isCompleted = course.status === "Completed";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              className="mb-6"
              onClick={() => navigate("/dashboard/student/courses")}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to My Courses
            </Button>

            {/* Course Header */}
            <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Course Info */}
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-3">{course.category}</Badge>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                      {course.title}
                    </h1>
                    <p className="text-muted-foreground mb-4">{course.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm mb-6">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span>{course.totalLessons} Lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-accent" />
                        <span>Instructor: {course.instructor}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold">Course Progress</span>
                        <span className="text-muted-foreground">
                          {course.completedLessons}/{course.totalLessons} lessons
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-3 mb-2" />
                      <p className="text-sm font-bold text-primary">{course.progress}% Complete</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="glass-card p-4 rounded-lg text-center">
                        <Zap className="w-6 h-6 mx-auto mb-2 text-accent" />
                        <p className="text-2xl font-bold">{course.points}</p>
                        <p className="text-xs text-muted-foreground">Points Earned</p>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <Trophy className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{course.badges.length}</p>
                        <p className="text-xs text-muted-foreground">Badges</p>
                      </div>
                      <div className="glass-card p-4 rounded-lg text-center">
                        <Award className="w-6 h-6 mx-auto mb-2 text-secondary" />
                        <p className="text-2xl font-bold">{isCompleted ? "Yes" : "Soon"}</p>
                        <p className="text-xs text-muted-foreground">Certificate</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Card */}
                  <div className="lg:w-80">
                    <Card>
                      <CardHeader>
                        <CardTitle>Course Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {isCompleted ? (
                          <>
                            <Button onClick={handleDownloadCertificate} className="w-full bg-gradient-primary hover:shadow-primary">
                              <Download className="mr-2 w-4 h-4" />
                              Download Certificate
                            </Button>
                            <Button variant="outline" className="w-full" onClick={() => toast({ title: "Share feature coming soon!" })}>
                              <Share2 className="mr-2 w-4 h-4" />
                              Share Achievement
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button className="w-full bg-gradient-primary hover:shadow-primary group">
                              <PlayCircle className="mr-2 w-4 h-4" />
                              Continue Learning
                            </Button>
                            <Button variant="outline" className="w-full" onClick={handleAskInstructor}>
                              <MessageSquare className="mr-2 w-4 h-4" />
                              Ask Instructor
                            </Button>
                          </>
                        )}
                        
                        {/* Badges */}
                        {course.badges.length > 0 && (
                          <div className="pt-3 border-t">
                            <p className="text-sm font-semibold mb-2">Earned Badges</p>
                            <div className="space-y-2">
                              {course.badges.map((badge: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                                  <Trophy className="w-4 h-4 text-accent" />
                                  <span className="text-sm">{badge}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Next Milestone */}
                        <div className="pt-3 border-t">
                          <p className="text-sm font-semibold mb-2">Next Milestone</p>
                          <div className="p-3 bg-gradient-subtle rounded-lg">
                            <p className="text-sm font-medium mb-2">{course.nextMilestone}</p>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                    <CardDescription>
                      {course.completedLessons} of {course.totalLessons} lessons completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {course.modules.map((module: any) => {
                        const completedInModule = module.lessons.filter((l: any) => l.completed).length;
                        const totalInModule = module.lessons.length;
                        const moduleProgress = (completedInModule / totalInModule) * 100;

                        return (
                          <AccordionItem key={module.id} value={`module-${module.id}`}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="text-left flex-1">
                                  <p className="font-semibold">{module.title}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {completedInModule}/{totalInModule} lessons
                                  </p>
                                </div>
                                <Progress value={moduleProgress} className="w-24 h-2" />
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 pt-2">
                                {module.lessons.map((lesson: any) => (
                                  <div
                                    key={lesson.id}
                                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary/50 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      {lesson.completed ? (
                                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                                      ) : (
                                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                                      )}
                                      <div>
                                        <p className="font-medium text-sm">{lesson.title}</p>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                          <span className="flex items-center gap-1">
                                            {lesson.type === "video" ? (
                                              <Video className="w-3 h-3" />
                                            ) : (
                                              <FileText className="w-3 h-3" />
                                            )}
                                            {lesson.type}
                                          </span>
                                          <span>{lesson.duration}</span>
                                        </div>
                                      </div>
                                    </div>
                                    {lesson.completed ? (
                                      <Button size="sm" variant="outline">
                                        Review
                                      </Button>
                                    ) : (
                                      <Button size="sm" className="bg-gradient-primary hover:shadow-primary">
                                        {lesson.type === "video" ? "Watch" : "Start"}
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Resources</CardTitle>
                    <CardDescription>Downloadable materials and references</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-semibold">Course Syllabus</p>
                            <p className="text-sm text-muted-foreground">PDF • 2.5 MB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-semibold">Templates & Worksheets</p>
                            <p className="text-sm text-muted-foreground">ZIP • 15 MB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="community">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Community</CardTitle>
                    <CardDescription>Connect with fellow students and instructors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">
                        Join the discussion, ask questions, and share your progress
                      </p>
                      <Button className="bg-gradient-primary hover:shadow-primary">
                        Join Community
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentCoursePage;
