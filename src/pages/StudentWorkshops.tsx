import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface WorkshopEnrollment {
  id: string;
  progress_percent: number;
  status: string;
  workshop_id: string;
  workshops: {
    id: string;
    title: string;
    banner_url: string | null;
    duration: string | null;
    description: string | null;
  } | null;
}

export default function StudentWorkshops() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [workshops, setWorkshops] = useState<WorkshopEnrollment[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchWorkshops();
    const channel = setupRealtimeSubscriptions();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchWorkshops = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_workshops")
        .select(`
          id,
          progress_percent,
          status,
          workshop_id,
          workshops (
            id,
            title,
            banner_url,
            duration,
            description
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      setWorkshops(data as WorkshopEnrollment[] || []);
    } catch (error) {
      console.error("Error fetching workshops:", error);
      toast.error("Failed to load workshops");
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    if (!user) return supabase.channel("empty");

    return supabase
      .channel("student-workshops")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_workshops",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchWorkshops();
        }
      )
      .subscribe();
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      enrolled: "default",
      in_progress: "secondary",
      completed: "outline",
      dropped: "destructive",
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard/student")}
              className="mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard → Workshops
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Your Workshops 🛠️
            </h1>
            <p className="text-muted-foreground mt-2">
              Continue your hands-on learning journey
            </p>
          </div>
        </div>

        {workshops.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Workshops Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Start learning through hands-on workshops!
                </p>
                <Button onClick={() => navigate("/workshop")}>
                  Browse Workshops
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workshops.map((enrollment, index) => (
              <motion.div
                key={enrollment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  {enrollment.workshops?.banner_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={enrollment.workshops.banner_url}
                        alt={enrollment.workshops.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-lg font-semibold">
                          {enrollment.workshops?.title || "Workshop"}
                        </h3>
                        {getStatusBadge(enrollment.status)}
                      </div>

                      {enrollment.workshops?.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {enrollment.workshops.description}
                        </p>
                      )}

                      {enrollment.workshops?.duration && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Clock className="w-4 h-4" />
                          <span>{enrollment.workshops.duration}</span>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{enrollment.progress_percent || 0}%</span>
                        </div>
                        <Progress value={enrollment.progress_percent || 0} className="h-2" />
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4"
                      onClick={() => navigate(`/dashboard/student/workshops/${enrollment.workshop_id}`)}
                    >
                      Continue Workshop
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Learn More?</h3>
            <p className="mb-4 opacity-90">
              Explore more workshops and enhance your skills
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/workshop")}
            >
              Browse All Workshops
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
