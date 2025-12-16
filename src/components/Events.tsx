import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Calendar, MapPin, Users, Clock, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
type Internship = {
  id: string;
  title: string;
  company: string;
  description: string;
  duration: string;
  location?: string;
  created_at: string;
};

type Event = {
  id: string;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  location: string;
  banner_url?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  created_at: string;
};
const Events = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingInternships, setLoadingInternships] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch internships
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
        setLoadingInternships(false);
      }
    };

    fetchInternships();

    // Realtime subscription for internships
    const internshipsChannel = supabase
      .channel('internships-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'internships'
        },
        (payload) => {
          setInternships((prev) => [payload.new as Internship, ...prev].slice(0, 3));
          toast({
            title: "New Opportunity! 🚀",
            description: `${(payload.new as Internship).title} just posted!`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(internshipsChannel);
    };
  }, [toast]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .in('status', ['upcoming', 'ongoing'])
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast({
          title: "Error",
          description: "Failed to load events",
          variant: "destructive",
        });
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();

    // Realtime subscription for events
    const eventsChannel = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          const newEvent = payload.new as Event;
          if (newEvent.status === 'upcoming' || newEvent.status === 'ongoing') {
            setEvents((prev) => [newEvent, ...prev].slice(0, 3));
            toast({
              title: "New Event! 🎉",
              description: `${newEvent.title} just announced!`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(eventsChannel);
    };
  }, [toast]);

  const handleInternshipAction = (internshipId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    navigate(`/career?internship=${internshipId}`);
  };

  const getEventRoute = (event: Event): string => {
    // Map event titles to their specific routes
    const eventRouteMap: Record<string, string> = {
      'Graphic Era Fest': '/prayukti-fest',
      'Prayukti': '/prayukti-fest',
      // Add more event mappings here as needed
    };
    
    return eventRouteMap[event.title] || `/event-registration?event=${event.id}`;
  };

  const handleEventAction = (event: Event) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const route = getEventRoute(event);
    navigate(route);
  };
  return <section id="events" className="py-10 bg-background">
      {/* Featured Events Section */}
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Let's Connect </span>
            <span className="text-primary">Over Events</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join exciting events designed to challenge your creativity and build your skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {loadingEvents ? (
            // Loading skeletons
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="min-h-[400px]">
                  <Skeleton className="w-full h-full rounded-2xl" />
                </div>
              ))}
            </>
          ) : events.length === 0 ? (
            // Empty state
            <div className="col-span-full text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No events currently scheduled</h3>
              <p className="text-muted-foreground">Exciting things are coming! 🎉</p>
            </div>
          ) : (
            // Actual event cards
            events.map((event) => (
              <div key={event.id} className="group [perspective:1000px] animate-fade-in">
                <div className="relative w-full min-h-[400px] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front Face */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] pointer-events-none">
                    {event.banner_url ? (
                      <div 
                        className="relative w-full min-h-[400px] flex items-center justify-center"
                        style={{
                          backgroundImage: `url(${event.banner_url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        {/* Backdrop filter overlay */}
                        <div className="absolute inset-0 backdrop-blur-2xl bg-black/50 rounded-2xl"></div>
                        
                        {/* Centered banner image */}
                        <img 
                          src={event.banner_url} 
                          alt={event.title} 
                          loading="lazy"
                          decoding="async"
                          className="relative z-10 w-full h-auto object-contain rounded-2xl max-h-[300px]"
                        />
                        
                        {/* Bottom gradient for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent rounded-2xl z-20"></div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                      </div>
                    )}
                    
                    <Badge className={`absolute top-4 right-4 z-30 ${
                      event.status === "upcoming" 
                        ? "bg-primary/90 text-primary-foreground backdrop-blur-sm" 
                        : event.status === "ongoing" 
                        ? "bg-accent/90 text-accent-foreground backdrop-blur-sm" 
                        : "bg-muted/90 text-muted-foreground backdrop-blur-sm"
                    }`}>
                      {event.status}
                    </Badge>

                    <div className="absolute inset-x-0 bottom-0 p-4 z-30">
                      <h3 className="text-2xl font-bold text-white leading-tight line-clamp-2">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden bg-card border border-border [backface-visibility:hidden] [transform:rotateY(180deg)] pointer-events-auto min-h-[400px]">
                    <div className="h-full p-6 flex flex-col justify-between pointer-events-auto">
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-foreground line-clamp-2">
                          {event.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {event.description}
                        </p>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(event.start_at), 'MMM dd, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>
                              {format(new Date(event.start_at), 'h:mm a')} - {format(new Date(event.end_at), 'h:mm a')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 pointer-events-auto" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventAction(event);
                        }}
                      >
                        {event.status === "upcoming" ? "Register Now" : "Join Event"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center flex justify-center">
          <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90 transition-all" asChild>
            <Link to="/events">
              View All Events
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>;
};
export default Events;