import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Briefcase, Calendar, MapPin, Clock, FileText } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface InternshipDetails {
  id: string;
  title: string;
  company: string;
  description: string;
  duration: string;
  status: string;
  applied_at: string;
}

export default function StudentInternshipDetails() {
  const { internshipId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [internship, setInternship] = useState<InternshipDetails | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchInternshipDetails();
  }, [user, internshipId]);

  const fetchInternshipDetails = async () => {
    if (!user || !internshipId) return;

    try {
      setLoading(true);
      
      // Fetch the internship posting details directly
      const { data: internshipData, error: internshipError } = await supabase
        .from("internships")
        .select("*")
        .eq("id", internshipId)
        .single();

      if (internshipError) throw internshipError;

      // Check if user has applied
      const { data: applicationData } = await supabase
        .from("internship_applications")
        .select("status, applied_at")
        .eq("user_id", user.id)
        .eq("internship_id", internshipId)
        .maybeSingle();

      if (internshipData) {
        setInternship({
          id: internshipData.id,
          title: internshipData.title,
          company: internshipData.company,
          description: internshipData.description,
          duration: internshipData.duration,
          status: applicationData?.status || "not_applied",
          applied_at: applicationData?.applied_at || "",
        });
      }
    } catch (error) {
      console.error("Error fetching internship details:", error);
      toast.error("Failed to load internship details");
      navigate("/dashboard/student/internships");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      applied: "default",
      under_review: "secondary",
      accepted: "default",
      rejected: "destructive",
    };
    return (
      <Badge variant={variants[status] || "default"} className="text-sm">
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      applied: "bg-blue-500/10 border-blue-500/20",
      under_review: "bg-yellow-500/10 border-yellow-500/20",
      accepted: "bg-green-500/10 border-green-500/20",
      rejected: "bg-red-500/10 border-red-500/20",
    };
    return colors[status] || "bg-gray-500/10 border-gray-500/20";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">Internship not found</p>
          <Button onClick={() => navigate("/dashboard/student/internships")} className="mt-4">
            Back to Internships
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/dashboard/student/internships")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Applications
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className={`border-2 ${getStatusColor(internship.status)}`}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">{internship.title}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{internship.company}</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(internship.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {internship.applied_at && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Applied On</p>
                      <p className="font-medium">
                        {format(new Date(internship.applied_at), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                )}
                
                {internship.duration && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{internship.duration}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Job Description</h3>
                </div>
                <div className="prose prose-sm max-w-none bg-muted/30 p-4 rounded-lg">
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {internship.description || "No job description available"}
                  </div>
                </div>
              </div>

              {internship.applied_at && (
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Your Application Status</h3>
                  <div className="space-y-2">
                    {internship.status === "applied" && (
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          Your application has been submitted and is awaiting review.
                        </p>
                      </div>
                    )}
                    {internship.status === "under_review" && (
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <p className="text-sm text-yellow-600 dark:text-yellow-400">
                          Your application is currently being reviewed by the hiring team.
                        </p>
                      </div>
                    )}
                    {internship.status === "accepted" && (
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Congratulations! Your application has been accepted. The company will contact you soon.
                        </p>
                      </div>
                    )}
                    {internship.status === "rejected" && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="text-sm text-red-600 dark:text-red-400">
                          Unfortunately, your application was not selected this time. Keep exploring other opportunities!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Explore More Opportunities</h3>
            <p className="mb-4 opacity-90">
              Continue your search and find the perfect internship for you
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/career")}
            >
              Browse Internships
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
