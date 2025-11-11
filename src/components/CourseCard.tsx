import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  image?: string;
  onActionClick?: () => void;
}

const CourseCard = ({
  title,
  description,
  level,
  duration,
  students,
  rating,
  image,
  onActionClick,
}: CourseCardProps) => {
  const levelColors = {
    Beginner: "border-foreground/20 text-foreground bg-background/50",
    Intermediate: "border-foreground/30 text-foreground bg-background/50",
    Advanced: "border-muted-foreground/20 text-muted-foreground bg-background/50",
  };

  return (
    <div className="group relative h-[320px] rounded-xl overflow-hidden cursor-pointer">
      {/* Image Container - Fixed Height */}
      <div className="absolute inset-0 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/10">
            <div className="text-6xl font-bold text-muted-foreground/20">{title.charAt(0)}</div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Status Badge - Always Visible */}
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="outline" className={`${levelColors[level as keyof typeof levelColors] || levelColors.Beginner} backdrop-blur-sm`}>
          {level}
        </Badge>
      </div>

      {/* Title - Always Visible */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h3 className="text-2xl font-bold text-white mb-2">
          {title}
        </h3>
      </div>

      {/* Hover Overlay - Details */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-white/80 text-sm mb-4">{description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Star className="w-4 h-4 fill-white/70" />
              <span>{rating} Rating</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{students.toLocaleString()} students</span>
              </div>
            </div>
          </div>
        </div>

        <Button 
          className="w-full bg-white text-black hover:bg-white/90" 
          size="sm"
          onClick={onActionClick}
        >
          Enroll Now
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
