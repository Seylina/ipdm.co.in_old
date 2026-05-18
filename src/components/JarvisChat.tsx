import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import { 
  MessageSquare, 
  X, 
  Send, 
  Loader2, 
  User, 
  Sparkles, 
  Maximize2, 
  Minimize2,
  ChevronRight,
  Zap,
  Shield,
  Brain,
  Workflow,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from "lucide-react";
import { askJarvis } from "../services/jarvisService";
import { Trademark } from "./Trademark";
import jarvisAvatar from "../assets/images/jarvis_friendly_robot.png";

interface Message {
  role: "user" | "jarvis";
  content: string;
  id: string;
  timestamp: Date;
}

export function JarvisChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setInput("");
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speak = (text: string, manual: boolean = false) => {
    if (!voiceEnabled && !manual) return;
    
    // Stop any current speaking
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // Try to find a good voice
    const voices = window.speechSynthesis.getVoices();
    const premiumVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Premium')) || voices[0];
    if (premiumVoice) utterance.voice = premiumVoice;
    
    utterance.rate = 0.95; // Slightly slower for business tone
    utterance.pitch = 1.0;
    
    window.speechSynthesis.speak(utterance);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isExpanded]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "jarvis",
          content: "System Initialized. I am **JARVIS™**, your Strategic Intelligence Partner. I have access to the IPDM Multiverse architecture and am prepared to assist with systems exploration, predictive modelling, or enterprise strategy. \n\nHow can we optimize your trajectory today?",
          id: "welcome",
          timestamp: new Date()
        }
      ]);
    }
  }, []);

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
      const geminiHistory = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

      const response = await askJarvis(input, geminiHistory);
      
      const jarvisMessage: Message = {
        role: "jarvis",
        content: response,
        id: (Date.now() + 1).toString(),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, jarvisMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: "jarvis",
        content: "Operational Interruption Detected. Connectivity with the strategic core was temporarily severed. Please re-issue your command.",
        id: (Date.now() + 1).toString(),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-[200] transition-all duration-500 ${isExpanded ? 'inset-6 bottom-6 right-6' : ''}`}>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-2xl bg-[var(--color-bg)] dark:bg-zinc-950 border border-primary/30 text-primary shadow-[0_20px_50px_rgba(34,211,238,0.2)] flex items-center justify-center group relative overflow-hidden transition-colors duration-1000"
          >
            {/* Cybernetic overlay background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.1)_0%,_transparent_70%)] animate-pulse" />
            
            {/* Human-Centric Strategic Icon */}
            <motion.div
              className="relative w-14 h-14 flex items-center justify-center z-10"
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-primary/20">
                <img 
                  src={jarvisAvatar} 
                  alt="JARVIS Intelligence" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Notification Dot */}
            <div className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#22d3ee]" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            layoutId="jarvis-window"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ 
              y: 0, 
              opacity: 1, 
              scale: 1,
              height: isMinimized ? "72px" : isExpanded ? "calc(100vh - 48px)" : "680px",
              width: isExpanded ? "calc(100vw - 48px)" : "480px"
            }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            className="bg-[var(--color-bg)] dark:bg-zinc-950 border border-[var(--color-text)]/10 dark:border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden backdrop-blur-3xl transition-colors duration-1000"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[var(--color-text)]/5 dark:border-white/5 bg-[var(--color-text)]/[0.02] dark:bg-white/5 flex items-center justify-between transition-colors duration-1000">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl border border-primary/20 flex items-center justify-center overflow-hidden shrink-0">
                  <img 
                    src={jarvisAvatar} 
                    alt="JARVIS" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-[var(--color-text)] flex items-center gap-2">
                    <Trademark text="JARVIS™" />
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-black">PRO</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                       {[0, 1, 2].map(i => <div key={i} className="w-1 h-1 rounded-full bg-emerald-500" />)}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Strategic Core Linkage: Active</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => {
                    const nextState = !voiceEnabled;
                    setVoiceEnabled(nextState);
                    if (!nextState) {
                      window.speechSynthesis.cancel();
                      setIsSpeaking(false);
                    }
                  }}
                  className={`p-2 rounded-xl transition-all ${voiceEnabled ? 'text-primary bg-primary/10' : 'text-zinc-500 hover:bg-[var(--color-text)]/5'}`}
                  title={voiceEnabled ? "Voice Enabled" : "Voice Disabled"}
                >
                  {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
                <button 
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                    setIsMinimized(false);
                  }}
                  className="p-2 text-zinc-500 hover:text-[var(--color-text)] hover:bg-[var(--color-text)]/5 rounded-xl transition-all"
                  title="Toggle Full Screen"
                >
                  {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 text-zinc-500 hover:text-[var(--color-text)] hover:bg-[var(--color-text)]/5 rounded-xl transition-all"
                >
                   {isMinimized ? <ChevronRight className="-rotate-90" size={18} /> : <Minimize2 className="rotate-45" size={18} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Status Bar for Expanded View */}
                {isExpanded && (
                  <div className="px-6 py-2 bg-[var(--color-text)]/[0.03] border-b border-[var(--color-text)]/5 flex items-center gap-12 overflow-x-auto scrollbar-hide">
                    {[
                      { icon: <Zap size={12} />, label: "POWER", value: "STABLE" },
                      { icon: <Shield size={12} />, label: "SECURITY", value: "ENCR_L3" },
                      { icon: <Brain size={12} />, label: "NEURAL", value: "94.2%" },
                      { icon: <Workflow size={12} />, label: "AGENTS", value: "4 ACTIVE" },
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center gap-2 whitespace-nowrap">
                         <span className="text-primary">{stat.icon}</span>
                         <span className="text-[10px] font-mono text-zinc-600 font-bold uppercase">{stat.label}:</span>
                         <span className="text-[10px] font-mono text-[var(--color-text)] font-black uppercase">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-gradient-to-b from-transparent to-[var(--color-text)]/[0.02]">
                  {messages.map((msg) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-4 max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all mt-1 overflow-hidden ${
                          msg.role === 'user' 
                            ? 'bg-[var(--color-text)]/[0.05] border-[var(--color-text)]/10 text-[var(--color-text)]' 
                            : 'border-primary/20 shadow-neon-sm'
                        }`}>
                          {msg.role === 'user' ? <User size={16} /> : (
                            <img 
                              src={jarvisAvatar} 
                              alt="JARVIS" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div className={`p-4 rounded-3xl text-sm leading-relaxed relative group/msg transition-all ${
                          msg.role === 'user' 
                            ? 'bg-[var(--color-text)] text-[var(--color-bg)] rounded-tr-none shadow-xl' 
                            : 'bg-[var(--color-text)]/[0.03] dark:bg-white/5 border border-[var(--color-text)]/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 rounded-tl-none'
                        }`}>
                          {msg.role === 'jarvis' && (
                            <button 
                              onClick={() => speak(msg.content, true)}
                              className="absolute -right-12 top-0 p-2 text-zinc-500 hover:text-primary opacity-0 group-hover/msg:opacity-100 transition-opacity"
                              title="Listen to message"
                            >
                              <Volume2 size={16} />
                            </button>
                          )}
                          {msg.role === 'jarvis' ? (
                            <div className="markdown-content prose prose-invert prose-sm max-w-none">
                               <Markdown>{msg.content}</Markdown>
                            </div>
                          ) : (
                            <span className="font-medium">{msg.content}</span>
                          )}
                          <div className={`text-[9px] font-mono mt-3 uppercase tracking-widest font-black opacity-40 ${msg.role === 'user' ? 'text-[var(--color-bg)]' : 'text-[var(--color-text)]'}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • TRANSMIT_OK
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-4 items-center">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <Loader2 size={16} className="animate-spin" />
                        </div>
                        <div className="flex gap-1.5 px-4 py-3 bg-[var(--color-text)]/[0.03] rounded-2xl">
                          {[0, 1, 2].map(i => (
                            <motion.div 
                              key={i}
                              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                              className="w-1.5 h-1.5 rounded-full bg-primary"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-[var(--color-text)]/5 dark:border-white/5 bg-[var(--color-text)]/[0.02] dark:bg-black/40">
                  <div className="relative group max-w-5xl mx-auto">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition-opacity" />
                    <div className="relative flex items-center gap-3 bg-[var(--color-bg)] dark:bg-zinc-900 border border-[var(--color-text)]/10 dark:border-white/10 rounded-2xl p-3 shadow-inner">
                      <button 
                        onClick={toggleListening}
                        className={`p-3 rounded-xl transition-all ${
                          isListening 
                            ? 'text-red-500 bg-red-500/10 animate-pulse' 
                            : 'text-zinc-500 hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                      </button>
                      <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="INPUT STRATEGIC QUERY OR COMMAND..."
                        className="flex-1 bg-transparent border-none text-[var(--color-text)] text-sm px-2 focus:ring-0 placeholder:text-zinc-600 font-mono font-bold uppercase tracking-tight"
                      />
                      <button 
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className={`p-3 rounded-xl transition-all shadow-lg ${
                          !input.trim() || isLoading 
                            ? 'text-zinc-700 bg-zinc-800/10' 
                            : 'text-white bg-primary hover:brightness-110 active:scale-95'
                        }`}
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between px-2 max-w-5xl mx-auto">
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Authorized Intelligence Access </span>
                       <div className="h-px w-8 bg-zinc-800" />
                       <span className="text-[10px] font-mono text-primary uppercase font-bold">Latency: 142ms</span>
                    </div>
                    <Trademark text="PREMIUM DECISION ENGINE v4.2" className="text-[9px] font-mono opacity-40 italic" />
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
