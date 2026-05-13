import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import React, { useRef, useEffect } from "react";
import { IntelligenceEcosystem } from "./IntelligenceEcosystem";

export function BrandIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Mouse position for parallax (normalized -1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const springConfig = { damping: 25, stiffness: 60 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transformations based on scroll
  const heroOpacity = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 0.8, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.25], [1, 1.1]);
  const heroTranslateY = useTransform(smoothProgress, [0, 0.25], [0, -50]);

  const fullNameOpacity = useTransform(smoothProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const fullNameY = useTransform(smoothProgress, [0.3, 0.5], [100, 0]);
  const fullNameScale = useTransform(smoothProgress, [0.5, 0.7], [1, 1.05]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[var(--color-bg)] transition-colors duration-1000">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Advanced Background Visuals */}
        <IntelligenceEcosystem />
        
        {/* Atmospheric Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-transparent to-[var(--color-bg)] pointer-events-none z-10" />
        
        {/* 1. PREMIUM HERO SECTION (IPDM) */}
        <motion.div
          style={{ 
            opacity: heroOpacity, 
            scale: heroScale,
            y: heroTranslateY,
            rotateX: useTransform(smoothMouseY, [-1, 1], [3, -3]),
            rotateY: useTransform(smoothMouseX, [-1, 1], [-3, 3]),
          }}
          className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl px-4"
        >
          {/* Main Title IPDM */}
          <div className="relative">
            {/* Primary soft atmospheric glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.25, 0.15]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-cyan-500/30 blur-[160px] rounded-full scale-150 -z-10"
            />
            
            {/* Secondary focused "AI core" glow */}
            <motion.div 
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 1.1, 0.8]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-400/30 blur-[80px] rounded-full -z-10"
            />

            <motion.h1 
              initial={{ opacity: 0, scale: 0.98, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
              className="font-display font-black text-6xl sm:text-7xl md:text-[16rem] lg:text-[20rem] tracking-[0.05em] leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-300 to-blue-500 light:from-slate-900 light:via-cyan-600 light:to-blue-700 drop-shadow-[0_0_100px_rgba(34,211,238,0.3)] py-4 text-center relative z-10"
            >
              IPDM
              {/* Shimmer Effect Animation */}
              <motion.div 
                animate={{ x: ["-150%", "250%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[35deg] pointer-events-none mix-blend-overlay"
              />
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-6 w-full text-center"
          >
            <motion.p 
              animate={{ 
                opacity: [0.6, 1, 0.6],
                filter: [
                  "drop-shadow(0 0 8px rgba(34,211,238,0.4))",
                  "drop-shadow(0 0 15px rgba(34,211,238,0.8))",
                  "drop-shadow(0 0 8px rgba(34,211,238,0.4))"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-sm sm:text-xl md:text-4xl font-display font-medium text-cyan-300/90 light:text-blue-900 uppercase tracking-[0.2em] sm:tracking-[0.4em] md:tracking-[0.8em] whitespace-nowrap"
            >
              Infinite Potential
            </motion.p>
          </motion.div>
        </motion.div>

        {/*stage 2 text is kept but updated for consistency*/}
        <motion.div
          style={{ 
            opacity: fullNameOpacity, 
            y: fullNameY,
            scale: fullNameScale
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 z-30 pointer-events-none"
        >
          <div className="relative mb-6 sm:mb-10 w-full flex justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-[var(--color-text)] max-w-7xl leading-[0.92] uppercase mx-auto transition-colors duration-1000">
              Infinite Potential <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-300 to-cyan-500">Digital Marketing</span> <br />
              Private Limited
            </h2>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-10 md:gap-20">
            <div className="h-[2px] w-8 sm:w-16 md:w-40 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            <p className="text-lg sm:text-xl md:text-5xl font-display font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-gradient-mustard whitespace-nowrap">
              Intelligence. Delivered.
            </p>
            <div className="h-[2px] w-8 sm:w-16 md:w-40 bg-gradient-to-l from-transparent via-cyan-500/40 to-transparent" />
          </div>
        </motion.div>

        {/* Scroll Indicator Footer */}
        <motion.div 
          style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-40"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500/80 font-bold">Scroll to explore</span>
          <motion.div 
            animate={{ 
              height: [30, 60, 30],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1.5px] bg-gradient-to-b from-primary via-primary/50 to-transparent" 
          />
        </motion.div>
      </div>
    </section>
  );
}
