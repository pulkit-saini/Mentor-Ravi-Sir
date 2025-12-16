import { Card } from "@/components/ui/card";
import { Presentation, Calendar, GraduationCap, Users, Briefcase, FolderKanban, Trophy, HeartHandshake, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Workshop",
    subtitle: "Learn Hands-On Skills",
    icon: Presentation,
    bgColor: "bg-emerald-200",
    link: "/workshop",
  },
  {
    title: "Events",
    subtitle: "Connect & Network",
    icon: Calendar,
    bgColor: "bg-orange-200",
    link: "/events",
  },
  {
    title: "Training",
    subtitle: "Expert-Led Programs",
    icon: GraduationCap,
    bgColor: "bg-blue-200",
    link: "/career",
  },
  {
    title: "Gallery",
    subtitle: "Explore Our Memories",
    icon: Users,
    bgColor: "bg-purple-200",
    link: "/gallery",
  },
  {
    title: "Career",
    subtitle: "Explore Diverse Careers",
    icon: Briefcase,
    bgColor: "bg-yellow-200",
    link: "/career",
  },
  {
    title: "Projects",
    subtitle: "Build Real-World Solutions",
    icon: FolderKanban,
    bgColor: "bg-pink-200",
    link: "/projects",
  },
  {
    title: "Hackathons",
    subtitle: "Battle For Excellence",
    icon: Trophy,
    bgColor: "bg-teal-200",
    link: "/hackathons",
  },
  {
    title: "Placement Support",
    subtitle: "Get Your Dream Job",
    icon: HeartHandshake,
    bgColor: "bg-indigo-200",
    link: "/placement-support",
  },
  {
    title: "Research",
    subtitle: "Innovate & Discover",
    icon: FlaskConical,
    bgColor: "bg-rose-200",
    link: "/research",
  },
];

const EngagementsSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          <span className="text-primary">Engagements</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Explore our diverse range of programs and opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Link key={index} to={service.link}>
            <Card 
              className={`${service.bgColor} border-0 p-6 rounded-3xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-elegant group overflow-hidden relative h-full`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1 z-10">
                  <h3 className="text-2xl font-bold text-foreground/90">{service.title}</h3>
                  <p className="text-sm text-foreground/70">{service.subtitle}</p>
                </div>
                <div className="relative z-10">
                  <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/60">
                    <service.icon className="w-12 h-12 text-foreground/80" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/20 rounded-full blur-2xl transition-all duration-300 group-hover:scale-150" />
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EngagementsSection;