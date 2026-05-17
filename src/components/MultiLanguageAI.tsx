import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Languages,
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
  MapPin,
  Flame,
  Globe2,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Trademark } from "./Trademark";
import { askMultilingualEngine } from "../services/multiLanguageService";
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
const LANGUAGE_USAGE = [
  { name: "English", value: 45 },
  { name: "Spanish", value: 20 },
  { name: "Hindi", value: 15 },
  { name: "German", value: 10 },
  { name: "French", value: 5 },
  { name: "Others", value: 5 },
];

const COLORS = [
  "#22d3ee",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
];

const REGIONAL_PERFORMANCE = [
  { region: "North America", engagement: 92, conversion: 85 },
  { region: "Europe", engagement: 88, conversion: 82 },
  { region: "Asia Pacific", engagement: 95, conversion: 88 },
  { region: "Latin America", engagement: 84, conversion: 78 },
  { region: "Middle East", engagement: 86, conversion: 80 },
];

export function MultiLanguageAI({
  onNavigate,
}: {
  onNavigate: (page: any) => void;
}) {
  const [messages, setMessages] = useState<
    {
      role: "user" | "assistant";
      content: string;
      language?: string;
      confidence?: number;
    }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    | "analytics"
    | "localization"
    | "translation"
    | "conversion"
    | "continuity"
    | "optimization"
    | "admin"
  >("analytics");
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

      const responseText = await askMultilingualEngine(userMsg, geminiHistory);

      // Simulate detection signals
      const detectedLang = userMsg.match(/[가-힣]/)
        ? "Korean"
        : userMsg.match(/[ぁ-んァ-ン]/)
          ? "Japanese"
          : userMsg.match(/[你好]/)
            ? "Chinese"
            : userMsg.match(/[hola|buenos]/i)
              ? "Spanish"
              : "English";
      const confidence = Math.floor(Math.random() * 5) + 95;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: responseText,
          language: detectedLang,
          confidence,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "SYSTEM FAILURE: Multilingual translation node disconnected.",
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
              <Trademark text="IPDM Multilingual AI" />
            </h1>
            <span className="text-[12px] font-mono text-primary font-bold uppercase tracking-wider">
              Global Engagement Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="hidden lg:flex gap-8 items-center border-l border-white/5 pl-8">
            <div className="text-right">
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                Translation Parity
              </p>
              <p className="text-[10px] font-bold text-primary tracking-widest">
                VERIFIED_99.1%
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                Active Regions
              </p>
              <p className="text-[10px] font-bold text-emerald-500">
                GLOBAL_124+
              </p>
            </div>
          </div>
          <div className="px-6 py-2 bg-primary/10 border border-primary/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-neon" />
              <span className="text-[10px] font-mono font-black text-primary uppercase tracking-widest">
                Region Synchronized
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        {/* Left Side: Language Clusters */}
        <aside className="lg:col-span-3 space-y-6 flex flex-col overflow-y-auto pr-2 custom-scrollbar-thin">
          <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass">
            <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
              <Globe size={14} className="text-primary" /> Global Reach
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: "Americas",
                  status: "LOCALIZED",
                  icon: <MapPin size={12} />,
                },
                {
                  label: "Europe",
                  status: "ACTIVE",
                  icon: <MapPin size={12} />,
                },
                {
                  label: "APAC",
                  status: "SCALING",
                  icon: <MapPin size={12} />,
                },
                {
                  label: "Africa",
                  status: "EMERGING",
                  icon: <MapPin size={12} />,
                },
                {
                  label: "Middle East",
                  status: "MAPPED",
                  icon: <MapPin size={12} />,
                },
              ].map((region, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-zinc-500 group-hover:text-primary transition-colors">
                      {region.icon}
                    </div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-tight">
                      {region.label}
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-primary uppercase tracking-widest">
                    {region.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass flex-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />
            <h2 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest mb-6 flex items-center gap-2">
              <Languages size={14} className="text-primary" /> Dialect
              Intelligence
            </h2>
            <div className="space-y-6">
              {[
                { l: "Context Retention", v: "99.8%" },
                { l: "Cultural Adaptation", v: "ACTIVE" },
                { l: "Intent Sync", v: "GLOBAL" },
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
                <Globe2 className="text-primary/10 w-16 h-16 animate-pulse" />
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Multilingual Interaction Console */}
        <section className="lg:col-span-5 flex flex-col gap-6 h-[calc(100vh-140px)]">
          <div className="flex-1 flex flex-col rounded-[3rem] bg-white/[0.01] border border-white/5 relative overflow-hidden glass shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                  <Languages className="text-primary" size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-black uppercase tracking-[0.3em] text-primary">
                    Multilingual Bridge
                  </span>
                  <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                    Agnostic Communication Protocol Active
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-[9px] font-mono text-zinc-500 uppercase">
                  Stability
                </p>
                <p className="text-[10px] font-bold text-primary italic">
                  99.98%_UPTIME
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
                      <Globe size={48} className="text-primary" />
                    </div>
                    <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] blur-2xl -z-10 animate-pulse" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-display font-medium italic tracking-tight text-white">
                      Global Link Initialized
                    </h2>
                    <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] max-w-sm mx-auto leading-loose italic">
                      AI-driven multilingual communication infrastructure.
                      Localizing intent and business logic across borders.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                    {[
                      "I can assist you in your preferred language.",
                      "Would you like localized business guidance?",
                      "Tell me about region-specific setups.",
                      "¿Cómo puede ayudarme IPDM en español?",
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
                    {msg.language && (
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 border border-primary/20 rounded">
                          <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                          <span className="text-[8px] font-mono font-black text-primary uppercase tracking-widest">
                            {msg.language} DETECTED
                          </span>
                        </div>
                        <span className="text-[8px] font-mono text-zinc-600 uppercase italic">
                          Parity: {msg.confidence}%
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
                    Synchronizing Language Nodes...
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
                  placeholder="COMMUNICATE IN ANY LANGUAGE..."
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

        {/* Right Col: Multilingual Engagement Console */}
        <section className="lg:col-span-4 flex flex-col h-[calc(100vh-140px)]">
          <div className="flex-1 rounded-[3rem] bg-[var(--color-text)]/[0.02] border border-[var(--color-text)]/5 glass flex flex-col overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 bg-black/40">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-sm font-display font-medium uppercase tracking-[0.2em] italic text-primary">
                    IPDM ENGAGE™ Multilingual Engagement Console
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">
                    Cross-Border Engagement Hub
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                  <Globe size={18} className="text-primary" />
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    id: "analytics",
                    label: "Language Analytics",
                    icon: <BarChart3 size={12} />,
                  },
                  {
                    id: "localization",
                    label: "Localization Metrics",
                    icon: <MapPin size={12} />,
                  },
                  {
                    id: "translation",
                    label: "Translation Intelligence Metrics",
                    icon: <ArrowRightLeft size={12} />,
                  },
                  {
                    id: "conversion",
                    label: "Regional Conversion Metrics",
                    icon: <TrendingUp size={12} />,
                  },
                  {
                    id: "continuity",
                    label: "Session Continuity Metrics",
                    icon: <RefreshCw size={12} />,
                  },
                  {
                    id: "optimization",
                    label: "AI Optimization Metrics",
                    icon: <Zap size={12} />,
                  },
                  { id: "admin", label: "Admin Control Center", icon: <Settings size={12} /> },
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
                  {activeTab === "analytics" && (
                    <div className="space-y-8">
                      <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">
                        Active Language Distribution
                      </h4>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={LANGUAGE_USAGE}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {LANGUAGE_USAGE.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#000",
                                border: "none",
                                borderRadius: "12px",
                              }}
                            />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                          <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">
                            Total Languages
                          </p>
                          <p className="text-xl font-bold text-white italic">
                            48+
                          </p>
                        </div>
                        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                          <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">
                            Detection Latency
                          </p>
                          <p className="text-xl font-bold text-primary italic">
                            12ms
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "localization" && (
                    <div className="space-y-8">
                      <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">
                        Regional Performance Metrics
                      </h4>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <ReBarChart data={REGIONAL_PERFORMANCE}>
                            <XAxis
                              dataKey="region"
                              tick={{
                                fill: "#666",
                                fontSize: 8,
                                fontWeight: 900,
                              }}
                            />
                            <YAxis hide />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#000",
                                border: "none",
                                borderRadius: "12px",
                              }}
                            />
                            <Bar
                              dataKey="engagement"
                              fill="#22d3ee"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar
                              dataKey="conversion"
                              fill="#10b981"
                              radius={[4, 4, 0, 0]}
                            />
                          </ReBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-4">
                        {[
                          { l: "Cultural Adaptation", v: "96.2%", s: "STABLE" },
                          {
                            l: "Regional Terminology",
                            v: "98.8%",
                            s: "SYNCED",
                          },
                          {
                            l: "Market Alignment",
                            v: "94.5%",
                            s: "OPTIMIZING",
                          },
                        ].map((m, i) => (
                          <div
                            key={i}
                            className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/5 transition-all"
                          >
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">
                              {m.l}
                            </span>
                            <span className="text-sm font-bold text-white">
                              {m.v}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "translation" && (
                    <div className="space-y-8">
                      <div className="p-8 rounded-[3rem] bg-cyan-500/5 border border-cyan-500/10 flex flex-col items-center text-center gap-6">
                        <ShieldCheck className="text-cyan-500" size={48} />
                        <div>
                          <h4 className="text-lg font-display italic text-white mb-2">
                            Intent-Preserving Translation
                          </h4>
                          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-loose">
                            AI-driven cross-language mapping. Preserving
                            business terminology and conversational context
                            across all linguistics clusters.
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { label: "Translation Accuracy", val: "99.1%" },
                          { label: "Context Preservation", val: "99.8%" },
                          { label: "Business Terminology", val: "PROTECTED" },
                        ].map((m, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center p-4 bg-white/[0.01] border border-white/5 rounded-xl"
                          >
                            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                              {m.label}
                            </span>
                            <span className="text-primary font-bold text-[10px]">
                              {m.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "conversion" && (
                    <div className="space-y-8">
                      <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">
                        Regional Conversion Heatmap
                      </h4>
                      <div className="space-y-4">
                        {REGIONAL_PERFORMANCE.map((r, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest">
                              <span className="text-zinc-400">{r.region}</span>
                              <span className="text-primary">
                                {r.conversion}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${r.conversion}%` }}
                                className="h-full bg-primary shadow-neon"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                        <p className="text-[9px] font-mono text-zinc-500 uppercase mb-2">
                          Local Recommendation Effectiveness
                        </p>
                        <p className="text-3xl font-display text-white italic">
                          92.4%
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "continuity" && (
                    <div className="space-y-8">
                      <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">
                        Multilingual Session Memory
                      </h4>
                      <div className="space-y-4">
                        {[
                          {
                            label: "State Synchronization",
                            status: "ACTIVE",
                            color: "bg-primary",
                          },
                          {
                            label: "Qualification Persistence",
                            status: "PERSISTENT",
                            color: "bg-emerald-500",
                          },
                          {
                            label: "Memory Parity",
                            status: "SYNCED",
                            color: "bg-indigo-500",
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
                        <History className="text-primary group-hover:scale-110 transition-transform" />
                        <p className="text-[10px] font-mono text-zinc-400 italic">
                          Conversation state preserved across{" "}
                          <span className="text-white font-bold">
                            12 Language Switches
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "optimization" && (
                    <div className="space-y-8">
                      <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest">
                        Localization Intelligence IQ
                      </h4>
                      <div className="h-56 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            data={[
                              { subject: "Cultural", A: 95, fullMark: 100 },
                              { subject: "Terminology", A: 98, fullMark: 100 },
                              { subject: "Currency", A: 100, fullMark: 100 },
                              { subject: "Etiquette", A: 92, fullMark: 100 },
                              { subject: "Slang", A: 85, fullMark: 100 },
                            ]}
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
                              name="Metrics"
                              dataKey="A"
                              stroke="#22d3ee"
                              fill="#22d3ee"
                              fillOpacity={0.2}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                          <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">
                            Quality Score
                          </p>
                          <p className="text-2xl font-display text-white">
                            99.4%
                          </p>
                        </div>
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                          <p className="text-[9px] font-mono text-zinc-500 uppercase mb-1">
                            Adaptation
                          </p>
                          <p className="text-2xl font-display text-primary">
                            INSTANT
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "admin" && (
                    <div className="space-y-4">
                      {[
                        "Configure Language Priority",
                        "Edit Regional Terminology Library",
                        "Manage Localization Logic",
                        "Configure Market Workflows",
                        "Modify Translation Governance",
                        "Audit Multilingual Analytics",
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
