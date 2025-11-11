import { useEffect } from "react";
import { Mail, Phone, Linkedin, Award, TrendingUp, Users, Briefcase, Target, Lightbulb, Rocket, Building2, GraduationCap, ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CompactTimeline from "@/components/portfolio/CompactTimeline";
import projectAIAttendance from "@/assets/project-ai-attendance.jpg";
import projectDataScience from "@/assets/project-data-science.jpg";
import projectBlockchain from "@/assets/project-blockchain.jpg";
import projectIoTAgriculture from "@/assets/project-iot-agriculture.jpg";
import projectWebDev from "@/assets/project-web-dev.jpg";
import projectMLAnalytics from "@/assets/project-ml-analytics.jpg";
const Portfolio = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        element?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
  const stats = [{
    value: "25+",
    label: "Years Experience",
    icon: Briefcase
  }, {
    value: "100+",
    label: "Startups Mentored",
    icon: Users
  }, {
    value: "50+",
    label: "Products Incubated",
    icon: Lightbulb
  }, {
    value: "15+",
    label: "Industry Awards",
    icon: Award
  }];
  const expertise = [{
    icon: Lightbulb,
    title: "Technology & Product Incubation",
    description: "Leading innovation labs and product development from concept to market launch with 5 innovation labs established and 15+ patents filed"
  }, {
    icon: Rocket,
    title: "Startup Consulting & Development",
    description: "Strategic guidance for 100+ startups across ideation, funding, and scaling phases with $50M+ funding raised and 80% success rate"
  }, {
    icon: GraduationCap,
    title: "Team, Teacher & Youth Mentoring",
    description: "Empowering educators, professionals, and young entrepreneurs through structured mentorship with 5000+ professionals trained across 20+ certification programs"
  }, {
    icon: Target,
    title: "Social Entrepreneurship",
    description: "Creating sustainable business models that drive positive social and environmental impact with solutions deployed across 1000+ farms achieving 40% yield increase"
  }, {
    icon: Building2,
    title: "Digital Marketing & Cloud Technologies",
    description: "AWS expertise, IT infrastructure, and comprehensive digital transformation strategies with 100+ digital projects and 50+ cloud migrations achieving 99.9% uptime"
  }, {
    icon: TrendingUp,
    title: "Research & Development",
    description: "Leading R&D initiatives in agritech, edtech, and emerging technology sectors with pioneering IoT-enabled agriculture systems and sustainable farming solutions"
  }];
  const experiences = [{
    role: "Director – Innovation",
    company: "MangosOrange Group",
    period: "2022 - Present",
    description: "Leading innovation initiatives across multiple verticals, driving strategic technology adoption and overseeing R&D operations for next-generation products.",
    achievements: ["Launched 5 innovative product lines", "Established 3 Centers of Excellence", "Led digital transformation initiatives"],
    current: true
  }, {
    role: "Founder & CEO",
    company: "MangosOrange Agritech India Pvt. Ltd.",
    period: "2020 - 2022",
    description: "Founded and leading agritech venture focused on sustainable farming solutions, IoT-enabled agriculture, and farmer empowerment programs.",
    achievements: ["Deployed solutions across 1000+ farms", "Raised Series A funding", "Built team of 50+ professionals"],
    current: false
  }, {
    role: "Business Vertical Head",
    company: "Multigraphics Group",
    period: "2018 - 2022",
    description: "Managed strategic business vertical operations, drove revenue growth, and established new market partnerships in the graphics and technology sector.",
    achievements: ["Increased vertical revenue by 300%", "Expanded to 8 new markets", "Led team of 40+ professionals"]
  }, {
    role: "Business Head",
    company: "Digians Global",
    period: "2016 - 2018",
    description: "Spearheaded business development initiatives, managed client relationships, and drove digital transformation projects for enterprise clients.",
    achievements: ["Secured $5M+ in new business", "Implemented digital solutions for 50+ clients", "Built strategic partnerships"]
  }, {
    role: "Manager – Business Development",
    company: "vStacks Infotech",
    period: "2014 - 2016",
    description: "Led business development efforts, identified new market opportunities, and managed key client relationships in the IT services sector.",
    achievements: ["Expanded client base by 150%", "Launched 3 new service offerings", "Established offshore development centers"]
  }, {
    role: "Vertical Head – Training & Development",
    company: "Cat-7 Business Solutions",
    period: "2012 - 2014",
    description: "Established and managed training programs, developed curriculum for emerging technologies, and led corporate learning initiatives.",
    achievements: ["Trained 2000+ professionals", "Developed 15+ certification programs", "Established training partnerships"]
  }, {
    role: "Manager Projects",
    company: "Advait Life-Education",
    period: "2010 - 2012",
    description: "Managed educational technology projects, developed e-learning platforms, and drove innovation in educational delivery methods.",
    achievements: ["Launched 10+ edtech projects", "Implemented LMS for 50+ institutions", "Developed mobile learning solutions"]
  }, {
    role: "Sr. Training Manager",
    company: "HCL CR+",
    period: "2008 - 2010",
    description: "Led corporate training initiatives, developed technical curriculum, and managed learning and development programs for IT professionals.",
    achievements: ["Conducted 500+ training sessions", "Achieved 98% satisfaction rating", "Developed cloud computing curriculum"]
  }, {
    role: "Faculty",
    company: "Jetking Infotrain Limited",
    period: "2006 - 2008",
    description: "Started career as technical faculty, teaching networking and IT infrastructure courses, and mentoring students in technology careers.",
    achievements: ["Taught 1000+ students", "Developed hands-on lab programs", "Achieved 95% placement rate"]
  }];
  const achievements = [{
    category: "Innovation Leadership",
    points: [
      "Established 5 Centers of Excellence driving breakthrough R&D initiatives",
      "Filed 15+ patents positioning organizations at technology forefront",
      "Led cross-functional teams launching cutting-edge market solutions",
      "Fostered strategic partnerships with industry leaders and research institutions",
      "Directed transformative innovation across technology, agritech, and education sectors"
    ]
  }, {
    category: "Startup Mentorship",
    points: [
      "Mentored 100+ startups from ideation to successful scaling phases",
      "Facilitated $50M+ in funding through investor and partner connections",
      "Conducted workshops on lean methodologies and product-market fit",
      "Provided strategic guidance on business models and market entry strategies",
      "Built thriving entrepreneurial ecosystem with 80% success rate"
    ]
  }, {
    category: "Agritech Innovation",
    points: [
      "Deployed IoT-enabled solutions across 1000+ farms nationwide",
      "Achieved 40% crop yield increase through precision agriculture systems",
      "Reduced water consumption via intelligent irrigation and soil management",
      "Empowered farmers with data analytics, sensors, and automation tools",
      "Implemented comprehensive training and market linkage programs"
    ]
  }, {
    category: "Business Growth",
    points: [
      "Delivered 300% revenue increase through strategic vertical operations",
      "Expanded business presence across 8 new regional markets",
      "Led 100+ digital transformation projects with measurable ROI",
      "Built high-performing teams enabling scalable multi-market growth",
      "Established data-driven frameworks optimizing resource allocation"
    ]
  }];
  const awards = [{
    title: "Innovation Excellence Award",
    organization: "AgriTech India Forum",
    year: "2023",
    description: "For outstanding contribution to sustainable agriculture technology"
  }, {
    title: "Startup Mentor of the Year",
    organization: "Indian Startup Council",
    year: "2022",
    description: "Recognizing exceptional mentorship and startup ecosystem contribution"
  }, {
    title: "Digital Transformation Leader",
    organization: "Tech Leadership Awards",
    year: "2021",
    description: "For driving digital innovation across multiple industry verticals"
  }, {
    title: "Excellence in Education Technology",
    organization: "EdTech Association India",
    year: "2020",
    description: "For innovative contributions to educational technology advancement"
  }];
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                Ravi Rautela
              </h1>
              <div className="flex flex-wrap justify-center gap-3 text-lg md:text-2xl">
                <Badge variant="secondary" className="px-4 py-2 text-base">Visionary Leader</Badge>
                <Badge variant="secondary" className="px-4 py-2 text-base">Startup Mentor</Badge>
                <Badge variant="secondary" className="px-4 py-2 text-base">Agritech & EdTech Innovator</Badge>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Driving innovation at the intersection of technology, agriculture, and education with <span className="font-bold text-accent">25+ years</span> of transformative leadership
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {stats.map((stat, index) => {
              const Icon = stat.icon;
              const gradients = ['bg-gradient-primary', 'bg-gradient-cyber', 'bg-gradient-neon', 'from-amber-500 to-orange-600 bg-gradient-to-br'];
              return <div key={index} className={`${gradients[index]} p-5 rounded-xl text-center hover-lift hover-glow shadow-lg`}>
                    <Icon className="w-7 h-7 mx-auto mb-2 text-white" />
                    <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">{stat.value}</div>
                    <div className="text-xs text-white/90 font-medium">{stat.label}</div>
                  </div>;
            })}
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Button size="lg" className="gap-2" onClick={() => document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                <Mail className="w-5 h-5" />
                Get In Touch
              </Button>
              <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all" asChild>
                <a href="https://www.linkedin.com/in/ravi-rautela-b8a34643" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="gradient-text text-center mb-12">Transformational Leadership</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="hover-lift border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    Visionary Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    With <strong>25+ years</strong> of pioneering leadership across technology, agriculture, and education sectors, Ravi has consistently driven transformative change. His unique ability to identify emerging trends and convert them into scalable solutions has resulted in <strong>5 innovation labs</strong>, <strong>15+ patents filed</strong>, and revolutionary products that serve millions.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover-lift border-secondary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-cyber flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    Ecosystem Builder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    A catalyst for entrepreneurial success, Ravi has mentored <strong>100+ startups</strong> from ideation to unicorn trajectory, facilitating over <strong>$50M+ in funding</strong>. His mentorship extends to <strong>5000+ professionals</strong>, creating a ripple effect of innovation and leadership across industries globally.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover-lift border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-neon flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    Impact-Driven Excellence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    As <strong>Director of Innovation at MangosOrange Group</strong> and <strong>Founder & CEO of MangosOrange Agritech</strong>, Ravi delivers measurable impact: <strong>40% yield increase</strong> for 1000+ farms, <strong>99.9% uptime</strong> on 50+ cloud migrations, and sustainable solutions that balance profitability with environmental responsibility.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover-lift border-success/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-electric flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    Strategic Growth Architect
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    A proven track record of exponential growth: <strong>300% revenue increase</strong> in vertical operations, expansion into <strong>8 new markets</strong>, and orchestration of digital transformations for <strong>100+ enterprises</strong>. His strategic acumen transforms challenges into competitive advantages and sustainable business models.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            
            <blockquote className="glass-card p-8 rounded-2xl text-center">
              <p className="text-xl md:text-2xl italic text-muted-foreground mb-4 leading-relaxed">
                "True innovation emerges when technology serves humanity—bridging education, agriculture, and entrepreneurship to create sustainable ecosystems where ideas flourish and communities thrive."
              </p>
              <footer className="text-base font-semibold gradient-text">— Ravi Rautela</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="gradient-text mb-4">Core Expertise</h2>
            <p className="text-lg text-muted-foreground">
              A comprehensive skill set built through decades of hands-on experience in technology innovation, startup development, and transformational leadership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {expertise.map((item, index) => {
            const Icon = item.icon;
            return <Card key={index} className="hover-lift group">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">{item.description}</CardDescription>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Professional Journey Section - Interactive Timeline */}
      <section id="journey" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="gradient-text mb-4">Professional Journey</h2>
            <p className="text-lg text-muted-foreground">
              A progressive career spanning leadership roles across innovation, technology, agritech, and education sectors
            </p>
            <p className="text-sm text-muted-foreground mt-2 italic">
              Hover over the timeline dots to explore each role
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <CompactTimeline experiences={experiences} />
          </div>
        </div>
      </section>

      {/* Projects & Impact Section */}
      <section id="projects" className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="gradient-text mb-4">Student Success Stories</h2>
            <p className="text-lg text-muted-foreground">
              Real testimonials from students whose lives were transformed through mentorship and hands-on projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Project 1 */}
            <Card className="hover-lift group overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={projectAIAttendance} 
                  alt="AI-Powered Attendance System" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">AI-Powered Attendance System</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Smart facial recognition system that automates classroom attendance with 99% accuracy.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs">AI/ML</Badge>
                  <Badge variant="secondary" className="text-xs">Python</Badge>
                  <Badge variant="secondary" className="text-xs">Computer Vision</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="glass-card p-4 rounded-lg space-y-2 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                      AS
                    </div>
                    <div className="flex-1">
                      <p className="text-sm italic text-muted-foreground leading-relaxed">
                        "Ravi Sir's mentorship helped me build my first real AI project and boosted my confidence tremendously."
                      </p>
                      <p className="text-xs font-semibold text-foreground/80 mt-1">
                        — Aman Singh, B.Tech CS(AI), 2025 Batch
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full gap-2 group/btn">
                  View Case Study
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Project 2 */}
            <Card className="hover-lift group overflow-hidden border-secondary/20 hover:border-secondary/40 transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={projectDataScience} 
                  alt="Data Science Internship Program" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Data Science Internship Program</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Industry-aligned internship delivering hands-on experience in analytics and visualization.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs">Data Science</Badge>
                  <Badge variant="secondary" className="text-xs">Analytics</Badge>
                  <Badge variant="secondary" className="text-xs">Mentorship</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="glass-card p-4 rounded-lg space-y-2 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-cyber flex items-center justify-center text-white font-bold flex-shrink-0">
                      AS
                    </div>
                    <div className="flex-1">
                      <p className="text-sm italic text-muted-foreground leading-relaxed">
                        "The structured guidance and real-world projects transformed my understanding of data science completely."
                      </p>
                      <p className="text-xs font-semibold text-foreground/80 mt-1">
                        — Ananya S., MCA, 2024 Batch
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full gap-2 group/btn">
                  View Case Study
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Project 3 */}
            <Card className="hover-lift group overflow-hidden border-accent/20 hover:border-accent/40 transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={projectBlockchain} 
                  alt="Blockchain Supply Chain Solution" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Blockchain Supply Chain Solution</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Decentralized system for transparent and secure product tracking across supply chains.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs">Blockchain</Badge>
                  <Badge variant="secondary" className="text-xs">Web3</Badge>
                  <Badge variant="secondary" className="text-xs">Solidity</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="glass-card p-4 rounded-lg space-y-2 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center text-white font-bold flex-shrink-0">
                      RK
                    </div>
                    <div className="flex-1">
                      <p className="text-sm italic text-muted-foreground leading-relaxed">
                        "Learning blockchain under Ravi Sir's guidance opened up a whole new career path for me in Web3."
                      </p>
                      <p className="text-xs font-semibold text-foreground/80 mt-1">
                        — Rohit K., B.Tech CSE, 2025 Batch
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full gap-2 group/btn">
                  View Case Study
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Project 4 */}
            <Card className="hover-lift group overflow-hidden border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={projectIoTAgriculture} 
                  alt="IoT Smart Agriculture System" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">IoT Smart Agriculture System</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Sensor-based monitoring solution optimizing irrigation and crop management for farmers.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs">IoT</Badge>
                  <Badge variant="secondary" className="text-xs">AgriTech</Badge>
                  <Badge variant="secondary" className="text-xs">Arduino</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="glass-card p-4 rounded-lg space-y-2 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-electric flex items-center justify-center text-white font-bold flex-shrink-0">
                      NK
                    </div>
                    <div className="flex-1">
                      <p className="text-sm italic text-muted-foreground leading-relaxed">
                        "Building a real IoT solution that helps farmers was incredibly rewarding. Sir's practical approach made it possible."
                      </p>
                      <p className="text-xs font-semibold text-foreground/80 mt-1">
                        — Neha K., B.Tech ECE, 2024 Batch
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full gap-2 group/btn">
                  View Case Study
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Project 5 */}
            <Card className="hover-lift group overflow-hidden border-secondary/20 hover:border-secondary/40 transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={projectWebDev} 
                  alt="Full-Stack E-Commerce Platform" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Full-Stack E-Commerce Platform</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Modern React-based online store with payment integration and inventory management.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs">Web Dev</Badge>
                  <Badge variant="secondary" className="text-xs">React</Badge>
                  <Badge variant="secondary" className="text-xs">Node.js</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="glass-card p-4 rounded-lg space-y-2 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-cyber flex items-center justify-center text-white font-bold flex-shrink-0">
                      VM
                    </div>
                    <div className="flex-1">
                      <p className="text-sm italic text-muted-foreground leading-relaxed">
                        "From zero to deploying a full production app - this mentorship journey exceeded all my expectations."
                      </p>
                      <p className="text-xs font-semibold text-foreground/80 mt-1">
                        — Vikram M., BCA, 2025 Batch
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full gap-2 group/btn">
                  View Case Study
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Project 6 */}
            <Card className="hover-lift group overflow-hidden border-accent/20 hover:border-accent/40 transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={projectMLAnalytics} 
                  alt="ML Predictive Analytics Engine" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">ML Predictive Analytics Engine</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Machine learning model predicting customer behavior with 92% accuracy for retail insights.
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs">Machine Learning</Badge>
                  <Badge variant="secondary" className="text-xs">Python</Badge>
                  <Badge variant="secondary" className="text-xs">TensorFlow</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="glass-card p-4 rounded-lg space-y-2 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center text-white font-bold flex-shrink-0">
                      SJ
                    </div>
                    <div className="flex-1">
                      <p className="text-sm italic text-muted-foreground leading-relaxed">
                        "Sir's expertise in ML concepts and real-world applications helped me secure my dream data science internship."
                      </p>
                      <p className="text-xs font-semibold text-foreground/80 mt-1">
                        — Shreya J., M.Tech AI, 2024 Batch
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full gap-2 group/btn">
                  View Case Study
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements & Impact */}
      <section id="achievements" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="gradient-text mb-4">Achievements & Impact</h2>
            <p className="text-lg text-muted-foreground">
              Measurable contributions across innovation, mentorship, agritech advancement, and transformational leadership initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => <Card key={index} className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-xl">{achievement.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {achievement.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section id="awards" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="gradient-text mb-4">Awards & Recognition</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {awards.map((award, index) => <Card key={index} className="hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{award.title}</CardTitle>
                      <CardDescription className="font-medium text-foreground/70">{award.organization}</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-lg px-3 py-1">{award.year}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{award.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's Connect</h2>
            <p className="text-xl text-white/90">
              Ready to explore innovation opportunities, startup mentorship, or strategic partnerships?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="bg-gradient-primary border-0 hover-lift hover-glow shadow-lg">
                <CardHeader>
                  <Mail className="w-8 h-8 text-white mb-2" />
                  <CardTitle className="text-white">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:ravi@mangosorange.com" className="text-white/90 hover:text-white transition-colors font-medium">
                    ravi@mangosorange.com
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-gradient-cyber border-0 hover-lift hover-glow shadow-lg">
                <CardHeader>
                  <Phone className="w-8 h-8 text-white mb-2" />
                  <CardTitle className="text-white">Mobile</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+919910018925" className="text-white/90 hover:text-white transition-colors font-medium">
                    +91-9910018925
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-gradient-neon border-0 hover-lift hover-glow shadow-lg">
                <CardHeader>
                  <Linkedin className="w-8 h-8 text-white mb-2" />
                  <CardTitle className="text-white">LinkedIn</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="https://www.linkedin.com/in/ravi-rautela-b8a34643" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-colors font-medium">
                    Connect on LinkedIn
                  </a>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-12">
              <Button size="lg" variant="secondary" className="gap-2" asChild>
                <a href="mailto:ravi@mangosorange.com">
                  <Mail className="w-5 h-5" />
                  Send Message
                </a>
              </Button>
              <Button size="lg" className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all" asChild>
                <a href="tel:+919910018925">
                  <Phone className="w-5 h-5" />
                  Schedule Call
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Portfolio;