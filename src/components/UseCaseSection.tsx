import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  MessageSquare, 
  LayoutDashboard, 
  Zap, 
  BarChart3, 
  Globe, 
  ArrowRight, 
  ChevronRight,
  X,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Workflow,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { openMeeting as openCalendly } from '../lib/calendly';
import { Trademark } from './Trademark';

interface UseCase {
  id: number;
  title: string;
  shortDesc: string;
  problem: string;
  solution: string;
  system: string;
  capabilities: string[];
  outcome: string;
  icon: React.ReactNode;
}

const useCases: UseCase[] = [
  {
    id: 1,
    title: "AI Sales & Lead Conversion System",
    shortDesc: "Autonomous sales agents that qualify, nurture, and close deals at scale.",
    problem: "Sales teams were losing 40% of leads due to slow response times and inconsistent follow-up quality.",
    solution: "Deployed Infinite ARCHIVE™ to coordinate specialized sales agents across email, chat, and CRM channels.",
    system: "Infinite ARCHIVE™ + QUANTUM™",
    capabilities: [
      "Instant multi-channel lead qualification",
      "Dynamic objection handling via QUANTUM™ core",
      "Automated appointment scheduling logic",
      "Real-time sentiment and intent analysis"
    ],
    outcome: "280% increase in lead-to-meeting conversion rate; 60% reduction in customer acquisition cost (CAC).",
    icon: <Target />
  },
  {
    id: 2,
    title: "Customer Support & Interaction System",
    shortDesc: "Deterministic support agents that resolve 90%+ of queries without human friction.",
    problem: "Skyrocketing support tickets were causing high churn and overwhelming human support resources.",
    solution: "Integrated Infinite CORE™ with a custom QUANTUM™ knowledge base to handle 1st and 2nd level support logic.",
    system: "Infinite CORE™ + QUANTUM™ Knowledge Core",
    capabilities: [
      "Zero-latency multi-lingual query resolution",
      "Proprietary knowledge base synchronization",
      "Automated complex ticket escalation logic",
      "Sentiment-driven adaptive UI interfaces"
    ],
    outcome: "92% first-touch resolution rate; 45% improvement in overall Customer Satisfaction (CSAT) scores.",
    icon: <MessageSquare />
  },
  {
    id: 3,
    title: "Lead Intelligence & Decision Dashboard",
    shortDesc: "High-fidelity intelligence layers that predict lead value and optimal engagement paths.",
    problem: "Marketing spend was opaque with no clear visibility into which segments drove highest LTV.",
    solution: "Built a custom Decision Intelligence layer using Infinite QUANTUM™ for predictive revenue modeling.",
    system: "Infinite QUANTUM™ Modeling Core",
    capabilities: [
      "Predictive Lead Lifetime Value (LTV) scoring",
      "Channel attribution modeling via Bayesian logic",
      "Real-time marketing spend optimization nodes",
      "Strategic decision recommendation engine"
    ],
    outcome: "35% increase in marketing ROI; Absolute clarity on high-impact revenue levers.",
    icon: <LayoutDashboard />
  },
  {
    id: 4,
    title: "Workflow Automation & Operations Optimization",
    shortDesc: "Closing the 'Update Gap' by automating core back-office and operational workflows.",
    problem: "Manual data entry and fragmented processes were leaking 15% of operational efficiency daily.",
    solution: "Deployed task-specific agents within an ARCHIVE™ framework to handle end-to-end data pipelines.",
    system: "Infinite ARCHIVE™ + System Adapters",
    capabilities: [
      "Autonomous cross-platform data synchronization",
      "Deterministic verification of operational outputs",
      "Real-time bottleneck identification logic",
      "Zero-human-friction supply chain coordination"
    ],
    outcome: "90% reduction in manual operational tasks; Zero data discrepancy across enterprise systems.",
    icon: <Zap />
  },
  {
    id: 5,
    title: "Decision Intelligence & Financial Modeling",
    shortDesc: "Deterministic financial simulations that stress-test strategic moves before capital deployment.",
    problem: "Board-level decisions were being made based on static spreadsheets and intuitive 'best guesses'.",
    solution: "Implemented Infinite QUANTUM™ to simulate strategic outcomes across 100k+ market variables.",
    system: "Infinite QUANTUM™ + Strategic Operating Logic",
    capabilities: [
      "Full-spectrum capital allocation simulation",
      "Real-time market volatility stress-testing",
      "Automated risk mitigation logic pathways",
      "Quantitative verification of strategic ROI"
    ],
    outcome: "Zero strategic failures since deployment; 22% higher capital utilization efficiency.",
    icon: <BarChart3 />
  },
  {
    id: 6,
    title: "End-to-End Business Operating System",
    shortDesc: "The ultimate autonomous enterprise layer, unifying all business functions under intelligence.",
    problem: "A fragmented organization with disconnected systems lacked a single 'Source of Truth' and unified logic.",
    solution: "Full-scale deployment of Infinite CORE™ as the central Business OS, orchestrating all agents.",
    system: "Infinite CORE™ Unified Platform",
    capabilities: [
      "Unified organizational logic coordination",
      "Real-time cross-departmental data transparency",
      "Autonomous coordination of all system nodes",
      "Scalable infrastructure for continuous AI evolution"
    ],
    outcome: "40% increase in total organizational throughput; Complete visibility at the executive layer.",
    icon: <Globe />
  }
];

export function UseCaseSection() {
  const [selectedCase, setSelectedCase] = useState<UseCase | null>(null);

  const steps = [
    { label: "Identify Bottleneck", desc: "Mapping core logic gaps." },
    { label: "Design System", desc: "Architecting the logic core." },
    { label: "Deploy AI + Workflows", desc: "Live system integration." },
    { label: "Measure Outcomes", desc: "Deterministic result tracking." },
    { label: "Optimize", desc: "Recursive system learning." }
  ];

  return (
    <section className="py-24 bg-black text-white selection:bg-cyan-500/30 overflow-hidden relative">
      {/* Visual background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             <h2 className="font-display font-bold text-4xl md:text-6xl mb-6 tracking-tight">
               How Infinite Potential Systems Perform in <span className="text-zinc-600">Real Business Environments</span>
             </h2>
             <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
               Each Infinite Potential system is designed to solve specific, high-impact business problems with measurable outcomes.
             </p>
          </motion.div>
        </div>

        {/* 3-Step Visual Flow */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold text-primary uppercase tracking-[0.4em]">SYSTEM_PIPELINE</span>
            <h3 className="font-display font-bold text-2xl mt-2">From Problem → System → Outcome</h3>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
            {[
              { label: "High-Impact Problem", desc: "Identification of a critical operational or strategic bottleneck.", color: "text-red-400", icon: <AlertCircle /> },
              { label: "Infinite Potential System", desc: <span>Deployment of custom <Trademark text="QUANTUM™ or ARCHIVE™" /> architectures.</span>, color: "text-primary", icon: <Cpu /> },
              { label: "Measurable Outcome", desc: "Deterministic business results verified by data intelligence.", color: "text-emerald-400", icon: <CheckCircle2 /> }
            ].map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex-1 glass p-8 rounded-3xl border-white/5 text-center flex flex-col items-center gap-4 relative">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${step.color}`}>
                     {step.icon}
                  </div>
                  <h4 className={`font-bold font-display ${step.color}`}>{step.label}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {typeof step.desc === 'string' ? <Trademark text={step.desc} /> : step.desc}
                  </p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block text-zinc-800">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Use Case Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
           {useCases.map((useCase) => (
             <motion.div
               key={useCase.id}
               onClick={() => setSelectedCase(useCase)}
               whileHover={{ y: -8, scale: 1.02 }}
               className="glass p-8 rounded-[2.5rem] border-white/5 cursor-pointer group hover:border-primary/30 hover:bg-white/[0.03] transition-all relative overflow-hidden flex flex-col"
             >
                <div className="absolute top-0 right-0 p-8 text-primary/5 text-6xl font-display font-black leading-none group-hover:text-primary/10 transition-colors">0{useCase.id}</div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black transition-all">
                   {React.cloneElement(useCase.icon as React.ReactElement<any>, { size: 24 })}
                </div>
                <h3 className="text-xl font-bold font-display mb-4 pr-12 group-hover:text-primary transition-colors">
                  <Trademark text={useCase.title} />
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-8 flex-1">
                  <Trademark text={useCase.shortDesc} />
                </p>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-600 uppercase tracking-widest group-hover:text-white transition-colors">
                  View Full Case Analysis <ChevronRight className="w-4 h-4" />
                </div>
             </motion.div>
           ))}
        </div>

        {/* Step-based Flow: How to read use cases */}
        <div className="mb-32 py-20 border-y border-white/5 bg-zinc-950/20">
           <div className="max-w-5xl mx-auto">
              <h3 className="font-display font-bold text-3xl mb-12 text-center">How We Construct <span className="text-primary italic">Success</span></h3>
              <div className="grid md:grid-cols-5 gap-4">
                 {steps.map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-4 group">
                       <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary font-mono text-sm bg-primary/5 group-hover:bg-primary group-hover:text-black transition-all">
                          {i+1}
                       </div>
                       <div>
                          <p className="text-xs font-bold uppercase tracking-tight text-white">{step.label}</p>
                          <p className="text-[10px] text-zinc-500 mt-1">{step.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Before vs After Comparison */}
        <div className="mb-32">
           <div className="text-center mb-16">
              <h3 className="font-display font-bold text-3xl">The Architecture of <span className="text-primary italic">Change</span></h3>
           </div>
           <div className="max-w-4xl mx-auto glass rounded-[3rem] border border-white/5 overflow-hidden">
              <div className="grid md:grid-cols-2">
                 <div className="p-12 border-b md:border-b-0 md:border-r border-white/10 opacity-60">
                    <h4 className="text-zinc-600 font-display font-bold text-xl uppercase mb-8 tracking-widest">Before Infinite Potential</h4>
                    <ul className="space-y-6">
                       {[
                         "Opinion-based decision making",
                         "Leaking operational efficiency",
                         "Fragmented system logic",
                         "Manual cognitive overhead",
                         "Linear scaling constraints"
                       ].map((item, i) => (
                         <li key={i} className="flex gap-3 text-sm text-zinc-500">
                           <span className="text-red-500 font-bold">×</span> {item}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="p-12 bg-primary/[0.02]">
                    <h4 className="text-primary font-display font-bold text-xl uppercase mb-8 tracking-widest">After Infinite Potential</h4>
                    <ul className="space-y-6">
                       {[
                         "Model-driven strategic certainty",
                         "Deterministic workflow integrity",
                         "Unified system orchestrator",
                         "Autonomous logic execution",
                         "Exponential capability growth"
                       ].map((item, i) => (
                         <li key={i} className="flex gap-3 text-sm text-white/90">
                           <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /> {item}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </div>

        {/* Closing & CTA */}
        <div className="text-center py-20 border-t border-white/5">
           <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-4xl md:text-7xl mb-8 leading-tight tracking-tighter"
           >
              Systems That Deliver <span className="text-primary">Outcomes,</span> <br />
              Not Just <span className="text-zinc-600">Capabilities.</span>
           </motion.h2>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              <button 
                onClick={() => openCalendly()}
                className="w-full sm:w-auto px-10 py-5 bg-primary text-black font-black text-lg rounded-2xl hover:shadow-neon-strong hover:-translate-y-1 transition-all"
              >
                Explore Infinite Potential Systems
              </button>
              <button 
                onClick={() => openCalendly()}
                className="w-full sm:w-auto px-10 py-5 glass text-white font-black text-lg rounded-2xl hover:bg-white/10 transition-all"
              >
                Request a Consultation
              </button>
           </div>
        </div>
      </div>

      {/* Side Panel / Modal for Detailed Case Analysis */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-end p-0 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-3xl h-full md:h-[90vh] glass-dark bg-zinc-950 border-l border-primary/20 p-8 md:p-16 relative z-10 overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedCase(null)}
                className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/5 transition-all text-zinc-500 hover:text-white"
              >
                <X size={32} />
              </button>

              <div className="mb-12">
                <div className="w-16 h-16 rounded-2xl bg-primary text-black flex items-center justify-center mb-8">
                  {React.cloneElement(selectedCase.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h2 className="font-display font-bold text-4xl mb-2">
                  <Trademark text={selectedCase.title} />
                </h2>
                <div className="text-xs font-mono font-bold text-primary uppercase tracking-[0.3em] mb-8">
                   CORE_SYSTEM: <Trademark text={selectedCase.system} />
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-widest mb-4">
                     <AlertCircle size={14} /> THE_PROBLEM
                  </h4>
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    <Trademark text={selectedCase.problem} />
                  </p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-4">
                     <Cpu size={14} /> THE_SOLUTION
                  </h4>
                  <p className="text-white leading-relaxed text-lg">
                    <Trademark text={selectedCase.solution} />
                  </p>
                </div>

                <div>
                   <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest mb-6">
                      <Workflow size={14} /> SYSTEM_CAPABILITIES
                   </h4>
                   <div className="grid sm:grid-cols-2 gap-4">
                      {selectedCase.capabilities.map((cap, i) => (
                        <div key={i} className="glass p-4 rounded-xl border-white/5 flex gap-3 items-start">
                           <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                           <p className="text-xs text-zinc-300">
                             <Trademark text={cap} />
                           </p>
                        </div>
                      ))}
                   </div>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-4">
                     <TrendingUp size={14} /> MEASURED_OUTCOME
                  </h4>
                  <div className="p-8 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                    <p className="text-emerald-400 font-bold text-2xl leading-tight">
                      <Trademark text={selectedCase.outcome} />
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-20 pt-10 border-t border-white/5">
                 <button 
                   onClick={() => openCalendly()}
                   className="w-full py-5 bg-primary text-black font-black uppercase text-sm tracking-[0.2em] rounded-2xl hover:shadow-neon transition-all"
                 >
                    Initialize Similar System Architecture
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Search(props: any) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
