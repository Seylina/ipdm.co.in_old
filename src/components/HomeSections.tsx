import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, Globe, Rocket, Cpu, Check, Shield, BarChart, Server, 
  Layers, Workflow, Activity, TrendingUp, ArrowRight, Sparkles, 
  Network, Layout, Database, MessageSquare, Brain, Target, 
  FileText, BarChart3, PieChart, Users, Phone, HelpCircle, 
  History, RefreshCcw, Box, Link, GitBranch, X, Info, Search, ChevronRight
} from "lucide-react";
import React, { useState } from "react";
import { openMeeting as openCalendly } from "../lib/calendly";

import { Trademark } from "./Trademark";

const IsometricBlock = ({ color = "primary", className = "" }: { color?: string, className?: string }) => {
  const colorClass = color === "primary" ? "primary" : color === "secondary" ? "secondary" : "zinc-500";
  const borderClass = color === "primary" ? "primary/40" : color === "secondary" ? "secondary/40" : "white/20";
  const bgClass = color === "primary" ? "primary/20" : color === "secondary" ? "secondary/20" : "white/5";

  return (
    <div className={`relative ${className}`} style={{ transform: 'rotateX(45deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}>
      {/* Top */}
      <div className={`absolute inset-0 bg-${bgClass} border border-${borderClass} backdrop-blur-sm shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.1)]`} style={{ transform: 'translateZ(20px)' }} />
      {/* Right */}
      <div className={`absolute top-0 right-0 w-[20px] h-full bg-${colorClass} opacity-20 border border-${borderClass}`} style={{ transform: 'rotateY(90deg) origin-right' }} />
      {/* Left */}
      <div className={`absolute bottom-0 left-0 w-full h-[20px] bg-${colorClass} opacity-10 border border-${borderClass}`} style={{ transform: 'rotateX(-90deg) origin-bottom' }} />
    </div>
  );
};

export function CredibilityStrip() {
  const team = ["Data Scientists", "Mathematicians", "Computer Scientists", "Economists"];
  const intersections = ["Artificial Intelligence", "Systems Engineering", "Business Strategy", "Scalable Technology Execution"];

  return (
    <div className="py-12 border-y border-[var(--color-text)]/5 bg-[var(--color-text)]/[0.02] transition-colors duration-1000">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 transition-colors duration-1000">Built by a high-caliber team of:</span>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4">
              {team.map((role, i) => (
                <div key={i} className="flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  <span className="text-sm font-display font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-[var(--color-text)] transition-colors duration-1000">{role}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="h-20 w-px bg-white/5 hidden md:block" />
          
          <div className="flex flex-col gap-4">
             <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 transition-colors duration-1000">From globally recognized institutions, operating at the intersection of:</span>
             <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4">
              {intersections.map((item, i) => (
                <div key={i} className="flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-secondary/40 group-hover:bg-secondary transition-colors" />
                  <span className="text-sm font-display font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-[var(--color-text)] transition-colors duration-1000">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CoreValueProp() {
  const current = ["Static interfaces", "Fragmented tools", "Reactive workflows"];
  const ipdm = ["Integrated AI systems", "Model-driven decision frameworks", "Continuous intelligence layers"];
  const systems = ["Designed", "Deployed", "Measured", "Continuously optimized"];

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl mb-8 leading-[1.2] tracking-tighter px-1">
            We Don’t Build Websites. <br />
            <span className="text-gradient-vibrant italic pr-4 inline-block">We Build Business Systems.</span>
          </h2>
          
          <div className="space-y-12">
            <div>
              <p className="text-gradient-secondary text-[11px] font-bold uppercase tracking-wider mb-4">Most organizations operate with:</p>
              <div className="space-y-3">
                {current.map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 glass rounded-3xl border-primary/20 bg-primary/[0.02]">
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">IPDM replaces this with:</p>
              <div className="space-y-3">
                {ipdm.map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-[var(--color-text)] transition-colors duration-1000">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-zinc-500 dark:text-zinc-600 text-xs font-bold uppercase tracking-widest mb-4 transition-colors duration-1000">Every system is:</p>
              <div className="flex flex-wrap gap-4">
                {systems.map((text, i) => (
                  <div key={i} className="px-4 py-2 glass rounded-xl border-white/5 text-[11px] font-mono font-bold text-zinc-500 dark:text-zinc-400 transition-colors duration-1000">
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative">
           <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full" />
           <div className="glass aspect-square rounded-[4rem] border-[var(--color-text)]/5 p-1 relative z-10 overflow-hidden">
              <div className="w-full h-full rounded-[3.8rem] bg-[var(--color-bg)] border border-[var(--color-text)]/5 overflow-hidden relative p-8 transition-colors duration-1000">
                 <div className="absolute inset-0 bg-grid opacity-[0.05]" />
                 
                 {/* Central Intelligence Core */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative group/core">
                        <motion.div 
                          animate={{ 
                            rotate: 360,
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center relative"
                        >
                            <div className="absolute inset-[-8px] rounded-full border border-primary/5 border-dashed animate-spin-slow" />
                            <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center">
                                <Cpu className="w-10 h-10 text-primary opacity-80" />
                            </div>
                        </motion.div>
                        
                        {/* Outbound Intelligence Streams */}
                        {[0, 90, 180, 270].map((angle) => (
                           <motion.div
                             key={angle}
                             className="absolute top-1/2 left-1/2 w-48 h-px bg-gradient-to-r from-primary/40 to-transparent origin-left"
                             style={{ transform: `rotate(${angle}deg)` }}
                           >
                              <motion.div 
                                animate={{ x: [0, 192] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: angle/90 }}
                                className="w-2 h-2 rounded-full bg-primary absolute -top-1 blur-sm"
                              />
                           </motion.div>
                        ))}
                    </div>
                  </div>

                  {/* Specialized Nodes */}
                  {[
                    { label: "REVENUE", icon: <TrendingUp className="w-5 h-5" />, pos: "top-8 left-8", color: "text-emerald-400", glow: "shadow-[0_0_20px_rgba(52,211,153,0.2)]" },
                    { label: "CUSTOMER", icon: <Globe className="w-5 h-5" />, pos: "top-8 right-8", color: "text-blue-400", glow: "shadow-[0_0_20px_rgba(96,165,250,0.2)]" },
                    { label: "OPERATIONS", icon: <Workflow className="w-5 h-5" />, pos: "bottom-8 left-8", color: "text-purple-400", glow: "shadow-[0_0_20px_rgba(192,132,252,0.2)]" },
                    { label: "DECISION", icon: <Activity className="w-5 h-5" />, pos: "bottom-8 right-8", color: "text-amber-400", glow: "shadow-[0_0_20px_rgba(251,191,36,0.2)]" }
                  ].map((node, i) => (
                    <motion.div
                      key={node.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      className={`absolute ${node.pos} w-32 h-32 rounded-3xl bg-zinc-900/80 border border-white/10 flex flex-col items-center justify-center gap-3 z-20 backdrop-blur-xl shadow-2xl group transition-all duration-500 hover:border-primary/50 hover:-translate-y-1`}
                    >
                       <div className={`p-3 rounded-xl bg-white/5 ${node.color} ${node.glow} group-hover:scale-110 transition-transform`}>
                          {node.icon}
                       </div>
                       <span className="text-[12px] font-black tracking-wider text-zinc-500 dark:text-zinc-400 uppercase transition-colors duration-1000">{node.label}</span>
                    </motion.div>
                  ))}

                 {/* Connecting Grid Activity */}
                 <div className="absolute inset-x-0 bottom-1/4 h-1/2 opacity-10 pointer-events-none">
                    <svg className="w-full h-full">
                       <motion.path 
                         d="M0 50 Q 50 0 100 50 T 200 50" 
                         stroke="var(--color-primary)" 
                         fill="none" 
                         animate={{ strokeDashoffset: [400, 0] }}
                         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                         strokeDasharray="20 20"
                       />
                    </svg>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

export function Deliverables() {
  const modules = [
    {
      title: "Revenue Systems",
      points: ["AI-driven lead generation", "Intelligent qualification engines", "Conversion optimization systems"],
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-emerald-400",
      glow: "shadow-[0_0_15px_rgba(52,211,153,0.15)]"
    },
    {
      title: "Customer Systems",
      points: ["24×7 AI interaction engines", "Context-aware support systems", "Multi-agent engagement architecture"],
      icon: <Globe className="w-5 h-5" />,
      color: "text-blue-400",
      glow: "shadow-[0_0_15px_rgba(96,165,250,0.15)]"
    },
    {
      title: "Operations Systems",
      points: ["Workflow automation", "Process re-engineering", "System consolidation"],
      icon: <Workflow className="w-5 h-5" />,
      color: "text-purple-400",
      glow: "shadow-[0_0_15px_rgba(192,132,252,0.15)]"
    },
    {
      title: "Decision Systems",
      points: ["Financial models", "Statistical engines", "Scenario simulations"],
      icon: <Activity className="w-5 h-5" />,
      color: "text-amber-400",
      glow: "shadow-[0_0_15px_rgba(251,191,36,0.15)]"
    }
  ];

  return (
    <section className="py-16 px-6 relative overflow-hidden bg-[var(--color-bg)]/20 transition-colors duration-1000">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
           <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-8 tracking-tighter text-[var(--color-text)] transition-colors duration-1000">
             A Unified <span className="text-gradient-primary">Intelligence Layer</span> <br />
             <span className="text-zinc-500 dark:text-zinc-600 transition-colors duration-1000">Across Your Business</span>
           </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="glass p-8 md:p-10 rounded-[2.5rem] border-[var(--color-text)]/5 flex flex-col gap-6 md:gap-8 group hover:border-primary/20 transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-xl bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 flex items-center justify-center ${m.color} ${m.glow} group-hover:scale-110 transition-transform transition-colors duration-1000`}>
                {m.icon}
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-bold font-display uppercase tracking-tight group-hover:text-primary transition-colors text-[var(--color-text)] transition-colors duration-1000">{m.title}</h3>
                <div className="space-y-4">
                  {m.points.map((point, pi) => (
                    <div key={pi} className="flex gap-3 text-[13px] text-zinc-500 font-medium group-hover:text-zinc-300 transition-colors leading-relaxed transition-colors duration-1000">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/20 mt-1 shrink-0" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IntelligencePlatform({ onNavigate }: { onNavigate: (page: 'home' | 'advisory' | 'ai-systems' | 'about' | 'pricing' | 'policies' | 'dashboard' | 'ecosystem' | 'supporta' | 'strategos' | 'simulate' | 'core' | 'engage' | 'evolve' | 'flow' | 'core-intel' | 'decision-modeling' | 'revenue-growth' | 'brand-content' | 'knowledge-research' | 'ops-automation' | 'cust-experience' | 'adv-strategic' | 'queries-guiding') => void }) {
  const metaTraits = ["Deep technical authority", "Core differentiator", "System-level clarity", "Deployment ready"];
  
  return (
    <section className="py-12 px-6 relative bg-[var(--color-bg)] transition-colors duration-1000">
      {/* Meta Strip */}
      <div className="absolute top-0 left-0 w-full border-y border-[var(--color-text)]/5 py-4 overflow-hidden bg-[var(--color-bg)]/40 transition-colors duration-1000">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-12 text-[12px] font-mono font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest justify-center lg:justify-start transition-colors duration-1000">
            {metaTraits.map((t, i) => (
              <span key={i} className="whitespace-nowrap">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-xs font-mono font-bold text-accent uppercase tracking-[0.4em] mb-4"><Trademark text="Intelligence Platform™" /></div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-8 leading-tight text-[var(--color-text)] transition-colors duration-1000">
              Unified <span className="text-gradient-vibrant">AI Ecosystem:</span> <br />
              <span className="text-gradient-secondary">The Infrastructure Behind Every</span> Intelligent System
            </h2>
            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed transition-colors duration-1000">
              A unified architecture integrating all systems into one business ecosystem. The <span className="text-[var(--color-text)] font-bold transition-colors duration-1000"><Trademark text="Intelligence Platform™" /></span> ensures seamless orchestration across your entire organization.
            </p>

            <button 
              onClick={() => onNavigate('ai-systems')}
              className="mb-12 flex items-center gap-2 text-xs font-mono font-black text-accent hover:text-[var(--color-text)] transition-colors group"
            >
              <Trademark text="EXPLORE PLATFORM™" /> <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="glass p-8 rounded-3xl border-accent/20 bg-accent/5 relative overflow-hidden">
               <h3 className="text-xl font-bold font-display mb-6">Unified Architecture. <br/><span className="text-accent underline decoration-accent/30 underline-offset-8">Enterprise-Grade Infrastructure.</span></h3>
               
               <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <p className="text-zinc-500 mb-4 uppercase text-xs font-mono font-bold tracking-widest">Business Outcomes:</p>
                    <ul className="space-y-3">
                      {["Full business transformation", "Scalable growth", "Continuous intelligence"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-[var(--color-text)] font-bold text-[13px] transition-colors duration-1000">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#0ea5e9]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-accent mb-4 uppercase text-xs font-mono font-bold tracking-widest">Core Capabilities:</p>
                    <ul className="space-y-3">
                      {["Unified architecture", "Multi-system coordination", "Enterprise-grade infrastructure"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-[var(--color-text)] font-bold text-[13px] transition-colors duration-1000">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#0ea5e9]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
            </div>
          </div>

          <div className="relative pt-12">
            <div className="space-y-4">
              {[
                { title: "Interface Layer", items: ["Websites, applications, and interaction surfaces"] },
                { title: "Intelligence Layer", items: ["Custom AI systems and multi-agent frameworks"] },
                { title: "Knowledge Layer", items: ["Structured business data and logic"] },
                { title: "Model Layer", items: ["Mathematical, financial, and statistical models"] },
                { title: "Insight Layer", items: ["Decision dashboards and performance systems"] }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-2xl border-white/5 hover:border-primary/30 hover:bg-primary/[0.02] transition-all group relative overflow-hidden"
                >
                  {/* Data Pulse Animation */}
                  <motion.div 
                    animate={{ 
                      x: ["-100%", "100%"] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: i * 0.5
                    }}
                    className="absolute top-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100"
                  />

                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold font-display group-hover:text-primary transition-colors">{step.title}</h4>
                    <span className="text-[11px] font-mono font-bold text-zinc-600 group-hover:text-primary/50 transition-colors">Layer 0{i+1}</span>
                  </div>
                  {step.items.map((item, ii) => (
                    <p key={ii} className="text-[13px] text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-tight">{item}</p>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProprietarySystems() {
  const [selectedSystem, setSelectedSystem] = useState<any>(null);

  const sections = [
    {
      title: "Decision & Modeling Architecture",
      description: "Systems designed for analysis, forecasting, and strategic decision-making.",
      items: [
        { 
          name: "IPDM ASTRA™", 
          role: "Decision Intelligence System", 
          desc: "Executive Strategic Intelligence. ASTRA™ transforms business complexity into strategic direction.", 
          icon: <Brain className="w-5 h-5" />, 
          color: "primary",
          capabilities: ["Strategic reasoning", "Root cause analysis", "Predictive modeling"],
          outcomes: ["Strategic clarity", "Lower operational risk", "Founder-level intelligence"],
          cta: "Initialize ASTRA™"
        },
        { 
          name: "IPDM SYNAPSE™", 
          role: "Decision Intelligence System", 
          desc: "Connect Insights to Action. SYNAPSE™ transforms analysis into decisions.", 
          icon: <GitBranch className="w-5 h-5" />, 
          color: "indigo",
          capabilities: ["Trade-off evaluation", "Decision support", "Multi-variable analysis"],
          outcomes: ["Faster decisions", "Better accuracy", "Reduced risk"],
          cta: "Explore SYNAPSE™"
        }
      ]
    },
    {
      title: "Brand & Content Architecture",
      description: "Systems designed to establish authority, engagement, and visibility.",
      items: [
        { 
          name: "IPDM SCRIBE™", 
          role: "Content Intelligence System", 
          desc: "Content That Drives Traffic and Authority. SCRIBE™ creates strategic SEO-driven content.", 
          icon: <FileText className="w-5 h-5" />, 
          color: "indigo",
          capabilities: ["SEO content creation", "Topic generation", "Publishing workflows"],
          outcomes: ["Organic traffic growth", "Brand authority", "Long-term content pipeline"],
          cta: "Explore SCRIBE™"
        },
        { 
          name: "IPDM AMPLIFY™", 
          role: "Content Distribution System", 
          desc: "Maximize Reach and Visibility. AMPLIFY™ distributes content strategically across channels.", 
          icon: <Rocket className="w-5 h-5" />, 
          color: "orange",
          capabilities: ["Multi-channel publishing", "Distribution automation", "Reach optimization"],
          outcomes: ["Increased reach", "Better ROI", "Higher visibility"],
          cta: "Explore AMPLIFY™"
        }
      ]
    },
    {
      title: "Knowledge & Research AI Systems",
      description: "AI systems that transform information into structured intelligence.",
      items: [
        { 
          name: "IPDM ARCHIVE™", 
          role: "Knowledge Intelligence System", 
          desc: "Structure Business Knowledge Into Intelligence. ARCHIVE™ centralizes and organizes knowledge assets.", 
          icon: <Database className="w-5 h-5" />, 
          color: "teal",
          capabilities: ["SOP storage", "Document intelligence", "Knowledge access"],
          outcomes: ["Faster access", "Better consistency", "Reliable knowledge base"],
          cta: "Explore ARCHIVE™"
        },
        { 
          name: "IPDM INSIGHTRA™", 
          role: "Research Intelligence System", 
          desc: "Research That Drives Smarter Strategy. INSIGHTRA™ provides market and competitor intelligence.", 
          icon: <Search className="w-5 h-5" />, 
          color: "blue",
          capabilities: ["Market research", "Competitor analysis", "Trend tracking"],
          outcomes: ["Better market clarity", "Strategic opportunities", "Reduced blind spots"],
          cta: "Explore INSIGHTRA™"
        },
        { 
          name: "IPDM LENS™", 
          role: "Analytics Intelligence System", 
          desc: "See What Matters in Real Time. LENS™ provides dashboards and business analytics.", 
          icon: <Layout className="w-5 h-5" />, 
          color: "violet",
          capabilities: ["KPI tracking", "Behavioral analytics", "Dashboard insights"],
          outcomes: ["Better visibility", "Data-backed decisions", "Performance optimization"],
          cta: "Explore LENS™"
        }
      ]
    },
    {
      title: "Operations & Automation AI Systems",
      description: "AI systems built to automate and optimize execution.",
      items: [
        { 
          name: "IPDM FLOW™", 
          role: "Workflow Automation System", 
          desc: "Automate Complexity. FLOW™ orchestrates workflows and automation.", 
          icon: <Workflow className="w-5 h-5" />, 
          color: "purple",
          capabilities: ["Task routing", "Trigger automation", "Process workflows"],
          outcomes: ["Reduced manual work", "Faster execution", "Better efficiency"],
          cta: "Explore FLOW™"
        },
        { 
          name: "IPDM CORE™", 
          role: "Infrastructure Intelligence System", 
          desc: "The Backbone of Every Intelligent System. CORE™ manages integrations, APIs, and architecture.", 
          icon: <Server className="w-5 h-5" />, 
          color: "zinc",
          capabilities: ["API management", "Infrastructure orchestration", "System integrations"],
          outcomes: ["Stable architecture", "Scalable infrastructure", "Reliable operations"],
          cta: "Explore CORE™"
        },
        { 
          name: "IPDM EVOLVE™", 
          role: "Continuous Intelligence System", 
          desc: "Systems That Improve Over Time. EVOLVE™ continuously optimizes systems and AI.", 
          icon: <RefreshCcw className="w-5 h-5" />, 
          color: "emerald",
          capabilities: ["Feedback loops", "AI retraining", "Workflow optimization"],
          outcomes: ["Continuous improvement", "Better AI performance", "Increased efficiency"],
          cta: "Explore EVOLVE™"
        }
      ]
    },
    {
      title: "Customer Experience AI Systems",
      description: "AI systems designed for interaction and support.",
      items: [
        { 
          name: "IPDM ENGAGE™", 
          role: "Customer Interaction System", 
          desc: "Every Customer Interaction, Handled Intelligently. ENGAGE™ powers real-time conversations.", 
          icon: <MessageSquare className="w-5 h-5" />, 
          color: "cyan",
          capabilities: ["Multi-channel messaging", "AI conversations", "Context awareness"],
          outcomes: ["Better engagement", "Faster response", "Higher satisfaction"],
          cta: "Explore ENGAGE™"
        },
        { 
          name: "IPDM SUPPORTA™", 
          role: "Customer Support System", 
          desc: "Support That Scales. SUPPORTA™ automates customer support workflows.", 
          icon: <HelpCircle className="w-5 h-5" />, 
          color: "blue",
          capabilities: ["Query resolution", "Escalation workflows", "Support automation"],
          outcomes: ["Faster support", "Reduced workload", "Better customer experience"],
          cta: "Explore SUPPORTA™"
        }
      ]
    },
    {
      title: "Advanced Strategic AI Systems",
      description: "AI systems for simulation, forecasting, and long-term strategic planning.",
      items: [
        { 
          name: "IPDM SIMULATE™", 
          role: "Scenario Intelligence System", 
          desc: "Test Decisions Before You Make Them. SIMULATE™ models outcomes and risks.", 
          icon: <Layers className="w-5 h-5" />, 
          color: "amber",
          capabilities: ["Scenario analysis", "Sensitivity testing", "Risk modeling"],
          outcomes: ["Better planning", "Lower uncertainty", "Reduced risk"],
          cta: "Explore SIMULATE™"
        },
        { 
          name: "IPDM STRATEGOS™", 
          role: "Strategic Intelligence System", 
          desc: "Strategy, Structured. STRATEGOS™ enables long-term strategic planning.", 
          icon: <Target className="w-5 h-5" />, 
          color: "rose",
          capabilities: ["Strategic models", "Planning frameworks", "Competitive intelligence"],
          outcomes: ["Clear direction", "Competitive advantage", "Better long-term planning"],
          cta: "Explore STRATEGOS™"
        }
      ]
    }
  ];

  const getColorStyles = (color: string) => {
    switch (color) {
      case "teal": return "text-teal-400 border-teal-400/20 bg-teal-400/5 shadow-[0_0_15px_rgba(45,212,191,0.15)]";
      case "violet": return "text-violet-400 border-violet-400/20 bg-violet-400/5 shadow-[0_0_15px_rgba(167,139,250,0.15)]";
      case "cyan": return "text-cyan-400 border-cyan-400/20 bg-cyan-400/5 shadow-[0_0_15px_rgba(34,211,238,0.15)]";
      case "amber": return "text-amber-400 border-amber-400/20 bg-amber-400/5 shadow-[0_0_15px_rgba(251,191,36,0.15)]";
      case "emerald": return "text-emerald-400 border-emerald-400/20 bg-emerald-400/5 shadow-[0_0_15px_rgba(52,211,153,0.15)]";
      case "blue": return "text-blue-400 border-blue-400/20 bg-blue-400/5 shadow-[0_0_15px_rgba(96,165,250,0.15)]";
      case "rose": return "text-rose-400 border-rose-400/20 bg-rose-400/5 shadow-[0_0_15px_rgba(244,63,94,0.15)]";
      case "fuchsia": return "text-fuchsia-400 border-fuchsia-400/20 bg-fuchsia-400/5 shadow-[0_0_15px_rgba(232,121,249,0.15)]";
      case "sky": return "text-sky-400 border-sky-400/20 bg-sky-400/5 shadow-[0_0_15px_rgba(56,189,248,0.15)]";
      case "indigo": return "text-indigo-400 border-indigo-400/20 bg-indigo-400/5 shadow-[0_0_15px_rgba(129,140,248,0.15)]";
      case "orange": return "text-orange-400 border-orange-400/20 bg-orange-400/5 shadow-[0_0_15px_rgba(251,146,60,0.15)]";
      case "purple": return "text-purple-400 border-purple-400/20 bg-purple-400/5 shadow-[0_0_15px_rgba(192,132,252,0.15)]";
      default: return "text-zinc-400 border-zinc-400/20 bg-zinc-400/5 shadow-[0_0_15px_rgba(161,161,170,0.15)]";
    }
  };

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      {/* Cinematic Grid Background */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg text-primary text-[10px] font-mono font-black uppercase tracking-[0.3em] mb-6"
          >
            <Sparkles className="w-3 h-3" /> Proprietary Core
          </motion.div>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 tracking-tighter text-[var(--color-text)] transition-colors duration-1000">Proprietary <br /><span className="text-gradient-teal-pink font-black italic inline-block"><Trademark text="Business Architecture™" /></span></h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed mb-10 transition-colors duration-1000">
            A Complete Ecosystem of Proprietary AI Systems Designed to Operate, Scale, and Continuously Improve Businesses
          </p>
          <div className="w-48 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
           {sections.map((section, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.05 }}
               className="flex flex-col"
             >
               <div className="mb-8 border-l-2 border-primary/20 pl-6 py-2">
                 <h3 className="text-[var(--color-text)] text-xl font-bold font-display tracking-tight mb-2 flex items-center gap-3 transition-colors duration-1000">
                   <Trademark text={section.title} />
                 </h3>
                 <p className="text-xs text-zinc-500 font-medium leading-relaxed italic"><Trademark text={section.description} /></p>
               </div>
               
               <div className="space-y-4">
                 {section.items.map((item, ii) => (
                    <motion.div 
                      key={ii} 
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="glass p-6 rounded-[2rem] border border-[var(--color-text)]/5 hover:border-primary/30 transition-all group relative overflow-hidden"
                    >

                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4 flex-1">
                           <div className={`p-4 rounded-2xl ${getColorStyles(item.color)} transition-all group-hover:scale-110`}>
                              {item.icon}
                           </div>
                           <div className="pt-1">
                              <h4 className="text-base font-black tracking-tight text-[var(--color-text)] mb-0.5 font-display transition-colors duration-1000">
                                 <Trademark text={item.name} />
                              </h4>
                              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black opacity-60">
                                 {item.role}
                              </p>
                           </div>
                        </div>
                        
                        <button 
                          onClick={() => setSelectedSystem(item)}
                          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-[var(--color-text)]/10 rounded-full text-[10px] font-black text-zinc-400 hover:text-[var(--color-text)] hover:bg-primary/20 hover:border-primary/30 transition-all uppercase tracking-widest active:scale-95"
                        >
                           Learn More <ChevronRight className="w-3 h-3 text-primary" />
                        </button>
                      </div>
                    </motion.div>
                 ))}
               </div>
             </motion.div>
           ))}
        </div>

        <div className="mt-32 pt-16 border-t border-white/5 text-center relative">
           <div className="absolute -top-px left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="max-w-3xl mx-auto"
           >
              <p className="text-2xl font-display font-medium text-[var(--color-text)] opacity-50 leading-relaxed italic transition-colors duration-1000">
                "Each system operates as part of a proprietary <span className="text-[var(--color-text)] font-bold not-italic">intelligence layer</span>, not as standalone tools."
              </p>
           </motion.div>
        </div>
      </div>

      {/* Modal / Popup */}
      <AnimatePresence>
        {selectedSystem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSystem(null)}
              className="absolute inset-0 bg-black/60 dark:bg-black/80 light:bg-slate-900/40 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-xl glass bg-[var(--color-bg)] border border-[var(--color-text)]/10 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-h-[90vh] flex flex-col transition-colors duration-1000"
            >
              <div className="absolute inset-0 blueprint-grid opacity-[0.03] pointer-events-none transition-opacity duration-1000" />
              
              <button 
                onClick={() => setSelectedSystem(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-[var(--color-text)]/10 transition-all text-zinc-500 hover:text-[var(--color-text)] z-50 group bg-[var(--color-bg)]/20 backdrop-blur-md"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 relative z-10">
                <div className="flex items-center gap-6 mb-10">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center ${getColorStyles(selectedSystem.color)} scale-110 md:scale-125`}>
                     {selectedSystem.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-zinc-500 tracking-[0.4em] mb-1 md:mb-2 uppercase">SYSTEM_PROTOCOL</div>
                    <h3 className="text-2xl md:text-3xl font-bold font-display text-[var(--color-text)]"><Trademark text={selectedSystem.name} /></h3>
                  </div>
                </div>

                <div className="space-y-8 md:space-y-10">
                  <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 transition-colors duration-1000">
                    <p className={`text-[10px] uppercase font-mono font-black mb-3 md:mb-4 tracking-[0.3em] opacity-40`}>Capability_Description:</p>
                    <p className="text-xl md:text-2xl font-display font-medium text-[var(--color-text)]/90 leading-tight transition-colors duration-1000">
                      <Trademark text={selectedSystem.desc} />
                    </p>
                  </div>

                  {selectedSystem.capabilities && (
                    <div className="space-y-4">
                      <p className={`text-[10px] uppercase font-mono font-black mb-2 tracking-[0.3em] opacity-40`}>Core_Capabilities:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedSystem.capabilities.map((cap: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-3 px-4 py-3 bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/10 rounded-xl transition-colors duration-1000">
                            <Check className="w-3 h-3 text-primary" />
                            <span className="text-xs text-zinc-300 transition-colors duration-1000">
                              <Trademark text={cap} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSystem.outcomes && (
                    <div className="space-y-4">
                      <p className={`text-[10px] uppercase font-mono font-black mb-2 tracking-[0.3em] opacity-40`}>Business_Outcomes:</p>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {selectedSystem.outcomes.map((out: string, idx: number) => (
                          <div key={idx} className="px-3 py-1.5 md:px-4 md:py-2 bg-primary/5 border border-primary/20 rounded-full">
                            <span className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-wider">
                              <Trademark text={out} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="glass p-5 md:p-6 rounded-2xl border-white/5">
                        <div className="text-[10px] font-mono text-zinc-600 uppercase mb-2">Role</div>
                        <div className="text-xs font-bold text-[var(--color-text)] uppercase tracking-wider transition-colors duration-1000">{selectedSystem.role}</div>
                     </div>
                     <div className="glass p-5 md:p-6 rounded-2xl border-white/5">
                        <div className="text-[10px] font-mono text-zinc-600 uppercase mb-2">Status</div>
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                           <div className="text-xs font-bold text-primary uppercase">Active_Operational</div>
                        </div>
                     </div>
                  </div>

                  <button 
                    onClick={() => {
                        setSelectedSystem(null);
                        openCalendly();
                    }}
                    className="w-full py-5 md:py-6 bg-primary text-black font-black uppercase text-sm tracking-[0.2em] rounded-2xl hover:bg-white transition-all flex items-center justify-center gap-3 active:scale-95 shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)] shadow-primary/20"
                  >
                    {selectedSystem.cta || 'Contact for Details'} <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function MarketReality() {
  const current = [
    "Rising acquisition costs",
    "Overloaded teams",
    "Poor visibility into performance",
    "Disconnected technology stacks"
  ];

  const shift = [
    "Expect instant responses",
    "Evaluate digitally before engaging",
    "Demand clarity and speed",
    "Abandon friction"
  ];

  return (
    <section className="py-10 px-6">
       <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-12 max-w-4xl tracking-tight">The Gap Between Businesses and Modern Systems</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="glass p-12 rounded-[3.5rem] border-red-500/10 bg-red-500/[0.01]"
             >
                <div className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest mb-8">CURRENT_STATE</div>
                <h3 className="text-2xl font-bold mb-8">Most businesses face:</h3>
                <div className="space-y-4">
                   {current.map((item, i) => (
                     <div key={i} className="flex items-center gap-4 text-zinc-400">
                        <div className="w-1.5 h-px bg-red-500" />
                        <span className="text-sm font-medium tracking-tight">{item}</span>
                     </div>
                   ))}
                </div>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="glass p-12 rounded-[3.5rem] border-secondary/10 bg-secondary/[0.01]"
             >
                <div className="text-[10px] font-mono font-bold text-secondary uppercase tracking-widest mb-8">CUSTOMER_BEHAVIOR_SHIFT</div>
                <h3 className="text-2xl font-bold mb-8">Modern customers:</h3>
                <div className="space-y-4">
                   {shift.map((item, i) => (
                     <div key={i} className="flex items-center gap-4 text-zinc-400">
                        <div className="w-1.5 h-px bg-secondary" />
                        <span className="text-sm font-medium tracking-tight">{item}</span>
                     </div>
                   ))}
                </div>
             </motion.div>
          </div>

          <div className="mt-20 text-center">
             <div className="inline-block p-12 glass rounded-[3rem] border-white/5 max-w-2xl">
                <h4 className="text-3xl font-display font-bold mb-6">Conclusion:</h4>
                <p className="text-xl text-zinc-300 leading-relaxed mb-4">This is not a marketing problem.</p>
                <p className="text-2xl font-bold text-primary tracking-tight">It is a systems architecture problem.</p>
             </div>
          </div>
       </div>
    </section>
  );
}

export function OfferingsOverview() {
  const cards = [
    {
      title: "Strategic Advisory",
      items: [
        "Model-driven decision architecture",
        "Economic, financial, and statistical modeling"
      ]
    },
    {
      title: "AI Systems",
      items: [
        "Custom systems (ASTRA™)",
        "Multi-agent systems (ORCHESTRA™)",
        "Business OS (NEXUS™)"
      ]
    },
    {
      title: "Digital Transformation",
      items: [
        "Process re-engineering",
        "Enterprise platforms",
        "System consolidation"
      ]
    },
    {
      title: "Execution",
      items: [
        "Deployment frameworks",
        "Governance systems",
        "Continuous optimization (EVOLVE™)"
      ]
    }
  ];

  return (
    <section className="py-10 px-6">
      <div className="max-w-7xl mx-auto">
         <h2 className="font-display font-bold text-4xl md:text-5xl mb-12 text-center flex flex-col items-center justify-center">
           <div className="w-12 h-1 bg-primary/20 mb-6 rounded-full" />
           Four Integrated Capabilities
         </h2>
         <div className="grid md:grid-cols-4 gap-6">
            {cards.map((c, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[3rem] border-white/5 hover:border-secondary/20 hover:scale-105 transition-all group"
              >
                 <div className="text-5xl font-display font-black text-[var(--color-text)]/5 mb-8 group-hover:text-secondary/10 transition-colors">0{i+1}</div>
                 <h3 className="text-xl font-bold font-display mb-8 pr-4 tracking-tight">{c.title}</h3>
                 <div className="space-y-4">
                    {c.items.map((item, ii) => (
                      <p key={ii} className="text-xs text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors">{item}</p>
                    ))}
                 </div>
              </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
}

export function WhyIPDM() {
  const reasons = [
    { title: "Technical Authority", desc: "Our team comes from high-consequence engineering backgrounds.", icon: <Shield className="w-6 h-6 text-emerald-400" /> },
    { title: "Deterministic Logic", desc: "No black boxes. Every system outcome is verifiable.", icon: <Activity className="w-6 h-6 text-blue-400" /> },
    { title: "Continuous Evolution", desc: "Subscribed systems that learn and adapt every second.", icon: <Zap className="w-6 h-6 text-amber-400" /> }
  ];

  return (
    <section id="why-ipdm" className="py-12 px-6 relative overflow-hidden bg-zinc-950/20">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[180px] rounded-full opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[180px] rounded-full opacity-50" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="mb-12 relative">
               <div className="text-xs font-mono font-bold text-primary uppercase tracking-[0.4em] mb-4">The IPDM Advantage</div>
               <div className="relative">
                 <h2 className="font-display font-black text-5xl md:text-7xl mb-10 tracking-tighter leading-[1.05] relative z-20">
                   Engineering <br />
                   <span className="text-gradient">Absolute Trust.</span>
                 </h2>
                 
                 {/* Decorative Animated Elements */}
                 <div className="absolute -right-20 -top-10 w-64 h-64 opacity-20 pointer-events-none hidden xl:block">
                    <svg viewBox="0 0 200 200" className="w-full h-full fill-none">
                       <motion.path
                         d="M20,150 Q40,140 60,120 Q80,100 100,100"
                         stroke="currentColor"
                         className="text-[var(--color-text)]"
                         strokeWidth="1"
                         initial={{ pathLength: 0 }}
                         whileInView={{ pathLength: 1 }}
                         transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                       />
                       <motion.path
                         d="M180,150 Q160,140 140,120 Q120,100 100,100"
                         stroke="currentColor"
                         className="text-primary"
                         strokeWidth="1.5"
                         initial={{ pathLength: 0 }}
                         whileInView={{ pathLength: 1 }}
                         transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                       />
                    </svg>
                 </div>
               </div>
            </div>

            <div className="space-y-10">
               {reasons.map((r, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 15 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.15 }}
                   className="flex gap-6 group"
                 >
                   <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-all border border-white/10 group-hover:border-primary/40 group-hover:bg-primary/5 shrink-0 shadow-lg shadow-black/40">
                     {r.icon}
                   </div>
                   <div>
                     <h3 className="text-lg font-bold font-display uppercase tracking-wider mb-2 group-hover:text-primary transition-colors">{r.title}</h3>
                     <p className="text-sm text-zinc-500 leading-relaxed max-w-sm group-hover:text-zinc-400 transition-colors">{r.desc}</p>
                   </div>
                 </motion.div>
               ))}
            </div>
          </motion.div>

          <div className="relative h-[650px] lg:h-[750px] flex items-center justify-center">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.15)_0%,_transparent_70%)] blur-[100px]" />
             
             {/* Digital Neural Eye Graphic */}
             <motion.div 
               className="relative w-full max-w-[500px] aspect-square flex items-center justify-center"
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
             >
                {/* Rotating Rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 opacity-20"
                >
                   <svg viewBox="0 0 400 400" className="w-full h-full">
                      <circle cx="200" cy="200" r="190" stroke="#3b82f6" strokeWidth="1" fill="none" strokeDasharray="4 20" />
                      <circle cx="200" cy="200" r="160" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="20 100" />
                   </svg>
                </motion.div>

                {/* Eye Core */}
                <div className="relative w-[70%] h-[70%] rounded-full border border-white/10 glass-morphism overflow-hidden flex items-center justify-center shadow-[0_0_100px_rgba(59,130,246,0.2)]">
                   <div className="absolute inset-0 bg-black/40" />
                   
                   {/* Scanning Laser HUD */}
                   <motion.div 
                     animate={{ top: ['0%', '100%'] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="absolute left-0 w-full h-[1px] bg-primary/60 shadow-[0_0_15px_#3b82f6] z-10"
                   />

                   {/* Pupil Core */}
                   <motion.div 
                     animate={{ scale: [1, 1.1, 1] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                     className="w-32 h-32 rounded-full bg-zinc-950 border border-primary/40 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                   >
                      <Shield className="w-12 h-12 text-primary drop-shadow-[0_0_10px_#3b82f6]" />
                   </motion.div>
                </div>
                
                {/* HUD Labels */}
                <div className="absolute top-0 right-0 p-4 glass border border-white/10 rounded-xl hidden md:block">
                   <div className="text-xs font-mono text-primary animate-pulse">SYSTEM_ONLINE_V.4</div>
                </div>
                <div className="absolute bottom-0 left-0 p-4 glass border border-white/10 rounded-xl hidden md:block">
                   <div className="text-xs font-mono text-emerald-400">INTEGRITY_VERIFIED</div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


export function Outcomes() {
  const outcomes = [
    "Increased lead conversion",
    "Reduced operational load",
    "Faster response cycles",
    "Improved decision clarity",
    "Scalable systems without headcount growth"
  ];

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
         <h2 className="font-display font-bold text-4xl md:text-5xl mb-12 text-center">Measured Business Impact</h2>
         
         <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
           {outcomes.map((o, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="glass p-8 rounded-3xl border-primary/5 flex items-center justify-center text-center hover:border-primary/20 transition-all"
             >
                <div className="w-full">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary mx-auto mb-6" />
                   <p className="text-sm font-bold leading-relaxed">{o}</p>
                </div>
             </motion.div>
           ))}
         </div>
      </div>
    </section>
  );
}

export function ClosingSection() {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-4xl md:text-[5rem] leading-[1.1] tracking-tighter mb-12">
            <span className="text-gradient">Intelligence</span> Becomes the <br />
            <span className="text-gradient-vibrant hover:brightness-110 transition-all cursor-default">Competitive Advantage</span>
          </h2>
          
          <div className="inline-block p-10 glass rounded-[3rem] border-white/5 text-center mb-10">
            <p className="text-xl md:text-2xl text-zinc-300 font-bold leading-relaxed pr-8 pl-8 mb-10">
               In markets where offerings look similar, <br />
               <span className="text-[var(--color-text)] italic">systems determine winners.</span>
            </p>
            
            <div className="space-y-6">
              <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] mb-4">IPDM builds:</p>
              <div className="flex flex-col md:flex-row justify-center gap-12">
                {["Systems that think", "Systems that act", "Systems that improve"].map((item, i) => (
                   <div key={i} className="flex flex-col items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[var(--color-text)] font-black text-xl tracking-tight">{item}</span>
                   </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FinalCTA({ onNavigate }: { onNavigate: (page: 'home' | 'advisory' | 'ai-systems' | 'about' | 'pricing' | 'policies' | 'dashboard' | 'ecosystem' | 'supporta' | 'strategos' | 'simulate' | 'core' | 'engage' | 'evolve' | 'flow' | 'core-intel' | 'decision-modeling' | 'revenue-growth' | 'brand-content' | 'knowledge-research' | 'ops-automation' | 'cust-experience' | 'adv-strategic' | 'queries-guiding') => void }) {
  return (
    <section className="py-12 px-6 border-t border-white/5 bg-zinc-950/20">
       <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => openCalendly()}
              className="w-full sm:w-auto px-10 py-5 bg-primary text-black font-black text-lg rounded-2xl hover:shadow-neon-strong hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group"
            >
              Schedule a Strategic Consultation <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('ai-systems')}
              className="w-full sm:w-auto px-10 py-5 glass text-[var(--color-text)] font-bold text-lg rounded-2xl hover:bg-[var(--color-text)]/10 transition-all border border-[var(--color-text)]/5"
            >
              Explore Platform & Systems
            </button>
          </div>
       </div>
    </section>
  );
}
