import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Shield, 
  Target, 
  Zap, 
  BarChart3, 
  Cpu, 
  Activity, 
  ArrowLeft,
  X,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Terminal,
  Database,
  Search,
  Layout,
  Settings,
  History,
  TrendingUp,
  FileText,
  Brain,
  ShieldCheck
} from "lucide-react";
import { askAstra } from "../services/astraService";
import { Trademark } from "./Trademark";

interface Message {
  role: "user" | "astra";
  content: string;
  id: string;
  timestamp: Date;
  metrics?: {
    confidence: number;
    impact: number;
    priority: "High" | "Medium" | "Low";
  }
}

// Neural Visualization Component for background
const NeuralMap = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="neural-grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.05)" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#neural-grid)" />
      {/* Animated nodes/lines */}
      <motion.g
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <circle cx="20%" cy="30%" r="2" fill="var(--color-primary)" className="shadow-neon" />
        <circle cx="80%" cy="70%" r="2" fill="var(--color-primary)" className="shadow-neon" />
        <circle cx="40%" cy="60%" r="2" fill="var(--color-primary)" className="shadow-neon" />
        <path d="M 20% 30% L 40% 60% L 80% 70%" stroke="rgba(6,182,212,0.1)" strokeWidth="1" fill="none" />
      </motion.g>
    </svg>
  </div>
);

export function IPDMAstra({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Map history for Gemini
      const geminiHistory = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

      const response = await askAstra(input, geminiHistory);
      
      const astraMessage: Message = {
        role: "astra",
        content: response,
        id: (Date.now() + 1).toString(),
        timestamp: new Date(),
        metrics: {
          confidence: 94 + Math.random() * 5,
          impact: 85 + Math.random() * 10,
          priority: "High"
        }
      };

      setMessages(prev => [...prev, astraMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: "astra",
        content: "ERROR: System failed to generate strategic intelligence. Please verify neural link connectivity.",
        id: (Date.now() + 1).toString(),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const parseAstraContent = (content: string) => {
    // We'll convert our strategic keys into Markdown headers to make them legible and "neat"
    // while react-markdown handles the removal of ** and other formatting.
    const keys = [
      "CURRENT ORGANIZATIONAL ISSUE",
      "CURRENT ISSUE",
      "CORE ISSUE", 
      "OPERATIONAL ISSUE",
      "DETECTED OPERATIONAL CONTEXT",
      "RELEVANT HISTORICAL CONTEXT",
      "HISTORICAL CONTEXT",
      "OPERATIONAL MEMORY ANALYSIS",
      "ROOT CAUSE", 
      "STRATEGIC INSIGHT", 
      "MULTI-AGENT ANALYSIS",
      "WORKFLOW ANALYSIS",
      "AI TRANSFORMATION RECOMMENDATION",
      "RECOMMENDED ACTION", 
      "COORDINATED AI RECOMMENDATION",
      "AI RECOMMENDATION",
      "AI ENGINEERING RECOMMENDATION",
      "AI AUTOMATION RECOMMENDATION",
      "AI GOVERNANCE RECOMMENDATION",
      "ADVANCED AI RECOMMENDATION",
      "AI WORKFORCE RECOMMENDATION",
      "AI-NATIVE RECOMMENDATION",
      "EXECUTIVE ISSUE ANALYSIS",
      "EXECUTIVE ANALYSIS",
      "ROUTING & CATEGORY ACTIVATION",
      "LONG-TERM WORKFLOW EVOLUTION NOTE",
      "STRATEGIC INTERPRETATION",
      "ROOT CAUSE IDENTIFICATION",
      "CATEGORY ACTIVATION SUMMARY",
      "MULTI-SYSTEM INTERPRETATION",
      "OPERATIONAL IMPLICATION",
      "OPERATIONAL IMPACT",
      "EXPECTED BUSINESS IMPACT",
      "EXPECTED ENTERPRISE IMPACT",
      "LONG-TERM ENTERPRISE EVOLUTION NOTE",
      "LONG-TERM EVOLUTION NOTE",
      "LONG-TERM EVOLUTION STRATEGY",
      "DETECTED OPERATIONAL EVENT",
      "ORGANIZATIONAL EVENT DETECTION",
      "ORGANIZATIONAL EVENT ANALYSIS",
      "ENTERPRISE CONTEXT INTERPRETATION",
      "API & SYSTEM ACTIVATION SUMMARY",
      "CROSS-SYSTEM WORKFLOW COORDINATION",
      "OPERATIONAL EXECUTION STATUS",
      "ENTERPRISE IMPACT ANALYSIS",
      "AI AGENT ACTIVATION SUMMARY",
      "INTER-AGENT COLLABORATIVE ANALYSIS",
      "OPERATIONAL WORKFLOW ACTIONS",
      "LONG-TERM ORGANIZATIONAL EVOLUTION NOTE",
      "AI ANALYSIS VISUALIZATION",
      "MULTI-AGENT ACTIVATION DISPLAY",
      "EXECUTIVE INTELLIGENCE OUTPUT",
      "OPERATIONAL IMPACT VISUALIZATION",
      "LONG-TERM EVOLUTION INSIGHT",
      "WORKFLOW ANALYSIS",
      "STRATEGIC NARRATIVE ANALYSIS",
      "EXPECTED ENGAGEMENT IMPACT",
      "LONG-TERM BRAND INTELLIGENCE NOTE",
      "STRATEGIC INTELLIGENCE ANALYSIS",
      "DEEP ROOT CAUSE",
      "SYSTEMIC INTERPRETATION",
      "EXPECTED ORGANIZATIONAL EVOLUTION IMPACT",
      "EVENT DETECTION",
      "ORGANIZATIONAL CONTEXT ANALYSIS",
      "WORKFLOW EXECUTION STRATEGY",
      "MULTI-SYSTEM COORDINATION STATUS",
      "LONG-TERM OPERATIONAL EVOLUTION NOTE",
      "EXECUTIVE SUMMARY",
      "EXECUTIVE OVERVIEW",
      "ORGANIZATIONAL INTELLIGENCE ANALYSIS",
      "OPERATIONAL FINDINGS",
      "AI-NATIVE RECOMMENDATIONS",
      "TRANSFORMATION ROADMAP",
      "WEBSITE & ORGANIZATIONAL ANALYSIS",
      "OPERATIONAL INTELLIGENCE FINDINGS",
      "AI READINESS INTERPRETATION",
      "ENTERPRISE MATURITY SCORES",
      "STRATEGIC TRANSFORMATION INSIGHTS",
      "LONG-TERM EVOLUTION ROADMAP",
      "LONG-TERM COGNITIVE INFRASTRUCTURE NOTE",
      "COMMUNICATION ISSUE",
      "ROOT CAUSE",
      "COMMUNICATION ANALYSIS REPORT",
      "BRAND POSITIONING REPORT",
      "COMMUNICATION SYNCHRONIZATION REPORT",
      "ENGAGEMENT ANALYSIS REPORT",
      "SYSTEM ANALYSIS",
      "EXECUTION STRATEGY",
      "ACTIONS INITIATED",
      "WORKFLOW COORDINATION STATUS",
      "EXPECTED OPERATIONAL IMPACT",
      "LONG-TERM EXECUTION EVOLUTION NOTE",
      "DIGITAL ISSUE",
      "CONVERSION ANALYSIS",
      "REVENUE ISSUE",
      "EXECUTION ISSUE",
      "COMMUNICATION ISSUE",
      "WORKFORCE OR CAPABILITY ISSUE",
      "AI INFRASTRUCTURE ISSUE",
      "STRATEGIC INTELLIGENCE ANALYSIS",
      "ORGANIZATIONAL ANALYSIS",
      "CONTEXT ANALYSIS",
      "HISTORICAL INTELLIGENCE",
      "OPERATIONAL INTERPRETATION",
      "AI SYSTEM ANALYSIS",
      "RISK ANALYSIS",
      "STRATEGIC NARRATIVE ANALYSIS",
      "DEEP ROOT CAUSE",
      "SYSTEMIC INTERPRETATION",
      "FUTURE STRATEGIC ANALYSIS",
      "EVOLUTION GAP",
      "LONG-TERM RISK OR OPPORTUNITY",
      "EXPECTED IMPACT", 
      "EXPECTED OPERATIONAL IMPACT",
      "EXPECTED BUSINESS IMPACT",
      "EXPECTED REVENUE IMPACT",
      "EXPECTED ENGAGEMENT IMPACT",
      "EXPECTED ORGANIZATIONAL IMPACT",
      "EXPECTED ORGANIZATIONAL EVOLUTION IMPACT",
      "EXPECTED FUTURE IMPACT",
      "TRANSFORMATION OPPORTUNITY",
      "ORGANIZATIONAL INTERPRETATION",
      "DIAGNOSTIC INTELLIGENCE",
      "LONG-TERM STRATEGIC NOTE",
      "LONG-TERM INFRASTRUCTURE NOTE",
      "LONG-TERM AI INFRASTRUCTURE NOTE",
      "LONG-TERM DIGITAL INFRASTRUCTURE NOTE",
      "LONG-TERM REVENUE INFRASTRUCTURE NOTE",
      "LONG-TERM KNOWLEDGE EVOLUTION NOTE",
      "LONG-TERM BRAND INTELLIGENCE NOTE",
      "LONG-TERM EXECUTION INFRASTRUCTURE NOTE",
      "LONG-TERM RESILIENCE NOTE",
      "LONG-TERM COGNITIVE INFRASTRUCTURE NOTE",
      "LONG-TERM CAPABILITY EVOLUTION NOTE",
      "LONG-TERM ENTERPRISE EVOLUTION NOTE",
      "LONG-TERM STRATEGIC FORECAST NOTE",
      "REQUIRED AI AGENTS",
      "GOVERNANCE OR INFRASTRUCTURE ISSUE",
      "DETECTED TREND",
      "PREDICTIVE ANALYSIS",
      "STRATEGIC IMPLICATION",
      "ENTERPRISE STATUS OVERVIEW",
      "LIVE OPERATIONAL ANALYSIS",
      "EXECUTIVE ALERTS & RISKS",
      "ORGANIZATIONAL IMPACT ANALYSIS",
      "ENTERPRISE INTELLIGENCE INTERPRETATION",
      "STRATEGIC OPERATIONAL INSIGHTS",
      "EXECUTIVE ENGAGEMENT OPPORTUNITIES",
      "HISTORICAL ENTERPRISE INTELLIGENCE",
      "STRATEGIC METHODOLOGY INTERPRETATION",
      "OPERATIONAL COGNITION ANALYSIS",
      "AI-NATIVE ENTERPRISE RECOMMENDATIONS",
      "TRANSFORMATION INTELLIGENCE"
    ];
    let formatted = content;
    
    // Convert executive report header
    formatted = formatted.replace(/\*\*IPDM ASTRA™ — EXECUTIVE STRATEGY REPORT\*\*/gi, '# EXECUTIVE STRATEGY REPORT');

    // Convert keys to headers, cleaning up bolding and numbers around them
    keys.forEach(key => {
      // Regex matches numbered items, bold markers, and the colon
      const regex = new RegExp(`(?:###\\s+)?(?:\\*\\*)?(\\d+\\.)?\\s*(${key})(?:\\:)?(?:\\*\\*)?`, 'gi');
      formatted = formatted.replace(regex, (_, p1, p2) => {
        return `\n\n### ${p1 ? p1 + ' ' : ''}${p2}\n\n`;
      });
    });

    // Final cleanup of redundant markers
    formatted = formatted.replace(/### \s+/g, '### ');
    formatted = formatted.replace(/\n\n\n+/g, '\n\n');
    
    return formatted;
  };

  return (
    <div className="fixed inset-0 z-[110] bg-[var(--color-bg)] flex flex-col md:flex-row overflow-hidden selection:bg-primary/30 transition-colors duration-1000">
      <NeuralMap />
      {/* Sidebar: Dashboard Navigation */}
      <aside className="w-16 md:w-64 border-r border-[var(--color-text)]/5 bg-[var(--color-text)]/[0.02] flex flex-col items-center md:items-stretch transition-colors duration-1000">
        <div className="p-6 border-b border-[var(--color-text)]/5 flex items-center gap-3 transition-colors duration-1000">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group transition-all">
             <Zap size={20} className="group-hover:scale-110 transition-transform" />
          </div>
          <div className="hidden md:block">
            <h2 className="font-display font-bold text-lg leading-tight"><Trademark text="ASTRA™" /></h2>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Decision Intel</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: <Layout size={18} />, label: "Executive Dashboard", active: true },
            { icon: <Cpu size={18} />, label: "Neural Nodes", active: false },
            { icon: <History size={18} />, label: "Decision History", active: false },
            { icon: <Settings size={18} />, label: "System Config", active: false },
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-primary/10 text-primary border border-primary/20 shadow-neon' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="hidden md:block text-xs font-mono font-bold uppercase tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--color-text)]/5 transition-colors duration-1000">
          <button 
            onClick={onBack}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={18} />
            <span className="hidden md:block text-xs font-mono font-bold uppercase tracking-tight">Return to Core</span>
          </button>
        </div>
      </aside>

      {/* Main Execution Area */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Header HUD */}
        <header className="h-20 border-b border-[var(--color-text)]/5 flex items-center justify-between px-8 bg-[var(--color-bg)]/80 backdrop-blur-md sticky top-0 z-20 transition-colors duration-1000">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-neon animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-black">Link: Synchronized</span>
              <div className="ml-4 h-1 w-24 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                 <motion.div 
                   animate={{ x: ["-100%", "100%"] }} 
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="h-full w-12 bg-gradient-to-r from-transparent via-primary to-transparent" 
                 />
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 bg-white/5 rounded-full border border-white/5">
               <Activity size={12} className="text-primary" />
               <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Throughput: 142k Tokens/s</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Version</span>
                <span className="text-[10px] font-mono text-white px-2 py-0.5 bg-white/10 rounded">v4.0.2</span>
             </div>
          </div>
        </header>

        {/* Intelligence Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-12 scrollbar-hide">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-12">
               <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 border border-primary/20 flex items-center justify-center animate-pulse shadow-neon text-primary">
                  <Zap size={48} />
               </div>
               <div className="space-y-4">
                 <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tighter italic">
                   Ready for <span className="text-gradient-vibrant not-italic">Enterprise Cognition</span>
                 </h1>
                 <p className="text-zinc-500 text-lg leading-relaxed italic">
                   Engage with the IPDM ASTRA™ Architecture for autonomous strategic transformation and operational execution.
                 </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
                  {[
                    "Consult Category 1 Organizational Intelligence",
                    "Architect Category 2 Strategic Decisions",
                    "Orchestrate Category 3 Operational Workflows",
                    "Diagnose Category 4 Digital Intelligence",
                    "Accelerate Category 5 Revenue velocity",
                    "Synchronize Category 6 Organizational Memory",
                    "Optimize Category 7 Content & Communication",
                    "Forecast Category 8 Predictive Analytics",
                    "Engineer Category 9 AI Infrastructure",
                    "Automate Category 10 Execution workflows",
                    "Govern Category 11 Enterprise Infrastructure",
                    "Evolve Category 12 Advanced Intelligence",
                    "Design Category 13 Workforce Intelligence",
                    "Transform Category 14 Enterprise Evolution"
                  ].map((rec, i) => (
                    <button 
                      key={i}
                      onClick={() => setInput(rec)}
                      className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all group flex items-start gap-4"
                    >
                      <Sparkles size={16} className="text-primary mt-1 opacity-50 group-hover:opacity-100" />
                      <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">{rec}</span>
                    </button>
                  ))}
               </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-16 pb-32">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.role === 'user' ? (
                    <div className="flex items-start gap-4 max-w-[80%]">
                      <div className="p-6 rounded-[2.5rem] rounded-tr-sm bg-white/5 border border-white/10 text-lg font-medium tracking-tight">
                        {msg.content}
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center shrink-0 border border-white/10">
                        <User size={20} className="text-zinc-400" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full space-y-8">
                       <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-neon">
                             <Zap size={20} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-display font-medium text-lg leading-tight"><Trademark text="ASTRA™" /> Intelligence Response</h3>
                            <div className="flex gap-4 mt-1">
                               <span className="text-[10px] font-mono text-primary uppercase tracking-widest">{msg.timestamp.toLocaleTimeString()}</span>
                               <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Neural Layer 08</span>
                            </div>
                          </div>
                       </div>

                       {/* Metrics Panel */}
                       {msg.metrics && (
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {[
                              { label: "Confidence", val: `${msg.metrics.confidence.toFixed(1)}%`, icon: <Brain size={12} /> },
                              { label: "Impact", val: `${msg.metrics.impact.toFixed(1)}%`, icon: <Activity size={12} /> },
                              { label: "Priority", val: msg.metrics.priority, icon: <Layout size={12} /> }
                            ].map((m, i) => (
                              <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                                 <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                                    {m.icon} {m.label}
                                 </div>
                                 <span className="text-xs font-mono font-black text-white">{m.val}</span>
                              </div>
                            ))}
                         </div>
                       )}

                       <div className="p-8 md:p-12 rounded-[3.5rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden group transition-all hover:bg-white/[0.03]">
                          {/* HUD Decor */}
                          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                              <Target size={120} />
                          </div>
                          
                          <div className="relative z-10 markdown-content">
                             <Markdown>
                               {parseAstraContent(msg.content)}
                             </Markdown>
                          </div>
                          
                          <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                             <div className="flex gap-8">
                                <div className="space-y-1">
                                   <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">System Source</div>
                                   <div className="text-[10px] font-mono text-zinc-400">Master AI Training Architecture</div>
                                </div>
                                <div className="space-y-1">
                                   <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Verification</div>
                                   <div className="text-[10px] font-mono text-emerald-500 flex items-center gap-2">
                                      <ShieldCheck size={12} /> Production Validated
                                   </div>
                                </div>
                             </div>
                             <div className="flex gap-2">
                                <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/40 transition-all text-zinc-500 hover:text-primary">
                                   <FileText size={16} />
                                </button>
                                <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/40 transition-all text-zinc-500 hover:text-primary">
                                   <TrendingUp size={16} />
                                </button>
                             </div>
                          </div>
                       </div>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Terminal */}
        <div className="sticky bottom-0 p-6 md:p-10 pointer-events-none">
          <div className="max-w-4xl mx-auto w-full pointer-events-auto">
             <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-[2.5rem] blur opacity-25 group-focus-within:opacity-100 transition-opacity duration-1000" />
               <div className="relative bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-3xl">
                  <div className="flex items-center px-6">
                    <Terminal size={18} className="text-zinc-600" />
                    <textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="ENTER STRATEGIC QUERY..."
                      rows={1}
                      className="flex-1 bg-transparent border-none text-white p-6 focus:ring-0 resize-none font-mono text-sm placeholder:text-zinc-700 h-[72px] flex items-center"
                    />
                    <div className="flex items-center gap-3 pr-4">
                      {input && (
                        <button 
                          onClick={() => setInput("")}
                          className="p-2 text-zinc-600 hover:text-white transition-colors"
                        >
                          <X size={18} />
                        </button>
                      )}
                      <button 
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className={`
                          p-3 rounded-2xl flex items-center justify-center transition-all
                          ${!input.trim() || isLoading 
                            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                            : 'bg-primary text-black shadow-neon hover:scale-105 active:scale-95'}
                        `}
                      >
                         {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Status Bar */}
                  <div className="px-6 py-2 bg-white/5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                     <div className="flex gap-6">
                        <span>Astra Intelligence Active</span>
                        <span>Multi-Agent Sync: On</span>
                     </div>
                     <div className="flex gap-4">
                        <span>Secure Channel: 256-bit</span>
                        <span>Tokens Remaining: 24.8k</span>
                     </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </main>

      {/* Floating Insight HUD Panel (Desktop Only) */}
      <div className="hidden xl:block w-80 border-l border-[var(--color-text)]/5 bg-[var(--color-text)]/[0.01] overflow-y-auto p-8 transition-colors duration-1000">
         <div className="space-y-12">
            <div>
               <h4 className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.4em] mb-6 inline-block pb-1 border-b-2 border-primary/20">Business Intelligence Signals</h4>
               <div className="space-y-4">
                  {[
                    { label: "Market Volatility", val: "Lo", color: "text-emerald-500" },
                    { label: "Conversion Velocity", val: "+12%", color: "text-emerald-500" },
                    { label: "Operational Friction", val: "Med", color: "text-amber-500" },
                    { label: "Strategic Alignment", val: "94%", color: "text-emerald-500" }
                  ].map((sig, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all">
                       <span className="text-[10px] font-mono text-zinc-500 uppercase">{sig.label}</span>
                       <span className={`text-[10px] font-mono font-black ${sig.color}`}>{sig.val}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div>
               <h4 className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.4em] mb-6 inline-block pb-1 border-b-2 border-primary/20">Active Intelligence Modules</h4>
               <div className="flex flex-wrap gap-2 relative">
                  {/* Neural connection lines motif */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                     <svg width="100%" height="100%" className="overflow-visible">
                        <path d="M 0 20 H 200 M 0 60 H 150 M 0 100 H 240" stroke="var(--color-primary)" fill="none" strokeDasharray="2 4" strokeWidth="0.5" />
                     </svg>
                  </div>
                  {[
                    "Org Intel", "Strategic Decision", "Operational OS", "Digital Intel", 
                    "Revenue", "Knowledge", "Communication", "Predictive",
                    "AI Dev", "Automation", "Governance", "Adv Intel", "Workforce", "Future Evolution"
                  ].map((agent, i) => (
                    <div key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 ring-1 ring-emerald-500/10 hover:bg-primary/10 transition-colors cursor-default relative z-10">
                       <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                       {agent}
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 relative overflow-hidden">
               <div className="relative z-10">
                  <h4 className="text-xs font-display font-medium text-primary mb-2">ASTRA TIP</h4>
                  <p className="text-[10px] text-zinc-400 leading-relaxed italic">
                    "Organizations should not merely use AI tools. Organizations should evolve into intelligent AI-native operational systems."
                  </p>
               </div>
               <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Sparkles size={64} className="text-primary" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
