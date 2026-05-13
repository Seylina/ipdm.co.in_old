import { motion } from "motion/react";
import { ArrowLeft, Zap, Shield, Target, Cpu, Activity, Database, Users, Brain, Network, TrendingUp, BarChart3, Sparkles, PenTool, Radio, Archive, Search, Sliders, Eye, Workflow, Code, RotateCw, MessageSquare, ShieldCheck, Gamepad2, Compass, Stethoscope, Bot, Box, Terminal, Rocket, ArrowRight } from "lucide-react";
import React, { useMemo } from "react";
import { SYSTEMS_ECOSYSTEM, SystemEngine } from "../lib/systemsData";
import { Trademark } from "./Trademark";
import { openMeeting as openCalendly } from "../lib/calendly";

export function AIEngineDetails({ engineId, onNavigate }: { engineId: string, onNavigate: (page: any) => void }) {
  const engine = useMemo(() => {
    for (const category of SYSTEMS_ECOSYSTEM) {
      const found = category.engines.find(e => {
          // Normalize names for comparison if needed, or use a better ID system
          // Since we don't have proper IDs in the engine data, we'll try to find by lowercase name
          return e.name.toLowerCase().includes(engineId.toLowerCase()) || 
                 e.role.toLowerCase().includes(engineId.toLowerCase());
      });
      if (found) return found;
    }
    return null;
  }, [engineId]);

  if (!engine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-3xl font-display font-medium mb-4">Engine Not Found</h2>
          <button onClick={() => onNavigate('ecosystem')} className="text-primary hover:underline">Return to Ecosystem</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen relative overflow-hidden flex flex-col selection:bg-primary/30 pb-32 transition-colors duration-1000">
      {/* HUD Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 blueprint-grid opacity-[0.03]" />
        <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10 pt-12">
        <button 
          onClick={() => onNavigate('ecosystem')}
          className="flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors group mb-20"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] font-mono font-black uppercase tracking-wider">Back to Ecosystem</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-[11px] font-mono font-black text-primary uppercase tracking-wider mb-8">
              ENGINE_CLASS // {engine.role.toUpperCase()}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 italic tracking-tighter leading-none">
              <Trademark text={engine.name} />
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-600 light:text-zinc-700 font-medium leading-relaxed italic mb-12 border-l-4 border-primary/10 pl-8 transition-colors duration-1000">
              {engine.desc}
            </p>

            <div className="flex flex-wrap gap-3 mb-16">
              {engine.tags.map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-xl bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/5 light:border-black/10 text-[11px] font-mono font-black text-zinc-500 light:text-zinc-700 uppercase tracking-wider transition-colors duration-1000">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-16">
              {Object.entries(engine.stats).map(([k, v], i) => (
                <div key={i} className="p-6 glass rounded-3xl border-[var(--color-text)]/5 hover:border-primary/10 transition-all group">
                  <div className="text-[10px] font-mono font-black text-zinc-500 light:text-zinc-600 uppercase tracking-wider mb-2 group-hover:text-primary transition-colors transition-colors duration-1000">{k}</div>
                  <div className="text-2xl font-display font-bold text-[var(--color-text)] transition-colors duration-1000">{v}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6">
              <button 
                onClick={openCalendly}
                className="px-10 py-5 bg-primary text-black font-black rounded-2xl flex items-center gap-4 hover:bg-primary/90 transition-all group"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span className="text-[11px] uppercase tracking-wider">Deploy Engine</span>
              </button>
              <button 
                onClick={openCalendly}
                className="px-8 py-4 glass border-[var(--color-text)]/10 rounded-2xl flex items-center gap-4 hover:bg-[var(--color-text)]/[0.05] transition-all text-primary uppercase text-[10px] font-mono tracking-wider transition-colors duration-1000"
              >
                Request Technical Specs
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-[5rem] blur-[80px]" />
            <div className="relative h-full w-full glass rounded-[5rem] border-white/5 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-grid opacity-10" />
               <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="p-20 rounded-full bg-primary/5 border border-primary/10 relative z-10"
               >
                  {React.isValidElement(engine.icon) ? React.cloneElement(engine.icon as React.ReactElement<any>, { size: 100, className: "text-primary/80" }) : <Cpu size={100} className="text-primary/80" />}
               </motion.div>

               {/* Orbital HUD Elements */}
               {[...Array(3)].map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{ rotate: 360 }}
                   transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                   className="absolute border border-primary/10 rounded-full"
                   style={{ 
                     width: `${40 + i * 15}%`, 
                     height: `${40 + i * 15}%`,
                     borderStyle: i === 1 ? 'dashed' : 'solid'
                   }}
                 >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full blur-[2px]" />
                 </motion.div>
               ))}
            </div>

            <div className="absolute -bottom-10 -right-10 glass p-8 rounded-3xl border-primary/20 bg-primary/5 backdrop-blur-3xl z-20">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[11px] font-mono font-black text-emerald-500 uppercase tracking-wider">Logic Stream: Encrypted</span>
               </div>
               <div className="grid grid-cols-2 gap-8 text-[11px] font-mono text-zinc-500 uppercase tracking-wider transition-colors duration-1000">
                  <div>THROUGHPUT: HIGH</div>
                  <div>SECURITY: TIER IV</div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Extended Technical Specs Section */}
        <div className="mt-24">
           <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20 text-[10px] font-mono font-black text-secondary uppercase tracking-[0.3em] mb-6">
                System Integration
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[var(--color-text)] mb-6 transition-colors duration-1000">Architectural <span className="text-secondary italic">Implementation</span></h2>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Universal Connectivity", icon: <Network />, desc: "Native integration with standard enterprise data stacks and IPDM CORE™ protocols." },
                { title: "Context Preservation", icon: <ShieldCheck />, desc: "Advanced long-context memory systems ensuring logical continuity across interaction cycles." },
                { title: "Dynamic Scaling", icon: <Rocket />, desc: "Stateless compute distribution allowing for unlimited parallel process execution." }
              ].map((spec, i) => (
                <div key={i} className="p-10 glass rounded-[2.5rem] border border-white/5 hover:border-secondary/20 transition-all group bg-white/[0.01]">
                   <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-8 group-hover:scale-105 transition-transform">
                      {React.cloneElement(spec.icon as React.ReactElement<any>, { size: 24 })}
                   </div>
                   <h3 className="text-xl font-bold font-display uppercase tracking-tighter mb-4 text-[var(--color-text)] transition-colors duration-1000">{spec.title}</h3>
                   <p className="text-sm text-zinc-500 dark:text-zinc-500 light:text-zinc-700 font-medium leading-relaxed transition-colors duration-1000">{spec.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
