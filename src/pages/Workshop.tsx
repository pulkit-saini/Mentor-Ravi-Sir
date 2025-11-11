import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Presentation, Clock, BookOpen, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface Workshop {
  id: string;
  title: string;
  description: string | null;
  banner_url: string | null;
  duration: string | null;
  created_at: string;
}

const Workshop = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    showAuthModal, 
    setShowAuthModal, 
    executeProtectedAction, 
    completePendingAction, 
    clearPendingAction 
  } = useProtectedAction();
  
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [registeredWorkshopIds, setRegisteredWorkshopIds] = useState<string[]>([]);
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  
  useEffect(() => {
    fetchWorkshops();
    if (user) {
      fetchRegisteredWorkshops();
    }
  }, [user]);

  // Handle pending action after login
  useEffect(() => {
    completePendingAction((action) => {
      if (action.type === 'register_workshop' && action.data) {
        handleRegister(action.data);
      }
    });
  }, [completePendingAction]);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("workshops")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWorkshops(data || []);
    } catch (error) {
      console.error("Error fetching workshops:", error);
      toast.error("Failed to load workshops");
    } finally {
      setLoading(false);
    }
  };

  const fetchRegisteredWorkshops = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("user_workshops")
        .select("workshop_id")
        .eq("user_id", user.id);

      if (error) throw error;
      setRegisteredWorkshopIds(data?.map(w => w.workshop_id) || []);
    } catch (error) {
      console.error("Error fetching registered workshops:", error);
    }
  };

  const handleRegister = async (workshop: Workshop) => {
    if (!user) return;

    try {
      setRegisteringId(workshop.id);

      // Check if already registered
      if (registeredWorkshopIds.includes(workshop.id)) {
        toast.info("You're already registered for this workshop");
        navigate("/dashboard/student/workshops");
        return;
      }

      // Register for workshop
      const { error } = await supabase
        .from("user_workshops")
        .insert({
          user_id: user.id,
          workshop_id: workshop.id,
          status: "enrolled",
        });

      if (error) throw error;

      toast.success("Successfully registered for workshop! 🎉");
      setRegisteredWorkshopIds([...registeredWorkshopIds, workshop.id]);
      
      // Navigate to workshop dashboard
      setTimeout(() => {
        navigate(`/dashboard/student/workshops/${workshop.id}`);
      }, 1000);
    } catch (error) {
      console.error("Error registering for workshop:", error);
      toast.error("Failed to register for workshop");
    } finally {
      setRegisteringId(null);
    }
  };

  const handleRegisterClick = (workshop: Workshop) => {
    executeProtectedAction(
      'register_workshop',
      workshop,
      () => handleRegister(workshop)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <Skeleton className="h-32 w-full max-w-3xl mx-auto mb-16" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-96" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            >
              <span className="text-primary">Workshops</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Learn hands-on skills through interactive workshop sessions
            </motion.p>
          </div>

          {workshops.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Card className="max-w-md mx-auto">
                <CardContent className="p-8">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No Workshops Available</h3>
                  <p className="text-muted-foreground">
                    Check back soon for upcoming workshop sessions!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {workshops.map((workshop, index) => {
                const isRegistered = registeredWorkshopIds.includes(workshop.id);
                const isRegistering = registeringId === workshop.id;

                return (
                  <motion.div
                    key={workshop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="hover-lift h-full flex flex-col">
                      {workshop.banner_url && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={workshop.banner_url}
                            alt={workshop.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Presentation className="w-5 h-5 text-primary" />
                          {workshop.title}
                        </CardTitle>
                        {workshop.description && (
                          <CardDescription className="line-clamp-2">
                            {workshop.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-between">
                        <div className="space-y-2 mb-4">
                          {workshop.duration && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>Duration: {workshop.duration}</span>
                            </div>
                          )}
                          {isRegistered && (
                            <Badge variant="outline" className="gap-2">
                              <CheckCircle2 className="w-3 h-3" />
                              Registered
                            </Badge>
                          )}
                        </div>
                        {isRegistered ? (
                          <Button 
                            className="w-full"
                            onClick={() => navigate(`/dashboard/student/workshops/${workshop.id}`)}
                          >
                            View Workshop
                          </Button>
                        ) : (
                          <Button 
                            className="w-full"
                            onClick={() => handleRegisterClick(workshop)}
                            disabled={isRegistering}
                          >
                            {isRegistering ? "Registering..." : "Register Now"}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={clearPendingAction}
        message="Please sign in to register for the workshop 🚀"
      />
    </div>
  );
};

export default Workshop;
