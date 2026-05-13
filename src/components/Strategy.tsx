import { motion } from "motion/react";
import { AlertCircle, TrendingUp, Zap, Server, ShieldCheck, Database } from "lucide-react";

export function Strategy() {
  return (
    <div className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* State of the Market */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-mono font-bold tracking-[0.3em] text-white/40 uppercase mb-4">CORE_POSITIONING</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight">
              From Advisory to Execution — <span className="text-primary">Fully Integrated.</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Most firms operate in silos: Consultants advise, Developers build, and Tools automate. <span className="text-white">Infinite Potential integrates all three into a single system.</span> This ensures no gap between thinking and execution.
            </p>
            <div className="flex flex-col gap-4">
              {[
                "Design strategy using models",
                "Build AI-driven systems",
                "Deploy and operate them in production",
                "No loss in translation between segments"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-300">
                  <div className="w-1 h-1 bg-primary rotate-45" />
                  <span className="font-medium text-sm tracking-tight">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-red-500/10 blur-[100px] rounded-full" />
            <div className="glass p-8 rounded-3xl border-red-500/20 relative z-10">
              <div className="space-y-4">
                <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-full bg-white/5 rounded animate-pulse delay-75" />
                <div className="h-32 w-full bg-red-500/5 rounded-xl border border-red-500/20 flex items-center justify-center">
                  <span className="text-red-500/60 font-mono text-[10px] uppercase font-bold tracking-[0.2em]">System Inefficient</span>
                </div>
                <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse delay-150" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Market Shift Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center flex-row-reverse">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 md:order-1 relative"
          >
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
            <div className="glass p-8 rounded-3xl border-primary/20 relative z-10">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="h-6 w-1/3 bg-primary/20 rounded-lg" />
                  <Zap className="w-5 h-5 text-primary animate-bounce-slow" />
                </div>
                <div className="h-4 w-full bg-white/5 rounded" />
                <div className="flex gap-2">
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: 'auto' }}
                    viewport={{ once: true }}
                    className="h-20 flex-1 bg-primary/5 rounded-lg border border-primary/20" 
                  />
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: 'auto' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="h-20 flex-1 bg-primary/5 rounded-lg border border-primary/20" 
                  />
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: 'auto' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="h-20 flex-1 bg-primary/5 rounded-lg border border-primary/20" 
                  />
                </div>
                <div className="h-4 w-2/3 bg-white/10 rounded" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg mb-4">THE DIFFERENTIATOR</div>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight">
              What Makes <span className="text-primary font-display italic">Infinite Potential Different</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              We are built for execution, not just advice. Our delivery model ensures that strategic intelligence is translated directly into operational systems that run your core business functions.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Database />, label: "Dynamic Knowledge" },
                { icon: <TrendingUp />, label: "Proactive Lead Gen" },
                { icon: <Server />, label: "Edge Intelligence" },
                { icon: <ShieldCheck />, label: "Verified Logic" }
              ].map((item, i) => (
                <div key={i} className="glass p-4 rounded-xl border-white/5 flex items-center gap-3">
                  <div className="text-primary">{item.icon}</div>
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
