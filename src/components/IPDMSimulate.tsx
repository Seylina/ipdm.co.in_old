import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, 
  TrendingUp, 
  ShieldAlert, 
  Zap, 
  Target, 
  Layers, 
  Activity, 
  ArrowLeft,
  Maximize2,
  FileJson,
  Bot,
  User,
  Send,
  Eye,
  Settings,
  LineChart,
  BarChart,
  PieChart as PieChartIcon,
  Search,
  RefreshCw,
  Binary,
  Cpu,
  Workflow,
  Globe,
  Database
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
  Legend
} from "recharts";

// Simulate Architecture Data (15 Layers)
const SIMULATE_LAYERS = [
  { id: 1, name: "Scenario Simulation Engine", icon: <RefreshCw />, desc: "Multi-variable business simulation" },
  { id: 2, name: "Predictive Outcome Modeling", icon: <TrendingUp />, desc: "Revenue, demand, churn forecasts" },
  { id: 3, name: "Financial Simulation Engine", icon: <BarChart3 />, desc: "P&L and cash flow modeling" },
  { id: 4, name: "Risk Modeling & Impact", icon: <ShieldAlert />, desc: "Probability + impact scoring" },
  { id: 5, name: "Sensitivity Analysis", icon: <Activity />, desc: "Variable impact identification" },
  { id: 6, name: "Multi-Variable Decision Modeling", icon: <Binary />, desc: "Interdependent variable simulation" },
  { id: 7, name: "Decision Dashboard Engine", icon: <Layers />, desc: "Executive UI conversion" },
  { id: 8, name: "Real-Time Simulation Engine", icon: <Zap />, desc: "Continuous input processing" },
  { id: 9, name: "AI Decision Support", icon: <Bot />, desc: "Recommendations & trade-offs" },
  { id: 10, name: "Strategy Testing Engine", icon: <Target />, desc: "Pre-execution validation" },
  { id: 11, name: "Market & Demand Simulation", icon: <Globe />, desc: "Customer behavior modeling" },
  { id: 12, name: "System Integration Engine", icon: <Database />, desc: "Unified enterprise data flow" },
  { id: 13, name: "Custom Model Development", icon: <Cpu />, desc: "Business-specific AI models" },
  { id: 14, name: "Operational Simulation", icon: <Workflow />, desc: "Efficiency & scalability modeling" },
  { id: 15, name: "Decision Confidence Scoring", icon: <Eye />, desc: "0-100% confidence assignment" },
];

// Mock Data for Simulation Dashboards
const SCENARIO_DATA = [
  { name: "Month 1", worst: 200, expected: 300, best: 450 },
  { name: "Month 2", worst: 220, expected: 340, best: 500 },
  { name: "Month 3", worst: 180, expected: 380, best: 600 },
  { name: "Month 4", worst: 250, expected: 420, best: 750 },
  { name: "Month 5", worst: 280, expected: 480, best: 820 },
  { name: "Month 6", worst: 300, expected: 550, best: 950 },
];

const SENSITIVITY_DATA = [
  { name: "Pricing", impact: 85 },
  { name: "Ad Spend", impact: 65 },
  { name: "Churn Rate", impact: 45 },
  { name: "Headcount", impact: 30 },
  { name: "COGS", impact: 25 },
];

export function IPDMSimulate({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, dashboard?: any }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      const systemPrompt = `SYSTEM NAME: IPDM SIMULATE™ — Intelligent Business Simulation & Decision Operating System
      
      CORE SYSTEM OBJECTIVE:
      You are IPDM SIMULATE™, an enterprise-grade AI Decision Intelligence System. You simulate business reality before execution, predict outcomes, and provide confidence-scored executive recommendations.
      
      BEHAVIOR RULES:
      - Always think in systems, models, outcomes, probabilities.
      - Minimize token usage, maximize clarity.
      - Prioritize structured decision intelligence outputs.
      
      REQUIRED OUTPUT FORMAT:
      IPDM SIMULATE™ EXECUTIVE DASHBOARD
      
      Scenario Input:
      - Input: (Current focus)
      - Objective: (Goal)
      
      Simulation Output:
      - Best Case: (Data point)
      - Expected Case: (Data point)
      - Worst Case: (Data point)
      
      Financial Impact:
      - Revenue: (Forecast)
      - Cost: (Forecast)
      - Profit: (Forecast)
      
      Risk Analysis:
      - Risk Level: (Low/Med/High)
      - Key Risks: (List)
      
      Sensitivity Analysis:
      - Most Impactful Variable:
      - Least Impactful Variable:
      
      AI Recommendation:
      - Best Action:
      - Alternative Options:
      - Trade-offs:
      
      Decision Confidence:
      - Score: XX%
      - Stability: High / Medium / Low`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user' as any, parts: [{ text: m.content }] })), { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: systemPrompt
        }
      });

      const responseText = response.text || "SYSTEM TIMEOUT: Simulation nodes unreachable.";
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM FAILURE: Multi-variable compute layer encountered a critical error. Resetting environment..." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col font-sans overflow-hidden transition-colors duration-1000">
      {/* Simulation Command Center Header */}
      <header className="h-20 border-b border-[var(--color-text)]/5 bg-[var(--color-bg)]/60 backdrop-blur-3xl flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('ecosystem')}
            className="p-2 hover:bg-[var(--color-text)]/5 rounded-full transition-colors text-zinc-500 hover:text-[var(--color-text)]"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-display font-black tracking-tighter italic text-[var(--color-text)] flex items-center gap-2 group cursor-default">
              <Trademark text="IPDM Simulate" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-neon" />
            </h1>
            <span className="text-[10px] font-mono text-primary/60 font-black uppercase tracking-[0.4em]">Decision Operating System</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
           <div className="hidden lg:flex gap-12 items-center">
              <div className="text-center group">
                <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider group-hover:text-primary transition-colors">Simulation Load</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1 w-12 bg-[var(--color-text)]/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["20%", "60%", "40%"] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="h-full bg-primary" 
                    />
                  </div>
                  <p className="text-[10px] font-bold text-primary">NORMAL</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider">Active Models</p>
                <p className="text-[10px] font-bold text-[var(--color-text)]">15/15</p>
              </div>
              <div className="h-8 w-px bg-[var(--color-text)]/5" />
              <button className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-mono font-black uppercase text-primary hover:bg-primary hover:text-black transition-all">
                Export Data
              </button>
           </div>
        </div>
      </header>

      {/* Main Workspace Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: 15-Layer Architecture Panel */}
        <aside className="w-80 border-r border-[var(--color-text)]/5 bg-[var(--color-bg)]/20 flex flex-col hidden xl:flex">
          <div className="p-6 border-b border-[var(--color-text)]/5 bg-[var(--color-text)]/[0.02]">
            <h2 className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500">System Architecture</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {SIMULATE_LAYERS.map(layer => (
              <div key={layer.id} className="p-3 rounded-2xl bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 group hover:border-primary/30 transition-all cursor-help hover:bg-[var(--color-text)]/[0.04]">
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-1.5 rounded-lg bg-[var(--color-bg)] group-hover:text-primary transition-colors border border-[var(--color-text)]/5">
                    {React.cloneElement(layer.icon as React.ReactElement<any>, { size: 14 })}
                  </div>
                  <span className="text-[9px] font-bold text-zinc-400 group-hover:text-[var(--color-text)] transition-colors uppercase tracking-tight">{layer.name}</span>
                </div>
                <p className="text-[8px] text-zinc-600 group-hover:text-zinc-500 transition-colors pl-8">{layer.desc}</p>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-[var(--color-text)]/5 bg-[var(--color-bg)]/40">
             <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-zinc-600 mb-4">
               <span>Sync Status</span>
               <span className="text-emerald-500">Live</span>
             </div>
             <div className="grid grid-cols-5 gap-1">
               {[...Array(15)].map((_, i) => (
                 <div key={i} className="h-1 bg-primary/20 rounded-full overflow-hidden">
                   <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-full h-full bg-primary" 
                   />
                 </div>
               ))}
             </div>
          </div>
        </aside>

        {/* Center: Large Simulation Dashboard Hub */}
        <main className="flex-1 relative overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Revenue Forecast", value: "$4.8M", trend: "+12.4%", icon: <TrendingUp className="text-emerald-500" />, color: "text-emerald-500" },
                { label: "Profit Potential", value: "$1.2M", trend: "+8.2%", icon: <Zap className="text-primary" />, color: "text-primary" },
                { label: "Risk Score", value: "Low", trend: "-5.0%", icon: <ShieldAlert className="text-amber-500" />, color: "text-amber-500" },
                { label: "Confidence", value: "94.2%", trend: "Stable", icon: <Eye className="text-purple-400" />, color: "text-purple-400" },
              ].map((kpi, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={kpi.label} 
                  className="p-6 rounded-[2rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 glass relative group hover:border-[var(--color-text)]/20 transition-all cursor-default"
                >
                  <div className="absolute top-6 right-6 p-2 rounded-xl bg-[var(--color-text)]/5 border border-[var(--color-text)]/5">
                    {React.cloneElement(kpi.icon as React.ReactElement<any>, { size: 16 })}
                  </div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">{kpi.label}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-display font-medium italic text-[var(--color-text)]">{kpi.value}</h3>
                    <span className={`text-[10px] font-mono ${kpi.color}`}>{kpi.trend}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Visualizations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Revenue Trend / Scenario Chart */}
              <div className="lg:col-span-8 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-sm font-display font-medium tracking-widest uppercase italic">Revenue Scenario Projections</h3>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1 italic">Best vs Expected vs Worst Case</p>
                  </div>
                  <div className="flex gap-4">
                    {['Best', 'Expected', 'Worst'].map(mode => (
                      <div key={mode} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${mode === 'Best' ? 'bg-primary' : mode === 'Expected' ? 'bg-blue-400' : 'bg-red-400'}`} />
                        <span className="text-[9px] font-mono text-zinc-600 uppercase">{mode}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={SCENARIO_DATA}>
                      <defs>
                        <linearGradient id="colorBest" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.1)" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: 'currentColor', fontWeight: 'bold' }} 
                        className="text-zinc-500"
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-text)', borderRadius: '16px', fontSize: '10px' }}
                      />
                      <Area type="monotone" dataKey="best" stroke="#22d3ee" fillOpacity={1} fill="url(#colorBest)" strokeWidth={3} />
                      <Area type="monotone" dataKey="expected" stroke="#60a5fa" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                      <Area type="monotone" dataKey="worst" stroke="#ef4444" fillOpacity={0} strokeWidth={2} strokeDasharray="2 2" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sensitivity Analysis */}
              <div className="lg:col-span-4 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="flex items-center justify-between mb-10">
                   <div>
                    <h3 className="text-sm font-display font-medium tracking-widest uppercase italic">Sensitivity Index</h3>
                    <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-1 italic">Variable Impact Mapping</p>
                  </div>
                  <Activity className="text-primary animate-pulse" size={18} />
                </div>
                <div className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart data={SENSITIVITY_DATA} layout="vertical" margin={{ left: 0 }}>
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fill: 'currentColor', fontWeight: 'bold' }} 
                          className="text-zinc-500"
                          width={80}
                        />
                        <Tooltip 
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-text)', borderRadius: '12px', fontSize: '10px' }}
                        />
                        <Bar dataKey="impact" radius={[0, 6, 6, 0]} barSize={12}>
                          {SENSITIVITY_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#22d3ee' : index === 1 ? '#06b6d4' : '#0891b2'} />
                          ))}
                        </Bar>
                      </ReBarChart>
                   </ResponsiveContainer>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5">
                   <div className="flex items-center justify-between">
                     <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider">Primary Variable</p>
                     <p className="text-[11px] font-black text-primary uppercase">Pricing Strategy</p>
                   </div>
                </div>
              </div>

              {/* Simulation Engine Console */}
              <div className="lg:col-span-7 flex flex-col bg-white/[0.01] border border-white/5 rounded-[3rem] h-[600px] relative overflow-hidden glass shadow-3xl">
                  <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
                    <div className="flex items-center gap-3">
                      <Bot className="text-primary" size={16} />
                      <span className="text-[11px] font-mono font-black uppercase tracking-wider">Decision Stream</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider">Confidence: 94.2%</span>
                      <button className="text-zinc-600 hover:text-zinc-400 transition-colors"><Maximize2 size={14} /></button>
                    </div>
                  </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar-thin">
                   {messages.length === 0 && (
                     <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-8">
                        <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center border border-primary/20 relative group">
                          <RefreshCw className="text-primary w-10 h-10 animate-spin-slow group-hover:scale-110 transition-transform" />
                          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-50" />
                        </div>
                        <div className="space-y-3">
                          <h2 className="text-3xl font-display font-medium italic">Simulation Workspace</h2>
                          <p className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider max-w-sm mx-auto">Initialize a business model simulation using the multi-layer architecture below.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                          {[
                            "Simulate pricing increase by 20%",
                            "What happens if ad spend doubles?",
                            "Best strategy for growth",
                            "Simulate worst-case scenario"
                          ].map(cmd => (
                            <button 
                              key={cmd}
                              onClick={() => setInput(cmd)}
                              className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-mono uppercase tracking-wider text-zinc-500 hover:text-white hover:border-primary/40 text-left transition-all"
                            >
                              {cmd}
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
                         <div className="w-10 h-10 bg-primary/10 rounded-xl flex-shrink-0 flex items-center justify-center border border-primary/20">
                           <Bot size={18} className="text-primary" />
                         </div>
                       )}
                       <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                         <div className={`p-6 rounded-[2.5rem] ${msg.role === 'user' ? 'bg-primary text-black font-semibold shadow-neon' : 'bg-[var(--color-text)]/[0.04] border border-[var(--color-text)]/5 text-zinc-300'}`}>
                           <div className="whitespace-pre-wrap leading-relaxed text-sm font-mono tracking-tight">
                             {msg.content}
                           </div>
                         </div>
                       </div>
                       {msg.role === 'user' && (
                         <div className="w-10 h-10 bg-[var(--color-text)]/10 rounded-xl flex-shrink-0 flex items-center justify-center border border-[var(--color-text)]/20">
                           <User size={18} className="text-zinc-400" />
                         </div>
                       )}
                     </motion.div>
                   ))}
                   {isLoading && (
                     <div className="flex gap-6">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 animate-pulse">
                           <RefreshCw size={18} className="text-primary animate-spin" />
                        </div>
                        <div className="p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-zinc-600 flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest">
                           Executing Multi-Layer Scenario...
                           <div className="flex gap-1">
                             <div className="w-1 h-3 bg-primary animate-pulse" />
                             <div className="w-1 h-3 bg-primary/60 animate-pulse [animation-delay:0.2s]" />
                             <div className="w-1 h-3 bg-primary/30 animate-pulse [animation-delay:0.4s]" />
                           </div>
                        </div>
                     </div>
                   )}
                </div>

                <div className="p-8 border-t border-[var(--color-text)]/5 bg-[var(--color-bg)]/40">
                   <div className="relative max-w-4xl mx-auto group">
                      <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="INITIATE MODEL SIMULATION..."
                        className="w-full bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/10 rounded-[2rem] p-6 pr-20 text-sm focus:outline-none focus:border-primary/40 focus:bg-[var(--color-text)]/[0.05] transition-all font-mono tracking-tight uppercase placeholder:text-zinc-700 text-[var(--color-text)]"
                      />
                      <button 
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-3 top-3 bottom-3 aspect-square bg-primary text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
                      >
                        <Send size={18} />
                      </button>
                   </div>
                </div>
              </div>

              {/* Decision Panel & Risk Heatmap */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 glass relative overflow-hidden group h-[290px] flex flex-col">
                   <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-sm font-display font-medium tracking-widest uppercase italic">Decision Panel</h3>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1 italic">Intelligence Recommendations</p>
                      </div>
                      <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                         <Bot className="text-emerald-500" size={16} />
                      </div>
                   </div>
                   
                   <div className="space-y-4 flex-1">
                      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                           <span className="text-[10px] font-mono font-black text-emerald-500 uppercase tracking-widest">Primary Strategy</span>
                        </div>
                        <p className="text-xs font-medium text-zinc-300">Maintain current spend but shift 30% allocation to lead conversion engine via FLOW™.</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-2 h-2 rounded-full bg-zinc-600" />
                           <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">Alternate Path</span>
                        </div>
                        <p className="text-xs font-medium text-zinc-500">Aggressive expansion into LATAM market; Risk level: Significant.</p>
                      </div>
                   </div>
                </div>

                <div className="p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 glass relative overflow-hidden group flex-1">
                   <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-sm font-display font-medium tracking-widest uppercase italic">Risk Matrix</h3>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1 italic">Vulnerability Analysis</p>
                      </div>
                      <ShieldAlert className="text-red-400 animate-pulse" size={18} />
                   </div>
                   <div className="grid grid-cols-3 gap-2 h-32">
                      {[
                        { label: 'Market', val: 40, color: 'bg-primary' },
                        { label: 'Finance', val: 75, color: 'bg-red-500' },
                        { label: 'Ops', val: 20, color: 'bg-emerald-500' },
                      ].map(risk => (
                        <div key={risk.label} className="flex flex-col items-center justify-end gap-3">
                           <div className="w-full bg-white/5 rounded-t-xl relative overflow-hidden" style={{ height: `${risk.val}%` }}>
                              <div className={`absolute inset-0 ${risk.color} opacity-40 shadow-neon`} />
                           </div>
                           <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider">{risk.label}</span>
                        </div>
                      ))}
                   </div>
                   <div className="mt-8 space-y-4">
                      <div className="flex justify-between items-center text-[11px] font-mono uppercase tracking-wider">
                         <span className="text-zinc-600">Avg Risk Probability</span>
                         <span className="text-amber-500">22.4%</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-mono uppercase tracking-wider">
                         <span className="text-zinc-600">Model Stability</span>
                         <span className="text-emerald-500 font-bold">EXCEPTIONAL</span>
                      </div>
                   </div>
                </div>
              </div>

            </div>

            {/* Embedded Looker Studio Style JSON Data Hub */}
               <div className="lg:col-span-12 p-8 rounded-[3rem] bg-black border border-white/10 group relative overflow-hidden cursor-default mt-8">
                  <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white/5 rounded-xl">
                         <FileJson className="text-zinc-500" size={16} />
                       </div>
                       <h3 className="text-[12px] font-mono font-black uppercase tracking-wider text-zinc-500 italic">BI System Export Protocol (Looker Studio v2.4)</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-mono text-zinc-700 uppercase tracking-wider">Stream Active</span>
                    </div>
                  </div>
                  <pre className="text-[12px] font-mono text-primary/50 leading-relaxed overflow-x-auto relative z-10 custom-scrollbar-thin pb-4">
                    {JSON.stringify({
                   system: "IPDM SIMULATE™",
                   data_nodes: SIMULATE_LAYERS.map(l => ({ id: l.id, status: "READY" })),
                   forecast_models: [
                     { name: "REVENUE_6M", type: "AREA_CURVE", data: SCENARIO_DATA },
                     { name: "SENSITIVITY_V1", type: "BAR_HORIZONTAL", data: SENSITIVITY_DATA }
                   ],
                   metadata: {
                     export_ts: new Date().toISOString(),
                     auth: "AUTHORIZED_EXECUTIVE_ACCESS",
                     security: "E2EE_INTEL_MODEL"
                   }
                 }, null, 2)}
               </pre>
            </div>
          </div>
        </main>
      </div>

      {/* Global Ambience Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[200px]" />
        <div className="absolute inset-0 bg-grid-white/[0.015] bg-[size:40px_40px]" />
      </div>
    </div>
  );
}
