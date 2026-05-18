import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { useEffect } from "react";
import { useTheme } from "../lib/ThemeContext";

export function AmbientBackground({ isAboutPage = false }: { isAboutPage?: boolean }) {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const sprX = useSpring(mouseX, springConfig);
  const sprY = useSpring(mouseY, springConfig);

  const xPos = useTransform(sprX, [-500, 500], [-40, 40]);
  const yPos = useTransform(sprY, [-500, 500], [-40, 40]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Create drifting motion relative to scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotateS = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000 bg-mesh">
      {/* Wave Layers */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 transition-opacity duration-1000">
        <WaveLayer 
          color={isLight ? "#22d3ee" : "#0891b2"} 
          duration={20} 
          offset={0} 
        />
        <WaveLayer 
          color={isLight ? "#0ea5e9" : "#0369a1"} 
          duration={25} 
          offset={20} 
          delay={2}
        />
        <WaveLayer 
          color={isLight ? "#4f46e5" : "#312e81"} 
          duration={30} 
          offset={40} 
          delay={4}
        />
      </div>

      {/* Animated Glowing Orbs - Simplified for performance */}
      <motion.div 
        style={{ x: xPos, y: y1 }}
        animate={{ 
          opacity: isLight ? 0.1 : 0.25,
          backgroundColor: isLight ? 'rgba(34, 211, 238, 0.2)' : 'rgba(34, 211, 238, 0.05)' 
        }}
        className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[80px] transition-all duration-1000 will-change-transform"
      />
      <motion.div 
        style={{ x: useTransform(xPos, (v) => -v), y: y2 }}
        animate={{ 
          opacity: isLight ? 0.15 : 0.3,
          backgroundColor: isLight ? 'rgba(79, 70, 229, 0.15)' : 'rgba(79, 70, 229, 0.05)'
        }}
        className="absolute top-[60%] right-[10%] w-[500px] h-[500px] rounded-full blur-[100px] transition-all duration-1000 will-change-transform"
      />
      
      {/* Digital Grid Elements */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.03] light:opacity-[0.05]" />
      <div className="absolute inset-0 blueprint-grid opacity-[0.02]" />
      
      {/* Floating System Schematic Fragments */}
      <motion.div 
        style={{ y: y1 }}
        animate={{ 
          backgroundColor: isLight ? 'rgba(34, 211, 238, 0.4)' : 'rgba(34, 211, 238, 0.4)',
          boxShadow: isLight ? '0 0 10px rgba(34, 211, 238, 0.1)' : '0 0 15px rgba(34, 211, 238, 0.3)'
        }}
        className="absolute top-1/4 right-[20%] w-[2px] h-64 bg-gradient-to-b from-transparent to-transparent transition-all duration-1000"
      />
      <motion.div 
        style={{ y: y2 }}
        animate={{ 
          backgroundColor: isLight ? 'rgba(14, 165, 233, 0.4)' : 'rgba(14, 165, 233, 0.4)',
          boxShadow: isLight ? '0 0 10px rgba(14, 165, 233, 0.1)' : '0 0 15px rgba(14, 165, 233, 0.3)'
        }}
        className="absolute bottom-1/4 left-[15%] w-[2px] h-96 bg-gradient-to-b from-transparent to-transparent transition-all duration-1000"
      />

      {/* Decorative Scanline */}
      {!isAboutPage && (
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-[1] bg-[length:100%_2px,3px_100%] opacity-20 dark:opacity-20 light:opacity-[0.03] transition-opacity duration-1000" />
      )}
    </div>
  );
}

function WaveLayer({ color, duration, offset, delay = 0 }: { color: string, duration: number, offset: number, delay?: number }) {
  return (
    <motion.div
      initial={{ x: "-50%" }}
      animate={{ 
        x: ["-50%", "0%"],
        y: [0, 15, 0]
      }}
      transition={{
        x: { duration, repeat: Infinity, ease: "linear", delay },
        y: { duration: duration / 4, repeat: Infinity, ease: "easeInOut" }
      }}
      className="absolute inset-0 w-[200%] h-full will-change-transform"
      style={{ opacity: 0.12 }}
    >
      <svg 
        viewBox="0 0 1200 600" 
        preserveAspectRatio="none" 
        className="w-full h-full"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <path
          d="M0,150 C300,100 400,200 600,150 C800,100 900,200 1200,150 L1200,600 L0,600 Z"
          fill={color}
        />
        <path
          d="M0,150 C300,100 400,200 600,150 C800,100 900,200 1200,150 L1200,600 L0,600 Z"
          fill={color}
          transform="translate(600, 0)"
        />
      </svg>
    </motion.div>
  );
}
