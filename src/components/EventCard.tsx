import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  location: string;
  participants: number;
  duration: string;
  status: "upcoming" | "ongoing" | "completed";
  image?: string;
  onActionClick?: () => void;
}

const EventCard = ({
  title,
  description,
  date,
  location,
  participants,
  duration,
  status,
  image,
  onActionClick,
}: EventCardProps) => {
  const statusColors = {
    upcoming: "bg-primary text-primary-foreground",
    ongoing: "bg-accent text-accent-foreground",
    completed: "bg-muted text-muted-foreground",
  };

  const getParticipantStatus = () => {
    if (status === "completed") return "Attended";
    return "Registered";
  };

  return (
    <div className="group bg-card rounded-xl border border-border p-6 flex flex-col hover:shadow-lg transition-all duration-300 h-full">
      {/* Header with Badge and Icon */}
      <div className="flex items-center justify-between mb-4">
        <Badge className={statusColors[status]}>
          {status}
        </Badge>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">{participants}</span>
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold mb-2 text-foreground">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 flex-1">
        {description}
      </p>

      {/* Event Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button 
        className="w-full" 
        variant="outline"
        size="sm"
        onClick={onActionClick}
      >
        {status === "upcoming" ? "Register Now" : status === "ongoing" ? "Join Event" : "View Details"}
      </Button>
    </div>
  );
};

export default EventCard;
