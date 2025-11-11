import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Calendar,
  GraduationCap,
  Briefcase,
  Award,
  ArrowRight,
  BookOpen,
  RefreshCw,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { format } from "date-fns";

interface Profile {
  full_name: string;
  avatar_url: string | null;
}

interface EventRegistration {
  id: string;
  selected_events: string[];
  team_name: string;
  created_at: string;
}

interface Workshop {
  id: string;
  title: string;
  banner_url: string | null;
  duration: string | null;
  progress_percent: number;
  status: string;
}

interface Course {
  id: string;
  title: string;
  provider: string | null;
  thumbnail: string | null;
  progress_percent: number;
  level: string | null;
}

interface Internship {
  id: string;
  title: string;
  company: string;
  status: string;
  applied_at: string;
}

interface Certificate {
  id: string;
  title: string;
  issued_at: string;
  download_url: string | null;
}

export default function StudentDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [profile, setProfile] = useState<Profile | null>(null);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    fetchAllData();
    const cleanup = setupRealtimeSubscriptions();
    return cleanup;
  }, [user]);

  const fetchAllData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .single();
      
      if (profileData) setProfile(profileData);

      const { data: eventRegs } = await supabase
        .from("event_registrations")
        .select("id, selected_events, team_name, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (eventRegs) {
        setEventRegistrations(eventRegs);
      }

      const { data: workshopData } = await supabase
        .from("user_workshops")
        .select(`
          id,
          progress_percent,
          status,
          workshops (
            id,
            title,
            banner_url,
            duration
          )
        `)
        .eq("user_id", user.id);

      if (workshopData) {
        const workshopsList = workshopData.map((uw: any) => ({
          id: uw.workshops.id,
          title: uw.workshops.title,
          banner_url: uw.workshops.banner_url,
          duration: uw.workshops.duration,
          progress_percent: uw.progress_percent,
          status: uw.status,
        }));
        setWorkshops(workshopsList);
      }

      const { data: courseData } = await supabase
        .from("user_courses")
        .select(`
          id,
          progress_percent,
          courses (
            id,
            title,
            provider,
            thumbnail,
            level
          )
        `)
        .eq("user_id", user.id);

      if (courseData) {
        const coursesList = courseData.map((uc: any) => ({
          id: uc.courses.id,
          title: uc.courses.title,
          provider: uc.courses.provider,
          thumbnail: uc.courses.thumbnail,
          progress_percent: uc.progress_percent,
          level: uc.courses.level,
        }));
        setCourses(coursesList);
      }

      const { data: internshipData } = await supabase
        .from("internship_applications")
        .select(`
          id,
          status,
          applied_at,
          internships (
            id,
            title,
            company
          )
        `)
        .eq("user_id", user.id);

      if (internshipData) {
        const internshipsList = internshipData.map((ia: any) => ({
          id: ia.internships.id,
          title: ia.internships.title,
          company: ia.internships.company,
          status: ia.status,
          applied_at: ia.applied_at,
        }));
        setInternships(internshipsList);
      }

      const { data: certData } = await supabase
        .from("certificates")
        .select("id, title, issued_at, download_url")
        .eq("user_id", user.id)
        .order("issued_at", { ascending: false })
        .limit(20);

      if (certData) setCertificates(certData);

      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    if (!user) return () => {};

    const channel = supabase
      .channel("student-dashboard")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "event_registrations",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchAllData();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_workshops",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchAllData();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_courses",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchAllData();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "internship_applications",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchAllData();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "certificates",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchAllData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      upcoming: "default",
      ongoing: "secondary",
      completed: "outline",
      applied: "default",
      under_review: "secondary",
      accepted: "default",
      rejected: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status.replace("_", " ")}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const pendingInternships = internships.filter((i) =>
    ["applied", "under_review"].includes(i.status)
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={profile?.avatar_url || ""} />
              <AvatarFallback>{profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Welcome, {profile?.full_name} 👋</h1>
              <p className="text-sm text-muted-foreground">
                Last updated: {format(lastUpdated, "MMM d, yyyy h:mm a")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              signOut();
              navigate('/');
            }}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
            <Button variant="ghost" size="icon" onClick={fetchAllData}>
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-none bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent dark:from-blue-500/20 dark:via-blue-400/10"
            onClick={() => navigate("/dashboard/student/events")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{eventRegistrations.length}</p>
              <p className="text-sm text-blue-600/70 dark:text-blue-400/70 font-medium">Events</p>
            </CardContent>
          </Card>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-none bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent dark:from-purple-500/20 dark:via-purple-400/10"
            onClick={() => navigate("/dashboard/student/workshops")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{workshops.length}</p>
              <p className="text-sm text-purple-600/70 dark:text-purple-400/70 font-medium">Workshops</p>
            </CardContent>
          </Card>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-none bg-gradient-to-br from-green-500/10 via-green-400/5 to-transparent dark:from-green-500/20 dark:via-green-400/10"
            onClick={() => navigate("/dashboard/student/courses-all")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{courses.length}</p>
              <p className="text-sm text-green-600/70 dark:text-green-400/70 font-medium">Courses</p>
            </CardContent>
          </Card>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-none bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-transparent dark:from-orange-500/20 dark:via-orange-400/10"
            onClick={() => navigate("/dashboard/student/internships")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-3">
                <Briefcase className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                {internships.length}
                {pendingInternships > 0 && (
                  <span className="text-sm text-orange-600/70 dark:text-orange-400/70"> ({pendingInternships})</span>
                )}
              </p>
              <p className="text-sm text-orange-600/70 dark:text-orange-400/70 font-medium">Internships</p>
            </CardContent>
          </Card>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-none bg-gradient-to-br from-pink-500/10 via-pink-400/5 to-transparent dark:from-pink-500/20 dark:via-pink-400/10"
            onClick={() => navigate("/dashboard/student/certificates")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <p className="text-2xl font-bold text-pink-700 dark:text-pink-300">{certificates.length}</p>
              <p className="text-sm text-pink-600/70 dark:text-pink-400/70 font-medium">Certificates</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>My Event Registrations</span>
              <Button variant="ghost" size="sm" onClick={() => navigate("/events")}>
                Register More <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {eventRegistrations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No event registrations yet</p>
                <Button onClick={() => navigate("/events")}>Register for Events</Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {eventRegistrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{registration.team_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Registered: {format(new Date(registration.created_at), "MMM d, yyyy h:mm a")}
                        </p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Registered Events:</p>
                      <div className="flex flex-wrap gap-2">
                        {registration.selected_events.map((event, idx) => (
                          <Badge key={idx} variant="secondary">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Workshops</CardTitle>
          </CardHeader>
          <CardContent>
            {workshops.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No workshops enrolled</p>
                <Button onClick={() => navigate("/workshop")}>Browse Workshops</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {workshops.map((workshop) => (
                  <div key={workshop.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{workshop.title}</h4>
                      {getStatusBadge(workshop.status)}
                    </div>
                    <Progress value={workshop.progress_percent} className="mb-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {workshop.progress_percent}% complete
                      </span>
                      <Button size="sm">Continue</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            {courses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No courses enrolled</p>
                <Button onClick={() => navigate("/training")}>Explore Courses</Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <div key={course.id} className="border rounded-lg overflow-hidden">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-1">{course.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{course.provider}</p>
                      <Progress value={course.progress_percent} className="mb-2" />
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{course.level}</Badge>
                        <Button size="sm">Continue</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Internship Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {internships.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No applications yet</p>
                <Button onClick={() => navigate("/career")}>Browse Internships</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {internships.map((internship) => (
                  <div
                    key={internship.id}
                    className="p-4 border rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-semibold">{internship.title}</h4>
                      <p className="text-sm text-muted-foreground">{internship.company}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Applied: {format(new Date(internship.applied_at), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(internship.status)}
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Need Guidance?</h3>
            <p className="mb-4 opacity-90">
              Connect with experienced mentors to accelerate your learning journey
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/mentorship")}
            >
              Request Mentorship
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
