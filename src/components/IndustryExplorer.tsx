import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, 
  Pickaxe, 
  Factory, 
  Zap, 
  Droplets, 
  HardHat, 
  ShoppingCart, 
  Truck, 
  Utensils, 
  Globe, 
  CreditCard, 
  Building2, 
  Lightbulb, 
  LifeBuoy, 
  ShieldCheck, 
  GraduationCap, 
  HeartPulse, 
  Palmtree, 
  Users, 
  Home, 
  Landmark,
  ArrowRight,
  Search,
  Layout,
  Cpu,
  Workflow,
  Activity,
  X,
  ChevronRight
} from 'lucide-react';

interface Industry {
  id: string;
  section: string;
  title: string;
  icon: React.ReactNode;
  applications: string[];
  outcome: string;
  preview: string;
  color: string;
}

const industries: Industry[] = [
  {
    id: "A",
    section: "Agriculture",
    title: "Agriculture, Forestry & Fishing",
    icon: <Sprout />,
    preview: "Precision cultivation via satellite intelligence and soil modeling.",
    applications: [
      "Dynamic Yield Forecasting",
      "Automated Irrigation Optimization",
      "Livestock Bio-tracking Systems",
      "Soil Nutrient Redistribution Logic"
    ],
    outcome: "22% reduction in water waste; 18% increase in crop yield consistency.",
    color: "emerald"
  },
  {
    id: "B",
    section: "Mining",
    title: "Mining and Quarrying",
    icon: <Pickaxe />,
    preview: "Autonomous resource extraction and subterranean modeling.",
    applications: [
      "Predictive Equipment Maintenance",
      "Subterranean Resource Mapping",
      "Autonomous Haulage Coordination",
      "Worker Safety Monitoring Systems"
    ],
    outcome: "35% decrease in operational downtime; 40% improvement in site safety metrics.",
    color: "amber"
  },
  {
    id: "C",
    section: "Manufacturing",
    title: "Manufacturing",
    icon: <Factory />,
    preview: "Zero-defect production lines and adaptive supply chains.",
    applications: [
      "Computer Vision Quality Inspection",
      "Real-time Inventory Rebalancing",
      "Digital Twin Factory Simulation",
      "Generative Product Design Systems"
    ],
    outcome: "99.9% defect detection; 15% reduction in total manufacturing cost.",
    color: "slate"
  },
  {
    id: "D",
    section: "Energy",
    title: "Electricity, Gas, Steam & Air",
    icon: <Zap />,
    preview: "Smart grid management and predictive load balancing.",
    applications: [
      "Grid Stability Guardrails",
      "Renewable Energy Integration Logic",
      "Predictive Load Forecasting",
      "Infrastructural Anomaly Detection"
    ],
    outcome: "12% reduction in peak load stress; 25% faster outage recovery.",
    color: "yellow"
  },
  {
    id: "E",
    section: "Water/Waste",
    title: "Water & Waste Management",
    icon: <Droplets />,
    preview: "Deterministic leak detection and waste recycling logic.",
    applications: [
      "Autonomous Leak Localization",
      "Water Quality Monitoring Nodes",
      "Recycling Sorting Vision Systems",
      "Sewerage Flow Optimization"
    ],
    outcome: "30% reduction in non-revenue water loss; 20% higher recycling purity.",
    color: "blue"
  },
  {
    id: "F",
    section: "Construction",
    title: "Construction",
    icon: <HardHat />,
    preview: "BIM-integrated scheduling and structural integrity modeling.",
    applications: [
      "Automated Site Progress Tracking",
      "Safety Protocol Verification",
      "Structural Stress Simulation",
      "Resource Allocation Coordination"
    ],
    outcome: "15% faster project completion; 25% reduction in material waste.",
    color: "orange"
  },
  {
    id: "G",
    section: "Trade",
    title: "Wholesale & Retail Trade",
    icon: <ShoppingCart />,
    preview: "Hyper-personalized commerce and intelligent stock systems.",
    applications: [
      "Demand Prediction Engines",
      "Dynamic Pricing Architectures",
      "Automated Stock Replenishment",
      "Customer Intent Modeling"
    ],
    outcome: "18% increase in GMV; 40% reduction in overstock inventory.",
    color: "cyan"
  },
  {
    id: "H",
    section: "Logistics",
    title: "Transportation and Storage",
    icon: <Truck />,
    preview: "Autonomous routing and multi-modal logistics cores.",
    applications: [
      "Dynamic Route Optimization",
      "Port Terminal Automation",
      "Warehouse Robotics Coordination",
      "Last-mile Efficiency Modeling"
    ],
    outcome: "12% reduction in fuel costs; 20% improvement in delivery timelines.",
    color: "indigo"
  },
  {
    id: "I",
    section: "Hospitality",
    title: "Accommodation & Food Service",
    icon: <Utensils />,
    preview: "Smart guest personalization and waste-free kitchens.",
    applications: [
      "Guest Preference Intelligence",
      "Automated Room Inventory Management",
      "Food Waste Reduction Engines",
      "Dynamic Labor Scheduling"
    ],
    outcome: "15% increase in guest LTV; 22% reduction in kitchen operational cost.",
    color: "rose"
  },
  {
    id: "J",
    section: "ICT",
    title: "Information and Communication",
    icon: <Globe />,
    preview: "Self-healing networks and intent-based compute.",
    applications: [
      "Network Traffic Coordination",
      "Automated Threat Mitigation",
      "Cloud Cost Attribution Systems",
      "Edge Computing Logic Layer"
    ],
    outcome: "99.999% uptime via self-healing; 30% reduction in cloud wastage.",
    color: "sky"
  },
  {
    id: "K",
    section: "Finance",
    title: "Financial & Insurance",
    icon: <CreditCard />,
    preview: "Algorithmic risk mitigation and predictive fraud cores.",
    applications: [
      "Real-time Fraud Detection",
      "Algorithmic Risk Assessment",
      "Autonomous Claims Processing",
      "Personalized Wealth Modeling"
    ],
    outcome: "₹1Cr+ saved in daily fraud prevention; 50% faster claims handling.",
    color: "emerald"
  },
  {
    id: "L",
    section: "Real Estate",
    title: "Real Estate Activities",
    icon: <Building2 />,
    preview: "Portfolio valuation modeling and smart building logic.",
    applications: [
      "Predictive Asset Valuation",
      "Building Energy Efficiency Nodes",
      "Tenant Behavior Modeling",
      "Portfolio Lifecycle Optimization"
    ],
    outcome: "10% increase in yield; 30% reduction in facility management cost.",
    color: "violet"
  },
  {
    id: "M",
    section: "Tech Services",
    title: "Professional & Scientific",
    icon: <Lightbulb />,
    preview: "Scientific discovery acceleration and technical R&D modeling.",
    applications: [
      "R&D Data Synthesis",
      "Automated Legal Document Analysis",
      "Complex Engineering Simulation",
      "Strategic Business Modeling"
    ],
    outcome: "40% faster R&D cycles; 60% reduction in repetitive technical labor.",
    color: "fuchsia"
  },
  {
    id: "N",
    section: "Support",
    title: "Admin & Support Services",
    icon: <LifeBuoy />,
    preview: "Autonomous business process outsourcing and clerical logic.",
    applications: [
      "Business Process Automation",
      "Automated Customer Ticketing",
      "Fleet Management Logic",
      "Temporary Resource Coordination"
    ],
    outcome: "70% ticket resolution at first touch; 25% higher resource utilization.",
    color: "teal"
  },
  {
    id: "O",
    section: "Gov & Defence",
    title: "Public Admin & Defence",
    icon: <ShieldCheck />,
    preview: "Secure civil infrastructure and defense simulation.",
    applications: [
      "Urban Planning Simulations",
      "Public Resource Distribution Logic",
      "Emergency Response Coordination",
      "Cyberspace Defense Guardrails"
    ],
    outcome: "20% more efficient disaster response; 40% enhanced cyber posture.",
    color: "blue"
  },
  {
    id: "P",
    section: "Education",
    title: "Education",
    icon: <GraduationCap />,
    preview: "Adaptive learning pathways and institutional intelligence.",
    applications: [
      "Personalized Learning Systems",
      "Student Retention Analytics",
      "Automated Grading & Feedback",
      "Campus Operations Optimization"
    ],
    outcome: "25% improvement in student outcomes; 15% better retention rates.",
    color: "lime"
  },
  {
    id: "Q",
    section: "Healthcare",
    title: "Health & Social Work",
    icon: <HeartPulse />,
    preview: "Predictive diagnostic cores and clinical workflow systems.",
    applications: [
      "Diagnostic Assistance Vision",
      "Patient Flow Optimization",
      "Clinical Trial Synthesis",
      "Pharmaceutical Inventory Sync"
    ],
    outcome: "30% faster diagnosis; 20% reduction in patient wait times.",
    color: "red"
  },
  {
    id: "R",
    section: "Arts",
    title: "Arts & Entertainment",
    icon: <Palmtree />,
    preview: "Immersive content personalization and venue logic.",
    applications: [
      "Algorithmic Content Curation",
      "Venue Crowd Control Systems",
      "Intellectual Property Analysis",
      "Ticketing Price Dynamic Logic"
    ],
    outcome: "50% higher engagement; 20% higher venue profitability.",
    color: "pink"
  },
  {
    id: "S",
    section: "Other Services",
    title: "Other Service Activities",
    icon: <Users />,
    preview: "Membership systems and specialized service automation.",
    applications: [
      "Membership Behavior Analytics",
      "Specialized Repair Coordination",
      "Personal Service Automation",
      "Community Logic Protocols"
    ],
    outcome: "30% reduction in churn; 20% increase in operational throughput.",
    color: "zinc"
  },
  {
    id: "T",
    section: "Households",
    title: "Household Activities",
    icon: <Home />,
    preview: "Hyper-local service matchmaking and resource logic.",
    applications: [
      "Hyper-local Logistics Nodes",
      "Household Service Optimization",
      "Local Labor Matching Logic",
      "Direct-to-consumer Systems"
    ],
    outcome: "40% increase in local employment efficiency; 15% reduction in service cost.",
    color: "orange"
  },
  {
    id: "U",
    section: "Extraterritorial",
    title: "Extraterritorial Organizations",
    icon: <Landmark />,
    preview: "Global coordination and humanitarian distribution systems.",
    applications: [
      "Cross-border Resource Tracking",
      "Humanitarian Logic Networks",
      "Global Policy Simulation",
      "International Coordination Hubs"
    ],
    outcome: "100% transparency in aid distribution; 25% faster global response.",
    color: "purple"
  }
];

const frameworkSteps = [
  { id: 1, title: "Industry Mapping", desc: "We identify the specific NIC alignment and operational logic nodes within your industry." },
  { id: 2, title: "Workflow Structuring", desc: "Deconstructing core processes into deterministic, system-ready components." },
  { id: 3, title: "Data & Knowledge Modeling", desc: "Building the proprietary knowledge base and data ingression protocols." },
  { id: 4, title: "System Configuration", desc: "Deploying autonomous agents and logic cores tailored to your specific goals." },
  { id: 5, title: "Continuous Optimization", desc: "Recursive learning ensures the system evolves as your organization scales." }
];

export function IndustryExplorer() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);  const getColorBase = (color: string) => {
    // Professional technical palette
    return { 
      text: "text-primary", 
      bg: "bg-primary", 
      bg10: "bg-primary/5", 
      border: "border-primary/30", 
      border10: "border-primary/10", 
      border20: "border-primary/20", 
      glow: "via-primary/5" 
    };
  };

  const getColorStyles = (color: string) => {
    const c = getColorBase(color);
    return `text-[var(--color-text)] ${c.border} bg-primary/[0.03]`;
  };

  return (
    <div className="py-20 bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-cyan-500/30 overflow-hidden border-t border-[var(--color-text)]/5 transition-colors duration-1000 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 text-left border-l-4 border-cyan-500 pl-12"
          >
            <div className="text-[11px] font-mono font-black text-cyan-500 uppercase tracking-wider">SYSTEM_ALIGNMENT</div>
            <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.1] italic">
              <span className="text-primary inline-block py-2 pr-4 transition-colors duration-1000">Industries</span> <br /><span className="text-zinc-600 dark:text-zinc-500 transition-colors duration-1000 inline-block py-2 pr-4">We Serve</span>
            </h2>
            <p className="text-xl text-zinc-500 max-w-3xl leading-relaxed italic font-medium transition-colors duration-1000">
              IPDM’s cross-industry system capability allows us to deploy intelligence at the core of any organization, mapping our architectures directly to <span className="text-[var(--color-text)] font-bold transition-colors duration-1000">National Industrial Classification (NIC 2008)</span> standards for full operational integration.
            </p>
          </motion.div>
        </div>

        {/* Global Grid Explorer */}
        <div className="relative mb-20 group">
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 relative z-10">
            {industries.map((item, i) => {
              const colors = getColorBase(item.color);
              return (
                <motion.div
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedIndustry(item)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 7) * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`
                    p-6 rounded-2xl border cursor-pointer transition-all flex flex-col items-center gap-4 text-center relative overflow-hidden group
                    ${hoveredId === item.id ? getColorStyles(item.color) : `${colors.border10} bg-[var(--color-text)]/[0.02]`}
                  `}
                >
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500
                    ${hoveredId === item.id ? `bg-primary text-black` : `bg-primary/10 text-primary`}
                  `}
                  >
                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
                  </div>
                  <div className={`text-[11px] font-mono font-bold tracking-wider uppercase transition-colors ${
                    hoveredId === item.id ? 'text-primary' : 'text-zinc-600'
                  }`}>SECTION_{item.id}</div>
                  <h3 className={`text-[13px] font-bold font-display uppercase tracking-tight line-clamp-2 leading-[1.1] transition-colors ${
                    hoveredId === item.id ? 'text-primary' : 'text-[var(--color-text)]'
                  }`}>{item.section}</h3>
                  
                  {/* Subtle Accent instead of bright glow */}
                  <div className={`absolute inset-x-0 bottom-0 h-[2px] bg-primary opacity-0 group-hover:opacity-30 transition-opacity`} />
                </motion.div>
              );
            })}
          </div>

          {/* Quick Preview Tooltipish area */}
          <AnimatePresence>
            {hoveredId && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full max-w-xl text-center hidden md:block"
              >
                <div className="glass px-6 py-3 rounded-full border-cyan-500/20 text-xs text-zinc-400 italic">
                  &quot;{industries.find(i => i.id === hoveredId)?.preview}&quot;
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Adaptation Framework */}
        <div className="mb-24">
          <div className="mb-8">
            <h3 className="font-display font-bold text-3xl mb-2"><span className="text-secondary italic">Industry Adaptation</span> <span className="text-zinc-600 italic">Framework</span></h3>
            <p className="text-zinc-500 text-sm">How we scale capability across different domains.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
             {frameworkSteps.map((step, i) => (
                <div key={i} className="flex flex-col gap-6 group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center text-cyan-500/50 font-mono font-bold transition-all group-hover:text-cyan-500 group-hover:border-cyan-500/30">
                         0{step.id}
                      </div>
                      <div className="h-px flex-1 bg-[var(--color-text)]/5 hidden md:block" />
                   </div>
                   <div className="space-y-3">
                      <h4 className="font-bold text-lg group-hover:text-gradient-primary transition-colors uppercase tracking-tight font-display text-[var(--color-text)]">
                        {step.title}
                      </h4>
                      <p className="text-xs text-zinc-500 leading-relaxed font-medium">{step.desc}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* Cross-Industry & Specialization */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
           <div className="glass p-12 rounded-[3rem] border-[var(--color-text)]/5 relative overflow-hidden group hover:border-cyan-500/10 transition-all bg-[var(--color-text)]/[0.005]">
              <div className="absolute top-0 right-0 p-8 text-[var(--color-text)] text-6xl font-display font-black leading-none opacity-5 pointer-events-none">HYBRID</div>
              <h3 className="text-2xl font-bold font-display mb-8">Cross-Industry <span className="text-cyan-500 italic">Core</span></h3>
              <div className="space-y-6">
                 {[
                   { combo: "BFSI + Tech", desc: "Algorithmic decision engines mapped to financial logic and secure compute layers." },
                   { combo: "Real Estate + Finance", desc: "Asset valuation systems integrated with dynamic capital modeling nodes." },
                   { combo: "Manufacturing + Logistics", desc: "The 'Invisible Supply Chain' — synced production and distribution cores." }
                 ].map((c, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-500" />
                       <div>
                          <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">{c.combo}</div>
                          <p className="text-xs text-zinc-500 mt-1">{c.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="glass p-12 rounded-[3.5rem] border-cyan-400/10 bg-cyan-400/[0.005] relative overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
              <h3 className="text-2xl font-bold font-display mb-6">Why <span className="text-cyan-500">NIC Alignment?</span></h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8 pr-12">
                 Operating at a system level requires precise taxonomy. By aligning our architectures with NIC 2008 standards, we ensure that Infinite Potential systems are compliant, compatible, and ready for deployment in any regulated or structured environment globally.
              </p>
              <div className="flex flex-wrap gap-3">
                 {["Inter-system Sync", "Global Compliance", "Precise Mapping", "Deterministic Growth"].map(tag => (
                   <span key={tag} className="px-4 py-1.5 glass rounded-full text-[10px] uppercase font-bold text-zinc-400 border-white/10">{tag}</span>
                 ))}
              </div>
           </div>
        </div>

        {/* Closing & CTA */}
        <div className="text-center py-16 border-t border-white/5 relative">
           <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="font-display font-bold text-5xl md:text-7xl mb-12 tracking-tight"
           >
              Every Industry Has Complexity. <br />
              <span className="text-primary transition-all cursor-default">Systems Solve It.</span>
           </motion.h2>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto px-10 py-5 bg-cyan-500/80 text-black font-black text-lg rounded-2xl hover:bg-cyan-500">
                Explore Use Cases <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 glass text-white/80 font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 hover:text-white transition-all">
                View Infinite Potential Systems
              </button>
           </div>
        </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedIndustry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndustry(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              layoutId={`industry-${selectedIndustry.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-4xl glass bg-[var(--color-bg)] border rounded-[3rem] overflow-hidden relative z-10 transition-colors duration-1000"
              style={{ 
                borderColor: `var(--color-${selectedIndustry.color}-500, rgba(6,182,212,0.1))`,
                boxShadow: `0 20px 50px -10px rgba(0,0,0,0.5)`
              }}
            >
              <button 
                onClick={() => setSelectedIndustry(null)}
                className="absolute top-8 right-8 p-3 rounded-full hover:bg-[var(--color-text)]/5 transition-all group"
              >
                <X className="w-6 h-6 text-zinc-500 group-hover:text-[var(--color-text)]" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-[var(--color-text)]/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-primary`}>
                      {React.cloneElement(selectedIndustry.icon as React.ReactElement<any>, { size: 32 })}
                    </div>
                    <div>
                      <div className={`text-[11px] font-mono font-bold tracking-wider uppercase mb-1 text-primary`}>SECTION_{selectedIndustry.id}</div>
                      <h3 className={`text-2xl font-bold font-display uppercase tracking-tight text-primary`}>{selectedIndustry.section}</h3>
                    </div>
                  </div>
                  <h4 className="text-xl text-zinc-500 font-medium leading-relaxed mb-8 pr-12 italic">
                    &quot;{selectedIndustry.preview}&quot;
                  </h4>
                  <div className="space-y-4">
                    <div className="text-[11px] font-mono font-bold text-zinc-600 uppercase tracking-wider">SYSTEM_OUTCOME</div>
                    <div className={`p-6 rounded-2xl border ${getColorBase(selectedIndustry.color).bg10} ${getColorBase(selectedIndustry.color).border20}`}>
                      <p className={`font-bold leading-relaxed ${getColorBase(selectedIndustry.color).text}`}>{selectedIndustry.outcome}</p>
                    </div>
                  </div>
                </div>

                <div className="p-12 md:p-16 bg-[var(--color-text)]/[0.02]">
                  <div className="text-[11px] font-mono font-bold text-zinc-600 uppercase tracking-wider mb-8">DEPLOYED_APPLICATIONS</div>
                  <div className="space-y-6">
                    {selectedIndustry.applications.map((app, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="flex-shrink-0 mt-1">
                          <ChevronRight className={`w-4 h-4 ${getColorBase(selectedIndustry.color).text}`} />
                        </div>
                        <p className={`text-lg text-[var(--color-text)] font-medium group-hover:text-primary transition-colors`}>{app}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-16 pt-8 border-t border-[var(--color-text)]/10">
                     <button className={`w-full py-4 text-black font-black uppercase text-xs tracking-widest rounded-xl transition-all ${getColorBase(selectedIndustry.color).bg}`}>
                        Initialize This Module
                     </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  </div>
);
}
