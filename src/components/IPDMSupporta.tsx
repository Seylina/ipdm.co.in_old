import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Workflow, 
  Globe, 
  Database, 
  Brain, 
  Users, 
  MessageSquare, 
  Clock, 
  Sparkles, 
  BarChart3, 
  TrendingUp, 
  Zap, 
  Eye, 
  ArrowLeft,
  Search,
  Settings,
  Send,
  Bot,
  User,
  PanelRightClose,
  PanelRightOpen,
  Maximize2,
  FileJson,
  Activity
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
  Cell
} from "recharts";

// System Architecture Data
const SUPPORTA_LAYERS = [
  {
    id: "foundation",
    name: "Foundation Layer",
    purpose: "Data structure, business rules, multi-channel integration, process automation",
    features: [
      { id: "f3", name: "Structured Knowledge System", icon: <Database /> },
      { id: "f11", name: "Controlled Knowledge & Governance", icon: <Shield /> },
      { id: "f18", name: "Omnichannel Integration Layer", icon: <Globe /> },
      { id: "f19", name: "Enterprise Workflow Automation Engine", icon: <Workflow /> },
    ]
  },
  {
    id: "intelligence",
    name: "Intelligence Layer",
    purpose: "Decision-making, context understanding, agent collaboration, smart escalation",
    features: [
      { id: "f2", name: "Business-Trained Custom GPT", icon: <Brain /> },
      { id: "f12", name: "Multi-Agent Support Architecture", icon: <Users /> },
      { id: "f6", name: "Intent Classification Engine", icon: <Search /> },
      { id: "f8", name: "Conversation Memory System", icon: <Database /> },
      { id: "f7", name: "Intelligent Query Routing", icon: <Workflow /> },
      { id: "f13", name: "AI–Human Hybrid Support System", icon: <User /> },
    ]
  },
  {
    id: "execution",
    name: "Execution Layer",
    purpose: "Real-time response, always-on system, UX optimization",
    features: [
      { id: "f1", name: "AI Support Agent", icon: <Bot /> },
      { id: "f4", name: "Instant Response System", icon: <Zap /> },
      { id: "f5", name: "24×7 Continuous Availability", icon: <Clock /> },
      { id: "f16", name: "Customer Experience Enhancement Layer", icon: <Sparkles /> },
    ]
  },
  {
    id: "insight",
    name: "Insight Layer",
    purpose: "Analytics, optimization, revenue intelligence, scaling system",
    features: [
      { id: "f9", name: "Support Analytics Dashboard", icon: <BarChart3 /> },
      { id: "f10", name: "Continuous Learning & Optimization", icon: <TrendingUp /> },
      { id: "f14", name: "Cost Optimization Engine", icon: <Zap /> },
      { id: "f15", name: "Scalability Engine", icon: <TrendingUp /> },
      { id: "f17", name: "Lead Conversion Intelligence System", icon: <TrendingUp /> },
    ]
  },
  {
    id: "predictive",
    name: "Predictive Layer",
    purpose: "Behavior prediction, conversion forecasting, business outcome prediction",
    features: [
      { id: "f20", name: "Predictive Intelligence Layer", icon: <Eye /> },
    ]
  }
];

// Mock Data for Dashboard
const ANALYTICS_DATA = [
  { name: "00:00", active: 400, completed: 240 },
  { name: "04:00", active: 300, completed: 139 },
  { name: "08:00", active: 200, completed: 980 },
  { name: "12:00", active: 278, completed: 390 },
  { name: "16:00", active: 189, completed: 480 },
  { name: "20:00", active: 239, completed: 380 },
];

const INTENT_DATA = [
  { name: "Support", value: 45 },
  { name: "Sales", value: 30 },
  { name: "Info", value: 15 },
  { name: "Ops", value: 10 },
];

export function IPDMSupporta({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, dashboard?: any }[]>([]);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
      const systemPrompt = `SYSTEM NAME: IPDM SUPPORTA™ — Intelligent Business Support & Revenue Operating System
      You are IPDM SUPPORTA™, a full-scale enterprise AI Business Operating System. 
      You are NOT a chatbot. You are a Support Intelligence System, Sales Conversion Engine, etc.
      
      RESPONSE ENGINE RULES:
      1. Always respond with minimal tokens, maximum clarity, structured outputs.
      2. Classify user query into: Support, Sales, Information, Operational, Mixed Intent.
      
      DASHBOARD OUTPUT SYSTEM (MANDATORY):
      Every response MUST end with a structured dashboard at the bottom of the text:
      [DASHBOARD]
      - Query Type: (Support/Sales/Info/Operational/Mixed)
      - Intent Classification: (Describe accurately)
      - AI Agents Used: (List internal agents: Support, Sales, Knowledge, Routing, Insight, Prediction)
      - Resolution Status: (Resolved/Pending/Escalated)
      - Business Impact Level: (Low/Medium/High)
      
      [INSIGHTS]
      - (Bullet point insights)
      
      [ACTIONS]
      - (Bullet point next steps)
      
      [CONVERSION SIGNAL]
      - (Low / Medium / High)
      
      Also provide a Looker Studio compatible JSON block if relevant.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user' as any, parts: [{ text: m.content }] })), { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: systemPrompt
        }
      });

      const responseText = response.text || "I apologize, I couldn't generate a response.";
      
      // Parse dashboard data if possible (simple regex for demo)
      const dashboardMatch = responseText.match(/\[DASHBOARD\]([\s\S]*?)\[CONVERSION SIGNAL\]\s*(.*)/i);
      let dashboardData = null;
      if (dashboardMatch) {
         dashboardData = {
           raw: dashboardMatch[0],
           conversion: dashboardMatch[2]?.trim()
         };
      }

      setMessages(prev => [...prev, { role: 'assistant', content: responseText, dashboard: dashboardData }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM ERROR: Connection to IPDM Supporta Intelligence Layer timed out. Please retry." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
      {/* Sidebar - System Architecture & Controls */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 0 }}
        className="h-screen bg-black/40 border-r border-white/5 backdrop-blur-3xl relative flex-shrink-0 z-20 overflow-hidden"
      >
        <div className="w-[320px] p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display font-medium text-sm tracking-widest uppercase">System Config</h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
            {SUPPORTA_LAYERS.map(layer => (
              <div key={layer.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-px bg-primary/40" />
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">{layer.name}</span>
                </div>
                <div className="space-y-2">
                  {layer.features.map(feature => (
                    <div key={feature.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.05] hover:border-primary/20 transition-all cursor-help">
                      <div className="p-2 rounded-lg bg-zinc-900 text-zinc-500 group-hover:text-primary transition-colors">
                        {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 14 })}
                      </div>
                      <span className="text-[11px] font-medium text-zinc-400 group-hover:text-white transition-colors uppercase tracking-tight">{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/5">
             <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
               Operational Nodes: 20/20
             </div>
             <button className="w-full p-4 rounded-2xl bg-white/[0.05] border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] hover:bg-white/[0.1] transition-all">
               System Controls
             </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen flex flex-col relative">
        {/* Header Bar */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate('ecosystem')}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-display font-medium tracking-tight italic">
                <Trademark text="IPDM Supporta" />
              </h1>
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Intelligent Business Support & Revenue Operating System</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-6 mr-6">
              <div className="text-right">
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Active Status</p>
                <p className="text-[11px] font-bold text-emerald-500">OPTIMAL</p>
              </div>
              <div className="h-8 w-px bg-white/5" />
              <div className="text-right">
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Throughput</p>
                <p className="text-[11px] font-bold">1.2M OPS/S</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 hover:bg-white/5 rounded-xl transition-colors text-zinc-400"
            >
              {isSidebarOpen ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
            </button>
          </div>
        </header>

        {/* Workspace Layout */}
        <div className="flex-1 flex overflow-hidden p-6 gap-6">
          {/* Chat System Layer */}
          <section className="flex-1 flex flex-col bg-white/[0.02] border border-white/5 rounded-[2.5rem] relative overflow-hidden glass shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary shadow-neon" />
                <span className="text-[12px] font-mono font-black uppercase tracking-wider">Intelligence Stream</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-600 hover:text-zinc-400 transition-colors">
                  <Maximize2 size={14} />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-600 hover:text-zinc-400 transition-colors">
                  <FileJson size={14} />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar scroll-smooth">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center animate-pulse">
                    <Bot className="w-10 h-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-medium italic">Ready to Initialize</h3>
                    <p className="text-zinc-500 text-[13px] max-w-sm font-mono uppercase tracking-tight">Enter a business command to activate the multi-agent execution layer.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-w-md w-full">
                    <button onClick={() => setInput("Analyze my support performance")} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-mono uppercase tracking-wider hover:border-primary/20 transition-all text-zinc-400 hover:text-white">Performance Analysis</button>
                    <button onClick={() => setInput("Show conversion prediction report")} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-mono uppercase tracking-wider hover:border-primary/20 transition-all text-zinc-400 hover:text-white">Conversion Prediction</button>
                    <button onClick={() => setInput("What are my top customer issues?")} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-mono uppercase tracking-wider hover:border-primary/20 transition-all text-zinc-400 hover:text-white">Issue Audit</button>
                    <button onClick={() => setInput("Optimize my workflow efficiency")} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-mono uppercase tracking-wider hover:border-primary/20 transition-all text-zinc-400 hover:text-white">Workflow Optimization</button>
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex gap-6 ${msg.role === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex-shrink-0 flex items-center justify-center border border-primary/20">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] space-y-4 ${msg.role === 'user' ? 'order-first' : ''}`}>
                    <div className={`p-6 rounded-[2rem] ${msg.role === 'user' ? 'bg-primary text-black font-medium' : 'bg-white/[0.03] border border-white/5 text-zinc-300'}`}>
                      <div className="whitespace-pre-wrap leading-relaxed text-sm">
                        {msg.content}
                      </div>

                      {msg.dashboard && (
                        <div className="mt-8 p-6 rounded-2xl bg-black border border-white/10 space-y-4">
                           <div className="flex items-center gap-2 mb-2">
                             <div className="w-2 h-2 rounded-full bg-primary" />
                             <span className="text-[11px] font-mono font-black uppercase text-primary tracking-wider">System Dashboard</span>
                           </div>
                           <div className="grid grid-cols-2 gap-4 text-[11px] font-mono uppercase tracking-tight">
                             <div className="p-3 bg-white/5 rounded-xl">
                               <p className="text-zinc-600 mb-1">Conversion Signal</p>
                               <p className={`font-black ${msg.dashboard.conversion === 'High' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                 {msg.dashboard.conversion || 'Monitoring...'}
                               </p>
                             </div>
                             <div className="p-3 bg-white/5 rounded-xl">
                               <p className="text-zinc-600 mb-1">Impact Level</p>
                               <p className="font-black text-blue-400">SIGNIFICANT</p>
                             </div>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/20">
                      <User className="w-5 h-5 text-zinc-400" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex-shrink-0 flex items-center justify-center border border-primary/20 animate-pulse">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 text-zinc-500 flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[12px] font-mono uppercase tracking-wider ml-2">Processing Intelligence Nodes...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-white/5 bg-black/20">
              <div className="max-w-3xl mx-auto relative group">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Initiate command... (e.g. 'Run revenue prediction report')"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 pr-20 text-sm focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all group-hover:border-white/20 placeholder:text-zinc-600 font-mono tracking-tight"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 top-3 bottom-3 aspect-square bg-primary text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="flex justify-center gap-8 mt-6">
                 <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                   <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Multi-Agent Collab: Enabled</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                   <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Predictive Logic: Active</span>
                 </div>
              </div>
            </div>
          </section>

          {/* Analytics Hub Layer */}
          <section className="w-96 flex flex-col gap-6">
            <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-sm font-display font-medium tracking-widest uppercase">Traffic Density</h2>
                  <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-1">Real-time engagement matrix</p>
                </div>
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Activity size={14} className="text-primary" />
                </div>
              </div>

              <div className="flex-1 min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ANALYTICS_DATA}>
                    <defs>
                      <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fill: '#52525b', fontWeight: 'bold' }} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
                      itemStyle={{ color: '#22d3ee' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="active" 
                      stroke="#22d3ee" 
                      fillOpacity={1} 
                      fill="url(#colorActive)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Avg Resolution</p>
                  <p className="text-xl font-display italic font-medium">18<span className="text-xs non-italic text-zinc-500 ml-1">mins</span></p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">CSAT Score</p>
                  <p className="text-xl font-display italic font-medium text-primary">98.4<span className="text-xs non-italic text-zinc-500 ml-1">%</span></p>
                </div>
              </div>
            </div>

            <div className="h-72 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-sm font-display font-medium tracking-widest uppercase">Intent Distribution</h2>
                  <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-1">Classification breakdown</p>
                </div>
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Search size={14} className="text-purple-400" />
                </div>
              </div>

              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={INTENT_DATA} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 9, fill: '#52525b', fontWeight: 'bold' }} 
                      width={60}
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }} 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                      {INTENT_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#22d3ee' : index === 1 ? '#818cf8' : index === 2 ? '#a855f7' : '#ec4899'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>

        {/* System HUD Overlay */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 pointer-events-none z-30">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-8 py-3 glass border border-white/10 rounded-full flex items-center gap-12"
          >
             <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
               <span className="text-[12px] font-mono text-zinc-500 uppercase tracking-wider">Foundation Layer: Sync</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-primary" />
               <span className="text-[12px] font-mono text-zinc-500 uppercase tracking-wider">Intelligence Fabric: Flow</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
               <span className="text-[12px] font-mono text-zinc-500 uppercase tracking-wider">Predictive Core: Compute</span>
             </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
