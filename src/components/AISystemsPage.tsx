import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { Cpu, FileText, ArrowRight, Check, X, Shield, Zap, Target, Layers, Workflow, Share2, Lightbulb, TrendingUp, Presentation, Search, Brain, Rocket, Database, Network, Users, BarChart3, Activity, Command, Terminal, Landmark, Factory, Pickaxe, Sprout, Droplets, HardHat, ShoppingCart, Truck, Hotel, Monitor, Briefcase, ClipboardList, Building2, GraduationCap, HeartPulse, Music, Globe, Home, Sparkles } from "lucide-react";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { openMeeting as openCalendly } from "../lib/calendly";
import { Trademark } from "./Trademark";
import { IndustryExplorer } from "./IndustryExplorer";

const SYSTEMS_DATA = [
  {
    name: "Astra™",
    role: "Decision Intelligence",
    desc: "Executive strategic intelligence platform for root cause analysis and predictive multi-agent reasoning.",
    icon: <Brain />,
    category: "Strategic",
    stats: { precision: "Founder-Grade", engine: "Multi-Agent", compute: "Reasoning-Optimized" },
    tags: ["Strategic", "BI", "Reasoning"]
  },
  {
    name: "Synapse™",
    role: "Decision Intelligence",
    desc: "Autonomous reasoning layers that manage complex multi-variable operational decisions.",
    icon: <Cpu />,
    category: "Modeling",
    stats: { precision: "99.98%", engine: "Stochastic", compute: "Edge-Optimized" },
    tags: ["Modeling", "Forecasting", "Quant"]
  },
  {
    name: "Scribe™",
    role: "Content Intelligence",
    desc: "Strategic content creation engine designed for authority and search dominance.",
    icon: <FileText />,
    category: "Content",
    stats: { fidelity: "High", consistency: "100%", speed: "Infinite" },
    tags: ["Brand", "Creative", "Visual"]
  }
];

export function AISystemsPage({ onNavigateEngine }: { onNavigateEngine: (engineId: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const yParallax = useTransform(smoothProgress, [0, 1], [0, -300]);
  const opacityFade = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [1, 1, 0, 0]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredSystems = useMemo(() => SYSTEMS_DATA.filter(system => 
    system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.desc.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  // Ambient floating elements
  const floatingUI = useMemo(() => [...Array(12)].map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5,
    size: 20 + Math.random() * 40,
    opacity: 0.05 + Math.random() * 0.1
  })), []);

  return (
    <div ref={containerRef} className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen relative overflow-hidden flex flex-col selection:bg-primary/30 transition-colors duration-1000">
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 blueprint-grid opacity-[0.05]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.05)_0%,transparent_70%)]" />
        
        {/* Floating Technical Nodes */}
        {floatingUI.map((ui) => (
          <motion.div
            key={ui.id}
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: [0, -100, 0],
              opacity: [0, ui.opacity, 0]
            }}
            transition={{
              duration: ui.duration,
              repeat: Infinity,
              delay: ui.delay,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              top: ui.top,
              left: ui.left,
              width: ui.size,
              height: ui.size,
            }}
            className="border border-[var(--color-text)]/10 rounded-lg flex items-center justify-center p-2 transition-colors duration-1000"
          >
            <div className="w-1 h-1 bg-primary rounded-full blur-[1px]" />
          </motion.div>
        ))}

        {/* Global Progress Line (HUD Style) */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 h-1/2 w-px bg-[var(--color-text)]/5 flex flex-col justify-between items-center py-4 transition-colors duration-1000">
          <motion.div 
            className="w-1 bg-primary blur-[2px]"
            style={{ height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
          />
          <div className="text-[10px] font-mono text-zinc-700 light:text-zinc-800 [writing-mode:vertical-lr] tracking-[0.3em] mt-4 uppercase transition-colors duration-1000">SYSTEM_FLOW_SYNC</div>
        </div>
      </div>

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [0, 200]) }}
          className="absolute top-[5%] left-[-20%] w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px]" 
        />
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [0, -200]) }}
          className="absolute bottom-[25%] right-[-20%] w-[1000px] h-[1000px] bg-secondary/5 rounded-full blur-[200px]" 
        />
      </div>

      {/* 2. NAVIGATION OVERLAY (Visual only for depth) */}
         <div className="absolute top-1/2 -translate-y-1/2 left-8 h-1/2 hidden 2xl:flex flex-col justify-between items-start opacity-20 z-0 select-none pointer-events-none">
        <div className="space-y-4">
           <div className="text-[10px] font-mono font-black text-primary uppercase tracking-wider">SYSTEM_COORDINATES</div>
           <motion.div className="text-[10px] font-mono text-zinc-500">
              X_<motion.span>{useTransform(smoothProgress, [0, 1], ["20.442", "88.190"])}</motion.span><br />
              Y_<motion.span>{useTransform(smoothProgress, [0, 1], ["10.021", "44.773"])}</motion.span>
           </motion.div>
        </div>
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent mx-auto" />
        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-[1.5em] [writing-mode:vertical-lr]">CORE_SYSTEM_INFRASTRUCTURE</div>
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-primary/50 to-transparent mx-auto" />
        <div className="space-y-4 text-right">
           <div className="text-[10px] font-mono font-black text-secondary uppercase tracking-wider">SYNC_VER: 4.2</div>
           <div className="text-[10px] font-mono text-zinc-600">99.98%_UPTIME</div>
        </div>
      </div>

      {/* 3. HERO: THE OPERATIONAL SYSTEM - ENHANCED */}
      <section className="relative flex items-center pt-20 pb-20 px-8 z-10 overflow-hidden">
        {/* Animated Background Title */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center -z-10 select-none">
          <motion.div
            style={{ opacity: useTransform(smoothProgress, [0, 0.3], [0.03, 0]) }}
            className="text-[40vw] font-display font-black text-[var(--color-text)] whitespace-nowrap italic leading-none transition-colors duration-1000"
          >
            SYSTEMS
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center relative"
          >
            {/* HUD Callouts */}
            <motion.div 
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="hidden lg:block absolute -top-24 -left-32 border-l border-t border-primary/40 p-4"
            >
               <div className="text-[10px] font-mono text-primary uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-3 h-3" /> NODE_STATUS: OPTIMAL
               </div>
               <div className="text-[10px] font-mono text-zinc-600 mt-1 uppercase">ARCH_v4.0.2</div>
            </motion.div>

            <motion.div 
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 4, repeat: Infinity, delay: 2 }}
               className="hidden lg:block absolute -bottom-24 -right-32 border-r border-b border-secondary/40 p-4 text-right"
            >
               <div className="text-[10px] font-mono text-secondary uppercase tracking-wider flex items-center justify-end gap-2">
                  <Terminal className="w-3 h-3" /> SHELL: ACTIVE_SYNC
               </div>
               <div className="text-[10px] font-mono text-zinc-600 mt-1 uppercase">ENCRYPTION: AES_256</div>
            </motion.div>

            <div className="mb-12 relative">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                 className="absolute -top-6 left-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
               />
               <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter italic py-2 pr-4">
                 AI Systems That <br />
                 <motion.span 
                   className="text-primary not-italic relative inline-block py-2"
                 >
                    Operate Your Business
                 </motion.span>
               </h1>
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
                 className="absolute -bottom-6 left-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
               />
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-lg md:text-2xl text-zinc-500 light:text-zinc-700 font-medium leading-[1.6] max-w-4xl mx-auto mb-20 transition-colors duration-1000"
            >
              Designing and deploying <span className="text-[var(--color-text)] font-bold transition-colors duration-1000">production-grade AI systems</span> that function as <span className="text-[var(--color-text)] italic font-black transition-colors duration-1000">integrated business infrastructure</span>.
            </motion.p>

            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={openCalendly}
                className="px-12 py-6 bg-primary text-black font-black rounded-2xl flex items-center gap-4 hover:shadow-neon-strong transition-all group scale-110 pointer-events-auto"
              >
                <span className="text-[11px] uppercase tracking-[0.2em]">Initialize Deployment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. CAPABILITIES: THE INTEGRATED INTELLIGENCE FRAMEWORK (NEW FROM IMAGE) */}
      <section className="py-24 px-8 relative z-10 border-y border-[var(--color-text)]/5 bg-[var(--color-bg)] overflow-hidden transition-colors duration-1000">
         {/* Neural Mesh Background */}
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <svg width="100%" height="100%" className="absolute inset-0">
               <pattern id="neural-mesh" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-primary" />
                  <line x1="2" y1="2" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#neural-mesh)" />
            </svg>
         </div>

         <div className="max-w-7xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="space-y-8"
               >
                  <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter flex flex-col italic py-2">
                    <span className="pr-4">Integrated</span>
                    <span className="text-primary not-italic scale-y-105 origin-left py-2">Intelligence</span>
                    <span className="pr-4">Framework</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-300 light:text-zinc-700 font-medium italic leading-relaxed transition-colors duration-1000 max-w-xl">
                    The <span className="text-[var(--color-text)] font-bold transition-colors duration-1000">IPDM Intelligence Platform™</span> is a unified architecture that integrates <span className="text-secondary italic">AI, data, models, and workflows</span> into a single <span className="text-secondary font-black transition-colors duration-1000">hyper-productive operational layer.</span>
                  </p>
                  
                  <div className="flex flex-wrap justify-start gap-4 pt-4">
                    <button 
                      onClick={openCalendly}
                      className="px-10 py-5 bg-secondary text-black font-black rounded-2xl flex items-center gap-4 hover:shadow-[0_0_40px_rgba(var(--secondary-rgb),0.5)] transition-all group pointer-events-auto"
                    >
                      <Zap className="w-5 h-5 fill-current" />
                      <span className="text-[11px] uppercase tracking-[0.2em]">INITIALIZE DEPLOYMENT</span>
                    </button>
                    <button 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="px-8 py-4 glass border-white/10 rounded-full flex items-center gap-4 hover:bg-white/5 transition-all text-secondary uppercase text-[10px] font-mono tracking-[0.3em] group"
                    >
                      RETURN TO CORE
                    </button>
                  </div>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                 whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1, ease: "circOut" }}
                 className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border border-primary/20 group"
               >
                  <img 
                    src="/assets/images/integrated_intelligence_framework_hero_1779097538107.png" 
                    alt="Integrated Intelligence Framework" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                     <div className="space-y-1">
                        <div className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-black">Architecture_v4_Live</div>
                        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                           <motion.div 
                             animate={{ x: ["-100%", "100%"] }}
                             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                             className="w-1/2 h-full bg-primary"
                           />
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* 5. CAPABILITIES: DIGITAL TRANSFORMATION */}
      <section className="py-24 px-8 relative z-10 border-t border-[var(--color-text)]/5 bg-[var(--color-bg)] transition-colors duration-1000">
        <div className="max-w-7xl mx-auto">
          {/* Intelligence Layers Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-[10px] font-mono font-black text-emerald-500 uppercase tracking-[0.3em] mb-6">
                Structural Hierarchy
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[var(--color-text)] mb-6">Built on Four <br /><span className="text-secondary italic">Intelligence Layers</span></h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
              {[
                { layer: "01", name: "Cognitive Core", desc: "Proprietary base models trained on industry-specific logic paths.", icon: <Brain />, color: "border-primary/10 group-hover:border-primary/40" },
                { layer: "02", name: "Data Core", desc: "Unified operational data stream connecting fragmented legacy systems.", icon: <Database />, color: "border-secondary/10 group-hover:border-secondary/40" },
                { layer: "03", name: "Agent Clusters", desc: "Autonomous multi-agent ecosystems deployed for complex reasoning.", icon: <Users />, color: "border-emerald-500/10 group-hover:border-emerald-500/40" },
                { layer: "04", name: "Decision Engine", desc: "Scenario-based simulations providing deterministic business outcomes.", icon: <Rocket />, color: "border-blue-500/10 group-hover:border-blue-500/40" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`p-8 glass rounded-[2.5rem] border bg-white/[0.01] flex flex-col gap-6 group transition-all duration-500 ${item.color}`}
                >
                  <div className="flex items-center justify-between transition-colors duration-1000">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-text)]/5 flex items-center justify-center text-zinc-500 group-hover:text-[var(--color-text)] transition-colors transition-colors duration-1000">
                      {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
                    </div>
                    <span className="text-3xl font-display font-black text-[var(--color-text)]/5 group-hover:text-[var(--color-text)]/10 transition-colors uppercase italic transition-colors duration-1000">{item.layer}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-display text-[var(--color-text)] mb-2 tracking-tight transition-colors duration-1000">{item.name}</h4>
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-medium transition-colors duration-1000">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-20">
             <div className="text-[11px] font-mono font-black text-secondary uppercase tracking-[0.6em] mb-6">
                <div className="w-16 h-px bg-secondary/30" /> TRANSFORMATION_CORE
             </div>
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
             >
               <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-12 tracking-tighter leading-[1.1] italic text-[var(--color-text)] transition-colors duration-1000 py-2">
                 <span className="inline-block pr-4">From Fragmented Operations</span> <br />
                 <span className="text-secondary not-italic uppercase tracking-tight">To Intelligent Systems.</span>
               </h2>
               <p className="text-xl text-zinc-500 dark:text-zinc-500 light:text-zinc-800 max-w-3xl leading-relaxed font-medium italic border-l-4 border-[var(--color-text)]/5 pl-12 transition-colors duration-1000">
                  IPDM transforms businesses by <span className="text-[var(--color-text)] transition-colors duration-1000">redesigning processes</span>, consolidating systems, and embedding AI-driven intelligence into core operations.
               </p>
             </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold font-display text-[var(--color-text)] mb-8 uppercase tracking-tighter leading-tight transition-colors duration-1000">Digital Transformation Is a <span className="text-secondary">Systems Problem</span> <br />— Not a Tool Problem</h3>
                <p className="text-zinc-500 light:text-zinc-800 text-lg leading-relaxed max-w-xl transition-colors duration-1000">
                  Most digital transformation initiatives fail because they focus on short-term tools rather than long-term architecture.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-10">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="glass p-10 rounded-[3rem] border-red-500/10 bg-red-500/[0.01]"
                >
                  <div className="text-[11px] font-mono text-red-500/50 uppercase tracking-widest mb-6">Failure_Points</div>
                  <ul className="space-y-4">
                    {["Tools instead of systems", "Automation instead of architecture", "Features instead of workflows"].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-zinc-500 text-sm font-mono">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass p-10 rounded-[3rem] border-secondary/20 bg-secondary/5 shadow-[0_0_40px_rgba(var(--secondary-rgb),0.05)]"
                >
                  <div className="text-[11px] font-mono text-secondary uppercase tracking-widest mb-6">The_IPDM_Approach</div>
                  <ul className="space-y-4">
                    {["How work flows", "How systems interact", "How decisions are made"].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-[var(--color-text)] text-sm font-bold uppercase tracking-widest">
                        <Check className="w-4 h-4 text-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Visual Representation of Transformation */}
            <motion.div 
              initial={{ opacity: 0.8, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square glass rounded-[5rem] border-white/5 overflow-hidden group shadow-2xl scale-110 origin-right bg-black"
            >
               <img 
                 src="/assets/images/autonomous_core_chip_orbit_1779097560290.png"
                 alt="Autonomous Core Architecture"
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

               <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end gap-10">
                  <div className="flex flex-col gap-2">
                     <span className="text-[10px] font-mono text-primary/70 uppercase tracking-widest">Logic_Throughput_Peak</span>
                     <span className="text-xl font-bold text-white tracking-widest">98.40%</span>
                  </div>
                  <div className="flex flex-col gap-2 text-right">
                     <span className="text-[10px] font-mono text-primary/70 uppercase tracking-widest">Architecture_Sync</span>
                     <span className="text-xl font-bold text-primary uppercase tracking-[0.3em]">ACTIVE</span>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTEGRATED INDUSTRY EXPLORER SECTION */}
      <IndustryExplorer />

      {/* 6. SYSTEMS COMPARISON: LEGACY VS IPDM */}
      <section className="py-32 px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Systems Directory Section */}
          <div className="mb-32">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
              <div className="max-w-3xl">
                <div className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.5em] mb-6 flex items-center gap-4">
                  <div className="w-12 h-px bg-primary/20" /> Technical Inventory
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-7xl font-display font-bold text-[var(--color-text)] mb-8 tracking-tighter leading-tight">IPDM Architecture <span className="text-gradient-vibrant italic pr-2">Systems Index™</span></h2>
                <p className="text-zinc-500 light:text-zinc-800 text-xl leading-relaxed max-w-2xl font-medium">
                  Access the full directory of proprietary AI architectures designed to unify your enterprise intelligence layers.
                </p>
              </div>
              
              <div className="relative group w-full lg:w-[450px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-500 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search systems, roles, or capabilities..."
                  className="w-full bg-[var(--color-text)]/[0.03] border-2 border-[var(--color-text)]/5 rounded-[2rem] py-6 pl-16 pr-8 text-[var(--color-text)] placeholder:text-zinc-500 focus:outline-none focus:border-primary/30 focus:bg-[var(--color-text)]/[0.05] transition-all backdrop-blur-3xl text-lg font-display placeholder:italic transition-colors duration-1000"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredSystems.map((system, i) => (
                  <motion.div
                    layout
                    key={system.name}
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: (i % 3) * 0.1, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="glass p-10 rounded-[3.5rem] border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden flex flex-col min-h-[480px] bg-white/[0.01]"
                  >
                    {/* Animated Border Beam */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 border border-primary/20 rounded-[3.5rem]" />
                      <motion.div 
                        animate={{ 
                          left: ["0%", "100%", "0%"],
                          top: ["0%", "0%", "100%", "100%", "0%"]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute w-20 h-px bg-primary blur-[2px]"
                      />
                    </div>

                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.1] transition-all pointer-events-none grayscale group-hover:grayscale-0 group-hover:scale-110 duration-700">
                      {React.isValidElement(system.icon) ? React.cloneElement(system.icon as React.ReactElement<any>, { className: "w-32 h-32" }) : system.icon}
                    </div>
                    
                    <div className="flex items-start justify-between mb-12">
                      <div className="p-5 rounded-3xl bg-white/5 text-primary border border-white/5 group-hover:border-primary/20 group-hover:bg-primary/10 transition-all">
                        {system.icon}
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono font-black text-zinc-600 uppercase tracking-widest block mb-1">State</span>
                        <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest flex items-center justify-end gap-1.5">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> PRODUCTION_READY
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-10 transition-colors duration-1000">
                      <h4 className="text-3xl font-bold font-display text-[var(--color-text)] mb-2 leading-tight tracking-tight group-hover:text-primary transition-colors duration-1000"><Trademark text={system.name} /></h4>
                      <p className="text-[10px] font-mono font-black text-zinc-500 dark:text-zinc-600 uppercase tracking-[0.3em] italic transition-colors duration-1000">{system.role}</p>
                    </div>
                    
                    <p className="text-zinc-500 dark:text-zinc-400 light:text-zinc-800 text-base leading-relaxed mb-10 flex-1 font-medium group-hover:text-[var(--color-text)] transition-colors duration-1000">
                      {system.desc}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-10 transition-colors duration-1000">
                      {Object.entries(system.stats).map(([key, val], idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/5 light:border-black/10 group-hover:bg-[var(--color-text)]/[0.05] transition-colors duration-1000">
                          <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-600 light:text-zinc-700 transition-colors duration-1000 uppercase tracking-wider mb-1">{key}</p>
                          <p className="text-xs font-bold text-[var(--color-text)] tracking-widest transition-colors duration-1000">{val}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-10 transition-colors duration-1000">
                      {system.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-text)]/10 dark:border-white/10 light:border-black/10 text-zinc-500 dark:text-zinc-400 light:text-zinc-700 group-hover:text-primary transition-colors uppercase tracking-wider transition-colors duration-1000">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-8 border-t border-[var(--color-text)]/5 flex flex-col gap-4 transition-colors duration-1000">
                      <button 
                        onClick={() => onNavigateEngine(system.name)}
                        className="text-[11px] font-mono font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all pr-2 dark:hover:text-white light:hover:text-blue-900"
                      >
                        View Technical Details <ArrowRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={openCalendly}
                        className="text-[11px] font-mono font-black text-zinc-500 light:text-zinc-700 uppercase tracking-wider flex items-center gap-2 hover:text-primary transition-colors pr-2 transition-colors duration-1000"
                      >
                        Deploy Engine
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-24 items-start">
            
            {/* Left: Comparison Cards with extra space */}
            <div className="grid gap-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass p-12 rounded-[4rem] border-white/5 relative overflow-hidden group hover:bg-white/[0.02] transition-all"
              >
                <div className="absolute top-0 right-0 p-12 text-[8rem] font-display font-black text-white/[0.01] uppercase leading-none pointer-events-none">Legacy</div>
                <div className="relative z-10">
                  <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-600 font-bold uppercase tracking-[0.5em] mb-8 flex items-center gap-6 transition-colors duration-1000">
                    <div className="w-12 h-px bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-500" /> Current Landscape
                  </div>
                  <h3 className="text-4xl font-bold font-display text-zinc-500 dark:text-zinc-400 light:text-zinc-600 mb-10 italic transition-colors duration-1000">Most organizations use AI as:</h3>
                  <div className="grid grid-cols-1 gap-6 transition-colors duration-1000">
                    {["Chatbots", "Assistants", "Standalone tools"].map((text, i) => (
                      <div key={i} className="flex items-center gap-6 text-zinc-500 dark:text-zinc-600 light:text-zinc-700 font-medium transition-colors duration-1000">
                        <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-800" />
                        <span className="text-lg">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass p-12 rounded-[4rem] border-primary/30 bg-primary/[0.03] shadow-[0_0_60px_rgba(var(--primary-rgb),0.05)] relative overflow-hidden group transition-all"
              >
                <div className="absolute top-0 right-0 p-12 text-[8rem] font-display font-black text-primary/5 uppercase leading-none pointer-events-none">System</div>
                <div className="relative z-10">
                  <div className="text-[11px] font-mono text-primary font-bold uppercase tracking-[0.5em] mb-8 flex items-center gap-6">
                    <div className="w-12 h-px bg-primary/20" /> IPDM Core Standard
                  </div>
                  <h3 className="text-4xl font-bold font-display text-[var(--color-text)] mb-12 italic tracking-tight transition-colors duration-1000">IPDM builds AI as:</h3>
                  <div className="grid grid-cols-1 gap-8">
                    {[
                      { text: "Operational systems", desc: "Autonomous infrastructure clusters" },
                      { text: "Decision engines", desc: "Deterministic logical reasoners" },
                      { text: "Multi-agent architectures", desc: "Coordinated systems for complex logic" }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-8 transition-colors duration-1000">
                        <div className="mt-1 w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 transition-colors duration-1000">
                          <Check className="w-5 h-5" />
                        </div>
                        <div className="transition-colors duration-1000">
                          <span className="text-2xl font-bold text-[var(--color-text)] uppercase tracking-tighter block leading-none transition-colors duration-1000">{item.text}</span>
                          <p className="text-sm text-zinc-500 light:text-zinc-700 font-mono italic mt-2 uppercase tracking-widest transition-colors duration-1000">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Architectural Detail */}
            <div className="lg:sticky lg:top-48 flex flex-col gap-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-xs font-mono font-black text-secondary uppercase tracking-[0.8em] mb-8">Architectural_Shift</div>
                <h2 className="font-display font-bold text-4xl lg:text-5xl leading-tight tracking-tighter mb-10 italic">
                  Systems Over <br />
                  <span className="text-zinc-400 dark:text-zinc-700 not-italic transition-colors duration-1000">Fragmented Tools</span>
                </h2>
                <div className="space-y-10 text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-xl transition-colors duration-1000">
                  <p>
                    Transitioning from AI assistance to AI operation requires a fundamental shift in architecture. We don't just "add" AI; we engineer systems that take ownership of outcomes.
                  </p>
                  <p>
                    IPDM Intelligence units are built to eliminate process latency, providing your organization with a <span className="text-[var(--color-text)] font-bold uppercase tracking-widest transition-colors duration-1000">deterministic cognitive advantage</span>.
                  </p>
                </div>
              </motion.div>

              <div className="glass p-12 rounded-[3.5rem] border-white/5 bg-[var(--color-bg)] relative overflow-hidden shadow-2xl transition-colors duration-1000">
                <div className="absolute inset-0 bg-grid opacity-10" />
                <div className="relative z-10 flex flex-col gap-8">
                   <div className="flex justify-between items-start">
                      <div>
                         <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-600 uppercase tracking-widest mb-2 transition-colors duration-1000">Internal_Logic</div>
                         <div className="text-2xl font-bold text-[var(--color-text)] tracking-widest transition-colors duration-1000">AUTONOMOUS_MESH</div>
                      </div>
                      <Cpu className="w-8 h-8 text-secondary/40" />
                   </div>
                   <div className="grid grid-cols-4 gap-4">
                      {[...Array(8)].map((_, i) => (
                        <motion.div 
                          key={i}
                          className="w-full h-1 bg-secondary/30 rounded-full" 
                        />
                      ))}
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 dark:text-zinc-700 uppercase tracking-widest transition-colors duration-1000">
                      <span>SYNC: COMPLETED</span>
                      <span className="text-secondary/50 font-black">99.99%_ACCURACY</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

             <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="mt-20 pt-8 border-t border-[var(--color-text)]/5 relative flex items-center justify-center"
             >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                   <motion.h2 
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 0.15 }}
                     viewport={{ once: false }}
                     className="font-display font-bold text-xl sm:text-4xl md:text-6xl lg:text-7xl tracking-[0.2em] uppercase italic text-[var(--color-text)]"
                   >
                      THE SYSTEM <span className="not-italic">OPERATES.</span>
                   </motion.h2>
                </div>
             </motion.div>

    </div>
  );
}
