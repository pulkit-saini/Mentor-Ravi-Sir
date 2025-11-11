import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Award, Download, Eye } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Certificate {
  id: string;
  title: string;
  issued_at: string;
  download_url: string | null;
}

export default function StudentCertificates() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchCertificates();
    const channel = setupRealtimeSubscriptions();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchCertificates = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("certificates")
        .select("id, title, issued_at, download_url")
        .eq("user_id", user.id)
        .order("issued_at", { ascending: false });

      if (error) throw error;
      setCertificates(data || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      toast.error("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    if (!user) return supabase.channel("empty");

    return supabase
      .channel("student-certificates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "certificates",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchCertificates();
        }
      )
      .subscribe();
  };

  const handleDownload = (certificate: Certificate) => {
    if (certificate.download_url) {
      window.open(certificate.download_url, '_blank');
    } else {
      toast.error("Download link not available");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64" />
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
              Dashboard → Certificates
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Your Certificates 🏆
            </h1>
            <p className="text-muted-foreground mt-2">
              Your achievements and accomplishments
            </p>
          </div>
        </div>

        {certificates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Award className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Certificates Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Earn certificates by completing events and tasks ✨
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => navigate("/events")}>
                    Join Events
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/workshop")}>
                    Attend Workshops
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="relative h-48 bg-gradient-primary flex items-center justify-center">
                    <Award className="w-20 h-20 text-primary-foreground opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg line-clamp-2">
                        {certificate.title}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">Issued on</p>
                      <p>{format(new Date(certificate.issued_at), "MMMM d, yyyy")}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDownload(certificate)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDownload(certificate)}
                        disabled={!certificate.download_url}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Keep Growing!</h3>
            <p className="mb-4 opacity-90">
              Continue participating in events and workshops to earn more certificates
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/events")}
              >
                Explore Events
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/workshop")}
                className="bg-transparent hover:bg-white/10"
              >
                View Workshops
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
