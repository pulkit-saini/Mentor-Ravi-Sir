import { motion } from "framer-motion";
import { Domain } from "@/data/domains";
import { TreeBranch } from "./TreeBranch";
import { RolesWithJDs } from "./RolesWithJDs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { SoilAnimation } from "./SoilAnimation";

interface ExpandedTreeViewProps {
  domain: Domain;
  onBack: () => void;
  hideBackButton?: boolean;
}

export const ExpandedTreeView = ({ domain, onBack, hideBackButton = false }: ExpandedTreeViewProps) => {
  return (
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={hideBackButton ? "relative" : "fixed inset-0 z-50 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"}
    >
      {/* Dimmed background */}
      {!hideBackButton && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/95 backdrop-blur-md"
          onClick={onBack}
        />
      )}

      {/* Content */}
      <div className={hideBackButton ? "relative" : "relative z-10 container mx-auto px-4 py-20"}>
        {/* Soil Animation */}
        <SoilAnimation />

        {/* Seed dropping animation */}
        <motion.div
          initial={{ y: -100, scale: 1, opacity: 1 }}
          animate={{ 
            y: [0, window.innerHeight - 200],
            scale: [1, 0.8, 0.6],
            opacity: [1, 1, 0]
          }}
          transition={{ 
            duration: 1.2,
            ease: "easeIn",
            times: [0, 0.7, 1]
          }}
          className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl z-20"
        >
          {domain.icon}
        </motion.div>

        {/* Growing roots effect - underground */}
        <motion.div
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-t from-amber-800/60 via-amber-700/40 to-transparent"
          initial={{ height: 0 }}
          animate={{ height: "120px" }}
          transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
        />

        {/* Root tendrils spreading */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`root-${i}`}
            className="absolute bottom-16 left-1/2 origin-top"
            initial={{ 
              scaleY: 0, 
              opacity: 0,
              rotate: -60 + (i * 24)
            }}
            animate={{ 
              scaleY: 1, 
              opacity: 0.5,
              rotate: -60 + (i * 24)
            }}
            transition={{ 
              delay: 1.3 + (i * 0.1), 
              duration: 0.8,
              ease: "easeOut"
            }}
            style={{
              width: "2px",
              height: "60px",
              background: "linear-gradient(to bottom, rgba(146, 64, 14, 0.6), transparent)",
              transformOrigin: "top center"
            }}
          />
        ))}

        {/* Back button */}
        {!hideBackButton && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button
              variant="outline"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Seeds 🌱
            </Button>
          </motion.div>
        )}

        {/* Domain Header - The Grown Tree */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 80, damping: 12 }}
          className="text-center mb-16 relative"
        >
          {/* Main tree trunk - growing from soil */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 origin-bottom"
            initial={{ height: 0, width: 16, bottom: "-60px" }}
            animate={{ height: "280px", width: 16, bottom: "-60px" }}
            transition={{ delay: 1.8, duration: 1.8, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              background: "linear-gradient(to top, #92400e 0%, #78350f 40%, #654321 70%, #8B4513 100%)",
              boxShadow: "inset 3px 0 8px rgba(0,0,0,0.4), inset -3px 0 8px rgba(0,0,0,0.4), 0 0 20px rgba(146,64,14,0.3)",
              borderRadius: "8px 8px 0 0",
            }}
          />

          {/* Secondary branches from trunk */}
          {[
            { angle: -45, length: 120, delay: 2.2, left: "calc(50% - 8px)" },
            { angle: 35, length: 100, delay: 2.4, left: "calc(50% + 8px)" },
            { angle: -55, length: 80, delay: 2.6, left: "calc(50% - 8px)" },
            { angle: 40, length: 110, delay: 2.5, left: "calc(50% + 8px)" },
          ].map((branch, i) => (
            <motion.div
              key={`branch-${i}`}
              className="absolute origin-bottom"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: branch.delay, duration: 0.8, ease: "easeOut" }}
              style={{
                left: branch.left,
                bottom: `${20 + (i * 50)}px`,
                width: "8px",
                height: `${branch.length}px`,
                background: "linear-gradient(to top, #78350f, #654321)",
                boxShadow: "inset 2px 0 4px rgba(0,0,0,0.3), inset -2px 0 4px rgba(0,0,0,0.3)",
                borderRadius: "4px 4px 0 0",
                transform: `rotate(${branch.angle}deg)`,
                transformOrigin: "bottom center",
              }}
            />
          ))}

          {/* Trunk texture lines */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`texture-${i}`}
              className="absolute left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.4, scaleX: 1 }}
              transition={{ delay: 2.2 + (i * 0.08), duration: 0.3 }}
              style={{
                width: "18px",
                height: "2px",
                background: "#451a03",
                bottom: `${-40 + (i * 30)}px`,
                borderRadius: "2px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.2)"
              }}
            />
          ))}

          {/* Tree crown / foliage */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.5, type: "spring", stiffness: 100 }}
            className="relative inline-block"
          >
            <div className="text-8xl mb-6 relative z-10">{domain.icon}</div>
            <motion.div
              className="absolute inset-0 blur-3xl"
              style={{ background: `radial-gradient(circle, ${domain.glowColor}, transparent 70%)` }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
            
            {/* Leaves falling animation */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`leaf-${i}`}
                initial={{ 
                  opacity: 0,
                  y: 0,
                  x: 0,
                  rotate: 0
                }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  y: [0, 100, 200],
                  x: [0, (i % 2 === 0 ? 30 : -30), (i % 2 === 0 ? 60 : -60)],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4,
                  delay: 3 + (i * 0.3),
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute top-0 left-1/2 text-2xl"
                style={{
                  left: `${50 + (i % 2 === 0 ? 10 : -10)}%`
                }}
              >
                🍃
              </motion.div>
            ))}
          </motion.div>

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right, ${domain.color})` }}>
            {domain.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {domain.description}
          </p>

          {/* Growth indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm text-primary/70 flex items-center justify-center gap-2"
          >
            <span>Your seed has grown</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🌿
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Tree Structure */}
        <div className="max-w-6xl mx-auto space-y-12">
          <RolesWithJDs
            roles={domain.rolesWithJDs}
            icon="👔"
            color={domain.color}
            delay={3}
          />

          <TreeBranch
            label="Required Skills"
            items={domain.skills}
            icon="💡"
            delay={3.3}
            color={domain.color}
          />

          <TreeBranch
            label="Essential Tools"
            items={domain.tools}
            icon="🛠️"
            delay={3.6}
            color={domain.color}
          />

          <TreeBranch
            label="Career Roles"
            items={domain.roles}
            icon="🎯"
            delay={3.9}
            color={domain.color}
          />

          {/* Salary Information Branch */}
          <TreeBranch
            label="Average Salary"
            items={[
              `Fresher: ${domain.salary.fresher}`,
              `Experienced: ${domain.salary.experienced}`
            ]}
            icon="💰"
            delay={4.2}
            color={domain.color}
          />

          {/* Market Demand Branch */}
          <TreeBranch
            label="Market Demand"
            items={[domain.marketDemand]}
            icon="📈"
            delay={4.5}
            color={domain.color}
          />

          {/* Career Growth Branch */}
          <TreeBranch
            label="Career Growth"
            items={[domain.careerGrowth]}
            icon="🚀"
            delay={4.8}
            color={domain.color}
          />

          {domain.projects && domain.projects.length > 0 && (
            <TreeBranch
              label="Real Projects"
              items={domain.projects}
              icon="🚀"
              delay={1.0}
              color={domain.color}
            />
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-primary hover:shadow-primary group"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Join This Path
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Start your journey branch by branch 🌱
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
