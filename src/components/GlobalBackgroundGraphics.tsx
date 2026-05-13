import { motion, useSpring, useMotionValue, useTransform } from "motion/react";
import React, { useEffect, useState } from "react";

function Particle({ mouseX, mouseY }: { mouseX: any, mouseY: any, key?: string }) {
  const [initialX] = useState(Math.random() * 100);
  const [initialY] = useState(Math.random() * 100);
  const [duration] = useState(10 + Math.random() * 20);
  const [delay] = useState(Math.random() * 20);

  const springConfig = { damping: 20, stiffness: 100 };
  const sprX = useSpring(useTransform(mouseX, [0, window.innerWidth], [-20, 20]), springConfig);
  const sprY = useSpring(useTransform(mouseY, [0, window.innerHeight], [-20, 20]), springConfig);

  return (
    <motion.div
      initial={{ opacity: 0, x: `${initialX}%`, y: `${initialY}%` }}
      animate={{ 
        opacity: [0, 0.3, 0],
        y: [`${initialY}%`, `${initialY - 10}%`],
      }}
      style={{ x: sprX, y: sprY }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay
      }}
      className="absolute w-[1px] h-12 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
    />
  );
}

function SmallPixel({ mouseX, mouseY }: { mouseX: any, mouseY: any, key?: string }) {
  const [initialX] = useState(Math.random() * 100);
  const [initialY] = useState(Math.random() * 100);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const sprX = useSpring(useTransform(mouseX, [0, window.innerWidth], [-30, 30]), springConfig);
  const sprY = useSpring(useTransform(mouseY, [0, window.innerHeight], [-30, 30]), springConfig);

  return (
    <motion.div
      initial={{ opacity: 0, x: `${initialX}%`, y: `${initialY}%` }}
      animate={{ 
        opacity: [0, 0.5, 0],
        scale: [0.5, 1, 0.5],
      }}
      style={{ x: sprX, y: sprY }}
      transition={{
        duration: 5 + Math.random() * 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 10
      }}
      className="absolute w-1.5 h-1.5 bg-primary/40 rounded-sm"
    />
  );
}

export function GlobalBackgroundGraphics() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <Particle key={`dust-${i}`} mouseX={mouseX} mouseY={mouseY} />
      ))}
      {[...Array(10)].map((_, i) => (
        <SmallPixel key={`pixel-${i}`} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
}
