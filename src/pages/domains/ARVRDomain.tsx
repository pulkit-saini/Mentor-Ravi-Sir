import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedBackground } from "@/components/learning-tree/AnimatedBackground";
import { ExpandedTreeView } from "@/components/learning-tree/ExpandedTreeView";
import { domains } from "@/data/domains";

const ARVRDomain = () => {
  const domain = domains.find(d => d.id === "arvr")!;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      <section className="relative pt-24 pb-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <Button variant="ghost" size="sm" asChild>
              <Link to="/learning-path">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Seeds
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-4">{domain.icon}</div>
            <h1 className="text-5xl font-bold mb-4">
              <span className="gradient-text">{domain.name}</span>
            </h1>
            <p className="text-xl text-muted-foreground">{domain.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Tree View */}
      <section className="relative py-8">
        <div className="container mx-auto px-4">
          <ExpandedTreeView domain={domain} onBack={() => {}} hideBackButton />
        </div>
      </section>
    </div>
  );
};

export default ARVRDomain;
