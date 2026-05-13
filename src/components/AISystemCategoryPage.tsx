import { motion } from "motion/react";
import { ArrowRight, Cpu, Check, Command, Shield, Zap, FileDown, MessageSquare } from "lucide-react";
import React from "react";
import { SystemCategory } from "../lib/systemsData";
import { Trademark } from "./Trademark";
import { openMeeting as openCalendly } from "../lib/calendly";

export function AISystemCategoryPage({ category, onNavigate, onNavigateEngine }: { category: SystemCategory, onNavigate: (page: any) => void, onNavigateEngine: (engineId: string) => void }) {
  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen relative overflow-hidden flex flex-col selection:bg-primary/30 py-20 px-8 transition-colors duration-1000">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 blueprint-grid opacity-[0.03]" />
        <div className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-24 mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-[10px] font-mono font-black text-primary uppercase tracking-[0.4em] mb-8"
          >
            IPDM ECOSYSTEM_NODE // {category.id.toUpperCase()}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 italic tracking-tighter leading-none"
          >
            {category.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-500 light:text-zinc-600 font-medium max-w-4xl leading-relaxed italic border-l-4 border-primary/10 pl-8 transition-colors duration-1000"
          >
            {category.desc}
          </motion.p>
        </div>

        {/* Engine Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {category.engines.map((engine, i) => (
            <motion.div
              key={engine.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-[3rem] border-[var(--color-text)]/5 hover:border-primary/10 transition-all group relative overflow-hidden flex flex-col min-h-[420px] bg-[var(--color-text)]/[0.01]"
            >
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.1] transition-all pointer-events-none">
                {React.cloneElement(engine.icon as React.ReactElement<any>, { className: "w-32 h-32" })}
              </div>
              
              <div className="flex items-start justify-between mb-12">
                <div className="p-5 rounded-3xl bg-[var(--color-text)]/5 text-primary border border-[var(--color-text)]/5 group-hover:border-primary/20 group-hover:bg-primary/10 transition-all transition-colors duration-1000">
                  {engine.icon}
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono font-black text-zinc-600 light:text-zinc-800 uppercase tracking-widest block mb-1 transition-colors duration-1000">Status</span>
                  <span className="text-[10px] font-mono font-black text-emerald-400 dark:text-emerald-400 light:text-emerald-600 uppercase tracking-widest flex items-center justify-end gap-1.5 transition-colors duration-1000">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> OPERATIONAL
                  </span>
                </div>
              </div>
              
              <div className="mb-10 transition-colors duration-1000">
                <h4 className="text-3xl font-bold font-display text-[var(--color-text)] mb-2 leading-tight tracking-tight group-hover:text-primary transition-colors duration-1000"><Trademark text={engine.name} /></h4>
                <p className="text-[10px] font-mono font-black text-zinc-500 light:text-zinc-700 uppercase tracking-[0.3em] italic transition-colors duration-1000">{engine.role}</p>
              </div>
              
              <p className="text-zinc-500 light:text-zinc-700 text-base leading-relaxed mb-10 flex-1 font-medium group-hover:text-[var(--color-text)] transition-colors duration-1000">
                {engine.desc}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-10 transition-colors duration-1000">
                {Object.entries(engine.stats).map(([key, val], idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/5 light:border-black/10 group-hover:bg-[var(--color-text)]/[0.05] transition-colors duration-1000">
                    <p className="text-[10px] font-mono text-zinc-500 light:text-zinc-700 uppercase tracking-wider mb-1 transition-colors duration-1000">{key}</p>
                    <p className="text-xs font-bold text-[var(--color-text)] tracking-widest transition-colors duration-1000">{val}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-10 transition-colors duration-1000">
                {engine.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-text)]/10 light:border-black/20 text-zinc-500 light:text-zinc-600 group-hover:text-primary transition-colors uppercase tracking-wider transition-colors duration-1000">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-8 border-t border-[var(--color-text)]/5 light:border-black/5 flex flex-col gap-4 transition-colors duration-1000">
                <button 
                  onClick={() => onNavigateEngine(engine.name)}
                  className="text-[11px] font-mono font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all pr-2 dark:hover:text-white light:hover:text-blue-900"
                >
                  View Engine Details <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={openCalendly}
                  className="text-[11px] font-mono font-black text-zinc-500 light:text-zinc-600 uppercase tracking-wider flex items-center gap-2 hover:text-primary transition-colors pr-2"
                >
                  Configure Deployment
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-16 rounded-[4rem] border-primary/20 bg-primary/5 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-8 italic">Ready to Deploy {category.shortName}?</h3>
          <p className="text-zinc-500 text-base mb-12 max-w-2xl mx-auto font-medium">
            Integrate our {category.engines.length} specialized intelligence engines into your business infrastructure for immediate operational advantage.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => onNavigate('ecosystem')}
              className="px-10 py-5 bg-white/5 border border-white/10 text-primary font-black rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all group pointer-events-auto"
            >
              <Cpu className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-[0.2em]">View Ecosystem Overview</span>
            </button>
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/IPDM_Business_Proposal.pdf';
                link.download = 'IPDM_Business_Proposal.pdf';
                link.click();
              }}
              className="px-10 py-5 bg-primary text-black font-black rounded-2xl hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.5)] transition-all flex items-center gap-4 group pointer-events-auto"
            >
              <FileDown className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-[0.2em]">Download Brochure</span>
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
              className="px-10 py-5 bg-secondary text-black font-black rounded-2xl hover:shadow-[0_0_40px_rgba(var(--secondary-rgb),0.5)] transition-all group pointer-events-auto"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-[11px] uppercase tracking-[0.2em]">Contact Us</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
