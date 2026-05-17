import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import { 
  MessageSquare, 
  X, 
  Send, 
  Loader2, 
  Bot, 
  User, 
  Sparkles, 
  Maximize2, 
  Minimize2,
  ChevronRight,
  Zap,
  Shield,
  Brain,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from "lucide-react";
import { askJarvis } from "../services/jarvisService";
import { Trademark } from "./Trademark";

interface Message {
  role: "user" | "jarvis";
  content: string;
  id: string;
  timestamp: Date;
}

export function JarvisChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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
  }, [messages, isOpen, isMinimized]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "jarvis",
          content: "Welcome to IPDM. I am JARVIS™, your strategic business advisor and intelligent website navigator. How can I assist you in exploring our systems or achieving your enterprise transformation goals today?",
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
        content: "I apologize, but I encountered an operational interruption. Please retry your query.",
        id: (Date.now() + 1).toString(),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-[1.5rem] bg-zinc-950/90 border border-primary/40 text-primary shadow-[0_0_35px_rgba(34,211,238,0.3)] flex items-center justify-center group relative overflow-hidden"
          >
            {/* Cybernetic overlay background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.15)_0%,_transparent_70%)] animate-pulse" />
            
            {/* Interactive Glowing Cyber-Robot */}
            <motion.div
              className="relative w-12 h-12 flex items-center justify-center z-10"
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
              >
                {/* Antenna */}
                <motion.path
                  d="M20 10V4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ stroke: ["#22d3ee", "#67e8f9", "#22d3ee"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                
                {/* Antenna Tip (Glowing Beacon) */}
                <motion.circle
                  cx="20"
                  cy="3"
                  r="2"
                  fill="#22d3ee"
                  animate={{
                    scale: [1, 1.4, 1],
                    fill: ["#22d3ee", "#ffffff", "#22d3ee"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Ears / Side Bolts */}
                <path d="M7 19C7 18.4477 7.44772 18 8 18H9V26H8C7.44772 26 7 25.5523 7 25V19Z" fill="currentColor" opacity="0.6" />
                <path d="M33 19C33 18.4477 32.5523 18 32 18H31V26H32C32.5523 26 33 25.5523 33 25V19Z" fill="currentColor" opacity="0.6" />

                {/* Robot Head Frame */}
                <rect
                  x="9"
                  y="11"
                  width="22"
                  height="18"
                  rx="6"
                  fill="#09090b"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                {/* Digital Screen Overlay */}
                <rect
                  x="12"
                  y="14"
                  width="16"
                  height="12"
                  rx="3"
                  fill="#030712"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.8"
                />

                {/* Blinking Eyes (glowing digital cyan lights) */}
                <motion.ellipse
                  cx="16.5"
                  cy="19"
                  rx="1.5"
                  ry="1.5"
                  fill="#22d3ee"
                  animate={{
                    scaleY: [1, 1, 0.1, 1, 1, 1, 0.1, 1],
                  }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    times: [0, 0.4, 0.42, 0.44, 0.7, 0.72, 0.74, 1],
                  }}
                />
                <motion.ellipse
                  cx="23.5"
                  cy="19"
                  rx="1.5"
                  ry="1.5"
                  fill="#22d3ee"
                  animate={{
                    scaleY: [1, 1, 0.1, 1, 1, 1, 0.1, 1],
                  }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    times: [0, 0.4, 0.42, 0.44, 0.7, 0.72, 0.74, 1],
                  }}
                />

                {/* Mouth/Audio Frequency Wave */}
                <motion.path
                  d="M17 23H23"
                  stroke="#22d3ee"
                  strokeWidth="1"
                  strokeLinecap="round"
                  animate={{
                    strokeWidth: [1, 1.6, 1, 1.6, 1],
                    d: [
                      "M17 23H23",
                      "M16 23.5H24",
                      "M17 23H23",
                      "M16 23.5H24",
                      "M17 23H23"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Neck */}
                <rect x="19" y="29" width="2" height="2" fill="currentColor" opacity="0.6" />

                {/* Shoulders / Upper torso */}
                <path
                  d="M14 31H26C27.5 31 28.5 32 28.5 33.5V35H11.5V33.5C11.5 32 12.5 31 14 31Z"
                  fill="#09090b"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ 
              y: 0, 
              opacity: 1, 
              scale: 1,
              height: isMinimized ? "auto" : "600px",
              width: "400px"
            }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className={`bg-zinc-950 border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-3xl`}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1">
                    <Trademark text="JARVIS™" />
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active Intelligence</span>
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
                  className={`p-2 transition-colors ${voiceEnabled ? 'text-primary' : 'text-zinc-500'}`}
                  title={voiceEnabled ? "Voice Enabled" : "Voice Disabled"}
                >
                  {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gradient-to-b from-transparent to-black/40">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                          msg.role === 'user' ? 'bg-zinc-800 border-white/10' : 'bg-primary/10 border-primary/20 text-primary'
                        }`}>
                          {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed relative group/msg ${
                          msg.role === 'user' 
                            ? 'bg-zinc-800 text-white rounded-tr-none' 
                            : 'bg-white/5 border border-white/10 text-zinc-300 rounded-tl-none'
                        }`}>
                          {msg.role === 'jarvis' && (
                            <button 
                              onClick={() => speak(msg.content, true)}
                              className="absolute -right-10 top-0 p-2 text-zinc-500 hover:text-primary opacity-0 group-hover/msg:opacity-100 transition-opacity"
                              title="Listen to message"
                            >
                              <Volume2 size={14} />
                            </button>
                          )}
                          {msg.role === 'jarvis' ? (
                            <div className="markdown-content">
                               <Markdown>{msg.content}</Markdown>
                            </div>
                          ) : (
                            msg.content
                          )}
                          <div className={`text-[10px] font-mono mt-1 ${msg.role === 'user' ? 'text-zinc-500' : 'text-zinc-600'}`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 items-center">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <Loader2 size={14} className="animate-spin" />
                        </div>
                        <div className="flex gap-1">
                          {[0, 1, 2].map(i => (
                            <motion.div 
                              key={i}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                              className="w-1 h-1 rounded-full bg-primary"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 bg-black/60">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-xl blur opacity-20 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-xl p-2">
                      <button 
                        onClick={toggleListening}
                        className={`p-2 rounded-lg transition-all ${
                          isListening 
                            ? 'text-red-500 bg-red-500/10 animate-pulse' 
                            : 'text-zinc-500 hover:text-primary hover:bg-primary/10'
                        }`}
                      >
                        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                      </button>
                      <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask JARVIS™ anything..."
                        className="flex-1 bg-transparent border-none text-white text-xs px-2 focus:ring-0 placeholder:text-zinc-600 font-mono"
                      />
                      <button 
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className={`p-2 rounded-lg transition-all ${
                          !input.trim() || isLoading 
                            ? 'text-zinc-700' 
                            : 'text-primary hover:bg-primary/10'
                        }`}
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between px-1">
                    <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider">Premium AI Support</span>
                    <Trademark text="IPDM JARVIS™" className="text-[8px] opacity-30" />
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
