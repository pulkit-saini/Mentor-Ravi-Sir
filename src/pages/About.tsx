import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import sirPortrait from "@/assets/sir-portrait.jpg";
import { 
  Trophy, Users, Award, MessageSquare, Zap, Target, Sparkles, Rocket, 
  Brain, Code, Database, Cpu, Star, TrendingUp, Lock, Unlock, Gift,
  Medal, Crown, Flame, CheckCircle2, Circle
} from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

// Holographic Card Effect
const HolographicCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 50%)`,
      }}
    >
      {children}
    </div>
  );
};

// Floating Particles
const ParticleField = () => {
  const particles = Array.from({ length: 50 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Scanning Line Effect
const ScanLine = () => (
  <motion.div
    className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"
    animate={{
      y: [0, 800, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const gamifiedFeatures = [
    {
      icon: Zap,
      title: "Gamified Tasks",
      description: "Every challenge you complete takes you a level closer to mastery.",
      xp: "500 XP",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Trophy,
      title: "Live Leaderboards",
      description: "Real-time rankings with glowing highlights. Compete and dominate.",
      xp: "750 XP",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      title: "Digital Certificates",
      description: "These aren't just PDFs — they're proof of hustle. Flex your skills.",
      xp: "1000 XP",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Learn teamwork like a startup — collaborate, brainstorm, build in real time.",
      xp: "600 XP",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MessageSquare,
      title: "Expert Mentorships",
      description: "Direct mentorship from Ravi Rautela himself. Real guidance, real growth.",
      xp: "2000 XP",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Gift,
      title: "Khazaana Vault",
      description: "Unlock internships, resources, toolkits. Secret treasures await.",
      xp: "1500 XP",
      color: "from-rose-500 to-pink-500",
    },
  ];

  const achievements = [
    { icon: Medal, label: "First Task", unlocked: true },
    { icon: Crown, label: "Top 10", unlocked: true },
    { icon: Flame, label: "10-Day Streak", unlocked: true },
    { icon: Star, label: "Hackathon Win", unlocked: false },
    { icon: Trophy, label: "Mentor's Choice", unlocked: false },
    { icon: Rocket, label: "Project Launch", unlocked: false },
  ];

  const leaderboard = [
    { rank: 1, name: "Priya Sharma", xp: 12500, level: 25, avatar: "🚀", glow: "from-yellow-400 to-amber-500" },
    { rank: 2, name: "Arjun Patel", xp: 11800, level: 24, avatar: "⚡", glow: "from-gray-300 to-gray-400" },
    { rank: 3, name: "Zara Khan", xp: 10900, level: 22, avatar: "🔥", glow: "from-orange-400 to-amber-600" },
    { rank: 4, name: "Rohan Mehta", xp: 9500, level: 20, avatar: "💎", glow: "from-blue-400 to-cyan-500" },
    { rank: 5, name: "Ananya Singh", xp: 8700, level: 18, avatar: "✨", glow: "from-purple-400 to-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <Navigation />
      
      {/* Particle Field Background */}
      <ParticleField />
      <ScanLine />

      {/* 🎯 HERO SECTION - Tech Ecosystem */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Holographic Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-6xl mx-auto"
          >
            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card border border-primary/20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Cpu className="w-5 h-5 text-primary" />
              </motion.div>
              <span className="text-sm font-semibold gradient-text">AI-Powered Tech Ecosystem</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="gradient-text">Where Innovation</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                Meets Imagination
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Build. Compete. Collaborate. Win. Repeat.
              <br />
              <span className="font-bold text-foreground">
                This isn't just another program — it's a gem for every student who wants to make it big.
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="text-xl px-12 py-8 bg-gradient-primary hover:shadow-glow transition-all duration-300 group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <Rocket className="w-6 h-6 mr-2 relative z-10" />
                  <span className="relative z-10">Start Your Journey</span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-xl px-12 py-8 border-2 transition-all duration-300"
                >
                  <Trophy className="w-6 h-6 mr-2" />
                  View Leaderboard
                </Button>
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap justify-center gap-8 pt-12"
            >
              {[
                { value: "25+", label: "Years Experience" },
                { value: "5000+", label: "Students Trained" },
                { value: "100+", label: "Startups Mentored" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 🎮 XP DASHBOARD - Gamified Experience */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-4 py-2 text-sm">
              <Zap className="w-4 h-4 mr-2" />
              Gamified Learning
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Level Up Your Skills
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every challenge you complete takes you closer to mastery
            </p>
          </motion.div>

          {/* XP Progress Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-16"
          >
            <HolographicCard className="glass-card p-8 md:p-12 rounded-2xl border border-primary/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 space-y-6 w-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">Your Progress</h3>
                      <p className="text-muted-foreground">Keep pushing to the next level!</p>
                    </div>
                    <motion.div
                      className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold shadow-glow"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-primary-foreground">18</span>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">8,450 / 10,000 XP</span>
                      <span className="text-muted-foreground">Level 19 at 10,000 XP</span>
                    </div>
                    <div className="relative">
                      <Progress value={84.5} className="h-3" />
                      <motion.div
                        className="absolute top-0 left-0 h-3 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "84.5%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    <Badge variant="secondary" className="px-4 py-2">
                      <Flame className="w-4 h-4 mr-2 text-orange-500" />
                      12-Day Streak
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2">
                      <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                      15 Achievements
                    </Badge>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </motion.div>

          {/* Achievement Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Your Achievements</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {achievements.map((achievement, idx) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative group"
                  >
                    <div className={`glass-card p-6 rounded-xl text-center ${achievement.unlocked ? 'border-primary/30' : 'border-muted opacity-40'}`}>
                      {achievement.unlocked ? (
                        <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      ) : (
                        <Lock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      )}
                      <p className="text-xs font-medium">{achievement.label}</p>
                      {achievement.unlocked && (
                        <motion.div
                          className="absolute -top-2 -right-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.1 + 0.3 }}
                        >
                          <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-500" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🏆 LIVE LEADERBOARD */}
      <section className="py-24 relative bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-4 py-2 text-sm">
              <Trophy className="w-4 h-4 mr-2" />
              Real-Time Rankings
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Live Leaderboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compete and dominate. Your name could be here next.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-card rounded-2xl overflow-hidden border border-primary/20">
              {leaderboard.map((player, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className={`p-6 border-b border-border/50 last:border-0 relative overflow-hidden ${
                    idx === 0 ? 'bg-gradient-to-r from-yellow-500/10 to-transparent' : ''
                  }`}
                >
                  {idx === 0 && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-amber-500/5 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  
                  <div className="flex items-center gap-6 relative z-10">
                    {/* Rank */}
                    <div className="w-12 h-12 flex-shrink-0">
                      {idx < 3 ? (
                        <motion.div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${player.glow} flex items-center justify-center text-xl font-bold shadow-lg`}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {idx === 0 && <Crown className="w-6 h-6 text-white" />}
                          {idx === 1 && <Medal className="w-6 h-6 text-white" />}
                          {idx === 2 && <Star className="w-6 h-6 text-white" />}
                        </motion.div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
                          {player.rank}
                        </div>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="text-4xl">{player.avatar}</div>

                    {/* Info */}
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{player.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          {player.xp.toLocaleString()} XP
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          Level {player.level}
                        </span>
                      </div>
                    </div>

                    {/* Live Indicator */}
                    {idx < 2 && (
                      <motion.div
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-medium text-green-500">Active Now</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Button size="lg" variant="outline" className="group">
                View Full Leaderboard
                <TrendingUp className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🎯 FEATURES GRID */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Your Complete Tech Arsenal
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Six powerful features designed to turn you into an unstoppable innovator
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {gamifiedFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="group"
                >
                  <HolographicCard className="glass-card p-8 h-full rounded-2xl border border-primary/20 hover-lift relative overflow-hidden">
                    {/* Gradient Glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    
                    <div className="relative z-10 space-y-4">
                      {/* Icon + XP Badge */}
                      <div className="flex items-start justify-between">
                        <motion.div
                          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-glow`}
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <Badge className="bg-primary/10 border-primary/20">
                          +{feature.xp}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Hover Effect */}
                      <motion.div
                        className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span>Explore Feature</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </motion.div>
                    </div>
                  </HolographicCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 💎 KHAZAANA VAULT */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: "radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Card className="glass-card p-12 md:p-16 rounded-3xl border-2 border-primary/20 relative overflow-hidden">
              {/* Animated Background */}
              <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="relative z-10 text-center space-y-8">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 1 }}
                  className="inline-block"
                >
                  <div className="w-32 h-32 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-glow mx-auto rotate-12">
                    <Gift className="w-16 h-16 text-primary-foreground" />
                  </div>
                </motion.div>

                <div>
                  <Badge className="mb-4 px-4 py-2">
                    <Unlock className="w-4 h-4 mr-2" />
                    Secret Rewards
                  </Badge>
                  <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
                    Khazaana Vault
                  </h2>
                  <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                    Unlock internships, exclusive resources, premium toolkits, and secret workshops. 
                    <strong className="text-foreground"> Your treasure chest of opportunities awaits.</strong>
                  </p>
                </div>

                {/* Reward Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: "🎯", title: "Internships", desc: "Top company placements" },
                    { icon: "🛠️", title: "Pro Toolkits", desc: "Industry-grade resources" },
                    { icon: "🎓", title: "Workshops", desc: "Exclusive masterclasses" },
                  ].map((reward, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 }}
                      whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
                    >
                      <div className="glass-card p-6 rounded-xl border border-primary/20 h-full">
                        <div className="text-5xl mb-4">{reward.icon}</div>
                        <h4 className="font-bold text-xl mb-2">{reward.title}</h4>
                        <p className="text-sm text-muted-foreground">{reward.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button size="lg" className="bg-gradient-primary hover:shadow-glow text-lg px-10 py-6">
                  <Unlock className="w-5 h-5 mr-2" />
                  Unlock Your Vault
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 🚀 MENTORSHIP SECTION */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <Card className="glass-card p-12 rounded-3xl border border-primary/20 overflow-hidden relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute -inset-6 bg-gradient-primary rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30">
                    <img 
                      src={sirPortrait} 
                      alt="Ravi Rautela - Your Innovation Mentor" 
                      className="w-full h-auto"
                    />
                  </div>
                  
                  {/* Floating Badge */}
                  <motion.div
                    className="absolute -top-4 -right-4 glass-card px-6 py-3 rounded-full border border-primary/20 shadow-glow"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-3 h-3 rounded-full bg-green-500"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="font-bold text-sm">Available for Mentorship</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div>
                    <Badge className="mb-4 px-4 py-2">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Direct Access
                    </Badge>
                    <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
                      Learn from
                      <br />
                      Ravi Rautela
                    </h2>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Get <strong className="text-foreground">personalized mentorship</strong> from someone who's:
                  </p>

                  <div className="space-y-4">
                    {[
                      "Mentored 100+ startups to success",
                      "Trained 5000+ students in tech & innovation",
                      "25+ years of real-world industry experience",
                      "Leading innovation at MangosOrange Group",
                    ].map((point, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-lg">{point}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <p className="text-xl font-semibold mb-6">
                      This isn't generic advice — it's tailored mentorship that transforms careers.
                    </p>
                    <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Request 1-on-1 Session
                    </Button>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 🎪 HACKATHONS SECTION */}
      <section className="py-24 relative bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 px-4 py-2 text-sm">
              <Rocket className="w-4 h-4 mr-2" />
              Innovation Sprints
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
              Hackathons & Competitions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join national-level hackathons, pitch fests, and innovation challenges. 
              Build, compete, and launch your ideas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { 
                title: "Tech Hackathon", 
                date: "Next: Dec 15", 
                prize: "₹50,000", 
                participants: "500+",
                color: "from-blue-500 to-cyan-500"
              },
              { 
                title: "AI Challenge", 
                date: "Next: Jan 10", 
                prize: "₹75,000", 
                participants: "300+",
                color: "from-purple-500 to-pink-500"
              },
              { 
                title: "Startup Pitch", 
                date: "Next: Feb 20", 
                prize: "₹1,00,000", 
                participants: "200+",
                color: "from-orange-500 to-red-500"
              },
            ].map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="glass-card p-8 rounded-2xl border border-primary/20 h-full relative overflow-hidden group">
                  {/* Animated Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                  />
                  
                  <div className="relative z-10 space-y-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg`}>
                      <Trophy className="w-8 h-8 text-white" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground">{event.date}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Prize Pool</span>
                        <span className="text-lg font-bold gradient-text">{event.prize}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Participants</span>
                        <span className="text-lg font-bold">{event.participants}</span>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      Register Now
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 💫 FINAL CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary to-accent rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center space-y-12"
          >
            {/* Animated Gem */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut"
              }}
              className="inline-block text-9xl drop-shadow-glow"
            >
              💎
            </motion.div>

            <div className="space-y-6">
              <h2 className="text-6xl md:text-8xl font-extrabold leading-tight">
                <span className="gradient-text">This Is Your Gem.</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
                  Don't Miss Out.
                </span>
              </h2>

              <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Where learning feels like a game, mentorship feels personal, and growth feels inevitable.
                <br />
                <strong className="text-foreground">
                  Join the community you've been searching for.
                </strong>
              </p>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-8 max-w-3xl mx-auto py-8"
            >
              {[
                { icon: "⚡", text: "100% Practical" },
                { icon: "🎯", text: "Industry Ready" },
                { icon: "🚀", text: "Career Focused" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl mb-3">{item.icon}</div>
                  <p className="font-semibold text-lg">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="text-2xl px-14 py-10 bg-gradient-primary hover:shadow-glow transition-all duration-300 group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Rocket className="w-7 h-7 mr-3 relative z-10" />
                  <span className="relative z-10">Start Your Journey</span>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-2xl px-14 py-10 border-2 transition-all duration-300"
                >
                  <MessageSquare className="w-7 h-7 mr-3" />
                  Talk to Ravi
                </Button>
              </motion.div>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-2xl italic text-muted-foreground pt-12 border-t border-border/50 max-w-3xl mx-auto"
            >
              "Innovation happens where curiosity meets courage — and you get to lead the way."
              <footer className="mt-4 text-lg font-semibold not-italic gradient-text">
                — Ravi Rautela
              </footer>
            </motion.blockquote>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
