import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, MapPin, Calendar, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import { toast } from "@/hooks/use-toast";
import AuthModal from "./AuthModal";

interface Internship {
  id: string;
  title: string;
  company: string;
  duration: string | null;
  description: string | null;
  created_at: string;
}

const InternshipCards = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const { showAuthModal, setShowAuthModal } = useProtectedAction();

  // Fetch internships from Supabase
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const { data, error } = await supabase
          .from('internships')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setInternships(data || []);
      } catch (error) {
        console.error('Error fetching internships:', error);
        toast({
          title: "Error",
          description: "Failed to load internships",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();

    // Set up realtime subscription
    const channel = supabase
      .channel('internships-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'internships'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setInternships(prev => [payload.new as Internship, ...prev].slice(0, 3));
          } else if (payload.eventType === 'DELETE') {
            setInternships(prev => prev.filter(i => i.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setInternships(prev => prev.map(i => 
              i.id === payload.new.id ? payload.new as Internship : i
            ));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleApplyClick = (internshipId: string) => {
    if (!user) {
      setShowAuthModal(true);
      localStorage.setItem('pendingAction', JSON.stringify({ 
        type: 'apply_internship', 
        data: { internshipId } 
      }));
    } else {
      navigate(`/internship/${internshipId}`);
    }
  };

  const cardColors = [
    { bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800" },
    { bg: "bg-pink-50 dark:bg-pink-950/30", border: "border-pink-200 dark:border-pink-800" },
    { bg: "bg-cyan-50 dark:bg-cyan-950/30", border: "border-cyan-200 dark:border-cyan-800" }
  ];

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Internship Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Gain hands-on experience with real-world projects and expert mentorship
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="space-y-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (internships.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Internship Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Gain hands-on experience with real-world projects and expert mentorship
            </p>
          </div>

          <div className="text-center py-16 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-semibold mb-2">No internships posted yet</h3>
            <p className="text-muted-foreground">
              Exciting opportunities coming soon! Check back later for amazing internship positions.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Internship Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Gain hands-on experience with real-world projects and expert mentorship
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {internships.map((internship, index) => {
              const colorScheme = cardColors[index % 3];
              
              return (
                <Card 
                  key={internship.id} 
                  className={`${colorScheme.bg} ${colorScheme.border} border-2 overflow-hidden group animate-fade-in-up hover-lift transition-all duration-300 flex flex-col h-full`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="space-y-4 flex-grow">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary" className="text-xs">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {internship.company}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">
                      {internship.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed line-clamp-3">
                      {internship.description || "No description available"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {internship.duration && (
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {internship.duration}
                        </Badge>
                      )}
                      <Badge variant="default" className="text-xs">
                        Open
                      </Badge>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="w-full gap-2 shadow-sm"
                        onClick={() => handleApplyClick(internship.id)}
                      >
                        I am Interested
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/career')}
              className="gap-2"
            >
              View All Internships
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default InternshipCards;