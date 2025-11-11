import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { RoleWithJD } from "@/data/domains";

interface RolesWithJDsProps {
  roles: RoleWithJD[];
  icon: string;
  color: string;
  delay?: number;
}

export const RolesWithJDs = ({ roles, icon, color, delay = 0 }: RolesWithJDsProps) => {
  const [expandedRoles, setExpandedRoles] = useState<Set<number>>(new Set());

  const toggleRole = (index: number) => {
    setExpandedRoles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.5, duration: 0.6 }}
      className="glass-morphism rounded-2xl p-8 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.span
          animate={{
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="text-3xl"
        >
          {icon}
        </motion.span>
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
            Roles and JD (Job Descriptions)
          </h3>
          <p className="text-sm text-muted-foreground">
            Key roles with detailed job descriptions
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {roles.map((role, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.5 + index * 0.1 }}
            className="bg-background/40 backdrop-blur-sm rounded-lg border border-white/5 overflow-hidden hover:border-primary/30 transition-colors"
          >
            <button
              onClick={() => toggleRole(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">🌱</span>
                <span className="font-medium text-foreground">{role.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRole(index);
                  }}
                >
                  JD
                </span>
                <motion.div
                  animate={{ rotate: expandedRoles.has(index) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </div>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: expandedRoles.has(index) ? "auto" : 0,
                opacity: expandedRoles.has(index) ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-2">
                <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {role.jd}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
