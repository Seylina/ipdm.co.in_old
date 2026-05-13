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
  Map,
  Heart,
  FastForward,
  Infinity as InfinityIcon,
  Repeat,
  Smile,
  Navigation
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Trademark } from "./Trademark";
import { askJourneyEngine } from "../services/journeyService";
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
const JOURNEY_VELOCITY = [
  { stage: 'Awareness', volume: 450, conversion: 65 },
  { stage: 'Discovery', volume: 380, conversion: 72 },
  { stage: 'Engagement', volume: 310, conversion: 78 },
  { stage: 'Convert', volume: 240, conversion: 85 },
  { stage: 'Retain', volume: 190, conversion: 92 },
  { stage: 'Advocate', volume: 150, conversion: 96 },
];

const EMOTIONAL_SENTIMENT = [
  { name: 'Confidence', value: 35 },
  { name: 'Curiosity', value: 30 },
  { name: 'Enthusiasm', value: 20 },
  { name: 'Hesitation', value: 15 },
];

const COLORS = ['#f472b6', '#34d399', '#fbbf24', '#818cf8', '#f87171', '#a78bfa'];

export function CustomerJourneyAI({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, status?: string, intent?: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'intelligence' | 'personalization' | 'emotional' | 'conversion' | 'lifecycle' | 'predictive' | 'admin'>('intelligence');
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
      
      const responseText = await askJourneyEngine(userMsg, geminiHistory);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responseText,
        status: "LIFECYCLE_OPTIMIZED",
        intent: "HYPER_PERSONALIZED"
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM FAILURE: Lifecycle node saturated. Re-calibrating customer pathways." }]);
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
              <Trademark text="IPDM Journey AI" />
            </h1>
            <span className="text-[12px] font-mono text-pink-500 font-bold uppercase tracking-wider">Hyper-Personalized Customer Journey Intelligence</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
            <div className="hidden lg:flex gap-8 items-center border-l border-white/5 pl-8">
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Relationship Index</p>
                  <p className="text-[10px] font-bold text-pink-500 tracking-widest">LOYALTY_PLATINUM</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Engagement Depth</p>
                  <p className="text-[10px] font-bold text-emerald-500">MAX_RESONANCE</p>
               </div>
            </div>
            <div className="px-6 py-2 bg-pink-500/10 border border-pink-500/20 rounded-xl">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-neon" />
                  <span className="text-[10px] font-mono font-black text-pink-500 uppercase tracking-widest">Real-Time Orchestration</span>
               </div>
            </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        
        {/* Left Side: Journey Vectors */}
        <aside className="lg:col-span-3 space-y-6 flex flex-col overflow-y-auto pr-2 custom-scrollbar-thin">
           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass shadow-2xl">
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <Navigation size={14} className="text-pink-500" /> Lifecycle Intelligence
              </h2>
              <div className="space-y-4">
                 {[
                    { label: 'Dynamic Mapping', status: 'SYNCHED', icon: <Map size={12} /> },
                    { label: 'Sentiment Pulse', status: 'ACTIVE', icon: <Heart size={12} /> },
                    { label: 'Intent Detection', status: 'DEEP', icon: <Target size={12} /> },
                    { label: 'Advocacy Loop', status: 'INFINITE', icon: <InfinityIcon size={12} /> },
                    { label: 'Retention Guard', status: 'ACTIVE', icon: <ShieldCheck size={12} /> },
                 ].map((mod, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-pink-500/40 transition-all">
                       <div className="flex items-center gap-3">
                          <div className="text-zinc-500 group-hover:text-pink-500 transition-colors">{mod.icon}</div>
                          <span className="text-[10px] font-bold text-white uppercase tracking-tight">{mod.label}</span>
                       </div>
                       <span className="text-[8px] font-mono text-pink-500 uppercase tracking-widest">{mod.status}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass flex-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <Activity size={14} className="text-pink-500" /> Engagement Flux
              </h2>
              <div className="space-y-6">
                 {[
                    { l: 'Journey Continuity', v: '99.8%' },
                    { l: 'Omnichannel Sync', v: 'ACTIVE' },
                    { l: 'Pathway Latency', v: '<0.5ms' },
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
                 <div className="h-32 w-full bg-pink-500/[0.02] rounded-3xl border border-white/5 flex items-center justify-center relative">
                    <Sparkles className="text-pink-500/10 w-16 h-16 animate-pulse" />
                    <div className="absolute inset-0 bg-white/5 animate-pulse rounded-3xl" />
                 </div>
              </div>
           </div>
        </aside>

        {/* Center: Journey Intelligence Console */}
        <section className="lg:col-span-5 flex flex-col gap-6 h-[calc(100vh-140px)]">
           <div className="flex-1 flex flex-col rounded-[3rem] bg-white/[0.01] border border-white/5 relative overflow-hidden glass shadow-2xl">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center border border-pink-500/20">
                       <Map className="text-pink-500" size={20} />
                    </div>
                    <div>
                       <span className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-pink-500">Journey Bridge</span>
                       <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Predictive Lifecycle Nodes Active</p>
                    </div>
                 </div>
                 <div className="hidden sm:block text-right">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase">Customer Evolution Score</p>
                    <p className="text-[10px] font-bold text-pink-500 italic">RANK_ADVOCATE_PRIME</p>
                 </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar-thin">
                 {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-12 py-10">
                       <div className="relative">
                          <div className="w-32 h-32 bg-pink-500/5 rounded-[2.5rem] flex items-center justify-center border border-pink-500/20 rotate-12 transition-transform hover:rotate-0 duration-500">
                             <Navigation size={48} className="text-pink-500" />
                          </div>
                          <div className="absolute inset-0 bg-pink-500/10 rounded-[2.5rem] blur-2xl -z-10 animate-pulse" />
                       </div>
                       <div className="space-y-4">
                          <h2 className="text-3xl font-display font-medium italic tracking-tight text-white">Journey Intelligence Node</h2>
                          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] max-w-sm mx-auto leading-loose italic">
                             AI-driven lifecycle orchestration infrastructure. 
                             Analysing behavioral clusters to create adaptive, predictive, and hyper-personalized customer journeys.
                          </p>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                        {[
                          "Predict my next lifecycle stage.",
                          "Optimize engagement for high-intent visitors.",
                          "Show journey bottlenecks across channels.",
                          "How is the emotional resonance today?"
                        ].map(q => (
                          <button 
                            key={q}
                            onClick={() => setInput(q)}
                            className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-white hover:border-pink-500/40 text-left transition-all backdrop-blur-xl"
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
                             <Bot size={18} className="text-pink-500" />
                          </div>
                          <div className="w-[1px] flex-1 bg-white/5" />
                        </div>
                      )}
                      <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                         {msg.status && (
                           <div className="flex items-center gap-3 mb-2">
                             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-pink-500/10 border border-pink-500/20 rounded">
                               <span className="w-1 h-1 rounded-full bg-pink-500 animate-pulse" />
                               <span className="text-[8px] font-mono font-black text-pink-500 uppercase tracking-widest">{msg.status}</span>
                             </div>
                             <span className="text-[8px] font-mono text-zinc-600 uppercase italic">Intent: {msg.intent}</span>
                           </div>
                         )}
                         <div className={`p-6 rounded-[2rem] ${msg.role === 'user' ? 'bg-pink-500 text-black font-bold' : 'bg-white/[0.03] border border-white/5 text-zinc-300'}`}>
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
                       <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center border border-pink-500/20">
                          <RefreshCw size={18} className="text-pink-500 animate-spin" />
                       </div>
                       <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-zinc-600 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] font-black italic">
                          Mapping Lifecycle Trajectory...
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
                      placeholder="OPTIMIZE JOURNEY EXPERIENCE..."
                      className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 pr-20 text-sm focus:outline-none focus:border-pink-500/40 transition-all font-mono tracking-widest uppercase placeholder:text-zinc-800"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-3 top-3 bottom-3 aspect-square bg-pink-500 text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-neon disabled:opacity-30"
                    >
                      <Send size={18} />
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* Right Col: Journey Optimization Hub */}
        <section className="lg:col-span-4 flex flex-col h-[calc(100vh-140px)]">
           <div className="flex-1 rounded-[3rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 glass flex flex-col overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 bg-black/40">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h3 className="text-sm font-display font-medium uppercase tracking-[0.2em] italic text-pink-500">Journey Intelligence</h3>
                       <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Lifecycle Orchestration & Command</p>
                    </div>
                    <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                       <Map size={18} className="text-pink-500" />
                    </div>
                 </div>

                 {/* Tab Navigation */}
                 <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'intelligence', label: 'Intelligence', icon: <Microscope size={12} /> },
                      { id: 'personalization', label: 'Personal', icon: <Users size={12} /> },
                      { id: 'emotional', label: 'Emotional', icon: <Smile size={12} /> },
                      { id: 'conversion', label: 'Conversion', icon: <Target size={12} /> },
                      { id: 'lifecycle', label: 'Lifecycle', icon: <Repeat size={12} /> },
                      { id: 'predictive', label: 'Prediction', icon: <TrendingUp size={12} /> },
                      { id: 'admin', label: 'Admin', icon: <Settings size={12} /> },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-3 py-2 rounded-xl text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                          activeTab === tab.id 
                            ? 'bg-pink-500 text-black shadow-neon scale-105' 
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
                     {activeTab === 'intelligence' && (
                       <div className="space-y-8">
                          <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Journey Velocity Matrix</h4>
                          <div className="h-64 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={JOURNEY_VELOCITY}>
                                   <XAxis dataKey="stage" tick={{ fill: '#666', fontSize: 8, fontWeight: 900 }} />
                                   <YAxis hide />
                                   <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px' }} />
                                   <Bar dataKey="volume" fill="#f472b6" radius={[10, 10, 0, 0]} opacity={0.3} />
                                   <Line type="monotone" dataKey="conversion" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                                </ComposedChart>
                             </ResponsiveContainer>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Completion Rate</p>
                                <p className="text-xl font-bold text-white italic">84.2%</p>
                             </div>
                             <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Continuity Index</p>
                                <p className="text-xl font-bold text-pink-500 italic">9.8/10</p>
                             </div>
                          </div>
                       </div>
                     )}

                     {activeTab === 'personalization' && (
                        <div className="space-y-8">
                           <div className="p-8 rounded-[3rem] bg-pink-500/5 border border-pink-500/10 flex flex-col items-center text-center gap-6">
                              <Users className="text-pink-500" size={48} />
                              <div>
                                 <h4 className="text-lg font-display italic text-white mb-2">Pathway Customization</h4>
                                 <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-loose">
                                    Individual customer engagement sequencing active. Adapting workflows based on intent depth and interaction history.
                                 </p>
                              </div>
                           </div>
                           <div className="grid grid-cols-1 gap-3">
                              {[
                                 { label: 'Adaptation Depth', val: 'MAX' },
                                 { label: 'Relevance Gain', val: '+42%' },
                                 { label: 'Pathway Sync', status: 'SYNCHED' },
                              ].map((m, i) => (
                                 <div key={i} className="flex justify-between items-center p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{m.label}</span>
                                    <span className="text-pink-500 font-bold text-[10px]">{m.val || m.status}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {activeTab === 'emotional' && (
                       <div className="space-y-8">
                          <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Sentiment Resonance</h4>
                          <div className="h-64 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                   <Pie
                                     data={EMOTIONAL_SENTIMENT}
                                     cx="50%"
                                     cy="50%"
                                     innerRadius={60}
                                     outerRadius={80}
                                     paddingAngle={5}
                                     dataKey="value"
                                   >
                                     {EMOTIONAL_SENTIMENT.map((entry, index) => (
                                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                     ))}
                                   </Pie>
                                   <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px' }} />
                                   <Legend />
                                </PieChart>
                             </ResponsiveContainer>
                          </div>
                          <div className="space-y-4">
                             {[
                                { l: 'Confidence Pulse', v: 'HIGH', s: 'STABLE' },
                                { l: 'Frustration Guard', v: 'INACTIVE', s: 'SAFE' },
                                { l: 'Engagement Mood', v: 'OPTIMISTIC', s: 'RISING' },
                             ].map((m, i) => (
                                <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/5 transition-all">
                                   <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">{m.l}</span>
                                   <span className="text-sm font-bold text-white">{m.v}</span>
                                </div>
                             ))}
                          </div>
                       </div>
                     )}

                     {activeTab === 'conversion' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Funnel Acceleration IQ</h4>
                           <div className="space-y-6">
                              {[
                                 { label: 'Pathway Precision', rate: 94 },
                                 { label: 'Friction Removal', rate: 89 },
                                 { label: 'Incentive Timing', rate: 97 },
                                 { label: 'Advocacy Trigger', rate: 82 },
                              ].map((r, i) => (
                                <div key={i} className="space-y-2">
                                  <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest">
                                    <span className="text-zinc-400">{r.label}</span>
                                    <span className="text-pink-500">{r.rate}%</span>
                                  </div>
                                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      whileInView={{ width: `${r.rate}%` }}
                                      className="h-full bg-pink-500 shadow-neon"
                                    />
                                  </div>
                                </div>
                              ))}
                           </div>
                           <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl text-center">
                              <p className="text-[9px] font-mono text-zinc-500 uppercase mb-2">Conversion Efficiency</p>
                              <p className="text-3xl font-display text-white italic">PEAK_FLOW</p>
                           </div>
                        </div>
                     )}

                     {activeTab === 'lifecycle' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Relationship Continuity</h4>
                           <div className="space-y-4">
                              {[
                                 { label: 'Retention Guard', status: 'ACTIVE', color: 'bg-emerald-500' },
                                 { label: 'Loyalty Cultivation', status: 'DEEP', color: 'bg-pink-500' },
                                 { label: 'LTV Optimization', status: 'PEAK', color: 'bg-indigo-500' },
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
                           <div className="p-6 bg-pink-500/5 border border-pink-500/20 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-pink-500/10 transition-all">
                              <InfinityIcon className="text-pink-500 group-hover:scale-110 transition-transform" />
                              <p className="text-[10px] font-mono text-zinc-400 italic">Lifecycle nodes focused on <span className="text-white font-bold">Infinite Customer Value</span>.</p>
                           </div>
                        </div>
                     )}

                     {activeTab === 'predictive' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Evolution Forecasting</h4>
                           <div className="h-56 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                 <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                   { subject: 'Progression', A: 95, fullMark: 100 },
                                   { subject: 'Sentiment', A: 88, fullMark: 100 },
                                   { subject: 'Churn Risk', A: 96, fullMark: 100 },
                                   { subject: 'Engagement', A: 92, fullMark: 100 },
                                   { subject: 'Advocacy', A: 85, fullMark: 100 },
                                 ]}>
                                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 8, fontWeight: 900 }} />
                                    <Radar name="Strategy" dataKey="A" stroke="#f472b6" fill="#f472b6" fillOpacity={0.2} />
                                 </RadarChart>
                              </ResponsiveContainer>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                                 <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Forecast Accuracy</p>
                                 <p className="text-2xl font-display text-white">96.4%</p>
                              </div>
                              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                                 <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Churn Reduction</p>
                                 <p className="text-2xl font-display text-emerald-500">-28.5%</p>
                              </div>
                           </div>
                        </div>
                     )}

                     {activeTab === 'admin' && (
                        <div className="space-y-4">
                           {[
                              "Configure Journey Orchestration Rules",
                              "Edit Lifecycle Workflow Models",
                              "Manage Personalization Ethics",
                              "Configure Predictive Sentiment Logic",
                              "Adjust Engagement Thresholds",
                              "Audit Journey Quality Performance"
                           ].map((btn, i) => (
                              <button key={i} className="w-full p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/10 hover:border-pink-500/40 transition-all group">
                                 <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">{btn}</span>
                                 <ChevronRight size={14} className="text-zinc-600 group-hover:text-pink-500" />
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
        <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-pink-500/5 rounded-full blur-[240px]" />
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[200px]" />
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>
    </div>
  );
}
