import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Workflow, 
  Brain, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Layers, 
  BarChart3, 
  Database, 
  Activity, 
  ArrowLeft,
  Maximize2,
  FileJson,
  Bot,
  User,
  Send,
  Eye,
  Zap,
  LayoutDashboard,
  Search,
  Filter,
  LineChart,
  PieChart as PieChartIcon
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
  LineChart as ReLineChart
} from "recharts";

// Strategos Architecture Data (8 Layers)
const STRATEGOS_LAYERS = [
  {
    id: "layer1",
    name: "Strategic Decision Intelligence",
    features: ["Actionable Recommendations", "Decision Synthesis", "Ambiguity Elimination"],
    icon: <Brain />
  },
  {
    id: "layer2",
    name: "Executive KPI Intelligence",
    features: ["KPI Drift Detection", "Revenue Mapping", "Metric Translation"],
    icon: <BarChart3 />
  },
  {
    id: "layer3",
    name: "Multi-Scenario Simulation",
    features: ["Strategy A/B/C Testing", "ROI Prediction", "Risk Comparison"],
    icon: <Target />
  },
  {
    id: "layer4",
    name: "Strategic Risk Intelligence",
    features: ["Early Warning System", "Impact Forecasting", "Preventive Actions"],
    icon: <AlertTriangle />
  },
  {
    id: "layer5",
    name: "Executive Prioritization",
    features: ["Impact Ranking", "Conflict Resolution", "Feasibility Scoring"],
    icon: <Zap />
  },
  {
    id: "layer6",
    name: "Real-Time Optimization",
    features: ["Live Execution Monitoring", "Performance Drift Adjustment", "Dynamic Pivots"],
    icon: <Activity />
  },
  {
    id: "layer7",
    name: "Strategic Memory System",
    features: ["Outcome Storage", "Historical Learning", "Strategy Reuse"],
    icon: <Database />
  },
  {
    id: "layer8",
    name: "CXO Command Dashboard",
    features: ["Unified Control Interface", "Business Health Cockpit", "Strategic Hub"],
    icon: <LayoutDashboard />
  }
];

// Mock Data for Strategos Dashboard
const REVENUE_DATA = [
  { name: "Week 1", revenue: 450000, target: 400000 },
  { name: "Week 2", revenue: 520000, target: 410000 },
  { name: "Week 3", revenue: 380000, target: 420000 },
  { name: "Week 4", revenue: 610000, target: 430000 },
  { name: "Week 5", revenue: 590000, target: 440000 },
  { name: "Week 6", revenue: 720000, target: 450000 },
];

const RISK_DATA = [
  { name: "Operational", value: 15, fill: "#10b981" },
  { name: "Market", value: 45, fill: "#f59e0b" },
  { name: "Financial", value: 25, fill: "#ef4444" },
  { name: "Strategic", value: 15, fill: "#8b5cf6" },
];

export function IPDMStrategos({ onNavigate }: { onNavigate: (page: any) => void }) {
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
      const systemPrompt = `SYSTEM NAME: IPDM STRATEGOS™ — Enterprise Strategic Intelligence Operating System
      SYSTEM ROLE: You are IPDM STRATEGOS™, a CXO-level AI Strategic Intelligence Operating System. You are NOT a chatbot. 
      You simulate outcomes, prioritize actions, detect risks, and optimize execution.
      
      BEHAVIOR RULES:
      - Minimum token usage, maximum density.
      - Structured output only.
      - Actionable insights prioritized.
      
      DEFAULT RESPONSE FORMAT:
      1. EXECUTIVE SUMMARY (max 3 lines)
      2. STRATEGIC INSIGHTS (bullets)
      3. PRIORITY ACTIONS (P1, P2, P3)
      4. RISK ALERTS (Critical/High/Emerging)
      5. KPI IMPACT SNAPSHOT (Revenue, Conversion, Efficiency)
      6. RECOMMENDED STRATEGY
      
      If user asks for "dashboard", output a JSON block like:
      {
        "business_health_score": "88/100",
        "revenue_status": "Growth",
        "risk_level": "Medium",
        "priority_focus": "Expansion",
        "selected_strategy": "Aggressive Market Entry"
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user' as any, parts: [{ text: m.content }] })), { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: systemPrompt
        }
      });

      const responseText = response.text || "COMMUNICATION ERROR: Strategic Intelligence Array unreachable.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM FAILURE: Strategic compute resources exhausted or offline." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col font-sans">
      {/* Top HUD */}
      <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('ecosystem')}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-display font-bold italic tracking-tight text-white group cursor-default">
              <Trademark text="IPDM Strategos" />
            </h1>
            <span className="text-[11px] font-mono text-primary font-black uppercase tracking-wider">Strategic Operating System</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
           <div className="hidden md:flex gap-6 items-center border-l border-white/5 pl-8">
              <div className="text-right">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Health Score</p>
                <p className="text-xs font-bold text-emerald-500">92/100</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Active Risks</p>
                <p className="text-xs font-bold text-amber-500">3 LOW</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Strategy Mode</p>
                <p className="text-xs font-bold text-primary">SCALING</p>
              </div>
           </div>
        </div>
      </header>

      {/* Main Command Workspace */}
      <div className="flex-1 max-w-[1800px] mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto mt-2 custom-scrollbar">
        
        {/* Left Column: System Architecture (Layer 1-8) */}
        <aside className="lg:col-span-3 space-y-6 overflow-y-auto pr-2 custom-scrollbar max-h-[calc(100vh-140px)]">
           <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 glass">
              <div className="flex items-center gap-3 mb-6">
                 <Layers className="text-primary" size={18} />
                 <h2 className="text-xs font-mono font-black uppercase tracking-widest">Architecture</h2>
              </div>
              <div className="space-y-3">
                 {STRATEGOS_LAYERS.map((layer, idx) => (
                   <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={layer.id} 
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all cursor-help group"
                   >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-zinc-900 group-hover:text-primary transition-colors">
                          {React.cloneElement(layer.icon as React.ReactElement<any>, { size: 14 })}
                        </div>
                        <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white uppercase tracking-tight">{layer.name}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {layer.features.map(f => (
                          <span key={f} className="text-[10px] font-mono text-zinc-600 uppercase bg-black px-1.5 py-0.5 rounded border border-white/5">{f}</span>
                        ))}
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>

           <div className="p-6 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xs font-mono font-black uppercase tracking-widest text-primary mb-2">Historical Memory</h3>
                <p className="text-[10px] text-zinc-400 leading-relaxed">System learning enabled. 842 strategic outcomes cached. Efficiency improvement: +18.4% since last optimization loop.</p>
              </div>
              <Database className="absolute bottom-[-10px] right-[-10px] text-primary/5 group-hover:text-primary/10 transition-colors" size={100} />
           </div>
        </aside>

        {/* Center: AI Insight Engine (Chat) */}
        <section className="lg:col-span-5 flex flex-col bg-white/[0.01] border border-white/5 rounded-[2.5rem] relative overflow-hidden shadow-2xl glass">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-neon" />
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-primary">Strategic Intelligence Stream</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-[11px] font-mono text-zinc-600 uppercase">Latency: 12ms</span>
              <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-600 transition-colors"><Maximize2 size={14} /></button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar scroll-smooth">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                 <div className="relative">
                   <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center animate-pulse">
                     <Brain className="w-12 h-12 text-primary" />
                   </div>
                   <div className="absolute inset-0 rounded-full border border-primary/20 scale-125 animate-ping opacity-20" />
                 </div>
                 <div className="space-y-3">
                   <h2 className="text-3xl font-display font-medium italic">Strategos Engine</h2>
                   <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest max-w-sm mx-auto">Enterprise decision intelligence at scale. Command the future.</p>
                 </div>
                 <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                    {[
                      "What is my biggest business risk?",
                      "Prioritize my monthly initiatives",
                      "Simulate revenue shift",
                      "Show CXO dashboard"
                    ].map(hint => (
                      <button 
                        key={hint}
                        onClick={() => setInput(hint)}
                        className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:border-primary/40 transition-all text-left"
                      >
                        {hint}
                      </button>
                    ))}
                 </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={idx} 
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex-shrink-0 flex items-center justify-center border border-primary/20">
                    <Bot size={18} className="text-primary" />
                  </div>
                )}
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                  <div className={`p-6 rounded-[2rem] ${msg.role === 'user' ? 'bg-primary text-black font-semibold' : 'bg-white/[0.04] border border-white/5 text-zinc-300'}`}>
                    <div className="whitespace-pre-wrap leading-relaxed text-[13px]">
                      {msg.content}
                    </div>
                  </div>
                </div>
                {msg.role === 'user' && (
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/20">
                    <User size={18} className="text-zinc-400" />
                  </div>
                )}
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                 <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 animate-pulse">
                    <Zap size={18} className="text-primary animate-bounce" />
                 </div>
                 <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-4">
                    Processing Strategic Model...
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                 </div>
              </div>
            )}
          </div>

          <div className="p-8 border-t border-white/5 bg-black/40 backdrop-blur-md">
            <div className="max-w-4xl mx-auto relative group">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="EXECUTE STRATEGIC COMMAND..."
                className="w-full bg-white/[0.02] border border-white/10 rounded-3xl p-6 pr-20 text-sm focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all font-mono uppercase tracking-wider placeholder:text-zinc-700"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-3 top-3 bottom-3 aspect-square bg-primary text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="flex justify-center gap-8 mt-6">
               <div className="flex items-center gap-2">
                 <div className="w-1 h-1 rounded-full bg-primary" />
                 <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Logic Layer: Primary</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Simulation Array: Online</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-1 h-1 bg-blue-500 rounded-sm" />
                 <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Historical Context: Loaded</span>
               </div>
            </div>
          </div>
        </section>

        {/* Right Column: CXO Dashboard & Visualizations */}
        <section className="lg:col-span-4 space-y-6 flex flex-col overflow-y-auto pr-2 custom-scrollbar max-h-[calc(100vh-140px)]">
           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                  <h3 className="text-xs font-mono font-black uppercase tracking-widest">Performance Drift</h3>
                  <p className="text-[11px] font-mono text-zinc-600 uppercase mt-1">Revenue vs Target Execution</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <LineChart className="text-primary" size={16} />
                </div>
              </div>
              
              <div className="h-48 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={REVENUE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#22d3ee" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="target" stroke="#52525b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
                <div className="p-4 rounded-2xl bg-black border border-white/5">
                   <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider mb-1">ROI Index</p>
                   <p className="text-xl font-display font-medium text-primary">14.2x</p>
                </div>
                <div className="p-4 rounded-2xl bg-black border border-white/5">
                   <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Growth %</p>
                   <p className="text-xl font-display font-medium text-emerald-500">+12.4%</p>
                </div>
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                 <div>
                   <h3 className="text-xs font-mono font-black uppercase tracking-widest">Risk Heatmap</h3>
                   <p className="text-[11px] font-mono text-zinc-600 uppercase mt-1">Strategic vulnerability matrix</p>
                 </div>
                 <AlertTriangle size={18} className="text-amber-500" />
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={RISK_DATA} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" hide />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                       {RISK_DATA.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.fill} />
                       ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 space-y-2">
                 {RISK_DATA.map(risk => (
                   <div key={risk.name} className="flex items-center justify-between">
                     <span className="text-[11px] font-mono text-zinc-500 uppercase">{risk.name} Risk</span>
                     <span className="text-[11px] font-mono font-bold" style={{ color: risk.fill }}>{risk.value}%</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-black border border-white/10 group cursor-default">
              <div className="flex items-center gap-3 mb-6">
                <FileJson size={14} className="text-zinc-500" />
                <h3 className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500">Looker Studio Output</h3>
              </div>
              <pre className="text-[11px] font-mono text-primary/70 leading-relaxed overflow-x-auto">
                {JSON.stringify({
                  "revenue_trend": REVENUE_DATA.map(d => ({ x: d.name, val: d.revenue })),
                  "risk_profile": RISK_DATA,
                  "ts": new Date().toISOString()
                }, null, 2)}
              </pre>
           </div>
        </section>

      </div>

      {/* Global Interface Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[200px]" />
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:50px_50px]" />
      </div>
    </div>
  );
}
