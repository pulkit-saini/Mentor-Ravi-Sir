import { Briefcase, Target, Lightbulb, Award, Building2, Rocket } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import InteractiveTimeline from "./portfolio/InteractiveTimeline";

const experiences = [
  {
    role: "Director – Innovation",
    company: "MangosOrange Group",
    period: "2022 - Present",
    description: "Leading innovation initiatives across multiple verticals, driving strategic technology adoption and overseeing R&D operations for next-generation products.",
    achievements: [
      "Launched 5 innovative product lines",
      "Established 3 Centers of Excellence",
      "Led digital transformation initiatives"
    ],
    current: true
  },
  {
    role: "Founder & CEO",
    company: "MangosOrange Agritech India Pvt. Ltd.",
    period: "2020 - Present",
    description: "Founded and leading agritech venture focused on sustainable farming solutions, IoT-enabled agriculture, and farmer empowerment programs.",
    achievements: [
      "Deployed solutions across 1000+ farms",
      "Raised Series A funding",
      "Built team of 50+ professionals"
    ],
    current: true
  },
  {
    role: "Business Vertical Head",
    company: "Multigraphics Group",
    period: "2018 - 2022",
    description: "Managed strategic business vertical operations, drove revenue growth, and established new market partnerships in the graphics and technology sector.",
    achievements: [
      "Increased vertical revenue by 300%",
      "Expanded to 8 new markets",
      "Led team of 40+ professionals"
    ]
  },
  {
    role: "Business Head",
    company: "Digians Global",
    period: "2016 - 2018",
    description: "Spearheaded business development initiatives, managed client relationships, and drove digital transformation projects for enterprise clients.",
    achievements: [
      "Secured $5M+ in new business",
      "Implemented digital solutions for 50+ clients",
      "Built strategic partnerships"
    ]
  },
  {
    role: "Manager – Business Development",
    company: "vStacks Infotech",
    period: "2014 - 2016",
    description: "Led business development efforts, identified new market opportunities, and managed key client relationships in the IT services sector.",
    achievements: [
      "Expanded client base by 150%",
      "Launched 3 new service offerings",
      "Established offshore development centers"
    ]
  },
  {
    role: "Vertical Head – Training & Development",
    company: "Cat-7 Business Solutions",
    period: "2012 - 2014",
    description: "Established and managed training programs, developed curriculum for emerging technologies, and led corporate learning initiatives.",
    achievements: [
      "Trained 2000+ professionals",
      "Developed 15+ certification programs",
      "Established training partnerships"
    ]
  },
  {
    role: "Manager Projects",
    company: "Advait Life-Education",
    period: "2010 - 2012",
    description: "Managed educational technology projects, developed e-learning platforms, and drove innovation in educational delivery methods.",
    achievements: [
      "Launched 10+ edtech projects",
      "Implemented LMS for 50+ institutions",
      "Developed mobile learning solutions"
    ]
  },
  {
    role: "Sr. Training Manager",
    company: "HCL CR+",
    period: "2008 - 2010",
    description: "Led corporate training initiatives, developed technical curriculum, and managed learning and development programs for IT professionals.",
    achievements: [
      "Conducted 500+ training sessions",
      "Achieved 98% satisfaction rating",
      "Developed cloud computing curriculum"
    ]
  },
  {
    role: "Faculty",
    company: "Jetking Infotrain Limited",
    period: "2006 - 2008",
    description: "Started career as technical faculty, teaching networking and IT infrastructure courses, and mentoring students in technology careers.",
    achievements: [
      "Taught 1000+ students",
      "Developed hands-on lab programs",
      "Achieved 95% placement rate"
    ]
  }
];

const expertise = [
  {
    icon: Lightbulb,
    title: "Technology & Product Incubation",
    description: "Leading innovation labs and product development from concept to market launch with 5 innovation labs established and 15+ patents filed"
  },
  {
    icon: Rocket,
    title: "Startup Consulting & Development",
    description: "Strategic guidance for 100+ startups across ideation, funding, and scaling phases with $50M+ funding raised and 80% success rate"
  },
  {
    icon: Target,
    title: "Team, Teacher & Youth Mentoring",
    description: "Empowering educators, professionals, and young entrepreneurs through structured mentorship with 5000+ professionals trained across 20+ certification programs"
  },
  {
    icon: Award,
    title: "Social Entrepreneurship",
    description: "Creating sustainable business models that drive positive social and environmental impact with solutions deployed across 1000+ farms achieving 40% yield increase"
  },
  {
    icon: Building2,
    title: "Digital Marketing & Cloud Technologies",
    description: "AWS expertise, IT infrastructure, and comprehensive digital transformation strategies with 100+ digital projects and 50+ cloud migrations achieving 99.9% uptime"
  },
  {
    icon: Briefcase,
    title: "Research & Development",
    description: "Leading R&D initiatives in agritech, edtech, and emerging technology sectors with pioneering IoT-enabled agriculture systems and sustainable farming solutions"
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="gradient-text">Professional Portfolio</h2>
          <p className="text-lg text-muted-foreground">
            A progressive career spanning leadership roles across innovation, technology, agritech, and education sectors
          </p>
        </div>

        {/* Core Expertise */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12">Core Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="hover-lift">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Professional Journey Timeline */}
        <h3 className="text-2xl font-bold text-center mb-12">Professional Journey</h3>
        <div className="max-w-7xl mx-auto">
          <InteractiveTimeline experiences={experiences} />
        </div>

        {/* Quote Section */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <blockquote className="glass-card p-8 rounded-2xl">
            <p className="text-xl italic text-muted-foreground mb-4">
              "Innovation happens at the intersection of technology, education, and agriculture – 
              where sustainable solutions meet real-world impact."
            </p>
            <footer className="text-sm font-semibold gradient-text">— Ravi Rautela</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
