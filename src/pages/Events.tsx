import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, CalendarDays, Clock } from "lucide-react";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AuthModal from "@/components/AuthModal";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  location: string;
  banner_url: string | null;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const EventsPage = () => {
  const navigate = useNavigate();
  const { showAuthModal, setShowAuthModal } = useProtectedAction();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();

    // Realtime subscription
    const channel = supabase
      .channel('events-page')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        () => {
          fetchEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredEvents = () => {
    let filtered = events;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.location.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    return filtered;
  };

  const currentEvents = getFilteredEvents();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/50';
      case 'completed': return 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/50';
      default: return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: format(date, 'MMM'),
      day: format(date, 'd'),
      dayName: format(date, 'EEEE')
    };
  };

  const handleRegister = (event: Event) => {
    // For Prayukti or specific events, navigate to their pages
    if (event.title.toLowerCase().includes('prayukti')) {
      navigate('/prayukti-fest');
      return;
    }
    
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">All Events</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search events, location..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="pl-10" 
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        ) : currentEvents.length === 0 ? (
          <div className="text-center py-16">
            <CalendarDays className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground">Check back later for exciting events!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {currentEvents.map((event, index) => {
              const { month, day } = formatDate(event.start_at);
              
              return (
                <div key={event.id} className="flex gap-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="text-2xl font-bold">{day}</div>
                    <div className="text-sm text-muted-foreground">{month}</div>
                  </div>

                  <div className="flex-1 bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex flex-col md:flex-row gap-6">
                      {event.banner_url && (
                        <img 
                          src={event.banner_url} 
                          alt={event.title}
                          className="w-full md:w-48 h-32 object-cover rounded-lg"
                        />
                      )}
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                        
                        {event.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {event.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" />
                            <span>{format(new Date(event.start_at), 'MMM dd, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{format(new Date(event.start_at), 'h:mm a')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {event.status !== 'completed' && (
                          <Button onClick={() => handleRegister(event)} className="mt-2">
                            Register Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        message="Please sign in to register for events"
      />
    </div>
  );
};

export default EventsPage;
