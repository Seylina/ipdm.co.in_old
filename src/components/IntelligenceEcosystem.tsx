import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import React, { useMemo, useEffect } from "react";
import { useTheme } from "../lib/ThemeContext";

export function IntelligenceEcosystem() {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  
  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax effects for different layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.5, 0]);

  // Parallax for mouse
  const mouseMoveX = useTransform(smoothMouseX, [0, 2000], [-30, 30]);
  const mouseMoveY = useTransform(smoothMouseY, [0, 1200], [-30, 30]);

  // Generate stable random nodes
  const nodes = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 8,
      depth: 0.5 + Math.random() * 1.5
    }));
  }, []);

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden select-none transition-colors duration-1000 ${theme === 'dark' ? 'bg-black' : 'bg-[#f1f5f9]'}`}>
      {/* Premium Background Gradient */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        theme === 'dark' 
        ? 'bg-gradient-to-br from-black via-[#041d24] to-black opacity-100' 
        : 'bg-gradient-to-br from-slate-100 via-cyan-50/50 to-blue-50/30 opacity-100'
      }`} />
      
      {/* HUD Grid Overlay */}
      <div className={`absolute inset-0 bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)] transition-colors duration-1000 ${
        theme === 'dark'
        ? 'bg-[linear-gradient(to_right,rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.03)_1px,transparent_1px)]'
        : 'bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.02)_1px,transparent_1px)]'
      }`} />
      
      {/* Hexagonal Pattern - Very subtle */}
      <div 
        className="absolute inset-0 opacity-[0.02] transition-opacity duration-1000" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 69.28 0 51.96V17.32L30 0zM0 104l30-17.32 30 17.32M30 69.28l30 17.32v34.64L30 138.56 0 121.24v-34.64l30-17.32z' fill='${theme === 'dark' ? '%2322d3ee' : '%230f172a'}' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 208px'
        }} 
      />

      {/* Neural Constellation Layer */}
      <motion.div 
        style={{ 
          opacity,
          x: mouseMoveX,
          y: useTransform(mouseMoveY, v => v + (y1.get() as number))
        }} 
        className="absolute inset-0"
      >
        {nodes.map((node) => (
          <div 
            key={node.id}
            className={`absolute rounded-full transition-colors duration-1000 ${theme === 'dark' ? 'bg-primary/20' : 'bg-primary/40'}`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
            }}
          >
            <motion.div 
              animate={{ opacity: [0, 0.4, 0], scale: [1, 2, 1] }}
              transition={{ duration: node.duration, repeat: Infinity, delay: node.delay }}
              className="absolute inset-0 bg-primary rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            />
            
            {/* Connecting segments */}
            {node.id % 3 === 0 && (
              <motion.div 
                className={`absolute w-48 h-[1px] bg-gradient-to-r ${theme === 'dark' ? 'from-primary/10 via-primary/5' : 'from-primary/30 via-primary/10'} to-transparent origin-left`}
                style={{ 
                  rotate: `${(node.id * 137) % 360}deg`,
                  scaleX: node.depth
                }}
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 7, repeat: Infinity, delay: node.id * 0.2 }}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* Floating Sparkles Layer */}
      <motion.div 
        style={{ 
          opacity: useTransform(opacity, [0, 1], [0, 0.6]),
          x: useTransform(mouseMoveX, v => v * 1.5),
          y: useTransform(mouseMoveY, v => v * 1.5 + (y2.get() as number))
        }} 
        className="absolute inset-0"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              y: [0, -40, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
            className={`absolute w-[2px] h-[2px] rounded-full shadow-lg ${theme === 'dark' ? 'bg-white shadow-white/40' : 'bg-primary shadow-primary/40'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Atmospheric Glow core */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${
        theme === 'dark'
        ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.05),transparent_75%)]'
        : 'bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_75%)]'
      }`} />
    </div>
  );
}
