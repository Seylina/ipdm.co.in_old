import { motion, AnimatePresence } from "motion/react";
import { 
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
  TrendingUp,
  BrainCircuit,
  Compass,
  ArrowRightLeft,
  History,
  MemoryStick,
  Network,
  CloudLightning,
  AlertTriangle,
  Fingerprint,
  MousePointer2,
  Calendar,
  FileText,
  MessageCircle,
  PlayCircle,
  Filter,
  Check
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Trademark } from "./Trademark";
import { askConversionEngine } from "../services/conversionService";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart
} from "recharts";

// Mock Data
const FUNNEL_DATA = [
  { stage: 'Engagement', users: 1000, conversion: 100 },
  { stage: 'Qualification', users: 750, conversion: 75 },
  { stage: 'Ready', users: 400, conversion: 40 },
  { stage: 'Action', users: 150, conversion: 15 },
];

const CTA_PERFORMANCE = [
  { name: 'Consultation', rate: 12.5 },
  { name: 'Proposal', rate: 8.2 },
  { name: 'Demo', rate: 15.1 },
  { name: 'WhatsApp', rate: 22.4 },
  { name: 'Onboarding', rate: 5.6 },
];

export function ConversionAwareAI({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, cta?: string, readiness?: number }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'cta' | 'readiness' | 'lead' | 'workflow' | 'followup' | 'optimization' | 'admin'>('cta');
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
      
      const responseText = await askConversionEngine(userMsg, geminiHistory);
      
      // Simulate conversion signals
      const readiness = Math.floor(Math.random() * 30) + 60; 
      const ctaDetected = responseText.toLowerCase().includes("book") || responseText.toLowerCase().includes("schedule") || responseText.toLowerCase().includes("consultation") 
        ? "Book Strategy Session" 
        : responseText.toLowerCase().includes("whatsapp") 
        ? "Connect on WhatsApp" 
        : undefined;

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responseText,
        cta: ctaDetected,
        readiness
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM FAILURE: Conversion orchestration node bypassed. Retry action." }]);
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
              <Trademark text="IPDM Conversion AI" />
            </h1>
            <span className="text-[12px] font-mono text-primary font-bold uppercase tracking-wider">Action Orchestration Engine</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
            <div className="hidden lg:flex gap-8 items-center border-l border-white/5 pl-8">
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Conversion Parity</p>
                  <p className="text-[10px] font-bold text-primary tracking-widest">ENABLED_94.2%</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Active Workflows</p>
                  <p className="text-[10px] font-bold text-emerald-500">LIVE_12/12</p>
               </div>
            </div>
            <div className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-xl">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-neon" />
                  <span className="text-[10px] font-mono font-black text-primary uppercase tracking-widest">Orchestration Active</span>
               </div>
            </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        
        {/* Left Side: Conversion Tracks */}
        <aside className="lg:col-span-3 space-y-6 flex flex-col overflow-y-auto pr-2 custom-scrollbar-thin">
           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass">
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <Filter size={14} className="text-primary" /> Active Funnels
              </h2>
              <div className="space-y-4">
                 {[
                    { label: 'Consultation', status: 'HOT', icon: <Calendar size={12} /> },
                    { label: 'Proposal Tech', status: 'ACTIVE', icon: <FileText size={12} /> },
                    { label: 'WhatsApp Direct', status: 'PEAK', icon: <MessageCircle size={12} /> },
                    { label: 'Product Demo', status: 'READY', icon: <PlayCircle size={12} /> },
                    { label: 'Early Onboarding', status: 'STAGED', icon: <Check size={12} /> },
                 ].map((funnel, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-primary/40 transition-all">
                       <div className="flex items-center gap-3">
                          <div className="text-zinc-500 group-hover:text-primary transition-colors">{funnel.icon}</div>
                          <span className="text-[10px] font-bold text-white uppercase tracking-tight">{funnel.label}</span>
                       </div>
                       <span className="text-[8px] font-mono text-primary uppercase tracking-widest">{funnel.status}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass flex-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <MousePointer2 size={14} className="text-primary" /> Behavior Signals
              </h2>
              <div className="space-y-6">
                 {[
                    { l: 'Readiness Score', v: 'A+' },
                    { l: 'Buying Intent', v: 'PEAK' },
                    { l: 'Friction Rate', v: 'LOW_2%' },
                 ].map((row, i) => (
                    <div key={i} className="flex flex-col gap-1">
                       <div className="flex justify-between items-baseline">
                          <span className="text-[9px] font-mono text-zinc-600 uppercase italic">{row.l}</span>
                          <span className="text-[9px] font-bold text-white uppercase">{row.v}</span>
                       </div>
                       <div className="h-0.5 bg-white/5 rounded-full" />
                    </div>
                 ))}
              </div>
              <div className="mt-8">
                 <div className="h-32 w-full bg-white/[0.02] rounded-3xl border border-white/5 flex items-center justify-center">
                    <MousePointer2 className="text-primary/10 w-16 h-16 animate-pulse" />
                 </div>
              </div>
           </div>
        </aside>

        {/* Center: Conversion Console */}
        <section className="lg:col-span-5 flex flex-col gap-6 h-[calc(100vh-140px)]">
           <div className="flex-1 flex flex-col rounded-[3rem] bg-white/[0.01] border border-white/5 relative overflow-hidden glass shadow-2xl">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                       <Zap className="text-primary" size={20} />
                    </div>
                    <div>
                       <span className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-primary">Conversion Bridge</span>
                       <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Outcome Orchestration Mode Active</p>
                    </div>
                 </div>
                 <div className="hidden sm:block text-right">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase">Conversion IQ</p>
                    <p className="text-[10px] font-bold text-primary italic">94.8%_OPTIMIZED</p>
                 </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar-thin">
                 {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-12 py-10">
                       <div className="relative">
                          <div className="w-32 h-32 bg-primary/5 rounded-[2.5rem] flex items-center justify-center border border-primary/20 rotate-12 transition-transform hover:rotate-0 duration-500">
                             <TrendingUp className="w-12 h-12 text-primary" />
                          </div>
                          <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] blur-2xl -z-10 animate-pulse" />
                       </div>
                       <div className="space-y-4">
                          <h2 className="text-3xl font-display font-medium italic tracking-tight text-white">Conversion Link Live</h2>
                          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] max-w-sm mx-auto leading-loose italic">
                             AI-driven conversion orchestration infrastructure. 
                             Transforming interaction into measurable business outcomes.
                          </p>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                        {[
                          "I want to implement this quickly.",
                          "How do I schedule a strategy demo?",
                          "Can I get a proposal for my business?",
                          "Let's connect on WhatsApp."
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
                     className={`flex gap-6 ${msg.role === 'user' ? 'justify-end' : ''}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 bg-zinc-900 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/10 shadow-neon/10">
                             <Bot size={18} className="text-primary" />
                          </div>
                          <div className="w-[1px] flex-1 bg-white/5" />
                        </div>
                      )}
                      <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                         {msg.readiness !== undefined && (
                           <div className="flex items-center gap-3 mb-2">
                             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 border border-primary/20 rounded">
                               <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                               <span className="text-[8px] font-mono font-black text-primary uppercase tracking-widest">Readiness: {msg.readiness}%</span>
                             </div>
                             <span className="text-[8px] font-mono text-zinc-600 uppercase italic">Intent Level: HIGH</span>
                           </div>
                         )}
                         <div className={`p-6 rounded-[2rem] ${msg.role === 'user' ? 'bg-primary text-black font-bold' : 'bg-white/[0.03] border border-white/5 text-zinc-300'}`}>
                            <div className="whitespace-pre-wrap leading-relaxed text-sm">
                               {msg.content}
                            </div>
                            {msg.cta && (
                              <button className="mt-6 w-full p-4 bg-primary text-black font-black font-mono text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-neon">
                                <Zap size={14} /> {msg.cta}
                              </button>
                            )}
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
                    <div className="flex gap-6">
                       <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                          <RefreshCw size={18} className="text-primary animate-spin" />
                       </div>
                       <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-zinc-600 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] font-black italic">
                          Orchestrating Transition Flow...
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
                      placeholder="TRIGGER CONVERSION INTELLIGENCE..."
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

        {/* Right Col: Conversion Intelligence Console */}
        <section className="lg:col-span-4 flex flex-col h-[calc(100vh-140px)]">
           <div className="flex-1 rounded-[3rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 glass flex flex-col overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 bg-black/40">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h3 className="text-sm font-display font-medium uppercase tracking-[0.2em] italic text-primary">Conversion Console</h3>
                       <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Lead Activation & Outcome Hub</p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                       <Zap className="text-primary" size={18} />
                    </div>
                 </div>

                 {/* Tab Navigation */}
                 <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'cta', label: 'CTA', icon: <MousePointer2 size={12} /> },
                      { id: 'readiness', label: 'Readiness', icon: <Flame size={12} /> }, 
                      { id: 'lead', label: 'Leads', icon: <Users size={12} /> },
                      { id: 'workflow', label: 'Workflow', icon: <Workflow size={12} /> }, 
                      { id: 'followup', label: 'Followup', icon: <RefreshCw size={12} /> },
                      { id: 'optimization', label: 'Optimize', icon: <TrendingUp size={12} /> },
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
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="space-y-8"
                   >
                     {activeTab === 'cta' && (
                       <div className="space-y-8">
                          <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">CTA Click Intelligence</h4>
                          <div className="h-64 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <ReBarChart data={CTA_PERFORMANCE} layout="vertical">
                                   <XAxis type="number" hide />
                                   <YAxis dataKey="name" type="category" tick={{ fill: '#666', fontSize: 8, fontWeight: 900 }} />
                                   <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px' }} />
                                   <Bar dataKey="rate" fill="#22d3ee" radius={[0, 4, 4, 0]}>
                                      {CTA_PERFORMANCE.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                   </Bar>
                                </ReBarChart>
                             </ResponsiveContainer>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">CTR Peak</p>
                                <p className="text-xl font-bold text-white italic">22.4%</p>
                             </div>
                             <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Best Channel</p>
                                <p className="text-xl font-bold text-primary italic">WhatsApp</p>
                             </div>
                          </div>
                       </div>
                     )}

                     {activeTab === 'readiness' && (
                       <div className="space-y-8">
                          <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Conversion Readiness Scoring</h4>
                          <div className="h-64 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={FUNNEL_DATA}>
                                   <XAxis dataKey="stage" tick={{ fill: '#666', fontSize: 8, fontWeight: 900 }} />
                                   <YAxis hide />
                                   <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px' }} />
                                   <Area type="monotone" dataKey="users" fill="#22d3ee" fillOpacity={0.1} stroke="#22d3ee" />
                                   <Line type="monotone" dataKey="conversion" stroke="#10b981" strokeWidth={3} />
                                </ComposedChart>
                             </ResponsiveContainer>
                          </div>
                          <div className="space-y-4">
                             {[
                                { l: 'High-Intent Users', v: '142', s: 'MONITORING' },
                                { l: 'Buying Signals', v: 'ACTIVE', s: 'PEAK' },
                                { l: 'Friction Score', v: '0.04', s: 'LOW' },
                             ].map((m, i) => (
                                <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/5 transition-all">
                                   <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">{m.l}</span>
                                   <span className="text-sm font-bold text-white">{m.v}</span>
                                </div>
                             ))}
                          </div>
                       </div>
                     )}

                     {activeTab === 'lead' && (
                        <div className="space-y-8">
                           <div className="p-8 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/10 flex flex-col items-center text-center gap-6">
                              <Users className="text-indigo-500" size={48} />
                              <div>
                                 <h4 className="text-lg font-display italic text-white mb-2">Lead Intelligence capture</h4>
                                 <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-loose">
                                    Conversational data collection active. Progressive profiling mapping business goals and budget sensitivity in real time.
                                 </p>
                              </div>
                           </div>
                           <div className="grid grid-cols-1 gap-3">
                              {[
                                 { label: 'Completion Rate', val: '86.4%' },
                                 { label: 'Data Quality', val: 'EXACT' },
                                 { label: 'Nurture Ready', val: '100%' },
                              ].map((m, i) => (
                                 <div key={i} className="flex justify-between items-center p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{m.label}</span>
                                    <span className="text-primary font-bold text-[10px]">{m.val}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {activeTab === 'workflow' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Workflow Transition States</h4>
                           <div className="space-y-4">
                              {[
                                 { label: 'Awareness -> Intel', rate: 92 },
                                 { label: 'Intel -> Selection', rate: 74 },
                                 { label: 'Selection -> Action', rate: 32 },
                                 { label: 'Action -> Outcome', rate: 100 },
                              ].map((r, i) => (
                                <div key={i} className="space-y-2">
                                  <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest">
                                    <span className="text-zinc-400">{r.label}</span>
                                    <span className="text-primary">{r.rate}%</span>
                                  </div>
                                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      whileInView={{ width: `${r.rate}%` }}
                                      className="h-full bg-primary shadow-neon"
                                    />
                                  </div>
                                </div>
                              ))}
                           </div>
                           <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                              <p className="text-[9px] font-mono text-zinc-500 uppercase mb-2">Workflow Orchestration IQ</p>
                              <p className="text-3xl font-display text-white italic">99.1%</p>
                           </div>
                        </div>
                     )}

                     {activeTab === 'followup' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Follow-up Automation Nodes</h4>
                           <div className="space-y-4">
                              {[
                                 { label: 'Consultation Sync', status: 'ACTIVE', color: 'bg-primary' },
                                 { label: 'Proposal Delivery', status: 'WAITING', color: 'bg-emerald-500' },
                                 { label: 'WhatsApp Nurture', status: 'LIVE', color: 'bg-indigo-500' },
                              ].map((e, i) => (
                                 <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                       <div className={`w-3 h-3 rounded-full ${e.color}`} />
                                       <span className="text-[10px] font-mono font-bold text-white uppercase">{e.label}</span>
                                    </div>
                                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{e.status}</span>
                                 </div>
                              ))}
                           </div>
                           <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-primary/10 transition-all">
                              <RefreshCw className="text-primary group-hover:scale-110 transition-transform" />
                              <p className="text-[10px] font-mono text-zinc-400 italic">User engagement persistent across <span className="text-white font-bold">4 Automation Layers</span>.</p>
                           </div>
                        </div>
                     )}

                     {activeTab === 'optimization' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Conversion Optimization IQ</h4>
                           <div className="h-56 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                 <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                   { subject: 'Timing', A: 95, B: 80, fullMark: 100 },
                                   { subject: 'Context', A: 98, B: 90, fullMark: 100 },
                                   { subject: 'Friction', A: 100, B: 95, fullMark: 100 },
                                   { subject: 'Personalization', A: 92, B: 85, fullMark: 100 },
                                   { subject: 'Action', A: 85, B: 80, fullMark: 100 },
                                 ]}>
                                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 8, fontWeight: 900 }} />
                                    <Radar name="Strategy" dataKey="A" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.2} />
                                 </RadarChart>
                              </ResponsiveContainer>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                                 <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Conversion IQ</p>
                                 <p className="text-2xl font-display text-white">99.4/100</p>
                              </div>
                              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                                 <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Action Rate</p>
                                 <p className="text-2xl font-display text-primary">+12.4%</p>
                              </div>
                           </div>
                        </div>
                     )}

                     {activeTab === 'admin' && (
                        <div className="space-y-4">
                           {[
                              "Configure CTA Orchestration Rules",
                              "Edit Conversion Workflow Hierarchy",
                              "Manage Lead Capture Logic",
                              "Adjust Readiness Detection Threshold",
                              "Configure Follow-up Automation",
                              "Audit Conversion Intelligence"
                           ].map((btn, i) => (
                              <button key={i} className="w-full p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/10 hover:border-primary/40 transition-all group">
                                 <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">{btn}</span>
                                 <ChevronRight size={14} className="text-zinc-600 group-hover:text-primary" />
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

      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-primary/5 rounded-full blur-[240px]" />
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px]" />
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>
    </div>
  );
}

// Sub components substitutions
function Workflow(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M3 7h6v6H3z"/><path d="M21 3h6v6h-6z" transform="translate(-18 12)"/><path d="M21 3h6v6h-6z" transform="translate(-18 0)"/><path d="M9 10h6V4H9z" transform="translate(6 6)"/><path d="M6 13v3"/><path d="M18 13v3"/><path d="M12 7v3"/><path d="M6 16h12"/>
    </svg>
  );
}

const COLORS = ['#22d3ee', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];

function Flame(props: any) {
   return (
     <svg
       {...props}
       xmlns="http://www.w3.org/2000/svg"
       width="24"
       height="24"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
     >
       <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 3.5 6.5 1.5 2 1.5 3.5 1.5 5a4.5 4.5 0 0 1-9 0Z" />
       <path d="M11 22c.966 0 1.9-.322 2.634-.914a1.75 1.75 0 0 0 .285-2.586A5.518 5.518 0 0 1 12 11c0 2.5-1 4.5-2.5 4.5C8.067 15.5 7 14.433 7 13.1c0-.966.322-1.9.914-2.634a1.75 1.75 0 0 1 2.586-.285A5.518 5.518 0 0 1 12 11z" />
     </svg>
   );
 }
