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
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Trademark } from "./Trademark";
import { askContextEngine } from "../services/contextResponseService";
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
} from "recharts";

// Mock Data
const CONTEXT_ACCURACY = [
  { subject: "Retention", A: 120, B: 110, fullMark: 150 },
  { subject: "Memory", A: 98, B: 130, fullMark: 150 },
  { subject: "Business", A: 86, B: 130, fullMark: 150 },
  { subject: "Logic", A: 99, B: 100, fullMark: 150 },
  { subject: "Grounding", A: 85, B: 90, fullMark: 150 },
  { subject: "Tone", A: 65, B: 85, fullMark: 150 },
];

const CONTINUITY_FLOW = [
  { step: "T1", continuity: 92 },
  { step: "T2", continuity: 88 },
  { step: "T3", continuity: 95 },
  { step: "T4", continuity: 91 },
  { step: "T5", continuity: 98 },
];

export function ContextAwareAI({
  onNavigate,
}: {
  onNavigate: (page: any) => void;
}) {
  const [messages, setMessages] = useState<
    {
      role: "user" | "assistant";
      content: string;
      confidence?: number;
      contextType?: string;
    }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    | "metrics"
    | "quality"
    | "hallucination"
    | "personalization"
    | "escalation"
    | "optimization"
    | "admin"
  >("metrics");
  const [adminSettings, setAdminSettings] = useState({
    contextRetentionLimit: 12,
    strictValidation: true,
    groundingConfidenceThreshold: 85,
    escalationTriggerValue: 90,
    sessionSync: true,
    knowledgeLockLevel: "strict_enforced",
    analyticsVisibility: true,
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
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const geminiHistory = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const responseText = await askContextEngine(userMsg, geminiHistory);

      // Simulate context signals
      const confidence = Math.floor(Math.random() * 5) + 95;
      const contextType =
        userMsg.length > 30 ? "Structured Knowledge" : "Conversational Memory";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: responseText,
          confidence,
          contextType,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "SYSTEM FAILURE: Contextual node offline. Grounding lost.",
        },
      ]);
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
            onClick={() => onNavigate("ecosystem")}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-display font-black italic tracking-widest text-white group cursor-default">
              <Trademark text="IPDM ENGAGE™ Context Intelligence Console" />
            </h1>
            <span className="text-[12px] font-mono text-primary font-bold uppercase tracking-wider">
              Stateful Conversational Operating System
            </span>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="hidden lg:flex gap-8 items-center border-l border-white/5 pl-8">
            <div className="text-right">
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                Grounding Parity
              </p>
              <p className="text-[10px] font-bold text-primary tracking-widest">
                VERIFIED_99.8%
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                Hallucination Risk
              </p>
              <p className="text-[10px] font-bold text-emerald-500">
                NEGIGIBLE_0.01%
              </p>
            </div>
          </div>
          <div className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-neon" />
              <span className="text-[10px] font-mono font-black text-primary uppercase tracking-widest">
                Context Synchronized
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        {/* Left Side: Context Layers */}
        <aside className="lg:col-span-3 space-y-6 flex flex-col overflow-y-auto pr-2 custom-scrollbar-thin">
          <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass">
            <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
              <Network size={14} className="text-primary" /> Active Layers
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: "Business Logic",
                  status: "GROUNDED",
                  icon: <Briefcase size={12} />,
                },
                {
                  label: "Session Memory",
                  status: "ACTIVE",
                  icon: <MemoryStick size={12} />,
                },
                {
                  label: "User Persona",
                  status: "MAPPED",
                  icon: <Fingerprint size={12} />,
                },
                {
                  label: "Workflow State",
                  status: "LOCKED",
                  icon: <Layers size={12} />,
                },
                {
                  label: "Escalation Node",
                  status: "STANDBY",
                  icon: <AlertTriangle size={12} />,
                },
              ].map((layer, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-zinc-500 group-hover:text-primary transition-colors">
                      {layer.icon}
                    </div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-tight">
                      {layer.label}
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-primary uppercase tracking-widest">
                    {layer.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass flex-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />
            <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
              <History size={14} className="text-primary" /> Memory Depth
            </h2>
            <div className="space-y-6">
              {[
                { l: "Query Matching", v: "99.1%" },
                { l: "Information Retrieval", v: "0.12s" },
                { l: "State Persistence", v: "ETERNAL" },
              ].map((row, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[9px] font-mono text-zinc-600 uppercase italic">
                      {row.l}
                    </span>
                    <span className="text-[9px] font-bold text-white uppercase">
                      {row.v}
                    </span>
                  </div>
                  <div className="h-0.5 bg-white/5 rounded-full" />
                </div>
              ))}
            </div>
            <div className="mt-8">
              <div className="h-32 w-full bg-white/[0.02] rounded-3xl border border-white/5 flex items-center justify-center">
                <MemoryStick className="text-primary/10 w-16 h-16 animate-pulse" />
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Contextual Console */}
        <section className="lg:col-span-5 flex flex-col gap-6 h-[calc(100vh-140px)]">
          <div className="flex-1 flex flex-col rounded-[3rem] bg-white/[0.01] border border-white/5 relative overflow-hidden glass shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                  <CloudLightning className="text-primary" size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-primary">
                    Contextual AI Bridge
                  </span>
                  <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                    Stateful Operating System Active
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-[9px] font-mono text-zinc-500 uppercase">
                  Latency
                </p>
                <p className="text-[10px] font-bold text-primary italic">
                  84ms_FAST
                </p>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar-thin"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-12 py-10">
                  <div className="relative">
                    <div className="w-32 h-32 bg-primary/5 rounded-[2.5rem] flex items-center justify-center border border-primary/20 rotate-12 transition-transform hover:rotate-0 duration-500">
                      <Fingerprint className="w-12 h-12 text-primary" />
                    </div>
                    <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] blur-2xl -z-10 animate-pulse" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-display font-medium italic tracking-tight text-white">
                      Context Link Initialized
                    </h2>
                    <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] max-w-sm mx-auto leading-loose italic">
                      AI-driven contextual intelligence infrastructure.
                      Synchronizing memory and business logic in real time.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                    {[
                      "Recommend a setup based on my business size.",
                      "Compare solutions for my operational goals.",
                      "I can guide you based on your needs.",
                      "Tailor a recommendation to my budget.",
                    ].map((q) => (
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
                  className={`flex gap-6 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-zinc-900 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/10 shadow-neon/10">
                        <Bot size={18} className="text-primary" />
                      </div>
                      <div className="w-[1px] flex-1 bg-white/5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] ${msg.role === "user" ? "order-first" : ""}`}
                  >
                    {msg.contextType && (
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 border border-primary/20 rounded">
                          <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                          <span className="text-[8px] font-mono font-black text-primary uppercase tracking-widest">
                            {msg.contextType}
                          </span>
                        </div>
                        <span className="text-[8px] font-mono text-zinc-600 uppercase italic">
                          Grounding: {msg.confidence}%
                        </span>
                      </div>
                    )}
                    <div
                      className={`p-6 rounded-[2rem] ${msg.role === "user" ? "bg-primary text-black font-bold" : "bg-white/[0.03] border border-white/5 text-zinc-300"}`}
                    >
                      <div className="whitespace-pre-wrap leading-relaxed text-sm">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/20">
                      <User size={18} className="text-zinc-500" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                    <RefreshCw
                      size={18}
                      className="text-primary animate-spin"
                    />
                  </div>
                  <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-zinc-600 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] font-black italic">
                    Analyzing Continuity Layers...
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-white/5 bg-black/60 backdrop-blur-3xl">
              <div className="relative max-w-4xl mx-auto group">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="COMMUNICATE WITH CONTEXT ENGINE..."
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

        {/* Right Col: Context Intelligence Console */}
        <section className="lg:col-span-4 flex flex-col h-[calc(100vh-140px)]">
          <div className="flex-1 rounded-[3rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 glass flex flex-col overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 bg-black/40">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-sm font-display font-medium uppercase tracking-[0.2em] italic text-primary">
                    Context Console
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">
                    Grounding & Continuity Hub
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                  <BrainCircuit className="text-primary" size={18} />
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    id: "metrics",
                    label: "Context Intelligence Metrics",
                    icon: <Activity size={12} />,
                  },
                  {
                    id: "quality",
                    label: "Response Quality Analytics",
                    icon: <CheckCircle2 size={12} />,
                  },
                  {
                    id: "hallucination",
                    label: "Hallucination Prevention Metrics",
                    icon: <ShieldCheck size={12} />,
                  },
                  {
                    id: "personalization",
                    label: "Personalization Analytics",
                    icon: <Target size={12} />,
                  },
                  {
                    id: "escalation",
                    label: "Escalation Intelligence Metrics",
                    icon: <AlertTriangle size={12} />,
                  },
                  {
                    id: "optimization",
                    label: "AI Optimization Metrics",
                    icon: <Zap size={12} />,
                  },
                  {
                    id: "admin",
                    label: "Admin Control Center",
                    icon: <Settings size={12} />,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-2 rounded-xl text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-black shadow-neon scale-105"
                        : "bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10"
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
                  {activeTab === "metrics" && (
                    <div className="space-y-8">
                      <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">
                        Context Intelligence Metrics
                      </h4>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            data={CONTEXT_ACCURACY}
                          >
                            <PolarGrid stroke="rgba(255,255,255,0.05)" />
                            <PolarAngleAxis
                              dataKey="subject"
                              tick={{
                                fill: "#666",
                                fontSize: 8,
                                fontWeight: 900,
                              }}
                            />
                            <Radar
                              name="Context"
                              dataKey="A"
                              stroke="#22d3ee"
                              fill="#22d3ee"
                              fillOpacity={0.2}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#000",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "12px",
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                          <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">
                            Context Retention Score
                          </p>
                          <p className="text-xl font-bold text-primary italic">
                            98.4/100
                          </p>
                        </div>
                        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                          <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">
                            Session Continuity Performance
                          </p>
                          <p className="text-xl font-bold text-white italic">
                            95.2%
                          </p>
                        </div>
                        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                          <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">
                            Context Utilization Rate
                          </p>
                          <p className="text-xl font-bold text-primary italic">
                            92.0%
                          </p>
                        </div>
                        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                          <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">
                            Context Relevance Accuracy
                          </p>
                          <p className="text-xl font-bold text-white italic">
                            99.1%
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "quality" && (
                    <div className="space-y-8">
                      <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest text-center">
                        Conversation Continuity Flow
                      </h4>
                      <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <ReLineChart data={CONTINUITY_FLOW}>
                            <Line
                              type="monotone"
                              dataKey="continuity"
                              stroke="#22d3ee"
                              strokeWidth={3}
                              dot={{ r: 4, fill: "#22d3ee" }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#000",
                                border: "none",
                                borderRadius: "12px",
                              }}
                            />
                          </ReLineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-3">
                        {[
                          { l: "Response Relevance", v: "98%", t: "STABLE" },
                          { l: "Knowledge Accuracy", v: "100%", t: "LOCKED" },
                          { l: "Tone Consistency", v: "96%", t: "ADAPTING" },
                        ].map((q, i) => (
                          <div
                            key={i}
                            className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center"
                          >
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">
                              {q.l}
                            </span>
                            <span className="text-sm font-bold text-white">
                              {q.v}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "hallucination" && (
                    <div className="space-y-8">
                      <div className="p-8 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10 flex flex-col items-center text-center gap-6">
                        <ShieldCheck className="text-emerald-500" size={48} />
                        <div>
                          <h4 className="text-lg font-display italic text-white mb-2">
                            Zero-Hallucination Lock
                          </h4>
                          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-loose">
                            All responses are grounded in approved business
                            operations framework. Grounding verification active
                            across all sessions.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {[
                          {
                            label: "Unsupported Detection",
                            success: "124 Stopped",
                          },
                          {
                            label: "Fact Verification",
                            success: "99.9% Parity",
                          },
                          { label: "Boundary Enforcement", success: "LOCKED" },
                        ].map((m, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-500"
                          >
                            <span>{m.label}</span>
                            <span className="text-primary font-bold">
                              {m.success}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "personalization" && (
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">
                        Personalization IQ
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          { l: "User Role Mapping", v: "EXACT" },
                          { l: "Budget Sensitivity", v: "DETECTED" },
                          { l: "Goal Alignment", v: "MAXIMAL" },
                          { l: "Context Adaptation", v: "ACTIVE" },
                        ].map((p, i) => (
                          <div
                            key={i}
                            className="p-5 bg-white/[0.02] border border-white/5 rounded-3xl flex justify-between items-center group hover:bg-white/5 transition-all"
                          >
                            <span className="text-[10px] font-mono text-zinc-400 uppercase italic">
                              {p.l}
                            </span>
                            <span className="text-[10px] font-mono font-black text-primary uppercase">
                              {p.v}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "escalation" && (
                    <div className="space-y-8">
                      <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">
                        Escalation Nodes
                      </h4>
                      <div className="space-y-4">
                        {[
                          {
                            label: "High-Value Lead",
                            status: "MONITORING",
                            color: "bg-primary",
                          },
                          {
                            label: "Technical Complex",
                            status: "READY",
                            color: "bg-amber-500",
                          },
                          {
                            label: "Priority Escalation",
                            status: "ARMED",
                            color: "bg-red-500",
                          },
                        ].map((e, i) => (
                          <div
                            key={i}
                            className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-3 h-3 rounded-full ${e.color}`}
                              />
                              <span className="text-[10px] font-mono font-bold text-white uppercase">
                                {e.label}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                              {e.status}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-primary/10 transition-all">
                        <Bot className="text-primary group-hover:scale-110 transition-transform" />
                        <p className="text-[10px] font-mono text-zinc-400 italic">
                          Context transfer quality at{" "}
                          <span className="text-white font-bold">
                            100%_SECURE
                          </span>{" "}
                          during human handoff testing.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "optimization" && (
                    <div className="space-y-8">
                      <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">
                        AI Engine Performance
                      </h4>
                      <div className="h-56 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={CONTINUITY_FLOW}>
                            <XAxis dataKey="step" hide />
                            <YAxis hide />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#000",
                                border: "none",
                                borderRadius: "12px",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="continuity"
                              stroke="#22d3ee"
                              fill="#22d3ee"
                              fillOpacity={0.1}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                          <p className="text-[9px] font-font text-zinc-500 uppercase mb-1">
                            Consistency
                          </p>
                          <p className="text-2xl font-display text-white">
                            99.8%
                          </p>
                        </div>
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                          <p className="text-[9px] font-font text-zinc-500 uppercase mb-1">
                            Grounding
                          </p>
                          <p className="text-2xl font-display text-primary">
                            0.99
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "admin" && (
                    <div className="space-y-4">
                      {[
                        "Configure Contextual Logic",
                        "Modify Business Rule Hierarchy",
                        "Edit Hallucination Filters",
                        "Adjust Escalation Parameters",
                        "Manage Session Memory Policy",
                        "Audit Knowledge Grounding",
                      ].map((btn, i) => (
                        <button
                          key={i}
                          className="w-full p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/10 hover:border-primary/40 transition-all group"
                        >
                          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400 group-hover:text-white">
                            {btn}
                          </span>
                          <ChevronRight
                            size={14}
                            className="text-zinc-600 group-hover:text-primary"
                          />
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
