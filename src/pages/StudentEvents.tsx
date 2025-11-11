import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface EventWithDetails {
  id: string;
  event_id: string;
  team_name: string;
  selected_events: string[];
  created_at: string;
  event: {
    id: string;
    title: string;
    banner_url: string | null;
    start_at: string;
    end_at: string;
    location: string | null;
    status: string;
    description: string | null;
  } | null;
}

export default function StudentEvents() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventWithDetails[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchEvents();
    const channel = setupRealtimeSubscriptions();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchEvents = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("event_registrations")
        .select(`
          id,
          event_id,
          team_name,
          selected_events,
          created_at,
          events (
            id,
            title,
            banner_url,
            start_at,
            end_at,
            location,
            status,
            description
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const eventsData = (data || []).map(item => ({
        ...item,
        event: item.events
      }));
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    if (!user) return supabase.channel("empty");

    return supabase
      .channel("student-events")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "event_registrations",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchEvents();
        }
      )
      .subscribe();
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      upcoming: "default",
      ongoing: "secondary",
      completed: "outline",
    };
    const labels: Record<string, string> = {
      upcoming: "Upcoming",
      ongoing: "In Progress",
      completed: "Completed",
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const getActionButton = (event: EventWithDetails) => {
    if (!event.event) return null;
    
    const status = event.event.status;
    
    if (status === "ongoing") {
      return (
        <Button onClick={() => navigate(`/dashboard/student/event/${event.event_id}`)}>
          Go to Tasks
        </Button>
      );
    }
    if (status === "upcoming") {
      return (
        <Button variant="outline" onClick={() => navigate(`/dashboard/student/event-details/${event.event_id}`)}>
          View Details
        </Button>
      );
    }
    if (status === "completed") {
      return (
        <Button variant="secondary">
          View Certificate
        </Button>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-80" />
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
              Dashboard → Events
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Your Events 🚀
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your event registrations and participation
            </p>
          </div>
        </div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Calendar className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Events Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  You haven't joined any events yet — explore upcoming events!
                </p>
                <Button onClick={() => navigate("/events")}>
                  Explore Events
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((registration, index) => (
              <motion.div
                key={registration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  {registration.event?.banner_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={registration.event.banner_url}
                        alt={registration.event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        {getStatusBadge(registration.event.status)}
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {registration.event?.title || "Event"}
                      </h3>
                      {registration.event?.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {registration.event.description}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 text-sm">
                      {registration.event?.start_at && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {format(new Date(registration.event.start_at), "MMM d, yyyy 'at' h:mm a")}
                          </span>
                        </div>
                      )}
                      {registration.event?.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{registration.event.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>Team: {registration.team_name}</span>
                      </div>
                    </div>

                    {registration.selected_events.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Registered Events:</p>
                        <div className="flex flex-wrap gap-2">
                          {registration.selected_events.slice(0, 3).map((event, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                          {registration.selected_events.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{registration.selected_events.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      {getActionButton(registration)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
