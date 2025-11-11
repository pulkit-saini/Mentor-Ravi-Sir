import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  current?: boolean;
}

interface CompactTimelineProps {
  experiences: Experience[];
  className?: string;
}

const CompactTimeline = ({ experiences, className }: CompactTimelineProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate wave path
  const generateWavePath = () => {
    return `M 0 30 ${Array.from({ length: 100 }, (_, i) => {
      const x = i;
      const y = 30 + Math.sin(i * 0.15) * 8;
      return `L ${x} ${y}`;
    }).join(' ')}`;
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Scrollable on small screens, full width on desktop */}
      <div className="px-2 md:px-0">
        <div className="relative min-w-[720px] md:min-w-0 px-4">
          {/* Wavy line */}
          <svg 
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full" 
            height="60" 
            preserveAspectRatio="none"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="animatedWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* Base wave path */}
            <path
              d={generateWavePath()}
              stroke="url(#waveGradient)"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            {/* Animated wave path */}
            {hoveredIndex !== null && (
              <motion.path
                d={generateWavePath()}
                stroke="url(#animatedWaveGradient)"
                strokeWidth="3"
                fill="none"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: (hoveredIndex + 1) / experiences.length,
                }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeInOut"
                }}
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Dots row */}
          <div className="flex items-center justify-between gap-6 md:gap-8 py-6 snap-x snap-mandatory" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            {experiences.map((exp, idx) => (
              <HoverCard key={idx} openDelay={80} closeDelay={80}>
                <HoverCardTrigger asChild>
                  <button
                    type="button"
                    aria-label={`${exp.role} at ${exp.company}`}
                    className="relative group snap-center shrink-0 focus:outline-none"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Animated wave ripples - Always visible */}
                    <span className="absolute inset-0 -m-4">
                      <svg className="w-full h-full" viewBox="0 0 60 60">
                        {/* First ripple */}
                        <motion.circle
                          cx="30"
                          cy="30"
                          r="10"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="1.5"
                          animate={{ 
                            r: [10, 25],
                            opacity: [0.6, 0]
                          }}
                          transition={{
                            duration: hoveredIndex === idx ? 1 : 2,
                            repeat: Infinity,
                            ease: "easeOut"
                          }}
                        />
                        {/* Second ripple */}
                        <motion.circle
                          cx="30"
                          cy="30"
                          r="10"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="1.5"
                          animate={{ 
                            r: [10, 25],
                            opacity: [0.4, 0]
                          }}
                          transition={{
                            duration: hoveredIndex === idx ? 1 : 2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: hoveredIndex === idx ? 0.3 : 0.66
                          }}
                        />
                        {/* Third ripple */}
                        <motion.circle
                          cx="30"
                          cy="30"
                          r="10"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="1.5"
                          animate={{ 
                            r: [10, 25],
                            opacity: [0.3, 0]
                          }}
                          transition={{
                            duration: hoveredIndex === idx ? 1 : 2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: hoveredIndex === idx ? 0.6 : 1.33
                          }}
                        />
                      </svg>
                    </span>
                    {/* Outer ring for focus/visibility */}
                    <span className="absolute inset-0 -m-2 rounded-full" />
                    {/* Dot */}
                    <motion.span 
                      className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent ring-4 ring-background shadow block relative z-10"
                      animate={{
                        scale: hoveredIndex === idx ? 1.2 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Period label */}
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">
                      {exp.period}
                    </span>
                  </button>
                </HoverCardTrigger>
                <HoverCardContent align="center" side="top" className="w-80 md:w-[480px] p-0">
                  <Card className="border-2 border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-base md:text-lg leading-tight">{exp.role}</CardTitle>
                        {exp.current && (
                          <span className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium whitespace-nowrap">
                            Current
                          </span>
                        )}
                      </div>
                      <CardDescription className="text-sm font-semibold text-foreground/80">
                        {exp.company}
                      </CardDescription>
                      <div className="text-xs text-muted-foreground font-medium pt-1">
                        {exp.period}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="space-y-1.5">
                        <h5 className="font-semibold text-xs text-primary">Key Achievements:</h5>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactTimeline;
