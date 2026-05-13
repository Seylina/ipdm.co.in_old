import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Activity, 
  BarChart3, 
  Settings, 
  ArrowLeft,
  Bot,
  User,
  Send,
  RefreshCw,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Cpu,
  TrendingUp,
  Workflow,
  Target,
  Sparkle,
  ChevronRight,
  Sparkles,
  Briefcase,
  Layers,
  ArrowUpRight,
  AlertTriangle,
  History,
  ShieldCheck,
  Scaling,
  Coins,
  Gem,
  Rocket,
  Compass,
  GanttChart,
  DollarSign,
  PieChart,
  BarChart,
  Search,
  Filter
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Trademark } from "./Trademark";
import { askRevenueEngine } from "../services/revenueService";
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
  PieChart as RePieChart,
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
const REVENUE_FORECAST = [
  { era: 'Q1', revenue: 120, target: 100 },
  { era: 'Q2', revenue: 165, target: 140 },
  { era: 'Q3', revenue: 210, target: 180 },
  { era: 'Q4', revenue: 290, target: 240 },
  { era: 'Q1(P)', revenue: 380, target: 310 },
  { era: 'Q2(P)', revenue: 450, target: 380 },
];

const OPPORTUNITY_DISTRIBUTION = [
  { name: 'High Value', value: 45 },
  { name: 'Mid Tier', value: 35 },
  { name: 'Enterprise', value: 20 },
];

const COLORS = ['#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'];

export function RevenueGrowthAI({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, status?: string, impact?: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'forecasting' | 'conversion' | 'opportunity' | 'pipeline' | 'value' | 'growth' | 'admin'>('forecasting');
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
      
      const responseText = await askRevenueEngine(userMsg, geminiHistory);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: responseText,
        status: "OPPORTUNITY_DETECTED",
        impact: "HIGH_GROWTH_POTENTIAL"
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM FAILURE: Revenue node saturated. Re-calibrating growth projections." }]);
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
              <Trademark text="IPDM Revenue AI" />
            </h1>
            <span className="text-[12px] font-mono text-amber-500 font-bold uppercase tracking-wider">Predictive Revenue Growth & Conversion Intelligence</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
            <div className="hidden lg:flex gap-8 items-center border-l border-white/5 pl-8">
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Growth Index</p>
                  <p className="text-[10px] font-bold text-amber-500 tracking-widest">RANK_EXPONENTIAL</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Conversion Health</p>
                  <p className="text-[10px] font-bold text-emerald-500">MAX_YIELD</p>
               </div>
            </div>
            <div className="px-6 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-neon" />
                  <span className="text-[10px] font-mono font-black text-amber-500 uppercase tracking-widest">Growth Engine Active</span>
               </div>
            </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        
        {/* Left Side: Revenue Vectors */}
        <aside className="lg:col-span-3 space-y-6 flex flex-col overflow-y-auto pr-2 custom-scrollbar-thin">
           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass shadow-2xl">
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <Coins size={14} className="text-amber-500" /> Revenue Vectors
              </h2>
              <div className="space-y-4">
                 {[
                    { label: 'Forecast Accuracy', status: '99.4%', icon: <Target size={12} /> },
                    { label: 'Conversion Lift', status: '+34%', icon: <TrendingUp size={12} /> },
                    { label: 'Pipeline Velocity', status: 'PEAK', icon: <Rocket size={12} /> },
                    { label: 'Profitability IQ', status: 'MAX', icon: <Gem size={12} /> },
                    { label: 'Risk Mitigation', status: 'STABLE', icon: <ShieldCheck size={12} /> },
                 ].map((mod, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-amber-500/40 transition-all">
                       <div className="flex items-center gap-3">
                          <div className="text-zinc-500 group-hover:text-amber-500 transition-colors">{mod.icon}</div>
                          <span className="text-[10px] font-bold text-white uppercase tracking-tight">{mod.label}</span>
                       </div>
                       <span className="text-[8px] font-mono text-amber-500 uppercase tracking-widest">{mod.status}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass flex-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <Activity size={14} className="text-amber-500" /> Market Resonance
              </h2>
              <div className="space-y-6">
                 {[
                    { l: 'Revenue Synthesis', v: 'ACTIVE' },
                    { l: 'Opportunity Flow', v: '98.2%' },
                    { l: 'Forecast Latency', v: '<1ms' },
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
                 <div className="h-32 w-full bg-amber-500/[0.02] rounded-3xl border border-white/5 flex items-center justify-center relative">
                    <Sparkles className="text-amber-500/10 w-16 h-16 animate-pulse" />
                    <div className="absolute inset-0 bg-white/5 animate-pulse rounded-3xl" />
                 </div>
              </div>
           </div>
        </aside>

        {/* Center: Intelligence Console */}
        <section className="lg:col-span-5 flex flex-col gap-6 h-[calc(100vh-140px)]">
           <div className="flex-1 flex flex-col rounded-[3rem] bg-white/[0.01] border border-white/5 relative overflow-hidden glass shadow-2xl">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20">
                       <DollarSign className="text-amber-500" size={20} />
                    </div>
                    <div>
                       <span className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-amber-500">Revenue Bridge</span>
                       <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Growth Intelligence Nodes Active</p>
                    </div>
                 </div>
                 <div className="hidden sm:block text-right">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase">Growth Potency Score</p>
                    <p className="text-[10px] font-bold text-amber-500 italic">RANK_REVENUE_PRIME</p>
                 </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar-thin">
                 {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-12 py-10">
                       <div className="relative">
                          <div className="w-32 h-32 bg-amber-500/5 rounded-[2.5rem] flex items-center justify-center border border-amber-500/20 rotate-12 transition-transform hover:rotate-0 duration-500">
                             <TrendingUp size={48} className="text-amber-500" />
                          </div>
                          <div className="absolute inset-0 bg-amber-500/10 rounded-[2.5rem] blur-2xl -z-10 animate-pulse" />
                       </div>
                       <div className="space-y-4">
                          <h2 className="text-3xl font-display font-medium italic tracking-tight text-white">Revenue Intelligence Node</h2>
                          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] max-w-sm mx-auto leading-loose italic">
                             AI-driven revenue and conversion infrastructure. 
                             Analysing behavioral sales patterns to forecast growth trends, prioritize high-value opportunities, and optimize operational profitability.
                          </p>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                        {[
                          "Forecast my revenue growth for the next quarter.",
                          "Identify high-value sales opportunities.",
                          "Optimize conversion workflows for the main funnel.",
                          "Analyze sales pipeline velocity and bottlenecks."
                        ].map(q => (
                          <button 
                            key={q}
                            onClick={() => setInput(q)}
                            className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-white hover:border-amber-500/40 text-left transition-all backdrop-blur-xl"
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
                             <Bot size={18} className="text-amber-500" />
                          </div>
                          <div className="w-[1px] flex-1 bg-white/5" />
                        </div>
                      )}
                      <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                         {msg.status && (
                           <div className="flex items-center gap-3 mb-2">
                             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded">
                               <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                               <span className="text-[8px] font-mono font-black text-amber-500 uppercase tracking-widest">{msg.status}</span>
                             </div>
                             <span className="text-[8px] font-mono text-zinc-600 uppercase italic">Impact: {msg.impact}</span>
                           </div>
                         )}
                         <div className={`p-6 rounded-[2rem] ${msg.role === 'user' ? 'bg-amber-500 text-black font-bold' : 'bg-white/[0.03] border border-white/5 text-zinc-300'}`}>
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
                       <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20">
                          <RefreshCw size={18} className="text-amber-500 animate-spin" />
                       </div>
                       <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-zinc-600 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] font-black italic">
                          Projecting Growth Flux...
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
                      placeholder="INITIATE GROWTH STRATEGY..."
                      className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-6 pr-20 text-sm focus:outline-none focus:border-amber-500/40 transition-all font-mono tracking-widest uppercase placeholder:text-zinc-800"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-3 top-3 bottom-3 aspect-square bg-amber-500 text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-neon disabled:opacity-30"
                    >
                      <Send size={18} />
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* Right Col: Growth Command Hub */}
        <section className="lg:col-span-4 flex flex-col h-[calc(100vh-140px)]">
           <div className="flex-1 rounded-[3rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 glass flex flex-col overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 bg-black/40">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h3 className="text-sm font-display font-medium uppercase tracking-[0.2em] italic text-amber-500">Growth Console</h3>
                       <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Predictive Revenue & Conversion Command</p>
                    </div>
                    <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                       <Briefcase size={18} className="text-amber-500" />
                    </div>
                 </div>

                 {/* Tab Navigation */}
                 <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'forecasting', label: 'Forecasting', icon: <LineChartIcon size={12} /> },
                      { id: 'conversion', label: 'Conversion', icon: <Target size={12} /> },
                      { id: 'opportunity', label: 'Opportunity', icon: <Search size={12} /> },
                      { id: 'pipeline', label: 'Pipeline', icon: <GanttChart size={12} /> },
                      { id: 'value', label: 'Value', icon: <Gem size={12} /> },
                      { id: 'growth', label: 'Growth', icon: <TrendingUp size={12} /> },
                      { id: 'admin', label: 'Admin', icon: <Settings size={12} /> },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-3 py-2 rounded-xl text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                          activeTab === tab.id 
                            ? 'bg-amber-500 text-black shadow-neon scale-105' 
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
                     {activeTab === 'forecasting' && (
                       <div className="space-y-8">
                          <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Revenue Trajectory</h4>
                          <div className="h-64 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={REVENUE_FORECAST}>
                                   <XAxis dataKey="era" tick={{ fill: '#666', fontSize: 8, fontWeight: 900 }} />
                                   <YAxis hide />
                                   <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px' }} />
                                   <Area type="monotone" dataKey="revenue" fill="#fbbf24" fillOpacity={0.1} stroke="#fbbf24" strokeWidth={3} />
                                   <Line type="monotone" dataKey="target" stroke="#666" strokeDasharray="5 5" strokeWidth={1} dot={false} />
                                </ComposedChart>
                             </ResponsiveContainer>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Forecast Accuracy</p>
                                <p className="text-xl font-bold text-white italic">98.4%</p>
                             </div>
                             <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Growth Surge</p>
                                <p className="text-xl font-bold text-amber-500 italic">+22.6%</p>
                             </div>
                          </div>
                       </div>
                     )}

                     {activeTab === 'conversion' && (
                        <div className="space-y-8">
                           <div className="p-8 rounded-[3rem] bg-amber-500/5 border border-amber-500/10 flex flex-col items-center text-center gap-6">
                              <Target className="text-amber-500" size={48} />
                              <div>
                                 <h4 className="text-lg font-display italic text-white mb-2">Conversion IQ</h4>
                                 <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-loose">
                                    Predictive conversion analytics active. Forecasting probability scores for all high-intent engagement pathways to optimize yield.
                                 </p>
                              </div>
                           </div>
                           <div className="grid grid-cols-1 gap-3">
                              {[
                                 { label: 'Yield Stability', val: 'PEAK' },
                                 { label: 'Conversion Depth', val: '94.2%' },
                                 { label: 'Pathway Sync', status: 'ACTIVE' },
                              ].map((m, i) => (
                                 <div key={i} className="flex justify-between items-center p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{m.label}</span>
                                    <span className="text-amber-500 font-bold text-[10px]">{m.val || m.status}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {activeTab === 'opportunity' && (
                       <div className="space-y-8">
                          <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Opportunity Density</h4>
                          <div className="h-64 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <RePieChart>
                                   <Pie
                                     data={OPPORTUNITY_DISTRIBUTION}
                                     cx="50%"
                                     cy="50%"
                                     innerRadius={60}
                                     outerRadius={80}
                                     paddingAngle={5}
                                     dataKey="value"
                                   >
                                     {OPPORTUNITY_DISTRIBUTION.map((entry, index) => (
                                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                     ))}
                                   </Pie>
                                   <Tooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px' }} />
                                   <Legend />
                                </RePieChart>
                             </ResponsiveContainer>
                          </div>
                          <div className="space-y-4">
                             {[
                                { l: 'High Value Detection', v: 'ACTIVE', s: 'CORE' },
                                { l: 'Scoring Precision', v: '99%', s: 'PEAK' },
                                { l: 'Strategy Alignment', v: 'S_RANK', s: 'MAX' },
                             ].map((m, i) => (
                                <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/5 transition-all">
                                   <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">{m.l}</span>
                                   <span className="text-sm font-bold text-white">{m.v}</span>
                                </div>
                             ))}
                          </div>
                       </div>
                     )}

                     {activeTab === 'pipeline' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Pipeline Acceleration</h4>
                           <div className="space-y-6">
                              {[
                                 { label: 'Sales Velocity', rate: 98 },
                                 { label: 'Bottle Neck Detection', rate: 94 },
                                 { label: 'Stage Progression', rate: 97 },
                                 { label: 'Revenue Probability', rate: 91 },
                              ].map((r, i) => (
                                <div key={i} className="space-y-2">
                                  <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest">
                                    <span className="text-zinc-400">{r.label}</span>
                                    <span className="text-amber-500">{r.rate}%</span>
                                  </div>
                                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      whileInView={{ width: `${r.rate}%` }}
                                      className="h-full bg-amber-500 shadow-neon"
                                    />
                                  </div>
                                </div>
                              ))}
                           </div>
                           <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                              <p className="text-[9px] font-mono text-zinc-500 uppercase mb-2">Pipeline Health Index</p>
                              <p className="text-3xl font-display text-white italic">PEAK_FLOW</p>
                           </div>
                        </div>
                     )}

                     {activeTab === 'value' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">LTV Projections</h4>
                           <div className="space-y-4">
                              {[
                                 { label: 'Retention Guard', status: 'ACTIVE', color: 'bg-amber-500' },
                                 { label: 'Upsell Propensity', status: 'HIGH', color: 'bg-emerald-500' },
                                 { label: 'Customer Worth', status: 'MAX', color: 'bg-indigo-500' },
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
                           <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-amber-500/10 transition-all">
                              <Gem className="text-amber-500 group-hover:scale-110 transition-transform" />
                              <p className="text-[10px] font-mono text-zinc-400 italic">Lifecycle nodes optimized for <span className="text-white font-bold">Infinite Customer Value</span>.</p>
                           </div>
                        </div>
                     )}

                     {activeTab === 'growth' && (
                        <div className="space-y-8">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Strategic Growth Matrix</h4>
                           <div className="h-56 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                 <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                   { subject: 'Expansion', A: 95, fullMark: 100 },
                                   { subject: 'Forecasting', A: 98, fullMark: 100 },
                                   { subject: 'Yield', A: 96, fullMark: 100 },
                                   { subject: 'Velocity', A: 92, fullMark: 100 },
                                   { subject: 'Efficiency', A: 100, fullMark: 100 },
                                 ]}>
                                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 8, fontWeight: 900 }} />
                                    <Radar name="Strategy" dataKey="A" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.2} />
                                 </RadarChart>
                              </ResponsiveContainer>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                                 <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Growth Forecast</p>
                                 <p className="text-2xl font-display text-white">+42.6%</p>
                              </div>
                              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                                 <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Profitability IQ</p>
                                 <p className="text-2xl font-display text-amber-500">OPTIMAL</p>
                              </div>
                           </div>
                        </div>
                     )}

                     {activeTab === 'admin' && (
                        <div className="space-y-4">
                           {[
                              "Configure Forecasting Models",
                              "Edit Opportunity Scoring Logic",
                              "Manage Growth Workflows",
                              "Configure Revenue Optimization",
                              "Adjust Predictive Analytics",
                              "Audit Growth Performance Data"
                           ].map((btn, i) => (
                              <button key={i} className="w-full p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/10 hover:border-amber-500/40 transition-all group">
                                 <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">{btn}</span>
                                 <ChevronRight size={14} className="text-zinc-600 group-hover:text-amber-500" />
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
        <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-amber-500/5 rounded-full blur-[240px]" />
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px]" />
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>
    </div>
  );
}
