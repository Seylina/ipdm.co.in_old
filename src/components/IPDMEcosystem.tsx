import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, 
  Users, 
  Network, 
  Activity, 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Sparkles, 
  Database, 
  Share2, 
  Globe, 
  Languages,
  Search, 
  MousePointer2,
  Layers, 
  FileText, 
  Cpu, 
  RefreshCw, 
  Speaker,
  Briefcase,
  Shield,
  Target,
  Workflow,
  Command,
  Eye,
  Rocket,
  ShieldCheck,
  Stethoscope,
  ArrowLeft,
  ArrowRight,
  Bot,
  MessageSquare,
  Terminal,
  Scaling,
  Navigation,
  BrainCircuit,
  Handshake
} from "lucide-react";
import React, { useState } from "react";
import { Trademark } from "./Trademark";

const ECOSYSTEM_ITEMS = [
  {
    category: "Core Intelligence",
    id: "core-intel",
    items: [
       { id: "astra", name: "ASTRA™", role: "Decision Intelligence System", icon: <Brain />, color: "text-primary" },
    ]
  },
  {
    category: "Decision & Modeling",
    id: "decision-modeling",
    items: [
       { id: "quantum", name: "QUANTUM™", role: "Modeling & Decision Engine", icon: <Cpu />, color: "text-indigo-400" },
    ]
  },
  {
    category: "Revenue & Growth",
    id: "revenue-growth",
    items: [
      { id: "velocity", name: "VELOCITY™", role: "Lead Generation Engine", icon: <Zap />, color: "text-emerald-400" },
      { id: "convertix", name: "CONVERTIX™", role: "Conversion Engine", icon: <Target />, color: "text-rose-400" },
      { id: "pipeline", name: "PIPELINE™", role: "Revenue Intelligence Engine", icon: <TrendingUp />, color: "text-amber-500" },
    ]
  },
  {
    category: "Brand & Content",
    id: "brand-content",
    items: [
      { id: "aura", name: "AURA™", role: "Brand Intelligence Engine", icon: <Sparkles />, color: "text-violet-400" },
      { id: "pulse", name: "PULSE™", role: "Social Media Engine", icon: <Activity />, color: "text-pink-400" },
      { id: "scribe", name: "SCRIBE™", role: "Blog & Content Engine", icon: <FileText />, color: "text-zinc-400" },
      { id: "amplify", name: "AMPLIFY™", role: "Distribution Engine", icon: <Speaker />, color: "text-orange-400" },
    ]
  },
  {
    category: "Knowledge & Research",
    id: "knowledge-research",
    items: [
      { id: "archive", name: "ARCHIVE™", role: "Knowledge Engine", icon: <Database />, color: "text-teal-400" },
      { id: "insightra", name: "INSIGHTRA™", role: "Research Engine", icon: <Search />, color: "text-cyan-400" },
      { id: "synapse", name: "SYNAPSE™", role: "Decision Intelligence Engine", icon: <Network />, color: "text-indigo-400" },
      { id: "lens", name: "LENS™", role: "Analytics Engine", icon: <Eye />, color: "text-violet-400" },
      { id: "spectra", name: "IPDM SPECTRA™", role: "Autonomous Business Intelligence & Opportunity Discovery Infrastructure", icon: <Target />, color: "text-rose-400" },
    ]
  },
  {
    category: "Operations & Automation",
    id: "ops-automation",
    items: [
      { id: "flow", name: "FLOW™", role: "Workflow Engine", icon: <Share2 />, color: "text-indigo-400" },
      { id: "core", name: "CORE™", role: "Infrastructure Engine", icon: <Layers />, color: "text-zinc-500" },
      { id: "evolve", name: "EVOLVE™", role: "Continuous Intelligence Engine", icon: <RefreshCw />, color: "text-emerald-500" },
    ]
  },
  {
    category: "Customer Experience",
    id: "cust-experience",
    items: [
      { id: "engage", name: "ENGAGE™", role: "Interaction Engine", icon: <MessageSquare />, color: "text-cyan-400" },
      { id: "supporta", name: "SUPPORTA™", role: "Support Engine", icon: <Sparkles />, color: "text-pink-400" },
      { id: "multi-agent", name: "Multi-Agent AI", role: "AI Orchestration Architecture", icon: <Workflow />, color: "text-primary" },
      { id: "lead-qualifier", name: "Lead Qualification AI", role: "Lead Intelligence System", icon: <Target />, color: "text-emerald-400" },
      { id: "guided-decision", name: "Decision Engine", role: "Guided Advisory System", icon: <Scaling />, color: "text-cyan-400" },
      { id: "context-response", name: "Context AI", role: "Stateful Communication Engine", icon: <BrainCircuit />, color: "text-primary" },
      { id: "multi-language", name: "Multilingual AI", role: "Global Engagement System", icon: <Languages />, color: "text-amber-400" },
      { id: "conversion-action", name: "Conversion Engine", role: "Outcome Orchestration Engine", icon: <MousePointer2 />, color: "text-rose-400" },
      { id: "personalized-interaction", name: "Personalized AI", role: "Individual Engagement Experience", icon: <Sparkles />, color: "text-violet-400" },
      { id: "predictive-intelligence", name: "Predictive AI", role: "Engagement Forecasting Engine", icon: <Activity />, color: "text-orange-400" },
      { id: "omnichannel-orchestration", name: "Omnichannel AI", role: "Unified Engagement System", icon: <Network />, color: "text-blue-400" },
      { id: "revenue-growth-ai", name: "Revenue Intel AI", role: "Predictive Growth Intelligence System", icon: <TrendingUp />, color: "text-amber-500" },
      { id: "customer-journey", name: "Journey Intel AI", role: "Hyper-Personalized Lifecycle System", icon: <Navigation />, color: "text-pink-500" },
      { id: "business-intelligence", name: "Business Intel AI", role: "Strategic Insights System", icon: <BarChart3 />, color: "text-indigo-400" },
      { id: "automation-engagement", name: "Automation AI", role: "Autonomous Engagement System", icon: <Workflow />, color: "text-emerald-400" },
      { id: "trust-security", name: "Trust & Governance", role: "Ethical AI Governance System", icon: <ShieldCheck />, color: "text-zinc-300" },
      { id: "enterprise-collaboration", name: "Synergy Intel AI", role: "Human-AI Collaboration System", icon: <Handshake />, color: "text-indigo-400" },
      { id: "adaptive-learning", name: "Adaptive Intel AI", role: "Self-Evolving Intelligence System", icon: <Cpu />, color: "text-yellow-400" },
    ]
  },
  {
    category: "Advanced Strategic",
    id: "adv-strategic",
    items: [
      { id: "simulate", name: "SIMULATE™", role: "Scenario Engine", icon: <RefreshCw />, color: "text-cyan-400" },
      { id: "strategos", name: "STRATEGOS™", role: "Strategic Intelligence Engine", icon: <Target />, color: "text-amber-400" },
    ]
  },
  {
    category: "Queries & Guiding",
    id: "queries-guiding",
    items: [
       { id: "diagnostics", name: "DIAGNOSTIX™", role: "Health & Diagnostic Intelligence", icon: <Stethoscope />, color: "text-green-400" },
       { id: "jarvis", name: "JARVIS™", role: "Executive Guidance System", icon: <Brain />, color: "text-blue-500" },
    ]
  }
];

export function IPDMEcosystem({ onNavigate, onNavigateEngine }: { onNavigate: (page: any) => void, onNavigateEngine: (engineId: string) => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Animation variants for the "uncoil" effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: any = {
    hidden: { 
      opacity: 0, 
      scale: 0.3, 
      y: 50,
      rotateX: 45,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.8
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] pt-20 pb-16 px-4 md:px-8 lg:px-12 relative overflow-hidden transition-colors duration-1000">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] light:bg-grid-black/[0.02] bg-[size:40px_40px] transition-colors duration-1000" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Navigation Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-zinc-500 light:text-zinc-700 hover:text-white light:hover:text-black transition-colors group px-4 py-2 rounded-full bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 light:border-black/10 transition-colors duration-1000"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[11px] font-mono font-black uppercase tracking-wider">Back to Core</span>
          </button>

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-mono text-zinc-600 light:text-zinc-800 uppercase tracking-wider transition-colors duration-1000">System Link: Active</span>
            </div>
          </div>
        </motion.div>

        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-px bg-primary/30" />
            <span className="text-[11px] font-mono font-black text-primary/80 uppercase tracking-wider">Integrated Intelligence Ecosystem</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-medium tracking-tighter italic lg:text-7xl leading-[1.1] py-2 pr-6"
          >
            IPDM <span className="text-primary not-italic">Ecosystem</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 light:text-zinc-800 max-w-xl mt-6 text-base transition-colors duration-1000"
          >
            A comprehensive overview of the 20 autonomous intelligence layers that comprise the IPDM Intelligence Platform™. Each module is an integrated, production-grade system designed for specific operational outcomes.
          </motion.p>
        </div>

        <div className="space-y-12">
          {ECOSYSTEM_ITEMS.map((section, sectionIdx) => (
            <div key={section.category}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex items-center gap-6 mb-6 group/header cursor-pointer transition-colors duration-1000"
                onClick={() => {
                  if (section.id === 'core-intel') {
                    onNavigateEngine('IPDM Astra™');
                  } else {
                    onNavigate(section.id);
                  }
                }}
              >
                <div className="p-3 rounded-xl bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 light:border-black/10 group-hover/header:border-primary/50 transition-colors transition-colors duration-1000">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-500 light:text-zinc-600 uppercase tracking-wider group-hover/header:text-primary transition-colors transition-colors duration-1000">Explore Category</span>
                  <h2 className="text-lg md:text-2xl font-display font-bold text-[var(--color-text)] uppercase tracking-tight group-hover/header:text-primary transition-colors transition-colors duration-1000">{section.category} Systems</h2>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-[var(--color-text)]/10 to-transparent group-hover/header:from-primary/30 transition-all transition-colors duration-1000" />
                <ArrowRight className="text-zinc-700 group-hover/header:text-primary transition-colors shrink-0 transition-colors duration-1000" size={24} />
              </motion.div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {section.items.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    whileHover={{ scale: 1.02, y: -5, rotateZ: 1 }}
                    onClick={() => {
                      if (item.id === 'astra') {
                        onNavigate('astra');
                      } else if (['engage', 'multi-agent', 'lead-qualifier', 'guided-decision', 'context-response', 'multi-language', 'conversion-action', 'personalized-interaction', 'predictive-intelligence', 'omnichannel-orchestration', 'customer-journey', 'enterprise-collaboration', 'revenue-growth-ai', 'business-intelligence', 'automation-engagement', 'trust-security', 'adaptive-learning', 'evolve', 'flow', 'strategos', 'simulate', 'supporta', 'core'].includes(item.id)) {
                        onNavigate(item.id);
                      } else {
                        onNavigateEngine(item.name);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`
                      relative glass p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer overflow-hidden group perspective-1000
                      ${hoveredId === item.id 
                        ? 'border-primary/20 bg-[var(--color-text)]/[0.04] shadow-lg ring-1 ring-primary/10' 
                        : 'border-[var(--color-text)]/5 light:border-black/5 bg-[var(--color-text)]/[0.01]'}
                    `}
                  >
                    {/* Interior Glow Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    
                    <div className="flex items-start justify-between relative z-10 transition-colors duration-1000">
                      <div className={`p-3 rounded-xl bg-[var(--color-text)]/5 border border-[var(--color-text)]/5 light:border-black/5 transition-all duration-500 ${item.color} group-hover:scale-105 group-hover:border-primary/10`}>
                        {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20, strokeWidth: 1.5 })}
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono font-black text-zinc-500 light:text-zinc-600 uppercase tracking-wider group-hover:text-primary/60 transition-colors transition-colors duration-1000">Learn More</span>
                        <motion.div 
                          animate={{ x: hoveredId === item.id ? 3 : 0 }}
                          className="text-zinc-500 light:text-zinc-600 group-hover:text-primary transition-colors transition-colors duration-1000 uppercase text-[10px]"
                        >
                          →
                        </motion.div>
                      </div>
                    </div>

                    <div className="mt-6 relative z-10 transition-colors duration-1000">
                      <h3 className="text-lg font-bold font-display text-[var(--color-text)] tracking-tight group-hover:text-primary transition-colors transition-colors duration-1000">
                        <Trademark text={item.name} />
                      </h3>
                      <p className="text-[10px] font-mono font-black text-zinc-400 dark:text-zinc-400 light:text-zinc-600 uppercase tracking-wider mt-1 mb-4 italic leading-tight transition-colors duration-1000 pr-2">
                        {item.role}
                      </p>
                      
                      <div className="h-px w-full bg-[var(--color-text)]/5 light:bg-black/5 mb-4 group-hover:bg-primary/20 transition-colors transition-colors duration-1000" />
                      
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-tight transition-colors duration-1000">
                        <span className="text-zinc-500 light:text-zinc-600 transition-colors duration-1000">Status</span>
                        <span className="text-emerald-500/80 flex items-center gap-1.5 transition-colors duration-1000">
                          <div className="w-1 h-1 bg-emerald-500/50 rounded-full animate-pulse" />
                          Ready
                        </span>
                      </div>
                    </div>

                    {/* Animated Capsule Background Elements */}
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none transform rotate-12 group-hover:rotate-0 duration-700">
                      {React.cloneElement(item.icon as React.ReactElement<any>, { size: 120, strokeWidth: 1 })}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Global Ecosystem HUD Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 pt-8 border-t border-[var(--color-text)]/5 light:border-black/5 flex flex-col md:flex-row justify-between items-center gap-12 transition-colors duration-1000"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-mono text-zinc-500 light:text-zinc-700 uppercase tracking-[0.4em] transition-colors duration-1000">Ecosystem Health: Optimal</span>
            </div>
            <div className="text-[10px] font-mono text-zinc-700 light:text-zinc-900 uppercase tracking-widest leading-loose transition-colors duration-1000">
              LATENCY: 42MS <br />
              THROUGHPUT: 1.2M OPS/S <br />
              ACTIVE_NODES: 23/23
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
            <h4 className="text-2xl font-display font-bold italic text-[var(--color-text)]/20 uppercase tracking-tighter transition-colors duration-1000 pr-4">Integrated Intelligence Layers</h4>
            <div className="flex gap-2">
              {[...Array(23)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-primary/20 rounded-full" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
