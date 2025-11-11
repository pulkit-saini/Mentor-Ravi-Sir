import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Briefcase, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Internship {
  id: string;
  title: string;
  company: string;
  status: string;
  applied_at: string;
}

export default function StudentInternships() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchInternships();
    const channel = setupRealtimeSubscriptions();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchInternships = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data: internshipData, error } = await supabase
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
        .eq("user_id", user.id)
        .order("applied_at", { ascending: false });

      if (error) throw error;

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
    } catch (error) {
      console.error("Error fetching internships:", error);
      toast.error("Failed to load internships");
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    if (!user) return supabase.channel("empty");

    return supabase
      .channel("student-internships")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "internship_applications",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchInternships();
        }
      )
      .subscribe();
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      applied: "default",
      under_review: "secondary",
      accepted: "default",
      rejected: "destructive",
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      applied: "border-l-blue-500",
      under_review: "border-l-yellow-500",
      accepted: "border-l-green-500",
      rejected: "border-l-red-500",
    };
    return colors[status] || "border-l-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard/student")}
              className="mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Briefcase className="w-8 h-8 text-primary" />
              My Internship Applications
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your internship applications and their status
            </p>
          </div>
        </div>

        {internships.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Briefcase className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Kickstart your career — apply for internships!
                </p>
                <Button onClick={() => navigate("/career")}>
                  Browse Internships
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={`border-l-4 ${getStatusColor(internship.status)} hover:shadow-lg transition-all`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{internship.title}</h3>
                            <p className="text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {internship.company}
                            </p>
                          </div>
                          {getStatusBadge(internship.status)}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Applied on {format(new Date(internship.applied_at), "MMM d, yyyy")}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/dashboard/student/internship/${internship.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Looking for More Opportunities?</h3>
            <p className="mb-4 opacity-90">
              Explore more internship opportunities and apply today
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/career")}
            >
              Browse All Internships
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
