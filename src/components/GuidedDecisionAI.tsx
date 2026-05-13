import { motion, AnimatePresence } from "motion/react";
import { 
  Navigation, 
  Target, 
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
  Eye,
  Lock,
  ChevronRight,
  Sparkles,
  PieChart as PieChartIcon,
  Scaling,
  Briefcase,
  Layers,
  CheckCircle2,
  Cpu,
  TrendingDown,
  TrendingUp,
  BrainCircuit,
  Compass,
  ArrowRightLeft,
  MousePointer2
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Trademark } from "./Trademark";
import { askDecisionEngine } from "../services/guidedDecisionService";
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

// Mock Data
const RECOMMENDATION_DATA = [
  { name: 'Core Setup', value: 45, color: '#22d3ee' },
  { name: 'Enterprise', value: 30, color: '#34d399' },
  { name: 'Startup', value: 25, color: '#818cf8' },
];

const DECISION_PROGRESSION = [
  { time: '08:00', rate: 72 },
  { time: '12:00', rate: 84 },
  { time: '16:00', rate: 91 },
  { time: '20:00', rate: 88 },
];

export function GuidedDecisionAI({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, action?: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'decision' | 'objection' | 'cta' | 'journey' | 'ai_perf' | 'admin'>('overview');
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
      
      const responseText = await askDecisionEngine(userMsg, geminiHistory);
      
      // Simulate action recommendation
      const action = userMsg.toLowerCase().includes('compare') ? 'Comparative Reasoning' :
                     userMsg.toLowerCase().includes('recommend') ? 'Contextual Solution' : 'Consultative Guidance';

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responseText,
        action
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "GUIDANCE FAILURE: Consultative link interrupted. Rebooting decision engine..." }]);
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
              <Trademark text="IPDM Decision Engine" />
            </h1>
            <span className="text-[12px] font-mono text-primary font-bold uppercase tracking-wider">Business Advisory System</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
            <div className="hidden lg:flex gap-8 items-center border-l border-white/5 pl-8">
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Decision Success</p>
                  <p className="text-[10px] font-bold text-primary tracking-widest">94.5%_PEAK</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Avg Acceleration</p>
                  <p className="text-[10px] font-bold text-emerald-500">2.6X FASTER</p>
               </div>
            </div>
            <div className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-xl">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-neon" />
                  <span className="text-[10px] font-mono font-black text-primary uppercase tracking-widest">Consultative Mode Active</span>
               </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        
        {/* Left Col: Decision Framework */}
        <aside className="lg:col-span-3 space-y-6 flex flex-col overflow-y-auto pr-2 custom-scrollbar-thin">
           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass">
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <Compass size={14} className="text-primary" /> Advice Framework
              </h2>
              <div className="space-y-4">
                 {[
                    { label: 'Contextual Matching', sub: 'Business Fit', icon: <Briefcase size={12} /> },
                    { label: 'Comparative Reasoning', sub: 'Option Differentiation', icon: <ArrowRightLeft size={12} /> },
                    { label: 'Objection Resolution', sub: 'Confidence Building', icon: <ShieldCheck size={12} /> },
                    { label: 'Conversion Accelerator', sub: 'Strategic CTAs', icon: <Zap size={12} /> },
                 ].map((item, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/40 transition-all group">
                       <div className="flex items-center gap-4 mb-1">
                          <div className="text-zinc-500 group-hover:text-primary transition-colors">{item.icon}</div>
                          <span className="text-[10px] font-bold text-white uppercase tracking-tight">{item.label}</span>
                       </div>
                       <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest pl-7">{item.sub}</p>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass flex-1">
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <Layers size={14} className="text-primary" /> Strategic Alignment
              </h2>
              <div className="space-y-6">
                 {[
                    { l: 'Growth Stage', v: 'OPTIMIZED' },
                    { l: 'Operational Scale', v: 'FLEXIBLE' },
                    { l: 'Investment ROI', v: 'HIGH_YIELD' },
                    { l: 'Tech Readiness', v: 'INTEGRATED' },
                 ].map((row, i) => (
                    <div key={i} className="flex flex-col gap-1">
                       <div className="flex justify-between items-baseline">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">{row.l}</span>
                          <span className="text-[10px] font-bold text-white uppercase">{row.v}</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                            className="h-full bg-primary/40" 
                          />
                       </div>
                    </div>
                 ))}
              </div>
              <div className="mt-8 p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                 <p className="text-[9px] font-mono text-zinc-400 italic leading-relaxed text-center">
                    Decision simplification system is currently pruning <span className="text-white font-black italic">68% of non-relevant data.</span>
                 </p>
              </div>
           </div>
        </aside>

        {/* Center: Consultative Interface */}
        <section className="lg:col-span-5 flex flex-col gap-6 h-[calc(100vh-140px)]">
           <div className="flex-1 flex flex-col rounded-[3rem] bg-white/[0.01] border border-white/5 relative overflow-hidden glass shadow-2xl">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 shadow-neon/10">
                       <BrainCircuit className="text-primary" size={20} />
                    </div>
                    <div>
                       <span className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-primary">Decision Intelligence Bridge</span>
                       <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Advisory Framework Offline_NOT_EXPECTED</p>
                    </div>
                 </div>
                 <div className="hidden sm:block text-right">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase">Guidance Mode</p>
                    <p className="text-[10px] font-bold text-emerald-500 italic">CONSULTATIVE_ADVISORY</p>
                 </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar-thin">
                 {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-10 py-10">
                       <div className="relative">
                          <div className="w-32 h-32 bg-primary/5 rounded-[3rem] flex items-center justify-center border border-primary/20 rotate-45">
                             <Compass className="w-12 h-12 text-primary -rotate-45" />
                          </div>
                          <div className="absolute top-0 right-0 w-8 h-8 bg-black border border-primary/40 rounded-full flex items-center justify-center animate-bounce">
                             <Sparkles className="text-primary" size={14} />
                          </div>
                       </div>
                       <div className="space-y-4">
                          <h2 className="text-3xl font-display font-medium italic tracking-tight text-white">Advisory Link Ready</h2>
                          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] max-w-sm mx-auto leading-loose italic">
                             Strategic consultative intelligence infrastructure. 
                             Accelerating business decisions through expert guidance.
                          </p>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                        {[
                          "Would you like help choosing the right setup?",
                          "Compare the available options for me.",
                          "Would you like a strategic recommendation?",
                          "Explain which solution scales better."
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
                     initial={{ opacity: 0, scale: 0.98 }}
                     animate={{ opacity: 1, scale: 1 }}
                     key={i}
                     className={`flex gap-5 ${msg.role === 'user' ? 'justify-end' : ''}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 bg-zinc-900 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/10">
                             <Bot size={18} className="text-primary" />
                          </div>
                          <div className="w-[1px] flex-1 bg-white/5" />
                        </div>
                      )}
                      <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                         {msg.action && (
                           <div className="flex items-center gap-2 mb-2">
                             <span className="text-[8px] font-mono font-black uppercase tracking-widest text-primary border border-primary/20 px-2 py-0.5 rounded">
                               {msg.action}
                             </span>
                           </div>
                         )}
                         <div className={`p-6 rounded-[2rem] ${msg.role === 'user' ? 'bg-primary text-black font-bold' : 'bg-white/[0.03] border border-white/5 text-zinc-300 shadow-xl'}`}>
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
                          Developing Strategic Recommendations...
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
                      placeholder="INITIATE ADVISORY FLOW..."
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

        {/* Right Col: Decision Intelligence Console */}
        <section className="lg:col-span-4 flex flex-col h-[calc(100vh-140px)]">
           <div className="flex-1 rounded-[3rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 glass flex flex-col overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 bg-black/40">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h3 className="text-sm font-display font-medium uppercase tracking-[0.2em] italic text-primary">Decision Intelligence Hub</h3>
                       <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Managed Advisory Console</p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                       <Scaling className="text-primary" size={18} />
                    </div>
                 </div>

                 {/* Tab Navigation */}
                 <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'overview', label: 'Summary', icon: <PieChartIcon size={12} /> },
                      { id: 'decision', label: 'Decision', icon: <Compass size={12} /> },
                      { id: 'objection', label: 'Objection', icon: <ShieldCheck size={12} /> },
                      { id: 'cta', label: 'CTAs', icon: <Zap size={12} /> },
                      { id: 'journey', label: 'Journey', icon: <Navigation size={12} /> },
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
                     initial={{ opacity: 0, x: 10 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -10 }}
                     className="space-y-8"
                   >
                     {activeTab === 'overview' && (
                       <div className="space-y-8">
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-primary/40 transition-all">
                                <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Acceptance Rate</p>
                                <p className="text-2xl font-display text-white italic">92.4%</p>
                             </div>
                             <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-primary/40 transition-all">
                                <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Success Score</p>
                                <p className="text-2xl font-display text-primary italic">9.6 / 10</p>
                             </div>
                          </div>

                          <div className="space-y-4">
                             <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Solution Recommendations</h4>
                             <div className="h-48 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                   <PieChart>
                                      <Pie
                                         data={RECOMMENDATION_DATA}
                                         innerRadius={60}
                                         outerRadius={80}
                                         paddingAngle={5}
                                         dataKey="value"
                                      >
                                         {RECOMMENDATION_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                         ))}
                                      </Pie>
                                      <Tooltip 
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ fontSize: '10px', textTransform: 'uppercase' }}
                                      />
                                   </PieChart>
                                </ResponsiveContainer>
                             </div>
                             <div className="grid grid-cols-3 gap-2">
                                {RECOMMENDATION_DATA.map(r => (
                                   <div key={r.name} className="flex flex-col items-center">
                                      <div className="w-1 h-3 rounded-full mb-1" style={{ backgroundColor: r.color }} />
                                      <span className="text-[8px] font-mono text-zinc-600 uppercase text-center">{r.name}</span>
                                   </div>
                                ))}
                             </div>
                          </div>
                       </div>
                     )}

                     {activeTab === 'decision' && (
                       <div className="space-y-8">
                          <div className="h-56 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={DECISION_PROGRESSION}>
                                   <defs>
                                      <linearGradient id="colorDecision" x1="0" y1="0" x2="0" y2="1">
                                         <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                                         <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                      </linearGradient>
                                   </defs>
                                   <XAxis dataKey="time" hide />
                                   <YAxis hide domain={[0, 100]} />
                                   <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                   <Area type="monotone" dataKey="rate" stroke="#22d3ee" fill="url(#colorDecision)" strokeWidth={3} />
                                </AreaChart>
                             </ResponsiveContainer>
                          </div>
                          <div className="space-y-4">
                             <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                                <span>Completion Rate</span>
                                <span className="text-white font-bold">88%</span>
                             </div>
                             <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                                <span>Comparison Depth</span>
                                <span className="text-primary font-bold">4.2 OPS</span>
                             </div>
                          </div>
                       </div>
                     )}

                     {activeTab === 'objection' && (
                       <div className="space-y-6">
                          <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Objection Analysis</h4>
                          {[
                             { label: 'Pricing Concerns', val: 45, success: '82%' },
                             { label: 'Complexity Fear', val: 28, success: '94%' },
                             { label: 'Trust Verification', val: 15, success: '98%' },
                             { label: 'Scalability Doubt', val: 12, success: '88%' },
                          ].map((obj, i) => (
                             <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3">
                                <div className="flex justify-between items-center">
                                   <span className="text-[10px] font-mono text-zinc-400 uppercase">{obj.label}</span>
                                   <span className="text-[10px] font-bold text-emerald-500 uppercase">{obj.success} RESOLVED</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                   <motion.div 
                                     initial={{ width: 0 }}
                                     animate={{ width: `${obj.val}%` }}
                                     className="h-full bg-primary" 
                                   />
                                </div>
                             </div>
                          ))}
                       </div>
                     )}

                     {activeTab === 'cta' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">CTA Intelligence</h4>
                           <div className="grid grid-cols-1 gap-4">
                              {[
                                 { label: 'Proposal Request', rate: '24.2%', icon: <MousePointer2 size={12} /> },
                                 { label: 'Consultation Book', rate: '18.4%', icon: <MessageSquare size={12} /> },
                                 { label: 'System Demo', rate: '12.6%', icon: <Eye size={12} /> },
                                 { label: 'Pricing Quote', rate: '44.8%', icon: <Target size={12} /> },
                              ].map((cta, i) => (
                                 <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group hover:border-primary/40 transition-all">
                                    <div className="flex items-center gap-3">
                                       <div className="p-2 rounded-lg bg-zinc-900 group-hover:text-primary transition-colors text-zinc-500">{cta.icon}</div>
                                       <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{cta.label}</span>
                                    </div>
                                    <span className="text-sm font-display italic text-white">{cta.rate}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {activeTab === 'journey' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Stage Journey Mapping</h4>
                           <div className="space-y-6">
                              {[
                                 { stage: 'Discovery', count: 1240, color: 'bg-zinc-700' },
                                 { stage: 'Selection', count: 860, color: 'bg-indigo-500' },
                                 { stage: 'Validation', count: 420, color: 'bg-emerald-500' },
                                 { stage: 'Decision', count: 120, color: 'bg-primary' },
                              ].map((s, i) => (
                                 <div key={i} className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full ${s.color}`} />
                                    <div className="flex-1">
                                       <div className="flex justify-between items-baseline mb-1">
                                          <span className="text-[10px] font-mono text-zinc-400 uppercase">{s.stage}</span>
                                          <span className="text-[10px] font-bold text-white">{s.count} Users</span>
                                       </div>
                                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                          <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(s.count / 1240) * 100}%` }}
                                            className={`h-full ${s.color}`} 
                                          />
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {activeTab === 'ai_perf' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Guidance Reliability</h4>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
                                 <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Logic Accuracy</p>
                                 <p className="text-2xl font-display text-white">99.8%</p>
                              </div>
                              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
                                 <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">NLU Parity</p>
                                 <p className="text-2xl font-display text-primary">0.99</p>
                              </div>
                           </div>
                           <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                                 <span>Bias Safeguards</span>
                                 <span className="text-emerald-500 font-bold">LOCKED</span>
                              </div>
                              <div className="mt-4 flex gap-1">
                                 {[...Array(12)].map((_, i) => (
                                    <div key={i} className="flex-1 h-3 bg-primary/20 rounded shadow-neon/10" />
                                 ))}
                              </div>
                           </div>
                        </div>
                     )}

                     {activeTab === 'admin' && (
                        <div className="space-y-4">
                           {[
                              "Edit Recommendation Logic",
                              "Configure Comparison Workflows",
                              "Modify Decision Flows",
                              "Adjust CTA Triggers",
                              "Objection-Handling Rules",
                              "Analytics Visibility Toggle"
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

      {/* Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>
    </div>
  );
}
