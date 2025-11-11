import { Button } from "@/components/ui/button";
import { Award, BookOpen, GraduationCap, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import sirPortrait from "@/assets/sir-portrait.jpg";

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={sirPortrait}
                alt="Sir's Portrait"
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
              />
            </div>
            <div className="absolute top-10 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="gradient-text">About Ravi Rautela</h2>
              <p className="text-lg text-muted-foreground">
                With over 25 years of distinguished experience spanning education, technology, startups, 
                and agritech innovation, Ravi Rautela stands as a visionary leader who transforms ideas 
                into impactful realities.
              </p>
              <p className="text-lg text-muted-foreground">
                Currently serving as <strong>Director – Innovation at MangosOrange Group</strong> and{" "}
                <strong>Founder & CEO of MangosOrange Agritech India Pvt. Ltd.</strong>, Ravi bridges 
                the gap between cutting-edge technology and sustainable agricultural practices.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 glass-card p-4 rounded-lg hover-lift">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Innovation Leader</h4>
                  <p className="text-sm text-muted-foreground">
                    Director of Innovation at MangosOrange Group, driving strategic technology adoption
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 glass-card p-4 rounded-lg hover-lift">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Agritech Pioneer</h4>
                  <p className="text-sm text-muted-foreground">
                    Founded MangosOrange Agritech, deploying solutions across 1000+ farms
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 glass-card p-4 rounded-lg hover-lift">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Startup Mentor</h4>
                  <p className="text-sm text-muted-foreground">
                    100+ startups mentored across ideation, funding, and scaling phases
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="rounded-full" asChild>
                  <a href="https://www.linkedin.com/in/ravi-rautela-b8a34643" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-gradient-primary hover:shadow-primary">
                  Request Mentorship
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/portfolio">View Full Portfolio</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
