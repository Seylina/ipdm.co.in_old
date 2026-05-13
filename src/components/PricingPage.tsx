import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight,
  Zap,
  X,
  FileDown,
  MessageSquare
} from "lucide-react";
import React, { useState } from "react";
import { openMeeting as openCalendly } from "../lib/calendly";

import { Trademark } from "./Trademark";

const colorMap: Record<string, { text: string, bg: string, border: string, glow: string }> = {
  blue: { text: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", glow: "shadow-[0_0_20px_rgba(96,165,250,0.2)]" },
  sky: { text: "text-sky-300", bg: "bg-sky-300/10", border: "border-sky-300/20", glow: "shadow-[0_0_20px_rgba(125,211,252,0.2)]" },
  indigo: { text: "text-indigo-400", bg: "bg-indigo-400/10", border: "border-indigo-400/20", glow: "shadow-[0_0_20px_rgba(129,140,248,0.2)]" },
  zinc: { text: "text-zinc-400", bg: "bg-zinc-400/10", border: "border-zinc-400/20", glow: "shadow-[0_0_20px_rgba(161,161,170,0.2)]" },
};

const plans = [
  { 
    id: 0,
    name: "IPDM AI Launchpad™", 
    pos: "Foundational System", 
    best: "Startups & early-stage businesses", 
    styles: colorMap.blue,
    code: "LAUNCHPAD",
    tagline: "Your First Intelligent Business Interface",
    bestForList: ["Startups", "Solopreneurs", "Local and early-stage businesses"],
    price: "₹10,000",
    commitment: "12 months",
    interface: ["4–5 page structured website", "Conversion-focused design", "Mobile-first architecture"],
    aiSystem: ["IPDM QUANTUM™ (1 AI Agent)", "Sales or support intelligence", "24×7 website interaction"],
    outcome: "A functional AI-enabled digital presence that engages visitors, captures leads, and operates continuously.",
    capabilities: ["Basic lead qualification", "Enquiry capture and routing", "Structured business communication"],
    insights: ["Lead tracking dashboard", "Basic interaction visibility"],
    delivery: "4–8 Weeks",
    impact: "24/7 Ops + Lead Capture"
  },
  { 
    id: 1,
    name: "IPDM AI Growth Engine™", 
    pos: "Revenue & Engagement System", 
    best: "Scaling businesses", 
    styles: colorMap.sky,
    code: "GROWTH",
    tagline: "A Revenue & Engagement System",
    bestForList: ["SMEs", "Service businesses", "Growth-stage companies"],
    price: "₹30,000",
    commitment: "12 months",
    interface: ["8–10 page funnel-based website", "Conversion-optimized architecture", "Structured customer journey"],
    aiSystemDetails: [
      { name: "IPDM QUANTUM™ (Advanced)" },
      { 
        name: "IPDM ARCHIVE™ (4 AI Agents)", 
        sub: ["Sales", "Support", "Lead Qualification", "Knowledge"] 
      }
    ],
    outcome: "A system that improves conversion, structures lead flow, and enhances engagement.",
    capabilities: ["Intelligent lead scoring (hot/warm/cold)", "Structured enquiry handling", "Multi-language support"],
    insights: ["Advanced lead dashboard", "Conversion tracking", "Performance visibility"],
    growth: ["CRM integration", "AI-driven content suggestions"],
    delivery: "8–10 Weeks",
    impact: "Conversion + Qualified leads"
  },
  { 
    id: 2,
    name: "IPDM AI Scale System™", 
    pos: "Operational Intelligence System", 
    best: "Multi-service companies", 
    styles: colorMap.indigo,
    code: "SCALE",
    tagline: "Operational Intelligence for Scaling Businesses",
    bestForList: ["Multi-service companies", "High-growth businesses", "Operationally complex organizations"],
    price: "₹75,000",
    commitment: "12 months",
    interface: ["Fully custom UX/UI", "Multi-funnel architecture", "Advanced navigation systems"],
    aiSystemDetails: [
      { name: "IPDM QUANTUM™ (Deep Intelligence)" },
      { 
        name: "IPDM ARCHIVE™ (6–8 AI Agents)", 
        sub: ["Sales AI", "Support AI", "Lead Qualification AI", "Knowledge AI", "Customer Insight AI", "Conversion Optimization AI"] 
      }
    ],
    outcome: "A system that automates operations, handles high interaction volume, and scales without increasing headcount.",
    capabilities: ["Advanced workflow automation (IPDM FLOW™)", "Multi-agent coordination", "Structured operational workflows"],
    insights: ["Advanced dashboards", "Performance analytics", "Decision-level visibility"],
    delivery: "10–12 Weeks",
    impact: "Scalable Ops without hiring"
  },
  { 
    id: 3,
    name: "IPDM AI Business OS™", 
    pos: "Full Business Operating System", 
    best: "Enterprises", 
    styles: colorMap.blue,
    code: "BUSINESS OS",
    tagline: "A Complete AI-Powered Business Operating System",
    bestForList: ["Enterprises", "Large organizations", "Complex, multi-unit businesses"],
    price: "₹1,50,000 – ₹3,00,000",
    commitment: "12 months",
    interface: ["Multi-business architecture", "Fully custom system design", "Enterprise-grade UX/UI"],
    aiSystem: ["IPDM QUANTUM™ (Enterprise Intelligence)", "IPDM ARCHIVE™ (10+ AI Agents)", "IPDM CORE™ (Business OS Layer)"],
    governance: ["AI usage logs", "Data control systems", "Compliance-ready frameworks"],
    outcome: "A system that operates the business end-to-end, enables strategic decision-making, and supports enterprise-scale growth.",
    capabilities: ["Full system integration", "Enterprise workflow automation", "Decision intelligence (IPDM QUANTUM™)"],
    insights: ["Advanced decision dashboards", "Scenario modeling", "Executive-level visibility"],
    delivery: "Continuous",
    impact: "End-to-End Autonomy"
  }
];

export function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen pt-20 transition-colors duration-1000">
      <section className="py-16 px-6 bg-[var(--color-bg)] relative overflow-hidden transition-colors duration-1000">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none opacity-20" />
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="font-display font-bold text-5xl md:text-7xl mb-8 leading-[1.2] tracking-tighter px-4">
              Subscription-Based <br /><span className="text-gradient-vibrant italic pr-6 inline-block">Intelligent Systems</span>
            </h2>
            <p className="text-xl text-zinc-400 light:text-zinc-600 max-w-3xl mx-auto leading-relaxed transition-colors duration-1000">
              IPDM delivers AI-powered business systems through a structured subscription model—ensuring continuous intelligence, ongoing optimization, and long-term value creation.
            </p>
          </div>

          {/* Core Positioning */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12 items-center">
            <div className="glass p-12 rounded-[3.5rem] border-[var(--color-text)]/10 light:border-black/20 bg-[var(--color-text)]/[0.02] light:bg-black/[0.03] relative overflow-hidden group transition-colors duration-1000">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-3xl font-bold font-display text-[var(--color-text)] mb-10 leading-tight">Not a One-Time Project. <br />A Continuously Evolving System.</h3>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                   <p className="text-xs font-mono font-black text-zinc-600 dark:text-zinc-600 light:text-zinc-800 uppercase tracking-widest mb-6 transition-colors duration-1000">Traditional approaches require:</p>
                   <ul className="space-y-4">
                     {["High upfront investment", "Multiple vendors", "Ongoing maintenance complexity"].map((item, i) => (
                       <li key={i} className="text-zinc-500 light:text-zinc-700 text-sm italic flex items-start gap-2 transition-colors duration-1000">
                          {item}
                       </li>
                     ))}
                   </ul>
                </div>
                <div>
                   <p className="text-xs font-mono font-black text-zinc-600 dark:text-zinc-600 light:text-zinc-800 uppercase tracking-widest mb-6 transition-colors duration-1000">IPDM replaces this with:</p>
                   <ul className="space-y-4">
                     {["Integrated systems", "Predictable monthly investment", "Continuous improvement built-in"].map((item, i) => (
                       <li key={i} className="text-zinc-300 dark:text-zinc-300 light:text-zinc-800 font-bold text-sm flex items-center gap-3 transition-colors duration-1000">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-neon" />
                          {item}
                       </li>
                     ))}
                   </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8 lg:pl-12">
               <div className="glass p-8 rounded-3xl border-primary/10 light:border-primary/30 transition-colors duration-1000">
                  <p className="text-2xl font-display font-bold text-[var(--color-text)] leading-tight transition-colors duration-1000">
                    You are not buying a website or AI tool. <br />
                    <span className="text-primary italic">You are subscribing to a living business system.</span>
                  </p>
               </div>
            </div>
          </div>

          {/* PLANS OVERVIEW */}
          <div className="mb-12">
            <h3 className="text-4xl md:text-5xl font-bold font-display text-[var(--color-text)] mb-12 text-center">Four Levels of System Capability</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, i) => (
                <div key={i} className="glass p-10 rounded-[2.5rem] border-[var(--color-text)]/5 light:border-black/10 hover:border-primary/20 transition-all group flex flex-col justify-between transition-colors duration-1000">
                   <div>
                      <h4 className="text-xl font-bold font-display text-[var(--color-text)] mb-2 leading-tight transition-colors duration-1000">
                        <Trademark text={plan.name} />
                      </h4>
                      <p className={`text-[11px] font-mono font-black uppercase tracking-widest mb-8 ${plan.styles.text}`}>{plan.pos}</p>
                      
                      <div className="pt-6 border-t border-[var(--color-text)]/5 light:border-black/5 transition-all duration-1000">
                         <p className="text-xs text-zinc-500 light:text-zinc-600 uppercase font-mono font-bold tracking-widest mb-3 transition-colors duration-1000">Best For:</p>
                         <p className="text-[var(--color-text)] font-bold leading-tight transition-colors duration-1000">
                           <Trademark text={plan.best} />
                         </p>
                      </div>
                   </div>
                   
                   <div className="mt-12">
                      <button 
                        onClick={() => setSelectedPlan(i)}
                        className="flex items-center gap-2 text-[10px] font-mono font-black text-zinc-500 light:text-zinc-600 group-hover:text-primary dark:group-hover:text-white transition-colors duration-1000"
                      >
                         VIEW_SPECIFICATIONS <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* PLAN DETAILS MODAL */}
          <AnimatePresence>
            {selectedPlan !== null && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedPlan(null)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto glass bg-[var(--color-bg)] border-[var(--color-text)]/10 rounded-[3rem] p-8 md:p-16 transition-colors duration-1000"
                >
                  <button 
                    onClick={() => setSelectedPlan(null)}
                    className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[var(--color-text)]/5 border border-[var(--color-text)]/10 flex items-center justify-center hover:bg-[var(--color-text)]/10 transition-colors duration-1000"
                  >
                    <X className="w-6 h-6 text-[var(--color-text)] transition-colors duration-1000" />
                  </button>

                  <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-4 h-fit">
                      <div className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.4em] mb-6">
                        {String(selectedPlan + 1).padStart(2, '0')}. {plans[selectedPlan].code}
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold font-display text-[var(--color-text)] mb-8 pr-12 transition-colors duration-1000">
                        IPDM <br />
                        <span className="text-gradient-vibrant italic inline-block pr-4">
                          {plans[selectedPlan].name.includes('AI ') ? plans[selectedPlan].name.split('IPDM ')[1] : plans[selectedPlan].name}
                        </span>
                      </h3>
                      
                      <div className="space-y-8">
                        <div>
                           <p className="text-[11px] font-mono font-black text-zinc-600 uppercase tracking-wider mb-3">Positioning</p>
                           <p className="text-[var(--color-text)] font-bold italic text-lg leading-tight transition-colors duration-1000"><Trademark text={plans[selectedPlan].tagline} /></p>
                        </div>
                        <div>
                           <p className="text-[11px] font-mono font-black text-zinc-600 dark:text-zinc-600 light:text-zinc-800 uppercase tracking-wider mb-3 transition-colors duration-1000">Best For</p>
                           <ul className="space-y-2">
                              {plans[selectedPlan].bestForList.map((p, i) => (
                                <li key={i} className="text-zinc-500 dark:text-zinc-500 light:text-zinc-700 text-sm flex items-center gap-4 italic font-medium transition-colors duration-1000">
                                   <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 dark:bg-white/20 light:bg-black/20" />
                                   {p}
                                </li>
                              ))}
                           </ul>
                        </div>
                        
                        <div className="pt-10 border-t border-[var(--color-text)]/5 transition-colors duration-1000">
                           <div className="text-5xl font-display font-bold text-[var(--color-text)] mb-2 leading-none transition-colors duration-1000">
                            {plans[selectedPlan].price}<span className="text-zinc-700 text-lg">{plans[selectedPlan].price.includes('–') ? '' : '/mo'}</span>
                           </div>
                           <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Minimum Commitment: {plans[selectedPlan].commitment}</p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-8 space-y-8">
                      <div className="glass p-12 rounded-[3.5rem] border-blue-400/20 bg-gradient-to-br from-blue-400/10 to-transparent relative overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-12">
                          <div className="space-y-12">
                            <div>
                               <p className="text-blue-400 light:text-blue-600 font-mono font-black text-[10px] uppercase tracking-widest mb-6 transition-colors duration-1000">WHAT YOU GET: INTERFACE</p>
                               <ul className="space-y-3">
                                  {plans[selectedPlan].interface.map((it, i) => (
                                    <li key={i} className="text-zinc-300 dark:text-zinc-300 light:text-zinc-800 font-bold flex items-start gap-4 italic tracking-tight transition-colors duration-1000">
                                       <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 shrink-0" /> <Trademark text={it} />
                                    </li>
                                  ))}
                               </ul>
                            </div>
                            <div>
                               <p className="text-blue-400 light:text-blue-600 font-mono font-black text-[10px] uppercase tracking-widest mb-6 transition-colors duration-1000">AI SYSTEM</p>
                               <ul className="space-y-4">
                                  {plans[selectedPlan].aiSystem ? (
                                    plans[selectedPlan].aiSystem.map((it, i) => (
                                      <li key={i} className="text-zinc-300 dark:text-zinc-300 light:text-zinc-800 font-bold flex items-start gap-4 italic tracking-tight transition-colors duration-1000">
                                         <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 shrink-0" /> <Trademark text={it} />
                                      </li>
                                    ))
                                  ) : (
                                    plans[selectedPlan].aiSystemDetails?.map((it, i) => (
                                      <li key={i} className="text-zinc-300 dark:text-zinc-300 light:text-zinc-800 font-bold flex flex-col gap-4 italic tracking-tight transition-colors duration-1000">
                                        <div className="flex items-start gap-4">
                                          <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 shrink-0" /> <Trademark text={it.name} />
                                        </div>
                                        {it.sub && (
                                          <div className="grid grid-cols-2 gap-x-6 gap-y-2 pl-8 opacity-40 dark:opacity-40 light:opacity-100 text-[11px] font-mono uppercase tracking-widest font-black transition-colors duration-1000">
                                            {it.sub.map((s, si) => <span key={si} className="flex items-center gap-2 transition-colors duration-1000"><div className="w-0.5 h-0.5 rounded-full bg-blue-400" /> <Trademark text={s} /></span>)}
                                          </div>
                                        )}
                                      </li>
                                    ))
                                  )}
                               </ul>
                            </div>
                            {plans[selectedPlan].governance && (
                              <div>
                                <p className="text-blue-400 font-mono font-black text-[10px] uppercase tracking-widest mb-6">GOVERNANCE</p>
                                <ul className="space-y-3">
                                  {plans[selectedPlan].governance.map((it, i) => (
                                    <li key={i} className="text-zinc-300 dark:text-zinc-300 light:text-zinc-800 font-bold flex items-start gap-4 italic tracking-tight transition-colors duration-1000">
                                       <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 shrink-0" /> <Trademark text={it} />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <div className="pt-8 border-t border-[var(--color-text)]/5 transition-colors duration-1000">
                               <p className="text-blue-400 font-mono font-black text-[10px] uppercase tracking-widest mb-4">Outcome</p>
                               <p className="text-[var(--color-text)] font-bold leading-tight italic pr-12 transition-colors duration-1000">"<Trademark text={plans[selectedPlan].outcome} />"</p>
                            </div>
                          </div>
                          <div className="space-y-12">
                            <div>
                               <p className="text-blue-400 light:text-blue-600 font-mono font-black text-[10px] uppercase tracking-widest mb-6 transition-colors duration-1000">CORE CAPABILITIES</p>
                               <ul className="space-y-3">
                                  {plans[selectedPlan].capabilities.map((it, i) => (
                                    <li key={i} className="text-zinc-300 dark:text-zinc-300 light:text-zinc-800 font-bold flex items-start gap-4 italic tracking-tight transition-colors duration-1000">
                                       <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 shrink-0" /> {it}
                                    </li>
                                  ))}
                               </ul>
                            </div>
                            <div>
                               <p className="text-blue-400 light:text-blue-600 font-mono font-black text-[10px] uppercase tracking-widest mb-6 transition-colors duration-1000">INSIGHTS</p>
                               <ul className="space-y-3">
                                  {plans[selectedPlan].insights.map((it, i) => (
                                    <li key={i} className="text-zinc-300 dark:text-zinc-300 light:text-zinc-800 font-bold flex items-start gap-4 italic tracking-tight transition-colors duration-1000">
                                       <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 shrink-0" /> {it}
                                    </li>
                                  ))}
                               </ul>
                            </div>
                            {plans[selectedPlan].growth && (
                              <div>
                                <p className="text-blue-400 font-mono font-black text-[10px] uppercase tracking-widest mb-6">GROWTH ENABLEMENT</p>
                                <ul className="space-y-3 transition-colors duration-1000">
                                  {plans[selectedPlan].growth.map((it, i) => (
                                    <li key={i} className="text-zinc-300 dark:text-zinc-300 light:text-zinc-800 font-bold flex items-start gap-4 italic tracking-tight transition-colors duration-1000">
                                       <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 shrink-0" /> {it}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <div className="grid grid-cols-2 gap-4 pt-4 transition-colors duration-1000">
                               <div className="p-4 rounded-2xl border border-[var(--color-text)]/5 bg-[var(--color-text)]/[0.05] transition-colors duration-1000">
                                  <p className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Delivery</p>
                                  <p className="text-[11px] font-bold text-[var(--color-text)] uppercase tracking-widest transition-colors duration-1000">{plans[selectedPlan].delivery}</p>
                                </div>
                                <div className="p-4 rounded-2xl border border-[var(--color-text)]/5 bg-[var(--color-text)]/[0.05] transition-colors duration-1000">
                                  <p className="text-[10px] font-mono text-zinc-500 uppercase mb-2">Impact</p>
                                  <p className="text-[10px] font-bold text-[var(--color-text)] uppercase leading-tight transition-colors duration-1000">{plans[selectedPlan].impact}</p>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* PLAN COMPARISON */}
          <div className="mt-16 overflow-hidden transition-colors duration-1000">
             <div className="text-center mb-12">
                <h3 className="text-4xl font-bold font-display text-[var(--color-text)] mb-4 transition-colors duration-1000">Plan Comparison (Simplified)</h3>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
             </div>
             <div className="overflow-x-auto pb-8">
                <table className="w-full border-collapse transition-colors duration-1000">
                   <thead>
                      <tr className="border-b border-[var(--color-text)]/10 transition-colors duration-1000">
                         <th className="py-8 px-6 text-left text-[11px] font-mono font-black text-zinc-500 light:text-zinc-700 uppercase tracking-wider transition-colors duration-1000">Capability</th>
                         <th className="py-8 px-6 text-center text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Launchpad</th>
                         <th className="py-8 px-6 text-center text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">Growth</th>
                         <th className="py-8 px-6 text-center text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">Scale</th>
                         <th className="py-8 px-6 text-center text-xs font-mono font-bold text-blue-500 uppercase tracking-widest">Business OS</th>
                      </tr>
                   </thead>
                   <tbody className="text-sm transition-colors duration-1000">
                      {[
                        { label: "Website", vals: ["Basic", "Funnel-based", "Multi-funnel", "Multi-business"] },
                        { label: "AI Agents", vals: ["1", "4", "6–8", "10+"] },
                        { label: "Intelligence Level", vals: ["Foundational", "Advanced", "High", "Enterprise"] },
                        { label: "Lead Handling", vals: ["Basic", "Structured", "Intelligent", "Fully system-driven"] },
                        { label: "Automation", vals: ["Limited", "Moderate", "Advanced", "Full"] },
                        { label: "Decision Support", vals: ["Basic", "Moderate", "Strong", "Advanced"] }
                      ].map((row, ri) => (
                        <tr key={ri} className="border-b border-[var(--color-text)]/5 hover:bg-[var(--color-text)]/[0.02] transition-colors transition-colors duration-1000">
                           <td className="py-8 px-6 font-bold text-zinc-500 light:text-zinc-700 uppercase text-[10px] tracking-widest transition-colors duration-1000">{row.label}</td>
                           {row.vals.map((v, vi) => (
                              <td key={vi} className="py-8 px-6 text-center text-[var(--color-text)] font-medium italic transition-colors duration-1000">{v}</td>
                           ))}
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </div>
      </section>

      {/* Simple Future CTA */}
      <section className="py-24 px-6 text-center overflow-hidden relative">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-accent/20 rounded-full blur-[150px] -z-10"
          />
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-12 tracking-tighter">Ready to Deploy <br /> <span className="text-gradient-vibrant italic inline-block pr-6">Architecture?</span></h2>
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/IPDM_Business_Proposal.pdf';
                link.download = 'IPDM_Business_Proposal.pdf';
                link.click();
              }}
              className="px-12 py-5 bg-primary text-black font-black rounded-2xl hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.5)] transition-all flex items-center gap-4 text-lg uppercase tracking-widest"
            >
              Download Brochure <FileDown className="w-5 h-5" />
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
              className="px-12 py-5 bg-accent text-zinc-950 font-black rounded-2xl hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] transition-all flex items-center gap-4 text-lg uppercase tracking-widest"
            >
              Contact Us <MessageSquare className="w-5 h-5" />
            </button>
          </div>
      </section>
    </div>
  );
}
