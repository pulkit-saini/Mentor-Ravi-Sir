import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, Clock, Bell, Search, Home, Building2, Cog, Monitor, BarChart3, TrendingUp, ClipboardCheck, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
interface Internship {
  id: string;
  title: string;
  company: string;
  description: string | null;
  duration: string | null;
  location: string | null;
  mode: string | null;
  skills: string[] | null;
  created_at: string;
}
const jobCategories = [{
  icon: Home,
  label: "Remote"
}, {
  icon: Building2,
  label: "MNC"
}, {
  icon: Cog,
  label: "Engineering"
}, {
  icon: Monitor,
  label: "Software & IT"
}, {
  icon: BarChart3,
  label: "Data Science"
}, {
  icon: TrendingUp,
  label: "Marketing"
}, {
  icon: ClipboardCheck,
  label: "Project Mgmt"
}, {
  icon: Briefcase,
  label: "Internship"
}];
const Career = () => {
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('internships').select('*').order('created_at', {
          ascending: false
        });
        if (error) throw error;
        setInternships(data || []);
      } catch (error) {
        console.error('Error fetching internships:', error);
        toast({
          title: "Error",
          description: "Failed to load internships",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchInternships();
  }, [toast]);
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = searchQuery === "" || internship.title.toLowerCase().includes(searchQuery.toLowerCase()) || internship.skills && internship.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = locationFilter === "" || internship.location && internship.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesCategory = selectedCategory === "" || selectedCategory === "Remote" && internship.location?.includes("Remote") || selectedCategory === "Internship";
    return matchesSearch && matchesLocation && matchesCategory;
  });
  const handleSearch = () => {
    toast({
      title: "Search Applied",
      description: `Found ${filteredInternships.length} matching opportunities`
    });
  };
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };
  const handleNotifyMe = () => {
    toast({
      title: "Notification Set! 🔔",
      description: "We'll notify you when new internship opportunities are posted."
    });
  };
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Search Hero Section */}
      <section className="pt-32 pb-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Heading */}
            <div className="text-center space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold">Opportunities</h1>
            </div>

            {/* Search Form */}
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input placeholder="Enter skills / designations / companies" className="pl-10 h-12 border-border" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                  </div>
                  
                  <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                    <SelectTrigger className="md:w-[200px] h-12 border-border">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="relative md:w-[200px]">
                    <Input placeholder="Enter location" className="h-12 border-border" value={locationFilter} onChange={e => setLocationFilter(e.target.value)} />
                  </div>

                  <Button size="lg" className="h-12 px-8" onClick={handleSearch}>
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              {jobCategories.map((category, index) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.label;
              return <Button key={index} variant={isSelected ? "default" : "outline"} className="gap-2 h-11 px-4" onClick={() => handleCategoryClick(category.label)}>
                    <Icon className="w-4 h-4" />
                    {category.label}
                    <ChevronRight className="w-4 h-4" />
                  </Button>;
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Internship Listings */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {loading ? <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <Card key={i} className="overflow-hidden">
                  <CardHeader className="space-y-4">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>)}
            </div> : filteredInternships.length === 0 ? <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No opportunities found matching your criteria</p>
              <Button onClick={() => {
            setSearchQuery("");
            setExperienceFilter("");
            setLocationFilter("");
            setSelectedCategory("");
          }}>Clear Filters</Button>
            </div> : <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredInternships.map((internship, index) => {
            const cardColors = [{
              bg: "bg-blue-50 dark:bg-blue-950/30",
              border: "border-blue-200 dark:border-blue-800"
            }, {
              bg: "bg-pink-50 dark:bg-pink-950/30",
              border: "border-pink-200 dark:border-pink-800"
            }, {
              bg: "bg-cyan-50 dark:bg-cyan-950/30",
              border: "border-cyan-200 dark:border-cyan-800"
            }];
            const colorScheme = cardColors[index % 3];
            return <Card key={internship.id} className={`${colorScheme.bg} ${colorScheme.border} border-2 overflow-hidden group animate-fade-in-up hover-lift cursor-pointer transition-all duration-300`} style={{
              animationDelay: `${index * 0.1}s`
            }} onClick={() => {
              // Route to dedicated JD pages
              if (internship.title.includes("AI/ML")) {
                navigate("/career/ai-ml");
              } else if (internship.title.includes("Full Stack")) {
                navigate("/career/full-stack");
              } else if (internship.title.includes("Google Workspace")) {
                navigate("/career/google-workspace");
              } else {
                navigate(`/internship/${internship.id}`);
              }
            }}>
                    <CardHeader className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="p-3 rounded-lg bg-primary w-fit">
                          <Briefcase className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <Badge variant="secondary">
                          {internship.mode || 'Remote'}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl">
                        {internship.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed line-clamp-3">
                        {internship.description || "No description available"}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {internship.location && <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{internship.location}</span>
                          </div>}
                        {internship.duration && <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{internship.duration}</span>
                          </div>}
                      </div>

                      <Button className="w-full gap-2 shadow-sm" onClick={e => {
                  e.stopPropagation();
                  // Route to dedicated JD pages
                  if (internship.title.includes("AI/ML")) {
                    navigate("/career/ai-ml");
                  } else if (internship.title.includes("Full Stack")) {
                    navigate("/career/full-stack");
                  } else if (internship.title.includes("Google Workspace")) {
                    navigate("/career/google-workspace");
                  } else {
                    navigate(`/internship/${internship.id}`);
                  }
                }}>
                        I'm Interested
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>;
          })}
            </div>}

          {/* Notify Me Section */}
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <Bell className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                <p className="text-muted-foreground mb-4">
                  Get notified when new internship opportunities are posted
                </p>
                <Button size="lg" onClick={handleNotifyMe} className="gap-2">
                  <Bell className="w-4 h-4" />
                  Notify Me
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Career;