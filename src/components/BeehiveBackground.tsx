import { motion, useScroll, useTransform, useSpring } from "motion/react";
import React, { useRef } from "react";

export function BeehiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const hexagons = [...Array(16)];

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden h-full">
      <div className="sticky top-0 w-full h-screen">
        <div className="relative w-full h-full">
          {hexagons.map((_, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            const x = col * 25 + (row % 2 === 0 ? 0 : 8);
            const y = row * 20;
            
            // Random behavior for each hex
            const delay = Math.random() * 2;
            const rotateStart = Math.random() * 360;
            
            // Parallax and interactions
            const opacity = useTransform(
              scrollYProgress, 
              [0, 0.4, 0.8, 1], 
              [0.03, 0.1, 0.05, 0]
            );
            
            const scale = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.9, 1.05, 0.9]
            );

            // Energy Pulse Logic
            const isPulse = i % 5 === 0;

            return (
              <motion.div
                key={i}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  opacity,
                  scale,
                }}
                animate={{
                  rotate: [rotateStart, rotateStart + 30],
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay
                }}
                className="absolute w-48 h-56 md:w-64 md:h-72"
              >
                <svg viewBox="0 0 100 115" className={`w-full h-full fill-none ${isPulse ? 'stroke-primary/30 stroke-[0.3]' : 'stroke-primary/10 stroke-[0.2]'}`}>
                  <path d="M50 0 L100 28.8 L100 86.2 L50 115 L0 86.2 L0 28.8 Z" />
                </svg>
              </motion.div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
