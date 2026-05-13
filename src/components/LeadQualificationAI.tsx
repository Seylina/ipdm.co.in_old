
import { motion, AnimatePresence } from "motion/react";
import { 
  Target, 
  TrendingUp, 
  Zap, 
  Activity, 
  BarChart3, 
  Users, 
  ShieldCheck, 
  Settings, 
  ArrowLeft,
  Bot,
  User,
  Send,
  RefreshCw,
  Search,
  MessageSquare,
  Globe,
  Database,
  Code,
  Share2,
  LineChart,
  Navigation,
  Eye,
  Lock,
  ChevronRight,
  Sparkles,
  PieChart as PieChartIcon,
  Flame,
  Thermometer,
  Clock,
  Briefcase,
  Layers,
  CheckCircle2,
  Cpu
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Trademark } from "./Trademark";
import { askLeadQualifier } from "../services/leadQualificationService";
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
  Legend,
  RadialBarChart,
  RadialBar
} from "recharts";

// Mock Data for Lead Intelligence
const QUALIFICATION_DIST = [
  { name: 'Hot Leads', value: 42, color: '#22d3ee' },
  { name: 'Warm Leads', value: 86, color: '#34d399' },
  { name: 'Cold Leads', value: 120, color: '#64748b' },
];

const INTENT_DATA = [
  { name: 'Pricing', value: 35 },
  { name: 'Purchase', value: 25 },
  { name: 'Research', value: 20 },
  { name: 'Consult', value: 15 },
  { name: 'Enterprise', value: 5 },
];

const URGENCY_TREND = [
  { time: '08:00', high: 12, med: 30, low: 45 },
  { time: '12:00', high: 45, med: 65, low: 30 },
  { time: '16:00', high: 78, med: 45, low: 20 },
  { time: '20:00', high: 32, med: 25, low: 55 },
];

export function LeadQualificationAI({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, score?: number, category?: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'intent' | 'behavior' | 'readiness' | 'priority' | 'ai_perf' | 'admin'>('overview');
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
      
      const responseText = await askLeadQualifier(userMsg, geminiHistory);
      
      // Simulate passive scoring
      const score = Math.floor(Math.random() * 40) + 60; // 60-100 range for demo
      const category = score > 85 ? 'Hot' : score > 70 ? 'Warm' : 'Cold';

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responseText,
        score,
        category
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "INTELLIGENCE FAILURE: Behavioral link unstable. Reconnecting qualification engine..." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col font-sans transition-colors duration-1000">
      {/* Header HUD */}
      <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-3xl flex items-center justify-between px-8 sticky top-0 z-[60]">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('ecosystem')}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-display font-black italic tracking-widest text-white group cursor-default">
              <Trademark text="IPDM Lead Intel" />
            </h1>
            <span className="text-[12px] font-mono text-primary font-bold uppercase tracking-wider">Qualification Infrastructure</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
            <div className="hidden lg:flex gap-8 items-center border-l border-white/5 pl-8">
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Detection Accuracy</p>
                  <p className="text-[10px] font-bold text-primary tracking-widest">99.1%_STABLE</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Avg Lead Score</p>
                  <p className="text-[10px] font-bold text-emerald-500">72.4</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20">
                <Flame size={14} className="text-primary" />
                <span className="text-[10px] font-mono font-black text-primary">HOT_STATE</span>
              </div>
            </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        
        {/* Left Col: Real-time Stats & Scopes */}
        <aside className="lg:col-span-3 space-y-6 flex flex-col overflow-y-auto pr-2 custom-scrollbar-thin">
           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass">
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <Target size={14} className="text-primary" /> Dynamic Scoreboard
              </h2>
              <div className="space-y-4">
                 {[
                   { label: 'Hot Leads', val: 42, color: 'text-primary', icon: <Flame size={12} /> },
                   { label: 'Warm Leads', val: 86, color: 'text-emerald-400', icon: <Thermometer size={12} /> },
                   { label: 'Cold Leads', val: 120, color: 'text-zinc-500', icon: <Clock size={12} /> },
                 ].map((card, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-white/20 transition-all">
                       <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-zinc-900 ${card.color}`}>
                             {card.icon}
                          </div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">{card.label}</span>
                       </div>
                       <span className={`text-xl font-display italic font-medium ${card.color}`}>{card.val}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass flex-1">
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <Layers size={14} className="text-primary" /> Intel Protocol
              </h2>
              <div className="space-y-6">
                 {[
                    { label: 'Intent Detection', status: 'PASSIVE_WATCH' },
                    { label: 'Behavioral Alpha', status: 'MONITORING' },
                    { label: 'Urgency Scope', status: 'ACTIVE' },
                    { label: 'Budget Proxy', status: 'INFERRING' },
                    { label: 'Conv Readiness', status: 'SCORING' }
                 ].map((step, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-xs font-bold text-white uppercase tracking-tight">{step.label}</span>
                       </div>
                       <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">{step.status}</span>
                    </div>
                 ))}
              </div>
              <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/20">
                 <p className="text-[10px] font-mono text-zinc-400 italic leading-relaxed">
                    Qualification nodes are operating at <span className="text-primary font-bold">124ms latency</span>. High reliability parity maintained across global sessions.
                 </p>
              </div>
           </div>
        </aside>

        {/* Center: Interaction Console */}
        <section className="lg:col-span-5 flex flex-col gap-6 h-[calc(100vh-140px)]">
           <div className="flex-1 flex flex-col rounded-[3rem] bg-white/[0.01] border border-white/5 relative overflow-hidden glass shadow-2xl">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                       <Target className="text-primary" size={20} />
                    </div>
                    <div>
                       <span className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-primary">Lead Intel Bridge</span>
                       <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Qualification Engine Active</p>
                    </div>
                 </div>
                 <div className="hidden sm:block text-right">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase">Analysis State</p>
                    <p className="text-[10px] font-bold text-primary italic">REAL_TIME_SCORING</p>
                 </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar-thin">
                 {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-10 py-10">
                       <div className="relative">
                          <div className="w-32 h-32 bg-primary/5 rounded-[2.5rem] flex items-center justify-center border border-primary/20 animate-pulse">
                             <Target className="w-12 h-12 text-primary" />
                          </div>
                          <div className="absolute -top-4 -right-4 px-3 py-1 bg-primary text-black text-[9px] font-mono font-black rounded uppercase shadow-neon">Intel Ready</div>
                       </div>
                       <div className="space-y-4">
                          <h2 className="text-3xl font-display font-medium italic tracking-tight text-white">Qualification Initialization</h2>
                          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] max-w-sm mx-auto leading-loose italic">
                             AI-driven lead intelligence infrastructure. 
                             Analyzing intent, behavior, and conversion readiness in real time.
                          </p>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                        {[
                          "What type of business are you operating?",
                          "Are you looking for immediate setup?",
                          "What is your primary objective?",
                          "Analyze my business intent."
                        ].map(q => (
                          <button 
                            key={q}
                            onClick={() => setInput(q)}
                            className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-white hover:border-primary/40 text-left transition-all backdrop-blur-xl"
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
                     className={`flex gap-5 ${msg.role === 'user' ? 'justify-end' : ''}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 bg-zinc-900 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/10 shadow-neon/5">
                             <Bot size={18} className="text-primary" />
                          </div>
                          <div className="w-[1px] flex-1 bg-white/5" />
                        </div>
                      )}
                      <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                         {msg.category && (
                           <div className="flex items-center gap-3 mb-2">
                             <span className={`text-[8px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                               msg.category === 'Hot' ? 'bg-primary text-black' : 
                               msg.category === 'Warm' ? 'bg-emerald-500/20 text-emerald-400' : 
                               'bg-zinc-800 text-zinc-500'
                             }`}>
                               {msg.category} LEAD
                             </span>
                             <span className="text-[8px] font-mono text-zinc-600 uppercase">Score: {msg.score}</span>
                           </div>
                         )}
                         <div className={`p-6 rounded-[2rem] ${msg.role === 'user' ? 'bg-primary text-black font-bold' : 'bg-white/[0.03] border border-white/5 text-zinc-300'}`}>
                            <div className="whitespace-pre-wrap leading-relaxed text-sm">
                               {msg.content}
                            </div>
                         </div>
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/20">
                           <User size={18} className="text-zinc-500" />
                        </div>
                      )}
                    </motion.div>
                 ))}
                 {isLoading && (
                    <div className="flex gap-5">
                       <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                          <RefreshCw size={18} className="text-primary animate-spin" />
                       </div>
                       <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-zinc-600 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] font-black italic">
                          Analyzing Behavioral Signals...
                       </div>
                    </div>
                 )}
              </div>

              <div className="p-8 border-t border-white/5 bg-black/60 backdrop-blur-3xl">
                 <div className="relative max-w-4xl mx-auto group">
                    <input 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="INITIATE QUALIFICATION FLOW..."
                      className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 pr-20 text-sm focus:outline-none focus:border-primary/40 transition-all font-mono tracking-widest uppercase placeholder:text-zinc-800"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-3 top-3 bottom-3 aspect-square bg-primary text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-neon disabled:opacity-30"
                    >
                      <Send size={18} />
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* Right Col: Lead Intelligence Console */}
        <section className="lg:col-span-4 flex flex-col h-[calc(100vh-140px)]">
           <div className="flex-1 rounded-[3rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 glass flex flex-col overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 bg-black/40">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h3 className="text-sm font-display font-medium uppercase tracking-[0.2em] italic text-primary">Intelligence Console</h3>
                       <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Lead Analysis Architecture</p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                       <BarChart3 className="text-primary" size={18} />
                    </div>
                 </div>

                 {/* Tab Navigation */}
                 <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'overview', label: 'Summary', icon: <PieChartIcon size={12} /> },
                      { id: 'intent', label: 'Intent', icon: <Search size={12} /> },
                      { id: 'behavior', label: 'Behavior', icon: <Eye size={12} /> },
                      { id: 'readiness', label: 'Readiness', icon: <CheckCircle2 size={12} /> },
                      { id: 'priority', label: 'Priority', icon: <TrendingUp size={12} /> },
                      { id: 'ai_perf', label: 'AI Perf', icon: <Cpu size={12} /> },
                      { id: 'admin', label: 'Admin', icon: <Settings size={12} /> },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-3 py-2 rounded-xl text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                          activeTab === tab.id 
                            ? 'bg-primary text-black shadow-neon scale-105' 
                            : 'bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar-thin">
                <AnimatePresence mode="wait">
                   <motion.div
                     key={activeTab}
                     initial={{ opacity: 0, scale: 0.98 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.98 }}
                     className="space-y-8"
                   >
                     {activeTab === 'overview' && (
                       <div className="space-y-8">
                          <div className="h-56 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <ReBarChart data={QUALIFICATION_DIST}>
                                   <XAxis dataKey="name" hide />
                                   <YAxis hide />
                                   <Tooltip 
                                     contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                     itemStyle={{ fontSize: '10px', textTransform: 'uppercase' }}
                                   />
                                   <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                                      {QUALIFICATION_DIST.map((entry, index) => (
                                         <Cell key={`cell-${index}`} fill={entry.color} />
                                      ))}
                                   </Bar>
                                </ReBarChart>
                             </ResponsiveContainer>
                          </div>
                          <div className="space-y-3">
                             <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Lead Category Distribution</h4>
                             {QUALIFICATION_DIST.map(stat => (
                               <div key={stat.name} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                  <div className="flex items-center gap-3">
                                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                                     <span className="text-[10px] font-mono text-zinc-400 uppercase">{stat.name}</span>
                                  </div>
                                  <span className="text-sm font-bold text-white">{stat.value}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                     )}

                     {activeTab === 'intent' && (
                       <div className="space-y-8">
                          <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">User Intent tracking</h4>
                          <div className="space-y-6">
                            {INTENT_DATA.map((intent, i) => (
                               <div key={i} className="space-y-2">
                                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                                     <span className="text-zinc-500">{intent.name}</span>
                                     <span className="text-white">{intent.value}%</span>
                                  </div>
                                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                     <motion.div 
                                       initial={{ width: 0 }}
                                       animate={{ width: `${intent.value}%` }}
                                       className="h-full bg-primary" 
                                     />
                                  </div>
                               </div>
                            ))}
                          </div>
                          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                             <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-mono text-zinc-500 uppercase">Enterprise Inquiry</span>
                                <span className="text-xs font-bold text-white">UP 12%</span>
                             </div>
                             <div className="h-24 w-full bg-grid-small opacity-20" />
                          </div>
                       </div>
                     )}

                     {activeTab === 'behavior' && (
                       <div className="space-y-6">
                          <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Behavioral Intelligence</h4>
                          {[
                             { label: 'Engagement Depth', val: '8.4 / 10', trend: 'OPTIMAL' },
                             { label: 'Repeat Visit Freq', val: '2.4', trend: 'RISING' },
                             { label: 'CTA Interaction', val: '14.2%', trend: '+2.1%' },
                             { label: 'Seriousness Index', val: '92%', trend: 'HIGH' },
                          ].map((m, i) => (
                             <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/5 transition-all">
                                <div>
                                   <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{m.label}</p>
                                   <p className="text-lg font-display italic text-white">{m.val}</p>
                                </div>
                                <span className="text-[8px] font-mono font-black text-primary border border-primary/20 px-2 py-1 rounded uppercase">{m.trend}</span>
                             </div>
                          ))}
                       </div>
                     )}

                     {activeTab === 'readiness' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Conversion Readiness</h4>
                           <div className="grid grid-cols-1 gap-4">
                              {[
                                 { label: 'Ready to Convert', val: 12, sub: 'HIGH_OPPORTUNITY' },
                                 { label: 'Evaluation Stage', val: 45, sub: 'NURTURE_REQUIRED' },
                                 { label: 'Research Phase', val: 124, sub: 'PASSIVE_WATCH' },
                              ].map((r, i) => (
                                 <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex justify-between items-center group hover:border-primary/40 transition-all">
                                    <div>
                                       <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{r.label}</p>
                                       <p className="text-[9px] font-mono text-zinc-600 uppercase mt-1 italic">{r.sub}</p>
                                    </div>
                                    <span className="text-2xl font-display italic text-white">{r.val}</span>
                                 </div>
                              ))}
                           </div>
                           <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                              <p className="text-[10px] text-zinc-400 italic text-center">Callback requests increased by <span className="text-emerald-500 font-bold">14%</span> today.</p>
                           </div>
                        </div>
                     )}

                     {activeTab === 'priority' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Lead Prioritization Engine</h4>
                           <div className="h-56 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={URGENCY_TREND}>
                                    <defs>
                                       <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                                          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                       </linearGradient>
                                    </defs>
                                    <XAxis dataKey="time" hide />
                                    <YAxis hide />
                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                    <Area type="monotone" dataKey="high" stroke="#22d3ee" fill="url(#colorHigh)" strokeWidth={3} />
                                 </AreaChart>
                              </ResponsiveContainer>
                           </div>
                           <div className="space-y-3">
                              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                                 <span className="text-zinc-500 italic">High Priority Leads</span>
                                 <span className="text-white font-bold">12 Active</span>
                              </div>
                              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                                 <span className="text-zinc-500 italic">Business-Value Score</span>
                                 <span className="text-emerald-500 font-bold">92.4</span>
                              </div>
                           </div>
                        </div>
                     )}

                     {activeTab === 'ai_perf' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Qualification Performance</h4>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                                 <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Intent Acc</p>
                                 <p className="text-2xl font-display text-primary">99.2%</p>
                              </div>
                              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                                 <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Scoring Bias</p>
                                 <p className="text-2xl font-display text-white">0.2%</p>
                              </div>
                           </div>
                           <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                                 <span>NLU Reliability</span>
                                 <span className="text-emerald-400 font-bold">OPTIMAL</span>
                              </div>
                              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                                 <span>Bias Mitigation</span>
                                 <span className="text-primary font-bold">ACTIVE</span>
                              </div>
                           </div>
                        </div>
                     )}

                     {activeTab === 'admin' && (
                        <div className="space-y-4">
                           {[
                              "Configure Lead Scoring Rules",
                              "Modify Qualification Logic",
                              "Edit Qualification Workflows",
                              "Configure Urgency Thresholds",
                              "Adjust Prioritization Logic",
                              "Analytics Visibility Hub"
                           ].map((action, i) => (
                              <button key={i} className="w-full p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/5 hover:border-primary/40 transition-all group">
                                 <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">{action}</span>
                                 <ChevronRight size={14} className="text-zinc-600 group-hover:text-primary transition-all" />
                              </button>
                           ))}
                        </div>
                     )}
                   </motion.div>
                </AnimatePresence>
              </div>
           </div>
        </section>
      </main>

      {/* Global Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>
    </div>
  );
}
