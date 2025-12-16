import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Briefcase, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AuthModal from "./AuthModal";





interface Internship {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  location?: string;
}

const InternshipCards = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInternships();

    // Realtime subscription
    const channel = supabase
      .channel('internships-home')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'internships'
        },
        () => {
          fetchInternships();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchInternships = async () => {
    try {
      const { data, error } = await supabase
        .from('internships')
        .select('id, title, company, duration, description, location')
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;
      setInternships(data || []);
    } catch (error) {
      console.error('Error fetching internships:', error);
      toast.error('Failed to load internships');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = (internship: Internship) => {
    if (internship.title === "Mangalmay Group Internship") {
      navigate('/mangalmay-internship');
      return;
    }

    navigate(`/internship/${internship.id}`);
  };

  const cardColors = [
    { bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800" },
    { bg: "bg-purple-50 dark:bg-purple-950/30", border: "border-purple-200 dark:border-purple-800" },
    { bg: "bg-indigo-50 dark:bg-indigo-950/30", border: "border-indigo-200 dark:border-indigo-800" },
    { bg: "bg-orange-50 dark:bg-orange-950/30", border: "border-orange-200 dark:border-orange-800" }
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[300px] rounded-xl" />
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
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Internship Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Gain hands-on experience with real-world projects and expert mentorship
            </p>
            <p className="text-muted-foreground">No internships available at the moment. Check back soon!</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {internships.map((internship, index) => {
              const colorScheme = cardColors[index % cardColors.length];
              
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
                    <CardTitle className="text-xl font-bold">
                      {internship.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-4">
                      {internship.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs bg-background/50">
                        <Calendar className="w-3 h-3 mr-1" />
                        {internship.duration}
                      </Badge>
                      <Badge variant="default" className="text-xs">
                        Open
                      </Badge>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="w-full gap-2 shadow-sm"
                        onClick={() => handleApplyClick(internship)}
                      >
                        Apply Now
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
      size="lg"
      className="group"
      onClick={() => navigate("/career")}
    >
      View All Opportunities
      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
