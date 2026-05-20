import React from 'react';
import { motion } from 'motion/react';
import { Brain, ArrowLeft, Zap, Shield, Activity, Cpu } from 'lucide-react';
import { Trademark } from './Trademark';

interface AstraOverviewProps {
  onBack: () => void;
  onLaunch: () => void;
}

export const AstraOverview: React.FC<AstraOverviewProps> = ({ onBack, onLaunch }) => {
  return (
    <div className="fixed inset-0 z-[110] bg-[var(--color-bg)] flex items-center justify-center p-6 transition-colors duration-1000 overflow-y-auto">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-50" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center">
        {/* Brain Icon / Logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-12 shadow-neon relative group"
        >
          <Brain size={48} className="md:size-64 group-hover:scale-110 transition-transform duration-500" />
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-[2.5rem] bg-primary/5 blur-xl"
          />
        </motion.div>

        {/* Title Section */}
        <div className="text-center space-y-4 mb-16 px-4">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
           >
              <h1 className="text-6xl md:text-8xl font-display font-medium tracking-tighter text-white mb-2 leading-none">
                <Trademark text="ASTRA™" />
              </h1>
              <p className="text-xs md:text-sm font-mono text-zinc-500 uppercase tracking-[0.5em] font-black italic">
                Decision Intelligence System
              </p>
           </motion.div>
        </div>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-2xl text-zinc-300 text-center max-w-2xl font-light leading-relaxed mb-20 italic px-6"
        >
          The central neural architecture for autonomous decision intelligence and cross-system orchestration.
        </motion.p>

        {/* Info Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mb-20 px-4"
        >
          {[
            { label: 'Reasoning', val: 'Enterprise', icon: Cpu },
            { label: 'Coordination', val: 'Deep', icon: Zap },
            { label: 'Uptime', val: '99.99%', icon: Activity }
          ].map((stat, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 glass flex flex-col">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <stat.icon size={12} className="text-primary/60" /> {stat.label}
              </p>
              <p className="text-xl font-display font-medium text-white">{stat.val}</p>
            </div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 w-full md:w-auto px-4"
        >
          <button 
            onClick={onLaunch}
            className="px-12 py-5 bg-primary text-black font-black uppercase tracking-[0.2em] rounded-2xl md:rounded-full hover:scale-105 active:scale-95 transition-all shadow-neon flex items-center justify-center gap-4 text-xs"
          >
            <Brain size={18} /> Enter Astra Chat
          </button>
          
          <button 
            onClick={onBack}
            className="px-12 py-5 bg-white/[0.05] border border-white/10 text-white font-black uppercase tracking-[0.2em] rounded-2xl md:rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-4 text-xs"
          >
            <ArrowLeft size={18} /> Return To Core
          </button>
        </motion.div>
        
        {/* Status indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex items-center gap-3"
        >
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Astra Node 01: Operational</span>
        </motion.div>
      </div>
    </div>
  );
};
