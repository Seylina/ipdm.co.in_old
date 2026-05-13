import { motion, useScroll, useTransform } from "motion/react";
import React from "react";

export function MorphingGraphics() {
  const { scrollYProgress } = useScroll();

  // Morphing paths for a fluid feeling
  const path1 = "M25,50 C25,25 50,25 50,50 C50,75 75,75 75,50 C75,25 100,25 100,50";
  const path2 = "M20,60 C20,30 40,20 60,40 C80,60 90,40 100,60 C110,80 120,60 140,40";
  const path3 = "M10,40 C30,60 50,10 70,40 C90,70 110,20 130,50 C150,80 170,30 190,60";

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [0.1, 0.3, 0.2, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden mix-blend-screen opacity-30">
      <motion.svg 
        viewBox="0 0 200 200" 
        style={{ opacity, scale, rotate }}
        className="w-[150%] h-[150%] text-primary/20"
      >
        <motion.path
          d={path1}
          animate={{
            d: [path1, path2, path3, path1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <motion.path
          d={path2}
          animate={{
            d: [path2, path3, path1, path2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Secondary Morphing Layer */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[100%] h-[100%] bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.1),transparent_60%)]"
      />
    </div>
  );
}
