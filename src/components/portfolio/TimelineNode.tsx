import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  current?: boolean;
}

interface TimelineNodeProps {
  experience: Experience;
  index: number;
}

const TimelineNode = ({ experience, index }: TimelineNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div className="relative w-full">
      {/* Timeline Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <div
          className="w-6 h-6 rounded-full bg-accent cursor-pointer transition-all duration-300 hover:scale-125 hover:shadow-[0_0_20px_hsl(var(--accent)/0.6)] border-4 border-background"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>

      {/* Content Card - appears on hover */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${
          isLeft ? "right-[55%] pr-8" : "left-[55%] pl-8"
        } ${
          isHovered
            ? "opacity-100 translate-x-0"
            : `opacity-0 ${isLeft ? "translate-x-8" : "-translate-x-8"} pointer-events-none`
        }`}
        style={{ width: "calc(45% - 2rem)" }}
      >
        <Card className="glass-card border-2 border-primary/20 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg leading-tight">{experience.role}</CardTitle>
              {experience.current && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium whitespace-nowrap">
                  Current
                </span>
              )}
            </div>
            <CardDescription className="text-sm font-semibold text-foreground/80">
              {experience.company}
            </CardDescription>
            <div className="text-xs text-muted-foreground font-medium pt-1">
              {experience.period}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {experience.description}
            </p>
            <div className="space-y-1.5">
              <h5 className="font-semibold text-xs text-primary">Key Achievements:</h5>
              <ul className="space-y-1">
                {experience.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimelineNode;
