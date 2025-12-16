import { motion } from "framer-motion";
import { Domain } from "@/data/domains";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import sproutImage from "@/assets/sprout-seed.png";
import { useIsMobile } from "@/hooks/use-mobile";
interface DomainNodeProps {
  domain: Domain;
  isSelected: boolean;
  isHidden: boolean;
  onClick: () => void;
  onHoverChange?: (isHovered: boolean) => void;
  zIndex?: number;
}

// Photorealistic nut styling with advanced textures and lighting
const getNutStyle = (domainId: string) => {
  const nutStyles = {
    ai: {
      // Almond - elongated, smooth with realistic gradient
      shape: "50% 50% 50% 50% / 68% 68% 32% 32%",
      gradient: `
        radial-gradient(ellipse at 30% 20%, #E8C7A0 0%, transparent 50%),
        radial-gradient(ellipse at 70% 80%, #7D5E3F 0%, transparent 40%),
        linear-gradient(145deg, #D4A574 0%, #C39564 15%, #B8956A 30%, #A88556 45%, #9D7E5A 60%, #8F6F4A 75%, #8B6F47 90%, #7A5D3D 100%)
      `,
      shadow: `
        0 15px 35px rgba(100, 80, 50, 0.5),
        0 8px 16px rgba(139, 111, 71, 0.4),
        inset -5px -8px 15px rgba(70, 50, 35, 0.7),
        inset 4px 6px 12px rgba(230, 200, 160, 0.6),
        inset 0 -3px 8px rgba(100, 80, 60, 0.5)
      `,
      accent: "#D4A574",
      width: "95px",
      height: "135px",
      texturePattern: "linear-gradient(90deg, transparent 48%, rgba(0,0,0,0.03) 49%, rgba(0,0,0,0.03) 51%, transparent 52%)",
    },
    webdev: {
      // Hazelnut - perfectly round with shell texture
      shape: "50%",
      gradient: `
        radial-gradient(circle at 25% 25%, #C67D4A 0%, transparent 45%),
        radial-gradient(circle at 75% 75%, #3A1D0F 0%, transparent 35%),
        linear-gradient(135deg, #A0522D 0%, #944B28 20%, #8B4513 35%, #7A3C10 50%, #6B3410 65%, #5A2B0D 80%, #4A2410 100%)
      `,
      shadow: `
        0 15px 35px rgba(74, 36, 16, 0.6),
        0 8px 20px rgba(138, 69, 19, 0.5),
        inset -6px -6px 18px rgba(40, 20, 10, 0.8),
        inset 5px 5px 14px rgba(180, 100, 60, 0.5),
        inset 0 0 30px rgba(100, 50, 25, 0.3)
      `,
      accent: "#A0522D",
      width: "118px",
      height: "118px",
      texturePattern: `
        repeating-conic-gradient(from 0deg at 50% 50%, 
          transparent 0deg, transparent 5deg,
          rgba(0,0,0,0.05) 5deg, rgba(0,0,0,0.05) 10deg
        )
      `,
    },
    datascience: {
      // Cashew - curved kidney shape with smooth surface
      shape: "58% 42% 35% 65% / 48% 68% 32% 52%",
      gradient: `
        radial-gradient(ellipse at 35% 25%, #FFF8E8 0%, transparent 40%),
        radial-gradient(ellipse at 65% 75%, #B89F70 0%, transparent 45%),
        linear-gradient(125deg, #F5DEB3 0%, #EED9A8 20%, #E8D4A0 35%, #DECA92 50%, #D4C59E 60%, #CABF90 75%, #C4B088 90%, #B5A078 100%)
      `,
      shadow: `
        0 12px 30px rgba(180, 160, 120, 0.45),
        0 6px 16px rgba(196, 176, 136, 0.4),
        inset -4px -6px 14px rgba(160, 140, 100, 0.6),
        inset 4px 5px 12px rgba(255, 240, 210, 0.7),
        inset 0 -2px 6px rgba(180, 160, 120, 0.4)
      `,
      accent: "#F5DEB3",
      width: "105px",
      height: "122px",
      texturePattern: "linear-gradient(155deg, transparent 48%, rgba(0,0,0,0.02) 50%, transparent 52%)",
    },
    cybersecurity: {
      // Peanut - netted shell texture, oval with dimple
      shape: "50% 50% 50% 50% / 64% 64% 36% 36%",
      gradient: `
        radial-gradient(ellipse at 28% 22%, #E8D4B8 0%, transparent 35%),
        radial-gradient(ellipse at 50% 85%, #5A4530 0%, transparent 30%),
        radial-gradient(ellipse at 72% 45%, #8B7355 0%, transparent 25%),
        linear-gradient(140deg, #D2B48C 0%, #C9AA7E 15%, #BC9F6A 28%, #B29560 42%, #A68A5A 55%, #9A7F52 68%, #8B7355 80%, #7A6548 90%, #6B5742 100%)
      `,
      shadow: `
        0 14px 32px rgba(90, 70, 50, 0.55),
        0 7px 18px rgba(107, 87, 66, 0.45),
        inset -5px -7px 16px rgba(75, 55, 40, 0.75),
        inset 4px 5px 13px rgba(220, 190, 150, 0.6),
        inset 0 0 25px rgba(120, 95, 70, 0.3)
      `,
      accent: "#D2B48C",
      width: "100px",
      height: "142px",
      texturePattern: `
        repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px),
        repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)
      `,
    },
    cloud: {
      // Pistachio - split shell with green tint
      shape: "52% 48% 48% 52% / 58% 58% 42% 42%",
      gradient: `
        radial-gradient(ellipse at 30% 25%, #DEE8C8 0%, transparent 40%),
        radial-gradient(ellipse at 70% 70%, #6B7A50 0%, transparent 35%),
        linear-gradient(130deg, #C9D1A8 0%, #BFC89E 18%, #B4C088 32%, #AAB87E 46%, #9CAE6F 58%, #92A565 70%, #859560 82%, #7A8A58 92%, #708050 100%)
      `,
      shadow: `
        0 13px 32px rgba(110, 125, 80, 0.5),
        0 7px 18px rgba(133, 149, 96, 0.4),
        inset -5px -7px 15px rgba(90, 100, 65, 0.7),
        inset 4px 5px 13px rgba(220, 230, 190, 0.6),
        inset 0 -2px 8px rgba(110, 125, 80, 0.4)
      `,
      accent: "#C9D1A8",
      width: "112px",
      height: "128px",
      texturePattern: `
        linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.05) 50%, transparent 70%),
        repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 3px)
      `,
    },
    blockchain: {
      // Walnut - heavily textured brain-like surface
      shape: "50%",
      gradient: `
        radial-gradient(circle at 28% 22%, #A68A6A 0%, transparent 35%),
        radial-gradient(circle at 72% 78%, #2A1F15 0%, transparent 30%),
        radial-gradient(circle at 50% 50%, #6B5742 0%, transparent 60%),
        linear-gradient(135deg, #8B6F47 0%, #7F6540 15%, #6B5742 30%, #5F4F38 45%, #5A4632 60%, #4F3E2A 75%, #4A3620 90%, #3A2818 100%)
      `,
      shadow: `
        0 16px 38px rgba(50, 35, 20, 0.65),
        0 8px 22px rgba(74, 54, 32, 0.55),
        inset -6px -8px 20px rgba(35, 25, 15, 0.85),
        inset 5px 6px 15px rgba(150, 120, 80, 0.5),
        inset 0 0 35px rgba(80, 60, 40, 0.4)
      `,
      accent: "#8B6F47",
      width: "122px",
      height: "122px",
      texturePattern: `
        repeating-radial-gradient(circle at 50% 50%, 
          transparent 0px, transparent 8px,
          rgba(0,0,0,0.12) 8px, rgba(0,0,0,0.12) 10px
        )
      `,
    },
  };
  return nutStyles[domainId as keyof typeof nutStyles] || nutStyles.ai;
};

export const DomainNode = ({ 
  domain, 
  isSelected, 
  isHidden, 
  onClick, 
  onHoverChange,
  zIndex = 10 
}: DomainNodeProps) => {
  const nutStyle = getNutStyle(domain.id);
  const floatDelay = Math.random() * 3;
  const isMobile = useIsMobile();
  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => onHoverChange?.(true)}
      onHoverEnd={() => onHoverChange?.(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isHidden ? 0 : 1,
        scale: isHidden ? 0.5 : isSelected ? 1.1 : 1,
      }}
      whileHover={{
        scale: isHidden ? 0.5 : 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className={`
        absolute cursor-pointer max-w-[120px]
        ${isHidden ? "pointer-events-none" : ""}
      `}
      style={{
        left: isMobile ? `calc(${domain.position.x}% - 15%)` : `${domain.position.x}%`,
        top: `${domain.position.y}%`,
        zIndex,
        willChange: "transform, opacity",
        transform: "translateX(-50%)", // Center the node on its position
      }}
    >
        {/* Nut Container with optimized floating animation */}
        <motion.div 
          className="relative group"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay,
          }}
        >
          {/* Optimized ground shadow */}
          <motion.div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full blur-xl"
            style={{
              background: "radial-gradient(ellipse, rgba(0,0,0,0.3), transparent 65%)",
              width: nutStyle.width,
              height: "20px",
              willChange: "transform, opacity",
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.3, 0.25],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: floatDelay,
            }}
          />

          {/* Hover glow ring - hidden on mobile for performance */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
            style={{
              background: `radial-gradient(circle, ${nutStyle.accent}40, transparent 65%)`,
              filter: "blur(20px)",
              borderRadius: nutStyle.shape,
              width: nutStyle.width,
              height: nutStyle.height,
              willChange: "transform, opacity",
            }}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Optimized sparkle particles - reduced for mobile performance */}
          <motion.div className="absolute inset-0 pointer-events-none hidden md:block">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-lg opacity-40"
                style={{
                  left: `${30 + i * 20}%`,
                  top: `${20 + i * 20}%`,
                  willChange: "transform, opacity",
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5 + floatDelay,
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>

          {/* Optimized orbiting leaves - fewer for performance */}
          <motion.div
            className="absolute inset-0 pointer-events-none hidden md:block"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: isSelected ? 12 : 24,
              ease: "linear",
            }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`orbit-leaf-${i}`}
                className="absolute text-lg"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${i * 90}deg) translate(${parseInt(nutStyle.width) + 25}px) rotate(-${i * 90}deg)`,
                  willChange: "transform, opacity",
                }}
                animate={{
                  opacity: isSelected ? [0.3, 0.5, 0.3] : [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              >
                🌿
              </motion.div>
            ))}
          </motion.div>

          {/* Active/Selected pulsing ring - optimized */}
          {isSelected && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle, transparent 50%, ${nutStyle.accent}50, transparent)`,
                filter: "blur(20px)",
                borderRadius: nutStyle.shape,
                width: nutStyle.width,
                height: nutStyle.height,
                willChange: "transform, opacity",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Germination sprout on click */}
          {isSelected && (
            <motion.div
              className="absolute -top-6 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: 10, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1],
                y: [10, -10, -10],
                scale: [0, 1, 1],
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              <div className="text-3xl">🌱</div>
            </motion.div>
          )}

          {/* Sprout Image - replacing nut styling */}
          <div className="flex flex-col items-center gap-2 right-0">
            <motion.div
              className="relative flex items-center justify-center"
              style={{
                width: "min(90px, 16vw)",
                height: "min(90px, 16vw)",
              }}
              whileHover={{
                scale: 1.05,
              }}
              animate={isSelected ? {
                scale: [1, 1.08, 1],
              } : {}}
              transition={isSelected ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              } : {}}
            >
              {/* Sprout Image removed */}
            </motion.div>

            {/* Domain info below the seed */}
            <motion.div 
              className="flex items-center gap-1 md:gap-2"
              whileHover={{ 
                scale: 1.05,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div 
                className="text-lg md:text-2xl" 
                style={{ 
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              >
                {domain.icon}
              </div>
              
              {/* Domain name */}
              <div className="text-[10px] md:text-sm font-bold text-foreground whitespace-nowrap">
                {domain.name}
              </div>
            </motion.div>
          </div>

          {/* Enhanced hover tooltip - hidden on mobile for performance */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            whileHover={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute -top-24 left-1/2 transform -translate-x-1/2 whitespace-nowrap pointer-events-none z-50 hidden md:block"
          >
            <motion.div 
              className="relative px-5 py-3 rounded-2xl backdrop-blur-lg shadow-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.97), rgba(250,250,250,0.95))",
                boxShadow: `0 10px 40px rgba(0,0,0,0.15)`,
                willChange: "transform",
              }}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{domain.icon}</span>
                <div>
                  <div className="text-sm font-bold text-foreground/95">{domain.name}</div>
                  <div className="text-[11px] text-foreground/70">{domain.tagline}</div>
                </div>
              </div>
              <div 
                className="text-[11px] mt-2 font-semibold flex items-center gap-1" 
                style={{ color: nutStyle.accent }}
              >
                <span>🌱</span> Tap to grow your tree
              </div>
              
              {/* Tooltip arrow */}
              <div 
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                style={{
                  background: "rgba(250,250,250,0.95)",
                  borderRight: `1px solid ${nutStyle.accent}50`,
                  borderBottom: `1px solid ${nutStyle.accent}50`,
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
    </motion.div>
  );
};
