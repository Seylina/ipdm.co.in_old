import { motion } from "motion/react";
import { Layers, Brain, Cpu, Layout, BarChart, ChevronRight } from "lucide-react";

export function Approach() {
  const principles = [
    {
      id: 1,
      title: "Systems Thinking",
      desc: "We design integrated systems, not isolated features.",
      icon: <Layers className="text-primary" />
    },
    {
      id: 2,
      title: "Intelligence Embedded",
      desc: "AI is built into workflows, not added as an afterthought.",
      icon: <Brain className="text-secondary" />
    },
    {
      id: 3,
      title: "Model-Driven Decisions",
      desc: "Every system is backed by: Mathematical models Financial logic Statistical validation",
      icon: <Layout className="text-accent" />
    },
    {
      id: 4,
      title: "Execution First",
      desc: "Every solution is: Deployed in production Measured against outcomes Continuously improved",
      icon: <Cpu className="text-white" />
    }
  ];

  return (
    <section id="approach" className="py-16 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Background Network Graphic (SVG) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
           <svg width="100%" height="100%" viewBox="0 0 1200 600" className="w-full h-full">
              <defs>
                 <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="transparent" />
                 </linearGradient>
              </defs>
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                d="M100,300 C300,100 500,500 700,300 S1100,100 1100,300" 
                stroke="url(#lineGrad)" 
                strokeWidth="1" 
                fill="none" 
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
                d="M100,200 C400,400 800,100 1100,400" 
                stroke="rgba(79, 70, 229, 0.3)" 
                strokeWidth="1" 
                fill="none" 
              />
           </svg>
        </div>

        <div className="text-center mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 glass rounded-full border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6"
          >
            Our Philosophy
          </motion.div>
          <h2 className="font-display font-bold text-4xl md:text-7xl mb-8 tracking-tighter">
            Execution Over Theory. <br />
            <span className="text-gradient-vibrant italic">Systems Over Tools.</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
            Blockchain and AI are redefining trust and intelligence in the digital world. Here is why our approach matters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-[2.5rem] border-white/5 flex flex-col items-center text-center gap-8 group hover:border-primary/30 transition-all shadow-xl relative overflow-hidden"
            >
              {/* HUD Accents */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/20" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-primary/20" />
              
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 scale-125">
                  {p.icon}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-display uppercase tracking-tight group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">
                  {p.desc}
                </p>
              </div>

              {/* Data stream dots */}
              <div className="absolute bottom-4 left-0 w-full flex justify-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                 {[...Array(5)].map((_, j) => (
                   <motion.div 
                     key={j}
                     animate={{ opacity: [0, 1, 0] }}
                     transition={{ duration: 1, repeat: Infinity, delay: j * 0.2 }}
                     className="w-1 h-1 rounded-full bg-primary" 
                   />
                 ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
