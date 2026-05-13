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
  RotateCcw,
  Workflow,
  Target,
  Sparkle,
  GanttChart,
  Boxes,
  Microscope,
  Handshake,
  UserPlus,
  ArrowUpRight,
  ClipboardCheck,
  Building2,
  Pocket
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Trademark } from "./Trademark";
import { askCollaborationEngine } from "../services/collaborationService";
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
const PRODUCTIVITY_DATA = [
  { day: 'Mon', ai: 45, human: 35, synergy: 70 },
  { day: 'Tue', ai: 52, human: 38, synergy: 75 },
  { day: 'Wed', ai: 48, human: 42, synergy: 82 },
  { day: 'Thu', ai: 61, human: 45, synergy: 90 },
  { day: 'Fri', ai: 55, human: 40, synergy: 85 },
  { day: 'Sat', ai: 40, human: 30, synergy: 72 },
  { day: 'Sun', ai: 38, human: 28, synergy: 68 },
];

const COLLABORATION_RATIO = [
  { name: 'AI Task Load', value: 60 },
  { name: 'Human Context', value: 40 },
];

const COLORS = ['#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#1e1b4b'];

export function EnterpriseCollaborationAI({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, action?: string, priority?: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'collaboration' | 'productivity' | 'escalation' | 'decision' | 'workforce' | 'governance' | 'admin'>('collaboration');
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
      
      const responseText = await askCollaborationEngine(userMsg, geminiHistory);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responseText,
        action: "SYNERGY_OPTIMIZED",
        priority: "ENTERPRISE_CORE"
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM FAILURE: Collaboration layer saturated. Re-routing to human oversight." }]);
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
              <Trademark text="IPDM Synergy AI" />
            </h1>
            <span className="text-[12px] font-mono text-indigo-400 font-bold uppercase tracking-wider">Enterprise AI Collaboration & Human-AI Synergy</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
            <div className="hidden lg:flex gap-8 items-center border-l border-white/5 pl-8">
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Synergy Index</p>
                  <p className="text-[10px] font-bold text-indigo-400 tracking-widest">RANK_ENTERPRISE_S</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Workforce Health</p>
                  <p className="text-[10px] font-bold text-emerald-500">MAX_EFFICIENCY</p>
               </div>
            </div>
            <div className="px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-neon" />
                  <span className="text-[10px] font-mono font-black text-indigo-400 uppercase tracking-widest">Hybrid Orchestration Active</span>
               </div>
            </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        
        {/* Left Side: Collaboration Vectors */}
        <aside className="lg:col-span-3 space-y-6 flex flex-col overflow-y-auto pr-2 custom-scrollbar-thin">
           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass shadow-2xl">
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <Handshake size={14} className="text-indigo-400" /> Operational Synergy
              </h2>
              <div className="space-y-4">
                 {[
                    { label: 'Hybrid Workflows', status: 'SYNCHED', icon: <Workflow size={12} /> },
                    { label: 'Decision Support', status: 'ONLINE', icon: <BrainCircuit size={12} /> },
                    { label: 'Smart Escalation', status: 'READY', icon: <ArrowUpRight size={12} /> },
                    { label: 'Human Oversight', status: 'MASTER', icon: <ShieldCheck size={12} /> },
                    { label: 'Load Balancing', status: 'AUTO', icon: <Scaling size={12} /> },
                 ].map((mod, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-indigo-500/40 transition-all">
                       <div className="flex items-center gap-3">
                          <div className="text-zinc-500 group-hover:text-indigo-400 transition-colors">{mod.icon}</div>
                          <span className="text-[10px] font-bold text-white uppercase tracking-tight">{mod.label}</span>
                       </div>
                       <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-widest">{mod.status}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass flex-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <Building2 size={14} className="text-indigo-400" /> Enterprise Pulse
              </h2>
              <div className="space-y-6">
                 {[
                    { l: 'Synergy Velocity', v: '98.5%' },
                    { l: 'Communication IQ', v: 'A_RANK' },
                    { l: 'Workflow Continuity', v: '100%' },
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
                 <div className="h-32 w-full bg-indigo-500/[0.02] rounded-3xl border border-white/5 flex items-center justify-center relative">
                    <Sparkles className="text-indigo-500/10 w-16 h-16 animate-pulse" />
                    <div className="absolute inset-0 bg-white/5 animate-pulse rounded-3xl" />
                 </div>
              </div>
           </div>
        </aside>

        {/* Center: Collaboration Intelligence Console */}
        <section className="lg:col-span-5 flex flex-col gap-6 h-[calc(100vh-140px)]">
           <div className="flex-1 flex flex-col rounded-[3rem] bg-white/[0.01] border border-white/5 relative overflow-hidden glass shadow-2xl">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                       <Briefcase className="text-indigo-400" size={20} />
                    </div>
                    <div>
                       <span className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-indigo-400">Collaboration Bridge</span>
                       <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Enterprise Workforce Nodes Active</p>
                    </div>
                 </div>
                 <div className="hidden sm:block text-right">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase">Productivity Score</p>
                    <p className="text-[10px] font-bold text-indigo-400 italic">RANK_SYNERGY_ELITE</p>
                 </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar-thin">
                 {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-12 py-10">
                       <div className="relative">
                          <div className="w-32 h-32 bg-indigo-500/5 rounded-[2.5rem] flex items-center justify-center border border-indigo-500/20 rotate-12 transition-transform hover:rotate-0 duration-500">
                             <Handshake size={48} className="text-indigo-400" />
                          </div>
                          <div className="absolute inset-0 bg-indigo-500/10 rounded-[2.5rem] blur-2xl -z-10 animate-pulse" />
                       </div>
                       <div className="space-y-4">
                          <h2 className="text-3xl font-display font-medium italic tracking-tight text-white">Collaboration Intelligence Node</h2>
                          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] max-w-sm mx-auto leading-loose italic">
                             AI-driven operational synergy infrastructure. 
                             Synchronizing human teams and AI systems to optimize enterprise productivity, decision support, and hybrid workforce orchestration.
                          </p>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                        {[
                          "Coordinate a new high-priority lead workflow.",
                          "Provide strategic decision support for resource allocation.",
                          "Optimize team productivity for current operational load.",
                          "Initiate smart escalation for complex customer needs."
                        ].map(q => (
                          <button 
                            key={q}
                            onClick={() => setInput(q)}
                            className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-white hover:border-indigo-500/40 text-left transition-all backdrop-blur-xl"
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
                             <Bot size={18} className="text-indigo-400" />
                          </div>
                          <div className="w-[1px] flex-1 bg-white/5" />
                        </div>
                      )}
                      <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                         {msg.action && (
                           <div className="flex items-center gap-3 mb-2">
                             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded">
                               <span className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse" />
                               <span className="text-[8px] font-mono font-black text-indigo-400 uppercase tracking-widest">{msg.action}</span>
                             </div>
                             <span className="text-[8px] font-mono text-zinc-600 uppercase italic">Priority: {msg.priority}</span>
                           </div>
                         )}
                         <div className={`p-6 rounded-[2rem] ${msg.role === 'user' ? 'bg-indigo-500 text-black font-bold' : 'bg-white/[0.03] border border-white/5 text-zinc-300'}`}>
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
                    <div className="flex gap-6">
                       <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                          <RefreshCw size={18} className="text-indigo-400 animate-spin" />
                       </div>
                       <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-zinc-600 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] font-black italic">
                          Synchronizing Workforce synergy...
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
                      placeholder="INITIATE OPERATIONAL SYNERGY..."
                      className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 pr-20 text-sm focus:outline-none focus:border-indigo-500/40 transition-all font-mono tracking-widest uppercase placeholder:text-zinc-800"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-3 top-3 bottom-3 aspect-square bg-indigo-500 text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-neon disabled:opacity-30"
                    >
                      <Send size={18} />
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* Right Col: Enterprise Operational Console */}
        <section className="lg:col-span-4 flex flex-col h-[calc(100vh-140px)]">
           <div className="flex-1 rounded-[3rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 glass flex flex-col overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 bg-black/40">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h3 className="text-sm font-display font-medium uppercase tracking-[0.2em] italic text-indigo-400">Synergy Console</h3>
                       <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Human-AI Hybrid Force Command</p>
                    </div>
                    <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                       <Network size={18} className="text-indigo-400" />
                    </div>
                 </div>

                 {/* Tab Navigation */}
                 <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'collaboration', label: 'Collab', icon: <Handshake size={12} /> },
                      { id: 'productivity', label: 'Productivity', icon: <TrendingUp size={12} /> },
                      { id: 'escalation', label: 'Escalation', icon: <ArrowUpRight size={12} /> },
                      { id: 'decision', label: 'Decision', icon: <BrainCircuit size={12} /> },
                      { id: 'workforce', label: 'Workforce', icon: <Users size={12} /> },
                      { id: 'governance', label: 'Governance', icon: <ShieldCheck size={12} /> },
                      { id: 'admin', label: 'Admin', icon: <Settings size={12} /> },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-3 py-2 rounded-xl text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                          activeTab === tab.id 
                            ? 'bg-indigo-500 text-black shadow-neon scale-105' 
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
                     {activeTab === 'collaboration' && (
                       <div className="space-y-8">
                          <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Workflow Synchronization</h4>
                          <div className="h-64 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <ReLineChart data={PRODUCTIVITY_DATA}>
                                   <XAxis dataKey="day" tick={{ fill: '#666', fontSize: 8, fontWeight: 900 }} />
                                   <YAxis hide />
                                   <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px' }} />
                                   <Line type="monotone" dataKey="ai" stroke="#818cf8" strokeWidth={2} dot={false} />
                                   <Line type="monotone" dataKey="human" stroke="#fb7185" strokeWidth={2} dot={false} />
                                   <Line type="monotone" dataKey="synergy" stroke="#10b981" strokeWidth={4} dot={{ r: 4 }} />
                                </ReLineChart>
                             </ResponsiveContainer>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Synergy Gain</p>
                                <p className="text-xl font-bold text-white italic">+42.6%</p>
                             </div>
                             <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Collab Score</p>
                                <p className="text-xl font-bold text-indigo-400 italic">MAX_RANK</p>
                             </div>
                          </div>
                       </div>
                     )}

                     {activeTab === 'productivity' && (
                        <div className="space-y-8">
                           <div className="p-8 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/10 flex flex-col items-center text-center gap-6">
                              <TrendingUp className="text-indigo-400" size={48} />
                              <div>
                                 <h4 className="text-lg font-display italic text-white mb-2">Enterprise Efficiency</h4>
                                 <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-loose">
                                    Strategic productivity optimization active. Orchestrating AI and human workflows to accelerate operational execution and output quality.
                                 </p>
                              </div>
                           </div>
                           <div className="grid grid-cols-1 gap-3">
                              {[
                                 { label: 'Execution Speed', val: 'ASCENDING' },
                                 { label: 'Productivity IQ', val: '99.2%' },
                                 { label: 'Workforce Sync', status: 'STABLE' },
                              ].map((m, i) => (
                                 <div key={i} className="flex justify-between items-center p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{m.label}</span>
                                    <span className="text-indigo-400 font-bold text-[10px]">{m.val || m.status}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {activeTab === 'escalation' && (
                       <div className="space-y-8">
                          <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Smart Routing Metrics</h4>
                          <div className="h-64 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                   { subject: 'Speed', A: 100, fullMark: 100 },
                                   { subject: 'Accuracy', A: 96, fullMark: 100 },
                                   { subject: 'Context', A: 98, fullMark: 100 },
                                   { subject: 'Resolution', A: 92, fullMark: 100 },
                                   { subject: 'Priority', A: 100, fullMark: 100 },
                                 ]}>
                                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 8, fontWeight: 900 }} />
                                    <Radar name="Strategy" dataKey="A" stroke="#818cf8" fill="#818cf8" fillOpacity={0.2} />
                                 </RadarChart>
                             </ResponsiveContainer>
                          </div>
                          <div className="space-y-4">
                             {[
                                { l: 'Escalation Node', v: 'ACTIVE', s: 'CORE' },
                                { l: 'Routing Precision', v: '99%', s: 'PEAK' },
                                { l: 'Wait Latency', v: '<0.1s', s: 'OPTIMAL' },
                             ].map((m, i) => (
                                <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/5 transition-all">
                                   <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">{m.l}</span>
                                   <span className="text-sm font-bold text-white">{m.v}</span>
                                </div>
                             ))}
                          </div>
                       </div>
                     )}

                     {activeTab === 'decision' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Decision Support IQ</h4>
                           <div className="space-y-4">
                              {[
                                 { label: 'Strategic Alignment', rate: 98 },
                                 { label: 'Forecast Accuracy', rate: 94 },
                                 { label: 'Contextual Depth', rate: 97 },
                                 { label: 'Recommendation Score', rate: 91 },
                              ].map((r, i) => (
                                <div key={i} className="space-y-2">
                                  <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest">
                                    <span className="text-zinc-400">{r.label}</span>
                                    <span className="text-indigo-400">{r.rate}%</span>
                                  </div>
                                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      whileInView={{ width: `${r.rate}%` }}
                                      className="h-full bg-indigo-500 shadow-neon"
                                    />
                                  </div>
                                </div>
                              ))}
                           </div>
                           <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                              <p className="text-[9px] font-mono text-zinc-500 uppercase mb-2">Strategic Insight Flow</p>
                              <p className="text-3xl font-display text-white italic">PEAK_VISIBILITY</p>
                           </div>
                        </div>
                     )}

                     {activeTab === 'workforce' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Load Balancing Matrix</h4>
                           <div className="h-64 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                 <PieChart>
                                    <Pie
                                      data={COLLABORATION_RATIO}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={60}
                                      outerRadius={80}
                                      paddingAngle={5}
                                      dataKey="value"
                                    >
                                      {COLLABORATION_RATIO.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px' }} />
                                    <Legend />
                                 </PieChart>
                              </ResponsiveContainer>
                           </div>
                           <div className="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-indigo-500/10 transition-all">
                              <Users className="text-indigo-400 group-hover:scale-110 transition-transform" />
                              <p className="text-[10px] font-mono text-zinc-400 italic">Workforce nodes optimized for <span className="text-white font-bold">Hybrid Human-AI Equilibrium</span>.</p>
                           </div>
                        </div>
                     )}

                     {activeTab === 'governance' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Operational Oversight</h4>
                           <div className="space-y-4">
                              {[
                                 { label: 'Ethical Guardrails', status: 'LOCKED', color: 'bg-emerald-500' },
                                 { label: 'Human Approval Flow', status: 'ACTIVE', color: 'bg-indigo-500' },
                                 { label: 'Strategic Control', status: 'VERIFIED', color: 'bg-primary' },
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
                        </div>
                     )}

                     {activeTab === 'admin' && (
                        <div className="space-y-4">
                           {[
                              "Configure Collaboration Workflows",
                              "Edit Escalation Reasoning Models",
                              "Manage Human Oversight Policies",
                              "Configure Productivity IQ Metrics",
                              "Adjust Workforce Distribution Rules",
                              "Audit Collaboration Synergy Performance"
                           ].map((btn, i) => (
                              <button key={i} className="w-full p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/10 hover:border-indigo-500/40 transition-all group">
                                 <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">{btn}</span>
                                 <ChevronRight size={14} className="text-zinc-600 group-hover:text-indigo-400" />
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
        <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-indigo-500/5 rounded-full blur-[240px]" />
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[200px]" />
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>
    </div>
  );
}
