import { motion } from "framer-motion";

export const SoilAnimation = () => {
  return (
    <>
      {/* Ground/Soil layer with texture */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-t from-amber-950/50 via-amber-900/35 to-transparent"
          style={{
            boxShadow: "inset 0 20px 40px rgba(120, 53, 15, 0.4)",
          }}
        />
        
        {/* Soil texture pattern */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`soil-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.02, duration: 0.4 }}
            className="absolute w-2 h-2 rounded-full bg-amber-800"
            style={{
              left: `${5 + (i * 4.5)}%`,
              bottom: `${10 + Math.random() * 20}px`,
            }}
          />
        ))}
      </motion.div>

      {/* Dust particles rising */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: 0, 
            x: `${-50 + Math.random() * 100}px`,
            scale: 0 
          }}
          animate={{ 
            opacity: [0, 0.6, 0],
            y: [-20, -60, -100],
            scale: [0, 1, 0.5]
          }}
          transition={{
            duration: 1.2,
            delay: i * 0.08,
            ease: "easeOut"
          }}
          className="absolute bottom-24 left-1/2 w-2 h-2 rounded-full bg-amber-600/40"
          style={{
            filter: "blur(2px)"
          }}
        />
      ))}

      {/* Ground ripples */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ripple-${i}`}
          initial={{ 
            scale: 0, 
            opacity: 0.6 
          }}
          animate={{ 
            scale: [0, 2, 3.5],
            opacity: [0.6, 0.3, 0]
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            ease: "easeOut"
          }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full border-2 border-amber-700/40"
        />
      ))}
    </>
  );
};
