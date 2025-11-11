import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Garden Sky Gradient Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Soft cloud layers */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1/3 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, hsl(200 60% 95% / 0.5), transparent 50%)",
        }}
        animate={{
          x: [0, 100, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-20 right-0 w-full h-1/3 opacity-20"
        style={{
          background: "radial-gradient(ellipse at 70% 30%, hsl(180 50% 92% / 0.4), transparent 50%)",
        }}
        animate={{
          x: [0, -150, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating leaves and butterflies */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-lg"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            rotate: [0, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        >
          {particle.id % 5 === 0 ? "🍃" : particle.id % 5 === 1 ? "🦋" : particle.id % 5 === 2 ? "✨" : particle.id % 5 === 3 ? "🌸" : "🌿"}
        </motion.div>
      ))}

      {/* Gentle sparkle particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-success/40 dark:bg-success/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Soft flowing organic paths (vines/roots) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15] dark:opacity-[0.08]">
        <defs>
          <linearGradient id="vineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="vineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M0,180 Q200,140 400,180 T800,180 Q1000,220 1200,180"
          stroke="url(#vineGradient1)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.path
          d="M100,450 Q300,400 500,450 T900,450 Q1100,500 1300,450"
          stroke="url(#vineGradient2)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.path
          d="M-50,280 Q150,320 350,280 T700,280 Q900,240 1100,280"
          stroke="url(#vineGradient1)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>

      {/* Soft ambient light areas (sunlight through trees) */}
      <motion.div 
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-10 blur-3xl bg-primary/20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full opacity-15 dark:opacity-8 blur-3xl bg-primary/20"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
};
