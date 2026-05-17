
import { motion, AnimatePresence } from "motion/react";
import { 
  Workflow, 
  Cpu, 
  Settings, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Activity, 
  Target, 
  Zap, 
  Layers, 
  ArrowLeft,
  Bot,
  User,
  Send,
  RefreshCw,
  Search,
  MessageSquare,
  BarChart3,
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
  PieChart as PieChartIcon
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Trademark } from "./Trademark";
import { askMultiAgent } from "../services/multiAgentService";
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

// Mock Data for Orchestration Analytics
const ROUTING_STATS = [
  { name: 'Sales AI', value: 35, color: '#22d3ee' },
  { name: 'Support AI', value: 25, color: '#818cf8' },
  { name: 'Knowledge AI', value: 20, color: '#34d399' },
  { name: 'Qualific. AI', value: 15, color: '#facc15' },
  { name: 'Conv. Opt.', value: 5, color: '#f87171' },
];

const COLLABORATION_TREND = [
  { time: '00:00', switches: 12, continuity: 98 },
  { time: '04:00', switches: 8, continuity: 99 },
  { time: '08:00', switches: 45, continuity: 97 },
  { time: '12:00', switches: 110, continuity: 98 },
  { time: '16:00', switches: 160, continuity: 96 },
  { time: '20:00', switches: 75, continuity: 98 },
];

export function MultiAgentAI({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, agent?: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab ] = useState<'overview' | 'routing' | 'perf' | 'collab' | 'conversion' | 'admin'>('overview');
  const [activeAgent, setActiveAgent] = useState('AI Orchestration Layer');
  const [selectedAdminAction, setSelectedAdminAction] = useState<string | null>(null);
  const [agentSettings, setAgentSettings] = useState({
    salesEnabled: true,
    supportEnabled: true,
    knowledgeEnabled: true,
    leadEnabled: true,
    convEnabled: true,
    routingRules: 'contextual_semantic',
    concurrencyLimit: 250,
    temperature: 0.7,
    knowledgeBaseInput: 'Infinite Potential Digital Marketing Pvt. Ltd. (IPDM) brand parameters, services, and FAQ.',
    leadThreshold: 75,
    escalationEmail: 'escalation@ipdm-engage.com'
  });
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
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

      // Simulate Agent Routing
      const routedAgent = userMsg.toLowerCase().includes('price') ? 'Sales AI' :
                         userMsg.toLowerCase().includes('help') ? 'Support AI' :
                         userMsg.toLowerCase().includes('how') ? 'Knowledge AI' : 'Orchestration Layer';
      
      setActiveAgent(routedAgent);
      
      const responseText = await askMultiAgent(userMsg, geminiHistory);
      setMessages(prev => [...prev, { role: 'assistant', content: responseText, agent: routedAgent }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM FAILURE: Multi-agent coordination lost. Reconnecting orchestration layer...", agent: 'System' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col font-sans">
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
              <Trademark text="IPDM ENGAGE™ Multi-Agent AI Orchestration Console" />
            </h1>
            <span className="text-[12px] font-mono text-primary font-bold uppercase tracking-wider">Coordinated AI Orchestration Framework</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
            <div className="hidden lg:flex gap-8 items-center border-l border-white/5 pl-8">
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Agents Online</p>
                  <p className="text-[10px] font-bold text-primary tracking-widest">06_ACTIVE</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Collaborative Load</p>
                  <p className="text-[10px] font-bold text-emerald-500">14.2%</p>
               </div>
            </div>
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-mono font-black text-primary uppercase tracking-widest">Orchestrator Stable</span>
               </div>
            </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        
        {/* Left Side: Agent Ecosystem */}
        <aside className="lg:col-span-3 space-y-6 flex flex-col overflow-y-auto pr-2 custom-scrollbar-thin">
           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass">
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <Users size={14} className="text-primary" /> Active Agents
              </h2>
              <div className="space-y-3">
                 {[
                    { id: 'orchestrator', name: 'AI Orchestration Layer', icon: <Navigation size={14} />, status: 'Master' },
                    { id: 'sales', name: 'Sales AI Agent', icon: <TrendingUp size={14} />, status: 'Idle' },
                    { id: 'support', name: 'Support AI Agent', icon: <MessageSquare size={14} />, status: 'Active' },
                    { id: 'knowledge', name: 'Knowledge AI Agent', icon: <Database size={14} />, status: 'Idle' },
                    { id: 'lead', name: 'Lead Qual Agent', icon: <Target size={14} />, status: 'Monitoring' },
                    { id: 'conv', name: 'Conv Optimization', icon: <Zap size={14} />, status: 'Shadow' },
                 ].map((agent) => (
                    <div 
                      key={agent.id}
                      className={`p-4 rounded-2xl border transition-all cursor-default group ${
                        activeAgent === agent.name 
                        ? 'bg-primary/10 border-primary/40' 
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                      }`}
                    >
                       <div className="flex items-center justify-between mb-2">
                          <div className={`p-2 rounded-lg ${activeAgent === agent.name ? 'bg-primary text-black' : 'bg-zinc-900 text-zinc-500 group-hover:text-white'}`}>
                             {agent.icon}
                          </div>
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${
                            agent.status === 'Active' || agent.status === 'Master' ? 'text-primary' : 'text-zinc-600'
                          }`}>{agent.status}</span>
                       </div>
                       <p className="text-[11px] font-bold uppercase tracking-tight text-white">{agent.name}</p>
                    </div>
                 ))}
              </div>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass flex-1">
              <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
                <Workflow size={14} className="text-primary" /> Multi-Agent Workflow
              </h2>
              <div className="space-y-6 relative">
                 <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-white/5" />
                 {[
                    { label: 'Intent Detection', sub: 'Routing Engine' },
                    { label: 'Agent Selection', sub: 'Orchestration Layer' },
                    { label: 'Specialized Task', sub: 'Selected Agent' },
                    { label: 'Cross-Agent Sync', sub: 'Collaboration Framework' },
                    { label: 'Response Delivery', sub: 'Continuity System' }
                 ].map((step, i) => (
                    <div key={i} className="relative pl-10">
                       <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-[10px] font-mono font-bold text-zinc-600 group-hover:text-primary transition-colors">
                          0{i+1}
                       </div>
                       <div>
                          <p className="text-xs font-bold text-white uppercase tracking-tight">{step.label}</p>
                          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{step.sub}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </aside>

        {/* Center: AI Interaction Console */}
        <section className="lg:col-span-5 flex flex-col gap-6 h-[calc(100vh-140px)]">
           <div className="flex-1 flex flex-col rounded-[3rem] bg-white/[0.01] border border-white/5 relative overflow-hidden glass shadow-2xl">
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                       <Workflow className="text-primary" size={20} />
                    </div>
                    <div>
                       <span className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-primary">Multi-Agent AI Bridge</span>
                       <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Active Orchestration</p>
                    </div>
                 </div>
                 <div className="hidden sm:block text-right">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase">Routing Status</p>
                    <p className="text-[10px] font-bold text-primary italic">DYNAMIC_SELECT_ENABLED</p>
                 </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar-thin">
                 {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-10 py-10">
                       <div className="relative">
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                            className="w-32 h-32 border-2 border-primary/10 border-dashed rounded-full flex items-center justify-center"
                          >
                             <div className="w-24 h-24 bg-primary/5 rounded-full border border-primary/20 flex items-center justify-center">
                                <Cpu className="w-10 h-10 text-primary opacity-40" />
                             </div>
                          </motion.div>
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-4 h-4 bg-primary rounded-full animate-ping" />
                          </div>
                       </div>
                       <div className="space-y-4">
                          <h2 className="text-3xl font-display font-medium italic tracking-tight text-white">System Initialization</h2>
                          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] max-w-sm mx-auto leading-loose italic">
                             Multi-agent intelligent business infrastructure. 
                             Scale your AI workforce through coordinated orchestration.
                          </p>
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                        {[
                          "What are your pricing options?",
                          "How does the system work technically?",
                          "I need help setting this up.",
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
                          <div className="w-10 h-10 bg-zinc-900 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/10">
                             <Bot size={18} className="text-primary" />
                          </div>
                          <div className="w-[2px] flex-1 bg-white/5" />
                        </div>
                      )}
                      <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                         {msg.agent && (
                           <span className="text-[9px] font-mono font-black uppercase tracking-widest text-primary mb-2 block">{msg.agent}</span>
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
                          Routing to {activeAgent}...
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
                      placeholder="INITIATE MULTI-AGENT COORDINATION..."
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

        {/* Right Side: Multi-Agent Orchestration Console */}
        <section className="lg:col-span-4 flex flex-col h-[calc(100vh-140px)]">
           <div className="flex-1 rounded-[3rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 glass flex flex-col overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 bg-black/40">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h3 className="text-sm font-display font-medium uppercase tracking-[0.2em] italic text-primary">Orchestration Console</h3>
                       <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">Managed AI Architecture</p>
                    </div>
                    <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                       <Activity className="text-emerald-500" size={18} />
                    </div>
                 </div>

                 {/* Tab Navigation */}
                 <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'overview', label: 'AI Agent Overview', icon: <PieChartIcon size={12} /> },
                      { id: 'routing', label: 'Routing Analytics', icon: <Navigation size={12} /> },
                      { id: 'perf', label: 'Agent Performance Metrics', icon: <Cpu size={12} /> },
                      { id: 'collab', label: 'Collaboration Analytics', icon: <Share2 size={12} /> },
                      { id: 'conversion', label: 'Conversion Intelligence', icon: <Target size={12} /> },
                      { id: 'admin', label: 'Admin Control Center', icon: <Settings size={12} /> },
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
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'overview' && (
                      <div className="space-y-8">
                         <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-primary/40 transition-all">
                               <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Active AI agents</p>
                               <p className="text-3xl font-display italic text-white">06</p>
                            </div>
                            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-primary/40 transition-all">
                               <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1">AI workload distribution</p>
                               <p className="text-3xl font-display italic text-primary">14.2%</p>
                            </div>
                         </div>

                         <div className="space-y-4">
                            <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Agent usage distribution</h4>
                            <div className="h-40 w-full">
                               <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                     <Pie
                                        data={ROUTING_STATS}
                                        innerRadius={48}
                                        outerRadius={64}
                                        paddingAngle={5}
                                        dataKey="value"
                                     >
                                        {ROUTING_STATS.map((entry, index) => (
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
                               {ROUTING_STATS.map(stat => (
                                 <div key={stat.name} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                                    <span className="text-[8px] font-mono text-zinc-500 uppercase truncate">{stat.name}</span>
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div className="space-y-4">
                            <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Real-time agent activity</h4>
                            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar-thin pr-1">
                               {[
                                  { agent: 'AI Orchestration Agent', action: 'Directing conversation state...', status: 'master' },
                                  { agent: 'Sales AI Agent', action: 'Idle - ready for pricing queries', status: 'idle' },
                                  { agent: 'Support AI Agent', action: 'Analyzing client process queries', status: 'active' },
                                  { agent: 'Knowledge AI Agent', action: 'Indexing Corporate Assets Guidelines', status: 'idle' },
                                  { agent: 'Lead Qual Agent', action: 'Scoring active session behavior', status: 'active' },
                                  { agent: 'Conv Optimization', action: 'A/B testing CTA response elements', status: 'shadow' }
                               ].map((act, i) => (
                                  <div key={i} className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-between">
                                     <div className="truncate max-w-[80%]">
                                        <p className="text-[10px] font-bold text-white uppercase">{act.agent}</p>
                                        <p className="text-[9px] font-mono text-zinc-500 uppercase truncate">{act.action}</p>
                                     </div>
                                     <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                       act.status === 'active' || act.status === 'master' ? 'bg-primary animate-pulse' : 'bg-zinc-800'
                                     }`} />
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                    )}

                    {activeTab === 'routing' && (
                      <div className="space-y-8">
                        <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 space-y-4">
                           <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                              <span className="text-white italic">Routing Accuracy</span>
                              <span className="text-emerald-500 font-bold">99.8%</span>
                           </div>
                           <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                              <span className="text-white italic">Avg Switch Time</span>
                              <span className="text-primary font-bold">142ms</span>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Intent Routing Performance</h4>
                           <div className="space-y-3">
                              {[
                                 { intent: 'Pricing', agent: 'Sales AI', perf: 98 },
                                 { intent: 'Tech Spec', agent: 'Knowledge AI', perf: 96 },
                                 { intent: 'Setup Help', agent: 'Support AI', perf: 99 },
                                 { intent: 'Qualify', agent: 'Qual AI', perf: 94 },
                              ].map((r, i) => (
                                 <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center">
                                    <div>
                                       <p className="text-[9px] font-mono text-zinc-600 uppercase">{r.intent}</p>
                                       <p className="text-[10px] font-bold text-white uppercase">{r.agent}</p>
                                    </div>
                                    <div className="text-right">
                                       <p className="text-[10px] font-mono text-emerald-500 font-bold">{r.perf}%</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'perf' && (
                      <div className="space-y-8">
                         <div className="grid grid-cols-1 gap-4">
                            {[
                               { label: 'Response Quality', val: '9.4 / 10', icon: <ShieldCheck size={14} /> },
                               { label: 'Success Rate', val: '98.2%', icon: <Zap size={14} /> },
                               { label: 'Completion Rate', val: '94.5%', icon: <Target size={14} /> },
                               { label: 'Avg Efficiency', val: '96.8%', icon: <Activity size={14} /> },
                            ].map((m, i) => (
                               <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group hover:border-primary/40 transition-all">
                                  <div className="flex items-center gap-4">
                                     <div className="p-2 rounded-lg bg-zinc-900 text-zinc-500 group-hover:text-primary transition-colors">
                                        {m.icon}
                                     </div>
                                     <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{m.label}</span>
                                  </div>
                                  <span className="text-sm font-display italic text-white">{m.val}</span>
                               </div>
                            ))}
                         </div>
                      </div>
                    )}

                    {activeTab === 'collab' && (
                       <div className="space-y-8">
                          <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 mb-6">
                             <p className="text-xs text-zinc-400 italic leading-relaxed">
                                Continuous session state transfer maintained across <span className="text-white">1,400+ switches</span> today with <span className="text-primary font-bold">98% continuity</span>.
                             </p>
                          </div>

                          <div className="h-48 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={COLLABORATION_TREND}>
                                   <defs>
                                      <linearGradient id="colorCollab" x1="0" y1="0" x2="0" y2="1">
                                         <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2}/>
                                         <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                                      </linearGradient>
                                   </defs>
                                   <XAxis dataKey="time" hide />
                                   <YAxis hide domain={[0, 200]} />
                                   <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                   <Area type="monotone" dataKey="switches" stroke="#818cf8" strokeWidth={3} fill="url(#colorCollab)" />
                                </AreaChart>
                             </ResponsiveContainer>
                          </div>
                          
                          <div className="space-y-4">
                             <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                                <span className="text-zinc-500 italic">Workflow Completion</span>
                                <span className="text-emerald-500 font-bold">96.4%</span>
                             </div>
                             <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                                <span className="text-zinc-500 italic">Context Shared Size</span>
                                <span className="text-white font-bold">12.4 KB</span>
                             </div>
                          </div>
                       </div>
                    )}

                    {activeTab === 'conversion' && (
                      <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                             <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Sales AI Conv</p>
                             <p className="text-2xl font-display text-primary">12.4%</p>
                          </div>
                          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                             <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">Qual Accuracy</p>
                             <p className="text-2xl font-display text-white">99.1%</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                           <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">Lead Prioritization</h4>
                           <div className="space-y-3">
                              {[
                                 { label: 'Hot Leads', val: '42', color: 'bg-primary' },
                                 { label: 'Warm Leads', val: '86', color: 'bg-emerald-500' },
                                 { label: 'Cold Leads', val: '120', color: 'bg-zinc-600' },
                              ].map((l, i) => (
                                 <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                    <span className="text-[10px] font-mono text-zinc-400 uppercase">{l.label}</span>
                                    <div className="flex items-center gap-4">
                                       <div className={`w-3 h-3 rounded-full ${l.color}`} />
                                       <span className="text-sm font-bold text-white">{l.val}</span>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'admin' && (
                       <div className="space-y-4">
                          {[
                             "Configure AI Agents",
                             "Edit Routing Logic",
                             "Orchestration Workflows",
                             "Modify AI Behaviors",
                             "Manage Knowledge Hub",
                             "Escalation Rules",
                             "Lead Scoring Logic"
                          ].map((action, i) => (
                             <button 
                                key={i}
                                className="w-full flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/5 hover:border-primary/40 transition-all group"
                             >
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">{action}</span>
                                <ChevronRight size={14} className="text-zinc-600 group-hover:text-primary transition-colors" />
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

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-indigo-500/5 rounded-full blur-[200px]" />
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>
    </div>
  );
}
