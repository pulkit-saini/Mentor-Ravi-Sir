import { Award, Users, Zap, MessageSquare, Trophy, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Form groups, chat in real-time, and work together on creative challenges with built-in communication tools.",
  },
  {
    icon: Zap,
    title: "Gamified Tasks",
    description: "Complete timed tasks, earn points, and climb the leaderboard with our engaging gamification system.",
  },
  {
    icon: Award,
    title: "Digital Certificates",
    description: "Receive professional certificates upon completion with LinkedIn integration for easy sharing.",
  },
  {
    icon: Trophy,
    title: "Live Leaderboards",
    description: "Track your team's performance in real-time and compete with others across all tasks.",
  },
  {
    icon: MessageSquare,
    title: "Expert Mentorship",
    description: "Get guidance from Sir and request 1-on-1 mentorship sessions after completing events.",
  },
  {
    icon: TrendingUp,
    title: "Skill Development",
    description: "Learn through practice with hands-on projects, feedback loops, and continuous improvement.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-foreground">What We Provide</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to create, participate, and excel in collaborative events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-xl border border-border bg-card shadow-md hover:shadow-xl transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center mb-6 group-hover:bg-muted/80 transition-colors">
                  <Icon className="w-7 h-7 text-foreground/80" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
