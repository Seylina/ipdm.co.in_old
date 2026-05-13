import { motion } from "motion/react";
import { Check, Cpu, Globe, Rocket, Shield, Zap, Terminal, ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { LOGO_SVG } from "../lib/constants";

export function Capabilities() {
  const items = [
    { title: "Revenue Systems", desc: "AI-driven systems designed to optimize conversion, qualify leads, and drive measurable top-line growth.", icon: <Zap className="w-6 h-6" /> },
    { title: "Customer Systems", desc: "Autonomous agents that manage user relationships, nurture prospects, and handle complex support logic.", icon: <Globe className="w-6 h-6" /> },
    { title: "Operations Systems", desc: "Intelligent architectures that automate core business workflows and internal decision processing.", icon: <Rocket className="w-6 h-6" /> },
    { title: "Decision Systems", desc: "Model-driven logic layers that provide predictive insights and automated strategic reporting.", icon: <Cpu className="w-6 h-6" /> }
  ];

  return (
    <section id="capabilities" className="py-24 px-6 bg-[var(--color-bg)]/50 transition-colors duration-1000">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl mb-4 text-[var(--color-text)] transition-colors">What We Actually <span className="text-primary">Build</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">Systems That Run Core Business Functions</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border-primary/5 hover:border-primary/20 transition-all flex flex-col gap-4 group"
            >
              <div className="text-primary group-hover:scale-110 transition-transform w-fit">{item.icon}</div>
              <h3 className="text-xl font-bold font-display group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProtocolFlow() {
  const steps = [
    { name: "Diagnose", desc: "We analyze your current logical bottlenecks and identify system capability gaps." },
    { name: "Design", desc: "Model-driven strategy is mapped to your specific business requirements and logic." },
    { name: "Build", desc: "AI-powered architectures and autonomous agents are engineered for your core functions." },
    { name: "Deploy", desc: "Systems are integrated into production with strict operational oversight." },
    { name: "Optimize", desc: "Continuous recursive learning ensures the system evolves with your scaling needs." }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-20 dark:opacity-20 light:opacity-[0.08]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl mb-4 text-[var(--color-text)] transition-colors">How We <span className="text-secondary">Deliver</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">A Structured, End-to-End Delivery Model</p>
        </motion.div>
        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 glass p-8 rounded-3xl border-white/5 relative group hover:border-secondary/20 transition-all"
            >
              <div className="text-5xl font-display font-black text-white/5 dark:text-white/5 light:text-black/5 absolute -top-2 -left-2 group-hover:text-secondary/10 transition-colors">0{i+1}</div>
              <h3 className="text-lg font-bold mb-3 relative z-10 text-[var(--color-text)] transition-colors">{step.name}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Portfolio() {
  const deployments = [
    { client: "Quantum Dynamics", core: "Risk Assessment Agent", impact: "85% Auto-Qual" },
    { client: "BioLogic Health", core: "Patient Triage Logic", impact: "Zero Latency" },
    { client: "Titan Logistics", core: "Adaptive Routing Core", impact: "12% Margin Up" }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6"
        >
           <div>
              <div className="text-[11px] font-mono font-bold tracking-wider text-zinc-500 uppercase mb-2">NETWORK_STATUS</div>
              <h2 className="font-display font-bold text-4xl">Measured <span className="text-accent">Outcomes</span></h2>
           </div>
           <p className="text-zinc-500 max-w-md text-sm">Where We Operate: Cross-Industry Capability, NIC-Aligned. Our systems work in the real world.</p>
        </motion.div>
        <div className="space-y-4">
           {deployments.map((d, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="glass px-8 py-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border-white/5 hover:bg-white/5 transition-all group"
             >
                <div>
                   <div className="text-[11px] font-mono text-zinc-600 mb-1">CLIENT_ID</div>
                   <div className="font-bold text-lg group-hover:text-primary transition-colors">{d.client}</div>
                </div>
                <div>
                   <div className="text-[11px] font-mono text-zinc-600 mb-1">MODULE_TYPE</div>
                   <div className="text-sm text-zinc-300">{d.core}</div>
                </div>
                <div className="text-right">
                   <div className="text-[11px] font-mono text-zinc-600 mb-1">MEASURED_IMPACT</div>
                   <div className="text-sm font-bold text-emerald-500">{d.impact}</div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}

export function CredibilityStrip() {
  const team = ["Data Scientists", "Mathematicians", "Digital Architects"];
  return (
    <div className="py-12 border-y border-zinc-500/10 bg-[var(--color-text)]/[0.02] transition-colors duration-1000">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        <span className="text-xs font-black uppercase tracking-wider text-zinc-500">Built by a high-caliber team of:</span>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {team.map((role, i) => (
            <div key={i} className="flex items-center gap-3 group">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              <span className="text-sm font-display font-medium text-zinc-400 group-hover:text-[var(--color-text)] transition-colors">{role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Footer({ onNavigate }: { onNavigate?: (page: any) => void }) {
  return (
    <footer className="pt-32 pb-12 px-6 border-t border-zinc-500/10 transition-all duration-1000 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-2xl border border-[var(--color-text)]/10">
               <img 
                 src={LOGO_SVG} 
                 alt="Infinite Potential Logo" 
                 className="h-16 w-auto object-contain" 
                 referrerPolicy="no-referrer"
               />
            </div>
            <p className="text-[var(--color-text)]/60 text-sm max-w-sm mb-8 leading-relaxed italic font-serif tracking-wide uppercase">
              IPDM — <span className="text-gradient-mustard font-bold not-italic">Intelligence Delivered.</span> Systems That Scale.
            </p>
            <p className="text-[var(--color-text)]/60 text-xs max-w-sm mb-8 leading-relaxed">
              Infinite Potential Digital Marketing Pvt Ltd. Architecting enterprise-grade autonomous business capabilities.
            </p>
            <div className="flex gap-6">
               {["Twitter", "LinkedIn", "GitHub", "Medium"].map(link => (
                 <a key={link} href="#" className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text)]/60 hover:text-cyan-400 transition-colors">{link}</a>
               ))}
            </div>
          </div>

          <div className="flex flex-col md:items-end md:text-right">
            <h4 className="font-display font-bold mb-8 text-2xl text-[var(--color-text)] transition-colors">Our Office</h4>
            <div className="space-y-8">
              <div className="flex gap-4 md:flex-row-reverse">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div className="space-y-2">
                  <p className="text-[11px] font-mono font-bold tracking-wider text-zinc-500 uppercase">Registered Address:</p>
                  <p className="text-sm text-zinc-500 leading-relaxed transition-colors">
                    7, Dharmashree, 2nd Main, Jaibheema Nagar, BTM Layout 1st Stage, Bangalore - 560068
                  </p>
                </div>
              </div>
              <div className="flex gap-4 md:flex-row-reverse">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div className="space-y-2">
                  <p className="text-[11px] font-mono font-bold tracking-wider text-zinc-500 uppercase">Office Address:</p>
                  <p className="text-sm text-zinc-500 leading-relaxed transition-colors">
                    5th & 7th Floor, Commerce Mantri, 12, 1 & 2, BTM 2nd Stage, Bengaluru, Karnataka 560076
                  </p>
                </div>
              </div>
              <div className="flex gap-4 md:flex-row-reverse">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <p className="text-sm text-zinc-500 font-bold tracking-tight">+91 9902659208</p>
              </div>
              <div className="flex gap-4 md:flex-row-reverse">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:Info@ipdm.co.in" className="text-sm text-zinc-500 hover:text-primary transition-colors">Info@ipdm.co.in</a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-zinc-500/10">
           <div className="text-[11px] font-mono tracking-wider text-zinc-600 uppercase transition-colors">© 2026 Infinite Potential Digital Marketing Pvt Ltd. ALL RIGHTS RESERVED.</div>
           <div className="flex gap-8 text-[11px] font-mono tracking-wider text-zinc-600 uppercase">
              <button 
                onClick={() => { onNavigate?.('policies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className="hover:text-primary transition-colors uppercase"
              >
                Shipping & Exchange Policy
              </button>
              <a href="#" className="hover:text-primary">Privacy Proxy</a>
              <a href="#" className="hover:text-primary">Terms of Logic</a>
           </div>
        </div>
      </div>
    </footer>
  );
}
