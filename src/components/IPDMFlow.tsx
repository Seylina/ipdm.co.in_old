import { motion, AnimatePresence } from "motion/react";
import { 
  Workflow, 
  Zap, 
  Users, 
  GitBranch, 
  Target, 
  RefreshCw, 
  Share2, 
  Database, 
  Cpu, 
  Bell, 
  TrendingUp, 
  Eye, 
  ShieldCheck, 
  Globe, 
  ArrowLeft,
  ArrowRight,
  Maximize2,
  FileJson,
  Bot,
  User,
  Send,
  Settings,
  Activity,
  Layers,
  ChevronRight,
  Sparkles,
  Lock,
  Boxes,
  Binary,
  LineChart,
  BarChart3,
  Network
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
  BarChart,
  Bar,
  Cell,
  Line,
  LineChart as ReLineChart,
  PieChart,
  Pie
} from "recharts";

// Architecture Layers for IPDM FLOW™
const FLOW_LAYERS = [
  { id: "layer1", name: "Foundation Layer", icon: <Cpu />, desc: "Core workflow intelligence & execution coordination." },
  { id: "layer2", name: "Knowledge Layer", icon: <Database />, desc: "Structured business intelligence & operational context." },
  { id: "layer3", name: "Proprietary Logic Layer", icon: <Lock />, desc: "Intelligent decision logic & execution boundaries." },
  { id: "layer4", name: "Multi-Agent Coordination", icon: <Users />, desc: "Role-based AI execution & distributed intelligence." },
  { id: "layer5", name: "Execution Layer", icon: <Zap />, desc: "Real-time action triggering & system synchronization." },
  { id: "layer6", name: "Insight Layer", icon: <Activity />, desc: "Operational visibility, analytics & optimization." }
];

// 14 Features Data
const FEATURES = [
  { id: 1, name: "End-to-End Coordination", icon: <Workflow />, desc: "Connects fragmented systems into a continuous flow." },
  { id: 2, name: "Event-Driven Automation", icon: <Zap />, desc: "Instant execution based on real-time operational signals." },
  { id: 3, name: "Multi-Agent Coordination", icon: <Users />, desc: "Role-specific AI agents collaborating on complex workflows." },
  { id: 4, name: "Conditional Decision Routing", icon: <GitBranch />, desc: "Intelligent IF/ELSE logic for adaptive operational flows." },
  { id: 5, name: "Lead Flow Management", icon: <Target />, desc: "Automated capture, scoring, and lifecycle tracking." },
  { id: 6, name: "Continuous Feedback Loops", icon: <RefreshCw />, desc: "AI-driven refinement of workflow execution quality." },
  { id: 7, name: "Integration Engine", icon: <Share2 />, desc: "Unifies website, CRM, and databases into one ecosystem." },
  { id: 8, name: "Real-Time Data Sync", icon: <RefreshCw />, desc: "Instant updates across all connected business platforms." },
  { id: 9, name: "AI Workflow Intelligence", icon: <BrainIcon />, desc: "Predictive outcomes and personalized execution paths." },
  { id: 10, name: "Action & Notification Engine", icon: <Bell />, desc: "Automated task assignments and execution alerts." },
  { id: 11, name: "Funnel Optimization", icon: <TrendingUp />, desc: "Improves journey efficiency and reduces drop-offs." },
  { id: 12, name: "Visibility & Audit Trails", icon: <Eye />, desc: "Full traceability and operational transparency logs." },
  { id: 13, name: "Governance & Control", icon: <ShieldCheck />, desc: "Enforces execution boundaries and compliance logic." },
  { id: 14, name: "Cross-Channel Scalability", icon: <Globe />, desc: "Enterprise-scale execution across all digital touchpoints." }
];

function BrainIcon() { return <Cpu size={16} />; }

// Mock Data for Dashboard
const WORKFLOW_TRAFFIC = [
  { name: '00:00', load: 120, executed: 115 },
  { name: '04:00', load: 85, executed: 84 },
  { name: '08:00', load: 450, executed: 442 },
  { name: '12:00', load: 980, executed: 972 },
  { name: '16:00', load: 1250, executed: 1240 },
  { name: '20:00', load: 850, executed: 845 },
  { name: '23:59', load: 300, executed: 298 },
];

const AGENT_STATUS = [
  { name: 'Sales', val: 94, fill: '#22d3ee' },
  { name: 'Support', val: 82, fill: '#a855f7' },
  { name: 'Ops', val: 98, fill: '#10b981' },
];

export function IPDMFlow({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [dashTab, setDashTab] = useState<'control' | 'leads' | 'agents' | 'ops' | 'gov'>('control');
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
      const prompt = `SYSTEM ROLE: You are IPDM FLOW™, an enterprise-grade AI workflow coordination engine.
      NATURE: Intelligent workflow execution backbone.
      BEHAVIOR: Mature, operational, precise, concise. Use minimum possible tokens.
      CAPABILITIES: 14 Features including Coordination, Event-driven automation, Multi-agent coordination.
      RESPONSE RULES: Avoid fluff. Prioritize clarity and operational facts. Provide structured outputs.`;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user' as any, parts: [{ text: m.content }] })), { role: 'user', parts: [{ text: userMsg }] }],
        config: { systemInstruction: prompt }
      });
      setMessages(prev => [...prev, { role: 'assistant', content: result.text || "COMMUNICATION ERROR: Coordination node timeout." }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM FAILURE: Workflow execution disrupted. Resetting context." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col font-sans overflow-x-hidden selection:bg-primary/30 transition-colors duration-1000">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-indigo-500/5 rounded-full blur-[200px] opacity-20" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      {/* Header HUD */}
      <header className="h-20 border-b border-[var(--color-text)]/5 bg-[var(--color-bg)]/40 backdrop-blur-3xl flex items-center justify-between px-8 sticky top-0 z-[60]">
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('ecosystem')} className="p-2 hover:bg-[var(--color-text)]/5 rounded-full transition-colors text-zinc-500 hover:text-[var(--color-text)]">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-display font-black italic tracking-widest text-[var(--color-text)]">
              <Trademark text="IPDM Flow" />
            </h1>
            <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-[0.4em]">Workflow Coordination Engine</span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-8 border-l border-[var(--color-text)]/5 pl-8">
            <div className="text-right">
               <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Exec Node Status</p>
               <div className="flex items-center gap-2 justify-end">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-neon animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-500">SYNCHRONIZED</span>
               </div>
            </div>
            <div className="text-right">
               <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Global Handlers</p>
               <span className="text-[10px] font-bold text-zinc-500">12,482 ACTIVE</span>
            </div>
            <button className="px-6 py-2 bg-primary text-black rounded-xl text-[11px] font-mono font-black uppercase tracking-wider hover:scale-105 transition-all shadow-neon">
               Deploy Workflow
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 lg:p-10 space-y-12 pb-24">
        
        {/* Section 1: Hero & Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
           {/* Left: Statement */}
           <div className="lg:col-span-4 space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
                    <Workflow size={12} /> Execution Layer v5.1
                 </div>
                 <h2 className="text-6xl md:text-7xl font-display font-medium italic tracking-tighter leading-[0.9]">
                   From Static To <span className="text-primary italic">Continuous.</span>
                 </h2>
                 <p className="text-zinc-500 text-lg leading-relaxed max-w-md italic">
                   IPDM FLOW™ is the operational backbone that coordinates multi-agent intelligence into autonomous business execution chains.
                 </p>
              </motion.div>

              <div className="flex flex-col gap-4">
                 <div className="p-8 rounded-[2.5rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 space-y-4 glass">
                    <h4 className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                       <Target size={12} className="text-primary" /> Core Outcome
                    </h4>
                    <p className="text-sm font-medium italic text-zinc-500">
                       Transforming fragmented business tools into one unified, intelligent, and autonomous operating system.
                    </p>
                 </div>
                 <div className="flex gap-4">
                    <button className="flex-1 py-4 bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 rounded-2xl text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[var(--color-text)]/10 transition-all text-zinc-500 hover:text-[var(--color-text)]">Documentation</button>
                    <button className="flex-1 py-4 bg-primary/10 border border-primary/20 text-primary rounded-2xl text-[10px] font-mono font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all">Request Demo</button>
                 </div>
              </div>
           </div>

           {/* Right: Architecture Visualizer */}
           <div className="lg:col-span-8 p-12 rounded-[3.5rem] bg-[var(--color-text)]/[0.01] border border-[var(--color-text)]/5 relative overflow-hidden glass min-h-[600px] flex flex-col justify-center">
              <div className="absolute inset-0 bg-grid opacity-10" />
              <div className="relative z-10 max-w-3xl mx-auto w-full space-y-3">
                 <div className="text-center mb-10">
                    <h3 className="text-sm font-mono font-black text-zinc-600 uppercase tracking-[0.4em] mb-2 italic">Refinement Layer Stack</h3>
                    <div className="w-20 h-0.5 bg-primary/20 mx-auto" />
                 </div>
                 {FLOW_LAYERS.map((layer, idx) => (
                   <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                    className={`w-full h-16 rounded-2xl border flex items-center px-8 cursor-pointer transition-all relative
                      ${activeLayer === layer.id ? 'bg-primary text-black border-primary scale-105 shadow-neon z-20' : 'bg-[var(--color-bg)]/40 border-[var(--color-text)]/10 text-zinc-400 hover:border-[var(--color-text)]/30 backdrop-blur-xl'}
                    `}
                   >
                     <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-6">
                           <div className={`p-2 rounded-xl border border-[var(--color-text)]/5 ${activeLayer === layer.id ? 'bg-black text-primary' : 'bg-[var(--color-text)]/5 text-zinc-600 group-hover:text-[var(--color-text)]'}`}>
                             {layer.icon}
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-mono font-black uppercase tracking-widest mb-0.5 opacity-60">Layer 0{idx+1}</span>
                              <span className="text-sm font-bold uppercase tracking-tight">{layer.name}</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-10">
                           <AnimatePresence>
                             {activeLayer === layer.id && (
                               <motion.p 
                                 initial={{ opacity: 0, x: 20 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 exit={{ opacity: 0, x: 20 }}
                                 className="text-xs font-medium italic text-right max-w-sm opacity-80"
                               >
                                 {layer.desc}
                               </motion.p>
                             )}
                           </AnimatePresence>
                           <ChevronRight className={`transition-transform ${activeLayer === layer.id ? 'rotate-90' : ''}`} size={18} />
                        </div>
                     </div>
                     {idx < FLOW_LAYERS.length - 1 && (
                        <div className="absolute -bottom-1.5 left-12 w-[2px] h-3 bg-[var(--color-text)]/5" />
                     )}
                   </motion.div>
                 ))}
                 
                 {/* Visual Flow Loop */}
                 <div className="mt-12 flex justify-center gap-8">
                    {[
                      { icon: <Zap size={14} />, label: "Event" },
                      { icon: <Cpu size={14} />, label: "Intel" },
                      { icon: <GitBranch size={14} />, label: "Decision" },
                      { icon: <Workflow size={14} />, label: "Action" }
                    ].map((step, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 group">
                         <div className="p-3 rounded-full bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 group-hover:border-primary/40 transition-all">
                            {step.icon}
                         </div>
                         <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">{step.label}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Section 2: Command & Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[900px]">
           
           {/* Center Console: Workflow Intelligence */}
           <div className="lg:col-span-5 flex flex-col rounded-[3rem] bg-[var(--color-text)]/[0.01] border border-[var(--color-text)]/5 relative overflow-hidden glass shadow-3xl">
              <div className="p-8 border-b border-[var(--color-text)]/5 flex items-center justify-between bg-[var(--color-bg)]/40">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-neon" />
                    <span className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-primary">Execution Workspace</span>
                 </div>
                 <div className="flex gap-4">
                    <button className="p-2 hover:bg-[var(--color-text)]/5 rounded-xl text-zinc-600 transition-colors"><Settings size={16} /></button>
                    <button className="p-2 hover:bg-[var(--color-text)]/5 rounded-xl text-zinc-600 transition-colors"><Maximize2 size={16} /></button>
                 </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar-thin">
                 {messages.length === 0 && (
                   <div className="h-full flex flex-col items-center justify-center text-center space-y-12">
                      <div className="w-24 h-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center border border-primary/20 animate-pulse relative">
                         <Bot className="w-12 h-12 text-primary" />
                         <div className="absolute inset-0 bg-primary/20 blur-[60px] -z-10" />
                      </div>
                      <div className="space-y-4">
                         <h2 className="text-4xl font-display font-medium italic tracking-tighter">Talk to IPDM FLOW™</h2>
                         <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest max-w-sm mx-auto leading-loose italic">
                            Command the unified coordination layer. Analyze events, trigger workflows, and optimize operational intelligence.
                         </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                        {[
                          "Automate lead capture workflow",
                          "Explain multi-agent coordination",
                          "How does real-time sync work?",
                          "Optimize funnel execution"
                        ].map(q => (
                        <div key={q} className="group/q relative">
                          <button 
                            key={q}
                            onClick={() => setInput(q)}
                            className="w-full p-5 bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/5 rounded-2xl text-[10px] font-mono font-black uppercase tracking-widest text-zinc-600 hover:text-[var(--color-text)] hover:border-primary/40 text-left transition-all backdrop-blur-xl"
                          >
                            {q}
                          </button>
                        </div>
                        ))}
                      </div>
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
                       <div className="w-12 h-12 bg-primary/10 rounded-2xl flex-shrink-0 flex items-center justify-center border border-primary/20">
                          <Bot size={22} className="text-primary" />
                       </div>
                     )}
                     <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                        <div className={`p-8 rounded-[2.5rem] ${msg.role === 'user' ? 'bg-primary text-black font-bold shadow-neon' : 'bg-[var(--color-text)]/[0.04] border border-[var(--color-text)]/5 text-zinc-400'}`}>
                           <div className="whitespace-pre-wrap leading-relaxed text-sm font-mono tracking-tight">
                              {msg.content}
                           </div>
                        </div>
                     </div>
                     {msg.role === 'user' && (
                       <div className="w-12 h-12 bg-[var(--color-text)]/10 rounded-2xl flex-shrink-0 flex items-center justify-center border border-[var(--color-text)]/20">
                          <User size={22} className="text-zinc-500" />
                       </div>
                     )}
                   </motion.div>
                 ))}
                 {isLoading && (
                   <div className="flex gap-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 animate-spin">
                         <RefreshCw size={22} className="text-primary" />
                      </div>
                      <div className="p-8 rounded-[2.5rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 text-zinc-600 flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest font-black transition-colors duration-1000">
                         Coordinating Logic...
                         <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                   </div>
                 )}
              </div>

              <div className="p-12 border-t border-[var(--color-text)]/5 bg-[var(--color-bg)]/40 backdrop-blur-3xl">
                 <div className="relative max-w-4xl mx-auto group">
                    <input 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="INPUT OPERATIONAL COMMAND..."
                      className="w-full bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/10 rounded-[2.5rem] p-8 pr-24 text-sm focus:outline-none focus:border-primary/40 focus:bg-[var(--color-text)]/[0.05] transition-all font-mono tracking-[0.2em] uppercase placeholder:text-zinc-800 text-[var(--color-text)]"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-4 top-4 bottom-4 aspect-square bg-primary text-black rounded-3xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-neon disabled:opacity-30"
                    >
                      <Send size={22} />
                    </button>
                 </div>
              </div>
           </div>

           {/* Right Col: Dashboard Suite */}
           <div className="lg:col-span-7 flex flex-col rounded-[3rem] bg-[var(--color-text)]/[0.01] border border-[var(--color-text)]/5 relative overflow-hidden glass shadow-2xl">
              <div className="p-10 border-b border-[var(--color-text)]/5 flex items-center justify-between">
                 <div>
                    <h3 className="text-base font-display font-medium uppercase tracking-[0.4em] italic text-primary">Insight Console</h3>
                    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Real-time Operational Intelligence</p>
                 </div>
                 <div className="flex p-1.5 bg-[var(--color-text)]/5 rounded-2xl border border-[var(--color-text)]/10">
                    {[
                      { id: 'control', icon: <Workflow size={16} /> },
                      { id: 'leads', icon: <Target size={16} /> },
                      { id: 'agents', icon: <Users size={16} /> },
                      { id: 'ops', icon: <LineChart size={16} /> },
                      { id: 'gov', icon: <ShieldCheck size={16} /> }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setDashTab(tab.id as any)}
                        className={`p-3.5 rounded-xl transition-all ${dashTab === tab.id ? 'bg-primary text-black shadow-neon scale-110 z-10' : 'text-zinc-600 hover:text-[var(--color-text)] hover:bg-[var(--color-text)]/5'}`}
                      >
                        {tab.icon}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                 <AnimatePresence mode="wait">
                    {dashTab === 'control' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="control" className="space-y-12">
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                              { label: "Executions", val: "24.8K", trend: "+12.4%", status: "OPTIMAL" },
                              { label: "Sync Latency", val: "14ms", trend: "Minimal", status: "STABLE" },
                              { label: "Success Rate", val: "99.98%", trend: "+0.02%", status: "PEAK" },
                              { label: "Active Procs", val: "1,242", trend: "Elastic", status: "SCALING" }
                            ].map(kpi => (
                             <div key={kpi.label} className="p-8 rounded-[2.5rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 flex flex-col gap-1">
                                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.2em]">{kpi.label}</p>
                                <h4 className="text-3xl font-display font-medium italic tracking-tighter text-[var(--color-text)]">{kpi.val}</h4>
                                <div className="flex items-center gap-2 mt-2">
                                   <span className="text-[11px] font-mono text-primary font-black">{kpi.trend}</span>
                                   <span className="text-[7px] font-mono text-zinc-700 bg-[var(--color-bg)] px-1.5 py-0.5 rounded uppercase">{kpi.status}</span>
                                </div>
                             </div>
                            ))}
                         </div>
                         <div className="p-10 rounded-[3.5rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 h-80 relative overflow-hidden group transition-colors duration-1000">
                             <div className="absolute top-0 right-0 p-8">
                                <Activity className="text-zinc-700 group-hover:text-primary transition-colors" size={24} />
                             </div>
                             <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-10 italic">Global Workflow Traffic Matrix</h4>
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={WORKFLOW_TRAFFIC}>
                                   <defs>
                                      <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                         <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                                         <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                      </linearGradient>
                                   </defs>
                                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                   <XAxis dataKey="name" hide />
                                   <YAxis hide />
                                   <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} />
                                   <Area type="monotone" dataKey="load" stroke="#22d3ee" strokeWidth={4} fill="url(#colorLoad)" />
                                   <Area type="monotone" dataKey="executed" stroke="#a855f7" strokeWidth={2} fill="none" strokeDasharray="5 5" />
                                </AreaChart>
                             </ResponsiveContainer>
                         </div>
                      </motion.div>
                    )}

                    {dashTab === 'leads' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="leads" className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                          <div className="p-10 rounded-[3rem] bg-[var(--color-bg)]/40 border border-[var(--color-text)]/10 flex flex-col items-center justify-center transition-colors duration-1000">
                             <h4 className="text-[11px] font-display font-medium italic text-zinc-500 uppercase tracking-[0.4em] mb-10 italic self-start">Lead Qualification Intent</h4>
                             <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                   <PieChart>
                                      <Pie data={[{name:'H',v:42,f:'#ef4444'},{name:'W',v:35,f:'#f59e0b'},{name:'C',v:23,f:'#3b82f6'}]} dataKey="v" innerRadius={70} outerRadius={110} paddingAngle={8} stroke="none">
                                         {[{name:'H',v:42,f:'#ef4444'},{name:'W',v:35,f:'#f59e0b'},{name:'C',v:23,f:'#3b82f6'}].map((e,i)=><Cell key={i} fill={e.f}/>)}
                                      </Pie>
                                      <Tooltip />
                                   </PieChart>
                                </ResponsiveContainer>
                             </div>
                             <div className="flex gap-8 mt-10">
                                {['Hot','Warm','Cold'].map(l=>(
                                  <div key={l} className="flex items-center gap-2">
                                     <div className={`w-2 h-2 rounded-full ${l==='Hot'?'bg-rose-500':l==='Warm'?'bg-amber-500':'bg-blue-500'}`} />
                                     <span className="text-[10px] font-mono text-zinc-500 uppercase">{l}</span>
                                  </div>
                                ))}
                             </div>
                          </div>
                          <div className="space-y-6">
                             <div className="p-8 rounded-[2.5rem] bg-[var(--color-bg)]/40 border border-[var(--color-text)]/10 flex flex-col gap-6 transition-colors duration-1000">
                                <h4 className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] italic">Priority Lead Stream</h4>
                                <div className="space-y-4">
                                   {[
                                     { n: "John Doe", intent: "Enterprise ROI", score: 98 },
                                     { n: "Jane Smith", intent: "Workflow Audit", score: 94 },
                                     { n: "TechCorp", intent: "API Expansion", score: 92 }
                                   ].map(lead => (
                                     <div key={lead.n} className="flex items-center justify-between p-4 rounded-2xl bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/10 group hover:border-primary/30 transition-all transition-colors duration-1000">
                                        <div>
                                           <p className="text-[11px] font-bold text-[var(--color-text)] uppercase tracking-tighter transition-colors duration-1000">{lead.n}</p>
                                           <p className="text-[11px] font-mono text-zinc-700 uppercase">{lead.intent}</p>
                                        </div>
                                        <div className="text-right">
                                           <span className="text-[11px] font-display font-medium italic text-emerald-500">{lead.score}</span>
                                           <p className="text-[7px] font-mono text-zinc-800 uppercase">Qual Score</p>
                                        </div>
                                     </div>
                                   ))}
                                </div>
                             </div>
                          </div>
                       </motion.div>
                    )}

                    {dashTab === 'agents' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="agents" className="space-y-10">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             {[
                               { n: "Sales Agent", load: "92%", status: "Evolved" },
                               { n: "Support Agent", load: "14%", status: "Optimal" },
                               { n: "Ops Agent", load: "28%", status: "Active" }
                             ].map(agent => (
                               <div key={agent.n} className="p-8 rounded-[2.5rem] bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/10 glass flex flex-col items-center text-center gap-4 group hover:border-primary/40 transition-all transition-colors duration-1000">
                                  <div className="w-16 h-16 bg-[var(--color-text)]/5 rounded-[1.5rem] flex items-center justify-center border border-[var(--color-text)]/10 group-hover:bg-primary/10 group-hover:text-primary transition-all transition-colors duration-1000">
                                     <Users size={24} />
                                  </div>
                                  <div>
                                     <h5 className="text-[11px] font-bold text-[var(--color-text)] uppercase tracking-widest transition-colors duration-1000">{agent.n}</h5>
                                     <p className="text-[11px] font-mono text-zinc-700 uppercase mt-1">Load: {agent.load}</p>
                                  </div>
                                  <div className="mt-4 px-3 py-1 bg-primary/10 rounded-full text-[10px] font-mono text-primary font-black uppercase tracking-wider">
                                     {agent.status}
                                  </div>
                               </div>
                             ))}
                          </div>
                          <div className="p-10 rounded-[3rem] bg-[var(--color-bg)]/40 border border-[var(--color-text)]/5 space-y-6 transition-colors duration-1000">
                             <h4 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-4 italic">Inter-Agent Logic Coordination Buffer</h4>
                             <div className="space-y-4">
                                {[
                                  "Sales Agent handover to Workflow Coordinator... [ACK]",
                                  "Knowledge Engine query latency minimized... [12ms]",
                                  "Governance Guard validated transaction security... [PASS]"
                                ].map((log, i) => (
                                  <div key={i} className="flex items-center gap-4 text-[10px] font-mono text-zinc-500">
                                     <div className="w-1 h-1 rounded-full bg-primary" />
                                     <span>{log}</span>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </motion.div>
                    )}

                    {dashTab === 'ops' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="ops" className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className="p-10 rounded-[3rem] bg-[var(--color-bg)]/20 border border-[var(--color-text)]/10 flex flex-col gap-8 transition-colors duration-1000">
                             <h4 className="text-[11px] font-display font-medium italic text-zinc-500 uppercase tracking-[0.4em] italic mb-4">Conversion Efficiency Loop</h4>
                             <div className="space-y-8">
                                {[
                                  { label: "Funnel Flow", val: "+24.2%", trend: "Optimal" },
                                  { label: "Execution Precision", val: "99.92%", trend: "High" },
                                  { label: "System Uptime", val: "100.00%", trend: "Perfect" }
                                ].map(res => (
                                  <div key={res.label} className="space-y-2">
                                     <div className="flex justify-between items-center px-1">
                                        <span className="text-[10px] font-mono text-zinc-600 uppercase">{res.label}</span>
                                        <span className="text-sm font-bold text-[var(--color-text)] transition-colors duration-1000">{res.val}</span>
                                     </div>
                                     <div className="h-1.5 w-full bg-[var(--color-text)]/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-primary shadow-neon" />
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </div>
                          <div className="space-y-6">
                             {[
                               { t: "What is happening?", d: "Autonomous lead prioritization loop is scaling for peak logic demand." },
                               { t: "What it means?", d: "Conversion probability for enterprise-tier interactions is up 22.4%." },
                               { t: "Recommendation", d: "Increase reasoning depth for high-intent objection handlers." }
                             ].map((ins, i) => (
                               <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 glass group hover:border-primary/40 transition-all">
                                  <h5 className="text-[11px] font-mono text-primary uppercase tracking-wider mb-2">{ins.t}</h5>
                                  <p className="text-xs text-zinc-500 italic pr-4">"{ins.d}"</p>
                               </div>
                             ))}
                          </div>
                       </motion.div>
                    )}

                    {dashTab === 'gov' && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="gov" className="space-y-12">
                          <div className="p-10 rounded-[3.5rem] bg-primary/10 border border-primary/20 space-y-10 relative overflow-hidden group">
                             <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px]" />
                             <div className="flex items-start justify-between">
                                <div>
                                   <h4 className="text-2xl font-display font-medium italic italic text-white uppercase tracking-tight">System Governance Console</h4>
                                   <p className="text-xs text-zinc-400 mt-2 italic max-w-lg">
                                      Enforcing operational boundaries, secure data synchronization, and execution compliance across all intelligence nodes.
                                   </p>
                                </div>
                                <ShieldCheck className="text-primary animate-pulse" size={40} />
                             </div>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
                                {[
                                  { l: "Security Layer", s: "E2EE" },
                                  { l: "Policy Match", s: "100%" },
                                  { l: "Audit State", s: "LOGGED" },
                                  { l: "Failover", s: "ACTIVE" }
                                ].map(st => (
                                  <div key={st.l} className="text-center group-hover:scale-110 transition-transform">
                                     <p className="text-[11px] font-mono text-zinc-600 uppercase mb-1">{st.l}</p>
                                     <p className="text-sm font-black text-white">{st.s}</p>
                                  </div>
                                ))}
                             </div>
                          </div>
                          <div className="p-10 rounded-[3.5rem] bg-black border border-white/5">
                             <div className="flex items-center gap-3 mb-6">
                                <FileJson className="text-zinc-700" size={16} />
                                <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest italic">Live Audit Buffers (v.2.14.88)</span>
                             </div>
                             <pre className="text-[10px] font-mono text-primary/40 leading-relaxed max-h-40 overflow-y-auto custom-scrollbar-thin">
                                {JSON.stringify({
                                  node: "FLOW_COORDINATOR_01",
                                  status: "SYNCHRONIZED",
                                  governance_status: "ENFORCED",
                                  active_agents: ["Sales", "Support", "Ops", "Gov"],
                                  last_sync: new Date().toISOString(),
                                  latency_matrix: [12, 14, 11, 15]
                                }, null, 2)}
                             </pre>
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           </div>
        </div>

        {/* Section 3: 14 Features Grid */}
        <div className="space-y-16">
           <div className="text-center space-y-4">
              <h2 className="text-[14px] font-mono font-black text-primary uppercase tracking-[0.5em]">Scalable Infrastructure</h2>
              <h3 className="text-5xl font-display font-medium italic tracking-tight">Enterprise <span className="text-zinc-600 italic">Workflow</span> Ecosystem</h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {FEATURES.map((feature, idx) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  key={feature.id}
                  className="p-10 rounded-[2.5rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 hover:border-primary/40 transition-all group glass flex flex-col gap-6"
                >
                   <div className="p-4 rounded-[1.5rem] bg-[var(--color-text)]/5 group-hover:bg-primary/10 group-hover:text-primary transition-all w-fit border border-[var(--color-text)]/5">
                      {feature.icon}
                   </div>
                   <div className="space-y-3">
                      <h4 className="text-[11px] font-mono font-black uppercase text-[var(--color-text)] tracking-widest">{feature.name}</h4>
                      <p className="text-[11px] text-zinc-500 leading-relaxed font-medium italic">"{feature.desc}"</p>
                   </div>
                   <div className="flex items-center gap-2 mt-auto">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 transition-all" />
                      <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-tighter">Execution Node 0{feature.id}</span>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Final CTA */}
        <div className="mt-24 p-20 rounded-[4rem] bg-gradient-to-br from-primary/10 via-black to-black border border-primary/20 relative overflow-hidden text-center space-y-12 glass">
           <motion.div 
             animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
             transition={{ repeat: Infinity, duration: 10 }}
             className="absolute inset-0 bg-primary/20 blur-[150px] -z-10" 
           />
           <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-6xl md:text-8xl font-display font-medium italic tracking-tighter leading-none text-[var(--color-text)]">
                 IPDM <span className="text-primary italic">FLOW™</span>
              </h2>
              <p className="text-2xl md:text-3xl text-zinc-400 font-medium italic leading-relaxed max-w-3xl mx-auto">
                 "A scalable business operating infrastructure that transforms static goals into intelligent execution chains."
              </p>
           </div>
           <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="px-12 py-6 bg-primary text-black font-black uppercase text-sm tracking-[0.2em] rounded-3xl shadow-neon flex items-center gap-4 group hover:scale-105 active:scale-95 transition-all">
                 Initialize FLOW™ <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="px-12 py-6 bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 text-[var(--color-text)] font-black uppercase text-sm tracking-[0.2em] rounded-3xl hover:bg-[var(--color-text)]/10 transition-all flex items-center gap-3">
                 View System Specs <FileJson size={18} />
              </button>
           </div>
           <div className="flex justify-center gap-16 pt-12 border-t border-[var(--color-text)]/5 max-w-3xl mx-auto">
              {[
                { label: "Uptime", val: "100%" },
                { label: "Governance", val: "Enforced" },
                { label: "Scale", val: "Enterprise" }
              ].map(spec => (
                <div key={spec.label} className="text-center">
                   <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">{spec.label}</p>
                   <p className="text-xl font-display font-medium italic text-[var(--color-text)]/40">{spec.val}</p>
                </div>
              ))}
           </div>
        </div>

      </main>

      {/* Footer Credits */}
      <footer className="py-12 border-t border-white/5 px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
         <div className="flex items-center gap-4">
            <span className="font-black">© 2026 IPDM Pvt. Ltd.</span>
            <span className="text-zinc-900 mx-2">|</span>
            <span>Workflow Execution Node: F.14.82</span>
         </div>
         <div className="flex gap-10">
            <a href="#" className="hover:text-primary transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-primary transition-colors">Safety Logic</a>
            <a href="#" className="hover:text-primary transition-colors">Governance Rules</a>
         </div>
      </footer>
    </div>
  );
}
