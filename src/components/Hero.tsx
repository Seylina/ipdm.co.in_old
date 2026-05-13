import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { ArrowRight, Bot, Cpu, Network, Sparkles, Search } from "lucide-react";
import { openMeeting as openCalendly } from "../lib/calendly";
import { Trademark } from "./Trademark";
import { useTheme } from "../lib/ThemeContext";

export function Hero({ onNavigate }: { onNavigate: (page: 'home' | 'advisory' | 'ai-systems' | 'about' | 'pricing' | 'policies' | 'dashboard' | 'ecosystem' | 'supporta' | 'strategos' | 'simulate' | 'core' | 'engage' | 'evolve' | 'flow' | 'core-intel' | 'decision-modeling' | 'revenue-growth' | 'brand-content' | 'knowledge-research' | 'ops-automation' | 'cust-experience' | 'adv-strategic' | 'queries-guiding') => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) return;

    // Architecture Systems - Specific Names
    const techSystems = [
      'synapse', 'scribe', 'amplify', 'archive', 'insightra', 
      'lens', 'flow', 'core', 'evolve', 'engage', 'supporta', 
      'simulate', 'strategos', 'ecosystem', 'intelligence unit'
    ];

    // Check for Systems specifically
    if (techSystems.some(sys => query.includes(sys)) || query.includes('system') || query.includes('automation') || query.includes('agent')) {
      onNavigate('ai-systems');
      return;
    }

    if (query.includes('dashboard') || query.includes('console') || query.includes('stats') || query.includes('analytics') || query.includes('monitor') || query.includes('telemetry')) {
      onNavigate('dashboard');
      return;
    }

    // Categories
    if (query.includes('advisory') || query.includes('strategic') || query.includes('strategy') || query.includes('consulting') || query.includes('transformation') || query.includes('architecture') || query.includes('roadmap')) {
      onNavigate('advisory');
    } else if (query.includes('capabilities') || query.includes('platform') || query.includes('intelligence') || query.includes('framework') || query.includes('infrastructure')) {
      onNavigate('ai-systems');
    } else if (query.includes('about') || query.includes('company') || query.includes('team') || query.includes('ipdm') || query.includes('mission') || query.includes('culture')) {
      onNavigate('about');
    } else if (query.includes('pricing') || query.includes('cost') || query.includes('service') || query.includes('investment') || query.includes('billing')) {
      onNavigate('pricing');
    } else if (query.includes('policy') || query.includes('terms') || query.includes('privacy') || query.includes('legal') || query.includes('compliance')) {
      onNavigate('policies');
    } else if (query.includes('contact') || query.includes('consultation') || query.includes('calendly') || query.includes('meeting') || query.includes('support')) {
      window.dispatchEvent(new CustomEvent('open-contact-modal'));
    } else {
      // Fallback to AI systems if it sounds technical
      if (query.length > 3) {
        onNavigate('ai-systems');
      }
    }
  };
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 md:pb-32 px-6 overflow-hidden bg-[var(--color-bg)] transition-colors duration-1000">
      {/* Background Mesh Gradients & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-20 light:opacity-[0.08]" />
        <div className="absolute top-[-100px] right-[-100px] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-secondary/10 rounded-full blur-[100px] md:blur-[150px] opacity-50 dark:opacity-50 light:opacity-[0.15] pointer-events-none" />
        <div className="absolute bottom-[-50px] left-[-50px] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-primary/5 rounded-full blur-[100px] md:blur-[120px] opacity-50 dark:opacity-50 light:opacity-[0.15] pointer-events-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-[1400px] w-full"
      >
        <div className="flex flex-col items-center justify-center mb-4 md:mb-6">

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 rounded-full glass border-[var(--color-text)]/10 text-primary text-[11px] md:text-[11px] font-black uppercase tracking-wider shadow-[0_0_30px_rgba(34,211,238,0.1)]"
          >
            <Sparkles className="w-3 h-3" />
            Engineering the Digital Architecture Revolution
          </motion.div>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-[5rem] lg:text-[7.5rem] leading-[1.2] tracking-tighter mb-8 md:mb-12 max-w-[95vw] mx-auto break-words transition-colors duration-1000">
          From <span className="text-gradient-vibrant inline-block py-2 px-2">Websites</span> to <br />
          <span className="text-gradient-secondary inline-block italic py-2 px-4">Intelligent</span> <br />
          <span className="text-[var(--color-text)] transition-colors duration-1000">Business</span> <span className="text-gradient-teal-pink inline-block py-2 px-2">Systems</span>
        </h1>

        <p className="text-sm md:text-xl text-zinc-500 dark:text-zinc-300 max-w-2xl mx-auto mb-8 md:mb-10 font-medium leading-relaxed tracking-tight px-4 bg-white/5 backdrop-blur-sm rounded-lg py-2 transition-all duration-1000">
          Designing and deploying AI-powered systems that transform digital interfaces into revenue engines and operational infrastructure.
        </p>

        <div className="max-w-2xl mx-auto mb-12 relative group px-4">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
          <form onSubmit={handleSearch} className="relative flex items-center bg-[var(--color-bg)]/90 rounded-2xl border-2 border-white/10 dark:border-white/60 light:border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_0_50px_rgba(0,0,0,1)] light:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-1000">
            <div className="pl-4 md:pl-6 text-[var(--color-text)] flex-shrink-0">
              <Search className="w-5 h-5 md:w-6 h-6" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Explore professional architectures..." 
              className="flex-1 min-w-0 bg-transparent border-none focus:ring-0 px-3 md:px-5 py-5 md:py-6 text-[var(--color-text)] placeholder:text-zinc-400 font-bold text-base md:text-lg outline-none"
            />
            <button 
              type="submit"
              className="mr-2 md:mr-3 px-5 md:px-8 py-3.5 md:py-4 bg-primary text-black font-black rounded-xl text-[11px] md:text-sm uppercase tracking-wider hover:brightness-125 transition-all active:scale-95 shadow-[0_0_30_px_rgba(34,211,238,0.5)] flex-shrink-0 whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>

        {/* DIGITAL EYE HUD GRAPHIC */}
        <div className="relative w-full h-[250px] md:h-[350px] mb-8 md:mb-12 flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 blueprint-grid opacity-[0.05]" />
           
           <div className="relative w-48 h-48 md:w-64 md:h-64 -mt-10">
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 border border-primary/30 rounded-full flex items-center justify-center"
              >
                 {/* The Eye Sclera */}
                 <div className="w-full h-full rounded-[100%] border border-primary/10 bg-primary/5 blur-[2px] scale-x-150 rotate-45" />
              </motion.div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                 {/* Pupil / Core */}
                 <motion.div 
                   animate={{ 
                     scale: [1, 1.2, 1],
                     boxShadow: ["0 0 20px rgba(34,211,238,0.3)", "0 0 50px rgba(34,211,238,0.6)", "0 0 20px rgba(34,211,238,0.3)"]
                   }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="w-16 h-16 bg-primary/20 rounded-full border-2 border-primary shadow-neon relative overflow-hidden"
                 >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[var(--color-text)] rounded-full blur-[1px]" />
                    
                 </motion.div>
              </div>

              {/* Data streams around the eye */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: [0, 1, 0],
                    x: [0, (i % 2 === 0 ? 100 : -100)],
                    y: [0, (i < 4 ? 100 : -100)],
                  }}
                  transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 w-4 h-[1px] bg-primary/40"
                />
              ))}
           </div>

           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[11px] font-mono text-zinc-500 dark:text-zinc-600 tracking-wider uppercase transition-colors duration-1000">
             <span>Advanced Neural Mapping</span>
             <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
             <span>Active Processing</span>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => openCalendly()}
            className="px-10 py-4.5 bg-vibrant text-white font-black rounded-xl uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all shadow-neon flex items-center gap-2 group"
          >
            Request Strategic Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => onNavigate('ai-systems')}
            className="px-10 py-4.5 glass border-[var(--color-text)]/10 text-[var(--color-text)] font-black rounded-xl uppercase tracking-widest text-xs hover:bg-[var(--color-text)]/5 transition-all flex items-center gap-2"
          >
            System Architecture<Trademark />
          </button>
        </div>

        {/* Floating Elements (Visualizing System Architecture) - Inside reveal container */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl relative mx-auto">
          {[
            { icon: <Bot className="text-primary" />, label: "Autonomous Agents" },
            { icon: <Cpu className="text-secondary" />, label: "Knowledge Graphs" },
            { icon: <Network className="text-accent" />, label: "Multi-Agent Logic" },
            { icon: <Sparkles className={`${theme === 'dark' ? 'text-white' : 'text-zinc-800'}`} />, label: "Adaptive UI" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-2xl flex flex-col items-center gap-4 text-center border-[var(--color-text)]/5 transition-all duration-1000"
            >
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 transition-colors duration-1000">
                {item.icon}
              </div>
              <span className="text-sm font-bold tracking-tight text-[var(--color-text)] transition-colors duration-1000">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
