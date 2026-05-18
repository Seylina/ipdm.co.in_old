import React, { useState, useEffect } from 'react';
import { openMeeting as openCalendly } from '../lib/calendly';
import { contactIPDM } from '../lib/contact';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Trademark } from './Trademark';
import { 
  ArrowLeft, 
  Cpu, 
  Target, 
  Workflow, 
  Settings, 
  Layers, 
  Lightbulb, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Globe,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Microscope,
  Network,
  Users,
  X,
  Info
} from 'lucide-react';

// Moved declarations to the top to ensure they are available
const CheckCircle2 = (props: any) => <ShieldCheck {...props} />;
const XCircle = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
  </svg>
);
const Brain = (props: any) => <Cpu {...props} />;

const LogicGrid = ({ mouseX, mouseY }: { mouseX?: any, mouseY?: any }) => {
  const x = useTransform(mouseX || 0, [0, 2000], [5, -5]);
  const y = useTransform(mouseY || 0, [0, 2000], [5, -5]);

  return (
    <motion.div 
      style={{ x, y }}
      className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="logic-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1" fill="rgba(34,211,238,0.5)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#logic-grid)" />
      </svg>
    </motion.div>
  );
};

const Orb = ({ color, size, top, left, delay, mouseX, mouseY }: { color: string, size: string, top: string, left: string, delay: number, mouseX?: any, mouseY?: any }) => {
  const xMovement = useTransform(mouseX || 0, [0, 2000], [20, -20]);
  const yMovement = useTransform(mouseY || 0, [0, 2000], [20, -20]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        scale: [1, 1.2, 1],
      }}
      style={{ 
        top, 
        left,
        x: xMovement,
        y: yMovement
      }}
      transition={{ duration: 8, repeat: Infinity, delay }}
      className={`absolute blur-[100px] pointer-events-none rounded-full ${color} ${size}`}
    />
  );
};

const MouseSpotlight = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const spotlightX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const spotlightY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  return (
    <motion.div
      style={{
        x: spotlightX,
        y: spotlightY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="fixed pointer-events-none z-[1] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen opacity-50"
    />
  );
};

export function CompanyPage({ onNavigate }: { onNavigate: (page: 'home' | 'advisory' | 'ai-systems' | 'about' | 'pricing' | 'policies' | 'dashboard' | 'ecosystem' | 'supporta' | 'strategos' | 'simulate' | 'core' | 'engage' | 'evolve' | 'flow' | 'core-intel' | 'decision-modeling' | 'revenue-growth' | 'brand-content' | 'knowledge-research' | 'ops-automation' | 'cust-experience' | 'adv-strategic' | 'queries-guiding') => void }) {
  const [activeModal, setActiveModal] = useState<{title: string, content: string[], icon: any} | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const bgX1 = useTransform(smoothX, [0, 2000], [50, -50]);
  const bgY1 = useTransform(smoothY, [0, 2000], [50, -50]);
  const bgX2 = useTransform(smoothX, [0, 2000], [-30, 30]);
  const bgY2 = useTransform(smoothY, [0, 2000], [-30, 30]);

  const capabilityStack = [
    {
      id: "1", title: "Strategic Advisory",
      list: ["Model-driven decision systems", "Financial, mathematical, and economic modeling"],
      details: "We provide high-level mathematical and economic frameworks that guide core business decisions, ensuring every move is backed by logic and data-driven projections.",
      icon: <Zap />
    },
    {
      id: "2", title: "AI Systems",
      list: ["Custom Decision Nodes", "Multi-agent Coordination", "Enterprise Operating Core"],
      details: "Development of proprietary AI architectures including agentic workflows and specialized LLMs designed to manage complex business operations autonomously.",
      icon: <Cpu />
    },
    {
      id: "3", title: "Digital Transformation",
      list: ["Process re-engineering", "System consolidation", "Enterprise platforms"],
      details: "Modernizing legacy infrastructure by unifying fragmented digital touchpoints into a cohesive, intelligent platform that scales with business growth.",
      icon: <Globe />
    },
    {
      id: "4", title: "Execution",
      list: ["Deployment frameworks", "Governance systems", "Continuous optimization (IPDM EVOLVE™)"],
      details: "Rigorous deployment cycles and ongoing maintenance protocols that ensure your intelligent systems evolve alongside changing market dynamics.",
      icon: <Workflow />
    }
  ];

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen pt-20 selection:bg-primary/30 font-sans overflow-x-hidden transition-colors duration-1000">
      <MouseSpotlight mouseX={smoothX} mouseY={smoothY} />
      {/* Pop-up Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-[var(--color-bg)]/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl glass p-8 md:p-12 rounded-[3.5rem] border-[var(--color-text)]/10 shadow-2xl transition-colors duration-1000"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-8 right-8 text-zinc-500 hover:text-[var(--color-text)] transition-colors transition-colors duration-1000"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-4 mb-8 transition-colors duration-1000">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-colors duration-1000">
                  {React.cloneElement(activeModal.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter text-[var(--color-text)] transition-colors duration-1000">{activeModal.title}</h3>
              </div>
              
              <p className="text-xl text-zinc-500 dark:text-zinc-300 mb-8 font-medium leading-relaxed italic transition-colors duration-1000">
                {activeModal.content[0]}
              </p>
              
              <div className="space-y-4 transition-colors duration-1000">
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] transition-colors duration-1000">Key Components</p>
                <div className="grid gap-3">
                  {activeModal.content.slice(1).map((item, i) => (
                    <div key={i} className="flex gap-4 items-center p-4 rounded-xl bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/5 transition-colors duration-1000">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-[var(--color-text)] font-bold transition-colors duration-1000">
                        <Trademark text={item} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Animated Background Graphics */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          style={{ x: bgX1, y: bgY1 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1],
          }}
          style={{ x: bgX2, y: bgY2 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[900px] h-[900px] bg-secondary/10 rounded-full blur-[150px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          style={{ x: bgX1, y: bgY2 }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-500/5 rounded-full blur-[200px]"
        />
        <motion.div 
          animate={{ 
            rotate: [0, 90, 180, 270, 360]
          }}
          style={{ x: bgX2, y: bgY1 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px] mix-blend-screen"
        />
      </div>

      {/* HEADER SECTION: ABOUT IPDM */}
      <section className="relative pt-20 md:pt-32 pb-24 md:pb-40 px-6 overflow-hidden">
        <LogicGrid mouseX={smoothX} mouseY={smoothY} />
        <Orb color="bg-primary/20" size="w-[500px] h-[500px]" top="-10%" left="60%" delay={0} mouseX={smoothX} mouseY={smoothY} />
        <Orb color="bg-blue-600/10" size="w-[600px] h-[600px]" top="40%" left="-10%" delay={2} mouseX={smoothX} mouseY={smoothY} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center gap-3 px-6 py-2 glass rounded-full border-primary/20 mb-12 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
             >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.4em]">Corporate Intelligence Node</span>
             </motion.div>
             
             <div className="mb-4">
               <span className="text-[10px] md:text-xs font-mono font-black text-zinc-500 uppercase tracking-[0.5em]">Infinite Potential Digital Marketing Pvt Ltd</span>
             </div>
             <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl lg:text-[7.5rem] leading-[1.05] tracking-[calc(-0.04em)] mb-16 text-[var(--color-text)]">
               Architecting <br />
               <span className="text-gradient-vibrant italic">Infinite Potential<Trademark className="text-[0.4em] ml-1" /></span>
             </h1>
             
             <div className="max-w-4xl mx-auto">
               <p className="text-lg sm:text-2xl md:text-3xl text-zinc-400 dark:text-zinc-400 light:text-zinc-800 leading-tight font-medium mb-12 transition-colors duration-1000">
                 IPDM is an AI-first technology engine. We don&apos;t just build tools; we engineer the <span className="text-[var(--color-text)]">autonomous strategic cores</span> that redefine enterprise capability.
               </p>
               
               <div className="flex flex-wrap justify-center gap-6 mt-12">
                  <div className="px-6 py-3 glass rounded-2xl border-white/5 flex items-center gap-3 group hover:border-primary/30 transition-all">
                    <div className="text-primary"><Globe size={18} /></div>
                    <span className="text-xs font-mono font-black uppercase tracking-widest text-zinc-500 group-hover:text-[var(--color-text)] transition-colors">Global Operations</span>
                  </div>
                  <div className="px-6 py-3 glass rounded-2xl border-white/5 flex items-center gap-3 group hover:border-primary/30 transition-all">
                    <div className="text-primary"><ShieldCheck size={18} /></div>
                    <span className="text-xs font-mono font-black uppercase tracking-widest text-zinc-500 group-hover:text-[var(--color-text)] transition-colors">Tier-1 Security</span>
                  </div>
                  <div className="px-6 py-3 glass rounded-2xl border-white/5 flex items-center gap-3 group hover:border-primary/30 transition-all">
                    <div className="text-primary"><Zap size={18} /></div>
                    <span className="text-xs font-mono font-black uppercase tracking-widest text-zinc-500 group-hover:text-[var(--color-text)] transition-colors">Real-time Logic</span>
                  </div>
               </div>
             </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </section>

      {/* CORE IDENTITY - REVOLUTIONARY GRID */}
      <section className="py-16 md:py-32 px-6 relative overflow-hidden bg-[var(--color-text)]/[0.03] transition-colors duration-1000">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-12"
            >
              <div>
                <div className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.5em] mb-6 block">Structural Foundations</div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl leading-tight tracking-tighter mb-8">
                  The IPDM <br /><span className="text-gradient-primary">Multiverse.</span>
                </h2>
                <p className="text-xl sm:text-2xl text-zinc-500 dark:text-zinc-500 light:text-zinc-800 leading-relaxed max-w-xl transition-colors duration-1000">
                  We operate at the convergence of four critical intelligence dimensions, creating a unified ecosystem of <span className="text-[var(--color-text)]">unstoppable growth.</span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Artificial Intelligence", desc: "Agentic reasoning & neural engagement models.", icon: <Cpu />, color: "border-blue-500/20" },
                  { title: "Systems Engineering", desc: "High-available, distributed digital infrastructure.", icon: <Settings />, color: "border-indigo-500/20" },
                  { title: "Business Strategy", desc: "Predictive modeling and economic simulation.", icon: <Target />, color: "border-emerald-500/20" },
                  { title: "Platform Execution", desc: "Rapid deployment of scalable tech stacks.", icon: <Workflow />, color: "border-rose-500/20" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, y: -5, backgroundColor: "rgba(255,255,255,0.03)" }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 md:p-10 glass rounded-[2rem] md:rounded-[2.5rem] border ${item.color} group transition-all h-full`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-text)]/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all transition-colors duration-1000">
                      {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28 })}
                    </div>
                    <h4 className="font-display font-bold text-xl uppercase tracking-tighter mb-2 text-[var(--color-text)]">{item.title}</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 light:text-zinc-800 leading-relaxed font-medium transition-colors duration-1000">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <div className="lg:w-1/2 relative w-full">
               <motion.div 
                 initial={{ scale: 0.8, opacity: 0, rotate: -20 }}
                 whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                 className="relative aspect-square w-full glass rounded-[2.5rem] md:rounded-[5rem] border-primary/20 bg-primary/5 p-4 md:p-1 flex items-center justify-center overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)]"
               >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.2)_0%,_transparent_70%)]" />
                  <div className="absolute inset-0 blueprint-grid opacity-10" />
                  
                  <div className="relative z-10 text-center space-y-6 md:space-y-12 px-4 md:px-12">
                     <motion.div
                       animate={{ 
                         boxShadow: ["0 0 20px rgba(34,211,238,0.2)", "0 0 80px rgba(34,211,238,0.5)", "0 0 20px rgba(34,211,238,0.2)"]
                       }}
                       transition={{ duration: 4, repeat: Infinity }}
                       className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-black border border-primary/40 flex items-center justify-center mx-auto"
                     >
                        <Network size={36} className="text-primary animate-pulse md:w-12 md:h-12" />
                     </motion.div>
                     
                     <div className="space-y-4">
                        <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.6em]">System Mission Status</div>
                        <h3 className="text-xl sm:text-2xl md:text-5xl font-display font-bold text-[var(--color-text)] tracking-tighter leading-[1.1]">
                          Embedding <span className="text-primary italic">Intelligence</span> <br />at the Core of Operation.
                        </h3>
                     </div>

                     <div className="flex justify-center gap-2">
                        {[...Array(5)].map((_, i) => (
                           <motion.div 
                             key={i}
                             animate={{ height: [4, 20, 4] }}
                             transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                             className="w-1 bg-primary/40 rounded-full"
                           />
                        ))}
                     </div>
                  </div>
               </motion.div>

               {/* Decorative floating bits */}
               <motion.div 
                 animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
                 transition={{ duration: 10, repeat: Infinity }}
                 className="absolute -top-10 -right-10 px-8 py-6 glass rounded-full border-primary/20 shadow-2xl backdrop-blur-3xl hidden xl:block"
               >
                  <div className="text-[10px] font-mono text-cyan-500 font-bold uppercase tracking-widest mb-1">Data Ingestion</div>
                  <div className="text-xs font-bold text-[var(--color-text)] uppercase">100k+ TPS</div>
               </motion.div>
               <motion.div 
                 animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
                 transition={{ duration: 12, repeat: Infinity, delay: 1 }}
                 className="absolute -bottom-10 -left-10 px-8 py-6 glass rounded-full border-blue-500/20 shadow-2xl backdrop-blur-3xl hidden xl:block"
               >
                  <div className="text-[10px] font-mono text-blue-500 font-bold uppercase tracking-widest mb-1">Latency Sync</div>
                  <div className="text-xs font-bold text-[var(--color-text)] uppercase">Sub Millisecond</div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL DNA SECTION - THE RECURSIVE ENGINE */}
      <section className="py-32 px-6 relative overflow-hidden bg-[var(--color-bg)] transition-colors duration-1000">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(34,211,238,0.1)_0%,_transparent_50%)]" />
        <div className="max-w-7xl mx-auto">
          <div className="glass p-6 md:p-32 rounded-[2rem] md:rounded-[5rem] border-[var(--color-text)]/5 bg-[var(--color-text)]/[0.02] relative overflow-hidden group transition-colors duration-1000">
             <div className="absolute inset-0 blueprint-grid opacity-10" />
             
             <div className="grid lg:grid-cols-2 gap-32 items-center relative z-10 transition-colors duration-1000">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                   <div className="text-[10px] font-mono font-black text-secondary uppercase tracking-[0.6em] mb-8 bg-secondary/10 px-4 py-1 rounded inline-block">Core DNA: Recursive Logic</div>
                   <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-10 tracking-tighter leading-tight text-[var(--color-text)] transition-colors duration-1000">
                     The <span className="text-gradient-secondary italic">Recursive</span> <br />Logic Engine
                   </h2>
                   <p className="text-base sm:text-l md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-12 max-w-md transition-colors duration-1000">
                     We don&apos;t build software. We engineer <span className="text-[var(--color-text)] font-bold underline decoration-secondary/30 underline-offset-8 transition-colors duration-1000">self-optimizing logic cores</span> that evolve autonomously with your enterprise data.
                   </p>
                   <div className="flex flex-wrap gap-4 transition-colors duration-1000">
                      {["Deterministic Modeling", "Enterprise Scale", "High Fidelity"].map((word, i) => (
                        <div key={i} className="px-5 py-2 rounded-xl bg-[var(--color-bg)] border border-[var(--color-text)]/10 text-[10px] font-mono font-black text-zinc-500 transition-colors duration-1000 uppercase tracking-widest hover:text-secondary hover:border-secondary/30 transition-all cursor-default">
                          {word}
                        </div>
                      ))}
                   </div>
                </motion.div>

                <div className="relative aspect-square flex items-center justify-center">
                   {/* Animated Logic Core Graphic */}
                   <div className="relative w-full h-full max-w-[500px]">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-secondary/20 rounded-full shadow-[0_0_50px_rgba(34,211,238,0.05)]"
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-16 border border-primary/10 rounded-full"
                      />
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="relative">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.05, 1],
                                boxShadow: ["0 0 40px rgba(59,130,246,0.2)", "0 0 100px rgba(59,130,246,0.6)", "0 0 40px rgba(59,130,246,0.2)"]
                              }}
                              transition={{ duration: 4, repeat: Infinity }}
                              className="w-48 h-48 bg-secondary/10 rounded-[3rem] backdrop-blur-3xl border border-secondary/40 flex items-center justify-center relative overflow-hidden"
                            >
                               <div className="absolute inset-0 bg-grid opacity-20" />
                               <Network className="w-20 h-20 text-secondary z-10" />
                            </motion.div>
                            
                            {/* Orbiting data points */}
                            {[...Array(8)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: i * 2 }}
                                className="absolute inset-0 pointer-events-none"
                              >
                                <div 
                                  className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-secondary rounded-full shadow-[0_0_20px_#22d3ee]"
                                  style={{ transform: `rotate(${i * 45}deg) translateY(-180px)` }}
                                />
                              </motion.div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM - DIAGNOSTIC OVERLAY */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-3xl px-1">
              <div className="text-[10px] font-mono font-black text-red-500 uppercase tracking-[0.4em] mb-6">Market Diagnostic</div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-[var(--color-text)] mb-8 tracking-tighter leading-tight">The Systemic <br /><span className="text-gradient-secondary">Mismatch.</span></h2>
              <p className="text-2xl text-zinc-500 leading-relaxed">
                Legacy digital infrastructure was built for presence, not performance. In an AI-first world, this creates a catastrophic structural gap.
              </p>
            </div>
            <div className="flex gap-2">
               {[...Array(5)].map((_, i) => (
                 <div key={i} className={`h-8 w-1.5 rounded-full ${i < 3 ? 'bg-red-500/50' : 'bg-zinc-800'}`} />
               ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-1 px-1">
             <div className="space-y-1">
                {[
                  { label: "STATIC ASSET MODE", text: "Websites function as one-way information dumps." },
                  { label: "ISOLATED TOOL SYNDROME", text: "AI is implemented as fragmented, non-communicating tools." },
                  { label: "FRAGMENTED ECOSYSTEM", text: "Systems are scattered across incompatible tech stacks." },
                  { label: "INTUITION DEPENDENCY", text: "Core decisions still rely on high-variance human heuristics." }
                ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.05)", x: 10 }}
                    className="p-6 md:p-12 glass border border-white/5 border-l-red-500/30 group transition-all cursor-default"
                    >
                    <div className="text-[11px] font-mono font-black text-zinc-700 mb-4 group-hover:text-red-500 transition-colors uppercase tracking-wider">{item.label}</div>
                    <p className="text-lg sm:text-2xl font-display font-bold text-zinc-400 group-hover:text-[var(--color-text)] transition-colors">{item.text}</p>
                  </motion.div>
                ))}
             </div>

             <div className="bg-[var(--color-bg)] p-6 md:p-24 border border-[var(--color-text)]/5 flex flex-col justify-between relative overflow-hidden transition-colors duration-1000">
                <div className="absolute top-0 right-0 p-12 text-[10px] font-mono text-zinc-500 transition-colors duration-1000">Latency Offline</div>
                <div className="space-y-12 relative z-10 transition-colors duration-1000">
                   <div className="w-16 h-1 bg-red-500/50" />
                   <p className="text-xl sm:text-2xl md:text-4xl font-display font-bold text-[var(--color-text)] leading-tight tracking-tighter italic transition-colors duration-1000">
                     Conclusion: Modern business needs have <span className="text-zinc-500 dark:text-zinc-600 transition-colors duration-1000">outpaced the architecture</span> of traditional digital providers.
                   </p>
                </div>
                
                <div className="mt-20 flex items-center gap-6 pt-12 border-t border-[var(--color-text)]/5 transition-colors duration-1000">
                   <div className="flex-1 h-px bg-[var(--color-text)]/10" />
                   <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-700 uppercase tracking-widest transition-colors duration-1000">Structural Incompatibility Detected</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* OUR RESPONSE - SYSTEM REDEFINITION */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_rgba(34,211,238,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(139,92,246,0.08)_0%,_transparent_50%)]" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-24">
             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:w-3/5"
             >
               <div className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.4em] mb-8">Solution Architecture</div>
               <h2 className="font-display font-bold text-4xl md:text-6xl mb-12 tracking-tighter leading-tight">From Presence <br />to <span className="text-primary italic">Intelligence Layers.</span></h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                 {[
                   { title: "Architectural Thinking", desc: "Building systems that talk to each other.", icon: <Layers /> },
                   { title: "Core AI Embedding", desc: "Embedding intelligence at the decision node.", icon: <Cpu /> },
                   { title: "Model-Driven Frameworks", desc: "Using Bayesian logic to guide transitions.", icon: <Zap /> },
                   { title: "End-to-End Coordination", desc: "Managing the entire intelligence lifecycle.", icon: <Workflow /> }
                 ].map((item, i) => (
                   <div key={i} className="p-8 glass rounded-3xl border border-white/5 hover:border-primary/20 transition-all group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-all mb-6">
                         {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
                      </div>
                      <h4 className="text-lg font-bold text-[var(--color-text)] mb-2">{item.title}</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                   </div>
                 ))}
              </div>

              <div className="p-10 glass rounded-[3rem] border border-primary/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-2xl md:text-4xl font-display font-bold text-[var(--color-text)] tracking-tighter leading-tight relative z-10">
                  "We do not improve existing systems. <br />
                  <span className="text-primary italic font-display">We redefine how systems are built."</span>
                </p>
              </div>
            </motion.div>

            <div className="lg:w-2/5 relative">
               {/* Visual representation of layers */}
                <div className="space-y-4">
                  {[
                    { label: "INTELLIGENCE LAYER", color: "bg-primary", height: "h-32" },
                    { label: "LOGIC PROTOCOL", color: "bg-primary/60", height: "h-24" },
                    { label: "DATA SUBSTRATE", color: "bg-primary/20", height: "h-16" }
                  ].map((layer, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                      className={`w-full ${layer.height} glass border border-white/10 rounded-[2rem] flex items-center justify-between px-10 relative overflow-hidden group hover:border-primary/40`}
                    >
                       <div className={`absolute left-0 top-0 bottom-0 w-1 ${layer.color}`} />
                       <span className="text-xs font-mono font-bold text-zinc-500 group-hover:text-[var(--color-text)] tracking-[0.2em]">{layer.label}</span>
                       <div className="text-[10px] font-mono text-zinc-800">Active</div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOT AN AGENCY - PARTNERSHIP DYNAMICS */}
      <section className="py-40 px-6 bg-[var(--color-bg)] border-y border-[var(--color-text)]/5 relative overflow-hidden transition-colors duration-1000">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-opacity duration-1000" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
             <div className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.6em] mb-8">Engagement Protocol</div>
             <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tighter leading-tight px-4 text-[var(--color-text)] transition-colors duration-1000">Not an Agency. <br /><span className="text-zinc-400 dark:text-zinc-800 transition-colors duration-1000">Not a Vendor.</span></h2>
             <p className="text-2xl text-zinc-500 dark:text-zinc-400 mt-10 max-w-3xl mx-auto transition-colors duration-1000">
               We move beyond transactional relationships to become a <span className="text-primary italic">System Partner</span>—embedded in your engineering and strategic core.
             </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-1 px-1 max-w-5xl mx-auto transition-colors duration-1000">
             <div className="p-16 glass border border-[var(--color-text)]/5 bg-[var(--color-text)]/[0.02] opacity-40 grayscale group hover:opacity-100 hover:grayscale-0 transition-all duration-700 transition-colors duration-1000">
                <h4 className="text-zinc-600 font-mono font-black uppercase tracking-[0.3em] mb-12 transition-colors duration-1000">OUTSOURCED VENDORS</h4>
                <div className="space-y-6">
                   {["Focus on isolated deliverables", "Operate in knowledge silos", "Exit after deployment"].map((txt, i) => (
                      <div key={i} className="flex gap-4 text-zinc-500 font-medium items-center transition-colors duration-1000">
                         <div className="w-4 h-px bg-red-500/30" />
                         <span className="text-sm uppercase tracking-widest">{txt}</span>
                      </div>
                   ))}
                </div>
             </div>

             <div className="p-16 glass border border-primary/30 bg-primary/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8">
                   <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <h4 className="text-primary font-mono font-black uppercase tracking-[0.3em] mb-12">IPDM SYSTEM PARTNER</h4>
                <div className="space-y-6">
                   {["Design the architecture", "Build the infrastructure", "Deploy the intelligence", "Operate the core"].map((txt, i) => (
                      <div key={i} className="flex gap-4 text-[var(--color-text)] font-black items-center">
                         <div className="w-4 h-px bg-primary" />
                         <span className="text-sm uppercase tracking-[0.2em]">{txt}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY - PRINCIPLE NODES */}
       <section className="py-40 px-6 relative">
        <motion.div 
          style={{ x: bgX2, y: bgY1 }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" 
        />
        <div className="max-w-7xl mx-auto">
          <div className="mb-32 text-center">
             <div className="text-[10px] font-mono font-black text-secondary/60 uppercase tracking-[0.4em] mb-8">System Philosophies</div>
             <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tighter leading-tight px-4">Principles that <br /><span className="text-gradient-vibrant italic">Guide Evolution.</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
             {[
               {
                 id: "01",
                 title: "Systems Over Features",
                 desc: "We design complete digital biomes, not isolated capabilities. Every component feeds back into the core intelligence node.",
                 icon: <Layers />,
                 color: "from-blue-600/20"
               },
               {
                 id: "02",
                 title: "Intelligence Over Automation",
                 desc: "Automation is a commodity; Intelligence is a moat. We build systems that 'understand' the context of their actions.",
                 icon: <Brain />,
                 color: "from-primary/20"
               },
               {
                 id: "03",
                 title: "Outcomes Over Activity",
                 desc: "We only measure what moves the needle. If a logic path doesn't deliver deterministic revenue growth, it is pruned.",
                 icon: <Activity />,
                 color: "from-emerald-600/20"
               }
             ].map((item, i) => (
               <motion.div 
                 key={i} 
                 whileHover={{ y: -10 }}
                 className={`p-16 glass rounded-[4rem] border border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden bg-gradient-to-br ${item.color} to-transparent to-40%`}
               >
                  <div className="text-[10px] font-mono font-black text-zinc-700 mb-8 tracking-widest">{item.id} / PRINCIPLE</div>
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-all mb-10">
                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}
                  </div>
                  <h3 className="text-3xl font-bold font-display uppercase tracking-tighter mb-8 leading-tight text-[var(--color-text)] group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-lg text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                  
                  {/* Decorative corner accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="py-24 px-6 bg-[var(--color-bg)] border-y border-[var(--color-text)]/5 relative overflow-hidden transition-colors duration-1000">
        <motion.div 
          style={{ x: bgX1, y: bgY2 }}
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" 
        />
        <motion.div 
          style={{ x: bgX2, y: bgY1 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full" 
        />
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-20 items-center transition-colors duration-1000">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                 <h3 className="text-primary font-mono text-xs font-bold uppercase tracking-[0.4em] mb-8">OUR TEAM</h3>
                 <h2 className="font-display font-bold text-4xl md:text-5xl mb-10 leading-tight tracking-tighter px-1 text-[var(--color-text)] transition-colors duration-1000">Built by a <br /><span className="text-gradient italic pr-4">High-Caliber,</span> <br /><span className="text-primary italic font-display pr-4">Multidisciplinary Team</span></h2>
                 
                 <p className="text-zinc-500 dark:text-zinc-600 font-mono text-xs uppercase tracking-widest mb-10 transition-colors duration-1000">IPDM brings together professionals with expertise in:</p>
                 
                 <div className="grid grid-cols-2 gap-4 transition-colors duration-1000">
                    {[
                      "Data Science",
                      "Mathematics",
                      "Computer Science",
                      "Economics",
                      "Systems Engineering"
                    ].map((txt, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 py-4 border-b border-[var(--color-text)]/5 group transition-colors duration-1000"
                      >
                         <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                         <span className="font-bold text-zinc-500 dark:text-zinc-400 group-hover:text-[var(--color-text)] uppercase text-xs tracking-[0.2em] transition-colors transition-colors duration-1000">{txt}</span>
                      </motion.div>
                    ))}
                 </div>
              </motion.div>

              <div className="space-y-8 transition-colors duration-1000">
                 <div className="glass p-10 rounded-[3rem] border-[var(--color-text)]/5 transition-colors duration-1000">
                    <p className="text-zinc-500 dark:text-zinc-600 font-mono text-xs uppercase tracking-[0.3em] mb-6 transition-colors duration-1000">Experience Depth</p>
                    <p className="text-xl text-zinc-500 dark:text-zinc-200 font-medium leading-relaxed mb-6 transition-colors duration-1000">The team combines:</p>
                    <ul className="space-y-4">
                       {["Experience in AI development", "Exposure to enterprise-scale systems", "Background in business strategy and growth"].map((li, i) => (
                          <li key={i} className="flex gap-4 text-zinc-500 dark:text-zinc-400 font-medium transition-colors duration-1000">
                             <ChevronRight className="w-5 h-5 text-primary shrink-0" />
                             <span>{li}</span>
                          </li>
                       ))}
                    </ul>
                 </div>

                 <div className="p-1 glass rounded-[3rem] bg-gradient-to-br from-primary/20 via-transparent to-primary/20 transition-colors duration-1000">
                  <div className="p-10 bg-[var(--color-bg)] opacity-90 backdrop-blur-3xl rounded-[2.9rem] border border-[var(--color-text)]/5 transition-colors duration-1000">
                     <p className="text-2xl font-display font-bold text-[var(--color-text)] tracking-tight leading-tight transition-colors duration-1000">
                       This combination enables us to: <br />
                       <span className="text-blue-500 dark:text-blue-400 tracking-normal transition-colors duration-1000">Understand complexity</span> <br />
                       <span className="text-blue-500 dark:text-blue-400 tracking-normal transition-colors duration-1000">Build structured systems</span> <br />
                       <span className="text-blue-500 dark:text-blue-400 tracking-normal transition-colors duration-1000">Deliver measurable outcomes</span>
                     </p>
                  </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* HOW WE OPERATE */}
      <section className="py-24 px-6 relative overflow-hidden">
        <motion.div 
          style={{ x: bgX1, y: bgY1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" 
        />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-12 leading-tight tracking-tighter px-1">Execution-Driven, <br /><span className="text-primary italic pr-4">Outcome-Focused</span></h2>
              
              <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em] mb-10">Our approach is defined by:</p>
              
              <div className="grid gap-6">
                 {[
                   { title: "Structured problem-solving", icon: <Microscope />, color: "from-blue-500/10" },
                   { title: "Quantitative modeling", icon: <TrendingUp />, color: "from-indigo-500/10" },
                   { title: "Engineering discipline", icon: <Settings />, color: "from-emerald-500/10" },
                   { title: "Continuous optimization", icon: <Activity />, color: "from-primary/10" }
                 ].map((item, i) => (
                   <motion.div 
                     key={i} 
                     whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
                     className={`flex items-center gap-8 p-8 glass rounded-[2.5rem] border-white/5 border-l-4 border-l-primary/40 bg-gradient-to-r ${item.color} to-transparent group transition-all`}
                   >
                      <div className="text-primary group-hover:rotate-12 transition-transform duration-300">
                        {React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}
                      </div>
                      <span className="text-2xl font-bold font-display uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">{item.title}</span>
                   </motion.div>
                 ))}
              </div>
           </motion.div>

           <div className="flex flex-col justify-center">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-10 md:p-14 glass rounded-[3rem] border-white/5 relative overflow-hidden bg-white/[0.01] shadow-2xl"
              >
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px]" />
                 <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.4em] mb-8">Operating Model</p>
                 <div className="space-y-8">
                    {[
                      { l: "End-to-end ownership", icon: <ShieldCheck /> },
                      { l: "Integrated delivery", icon: <Workflow /> },
                      { l: "Long-term system evolution", icon: <Network /> }
                    ].map((m, i) => (
                       <motion.div 
                         key={i} 
                         initial={{ opacity: 0, y: 10 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: i * 0.1 }}
                         className="flex items-center gap-5 group"
                       >
                          <div className="text-zinc-600 group-hover:text-primary transition-colors duration-300">
                            {React.cloneElement(m.icon as React.ReactElement<any>, { size: 24 })}
                          </div>
                          <span className="text-xl md:text-2xl font-display font-bold tracking-tighter text-zinc-400 italic group-hover:text-[var(--color-text)] transition-colors duration-300 uppercase leading-none">{m.l}</span>
                       </motion.div>
                    ))}
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* CAPABILITY STACK - RECURSIVE LAYOUT */}
      <section className="py-16 md:py-40 px-6 border-y border-[var(--color-text)]/5 bg-[var(--color-bg)] relative overflow-hidden transition-colors duration-1000">
        <div className="absolute inset-0 bg-grid opacity-5" />
        <div className="max-w-7xl mx-auto text-center mb-16 md:mb-32 transition-colors duration-1000">
           <div className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.6em] mb-8">System_Architecture_Stack</div>
           <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl tracking-tighter leading-tight px-4 text-[var(--color-text)] transition-colors duration-1000">Our Intelligence <br /><span className="text-primary italic">Architecture.</span></h2>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4 transition-colors duration-1000">
           {capabilityStack.map((stack, i) => (
             <motion.div 
               key={i} 
               whileHover={{ y: -5, backgroundColor: "rgba(34,211,238,0.02)" }}
               onClick={() => setActiveModal({
                 title: stack.title,
                 content: [stack.details, ...stack.list],
                 icon: stack.icon
               })}
               className="p-6 md:p-12 glass border border-[var(--color-text)]/5 relative group hover:border-primary/40 transition-all flex flex-col h-full cursor-pointer overflow-hidden transition-colors duration-1000"
             >
                <div className="text-[11px] font-mono font-black text-zinc-500 dark:text-zinc-700 mb-12 tracking-wider transition-colors duration-1000">NODE_{stack.id} // CONFIG</div>
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 flex items-center justify-center text-zinc-500 dark:text-zinc-600 mb-12 group-hover:text-primary transition-all duration-500 transition-colors duration-1000">
                   {React.cloneElement(stack.icon as React.ReactElement<any>, { size: 28 })}
                </div>
                <h3 className="text-2xl font-bold font-display mb-10 uppercase tracking-tighter leading-[0.9] text-[var(--color-text)] grow transition-colors duration-1000">{stack.title}</h3>
                
                <div className="mt-auto pt-10 border-t border-[var(--color-text)]/5 flex items-center justify-between transition-colors duration-1000">
                  <span className="text-[11px] font-mono font-black text-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all">View_System_Specs</span>
                  <ArrowRight size={16} className="text-zinc-400 dark:text-zinc-700 group-hover:text-primary transition-all group-hover:translate-x-1 transition-colors duration-1000" />
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* MARKET POSITION TABLE - HIGH FIDELITY */}
      <section className="py-16 md:py-40 px-6 overflow-hidden relative bg-[var(--color-bg)] transition-colors duration-1000">
        <motion.div 
          style={{ x: bgX2, y: bgY2 }}
          className="absolute top-10 right-10 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full" 
        />
        <motion.div 
          style={{ x: bgX1, y: bgY1 }}
          className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full" 
        />
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16 md:mb-32 transition-colors duration-1000">
              <div className="text-[10px] font-mono font-black text-secondary uppercase tracking-[0.5em] mb-8">Competitive_Advantage_Matrix</div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl tracking-tighter leading-tight px-4 text-[var(--color-text)] transition-colors duration-1000">Where IPDM <br /><span className="text-gradient-secondary italic">Outperforms.</span></h2>
           </div>

           <div className="overflow-x-auto pb-8 scrollbar-hide">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="min-w-[1000px] glass border border-[var(--color-text)]/10 overflow-hidden relative shadow-[0_0_100px_rgba(34,211,238,0.05)] transition-colors duration-1000"
              >
                 <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                 <table className="w-full text-left border-collapse transition-colors duration-1000">
                    <thead>
                       <tr className="border-b border-[var(--color-text)]/10 bg-[var(--color-text)]/[0.05] transition-colors duration-1000">
                          <th className="p-12 text-[10px] font-mono font-black uppercase text-zinc-500 dark:text-zinc-600 tracking-[0.5em] transition-colors duration-1000">Sector_Logic</th>
                          <th className="p-12 text-[10px] font-mono font-black uppercase text-zinc-500 tracking-[0.2em] transition-colors duration-1000">Legacy Providers</th>
                          <th className="p-12 text-[10px] font-mono font-black text-primary uppercase bg-primary/5 tracking-[0.3em] transition-colors duration-1000">IPDM Hybrid Protocol</th>
                       </tr>
                    </thead>
                    <tbody className="text-base transition-colors duration-1000">
                       {[
                         { cat: "Consulting", typical: "Static strategy decks (PowerPoint focused)", ipdm: "Live mathematical & engineering execution" },
                         { cat: "Digital Agencies", typical: "Surface-level design & narrative", ipdm: "Deep-layer system & logic intelligence" },
                         { cat: "AI Platforms", typical: "Standardized SaaS toolsets", ipdm: "Proprietary agentic Multiverse architecture" }
                       ].map((row, i) => (
                         <tr key={i} className="border-b border-[var(--color-text)]/5 group hover:bg-[var(--color-text)]/[0.01] transition-all transition-colors duration-1000">
                            <td className="p-12 font-bold font-display uppercase tracking-tight text-zinc-500 dark:text-zinc-400 group-hover:text-[var(--color-text)] transition-all text-xl transition-colors duration-1000">{row.cat}</td>
                            <td className="p-12 text-zinc-500 dark:text-zinc-600 font-medium group-hover:text-zinc-400 transition-all transition-colors duration-1000">{row.typical}</td>
                            <td className="p-12 text-[var(--color-text)] font-black italic bg-primary/[0.01] group-hover:bg-primary/[0.03] group-hover:text-primary transition-all text-lg transition-colors duration-1000">
                              <div className="flex items-center gap-4 transition-colors duration-1000">
                                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#22d3ee]" />
                                {row.ipdm}
                              </div>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </motion.div>
           </div>

           <div className="mt-20 text-center">
              <div className="inline-block p-6 md:p-10 glass border border-primary/20 bg-primary/5">
                 <p className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-[var(--color-text)] tracking-tighter uppercase leading-normal md:leading-none">
                    IPDM operates as a hybrid engine of <span className="text-primary italic">consulting, engineering, and predictive systems.</span>
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* WHY IPDM EXISTS - THE INFRASTRUCTURE MISSION */}
      <section className="py-40 px-6 bg-[var(--color-bg)] border-y border-[var(--color-text)]/5 relative overflow-hidden transition-colors duration-1000">
        <motion.div 
          style={{ x: bgX1, y: bgY2 }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" 
        />
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-32 items-center transition-colors duration-1000">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 md:p-16 glass rounded-[2rem] md:rounded-[4rem] border-[var(--color-text)]/5 relative overflow-hidden bg-primary/[0.01] transition-colors duration-1000"
              >
                 <div className="absolute top-0 right-0 p-12 text-[10px] font-mono text-zinc-500 dark:text-zinc-800 tracking-widest uppercase transition-colors duration-1000">Protocol_V_1.2</div>
                 <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl mb-6 md:mb-12 tracking-tighter leading-tight text-[var(--color-text)] transition-colors duration-1000">Designing the <br /><span className="text-gradient-vibrant italic">Intelligence Core.</span></h2>
                 
                 <p className="text-zinc-500 dark:text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-6 md:mb-12 transition-colors duration-1000">The future is not defined by:</p>
                 <div className="space-y-6 transition-colors duration-1000">
                    {["Static Web Presence", "Siloed Automations", "Incremental Gains"].map((li, i) => (
                       <div key={i} className="flex gap-6 text-zinc-500 dark:text-zinc-600 font-black text-xl sm:text-2xl uppercase tracking-tighter line-through decoration-red-500/30 transition-colors duration-1000">
                          {li}
                       </div>
                    ))}
                 </div>
              </motion.div>

              <div className="space-y-12">
                 <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-8">It is defined by:</p>
                 <div className="space-y-6">
                    {[
                      { t: "Predictive Logic", icon: <Brain />, color: "border-primary/40 shadow-neon" },
                      { t: "Dynamic Decisioning", icon: <Activity />, color: "border-secondary/40 shadow-secondary/20" },
                      { t: "Autonomous Infrastructure", icon: <Layers />, color: "border-blue-500/40 shadow-blue-500/20" }
                    ].map((item, i) => (
                       <motion.div 
                         key={i} 
                         whileHover={{ x: 10, backgroundColor: "rgba(34,211,238,0.05)" }}
                         className={`flex items-center gap-4 md:gap-8 p-6 md:p-10 glass rounded-[1.5rem] md:rounded-[2.5rem] border ${item.color} bg-white/[0.02] transition-all`}
                       >
                          <div className="text-primary">{React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}</div>
                          <span className="text-xl sm:text-3xl font-display font-bold text-[var(--color-text)] tracking-tighter uppercase">{item.t}</span>
                       </motion.div>
                    ))}
                 </div>

                 <div className="pl-12 border-l-4 border-primary mt-20">
                    <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">Core_Objective</p>
                    <p className="text-3xl md:text-4xl font-display font-bold text-[var(--color-text)] tracking-tighter italic leading-tight">To engineer the substrate <br />of absolute control.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* VISION & MISSION - THE DUAL CORES */}
      <section className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                viewport={{ once: true }}
                className="relative p-20 glass rounded-[5rem] border border-white/10 group overflow-hidden bg-gradient-to-br from-primary/10 to-transparent transition-shadow"
              >
              <div className="absolute top-0 right-0 p-12 text-[10px] font-mono text-zinc-800 tracking-widest uppercase">STRAT_V_01</div>
              <h2 className="text-zinc-500 font-display font-bold text-4xl mb-16 italic uppercase tracking-tighter group-hover:text-primary transition-colors">Vision_Protocol</h2>
              
              <div className="space-y-12">
                 {[
                   { t: "Intelligence is embedded in every business node", icon: <Cpu /> },
                   { t: "Systems operate with high-fidelity human synergy", icon: <Users /> },
                   { t: "Infinite scale through architectural logic", icon: <TrendingUp /> }
                 ].map((li, i) => (
                    <div key={i} className="flex gap-8 group/item">
                       <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-primary/40 group-hover/item:text-primary transition-all shrink-0">
                         {React.cloneElement(li.icon as React.ReactElement<any>, { size: 28 })}
                       </div>
                       <span className="text-2xl font-display font-bold tracking-tight text-[var(--color-text)]/80 leading-tight group-hover/item:text-[var(--color-text)] transition-colors uppercase pr-8 mt-2">{li.t}</span>
                    </div>
                 ))}
              </div>
           </motion.div>

             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative p-20 glass rounded-[5rem] border border-white/10 group overflow-hidden bg-gradient-to-bl from-secondary/10 to-transparent transition-shadow"
              >
              <div className="absolute top-0 left-0 p-12 text-[10px] font-mono text-zinc-800 tracking-widest uppercase">OP_EXEC_02</div>
              <h2 className="text-zinc-500 font-display font-bold text-4xl mb-16 italic uppercase tracking-tighter group-hover:text-secondary transition-colors text-right">Mission_Execution</h2>
              
              <div className="space-y-12">
                 {[
                   { t: "Replace archaic, siloed infrastructures", icon: <Layers /> },
                   { t: "Deploy proprietary agentic reasoning systems", icon: <Cpu /> },
                   { t: "Deliver verifiable, logic-backed outcomes", icon: <Activity /> }
                 ].map((li, i) => (
                    <div key={i} className="flex gap-8 group/item flex-row-reverse text-right">
                       <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-secondary/40 group-hover/item:text-secondary transition-all shrink-0">
                         {React.cloneElement(li.icon as React.ReactElement<any>, { size: 28 })}
                       </div>
                       <span className="text-2xl font-display font-bold tracking-tight text-[var(--color-text)]/80 leading-tight group-hover/item:text-[var(--color-text)] transition-colors uppercase pl-8 mt-2">{li.t}</span>
                    </div>
                 ))}
              </div>
           </motion.div>
        </div>
      </section>

      {/* CORE BELIEF - ABSOLUTE DIFFERENTIATOR */}
      <section className="py-40 px-6 relative overflow-hidden bg-[var(--color-bg)] transition-colors duration-1000">
        <div className="max-w-7xl mx-auto text-center transition-colors duration-1000">
           <div className="text-[10px] font-mono font-black text-primary/40 uppercase tracking-[0.8em] mb-20 transition-colors duration-1000">The_Fundamental_Axiom</div>
           <h3 className="font-display font-bold text-4xl md:text-6xl tracking-tight mb-20 leading-tight px-4 text-[var(--color-text)] transition-colors duration-1000">Intelligence is the <br /><span className="text-gradient-secondary italic pr-8">Only Advantage.</span></h3>
           
           <div className="max-w-5xl mx-auto p-20 glass border border-primary/20 bg-primary/5 relative group transition-colors duration-1000">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="text-2xl md:text-3xl font-display font-bold text-[var(--color-text)] tracking-tight leading-normal mb-16 uppercase transition-colors duration-1000">
                 In commoditized markets, the shift moves to: <br />
                 <span className="text-primary italic">Strategic Precision.</span> <br />
                 <span className="text-primary italic">Algorithmic Decisioning.</span> <br />
                 <span className="text-primary italic">High-Fidelity Execution.</span>
              </p>
              
              <div className="h-[1px] w-48 bg-[var(--color-text)]/10 mx-auto mb-12 transition-colors duration-1000" />
              
              <p className="text-xl font-black tracking-[0.4em] uppercase text-zinc-500 dark:text-zinc-600 transition-colors duration-1000">
                IPDM exists to engineer these advantages into your corporate DNA.
              </p>
           </div>
        </div>
      </section>

      {/* FINAL CLOSING STATEMENT */}
      <section className="py-60 px-6 relative overflow-hidden bg-[var(--color-bg)] transition-colors duration-1000">
        <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center">
           <div className="relative z-10 px-4 transition-colors duration-1000">
              <div className="text-[10px] font-mono font-black text-zinc-500 dark:text-zinc-600 uppercase tracking-[0.5em] mb-20 transition-colors duration-1000">SYSTEM_SHUTDOWN::INITIATE_PROFILES</div>
              <h3 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-tight mb-20 mix-blend-difference px-1 font-black text-[var(--color-text)] transition-colors duration-1000">
                 Think. <br />
                 Act. <br />
                 <span className="text-gradient-teal-pink italic pr-12">Improve.</span>
              </h3>
              
              <p className="text-3xl text-zinc-500 dark:text-zinc-400 font-medium max-w-4xl mx-auto leading-tight mb-24 italic opacity-80 transition-colors duration-1000">
                We are not designing for today’s constraints. <br />
                We are engineering the future of <span className="text-[var(--color-text)] border-b border-primary/30 pb-2 transition-colors duration-1000">autonomous business.</span>
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 transition-colors duration-1000">
                 <button 
                   onClick={() => contactIPDM()}
                   className="w-full md:w-auto px-8 py-5 md:px-20 md:py-10 bg-[var(--color-text)] text-[var(--color-bg)] font-black text-lg md:text-2xl uppercase tracking-[0.1em] rounded-[2rem] md:rounded-3xl hover:bg-primary transition-all duration-500 shadow-2xl group flex items-center justify-center gap-6"
                 >
                   Sync with IPDM <ArrowRight size={20} className="md:w-8 md:h-8 group-hover:translate-x-4 transition-transform duration-500" />
                 </button>
                 
                 <button 
                    onClick={() => onNavigate('ai-systems')}
                    className="w-full md:w-auto px-8 py-5 md:px-20 md:py-10 glass text-[var(--color-text)] font-black text-lg md:text-2xl uppercase tracking-[0.1em] rounded-[2rem] md:rounded-3xl border-[var(--color-text)]/5 hover:border-primary/40 transition-all duration-500 transition-colors duration-1000"
                 >
                   System Specs
                 </button>
              </div>

              <div className="mt-40 pt-20 border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                   <p className="font-mono text-xs font-black uppercase tracking-[0.5em]">IPDM::INTELLIGENCE_DELIVERED</p>
                   <div className="flex gap-8">
                      {["LOGIC_01", "NODES_DIST", "AES_READY"].map((s, i) => (
                        <div key={i} className="text-[10px] font-mono font-black text-zinc-600 uppercase tracking-widest">{s}</div>
                      ))}
                   </div>
                </div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
}
