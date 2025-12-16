import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
const Hero = () => {
  const scrollToExplore = () => {
    const exploreSection = document.getElementById('explore');
    exploreSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-10 md:left-20 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 md:right-20 w-64 h-64 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{
      animationDelay: "1s"
    }} />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center max-w-6xl flex-1 flex flex-col justify-center pt-16 md:pt-20">
        <div className="space-y-6 md:space-y-8 animate-fade-in-up">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight sm:leading-tight md:leading-tight px-2 sm:px-4">
            <span className="text-foreground">Welcome to </span>
            <span className="text-primary">Ravi Rautela</span>
            <span className="text-accent">'s</span>
            <span className="text-foreground"> Mentorship Hub</span>
          </h1>
          
          {/* Subtitle */}
          <div className="space-y-3 md:space-y-4 max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
              Learn. Grow. Evolve.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-4">
              Discover your strengths, refine your skills, and build the future you dream of — together with Ravi Rautela.
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex justify-center items-center mt-6 md:mt-8 px-4 max-w-md mx-auto">
            <Button size="lg" onClick={scrollToExplore} className="w-full px-8 md:px-10 py-6 md:py-7 text-lg md:text-xl rounded-full gap-2">
              Choose Your Interest
              <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;