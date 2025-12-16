import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  current?: boolean;
}

interface InteractiveTimelineProps {
  experiences: Experience[];
  className?: string;
}

const InteractiveTimeline = ({ experiences, className }: InteractiveTimelineProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const generateWavePath = (vertical = false) => {
    if (vertical) {
      // Vertical wave for mobile
      return `M 30 0 ${Array.from({ length: 100 }, (_, i) => {
        const y = i * 3;
        const x = 30 + Math.sin(i * 0.15) * 8;
        return `L ${x} ${y}`;
      }).join(' ')}`;
    }
    // Horizontal wave for desktop
    return `M 0 30 ${Array.from({ length: 100 }, (_, i) => {
      const x = i;
      const y = 30 + Math.sin(i * 0.15) * 8;
      return `L ${x} ${y}`;
    }).join(' ')}`;
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:block overflow-x-auto">
        <div className="relative min-w-[800px] px-8 py-12">
          {/* Wave SVG */}
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
              <linearGradient id="travelingLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0">
                  <animate attributeName="offset" values="0;1" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1">
                  <animate attributeName="offset" values="0.5;1.5" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0">
                  <animate attributeName="offset" values="1;2" dur="3s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Base wave */}
            <path
              d={generateWavePath()}
              stroke="url(#waveGradient)"
              strokeWidth="2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Traveling light effect */}
            <motion.path
              d={generateWavePath()}
              stroke="url(#travelingLight)"
              strokeWidth="4"
              fill="none"
              vectorEffect="non-scaling-stroke"
              filter="url(#glow)"
              strokeLinecap="round"
            />
            
            {/* Hover/Selected highlight */}
            {(hoveredIndex !== null || selectedIndex !== null) && (
              <motion.path
                d={generateWavePath()}
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                fill="none"
                vectorEffect="non-scaling-stroke"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: ((hoveredIndex ?? selectedIndex ?? 0) + 1) / experiences.length,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Nodes */}
          <div className="flex items-center justify-between relative z-10 py-8">
            {experiences.map((exp, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`${exp.role} at ${exp.company}`}
                className="relative group focus:outline-none shrink-0"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedIndex(idx === selectedIndex ? null : idx)}
              >
                {/* Ripple effect */}
                <span className="absolute inset-0 -m-6">
                  <svg className="w-full h-full" viewBox="0 0 80 80">
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="15"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      animate={{ 
                        r: [15, 35],
                        opacity: [0.8, 0]
                      }}
                      transition={{
                        duration: hoveredIndex === idx || selectedIndex === idx ? 1 : 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  </svg>
                </span>
                
                {/* Node dot */}
                <motion.span 
                  className={cn(
                    "w-6 h-6 rounded-full block relative z-10 ring-4 ring-background",
                    selectedIndex === idx 
                      ? "bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.8)]" 
                      : "bg-accent shadow-[0_0_10px_hsl(var(--accent)/0.5)]"
                  )}
                  animate={{
                    scale: hoveredIndex === idx || selectedIndex === idx ? 1.3 : 1,
                    boxShadow: hoveredIndex === idx || selectedIndex === idx 
                      ? "0 0 25px hsl(var(--primary)/0.9)" 
                      : "0 0 10px hsl(var(--accent)/0.5)"
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Period label */}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap font-medium">
                  {exp.period.split(' - ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden relative px-8 py-8">
        <svg 
          className="absolute left-8 top-0 bottom-0 h-full" 
          width="60" 
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="waveGradientVertical" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="travelingLightVertical" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0">
                <animate attributeName="offset" values="0;1" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1">
                <animate attributeName="offset" values="0.5;1.5" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0">
                <animate attributeName="offset" values="1;2" dur="4s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          
          <path
            d={generateWavePath(true)}
            stroke="url(#waveGradientVertical)"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          
          <motion.path
            d={generateWavePath(true)}
            stroke="url(#travelingLightVertical)"
            strokeWidth="4"
            fill="none"
            vectorEffect="non-scaling-stroke"
            filter="url(#glow)"
            strokeLinecap="round"
          />
        </svg>

        <div className="space-y-16 relative z-10 pl-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative">
              <button
                type="button"
                aria-label={`${exp.role} at ${exp.company}`}
                className="absolute -left-12 top-0 focus:outline-none"
                onClick={() => setSelectedIndex(idx === selectedIndex ? null : idx)}
                onTouchStart={() => setHoveredIndex(idx)}
                onTouchEnd={() => setHoveredIndex(null)}
              >
                <motion.span 
                  className={cn(
                    "w-5 h-5 rounded-full block ring-4 ring-background",
                    selectedIndex === idx 
                      ? "bg-primary shadow-[0_0_15px_hsl(var(--primary)/0.8)]" 
                      : "bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.5)]"
                  )}
                  animate={{
                    scale: selectedIndex === idx ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </button>
              
              <div className="text-xs text-muted-foreground font-medium mb-2">{exp.period}</div>
              <div className="text-sm font-semibold">{exp.role}</div>
              <div className="text-xs text-muted-foreground">{exp.company}</div>
              
              {selectedIndex === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3"
                >
                  <Card className="border-2 border-primary/20">
                    <CardContent className="p-4 space-y-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="space-y-1">
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
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Selected Experience Modal */}
      <AnimatePresence>
        {!isMobile && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <Card className="border-2 border-primary/20 shadow-2xl">
                <CardHeader className="pb-3 relative">
                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="absolute top-4 right-4 p-2 hover:bg-accent/10 rounded-full transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2 mb-1 pr-10">
                    <CardTitle className="text-xl leading-tight">
                      {experiences[selectedIndex].role}
                    </CardTitle>
                    {experiences[selectedIndex].current && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium whitespace-nowrap">
                        Current
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-base font-semibold text-foreground/80">
                    {experiences[selectedIndex].company}
                  </CardDescription>
                  <div className="text-sm text-muted-foreground font-medium pt-1">
                    {experiences[selectedIndex].period}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {experiences[selectedIndex].description}
                  </p>
                  <div className="space-y-2">
                    <h5 className="font-semibold text-sm text-primary">Key Achievements:</h5>
                    <ul className="space-y-2">
                      {experiences[selectedIndex].achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveTimeline;
