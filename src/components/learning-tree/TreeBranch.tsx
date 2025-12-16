import { motion } from "framer-motion";

interface TreeBranchProps {
  label: string;
  items: string[];
  icon: string;
  delay: number;
  color: string;
}

export const TreeBranch = ({ label, items, icon, delay, color }: TreeBranchProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="relative"
    >
      {/* Organic curved branch connector */}
      <svg
        className="absolute left-8 pointer-events-none"
        style={{ top: "-80px", width: "100px", height: "100px" }}
      >
        <motion.path
          d="M 50 0 Q 30 30, 20 80"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
        />
        
        {/* Small branch offshoots */}
        {[...Array(3)].map((_, i) => (
          <motion.line
            key={i}
            x1={50 - i * 10}
            y1={20 + i * 20}
            x2={30 - i * 10}
            y2={10 + i * 20}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ delay: delay + 0.4 + i * 0.1, duration: 0.5 }}
          />
        ))}
      </svg>

      {/* Branch Header with cloud-like background */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 0.5, type: "spring", stiffness: 150 }}
        className="relative inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full glass-card"
      >
        <motion.span
          animate={{ 
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-3xl"
        >
          {icon}
        </motion.span>
        <h3
          className="text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
          style={{ backgroundImage: `linear-gradient(to right, ${color})` }}
        >
          {label}
        </h3>
      </motion.div>

      {/* Items Grid - Cloud-like info nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: delay + 0.6 + index * 0.15,
              duration: 0.6,
              type: "spring",
              stiffness: 150,
            }}
            whileHover={{
              scale: 1.08,
              y: -8,
              transition: { duration: 0.3, type: "spring", stiffness: 300 }
            }}
            className="relative group"
          >
            {/* Stem connecting to cloud */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: delay + 0.5 + index * 0.15, duration: 0.4 }}
              className="absolute left-1/2 -translate-x-1/2 w-1 origin-top rounded-full"
              style={{
                top: "-30px",
                height: "30px",
                background: `linear-gradient(to bottom, ${color}, transparent)`,
              }}
            />

            {/* Floating leaves around cloud */}
            {[...Array(3)].map((_, leafIndex) => (
              <motion.div
                key={leafIndex}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.6, 0.6, 0],
                  scale: [0, 1, 1, 0],
                  x: [0, (leafIndex - 1) * 20, (leafIndex - 1) * 40],
                  y: [0, -20, -40],
                }}
                transition={{
                  delay: delay + 1 + index * 0.15 + leafIndex * 0.5,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="absolute top-0 left-1/2 text-lg pointer-events-none"
                style={{
                  left: `${50 + (leafIndex - 1) * 5}%`,
                }}
              >
                🍃
              </motion.div>
            ))}

            {/* Cloud-shaped info bubble */}
            <motion.div
              className="relative px-6 py-4 rounded-3xl overflow-hidden glass-card"
              style={{
                boxShadow: `0 8px 32px hsl(var(--primary) / 0.15), 0 0 0 1px hsl(var(--primary) / 0.1) inset`,
              }}
            >
              {/* Sparkle effect on hover */}
              <motion.div
                className="absolute top-2 right-2 text-xs opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                ✨
              </motion.div>

              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, hsl(var(--primary) / 0.15), transparent 70%)`,
                }}
              />
              
              <p className="relative z-10 text-sm font-medium leading-relaxed">{item}</p>
              
              {/* Leaf accent */}
              <motion.div
                className="absolute -bottom-1 -right-1 text-2xl opacity-30 group-hover:opacity-60 transition-opacity"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                🌿
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
