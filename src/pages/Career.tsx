import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, Search, Briefcase, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import AuthModal from "@/components/AuthModal";

interface Internship {
  id: string;
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  skills: string[];
}

const Career = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInternships();

    // Realtime subscription
    const channel = supabase
      .channel('internships-career')
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
        .select('*')
        .order('created_at', { ascending: false });

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

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = searchQuery === "" || 
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (internship.skills && internship.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesLocation = locationFilter === "" || 
      internship.location?.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const handleSearch = () => {
    toast({
      title: "Search Applied",
      description: `Found ${filteredInternships.length} matching opportunities`
    });
  };

  const handleNotifyMe = () => {
    toast({
      title: "Notification Set! 🔔",
      description: "We'll notify you when new internship opportunities are posted."
    });
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Search Hero Section */}
      <section className="pt-32 pb-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold">Internship Opportunities</h1>
              <p className="text-muted-foreground text-lg">
                Find your next role in tech with hands-on experience
              </p>
            </div>

            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      placeholder="Enter skills (e.g. Python, React) or title" 
                      className="pl-10 h-12 border-border" 
                      value={searchQuery} 
                      onChange={e => setSearchQuery(e.target.value)} 
                    />
                  </div>
                  
                  <div className="relative md:w-[200px]">
                    <Input 
                      placeholder="Location" 
                      className="h-12 border-border" 
                      value={locationFilter} 
                      onChange={e => setLocationFilter(e.target.value)} 
                    />
                  </div>

                  <Button size="lg" className="h-12 px-8" onClick={handleSearch}>
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Internship Listings */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[350px] rounded-xl" />
              ))}
            </div>
          ) : filteredInternships.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">No internships match your search criteria</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setLocationFilter("");
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredInternships.map((internship, index) => {
                const colorScheme = cardColors[index % cardColors.length];
                
                return (
                  <Card 
                    key={internship.id} 
                    className={`${colorScheme.bg} ${colorScheme.border} border-2 overflow-hidden group animate-fade-in-up hover-lift flex flex-col h-full transition-all duration-300`} 
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
                      <CardDescription className="text-sm leading-relaxed line-clamp-3">
                        {internship.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4 mt-auto">
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
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
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto text-center p-8 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Don't see your ideal role?</CardTitle>
              <CardDescription className="text-base mt-4">
                Stay tuned — more opportunities are coming soon! Get notified when new internships are posted.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Button size="lg" variant="outline" className="gap-2" onClick={handleNotifyMe}>
                <Bell className="w-5 h-5" />
                Notify Me 🔔
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        message="Please sign in to continue with your application 🚀"
      />
    </div>
  );
};

export default Career;
