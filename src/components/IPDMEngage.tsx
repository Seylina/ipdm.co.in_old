import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  Users, 
  ShieldCheck, 
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
  TrendingUp,
  PieChart as PieChartIcon,
  Search,
  RefreshCw,
  Cpu,
  Workflow,
  Globe,
  Database,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Lock,
  Boxes,
  Briefcase,
  Headphones,
  Info,
  UserPlus,
  Binary,
  BarChart3
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Trademark } from "./Trademark";
import { askEngage } from "../services/engageService";
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
  Legend
} from "recharts";

// Mock Dashboard Data
const ENGAGEMENT_TREND = [
  { name: "00:00", active: 120, conversions: 12 },
  { name: "04:00", active: 80, conversions: 8 },
  { name: "08:00", active: 250, conversions: 45 },
  { name: "12:00", active: 680, conversions: 110 },
  { name: "16:00", active: 940, conversions: 160 },
  { name: "20:00", active: 520, conversions: 75 },
];

export function IPDMEngage({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'intent' | 'quality' | 'flow' | 'ai_perf' | 'admin'>('overview');
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
      const geminiHistory = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const responseText = await askEngage(userMsg, geminiHistory);
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM FAILURE: Logic array disrupted. Rebooting conversational context..." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col font-sans transition-colors duration-1000">
      {/* Header HUD */}
      <header className="h-20 border-b border-[var(--color-text)]/5 bg-[var(--color-bg)]/40 backdrop-blur-3xl flex items-center justify-between px-8 sticky top-0 z-[60]">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('ecosystem')}
            className="p-2 hover:bg-[var(--color-text)]/5 rounded-full transition-colors text-zinc-500 hover:text-[var(--color-text)]"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-display font-black italic tracking-widest text-[var(--color-text)] group cursor-default">
              <Trademark text="IPDM Engage" />
            </h1>
            <span className="text-[12px] font-mono text-zinc-500 font-bold uppercase tracking-wider">Conversational Intelligence</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
            <div className="hidden lg:flex gap-8 items-center border-l border-[var(--color-text)]/5 pl-8">
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Interface Status</p>
                  <p className="text-[10px] font-bold text-emerald-500 tracking-widest">ACTIVE_NODE_STABLE</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Global Satisfaction</p>
                  <p className="text-[10px] font-bold">98.4%</p>
               </div>
            </div>
            <button className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-xl text-[11px] font-mono font-black text-primary hover:bg-primary hover:text-black transition-all uppercase tracking-wider">
               Admin Console
            </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto custom-scrollbar">
        
        {/* Left Col: Architecture & Features */}
        <aside className="lg:col-span-3 space-y-8 flex flex-col overflow-y-auto pr-4 custom-scrollbar-thin">
           {/* Architecture Block */}
           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass">
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-8 flex items-center gap-2">
                <Layers size={14} className="text-primary" /> System Layers
              </h2>
              <div className="space-y-4">
                 {[
                    { n: "Input Processing", l: "Layer 01" },
                    { n: "NLU Processor", l: "Layer 02" },
                    { n: "Context Manager", l: "Layer 03" },
                    { n: "Conv Intelligence", l: "Layer 04" },
                    { n: "Business Knowledge", l: "Layer 05" },
                    { n: "Response Delivery", l: "Layer 06" },
                 ].map((layer, idx) => (
                    <div key={idx} className="relative group">
                       <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/40 transition-all cursor-help">
                          <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-colors">
                             <Cpu size={16} />
                          </div>
                          <div>
                             <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-tight">{layer.l}</p>
                             <p className="text-xs font-bold uppercase tracking-tight">{layer.n}</p>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Features Quick List */}
           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass flex-1">
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-8 flex items-center gap-2">
                 <Zap size={14} className="text-primary" /> Core Capabilities
              </h2>
              <div className="grid grid-cols-1 gap-3">
                 {[
                    "Natural Language Understanding",
                    "Context-Aware Communication",
                    "Intent Detection Engine",
                    "Dynamic Response Gen",
                    "Multi-Turn Management",
                    "Guided Decision Engine",
                    "Conversational Memory",
                    "Business Knowledge Sync"
                 ].map((f, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-black border border-white/5 hover:border-white/20 transition-all group">
                       <div className="flex items-center gap-3">
                          <CheckCircle2 size={12} className="text-primary/40 group-hover:text-primary transition-colors" />
                          <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white uppercase tracking-tight">{f}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </aside>

        {/* Center: Converse & Console */}
        <section className="lg:col-span-5 flex flex-col gap-8 h-[calc(100vh-140px)]">
           {/* Conversation Engine */}
           <div className="flex-1 flex flex-col rounded-[3rem] bg-white/[0.01] border border-white/5 relative overflow-hidden glass shadow-2xl">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/20">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-neon" />
                    <span className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-primary">Conversational Intelligence Node</span>
                 </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar-thin">
                 {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-12">
                       <div className="relative">
                          <div className="w-24 h-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center border border-primary/20 animate-pulse">
                             <Bot className="w-12 h-12 text-primary" />
                          </div>
                       </div>
                       <div className="space-y-4">
                          <h2 className="text-4xl font-display font-medium italic tracking-tight">IPDM Engage™ AI</h2>
                          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest max-w-sm mx-auto leading-loose italic">
                             Human-like conversational interaction infrastructure.
                             Enabling business intelligence through dialogue.
                          </p>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                        {[
                          "Would you like help choosing the right setup?",
                          "I can compare solutions for your business.",
                          "Would you like pricing guidance?",
                          "I can recommend the best option based on your needs.",
                        ].map(q => (
                          <button 
                            key={q}
                            onClick={() => setInput(q)}
                            className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-white hover:border-primary/40 text-left transition-all backdrop-blur-xl"
                          >
                            {q}
                          </button>
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
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex-shrink-0 flex items-center justify-center border border-primary/20 shadow-neon/10">
                           <Bot size={22} className="text-primary" />
                        </div>
                      )}
                      <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                         <div className={`p-8 rounded-[2.5rem] ${msg.role === 'user' ? 'bg-primary text-black font-semibold' : 'bg-white/[0.04] border border-white/5 text-zinc-300'}`}>
                            <div className="whitespace-pre-wrap leading-relaxed text-sm">
                               {msg.content}
                            </div>
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
                       <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 animate-spin">
                          <RefreshCw size={22} className="text-primary" />
                       </div>
                       <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-zinc-600 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] font-black">
                          Processing Context...
                       </div>
                    </div>
                 )}
              </div>

              <div className="p-10 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
                 <div className="relative max-w-4xl mx-auto group">
                    <input 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="INITIATE CONVERSATION..."
                      className="w-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-7 pr-24 text-sm focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all font-mono tracking-widest uppercase placeholder:text-zinc-700"
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
        </section>

        {/* Right Col: Dashboard Insights */}
        <section className="lg:col-span-4 flex flex-col h-[calc(100vh-140px)]">
           <div className="flex-1 rounded-[3rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 glass flex flex-col overflow-hidden">
              <div className="p-10 border-b border-white/5 bg-black/20">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h3 className="text-sm font-display font-medium uppercase tracking-[0.2em] italic text-primary">IPDM ENGAGE™ Console</h3>
                       <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Conversational Intelligence</p>
                    </div>
                    <Activity className="text-primary" size={24} />
                 </div>

                 {/* Tab Navigation */}
                 <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'overview', label: 'Overview', icon: <PieChartIcon size={12} /> },
                      { id: 'intent', label: 'Intent', icon: <Target size={12} /> },
                      { id: 'quality', label: 'Quality', icon: <CheckCircle2 size={12} /> },
                      { id: 'flow', label: 'Flow', icon: <Workflow size={12} /> },
                      { id: 'ai_perf', label: 'AI Perf', icon: <Cpu size={12} /> },
                      { id: 'admin', label: 'Admin', icon: <Settings size={12} /> },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                          activeTab === tab.id 
                            ? 'bg-primary text-black shadow-neon' 
                            : 'bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar-thin">
                {activeTab === 'overview' && (
                  <>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Total Conversations</p>
                          <div className="flex items-baseline gap-2">
                             <span className="text-3xl font-display font-medium italic text-white">4,281</span>
                          </div>
                       </div>
                       <div className="space-y-2 text-right">
                          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active Threads</p>
                          <div className="flex items-baseline gap-2 justify-end">
                             <span className="text-3xl font-display font-medium italic text-primary">142</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                             <span className="text-zinc-500 italic">Avg Duration</span>
                             <span className="text-white font-black">12m 42s</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                             <span className="text-zinc-500 italic">Completion Rate</span>
                             <span className="text-emerald-500 font-black">92.4%</span>
                          </div>
                       </div>

                       <div className="h-48 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={ENGAGEMENT_TREND}>
                                <defs>
                                   <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                   </linearGradient>
                                </defs>
                                <XAxis dataKey="name" hide />
                                <YAxis hide />
                                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px' }} />
                                <Area type="monotone" dataKey="active" stroke="#22d3ee" fillOpacity={1} fill="url(#colorEngage)" strokeWidth={3} />
                             </AreaChart>
                          </ResponsiveContainer>
                       </div>
                    </div>
                  </>
                )}

                {activeTab === 'intent' && (
                  <div className="space-y-8">
                    <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Top User Intents</h4>
                    <div className="space-y-4">
                       {[
                          { name: 'Pricing Inquiry', value: 42 },
                          { name: 'Product Understanding', value: 28 },
                          { name: 'Purchase Intent', value: 15 },
                          { name: 'Support Request', value: 10 },
                          { name: 'Comparison', value: 5 },
                       ].map((intent, i) => (
                          <div key={i} className="space-y-2">
                             <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                                <span className="text-zinc-400">{intent.name}</span>
                                <span className="text-white">{intent.value}%</span>
                             </div>
                             <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${intent.value}%` }}
                                  className="h-full bg-primary" 
                                />
                             </div>
                          </div>
                       ))}
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 italic">Conversion Intent Tracking</p>
                        <p className="text-2xl font-display italic text-emerald-500">OPTIMIZING</p>
                    </div>
                  </div>
                )}

                {activeTab === 'quality' && (
                  <div className="space-y-8">
                    <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Quality Metrics</h4>
                    <div className="grid grid-cols-1 gap-4">
                       {[
                          { label: "Response Accuracy", val: "99.2%", trend: "+0.4%" },
                          { label: "Engagement Score", val: "8.4 / 10", trend: "+1.2" },
                          { label: "Response Relevance", val: "96.4%", trend: "STABLE" },
                          { label: "User Satisfaction", val: "98.4%", trend: "+0.2%" },
                       ].map((m, i) => (
                          <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center">
                             <div>
                                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">{m.label}</p>
                                <p className="text-lg font-display font-medium text-white">{m.val}</p>
                             </div>
                             <span className="text-[10px] font-mono text-emerald-500">{m.trend}</span>
                          </div>
                       ))}
                    </div>
                  </div>
                )}

                {activeTab === 'flow' && (
                  <div className="space-y-8">
                    <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Flow Analytics</h4>
                    <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10">
                       <p className="text-[11px] text-zinc-400 italic leading-relaxed">
                          User journeys are consistently reaching "Recommendation" node within <span className="text-white">4.2 interactions</span>.
                       </p>
                    </div>
                    
                    <div className="space-y-4">
                       <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                          <span className="text-zinc-500">Interaction Depth</span>
                          <span className="text-white">6.4 Turns</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                          <span className="text-zinc-500">Flow Completion</span>
                          <span className="text-emerald-500">84%</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                          <span className="text-zinc-500">Drop-off Point</span>
                          <span className="text-zinc-400">PRIC_TIER_3</span>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ai_perf' && (
                  <div className="space-y-8">
                    <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">AI Performance Monitoring</h4>
                    <div className="space-y-6">
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                             <p className="text-[9px] font-mono text-zinc-500 uppercase">Detection Acc</p>
                             <p className="text-xl font-display text-primary">99.8%</p>
                          </div>
                          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                             <p className="text-[9px] font-mono text-zinc-500 uppercase">Latency</p>
                             <p className="text-xl font-display text-white">124ms</p>
                          </div>
                       </div>
                       <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                             <span className="text-zinc-500">Context Retention</span>
                             <span className="text-primary">OPTIMAL</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                             <span className="text-zinc-500">Continuity Score</span>
                             <span className="text-white font-black">0.98</span>
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'admin' && (
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Admin Control Center</h4>
                    <div className="grid grid-cols-1 gap-3">
                       {[
                          "Edit Conversational Prompts",
                          "Configure Style Guidelines",
                          "Modify Tone Rules",
                          "Adjust Response Behavior",
                          "Configure Workflows",
                          "Manage Contextual Logic"
                       ].map((action, i) => (
                          <button key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/40 transition-all text-left group">
                             <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-600 group-hover:text-primary transition-colors">
                                <Settings size={14} />
                             </div>
                             <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">{action}</span>
                          </button>
                       ))}
                    </div>
                  </div>
                )}
              </div>
           </div>
        </section>
      </main>

      {/* Global Background UI Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000">
        <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-primary/5 rounded-full blur-[250px]" />
        <div className="absolute bottom-0 left-0 w-[1200px] h-[1200px] bg-indigo-500/5 rounded-full blur-[250px]" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>
    </div>
  );
}
