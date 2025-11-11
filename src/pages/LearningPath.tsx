import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DomainNode } from "@/components/learning-tree/DomainNode";
import { AnimatedBackground } from "@/components/learning-tree/AnimatedBackground";
import { TimelineTree } from "@/components/learning-tree/TimelineTree";
import { domains, Domain } from "@/data/domains";
import { Sparkles } from "lucide-react";
import { PathFinderCTA } from "@/components/PathFinderCTA";
const LearningPathPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null);
  const [fromPage, setFromPage] = useState<string>("learning-path");

  // Auto-select domain from URL parameters
  useEffect(() => {
    const domainId = searchParams.get("domain");
    const from = searchParams.get("from");
    if (domainId) {
      const domain = domains.find(d => d.id === domainId);
      if (domain) {
        setSelectedDomain(domain);
        setFromPage(from || "learning-path");
      }
    }
  }, [searchParams]);
  const handleDomainClick = (domain: Domain) => {
    setSelectedDomain(domain);
    setFromPage("learning-path");
  };
  const handleBack = () => {
    setSelectedDomain(null);

    // Navigate back based on where the user came from
    if (fromPage === "home") {
      navigate("/#explore");
    } else {
      // Just clear the selection, stay on learning-path
      const newSearchParams = new URLSearchParams();
      navigate(`/learning-path?${newSearchParams.toString()}`, {
        replace: true
      });
    }
  };
  const getZIndex = (domainId: string) => {
    if (hoveredDomainId === domainId) return 40;
    return 10;
  };
  return <div className="min-h-screen relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {selectedDomain ? <TimelineTree key="timeline-tree" domain={selectedDomain} onBack={handleBack} /> : <motion.div key="garden-view" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="min-h-screen overflow-x-hidden">
            <AnimatedBackground />
            <Navigation />

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col justify-end pb-4 overflow-hidden w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center max-w-full">
          <motion.div initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8
            }} className="max-w-5xl mx-auto text-center space-y-8 pt-20">
            {/* Micro tagline badge */}
            

            {/* Main title */}
            <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4,
                duration: 0.8
              }} className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight pt-8 md:pt-12 px-4">
                <span className="bg-gradient-to-r from-primary via-success to-secondary bg-clip-text text-transparent py-0 my-0">Choose Your Learning Path</span>
              </h1>
            </motion.div>

            {/* Subtitle with inspiring copy */}
            <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.6,
                duration: 0.8
              }} className="space-y-4 max-w-3xl mx-auto px-4">
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-foreground/90">
                Every dream starts as a seed. Choose yours and let it grow into something extraordinary.
              </p>
              
              <motion.div initial={{
                  opacity: 0,
                  scale: 0.95
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  delay: 0.8
                }} className="inline-block px-6 py-3 bg-white/40 dark:bg-card/40 backdrop-blur-sm rounded-2xl border border-success/20">
                <p className="text-base md:text-lg text-muted-foreground flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  Find your seed of curiosity — your future is waiting to bloom
                </p>
              </motion.div>
            </motion.div>


            {/* Scroll indicator */}
            <motion.div initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 1.3
              }} className="pt-8 pb-4">
              <motion.div animate={{
                  y: [0, 8, 0]
                }} transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }} className="inline-flex flex-col items-center gap-2 text-muted-foreground">
                <span className="text-sm font-medium">Scroll down to explore</span>
                <motion.div animate={{
                    opacity: [0.4, 1, 0.4]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity
                  }} className="w-6 h-10 rounded-full border-2 border-current/50 flex items-start justify-center p-2">
                  <motion.div animate={{
                      y: [0, 12, 0]
                    }} transition={{
                      duration: 2,
                      repeat: Infinity
                    }} className="w-1.5 h-1.5 rounded-full bg-current" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

      </section>

            {/* Domain Explorer */}
            <section className="relative min-h-[800px] md:min-h-[1000px] pt-8 pb-20 w-full overflow-hidden">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
                <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} className="relative w-full h-[600px] md:h-[800px] max-w-full">
                  {domains.map(domain => <DomainNode key={domain.id} domain={domain} isSelected={false} isHidden={false} onClick={() => handleDomainClick(domain)} onHoverChange={isHovered => setHoveredDomainId(isHovered ? domain.id : null)} zIndex={getZIndex(domain.id)} />)}
                </motion.div>
              </div>
            </section>

            {/* PathFinder CTA Section */}
            <PathFinderCTA />

            <Footer />
          </motion.div>}
      </AnimatePresence>
    </div>;
};
export default LearningPathPage;