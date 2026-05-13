import React from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  ChevronRight, 
  Zap, 
  Rocket, 
  Server, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCcw, 
  TrendingUp, 
  Activity,
  LineChart
} from 'lucide-react';
import { openMeeting as openCalendly } from '../lib/calendly';
import { Trademark } from './Trademark';

interface PricingPlan {
  name: string;
  price: string;
  tagline: string;
  bestFor: string;
  features: string[];
  outcome: string;
  recommended?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Infinite AI Launchpad™",
    tagline: "The foundation for autonomous transition.",
    price: "₹10,000",
    bestFor: "Small business units and early-stage AI adoption.",
    features: [
      "1 Core AI Agent",
      "Standard Knowledge Base Sync",
      "Unified Web Interface",
      "Standard Support Node",
      "Basic Workflow Integration"
    ],
    outcome: "Operational foundation established with 1st-level automation."
  },
  {
    name: "Infinite AI Growth Engine™",
    tagline: "Scaling operations through intelligent coordination.",
    price: "₹30,000",
    bestFor: "Rapidly growing teams requiring multi-agent coordination.",
    features: [
      "3 Coordinated Agents (ARCHIVE™)",
      "Advanced QUANTUM™ Knowledge Core",
      "Full CRM & ERP Integration",
      "Priority Engineering Support",
      "Monthly Outcome Optimization"
    ],
    outcome: "Measurable efficiency gains and conversion uplift within 30 days.",
    recommended: true
  },
  {
    name: "Infinite AI Scale System™",
    tagline: "High-consequence intelligence at enterprise scale.",
    price: "₹1,00,000",
    bestFor: "Organizations requiring deep data modeling and predictive logic.",
    features: [
      "10+ Scaling AI Agents",
      "Infinite QUANTUM™ Modeling Access",
      "Full Data Lake Ingestion",
      "Dedicated Logic Architect",
      "Deterministic State Verification"
    ],
    outcome: "Exponential scaling of organizational capability without headcount growth."
  },
  {
    name: "Infinite AI Business OS™",
    tagline: "The absolute operating layer for the autonomous enterprise.",
    price: "Custom",
    bestFor: "Global enterprises seeking full end-to-end system coordination.",
    features: [
      "Infinite CORE™ Central Platform",
      "Full Organization Coordination",
      "Infinite Residency Access",
      "24/7 Red-Team System Monitoring",
      "Unified Strategic Decision Logic"
    ],
    outcome: "Complete transition to an AI-driven autonomous operating model."
  }
];

export function SubscriptionSystem() {
  return (
    <section id="pricing" className="py-24 bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden relative selection:bg-primary/30 transition-colors duration-1000">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-grid opacity-10 pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 text-[var(--color-text)] transition-colors duration-1000">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-4xl md:text-6xl mb-6 tracking-tight transition-colors duration-1000">
              Subscription-Based <span className="text-zinc-500 dark:text-zinc-600 transition-colors duration-1000">Intelligent Systems</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed transition-colors duration-1000">
              Infinite Potential delivers AI-powered business systems through a structured subscription model designed for continuous evolution and operational excellence.
            </p>
          </motion.div>
        </div>

        {/* Core Positioning Block */}
        <div className="mb-24 glass p-12 rounded-[3.5rem] border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h3 className="font-display font-bold text-3xl mb-6">
                Not a One-Time Project. <br />
                <span className="text-primary italic">A Continuously Evolving System.</span>
              </h3>
              <p className="text-zinc-500 leading-relaxed">
                Traditional projects go stale. Subscription-based systems evolve. Our models continuously learn from your data, optimizing your operations every second they are active.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
               <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-32 h-32 border-2 border-primary/20 rounded-full flex items-center justify-center p-4"
                  >
                     <RefreshCcw className="w-12 h-12 text-primary" />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-1 h-1 bg-primary rounded-full animate-ping" />
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`glass p-10 rounded-[3rem] border flex flex-col relative overflow-hidden group transition-all duration-500 ${
                plan.recommended ? 'border-primary/40 bg-primary/[0.03] shadow-[0_0_40px_rgba(var(--primary-rgb),0.1)]' : 'border-white/5'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 px-5 py-1.5 bg-primary text-black text-xs font-black uppercase tracking-[0.3em] rounded-bl-2xl">
                  Recommended
                </div>
              )}
              
              <div className="mb-8">
                <h4 className="text-lg font-bold font-display text-[var(--color-text)] mb-2 group-hover:text-primary transition-colors duration-1000">
                  <Trademark text={plan.name} />
                </h4>
                <p className="text-xs text-zinc-500 italic leading-snug transition-colors duration-1000">
                  <Trademark text={plan.tagline} />
                </p>
              </div>

              <div className="mb-8">
                <div className="text-4xl font-bold font-display tracking-tight text-[var(--color-text)] mb-1 transition-colors duration-1000">
                  {plan.price}
                  {plan.price !== 'Custom' && <span className="text-sm font-sans text-zinc-500 dark:text-zinc-600 font-normal ml-1">/mo</span>}
                </div>
                <div className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest bg-white/5 py-1.5 px-3 rounded-lg mt-2 inline-block">
                  SYSTEM_INVESTMENT
                </div>
              </div>

              <div className="mb-8 border-t border-white/5 pt-6">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">BEST FOR:</div>
                <p className="text-xs text-zinc-500 leading-relaxed font-medium">{plan.bestFor}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3 group/feat">
                    <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                    <span className="text-xs text-zinc-400 group-hover/feat:text-white transition-colors">
                      <Trademark text={feature} />
                    </span>
                  </div>
                ))}
              </div>

              <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                   <TrendingUp className="w-3 h-3 text-emerald-500" /> Expected Outcome
                </div>
                <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                  <Trademark text={plan.outcome} />
                </p>
              </div>

              <button 
                onClick={() => openCalendly()}
                className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 ${
                plan.recommended ? 'bg-primary text-black hover:shadow-neon-strong' : 'glass hover:bg-white/10'
              }`}>
                Choose Plan <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Plan Comparison */}
        <div className="mb-32 hidden md:block">
           <div className="text-center mb-16">
              <h3 className="font-display font-bold text-3xl">System Capability <span className="text-zinc-600 italic">Comparison</span></h3>
           </div>
           <div className="glass rounded-[3rem] border border-white/5 overflow-hidden">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                       <th className="p-8 text-xs font-bold text-zinc-500 uppercase tracking-widest">Capability</th>
                        {plans.map(p => (
                          <th key={p.name} className="p-8 text-xs font-black uppercase text-center">
                            <Trademark text={p.name.replace('Infinite AI ', '')} />
                          </th>
                        ))}
                    </tr>
                 </thead>
                 <tbody className="text-sm">
                    {[
                      { key: "Website/Interface", values: ["Static App", "Dynamic Portal", "Custom OS Interface", "White-Label OS"] },
                      { key: "AI Agents", values: ["1 Core", "3 Coordinated", "10+ Predictive", "Unlimited Adaptive"] },
                      { key: "Intelligence Level", values: ["Standard Intelligence", "Advanced QUANTUM™", "QUANTUM™ Model", "Unified CORE™ Core"] },
                      { key: "Automation", values: ["Transactional", "Workflow-level", "Operational Core", "Deterministic OS"] },
                      { key: "Decision Support", values: ["Standard", "Predictive", "Simulation-driven", "Strategic Mastery"] },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                         <td className="p-8 font-bold text-zinc-400">{row.key}</td>
                         {row.values.map((v, idx) => (
                           <td key={idx} className="p-8 text-center text-zinc-500 text-xs">
                             <Trademark text={v} />
                           </td>
                         ))}
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Reframe Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-32">
           <div className="glass p-12 rounded-[3.5rem] border-white/5 bg-white/[0.01] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <ShieldCheck className="w-12 h-12 text-zinc-800 opacity-20" />
              </div>
              <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-8">You are NOT buying:</h4>
              <ul className="space-y-6">
                 {["A standard static website", "A basic chatbot tool", "A generic one-time project", "Static analytics dashboards"].map(item => (
                   <li key={item} className="flex items-center gap-3 text-zinc-500 line-through decoration-zinc-700 decoration-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" /> {item}
                   </li>
                 ))}
              </ul>
           </div>
           <div className="glass p-12 rounded-[3.5rem] border-primary/20 bg-primary/[0.02] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <Zap className="w-12 h-12 text-primary/10" />
              </div>
              <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-8">You ARE subscribing to:</h4>
              <ul className="space-y-6">
                 {["Autonomous business systems", "AI-driven operational cores", "Continuous system optimization", "Scalable intelligence infrastructure"].map(item => (
                   <li key={item} className="flex items-center gap-3 text-white font-medium">
                      <Check className="w-4 h-4 text-primary" /> {item}
                   </li>
                 ))}
              </ul>
           </div>
        </div>

        {/* Closing & CTA */}
        <div className="text-center py-20 border-t border-white/5 relative">
           <div className="inline-block px-3 py-1 bg-white/5 rounded-lg text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-8">
              THE_SYSTEM_MANDATE
           </div>
           <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="font-display font-bold text-5xl md:text-8xl mb-8 tracking-tighter"
           >
              Investment in Systems, <br />
              <span className="text-zinc-600">Not Expenses.</span>
           </motion.h2>
           <p className="text-zinc-500 mb-16 max-w-xl mx-auto text-lg italic">
              Future-proof your organization through recursive intelligence.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => openCalendly()}
                className="w-full sm:w-auto px-12 py-6 bg-primary text-black font-black text-lg rounded-2xl hover:shadow-neon-strong hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                Choose Your Plan <ArrowRight className="w-6 h-6" />
              </button>
              <button 
                onClick={() => openCalendly()}
                className="w-full sm:w-auto px-12 py-6 glass text-white font-black text-lg rounded-2xl hover:bg-white/10 transition-all"
              >
                Request Custom Consultation
              </button>
           </div>
        </div>
      </div>
    </section>
  );
}
