import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Calendar,
  Briefcase,
  ArrowRight,
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

interface Internship {
  id: string;
  title: string;
  company: string;
  status: string;
  applied_at: string;
}

export default function StudentDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [profile, setProfile] = useState<Profile | null>(null);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);

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
          table: "internship_applications",
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
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <div className="grid gap-6">
            {[1, 2].map((i) => (
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

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
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
            <CardTitle className="flex items-center justify-between">
              <span>My Internship Applications</span>
              <Button variant="ghost" size="sm" onClick={() => navigate("/career")}>
                Apply More <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {internships.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No internship applications yet</p>
                <Button onClick={() => navigate("/career")}>Browse Internships</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {internships.map((internship) => (
                  <div key={internship.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{internship.title}</h4>
                        <p className="text-sm text-muted-foreground">{internship.company}</p>
                      </div>
                      {getStatusBadge(internship.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Applied: {format(new Date(internship.applied_at), "MMM d, yyyy")}
                    </p>
                    <div className="flex flex-col gap-2">
                    
                      <Button
                      className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors" 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open("https://forms.gle/qqXi6iRnQmkLDJqs9", "_blank")}
                      >
                        Submit Your Work
                      </Button>
                    </div>
                  </div>

                  


                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
