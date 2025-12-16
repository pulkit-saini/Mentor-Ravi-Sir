import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface CourseEnrollment {
  id: string;
  progress_percent: number;
  course_id: string;
  courses: {
    id: string;
    title: string;
    provider: string | null;
    thumbnail: string | null;
    level: string | null;
    description: string | null;
  } | null;
}

export default function StudentCoursesAll() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<CourseEnrollment[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchCourses();
    const channel = setupRealtimeSubscriptions();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchCourses = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("user_courses")
        .select(`
          id,
          progress_percent,
          course_id,
          courses (
            id,
            title,
            provider,
            thumbnail,
            level,
            description
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      setCourses(data as CourseEnrollment[] || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    if (!user) return supabase.channel("empty");

    return supabase
      .channel("student-courses")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_courses",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchCourses();
        }
      )
      .subscribe();
  };

  const getLevelBadge = (level: string | null) => {
    if (!level) return null;
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      beginner: "default",
      intermediate: "secondary",
      advanced: "outline",
    };
    return (
      <Badge variant={variants[level.toLowerCase()] || "default"}>
        {level}
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
              <Skeleton key={i} className="h-96" />
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
              Dashboard → Courses
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Your Courses 📚
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your learning progress across all courses
            </p>
          </div>
        </div>

        {courses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <GraduationCap className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Courses Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  No courses added yet — explore learning paths!
                </p>
                <Button onClick={() => navigate("/learning-path")}>
                  Explore Learning Paths
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((enrollment, index) => (
              <motion.div
                key={enrollment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  {enrollment.courses?.thumbnail && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={enrollment.courses.thumbnail}
                        alt={enrollment.courses.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-lg font-semibold line-clamp-2">
                          {enrollment.courses?.title || "Course"}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        {enrollment.courses?.provider && (
                          <Badge variant="secondary" className="text-xs">
                            {enrollment.courses.provider}
                          </Badge>
                        )}
                        {getLevelBadge(enrollment.courses?.level || null)}
                      </div>

                      {enrollment.courses?.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {enrollment.courses.description}
                        </p>
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
                      onClick={() => navigate(`/dashboard/student/course/${enrollment.course_id}`)}
                    >
                      Continue
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Expand Your Knowledge</h3>
            <p className="mb-4 opacity-90">
              Discover new courses and learning paths to advance your skills
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/training")}
            >
              Browse All Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
