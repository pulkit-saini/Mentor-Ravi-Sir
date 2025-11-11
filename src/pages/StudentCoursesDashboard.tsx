import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  PlayCircle,
  Calendar,
  Star,
  Trophy,
  Zap,
  Target,
  ArrowRight,
  Download,
  Share2
} from "lucide-react";

const enrolledCourses = [
  {
    id: 1,
    title: "Startup Incubation Program",
    category: "Entrepreneurship",
    instructor: "Ravi Rautela",
    progress: 65,
    totalLessons: 48,
    completedLessons: 31,
    nextLesson: "Week 8: Pitch Deck Creation",
    duration: "12 Weeks",
    enrolledDate: "Jan 15, 2025",
    status: "In Progress",
    points: 780,
    maxPoints: 1200,
    badges: ["Startup Visionary"],
    nextMilestone: "Business Strategist Badge",
    thumbnail: "bg-gradient-to-br from-primary to-primary-glow"
  },
  {
    id: 2,
    title: "AWS Cloud Architecture Mastery",
    category: "Technology",
    instructor: "Ravi Rautela",
    progress: 30,
    totalLessons: 32,
    completedLessons: 10,
    nextLesson: "Week 4: VPC & Networking",
    duration: "8 Weeks",
    enrolledDate: "Feb 1, 2025",
    status: "In Progress",
    points: 300,
    maxPoints: 1000,
    badges: [],
    nextMilestone: "Cloud Architect Badge",
    thumbnail: "bg-gradient-to-br from-secondary to-secondary/70"
  },
  {
    id: 3,
    title: "Leadership & Team Management",
    category: "Leadership",
    instructor: "Ravi Rautela",
    progress: 100,
    totalLessons: 24,
    completedLessons: 24,
    nextLesson: "Course Completed!",
    duration: "6 Weeks",
    enrolledDate: "Dec 1, 2024",
    status: "Completed",
    points: 750,
    maxPoints: 750,
    badges: ["Leadership Legend", "Team Builder", "Visionary Leader"],
    nextMilestone: "Certificate Available",
    thumbnail: "bg-gradient-to-br from-accent to-accent/70"
  }
];

const achievements = [
  { icon: Trophy, label: "5 Badges Earned", color: "text-accent" },
  { icon: Target, label: "1830 Points", color: "text-primary" },
  { icon: Award, label: "1 Certificate", color: "text-secondary" },
  { icon: Star, label: "4.9 Avg Score", color: "text-accent" }
];

const StudentCoursesDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/get-started");
    }
  }, [navigate]);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const activeCourses = enrolledCourses.filter(c => c.status === "In Progress");
  const completedCourses = enrolledCourses.filter(c => c.status === "Completed");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      My <span className="gradient-text">Learning Journey</span>
                    </h1>
                    <p className="text-muted-foreground">
                      Track your progress, earn badges, and unlock new achievements
                    </p>
                  </div>
                  <Button 
                    className="bg-gradient-primary hover:shadow-primary group w-fit"
                    onClick={() => navigate("/courses")}
                  >
                    Explore More Courses
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="glass-card p-4 rounded-xl hover-lift">
                      <achievement.icon className={`w-6 h-6 mb-2 ${achievement.color}`} />
                      <p className="text-sm font-semibold">{achievement.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Courses Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
                <TabsTrigger value="active">
                  Active ({activeCourses.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedCourses.length})
                </TabsTrigger>
                <TabsTrigger value="all">
                  All Courses ({enrolledCourses.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                <div className="grid md:grid-cols-2 gap-6">
                  {activeCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed">
                <div className="grid md:grid-cols-2 gap-6">
                  {completedCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="all">
                <div className="grid md:grid-cols-2 gap-6">
                  {enrolledCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Learning Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Weekly Progress */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Weekly Progress
                  </CardTitle>
                  <CardDescription>Your learning activity this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Lessons Completed</span>
                        <span className="font-semibold">12/15</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Study Hours</span>
                        <span className="font-semibold">8.5/10</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    Upcoming Deadlines
                  </CardTitle>
                  <CardDescription>Stay on track with your courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg">
                      <p className="font-semibold text-sm">AWS Assignment #3</p>
                      <p className="text-xs text-muted-foreground">Due in 3 days</p>
                    </div>
                    <div className="p-3 border border-border rounded-lg">
                      <p className="font-semibold text-sm">Startup Pitch Practice</p>
                      <p className="text-xs text-muted-foreground">Due in 5 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Badges */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    Next Milestones
                  </CardTitle>
                  <CardDescription>Keep learning to unlock these</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Business Strategist</p>
                        <Progress value={65} className="h-1.5 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Cloud Architect</p>
                        <Progress value={30} className="h-1.5 mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const CourseCard = ({ course }: { course: typeof enrolledCourses[0] }) => {
  const navigate = useNavigate();
  const isCompleted = course.status === "Completed";
  const { toast } = useToast();

  const handleContinueLearning = () => {
    navigate(`/dashboard/student/course/${course.id === 1 ? 'startup-incubation' : course.id === 2 ? 'aws-cloud' : 'leadership'}`);
  };

  const handleDownloadCertificate = () => {
    toast({
      title: "Certificate downloading...",
      description: "Your certificate will be ready shortly.",
    });
  };

  return (
    <Card className="hover-lift overflow-hidden">
      <div className={`h-32 ${course.thumbnail} relative`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <Badge variant="secondary" className="mb-2">{course.category}</Badge>
          <h3 className="text-white font-bold text-lg">{course.title}</h3>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <Badge variant={isCompleted ? "default" : "outline"}>
            {course.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {course.completedLessons}/{course.totalLessons} lessons completed
          </p>
        </div>

        {/* Next Lesson */}
        {!isCompleted && (
          <div className="glass-card p-3 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Next Up:</p>
            <p className="font-semibold text-sm">{course.nextLesson}</p>
          </div>
        )}

        {/* Gamification */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold">{course.points}/{course.maxPoints} pts</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">{course.badges.length} badges</span>
          </div>
        </div>

        {/* Badges */}
        {course.badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {course.badges.map((badge, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                <Trophy className="w-3 h-3 mr-1" />
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 border-t">
        {isCompleted ? (
          <>
            <Button onClick={handleDownloadCertificate} className="flex-1 bg-gradient-primary hover:shadow-primary group">
              <Download className="mr-2 w-4 h-4" />
              Download Certificate
            </Button>
            <Button variant="outline" size="icon" onClick={() => toast({ title: "Share feature coming soon!" })}>
              <Share2 className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleContinueLearning} className="flex-1 bg-gradient-primary hover:shadow-primary group">
              <PlayCircle className="mr-2 w-4 h-4" />
              Continue Learning
            </Button>
            <Button variant="outline" size="icon" onClick={handleContinueLearning}>
              <BookOpen className="w-4 h-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default StudentCoursesDashboard;
