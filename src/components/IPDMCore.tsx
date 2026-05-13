import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, 
  Workflow, 
  Brain, 
  Database, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  LineChart, 
  LayoutDashboard, 
  Layers, 
  Settings, 
  Activity, 
  Eye, 
  Search, 
  CheckCircle2, 
  ChevronRight, 
  MessageSquare, 
  Bot, 
  User, 
  Send, 
  Network, 
  ArrowRight,
  Maximize2,
  FileJson,
  TrendingUp,
  Target,
  RefreshCw,
  Binary,
  Globe,
  Share2,
  Lock,
  Boxes
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
  PieChart,
  Pie,
  Line,
  LineChart as ReLineChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from "recharts";

// Architecture Layers Data
const ARCHITECTURE_LAYERS = [
  { id: "layer1", name: "Interface Layer", icon: <LayoutDashboard />, color: "bg-blue-500", desc: "Multi-channel interaction & client touchpoints." },
  { id: "layer2", name: "Coordination Layer", icon: <Workflow />, color: "bg-indigo-500", desc: "Central coordination & task routing engine." },
  { id: "layer3", name: "Intelligence Layer", icon: <Brain />, color: "bg-purple-500", desc: "Core cognitive processing & reasoning nodes." },
  { id: "layer4", name: "Knowledge Layer", icon: <Database />, color: "bg-blue-600", desc: "Semantic memory & structured data retrieval." },
  { id: "layer5", name: "Data Processing Layer", icon: <Activity />, color: "bg-cyan-500", desc: "Real-time stream processing & data cleaning." },
  { id: "layer6", name: "Automation Layer", icon: <Zap />, color: "bg-amber-500", desc: "Autonomous execution of workflows & tasks." },
  { id: "layer7", name: "Insight & Decision Layer", icon: <Target />, color: "bg-emerald-500", desc: "KPI analysis & strategic recommendation engine." },
  { id: "layer8", name: "Governance & Control Layer", icon: <ShieldCheck />, color: "bg-rose-500", desc: "Security, ethics, compliance & safety guards." }
];

// 15 Features Data
const FEATURES = [
  { id: 1, name: "Coordination Engine", icon: <Workflow />, desc: "Central intelligence routing & AI coordination." },
  { id: 2, name: "Unified Integration Layer", icon: <Share2 />, desc: "Real-time sync across connected enterprise nodes." },
  { id: 3, name: "Real-Time Data Engine", icon: <Activity />, desc: "Live user behavior & event stream tracking." },
  { id: 4, name: "Structured Knowledge", icon: <Database />, desc: "Semantic AI-readable knowledge graphs." },
  { id: 5, name: "Multi-Agent Framework", icon: <Network />, desc: "Agent-to-agent collaborative communication." },
  { id: 6, name: "Continuous Learning", icon: <RefreshCw />, desc: "Self-improvement feedback loops." },
  { id: 7, name: "Lead Intelligence", icon: <Target />, desc: "Intent detection & hot/warm/cold classification." },
  { id: 8, name: "Decision Intelligence", icon: <Brain />, desc: "Strategic insight & business recommendations." },
  { id: 9, name: "Real-Time Automation", icon: <Zap />, desc: "Autonomous trigger-to-action execution." },
  { id: 10, name: "Workflow Architecture", icon: <Binary />, desc: "End-to-end dynamic process routing." },
  { id: 11, name: "Governance & Control", icon: <Lock />, desc: "Policy enforcement & risk management." },
  { id: 12, name: "24/7 Autonomous Ops", icon: <Globe />, desc: "Always-on intelligent operational infrastructure." },
  { id: 13, name: "Scalable Architecture", icon: <Boxes />, desc: "Plug-and-play modular enterprise blocks." },
  { id: 14, name: "Multi-Channel Engine", icon: <MessageSquare />, desc: "Unified web, chat, form & API interaction." },
  { id: 15, name: "Conversion Optimization", icon: <TrendingUp />, desc: "A/B testing & funnel drop-off analysis." }
];

// Mock Dashboard Data
const PERFORMANCE_DATA = [
  { name: "00:00", interactions: 400, leads: 24, conversion: 6 },
  { name: "04:00", interactions: 300, leads: 18, conversion: 5 },
  { name: "08:00", interactions: 800, leads: 92, conversion: 11 },
  { name: "12:00", interactions: 1200, leads: 156, conversion: 13 },
  { name: "16:00", interactions: 1500, leads: 210, conversion: 14 },
  { name: "20:00", interactions: 1100, leads: 140, conversion: 12 },
  { name: "23:59", interactions: 600, leads: 42, conversion: 7 },
];

const LEAD_CLASSIFICATION_DATA = [
  { name: 'Hot', value: 35, fill: '#ef4444' },
  { name: 'Warm', value: 45, fill: '#f59e0b' },
  { name: 'Cold', value: 20, fill: '#3b82f6' },
];

const AUTOMATION_RADAR_DATA = [
  { subject: 'Speed', A: 120, fullMark: 150 },
  { subject: 'Accuracy', A: 98, fullMark: 150 },
  { subject: 'Uptime', A: 150, fullMark: 150 },
  { subject: 'Scale', A: 140, fullMark: 150 },
  { subject: 'Security', A: 130, fullMark: 150 },
];

export function IPDMCore({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'kpi' | 'leads' | 'automation' | 'insights'>('kpi');
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
      const systemPrompt = `SYSTEM NAME: IPDM CORE™ — Intelligent Business Operating System
      
      ROLE: You are IPDM CORE™, the central intelligence engine. You coordinate workflows, manage AI agents, and provide decision intelligence.
      
      CAPABILITIES:
      - Intent Detection
      - Context Management
      - Internal Routing (Sales/Support/Knowledge/Lead Qual/Insight)
      - Concise Structured Responses
      
      RULES:
      - Use minimum possible tokens.
      - Maximize information density.
      - Avoid verbose paragraphs.
      - Use bullet points.
      - Professional maturity only.
      
      Suggest actions like Lead Qualification, ROI Analysis, or Workflow Execution where relevant.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user' as any, parts: [{ text: m.content }] })), { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: systemPrompt
        }
      });

      const responseText = response.text || "COMMUNICATION ERROR: Central Intelligence Layer timeout.";
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM FAILURE: Coordination node exhausted. Resetting session context." }]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col font-sans transition-colors duration-1000">
      {/* HUD Header */}
      <header className="h-20 border-b border-zinc-500/10 bg-[var(--color-bg)]/80 backdrop-blur-3xl flex items-center justify-between px-8 sticky top-0 z-[60] transition-all">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('ecosystem')}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-[var(--color-text)]"
          >
            <ChevronRight size={20} className="rotate-180" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-display font-black tracking-tight italic text-[var(--color-text)] flex items-center gap-2 group cursor-default">
              <Trademark text="IPDM Core" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-neon" />
            </h1>
            <span className="text-[12px] font-mono text-zinc-500 uppercase tracking-widest font-black">Intelligence Operating System</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-12">
           <div className="flex flex-col items-end">
              <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider">Active Channels</span>
              <div className="flex gap-1 mt-1">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-1 bg-primary/40 rounded-full" />)}
              </div>
           </div>
           <div className="flex flex-col items-end">
              <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider">Uptime</span>
              <span className="text-sm font-bold text-emerald-500">99.999%</span>
           </div>
           <button className="px-6 py-2 rounded-xl bg-primary/10 border border-primary/20 text-[12px] font-mono font-black text-primary hover:bg-primary hover:text-black transition-all uppercase tracking-wider whitespace-nowrap">
              Deploy System
           </button>
        </div>
      </header>

      {/* Main Command Center */}
      <div className="flex-1 max-w-[1920px] mx-auto w-full p-6 md:p-10 space-y-12">
        
        {/* Section 1: Hero & Architecture Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
           <div className="lg:col-span-4 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
                  <Cpu size={12} /> Version 4.0 Stable
                </div>
                <h2 className="text-6xl font-display font-medium italic tracking-tight leading-[0.95]">
                  The Central <span className="text-primary">Intelligence</span> Engine
                </h2>
                <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
                  Websites are the interface. AI is the capability. IPDM CORE™ is the unified coordination layer that transforms data into autonomous business outcomes.
                </p>
              </motion.div>

              <div className="flex gap-4">
                 <button className="flex-1 py-4 bg-primary text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-neon">
                   Initialize Core
                 </button>
                 <button className="flex-1 py-4 bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 text-[var(--color-text)] font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-[var(--color-text)]/10 transition-all">
                   Documentation
                 </button>
              </div>

              <div className="p-8 rounded-[2rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/10 space-y-6 glass">
                 <h3 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest flex items-center gap-2">
                   <Target size={12} className="text-primary" /> System Outcomes
                 </h3>
                 <div className="space-y-4">
                    {[
                      { label: "Efficiency Gain", val: "84%" },
                      { label: "Decision Latency", val: "12ms" },
                      { label: "Autonomous Workflows", val: "1,240+" }
                    ].map(res => (
                      <div key={res.label} className="flex justify-between items-end border-b border-[var(--color-text)]/5 pb-2">
                        <span className="text-xs text-zinc-400">{res.label}</span>
                        <span className="text-2xl font-display font-medium italic text-[var(--color-text)]">{res.val}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Animated Architecture visualization */}
           <div className="lg:col-span-8 p-10 rounded-[3rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative overflow-hidden group glass min-h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
              
              <div className="relative w-full max-w-3xl flex flex-col items-center">
                 {ARCHITECTURE_LAYERS.map((layer, idx) => (
                   <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, translateZ: 20 }}
                    onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                    className={`w-full h-16 mb-2 rounded-2xl border flex items-center px-6 cursor-pointer transition-all relative z-10 
                      ${activeLayer === layer.id ? 'bg-primary text-black border-primary scale-105 shadow-neon' : 'bg-[var(--color-bg)]/40 border-white/10 text-zinc-400 hover:border-primary/40 hover:text-[var(--color-text)] backdrop-blur-xl'}
                    `}
                   >
                     <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                           <div className={`p-2 rounded-lg ${activeLayer === layer.id ? 'bg-[var(--color-bg)] text-primary' : 'bg-white/5 text-zinc-500'}`}>
                              {React.cloneElement(layer.icon as React.ReactElement<any>, { size: 16 })}
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[11px] font-mono font-black uppercase tracking-wider mb-0.5">Layer 0{idx + 1}</span>
                              <span className="text-sm font-bold uppercase tracking-tight">{layer.name}</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <AnimatePresence>
                             {activeLayer === layer.id && (
                               <motion.p 
                                 initial={{ opacity: 0, x: 20 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 exit={{ opacity: 0, x: 20 }}
                                 className="text-[12px] font-medium italic pr-4 max-w-xs text-right opacity-80"
                               >
                                 {layer.desc}
                               </motion.p>
                             )}
                           </AnimatePresence>
                           <ChevronRight className={`transition-transform ${activeLayer === layer.id ? 'rotate-90' : ''}`} size={16} />
                        </div>
                     </div>

                     {/* Visual connection lines to next layer */}
                     {idx < ARCHITECTURE_LAYERS.length - 1 && (
                       <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-primary/20" />
                     )}
                   </motion.div>
                 ))}
                 
                 {/* Connection Glow Background */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-1 h-[500px] bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 blur-sm opacity-30" />
                 </div>
              </div>
           </div>
        </div>

        {/* Section 2: AI Coordination Workspace & Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[900px]">
           
           {/* Center Console: AI Agent */}
           <div className="lg:col-span-5 flex flex-col rounded-[3rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 relative overflow-hidden glass shadow-3xl">
              <div className="p-8 border-b border-[var(--color-text)]/5 flex items-center justify-between bg-[var(--color-bg)]/40 backdrop-blur-md">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-neon" />
                    <span className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-primary">Core Coordination Node</span>
                 </div>
                 <div className="flex gap-4">
                    <div className="px-3 py-1 bg-[var(--color-text)]/5 rounded-lg text-[11px] font-mono text-zinc-600 uppercase">Context: PROD_01</div>
                    <button className="text-zinc-600 hover:text-[var(--color-text)] transition-colors"><Maximize2 size={16} /></button>
                 </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar-thin">
                 {messages.length === 0 && (
                   <div className="h-full flex flex-col items-center justify-center text-center space-y-10">
                      <div className="relative">
                         <div className="w-24 h-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center border border-primary/20 animate-pulse">
                            <Bot className="w-10 h-10 text-primary" />
                         </div>
                         <div className="absolute -top-2 -right-2 px-2 py-1 bg-emerald-500 text-[10px] font-mono font-black text-black rounded uppercase">Online</div>
                      </div>
                      <div className="space-y-4">
                         <h2 className="text-3xl font-display font-medium italic">Talk to IPDM CORE™</h2>
                         <p className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider max-w-sm mx-auto">
                            Command the unified intelligence layer. Execute workflows, query insights, and automate outcomes.
                         </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                        {[
                          "How can IPDM CORE improve my business?",
                          "How are leads qualified?",
                          "How does orchestration work?",
                          "Simulate ROI on automation"
                        ].map(q => (
                          <button 
                            key={q}
                            onClick={() => setInput(q)}
                            className="p-4 bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/5 rounded-2xl text-[11px] font-mono uppercase tracking-wider text-zinc-500 hover:text-[var(--color-text)] hover:border-primary/40 text-left transition-all"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                   </div>
                 )}

                 {messages.map((msg, i) => (
                   <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i}
                    className={`flex gap-6 ${msg.role === 'user' ? 'justify-end' : ''}`}
                   >
                     {msg.role === 'assistant' && (
                       <div className="w-12 h-12 bg-primary/10 rounded-2xl flex-shrink-0 flex items-center justify-center border border-primary/20">
                          <Bot size={20} className="text-primary" />
                       </div>
                     )}
                     <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                        <div className={`p-6 rounded-[2.5rem] ${msg.role === 'user' ? 'bg-primary text-black font-semibold shadow-neon' : 'bg-[var(--color-text)]/[0.04] border border-[var(--color-text)]/5 text-zinc-300'}`}>
                           <div className="whitespace-pre-wrap leading-relaxed text-sm">
                              {msg.content}
                           </div>
                        </div>
                     </div>
                     {msg.role === 'user' && (
                       <div className="w-12 h-12 bg-[var(--color-text)]/10 rounded-2xl flex-shrink-0 flex items-center justify-center border border-[var(--color-text)]/20">
                          <User size={20} className="text-zinc-500" />
                       </div>
                     )}
                   </motion.div>
                 ))}
                 {isLoading && (
                   <div className="flex gap-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 animate-spin">
                         <RefreshCw size={20} className="text-primary" />
                      </div>
                      <div className="p-6 rounded-[2.5rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 text-zinc-600 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] font-black">
                         Coordinating Logic Layers...
                         <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                   </div>
                 )}
              </div>

              <div className="p-10 border-t border-[var(--color-text)]/5 bg-[var(--color-bg)]/40 backdrop-blur-xl">
                 <div className="relative max-w-4xl mx-auto group">
                    <input 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="EXECUTE CORE COMMAND..."
                      className="w-full bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/10 rounded-[2.5rem] p-7 pr-20 text-sm focus:outline-none focus:border-primary/40 focus:bg-[var(--color-text)]/[0.05] transition-all font-mono tracking-widest uppercase placeholder:text-zinc-700 text-[var(--color-text)]"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-4 top-4 bottom-4 aspect-square bg-primary text-black rounded-3xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-neon disabled:opacity-30"
                    >
                      <Send size={20} />
                    </button>
                 </div>
              </div>
           </div>

           {/* Right: Dashboard System */}
           <div className="lg:col-span-7 flex flex-col rounded-[3rem] bg-[var(--color-text)]/[0.01] border border-[var(--color-text)]/5 relative overflow-hidden glass shadow-2xl">
              <div className="p-8 border-b border-[var(--color-text)]/5 flex items-center justify-between">
                 <div>
                    <h3 className="text-sm font-display font-medium uppercase tracking-[0.3em] italic text-[var(--color-text)]">Enterprise Intelligence Dashboard</h3>
                    <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider mt-1">Real-time business operating cockpit</p>
                 </div>
                 <div className="flex p-1 bg-[var(--color-text)]/5 rounded-2xl border border-[var(--color-text)]/10">
                    {[
                      { id: 'kpi', icon: <TrendingUp size={14} /> },
                      { id: 'leads', icon: <User size={14} /> },
                      { id: 'automation', icon: <Zap size={14} /> },
                      { id: 'insights', icon: <Eye size={14} /> }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setDashboardTab(tab.id as any)}
                        className={`p-3 rounded-xl transition-all ${dashboardTab === tab.id ? 'bg-primary text-black shadow-neon' : 'text-zinc-500 hover:text-[var(--color-text)] hover:bg-[var(--color-text)]/5'}`}
                      >
                        {tab.icon}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                 <AnimatePresence mode="wait">
                    {dashboardTab === 'kpi' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        key="kpi"
                        className="space-y-10"
                      >
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                              { label: "Interactions", val: "1.2M", trend: "+12.4%", color: "text-primary" },
                              { label: "Lead Qual", val: "84%", trend: "Optimal", color: "text-emerald-500" },
                              { label: "Conv Probability", val: "42.8%", trend: "+5.1%", color: "text-amber-500" },
                              { label: "Engage Rate", val: "92.4%", trend: "High", color: "text-purple-400" }
                            ].map(kpi => (
                              <div key={kpi.label} className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5">
                                 <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider mb-2">{kpi.label}</p>
                                 <h4 className="text-2xl font-display font-medium italic">{kpi.val}</h4>
                                 <p className={`text-[9px] font-mono mt-1 ${kpi.color}`}>{kpi.trend}</p>
                              </div>
                            ))}
                         </div>

                         <div className="p-8 rounded-[2.5rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 h-80">
                            <h4 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-6 italic">Interaction Efficiency Stream</h4>
                            <ResponsiveContainer width="100%" height="100%">
                               <AreaChart data={PERFORMANCE_DATA}>
                                  <defs>
                                    <linearGradient id="colorInt" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.1)" />
                                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'currentColor' }} className="text-zinc-500" />
                                  <YAxis hide />
                                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-text)', borderRadius: '12px' }} itemStyle={{ color: 'var(--color-text)' }} />
                                  <Area type="monotone" dataKey="interactions" stroke="#22d3ee" fillOpacity={1} fill="url(#colorInt)" strokeWidth={3} />
                               </AreaChart>
                            </ResponsiveContainer>
                         </div>
                      </motion.div>
                    )}

                    {dashboardTab === 'leads' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        key="leads"
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      >
                         <div className="p-10 rounded-[3rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/10 flex flex-col items-center justify-center">
                            <h4 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-8 self-start italic">Lead Classification Intent</h4>
                            <div className="h-64 w-full">
                               <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                     <Pie 
                                      data={LEAD_CLASSIFICATION_DATA} 
                                      innerRadius={60} 
                                      outerRadius={100} 
                                      paddingAngle={8} 
                                      dataKey="value"
                                      stroke="none"
                                     >
                                        {LEAD_CLASSIFICATION_DATA.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                     </Pie>
                                     <Tooltip />
                                  </PieChart>
                               </ResponsiveContainer>
                            </div>
                            <div className="flex gap-8 mt-6">
                               {LEAD_CLASSIFICATION_DATA.map(l => (
                                 <div key={l.name} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.fill }} />
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{l.name} ({l.value}%)</span>
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div className="space-y-6">
                            <div className="p-8 rounded-[2.5rem] bg-[var(--color-bg)]/40 border border-[var(--color-text)]/5">
                               <h4 className="text-[10px] font-mono font-black text-primary uppercase tracking-widest mb-6 italic">Hot Lead Queue</h4>
                               <div className="space-y-4">
                                  {[
                                    { name: "John D.", intent: "Enterprise Pricing", score: "98" },
                                    { name: "Sarah M.", intent: "Workflow Automation", score: "94" },
                                    { name: "TechCorp", intent: "API Integration", score: "92" }
                                  ].map(lead => (
                                    <div key={lead.name} className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5">
                                       <div>
                                          <p className="text-xs font-bold text-[var(--color-text)] uppercase">{lead.name}</p>
                                          <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider">{lead.intent}</p>
                                       </div>
                                       <div className="text-right">
                                          <p className="text-sm font-display font-medium italic text-emerald-500">{lead.score}</p>
                                          <p className="text-[11px] font-mono text-zinc-700 uppercase tracking-wider">Confidence</p>
                                       </div>
                                    </div>
                                  ))}
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    )}

                    {dashboardTab === 'automation' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        key="automation"
                        className="space-y-10"
                      >
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="h-80">
                               <ResponsiveContainer width="100%" height="100%">
                                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={AUTOMATION_RADAR_DATA}>
                                     <PolarGrid stroke="rgba(128,128,128,0.2)" />
                                     <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 11, fontWeight: 'bold' }} className="text-zinc-500" />
                                     <Radar name="System" dataKey="A" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.3} />
                                  </RadarChart>
                               </ResponsiveContainer>
                            </div>
                            <div className="space-y-4">
                               <h4 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-6 italic">Active Workflow Executions</h4>
                               {[
                                 { name: "Lead Capture → CRM Sync", status: "Active", time: "2ms" },
                                 { name: "Intent Matrix → Knowledge Engine", status: "Active", time: "14ms" },
                                 { name: "Drift Detection → Optimization Loop", status: "Pending", time: "---" }
                               ].map(wf => (
                                 <div key={wf.name} className="p-5 rounded-2xl bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                       <div className={`w-1.5 h-1.5 rounded-full ${wf.status === 'Active' ? 'bg-primary shadow-neon animate-pulse' : 'bg-zinc-700'}`} />
                                       <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-tight">{wf.name}</span>
                                    </div>
                                    <span className="text-[11px] font-mono text-zinc-600 uppercase">{wf.time}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </motion.div>
                    )}

                    {dashboardTab === 'insights' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        key="insights"
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                      >
                         {[
                           { title: "What is happening?", icon: <Eye className="text-primary" />, desc: "Lead velocity increased by 22% in the last 4 hours after ARCHIVE™ optimization loop." },
                           { title: "What it means?", icon: <Target className="text-emerald-500" />, desc: "Sales team bandwidth will likely peak within 24 hours. Automation engine is scaling to handle qualification." },
                           { title: "Suggested Action", icon: <Zap className="text-amber-500" />, desc: "Activate QUANTUM™ High-Priority response module to ensure < 2min response time for qualified enterprise leads." }
                         ].map(insight => (
                           <div key={insight.title} className="p-8 rounded-[2.5rem] bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/5 flex flex-col gap-6 group hover:border-primary/40 transition-all">
                              <div className="p-4 rounded-2xl bg-[var(--color-text)]/5 group-hover:bg-primary/10 transition-colors">
                                 {insight.icon}
                              </div>
                              <div className="space-y-3">
                                 <h4 className="text-[10px] font-mono font-black text-[var(--color-text)] uppercase tracking-[0.2em]">{insight.title}</h4>
                                 <p className="text-xs text-zinc-500 leading-relaxed italic">"{insight.desc}"</p>
                              </div>
                           </div>
                         ))}
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              {/* Looker Studio Style Export Area */}
              <div className="p-8 border-t border-white/5 bg-black/40">
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                       <FileJson className="text-zinc-700" size={14} />
                       <span className="text-[11px] font-mono font-black uppercase text-zinc-700 tracking-wider italic">Core BI Protocol Integration Buffer (v4.0)</span>
                    </div>
                    <button className="text-[11px] font-mono text-zinc-700 hover:text-primary transition-colors flex items-center gap-2">
                       REFRESH DATASTREAM <RefreshCw size={10} />
                    </button>
                 </div>
                 <div className="p-6 rounded-2xl bg-black border border-white/5 overflow-hidden">
                    <pre className="text-[9px] font-mono text-primary/40 leading-relaxed max-h-40 overflow-y-auto custom-scrollbar-thin">
                       {JSON.stringify({
                         system: "IPDM CORE™",
                         status: "OPTIMIZED",
                         active_layers: ARCHITECTURE_LAYERS.map(l => l.id),
                         interaction_metrics: PERFORMANCE_DATA,
                         lead_intel: LEAD_CLASSIFICATION_DATA,
                         automation_benchmarks: AUTOMATION_RADAR_DATA,
                         timestamp: new Date().toISOString()
                       }, null, 2)}
                    </pre>
                 </div>
              </div>
           </div>
        </div>

        {/* Section 3: 15 Features Grid */}
        <div className="space-y-12">
           <div className="text-center space-y-4">
              <h2 className="text-[13px] font-mono font-black text-primary uppercase tracking-[0.5em]">System Capabilities</h2>
              <h3 className="text-5xl font-display font-medium italic tracking-tight">Full Spectrum <span className="text-zinc-600">Intelligence</span> Architecture</h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {FEATURES.map((feature, idx) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  key={feature.id}
                  className="p-8 rounded-[2.5rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 hover:border-primary/40 transition-all group flex flex-col gap-6 glass hover:shadow-neon/5"
                >
                   <div className="p-4 rounded-2xl bg-[var(--color-text)]/5 group-hover:bg-primary/10 group-hover:text-primary transition-all w-fit">
                      {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 20 })}
                   </div>
                   <div className="space-y-3">
                      <h4 className="text-[11px] font-mono font-black uppercase text-[var(--color-text)] tracking-widest">{feature.name}</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed font-medium">{feature.desc}</p>
                   </div>
                   <div className="flex items-center gap-2 mt-auto">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-tighter">Module Active</span>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Section 4: Dynamic Flow Visualization Call to Action */}
        <div className="p-16 rounded-[4rem] bg-gradient-to-br from-primary/20 via-[var(--color-bg)] to-[var(--color-bg)] border border-primary/20 relative overflow-hidden text-center space-y-10 glass">
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ repeat: Infinity, duration: 10 }}
              className="absolute inset-0 bg-primary/20 blur-[150px] -z-10" 
            />
            
            <div className="max-w-3xl mx-auto space-y-6">
               <h2 className="text-5xl md:text-7xl font-display font-medium italic tracking-tighter leading-none">
                 Transform Your Business Into An <span className="text-primary">Autonomous Engine</span>
               </h2>
               <p className="text-lg text-zinc-400 font-medium leading-relaxed italic max-w-2xl mx-auto">
                 "Websites are the interface. AI is the capability. IPDM CORE™ is the unified coordination layer that transforms data into autonomous business outcomes."
               </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
               <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-primary text-black font-black uppercase text-sm tracking-[0.2em] rounded-3xl shadow-neon flex items-center gap-4 group"
               >
                 Initialize CORE™ <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
               </motion.button>
               <button className="px-12 py-6 bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 text-[var(--color-text)] font-black uppercase text-sm tracking-[0.2em] rounded-3xl hover:bg-[var(--color-text)]/10 transition-all flex items-center gap-4">
                 View System Specs <FileJson size={18} />
               </button>
            </div>

            <div className="flex justify-center gap-12 pt-10">
               {[
                 { label: "Uptime", val: "100%" },
                 { label: "Security", val: "E2EE" },
                 { label: "Scale", val: "Elastic" }
               ].map(spec => (
                 <div key={spec.label} className="text-center">
                   <p className="text-[12px] font-mono text-zinc-600 uppercase tracking-wider mb-1">{spec.label}</p>
                   <p className="text-xl font-display font-medium italic text-[var(--color-text)]/50">{spec.val}</p>
                 </div>
               ))}
            </div>
        </div>

      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-blue-500/5 rounded-full blur-[200px]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

    </div>
  );
}
