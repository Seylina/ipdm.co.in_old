import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  RefreshCw, 
  TrendingUp, 
  Database, 
  Network, 
  Eye, 
  ShieldCheck, 
  Workflow, 
  Globe, 
  BarChart3, 
  Target, 
  Bot, 
  User, 
  Send, 
  Cpu, 
  Layers, 
  Settings, 
  LineChart, 
  Boxes, 
  Maximize2, 
  FileJson, 
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Activity,
  CheckCircle2,
  Lock,
  MessageSquare,
  Search,
  LayoutDashboard,
  Binary
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Trademark } from "./Trademark";
import { GoogleGenAI } from "@google/genai";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  Cell,
  Line,
  LineChart as ReLineChart,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from "recharts";

// Architecture Layers
const EVOLVE_LAYERS = [
  { id: "layer1", name: "Interface Layer", icon: <LayoutDashboard />, desc: "Unified touchpoints across web, chat, and mobile.", color: "from-blue-400 to-indigo-500" },
  { id: "layer2", name: "Intelligence Layer", icon: <Cpu />, desc: "Cognitive reasoning & multi-agent coordination.", color: "from-indigo-400 to-purple-500" },
  { id: "layer3", name: "Knowledge Layer", icon: <Database />, desc: "Structured business intelligence & semantic memory.", color: "from-purple-400 to-pink-500" },
  { id: "layer4", name: "Execution Layer", icon: <Zap />, desc: "Autonomous workflows & real-time production tasks.", color: "from-pink-400 to-rose-500" },
  { id: "layer5", name: "Insight Layer", icon: <Target />, desc: "Strategic KPI analysis & decision-shaping data.", color: "from-rose-400 to-amber-500" },
  { id: "layer6", name: "EVOLVE™ ENGINE", icon: <RefreshCw />, desc: "Continuous learning, refinement & optimization.", color: "from-amber-400 to-primary", highlight: true }
];

// Features
const FEATURES = [
  { id: 1, name: "Continuous Learning & Retraining", icon: <RefreshCw />, desc: "AI that evolves from every interaction.", impact: "99.2% Accuracy", problem: "Static AI becomes outdated.", solution: "Self-improving loops." },
  { id: 2, name: "Conversion Optimization Engine", icon: <TrendingUp />, desc: "Real-time funnel & CTA optimization.", impact: " +42% Conversion", problem: "Drop-offs reduce revenue.", solution: "Dynamic behavioral optimization." },
  { id: 3, name: "Dynamic Knowledge Expansion", icon: <Database />, desc: "Autonomous business knowledge growth.", impact: "Unlimited Scope", problem: "Knowledge silos hinder AI.", solution: "Semantic graph integration." },
  { id: 4, name: "Multi-Agent Behavior Optimization", icon: <Network />, desc: "Coordinated agent-to-agent performance tuning.", impact: "Optimized Routing", problem: "Agent confusion/overlap.", solution: "Centralized behavior governing." },
  { id: 5, name: "AI-Driven Insight & Feedback", icon: <Target />, desc: "Strategic root-cause analysis loops.", impact: "Strategic Clarity", problem: "Data without meaning is noise.", solution: "Automated decision intelligence." },
  { id: 6, name: "Content Optimization Engine", icon: <MessageSquare />, desc: "Continuous messaging & CTA refinement.", impact: "Perfect Resonance", problem: "Static copy loses impact.", solution: "A/B optimized AI messaging." },
  { id: 7, name: "Objection Handling Upgrade", icon: <ShieldCheck />, desc: "Dynamic persuasion & trust building.", impact: "Trust Scaling", problem: "Skepticism blocks sales.", solution: "Adaptive reframing logic." },
  { id: 8, name: "Real-Time Performance Monitor", icon: <Activity />, desc: "Live AI health & conversion tracking.", impact: "Zero Latency", problem: "Blind spots in AI ops.", solution: "Transparent performance streams." },
  { id: 9, name: "Governance & Control Evolution", icon: <Lock />, desc: "Continuous policy & safety enforcement.", impact: "Enterprise Safe", problem: "AI hallucinations/risk.", solution: "Real-time validation guards." },
  { id: 10, name: "Workflow & System Evolution", icon: <Workflow />, desc: "Intelligent process scaling & CRM sync.", impact: "10x Scaling", problem: "Manual tasks don't scale.", solution: "Autonomous process growth." },
  { id: 11, name: "Multi-Language/Context Expansion", icon: <Globe />, desc: "Regional intelligence & context adapting.", impact: "Global Reach", problem: "Language barriers in AI.", solution: "Cross-regional semantic layers." },
  { id: 12, name: "Cost Efficiency Engine", icon: <Zap />, desc: "Drastic manpower reduction & scaling.", impact: " -84% OPEX", problem: "Scaling headcount is expensive.", solution: "Intelligent output scaling." },
  { id: 13, name: "Experimentation & A/B Layer", icon: <Binary />, desc: "Autonomous version testing & refinement.", impact: "Scientific Growth", problem: "Guesswork in optimization.", solution: "Controlled data-driven testing." },
  { id: 14, name: "Continuous Refinement Cycle", icon: <RefreshCw />, desc: "Unified optimization across entire stack.", impact: "Compounding ROI", problem: "Isolated optimizations fail.", solution: "Full-stack synergy loops." },
  { id: 15, name: "Intelligence & Evolution Reports", icon: <FileJson />, desc: "Executive KPI & ROI reporting cycles.", impact: "Investor Ready", problem: "Invisible AI progress.", solution: "Visible evolution metrics." }
];

// Dashboard Mock Data
const EVOLUTION_DATA = [
  { name: 'Month 1', accuracy: 82, conversion: 12, efficiency: 45 },
  { name: 'Month 2', accuracy: 88, conversion: 18, efficiency: 62 },
  { name: 'Month 3', accuracy: 94, conversion: 24, efficiency: 78 },
  { name: 'Month 4', accuracy: 98, conversion: 32, efficiency: 88 },
  { name: 'Month 5', accuracy: 99.2, conversion: 38, efficiency: 94 },
  { name: 'Month 6', accuracy: 99.8, conversion: 44, efficiency: 98 },
];

const AGENT_PERFORMANCE = [
  { subject: 'Learning', A: 120, fullMark: 150 },
  { subject: 'Governance', A: 140, fullMark: 150 },
  { subject: 'Conversion', A: 130, fullMark: 150 },
  { subject: 'Automation', A: 145, fullMark: 150 },
  { subject: 'Security', A: 150, fullMark: 150 },
];

export function IPDMEvolve({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [dashTab, setDashTab] = useState<'evolution' | 'agents' | 'reports' | 'admin'>('evolution');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user' as any, parts: [{ text: m.content }] })), { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: `ROLE: You are EVOLVE™ Intelligence Agent. You explain the IPDM EVOLVE™ architecture. 
          EVOLVE™ is a continuous intelligence & optimization engine.
          COMPONENTS: Architecture Layers (Interface to EVOLVE Engine), 15 Features (Learning, Conversion, Knowledge, Agents, etc.).
          STYLE: Mature, Professional, Concise, Structured. Use minimum tokens.
          GOAL: Guide users to demo or activate EVOLVE™.`
        }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "PROTOCOL ERROR: Evolution synchronization failed." }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM FAILURE: Continuous learning node timeout. Resetting context." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col font-sans overflow-x-hidden transition-colors duration-1000">
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-primary/5 rounded-full blur-[250px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[1200px] h-[1200px] bg-indigo-500/5 rounded-full blur-[250px] animate-pulse" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      {/* Header */}
      <header className="h-20 border-b border-[var(--color-text)]/5 bg-[var(--color-bg)]/40 backdrop-blur-3xl flex items-center justify-between px-8 sticky top-0 z-[60]">
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('ecosystem')} className="p-2 hover:bg-[var(--color-text)]/5 rounded-full transition-colors text-zinc-500 hover:text-[var(--color-text)]">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-display font-black italic tracking-widest text-[var(--color-text)]">
              <Trademark text="IPDM Evolve" />
            </h1>
            <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-[0.4em]">Continuous Intelligence Engine</span>
          </div>
        </div>
        <div className="hidden md:flex gap-4">
           <button className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-xl text-[11px] font-mono font-black text-primary hover:bg-primary hover:text-black transition-all uppercase tracking-wider">
              Activate EVOLVE™
           </button>
           <button className="px-6 py-2 bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 rounded-xl text-[11px] font-mono font-black text-[var(--color-text)] hover:bg-[var(--color-text)]/10 transition-all uppercase tracking-wider">
              Request Demo
           </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-8 flex flex-col items-center text-center overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 space-y-8 max-w-5xl"
          >
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em] mb-4">
               <RefreshCw size={12} className="animate-spin-slow" /> Optimization Cycle v4.0 Active
             </div>
             <h1 className="text-7xl md:text-9xl font-display font-medium italic tracking-tighter leading-[0.85] text-[var(--color-text)]">
                The Continuous <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-500">Intelligence</span> Engine
             </h1>
             <p className="text-xl md:text-2xl text-zinc-400 font-medium italic leading-relaxed max-w-3xl mx-auto">
                "An AI system that continuously learns, improves, optimizes, governs, and evolves your entire business infrastructure."
             </p>
             <div className="flex flex-wrap justify-center gap-6 pt-8">
               <button className="px-10 py-5 bg-primary text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:scale-105 transition-all shadow-neon">
                 Activate EVOLVE™
               </button>
               <button className="px-10 py-5 bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 text-[var(--color-text)] font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-[var(--color-text)]/10 transition-all">
                 View Architecture
               </button>
             </div>
          </motion.div>
          {/* Animated Glow behind hero */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[150px] -z-10 opacity-30" />
      </section>

      {/* IS vs NOT Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
         <div className="space-y-10">
            <div>
               <h2 className="text-sm font-mono font-black text-zinc-500 uppercase tracking-[0.5em] mb-4">Paradigm Shift</h2>
               <h3 className="text-5xl font-display font-medium italic tracking-tight italic">Static value fades. Intelligence <span className="text-primary">compounds.</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 rounded-[2.5rem] bg-rose-500/5 border border-rose-500/10 space-y-4">
                  <h4 className="text-xs font-mono font-black text-rose-500 uppercase tracking-widest">EVOLVE™ is NOT</h4>
                  <ul className="space-y-2 text-zinc-500 text-sm italic font-medium">
                     <li>• A static AI tool</li>
                     <li>• A one-time automation</li>
                     <li>• A generic chatbot</li>
                     <li>• Reactive infrastructure</li>
                  </ul>
               </div>
               <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                  <h4 className="text-xs font-mono font-black text-emerald-500 uppercase tracking-widest">EVOLVE™ IS</h4>
                  <ul className="space-y-2 text-zinc-300 text-sm italic font-medium">
                     <li>• Continuous Learning Engine</li>
                     <li>• Self-Improving Infra</li>
                     <li>• Multi-Layer Optimization</li>
                     <li>• Strategic Decision Layer</li>
                  </ul>
               </div>
            </div>
            <p className="text-lg text-zinc-400 leading-relaxed italic">
               "IPDM EVOLVE™ is a continuous intelligence operating system that ensures your business becomes smarter, faster, and more efficient every hour."
            </p>
         </div>
         <div className="relative group">
            <div className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 glass relative z-10 space-y-8 overflow-hidden">
               <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                     <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Live Evolution Protocol</span>
                  </div>
                  <Settings className="text-zinc-700 animate-spin-slow" size={16} />
               </div>
               <div className="space-y-6">
                  {[
                    { label: "Websites", to: "Intelligent Systems", icon: <Globe size={14} /> },
                    { label: "Data", to: "Decision Systems", icon: <Database size={14} /> },
                    { label: "Operations", to: "Scalable Automation", icon: <Zap size={14} /> },
                    { label: "AI", to: "Adaptive Intelligence", icon: <Cpu size={14} /> }
                  ].map(t => (
                    <div key={t.label} className="flex items-center justify-between group/item">
                       <span className="text-xs text-zinc-500 uppercase font-mono">{t.label}</span>
                       <div className="flex-1 border-t border-dashed border-white/10 mx-6" />
                       <div className="flex items-center gap-3 text-right">
                          <span className="text-sm font-bold text-white uppercase italic">{t.to}</span>
                          <div className="p-2 rounded-lg bg-primary/10 text-primary opacity-0 group-hover/item:opacity-100 transition-all scale-75 group-hover/item:scale-100">
                             {t.icon}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="absolute -inset-4 bg-primary/10 blur-[100px] -z-10 group-hover:bg-primary/20 transition-all" />
         </div>
      </section>

      {/* Architecture Section */}
      <section className="py-32 px-8 bg-black/40 relative border-y border-white/5">
          <div className="max-w-7xl mx-auto w-full">
             <div className="text-center mb-24 space-y-4">
                <h2 className="text-sm font-mono font-black text-primary uppercase tracking-[0.5em]">System Architecture</h2>
                <h3 className="text-6xl font-display font-medium italic tracking-tighter">The Unified <span className="text-zinc-600">Refinement</span> Loop</h3>
             </div>

             <div className="relative flex flex-col items-center">
                {EVOLVE_LAYERS.map((layer, idx) => (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                    className={`w-full max-w-4xl h-20 mb-4 rounded-3xl border flex items-center px-8 cursor-pointer transition-all relative z-10 glass
                      ${activeLayer === layer.id ? 'bg-white/[0.05] border-primary shadow-neon' : 'bg-black/40 border-white/10 text-zinc-400 hover:border-white/30'}
                      ${layer.highlight ? 'border-primary/40 bg-primary/5' : ''}
                    `}
                  >
                     <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-6">
                           <div className={`p-3 rounded-2xl bg-gradient-to-br ${layer.color} text-white shadow-lg`}>
                              {layer.icon}
                           </div>
                           <div className="flex flex-col">
                              <span className="text-xs font-mono font-black uppercase tracking-widest text-zinc-500">Layer 0{idx+1}</span>
                              <span className={`text-lg font-bold uppercase tracking-tight ${activeLayer === layer.id ? 'text-primary' : 'text-white'}`}>{layer.name}</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-8">
                           <AnimatePresence>
                             {activeLayer === layer.id && (
                               <motion.p 
                                 initial={{ opacity: 0, x: 20 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 exit={{ opacity: 0, x: 20 }}
                                 className="text-sm font-medium italic text-zinc-400 max-w-sm text-right leading-snug"
                               >
                                 {layer.desc}
                               </motion.p>
                             )}
                           </AnimatePresence>
                           <ArrowRight className={`transition-transform ${activeLayer === layer.id ? 'rotate-90 text-primary' : ''}`} size={20} />
                        </div>
                     </div>
                     {idx < EVOLVE_LAYERS.length - 1 && (
                       <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-4 bg-white/10" />
                     )}
                  </motion.div>
                ))}
                
                {/* Global Pulse Indicator */}
                <div className="mt-12 flex flex-col items-center gap-4">
                   <div className="flex items-center gap-2">
                     {[1,2,3].map(i => <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }} className="w-1.5 h-1.5 rounded-full bg-primary" />)}
                   </div>
                   <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Autonomous Learning Loop Active</span>
                </div>
             </div>
          </div>
      </section>

      {/* 15 Features Sections */}
      <section className="py-32 px-8 max-w-7xl mx-auto w-full space-y-24">
         <div className="text-center space-y-4">
            <h2 className="text-sm font-mono font-black text-zinc-500 uppercase tracking-[0.5em]">Capabilities Suite</h2>
            <h3 className="text-6xl font-display font-medium italic tracking-tighter">15 Integrated <span className="text-primary">Intelligence</span> Modules</h3>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
               <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 3) * 0.1 }}
                onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
                className={`p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 transition-all cursor-pointer group glass flex flex-col gap-6 relative overflow-hidden h-[400px]
                  ${expandedFeature === feature.id ? 'border-primary ring-1 ring-primary/20' : 'hover:border-white/20'}
                `}
               >
                  <div className={`p-4 rounded-2xl bg-white/5 w-fit group-hover:bg-primary/10 transition-all ${expandedFeature === feature.id ? 'bg-primary text-black' : 'text-zinc-400 group-hover:text-primary'}`}>
                     {feature.icon}
                  </div>
                  <div className="space-y-4 flex-1">
                     <h4 className="text-xl font-display font-bold italic tracking-tight text-white uppercase">{feature.name}</h4>
                     <p className="text-sm text-zinc-500 leading-relaxed italic">{feature.desc}</p>
                     
                     <AnimatePresence>
                        {expandedFeature === feature.id && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-4 border-t border-white/5 space-y-4 overflow-hidden"
                          >
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                   <p className="text-[11px] font-mono text-zinc-600 uppercase mb-1">Problem</p>
                                   <p className="text-[10px] text-zinc-400 leading-tight">{feature.problem}</p>
                                </div>
                                <div>
                                   <p className="text-[11px] font-mono text-zinc-600 uppercase mb-1">Solution</p>
                                   <p className="text-[10px] text-zinc-400 leading-tight">{feature.solution}</p>
                                </div>
                             </div>
                             <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-primary uppercase font-black">Impact: {feature.impact}</span>
                                <CheckCircle2 size={12} className="text-emerald-500" />
                             </div>
                          </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
                  
                  <div className="flex items-baseline justify-between mt-auto">
                     <span className="text-[11px] font-mono text-zinc-700 uppercase tracking-wider">Protocol 0{feature.id}</span>
                     <ChevronDown className={`transition-transform text-zinc-700 ${expandedFeature === feature.id ? 'rotate-180 text-primary' : ''}`} size={16} />
                  </div>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-all" />
               </motion.div>
            ))}
         </div>
      </section>

      {/* AI Agent Workspace */}
      <section className="py-32 px-8 bg-black/60 relative overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 h-[800px]">
             {/* Left: AI Context */}
             <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                   <h2 className="text-sm font-mono font-black text-primary uppercase tracking-[0.5em]">Executive Assistant</h2>
                   <h3 className="text-6xl font-display font-medium italic tracking-tighter">EVOLVE™ Intelligence <span className="text-zinc-600">Agent</span></h3>
                   <p className="text-lg text-zinc-400 italic leading-relaxed">
                      "Command the continuous intelligence engine directly. 
                      Query evolution metrics, trigger optimizations, and explore regional adaptations in real-time."
                   </p>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                   {[
                     "How can EVOLVE™ improve conversion rates?",
                     "Explain the continuous learning loop",
                     "Show ROI metrics for Month 6",
                     "How does the governance layer work?"
                   ].map(q => (
                     <button 
                       key={q} 
                       onClick={() => setInput(q)}
                       className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-left text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-white hover:border-primary/40 transition-all glass"
                     >
                       {q}
                     </button>
                   ))}
                </div>
             </div>

             {/* Right: Interaction Console */}
             <div className="lg:col-span-7 flex flex-col rounded-[3.5rem] bg-white/[0.01] border border-white/5 relative overflow-hidden glass shadow-2xl">
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-xl">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-neon" />
                      <span className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-primary">Evolution Interface Node</span>
                   </div>
                   <div className="flex gap-4">
                      <div className="px-3 py-1 bg-primary/10 rounded-lg text-[11px] font-mono text-primary uppercase font-bold">Latency: 124ms</div>
                      <Maximize2 className="text-zinc-700 cursor-pointer hover:text-white" size={16} />
                   </div>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar-thin">
                   {messages.length === 0 && (
                     <div className="h-full flex flex-col items-center justify-center text-center space-y-10">
                        <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center border border-primary/20 animate-pulse relative">
                           <Bot size={32} className="text-primary" />
                           <div className="absolute inset-0 bg-primary/20 blur-2xl -z-10" />
                        </div>
                        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] font-black italic max-w-xs">
                           Awaiting instruction for intelligence refinement...
                        </p>
                     </div>
                   )}
                   {messages.map((msg, i) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={i} 
                        className={`flex gap-6 ${msg.role === 'user' ? 'justify-end' : ''}`}
                      >
                         {msg.role === 'assistant' && (
                           <div className="w-12 h-12 bg-primary/20 rounded-2xl flex-shrink-0 flex items-center justify-center border border-primary/40 shadow-neon/10">
                              <Bot size={22} className="text-primary" />
                           </div>
                         )}
                         <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                            <div className={`p-8 rounded-[2.5rem] ${msg.role === 'user' ? 'bg-primary text-black font-bold' : 'bg-white/[0.04] border border-white/5 text-zinc-300'}`}>
                               <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            </div>
                         </div>
                         {msg.role === 'user' && (
                           <div className="w-12 h-12 bg-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/20">
                              <User size={22} className="text-zinc-500" />
                           </div>
                         )}
                      </motion.div>
                   ))}
                   {isLoading && (
                     <div className="flex gap-6">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/40 animate-spin">
                           <RefreshCw size={22} className="text-primary" />
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-zinc-600 flex items-center gap-4 text-[10px] font-mono uppercase font-black">
                           Evolving Context...
                           <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                        </div>
                     </div>
                   )}
                </div>

                <div className="p-12 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
                   <div className="relative group">
                      <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="EXECUTE STRATEGIC COMMAND..."
                        className="w-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 pr-24 text-sm focus:outline-none focus:border-primary/40 font-mono tracking-widest placeholder:text-zinc-700 uppercase"
                      />
                      <button 
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-4 top-4 bottom-4 aspect-square bg-primary text-black rounded-3xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-neon disabled:opacity-30"
                      >
                        <Send size={24} />
                      </button>
                   </div>
                </div>
             </div>
          </div>
      </section>

      {/* Enterprise Dashboard */}
      <section className="py-32 px-8 max-w-[1700px] mx-auto w-full">
         <div className="flex flex-col lg:flex-row gap-12 h-[900px]">
            {/* Left Col: Dashboard Sidebar */}
            <div className="lg:col-span-3 space-y-6">
               <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 glass">
                  <h3 className="text-sm font-display font-medium uppercase tracking-[0.3em] italic text-primary mb-10">Control Center</h3>
                  <div className="space-y-4">
                     {[
                       { id: 'evolution', label: 'Evolution Metrics', icon: <TrendingUp size={16} /> },
                       { id: 'agents', label: 'Agent Intelligence', icon: <Cpu size={16} /> },
                       { id: 'reports', label: 'ROI Reports', icon: <FileJson size={16} /> },
                       { id: 'admin', label: 'Manual Controls', icon: <Settings size={16} /> }
                     ].map(tab => (
                       <button 
                        key={tab.id}
                        onClick={() => setDashTab(tab.id as any)}
                        className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all border
                          ${dashTab === tab.id ? 'bg-primary text-black border-primary shadow-neon font-black' : 'text-zinc-500 hover:text-white border-white/5 hover:bg-white/5'}
                        `}
                       >
                          {tab.icon}
                          <span className="text-[11px] font-mono uppercase tracking-widest">{tab.label}</span>
                       </button>
                     ))}
                  </div>
               </div>

               {/* Stats Summary */}
               <div className="p-8 rounded-[2.5rem] bg-black/60 border border-white/5 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                     <span className="text-[10px] font-mono text-zinc-600 uppercase">Uptime</span>
                     <span className="text-sm font-bold text-emerald-500">100.0%</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                     <span className="text-[10px] font-mono text-zinc-600 uppercase">Latency</span>
                     <span className="text-sm font-bold">12ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-mono text-zinc-600 uppercase">Learning</span>
                     <span className="text-sm font-bold text-primary">Adaptive</span>
                  </div>
               </div>
            </div>

            {/* Main Dash Area */}
            <div className="flex-1 flex flex-col rounded-[4rem] bg-white/[0.01] border border-white/5 overflow-hidden glass shadow-2xl">
               <div className="p-10 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-display font-medium italic italic tracking-tight uppercase">System Evolution <span className="text-zinc-600">Cockpit</span></h3>
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Unified optimization monitoring & governance</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-mono font-black text-emerald-500 uppercase tracking-wider">Optimized State</span>
                     </div>
                     <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><RefreshCw size={16} /></button>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                  <AnimatePresence mode="wait">
                    {dashTab === 'evolution' && (
                      <motion.div 
                        key="evolution" 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                      >
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                              { label: 'Intelligence Accuracy', val: '99.8%', trend: '+17.4%', color: 'text-primary' },
                              { label: 'Conversion Lift', val: '+44.2%', trend: '+5.1%', color: 'text-emerald-500' },
                              { label: 'Operating Efficiency', val: '98.4%', trend: 'Peak', color: 'text-amber-500' }
                            ].map(kpi => (
                              <div key={kpi.label} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                                 <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{kpi.label}</p>
                                 <h4 className="text-4xl font-display font-medium italic italic tracking-tighter">{kpi.val}</h4>
                                 <p className={`text-[11px] font-mono ${kpi.color} font-black`}>{kpi.trend}</p>
                              </div>
                            ))}
                         </div>

                         <div className="p-10 rounded-[3.5rem] bg-black/40 border border-white/5 h-96 relative">
                            <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-10 italic">Intelligence Growth Projection (v4.0 Cycle)</h4>
                            <ResponsiveContainer width="100%" height="100%">
                               <AreaChart data={EVOLUTION_DATA}>
                                  <defs>
                                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#3f3f46' }} />
                                  <YAxis hide />
                                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
                                  <Area type="monotone" dataKey="accuracy" stroke="#22d3ee" strokeWidth={4} fill="url(#colorAcc)" />
                                  <Area type="monotone" dataKey="conversion" stroke="#a855f7" strokeWidth={2} fill="none" />
                               </AreaChart>
                            </ResponsiveContainer>
                         </div>
                      </motion.div>
                    )}

                    {dashTab === 'agents' && (
                      <motion.div 
                        key="agents" 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                      >
                         <div className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={AGENT_PERFORMANCE}>
                                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#52525b', fontSize: 10, fontWeight: 'bold' }} />
                                  <Radar name="System" dataKey="A" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.3} />
                               </RadarChart>
                            </ResponsiveContainer>
                         </div>
                         <div className="space-y-6">
                            <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4 italic">Agent Refinement Status</h4>
                            {[
                              { agent: "Sales AI", status: "Evolved", lift: "+22%" },
                              { agent: "Support AI", status: "Optimized", lift: "+14%" },
                              { agent: "Governance AI", status: "Active", lift: "Safe" }
                            ].map(a => (
                              <div key={a.agent} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                                 <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="text-sm font-bold uppercase tracking-tight">{a.agent}</span>
                                 </div>
                                 <div className="text-right">
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">{a.status}</span>
                                    <span className="text-xs font-bold text-primary">{a.lift}</span>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </motion.div>
                    )}

                    {dashTab === 'reports' && (
                      <motion.div 
                        key="reports" 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      >
                         {[
                           { title: "Monthly Logic Audit", date: "May 2026", status: "Generated" },
                           { title: "Conversion Intelligence", date: "April 2026", status: "Finalized" },
                           { title: "Governance Compliance", date: "Q2 2026", status: "Draft" },
                           { title: "Agent Efficiency Report", date: "May 2026", status: "Generated" }
                         ].map(rep => (
                           <div key={rep.title} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/40 transition-all flex flex-col gap-6 group">
                              <div className="flex items-center justify-between">
                                 <FileJson className="text-zinc-600 group-hover:text-primary transition-colors" size={24} />
                                 <span className="text-[9px] font-mono text-emerald-500 uppercase font-black">{rep.status}</span>
                              </div>
                              <div>
                                 <h4 className="text-lg font-bold uppercase tracking-tight">{rep.title}</h4>
                                 <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">{rep.date}</p>
                              </div>
                              <button className="mt-4 py-3 bg-white/5 rounded-xl text-[9px] font-mono font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-black transition-all">Download Protocol</button>
                           </div>
                         ))}
                      </motion.div>
                    )}

                    {dashTab === 'admin' && (
                      <motion.div 
                        key="admin" 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                      >
                         <div className="p-10 rounded-[3.5rem] bg-primary/10 border border-primary/20 space-y-10">
                            <div className="flex items-start justify-between">
                               <div>
                                  <h4 className="text-xl font-display font-medium italic italic text-white uppercase tracking-tight">Manual Logic Intervention</h4>
                                  <p className="text-xs text-zinc-400 mt-2 italic">Override autonomous optimization heuristics for specific market segments.</p>
                               </div>
                               <Lock className="text-primary" size={24} />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <div className="space-y-4">
                                  <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">Governance Aggression</label>
                                  <div className="h-1.5 w-full bg-white/10 rounded-full relative overflow-hidden">
                                     <div className="absolute top-0 left-0 h-full bg-primary w-3/4 shadow-neon" />
                                  </div>
                                  <div className="flex justify-between text-[9px] font-mono text-zinc-700 uppercase">
                                     <span>Conservative</span>
                                     <span className="text-primary font-black">Aggressive</span>
                                  </div>
                               </div>
                               <div className="space-y-4">
                                  <label className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">Refinement Frequency</label>
                                  <div className="flex gap-2">
                                     {['Real-time', 'Hourly', 'Weekly'].map(f => (
                                       <button key={f} className={`flex-1 py-3 rounded-xl border text-[9px] font-mono uppercase font-black tracking-widest ${f === 'Real-time' ? 'bg-primary text-black border-primary' : 'bg-black/40 border-white/10 text-zinc-600 hover:text-white'}`}>{f}</button>
                                     ))}
                                  </div>
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>
         </div>
      </section>

      {/* Cinematic Closing */}
      <section className="py-48 px-8 relative overflow-hidden flex flex-col items-center text-center">
          <div className="max-w-4xl space-y-12 relative z-10">
             <motion.div 
               animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.1, 0.2, 0.1] }}
               transition={{ repeat: Infinity, duration: 8 }}
               className="absolute inset-0 bg-primary/20 blur-[150px] -z-10" 
             />
             <h2 className="text-7xl md:text-9xl font-display font-medium italic tracking-tighter leading-none text-white">
                IPDM <span className="text-primary">EVOLVE™</span>
             </h2>
             <p className="text-2xl md:text-3xl text-zinc-400 font-medium italic leading-relaxed max-w-2xl mx-auto">
                "A continuous intelligence infrastructure that ensures your business becomes smarter, faster, and more valuable every day."
             </p>
             <div className="flex flex-wrap justify-center gap-8 pt-12">
               <button className="px-12 py-6 bg-primary text-black font-black uppercase text-sm tracking-[0.2em] rounded-3xl shadow-neon group flex items-center gap-4">
                 Activate EVOLVE™ <ArrowRight className="group-hover:translate-x-2 transition-transform" />
               </button>
               <button className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase text-sm tracking-[0.2em] rounded-3xl hover:bg-white/10 transition-all">
                 Contact Enterprise Rep
               </button>
             </div>
          </div>
      </section>

      {/* Bottom Footer Credits */}
      <footer className="py-12 border-t border-white/5 px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
         <div className="flex items-center gap-4">
            <span className="font-black">© 2026 IPDM Pvt. Ltd.</span>
            <span className="text-zinc-800">|</span>
            <span>Evolution Node ID: 2.14.88</span>
         </div>
         <div className="flex gap-12">
            <a href="#" className="hover:text-primary transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-primary transition-colors">Safety Ethics</a>
            <a href="#" className="hover:text-primary transition-colors">Admin Governance</a>
         </div>
      </footer>
    </div>
  );
}
