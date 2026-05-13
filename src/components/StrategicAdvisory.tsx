import { motion, useScroll, useTransform } from "motion/react";
import { 
  ArrowRight, 
  BarChart3, 
  Brain, 
  Cpu, 
  Database, 
  Layers, 
  LineChart, 
  Network, 
  ShieldCheck, 
  Zap, 
  Activity,
  Globe,
  TrendingUp,
  Workflow,
  Search,
  PieChart,
  Lightbulb,
  Check,
  Binary,
  Microscope,
  Terminal,
  UnfoldHorizontal
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { openMeeting as openCalendly } from "../lib/calendly";
import { Trademark } from "./Trademark";

// --- NEW FUTURISTIC GRAPHICS ---

const PixelWave = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,211,238,0.1)_0%,_transparent_70%)]" />
      
      {/* Falling Binary Data */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-around opacity-50">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 15 + Math.random() * 20, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
            className="text-xs font-mono text-cyan-500/20 writing-mode-vertical"
            style={{ writingMode: 'vertical-rl' }}
          >
            {Array.from({ length: 40 }, () => Math.round(Math.random())).join('')}
          </motion.div>
        ))}
      </div>

      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="pixelGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="1" height="1" fill="rgba(34, 211, 238, 0.15)" />
            <circle cx="20" cy="20" r="0.5" fill="rgba(34, 211, 238, 0.1)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pixelGrid)" />
      </svg>
      
      {/* Moving Tech Ribbons */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
          className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
          style={{ top: `${10 + i * 12}%` }}
        />
      ))}

      {/* Floating Data Blocks */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`block-${i}`}
          initial={{ 
            opacity: 0,
            scale: 0,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%"
          }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [0.5, 1, 0.5],
            y: "-=100"
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute p-1 border border-cyan-500/20 glass text-[10px] font-mono whitespace-nowrap overflow-hidden"
        >
          {Math.random().toString(16).substring(2, 10).toUpperCase()}
        </motion.div>
      ))}
    </div>
  );
};

const HUDCorner = ({ className = "" }) => (
  <div className={`absolute w-12 h-12 border-cyan-500/40 pointer-events-none ${className}`}>
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500 to-transparent" />
    <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-cyan-500 to-transparent" />
  </div>
);

export function StrategicAdvisory({ onNavigate }: { onNavigate: (page: 'home' | 'advisory' | 'ai-systems' | 'about' | 'pricing' | 'policies' | 'dashboard' | 'ecosystem' | 'supporta' | 'strategos' | 'simulate' | 'core' | 'engage' | 'evolve' | 'flow' | 'core-intel' | 'decision-modeling' | 'revenue-growth' | 'brand-content' | 'knowledge-research' | 'ops-automation' | 'cust-experience' | 'adv-strategic' | 'queries-guiding') => void }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-1000">
      {/* GLOBAL MOVEMENT GRAPHICS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <PixelWave />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none transition-colors duration-1000" />

      </div>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center pt-20 pb-12 px-6 overflow-hidden">
        <div className="absolute top-[-100px] right-[-100px] w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
        
        {/* Floating AI Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: 0 
              }}
              animate={{ 
                y: [`${Math.random() * 100}%`, `${Math.random() * 100 - 20}%`],
                opacity: [0, 0.4, 0]
              }}
              transition={{ 
                duration: 5 + Math.random() * 10, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-6xl"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-cyan-500/30 text-cyan-400 text-[11px] font-mono font-black uppercase tracking-wider mb-12 shadow-neon-small relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-500/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            Strategic Intelligence Protocol
          </div>

          <h1 className="font-display font-bold text-6xl md:text-[7rem] leading-[0.95] tracking-tighter mb-10 text-[var(--color-text)] px-4 transition-colors duration-1000">
            Model-Driven <br />
            <span className="text-cyan-500 italic pr-8 relative transition-colors duration-1000">
              Strategy.
              <motion.div 
                animate={{ width: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-2 left-0 h-1 bg-cyan-500 blur-sm"
              />
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 light:text-zinc-700 max-w-4xl mx-auto mb-16 font-medium leading-relaxed transition-colors duration-1000">
            IPDM delivers strategic advisory through <span className="text-[var(--color-text)] font-bold transition-colors duration-1000">mathematical, financial, and economic models</span>, enabling leadership teams to make <span className="text-[var(--color-text)] border-b-2 border-cyan-500/30 transition-colors duration-1000">high-stakes decisions with absolute clarity.</span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20 px-4 transition-colors duration-1000">
             {[
               { label: "VERIFIED", value: "100%", icon: <ShieldCheck className="w-4 h-4" /> },
               { label: "LATENCY", value: "0.12ms", icon: <Zap className="w-4 h-4" /> },
               { label: "CERTAINTY", value: "99.98%", icon: <Brain className="w-4 h-4" /> },
               { label: "NODES", value: "512+", icon: <Network className="w-4 h-4" /> }
             ].map((stat, i) => (
                <div key={i} className="glass p-4 rounded-xl border-white/5 light:border-black/10 flex flex-col items-center gap-2 transition-colors duration-1000">
                   <div className="text-cyan-500">{stat.icon}</div>
                   <div className="text-xl font-display font-black text-white dark:text-white light:text-zinc-900 transition-colors duration-1000">{stat.value}</div>
                   <div className="text-xs font-mono text-zinc-600 light:text-zinc-800 uppercase tracking-widest transition-colors duration-1000">{stat.label}</div>
                </div>
             ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => openCalendly()}
              className="px-12 py-5 bg-cyan-500 text-black font-black text-sm uppercase tracking-widest rounded-xl flex items-center gap-3 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:-translate-y-1 transition-all duration-300 group"
            >
              Initialize Strategy <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-xs font-mono text-zinc-600 light:text-zinc-800 uppercase tracking-widest flex items-center gap-2 transition-colors duration-1000">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               System Ready For Input
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. CORE POSITIONING - THE QUANTIFIED CONTROL CENTER */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(34,211,238,0.05)_0%,_transparent_50%)]" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-[11px] font-mono font-black text-cyan-500 uppercase tracking-wider bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/20">Transformation Protocol</div>
                  <div className="h-px w-12 bg-cyan-500/20" />
                </div>
                <h2 className="font-display font-bold text-6xl md:text-8xl mb-8 leading-[0.9] tracking-tighter text-[var(--color-text)] transition-colors duration-1000">
                  From <span className="text-cyan-500 italic transition-colors duration-1000">Intuition</span><br />
                  <span className="text-[var(--color-text)] transition-colors duration-1000">to Quantified Control</span>
                </h2>
              </div>
              
              <p className="text-xl text-zinc-500 dark:text-zinc-400 light:text-zinc-700 leading-relaxed max-w-xl transition-colors duration-1000">
                Traditional strategy is a black box of heuristics. IPDM unlocks <span className="text-[var(--color-text)] font-bold underline decoration-cyan-500/30 underline-offset-8 transition-colors duration-1000">deterministic outcomes</span> through rigorous systemic modeling and autonomous logic verification.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-12 pt-8">
                <div className="group transition-colors duration-1000">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-zinc-500 dark:text-zinc-600 light:text-zinc-700 uppercase text-[10px] font-mono font-black tracking-widest transition-colors duration-1000">Legacy System</span>
                    <div className="h-px flex-1 bg-[var(--color-text)]/5 light:bg-black/10 transition-colors duration-1000" />
                  </div>
                  <ul className="space-y-4">
                     {["Experienced Guesses", "Reactive Heuristics", "Static PDF Decks"].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 text-zinc-500 dark:text-zinc-600 light:text-zinc-700 italic line-through decoration-[var(--color-text)]/20 transition-colors duration-1000">
                         <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-bg)] border border-[var(--color-text)]/10 light:border-black/20 transition-colors duration-1000" />
                         <span className="text-base tracking-tight">{item}</span>
                       </li>
                     ))}
                  </ul>
                </div>

                <div className="group transition-colors duration-1000">
                  <div className="flex items-center gap-2 mb-6">
                     <span className="text-cyan-500 uppercase text-[11px] font-mono font-black tracking-wider transition-colors duration-1000">IPDM STRATEGIC OS</span>
                     <div className="h-px flex-1 bg-cyan-500/30 transition-colors duration-1000" />
                  </div>
                  <ul className="space-y-4">
                     {[
                       { text: "Proprietary Logic Models", icon: <Binary className="w-4 h-4" /> },
                       { text: "100k+ Stress Simulations", icon: <Terminal className="w-4 h-4" /> },
                       { text: "Convergent Result Nodes", icon: <Activity className="w-4 h-4" /> }
                     ].map((item, i) => (
                       <motion.li 
                         key={i}
                         initial={{ opacity: 0, x: 10 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         transition={{ delay: i * 0.1 }}
                         className="flex items-center gap-3 text-[var(--color-text)]/90 group transition-colors duration-1000"
                       >
                         <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 group-hover:scale-110 shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-transform">{item.icon}</div>
                         <span className="text-base font-bold tracking-tight">{item.text}</span>
                       </motion.li>
                     ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 transition-colors duration-1000">
                {[
                  { label: "System Verification", status: "Pass" },
                  { label: "Logic Sync", status: "100%" },
                  { label: "Outcome Modeling", status: "Active" }
                ].map((item, i) => (
                  <div key={i} className="px-4 py-2 bg-[var(--color-text)]/[0.05] rounded-lg border border-[var(--color-text)]/5 light:border-black/10 text-[11px] font-mono font-black text-zinc-500 dark:text-zinc-600 light:text-zinc-800 uppercase tracking-wider flex items-center gap-2 transition-colors duration-1000">
                    <div className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full animate-pulse" />
                    {item.label}: {item.status}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative group perspective-1000">
               <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 rounded-[5rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
               
               <motion.div 
                 initial={{ rotateY: -10, rotateX: 5 }}
                 whileInView={{ rotateY: 0, rotateX: 0 }}
                 className="relative aspect-[1/1] md:aspect-[4/5] glass-dark rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl backdrop-blur-3xl transform-gpu transition-transform duration-700"
               >
                  <div className="absolute inset-0 bg-blue-900/5" />
                  <div className="absolute inset-0 blueprint-grid opacity-10" />
                  
                  <div className="absolute inset-x-12 top-12 flex justify-between items-center z-50">
                     <div className="flex flex-col gap-2">
                        <div className="text-[11px] font-mono text-cyan-500 font-black uppercase tracking-wider flex items-center gap-2 bg-black/40 px-3 py-1 rounded border border-cyan-500/30">
                           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                           Transformation Engine Active
                        </div>
                        <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Advisory Blueprint</div>
                     </div>
                     <div className="text-[11px] font-mono text-zinc-700 bg-white/5 px-2 py-1 rounded">Active Mode</div>
                  </div>

                  <IntuitionToModelVisual />

                  <div className="absolute bottom-12 inset-x-12 flex justify-between text-[10px] font-mono text-zinc-500 opacity-60">
                     <div className="space-y-1">
                        <div>// LATENCY: 0.12ms</div>
                        <div>// SECURITY: LAYER_7_ENCRYPTED</div>
                     </div>
                     <div className="text-right">
                        <div>// COORD: {Math.random().toFixed(4)}N</div>
                        <div>// STATUS: NOMINAL</div>
                     </div>
                  </div>
               </motion.div>

               {/* Decorative Orbitals */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                 className="absolute -inset-8 border border-white/[0.03] rounded-full pointer-events-none" 
               />
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                 className="absolute -inset-16 border border-cyan-500/[0.05] rounded-full pointer-events-none" 
               />
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIAGNOSTIC MATRIX - WHAT WE SOLVE */}
      <section className="py-16 px-6 bg-zinc-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl px-1">
              <div className="text-[11px] font-mono font-black text-cyan-500 uppercase tracking-wider mb-4">Diagnostic Matrix</div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--color-text)] mb-6 tracking-tight leading-[1.1] transition-colors duration-1000">Identifying & Eliminating <br /><span className="text-cyan-500 transition-colors duration-1000">Systemic Inefficiency</span></h2>
              <p className="text-zinc-500 light:text-zinc-700 text-lg leading-relaxed transition-colors duration-1000">
                Strategic bottlenecks are often hidden within complex operational layers. IPDM maps these inefficiencies to build high-precision resolution architectures.
              </p>
            </div>
            <div className="hidden lg:block text-right">
               <div className="text-[11px] font-mono text-zinc-700 tracking-wider uppercase mb-2">Matrix Coverage</div>
               <div className="flex gap-1 justify-end">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className={`w-1 h-4 ${i < 15 ? 'bg-cyan-500/40' : 'bg-zinc-800'}`} />
                  ))}
               </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              { icon: <TrendingUp className="w-5 h-5" />, title: "Stagnant Growth", desc: "Modeling and breaking through plateau-inducing revenue bottlenecks." },
              { icon: <PieChart className="w-5 h-5" />, title: "Capital Inefficiency", desc: "Optimizing unit economics and resource allocation via financial simulation." },
              { icon: <Search className="w-5 h-5" />, title: "Market Volatility", desc: "Scenario planning that survives irrational market shifts." },
              { icon: <Workflow className="w-5 h-5" />, title: "Logic Fragmentation", desc: "Unifying disconnected business processes into a single coherent system." },
              { icon: <ShieldCheck className="w-5 h-5" />, title: "Risk Exposure", desc: "Quantitative risk assessment and mitigation architectures." },
              { icon: <Layers className="w-5 h-5" />, title: "Legacy Deadlock", desc: "Strategizing the transition from technical debt to AI-first agility." }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ backgroundColor: "rgba(34, 211, 238, 0.03)" }}
                className="group p-10 border border-white/5 hover:border-cyan-500/30 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 text-[11px] font-mono text-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity">FAULT_DETECTED: 0x{i}F</div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-center text-cyan-500 mb-8 group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-inner">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-4 text-[var(--color-text)] group-hover:text-cyan-500 transition-colors transition-colors duration-1000">{card.title}</h3>
                  <p className="text-zinc-500 light:text-zinc-700 leading-relaxed group-hover:text-[var(--color-text)]/70 transition-colors transition-colors duration-1000">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MODEL-DRIVEN DECISION ARCHITECTURE - SCHEMATIC FLOW */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/[0.02] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 text-center">
             <div className="text-[11px] font-mono font-black text-cyan-500 uppercase tracking-wider mb-4">Strategic Workflow</div>
             <h2 className="font-display font-bold text-5xl md:text-7xl mb-6">Decision Architecture <br /><span className="text-cyan-500 italic">Schematic</span></h2>
          </div>
          
          <div className="space-y-6">
            {[
              { id: "01", title: "Problem Structuring", desc: "Deconstructing core business challenges into their fundamental mathematical components.", details: "Before modeling begins, we perform high-fidelity logical mapping to identify high-leverage nodes." },
              { id: "02", title: "Model Construction", desc: "Building proprietary financial and economic models specific to your business.", details: "We use Bayesian statistics and game theory to build ground-truth models for your strategy." },
              { id: "03", title: "Scenario Simulation", desc: "Running 100k+ simulations to identify optimal paths under various conditions.", details: "Our cloud-native engine tests every option against historical volatility and projected shifts." },
              { id: "04", title: "Decision Framework", desc: "Translating modeling results into clear, actionable, system-ready execution pathways.", details: "The final output is a decision-ready blueprint that integrates into your AI and workflow systems." }
            ].map((step, i) => (
              <AccordionItem 
                key={i} 
                id={step.id}
                title={step.title}
                desc={step.desc}
                details={step.details}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CORE MODELING CAPABILITIES */}
      <section className="py-16 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-xs font-mono font-bold tracking-[0.3em] text-cyan-500 uppercase mb-2">SYSTEM CAPABILITIES</div>
              <h2 className="font-display font-bold text-4xl text-[var(--color-text)] transition-colors duration-1000">Core Modeling <span className="text-gradient pr-4">Laboratories</span></h2>
            </div>
            <p className="text-zinc-500 light:text-zinc-700 max-w-md text-sm italic transition-colors duration-1000">Multi-disciplinary modeling layers engineered for high-consequence precision.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Mathematical", icon: <Layers />, status: "Optimized" },
              { label: "Financial", icon: <LineChart />, status: "Live" },
              { label: "Economic", icon: <Globe />, status: "Active" },
              { label: "Statistical", icon: <Database />, status: "Synced" },
              { label: "Simulation", icon: <Activity />, status: "Recursive" }
            ].map((item, i) => (
              <div key={i} className="glass p-6 rounded-2xl flex flex-col gap-8 border-white/5 light:border-black/10 hover:border-cyan-500/20 transition-all group duration-1000">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-[var(--color-text)]/5 text-zinc-400 group-hover:text-cyan-400 transition-colors">{item.icon}</div>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold tracking-widest text-zinc-600 dark:text-zinc-600 light:text-zinc-800 uppercase mb-1 transition-colors duration-1000">{item.status}</div>
                  <div className="font-display font-bold text-lg">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. IPDM SYNAPSE<Trademark /> SECTION - HIGH FIDELITY HUD */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-500/5 blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="relative glass-dark p-12 md:p-24 rounded-[4rem] border border-cyan-500/20 overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            <div className="absolute inset-0 blueprint-grid opacity-5" />
            
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 rounded-full text-cyan-400 text-[11px] font-mono font-black uppercase tracking-wider mb-8 border border-cyan-500/20">
                   <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                   Proprietary Engine: Synapse
                </div>
                <h2 className="font-display font-bold text-6xl md:text-8xl mb-8 tracking-tighter leading-[0.9] text-[var(--color-text)] transition-colors duration-1000">IPDM <br /><span className="text-cyan-500">SYNAPSE<Trademark /></span></h2>
                <p className="text-zinc-500 dark:text-zinc-400 light:text-zinc-700 text-xl mb-12 leading-relaxed transition-colors duration-1000">
                  Our proprietary Decision Engine. It doesn't speculate; it simulations the mathematical outcome of every possible business trajectory through <span className="text-[var(--color-text)] font-bold transition-colors duration-1000">100k+ parallel logic paths.</span>
                </p>
                
                <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-12">
                  {[
                    "Logic Stress-Testing",
                    "Convergent Modeling",
                    "Revenue Optimization",
                    "Market Simulation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-[var(--color-text)]/70 list-none font-display uppercase tracking-wider group/item transition-colors duration-1000">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4] group-hover/item:scale-150 transition-transform" />
                      {item}
                    </li>
                  ))}
                </div>
                
                <button className="relative px-10 py-5 bg-white text-black font-black font-mono text-xs uppercase tracking-[0.2em] rounded-xl overflow-hidden hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all group">
                   <span className="relative z-10">Sync Strategy Node</span>
                   <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
              
              <div className="relative flex items-center justify-center">
                 <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full animate-pulse-slow" />
                 <SynapseVisual />
                 
                 {/* Floating Data Labels */}
                 {["Logic", "Node 82", "Strategy Alpha"].map((label, i) => (
                    <motion.div
                       key={i}
                       animate={{ 
                         y: [0, -10, 0],
                         opacity: [0.3, 0.6, 0.3]
                       }}
                       transition={{ duration: 4, delay: i * 1.5, repeat: Infinity }}
                       className="absolute hidden md:block"
                       style={{ 
                         top: i * 30 + 10 + "%", 
                         left: i % 2 === 0 ? "-10%" : "85%" 
                       }}
                    >
                       <div className="px-3 py-1 glass border border-white/10 rounded font-mono text-[8px] text-zinc-500 tracking-widest">{label}</div>
                    </motion.div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FROM MODELS TO DECISIONS */}
      <section className="py-24 px-6 border-y border-white/5 bg-[var(--color-bg)] transition-colors duration-1000">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-4xl mb-16 text-center leading-[1.3] px-4 text-[var(--color-text)] transition-colors duration-1000">From Analysis to <span className="text-cyan-500 pr-4">Decision Control</span></h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-10 rounded-3xl border-white/5 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
               <div className="text-xs font-mono font-bold text-zinc-600 uppercase mb-6 tracking-widest">Industry Standard</div>
               <h3 className="text-2xl font-bold font-display mb-6 text-[var(--color-text)] transition-colors duration-1000">Typical Analytics</h3>
               <ul className="space-y-4 text-zinc-500 light:text-zinc-700 text-sm transition-colors duration-1000">
                 <li className="flex gap-3"><span className="text-red-500">×</span> Retrospective Data Reports</li>
                 <li className="flex gap-3"><span className="text-red-500">×</span> Opinion-Based Strategy Decks</li>
                 <li className="flex gap-3"><span className="text-red-500">×</span> Fragmented Decision Nodes</li>
                 <li className="flex gap-3"><span className="text-red-500">×</span> Execution-Strategy Gap</li>
               </ul>
            </div>
            <div className="glass p-10 rounded-3xl border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4">
                  <Sparkles className="w-6 h-6 text-cyan-500 animate-pulse" />
               </div>
               <div className="text-xs font-mono font-bold text-cyan-500 uppercase mb-6 tracking-widest">Infinite Potential Architecture</div>
               <h3 className="text-2xl font-bold font-display mb-6 text-white dark:text-white light:text-zinc-900 transition-colors duration-1000">Decision-Driven Systems</h3>
               <ul className="space-y-4 text-white/80 dark:text-white/80 light:text-zinc-800 text-sm transition-colors duration-1000">
                 <li className="flex gap-3"><span className="text-cyan-500">✓</span> Real-Time Predictive Modeling</li>
                 <li className="flex gap-3"><span className="text-cyan-500">✓</span> Model-Verified Execution Paths</li>
                 <li className="flex gap-3"><span className="text-cyan-500">✓</span> Unified Strategic Operating Logic</li>
                 <li className="flex gap-3"><span className="text-cyan-500">✓</span> Strategy Fully Integrated with AI</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTEGRATION WITH EXECUTION */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-xs font-mono font-bold tracking-[0.3em] text-zinc-600 uppercase mb-6">THE SYSTEM FLYWHEEL</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-16 text-[var(--color-text)] transition-colors duration-1000">The Strategic <span className="text-cyan-500 italic">Continuum</span></h2>
          <div className="relative">
             <StrategyFlowDiagram />
          </div>
        </div>
      </section>

      {/* 9. WHO THIS IS FOR */}
      <section className="py-24 px-6 bg-[var(--color-bg)] transition-colors duration-1000">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-4xl mb-16 text-center text-[var(--color-text)] transition-colors duration-1000">Engineered for <span className="text-gradient pr-4">Precision and Scale</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { type: "High-Growth Scaleups", focus: "Logic Consolidation", desc: "Organizations scaling faster than their internal logic can keep up." },
              { type: "Enterprise Units", focus: "AI Transformation", desc: "Legacy teams moving to model-driven operational architectures." },
              { type: "Deep-Tech Firms", focus: "Strategic Modeling", desc: "Complex products requiring sophisticated financial and market simulations." }
            ].map((card, i) => (
              <div key={i} className="p-10 rounded-2xl glass border-white/5 hover:border-cyan-500/20 transition-all flex flex-col gap-6">
                 <div className="text-xs font-mono font-black text-cyan-500 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded w-fit">{card.focus}</div>
                 <h3 className="text-2xl font-bold font-display">{card.type}</h3>
                 <p className="text-zinc-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. WHY INFINITE POTENTIAL STRATEGIC ADVISORY */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Quantified Certainty", desc: "We don't sell powerpoints. We sell mathematical verification of your next big move." },
              { title: "Engineering Mindset", desc: "Strategy is treated as a software architecture problem, not a creative exercise." },
              { title: "Systemic Integration", desc: "Our advisory feeds directly into the AI systems we build, ensuring zero loss in translation." }
            ].map((item, i) => (
              <div key={i}>
                <div className="font-display font-bold text-2xl mb-4 text-[var(--color-text)] tracking-tight transition-colors duration-1000">{item.title}</div>
                <p className="text-zinc-500 light:text-zinc-700 leading-relaxed text-sm transition-colors duration-1000">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CLOSING SECTION */}
      <section className="py-20 px-6 text-center bg-grid relative bg-[var(--color-bg)] transition-colors duration-1000">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="font-display font-bold text-5xl md:text-8xl tracking-tighter mb-12 leading-[1.2] px-4 text-[var(--color-text)] transition-colors duration-1000"
          >
            Better Decisions Are <br />
            <span className="text-cyan-500 italic pr-4">A Competitive Advantage.</span>
          </motion.h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto" />
        </div>
      </section>

      {/* 12. CTA SECTION - IMMERSIVE TERMINAL */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative glass-dark p-12 md:p-24 rounded-[4rem] border border-white/5 overflow-hidden text-center">
             <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
             
             <div className="relative z-10">
                <div className="flex justify-center mb-10">
                   <div className="px-5 py-2 glass rounded-full border-cyan-500/10 flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
                      <span className="text-[10px] font-mono font-black text-cyan-500 uppercase tracking-[0.4em]">SYSTEM READY FOR DEPLOYMENT</span>
                   </div>
                </div>
                
                <h3 className="font-display font-bold text-5xl md:text-7xl mb-10 leading-tight text-[var(--color-text)] transition-colors duration-1000">Ready to Model Your <br /><span className="text-cyan-500 pr-4">Growth Architecture?</span></h3>
                <p className="text-zinc-500 light:text-zinc-700 text-xl max-w-2xl mx-auto mb-16 px-4 transition-colors duration-1000">
                  Initialize your strategy protocol. Bridge the gap between intuition and deterministic control.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 transition-colors duration-1000">
                  <button 
                    onClick={() => onNavigate('ai-systems')}
                    className="w-full sm:w-auto px-12 py-6 bg-cyan-500 text-black font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:-translate-y-1 transition-all duration-300 group flex items-center justify-center gap-3"
                  >
                    Explore AI Systems <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => onNavigate('ai-systems')}
                    className="w-full sm:w-auto px-12 py-6 glass text-zinc-100 dark:text-zinc-100 light:text-zinc-900 font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 transition-all border border-white/10 light:border-black/10"
                  >
                    View System Specs
                  </button>
                </div>
                
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5">
                   {[
                     { label: "VERSION", value: "4.0.0A" },
                     { label: "NODES", value: "DECENTRALIZED" },
                     { label: "LATENCY", value: "SUB-1ms" },
                     { label: "ENCRYPTION", value: "AES-256" }
                   ].map((spec, i) => (
                     <div key={i} className="text-center">
                        <div className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">{spec.label}</div>
                        <div className="text-xs font-mono font-bold text-zinc-400">{spec.value}</div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function AccordionItem({ id, title, desc, details }: { id: string, title: string, desc: string, details: string, key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className={`glass rounded-2xl border transition-all cursor-pointer overflow-hidden ${isOpen ? 'border-cyan-500/40 bg-cyan-500/5' : 'border-white/5'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-8 flex gap-6 items-center">
        <div className="text-zinc-700 font-mono font-black text-3xl group-hover:text-cyan-500 transition-colors">{id}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold font-display text-white">{title}</h3>
          <p className="text-zinc-500 text-xs mt-1">{desc}</p>
        </div>
        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-transform ${isOpen ? 'rotate-45' : ''}`}>
           <Zap className={`w-4 h-4 ${isOpen ? 'text-cyan-500' : 'text-zinc-600'}`} />
        </div>
      </div>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="px-8 pb-8 pl-20 text-zinc-400 text-sm leading-relaxed border-t border-white/5 pt-6 italic">
          {details}
        </div>
      </motion.div>
    </div>
  );
}

function VisualModelingGrid() {
  return (
    <div className="w-full h-full border border-[var(--color-text)]/5 rounded-3xl overflow-hidden relative bg-[var(--color-bg)]/40 backdrop-blur-xl transition-colors duration-1000">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex gap-4 items-end h-32 transition-colors duration-1000">
          {[40, 70, 45, 90, 65, 80, 55, 95, 40].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.2, repeatType: "reverse", ease: "easeInOut" }}
              className="w-8 bg-gradient-to-t from-cyan-500/0 to-cyan-500/40 rounded-t-lg relative"
            >
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-6 right-6 flex justify-between text-xs font-mono text-zinc-700 tracking-widest uppercase">
         <span>Modeling Node Active</span>
         <span>Latency: 0.12ms</span>
         <span>System Confidence: 99.98%</span>
      </div>
    </div>
  );
}

function IntuitionToModelVisual() {
  return (
    <div className="w-full h-full p-12 flex flex-col justify-center gap-12">
      <div className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-600 relative overflow-hidden">
           <Brain className="w-6 h-6" />
           <motion.div animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-white" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="text-xs font-mono text-zinc-600">INPUT: INTUITION</div>
          <div className="h-2 bg-white/5 rounded-full w-full" />
        </div>
      </div>

      <div className="flex flex-col items-center py-4">
        <motion.div 
          animate={{ scaleY: [1, 1.2, 1], y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-zinc-700 to-cyan-500" 
        />
        <div className="py-2 text-xs font-mono text-zinc-700 bg-white/5 px-3 rounded tracking-tighter">TRANSFORMING LOGIC</div>
      </div>

      <div className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-black relative shadow-[0_0_20px_rgba(6,182,212,0.4)]">
           <Cpu className="w-6 h-6 animate-pulse" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="text-xs font-mono text-cyan-500 font-bold tracking-widest uppercase">OUTPUT: QUANTITATIVE_MODEL</div>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            className="h-2 bg-cyan-500 rounded-full" 
          />
        </div>
      </div>
    </div>
  );
}

function SynapseVisual() {
  return (
    <div className="w-full aspect-square relative flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         {[...Array(3)].map((_, i) => (
            <motion.div 
               key={i}
               animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.05, 0.15, 0.05],
                  rotate: [0, 180, 360]
               }}
               transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
               className="absolute w-full h-full border border-cyan-500/20 rounded-full"
            />
         ))}
      </div>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 border border-cyan-500/10 rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-12 border-t border-cyan-500/30 border-dashed rounded-full"
      />
      <div className="relative z-10 w-32 h-32 bg-[var(--color-bg)] rounded-full border-2 border-cyan-500 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.3)] transition-colors duration-1000">
         <div className="text-cyan-500">
            <Database className="w-10 h-10 animate-pulse" />
         </div>
         {/* Particles */}
         <div className="absolute inset-0">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{ duration: 4, delay: i * 1, repeat: Infinity }}
                className="absolute inset-[-20%] border border-cyan-500/10 rounded-[40%]"
              />
            ))}
         </div>
      </div>
    </div>
  );
}

function StrategyFlowDiagram() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 items-center">
       {[
         { icon: <Search />, label: "Strategy" },
         { icon: <Cpu />, label: "AI Systems" },
         { icon: <Workflow />, label: "Workflow" },
         { icon: <TrendingUp />, label: "Outcomes" }
       ].map((node, i) => (
         <div key={i} className="flex flex-col md:flex-row items-center flex-1">
            <div className="flex flex-col items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 rounded-2xl glass border border-white/10 flex items-center justify-center text-cyan-400"
              >
                {node.icon}
              </motion.div>
              <div className="text-xs font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase">{node.label}</div>
            </div>
            {i < 3 && (
              <div className="flex-1 w-px h-12 md:w-full md:h-px bg-gradient-to-r from-cyan-500 to-transparent relative my-4 md:my-0">
                 <motion.div 
                   animate={{ x: [0, 40, 0] }}
                   transition={{ repeat: Infinity, duration: 2 }}
                   className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-[2px] bg-cyan-400 hidden md:block" 
                 />
              </div>
            )}
         </div>
       ))}
    </div>
  );
}

function Sparkles(props: any) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 3v3m0 12v3m9-9h-3m-12 0h-3"/>
      <path d="m19 19-2-2m-10-10-2-2m14 0-2 2m-10 10-2 2"/>
    </svg>
  );
}
