import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Compass, Brain, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";

export const PathFinderCTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8 md:p-12 text-center border border-primary/20"
        >
          <div className="flex justify-center mb-4">
            <Compass className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take our PathFinder quiz to discover the perfect tech domain based on your interests and skills.
          </p>
          <Button
            size="lg"
            // onClick={() => navigate('/discover-yourself')}
            className="group"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Discover Your Path
          </Button>
        </motion.div>
      </div>
    </section>
  );
};