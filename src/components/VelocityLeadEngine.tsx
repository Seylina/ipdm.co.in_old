
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Target, 
  Search, 
  Globe, 
  Phone, 
  Mail, 
  Compass, 
  TrendingUp, 
  BarChart3, 
  Cpu, 
  ArrowLeft,
  Loader2,
  Sparkles,
  MapPin,
  Building2,
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Trademark } from "./Trademark";

interface Lead {
  name: string;
  industry: string;
  location: string;
  website?: string;
  contact?: string;
  email?: string;
  phone?: string;
  relevance: string;
  score: number;
  persona: string;
  buyingStage: string;
  urgency: string;
  temperature: string;
  budgetLevel: string;
  authority: string;
}

interface StrategicOverview {
  marketPosition: string;
  competitiveLandscape: string;
  conversionTrigger: string;
  operationalPainPoints: string;
}

interface Analysis {
  currentField: string;
  expansionIndustries: string[];
  strategicRationale: string;
}

export function VelocityLeadEngine({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [overview, setOverview] = useState<StrategicOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeAgent, setActiveAgent] = useState("");

  const agents = [
    "Business Identity AI: Mapping Profile...",
    "Market Intelligence AI: Analyzing Pain Points...",
    "Buyer Persona AI: Identifying Decision Makers...",
    "Sales Intelligence AI: Qualifying Conversion Triggers...",
    "Multi-Agent Synthesis: Finalizing Lead Pipeline..."
  ];

  useEffect(() => {
    let interval: any;
    if (isAnalyzing) {
      let index = 0;
      setActiveAgent(agents[0]);
      interval = setInterval(() => {
        index = (index + 1) % agents.length;
        setActiveAgent(agents[index]);
      }, 3000);
    } else {
      setActiveAgent("");
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleGenerate = async () => {
    if (!input.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setError(null);
    setLeads([]);
    setAnalysis(null);
    setOverview(null);

    try {
      const response = await fetch("/api/velocity/generate-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessDescription: input }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate leads. Please try again.");
      }

      const data = await response.json();
      setAnalysis(data.analysis);
      setLeads(data.leads);
      setOverview(data.strategicOverview);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRunSimulation = () => {
    setIsAnalyzing(true);
    setError(null);
    
    // Simulate high-velocity processing delay
    setTimeout(() => {
      const isBottleCo = input.toLowerCase().includes("bottle") || input.toLowerCase().includes("water");
      
      const mockOverview: StrategicOverview = {
        marketPosition: isBottleCo ? "Customized physical product offering with high brand-alignment potential." : "High-growth service offering in a competitive landscape.",
        competitiveLandscape: isBottleCo ? "Niche premium vendors with focus on sustainable luxury hospitality." : "Broad market with pressure on ROI and operational efficiency.",
        conversionTrigger: isBottleCo ? "Event-based procurement cycles and seasonal menu refreshes." : "Budget cycle alignment and pain-point identification.",
        operationalPainPoints: isBottleCo ? "Logistics coordination and design approval bottlenecks." : "Scalability hurdles and manual oversight."
      };

      const mockAnalysis: Analysis = {
        currentField: isBottleCo ? "Customized Hospitality Solutions" : "General Business Services",
        expansionIndustries: isBottleCo ? ["Boutique Hotels", "Event Caterers", "Luxury Cafes", "Corporate Gifting"] : ["Enterprise SaaS", "E-commerce", "Fintech"],
        strategicRationale: "Targeting high-traffic recurring buyers who prioritize brand consistency and guest experience over pure cost efficiency."
      };

      const mockLeads: Lead[] = isBottleCo ? [
        {
          name: "The Ritz-Carlton Residency",
          industry: "Luxury Hospitality",
          location: "Global / Regional HQ",
          website: "https://www.ritzcarlton.com",
          contact: "Procurement Director",
          phone: "+1-800-SPEC-HOTEL",
          relevance: "High-volume guest room refreshment and VIP amenity branding.",
          score: 94,
          persona: "Procurement Head",
          buyingStage: "Evaluation",
          urgency: "High",
          temperature: "Hot",
          budgetLevel: "Enterprise",
          authority: "CXO"
        },
        {
          name: "Blue Bottle Coffee Elite",
          industry: "Premium Cafe Chain",
          location: "San Francisco / Tokyo",
          website: "https://bluebottlecoffee.com",
          contact: "Marketing Manager",
          email: "brand@bluebottle.com",
          relevance: "Limited-edition retail merchandise and in-cafe premium service.",
          score: 88,
          persona: "Marketing Head",
          buyingStage: "Research",
          urgency: "Medium",
          temperature: "Warm",
          budgetLevel: "Medium",
          authority: "Manager"
        },
        {
          name: "Elegant Events Catering",
          industry: "Event Management",
          location: "New York, NY",
          contact: "Operations Lead",
          relevance: "Bulk recurring orders for high-profile wedding and corporate circuits.",
          score: 91,
          persona: "Operations Manager",
          buyingStage: "Purchase",
          urgency: "High",
          temperature: "Hot",
          budgetLevel: "Medium",
          authority: "Founder"
        }
      ] : [];

      setOverview(mockOverview);
      setAnalysis(mockAnalysis);
      setLeads(mockLeads);
      setIsAnalyzing(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col font-sans transition-colors duration-1000">
      {/* Header HUD */}
      <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-3xl flex items-center justify-between px-8 sticky top-0 z-[60]">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('ecosystem')}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-display font-black italic tracking-widest text-white group cursor-default">
              <Trademark text="VELOCITY™" />
            </h1>
            <span className="text-[12px] font-mono text-primary font-bold uppercase tracking-wider">Lead Generation Engine</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
            <div className="hidden lg:flex gap-8 items-center border-l border-white/5 pl-8 text-right">
               <div>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Throughput</p>
                  <p className="text-[10px] font-bold text-primary tracking-widest uppercase">EXTREME_PARITY</p>
               </div>
               <div>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Conversion</p>
                  <p className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">PEAK_PERFORMANCE</p>
               </div>
            </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-12 space-y-12">
        {/* Input Section */}
        <section className="relative z-10">
           <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 glass shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Zap size={120} className="text-primary" />
              </div>
              
              <div className="max-w-2xl">
                 <h2 className="text-3xl font-display font-bold italic text-white mb-4">Initialize Demand Search</h2>
                 <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-medium">
                    Enter your business domain, website, or a brief description of what you do. Velocity will analyze your market position and identify high-value lead opportunities.
                 </p>

                 <div className="relative group">
                    <textarea 
                       value={input}
                       onChange={(e) => setInput(e.target.value)}
                       placeholder="Example: My client owns a water customized bottle company. They are looking for potential clients from restaurants, hotels, cafes, and caterers..."
                       className="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 min-h-[120px] text-zinc-300 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all text-sm leading-relaxed"
                    />
                    <button 
                       onClick={handleGenerate}
                       disabled={!input.trim() || isAnalyzing}
                       className="absolute bottom-4 right-4 px-8 py-3 bg-primary text-black font-black rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-neon disabled:opacity-30 disabled:hover:scale-100"
                    >
                       {isAnalyzing ? (
                         <div className="flex flex-col items-center gap-3">
                           <Loader2 className="w-5 h-5 animate-spin text-primary" />
                           <motion.span 
                             key={activeAgent}
                             initial={{ opacity: 0, y: 5 }}
                             animate={{ opacity: 1, y: 0 }}
                             className="text-[10px] uppercase tracking-widest text-primary font-black"
                           >
                              {activeAgent}
                           </motion.span>
                         </div>
                       ) : (
                         <>
                           <Sparkles className="w-4 h-4" />
                           <span className="text-[11px] uppercase tracking-wider">Generate Pipeline</span>
                         </>
                       )}
                    </button>
                 </div>
              </div>

              {error && (
                <div className={`mt-6 p-6 border rounded-[2rem] glass flex flex-col gap-3 ${
                  error.includes("QUOTA") || error.includes("429") 
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-200" 
                    : "bg-red-500/10 border-red-500/30 text-red-200"
                }`}>
                   <div className="flex items-center gap-3">
                      <ShieldCheck className={error.includes("QUOTA") ? "text-amber-500" : "text-red-500"} size={20} />
                      <h4 className="font-display font-bold uppercase tracking-[0.1em]">Engine Status: {error.includes("QUOTA") ? "RESOURCE_LIMIT" : "EXECUTION_ERROR"}</h4>
                   </div>
                   <p className="text-xs font-medium leading-relaxed opacity-80 pl-8">
                      {error}
                   </p>
                   {error.includes("QUOTA") && (
                     <div className="pl-8 mt-2 flex gap-4">
                        <button 
                          onClick={handleGenerate}
                          className="px-6 py-2 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform"
                        >
                          Retry Generator
                        </button>
                        <button 
                          onClick={handleRunSimulation}
                          className="px-6 py-2 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/20 transition-all border border-white/10"
                        >
                          Run Strategy Simulation
                        </button>
                     </div>
                   )}
                </div>
              )}
           </div>
        </section>

        <AnimatePresence mode="wait">
          {(analysis || isAnalyzing) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Strategic Insights */}
              {overview && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 glass">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2 italic">Market Position</p>
                    <p className="text-xs text-zinc-300 leading-relaxed">{overview.marketPosition}</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 glass">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2 italic">Competitive Edge</p>
                    <p className="text-xs text-zinc-300 leading-relaxed">{overview.competitiveLandscape}</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 glass">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2 italic">Key Conversion Trigger</p>
                    <p className="text-xs text-zinc-300 leading-relaxed font-bold text-primary italic">{overview.conversionTrigger}</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 glass">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2 italic">Ops Pain Points</p>
                    <p className="text-xs text-zinc-300 leading-relaxed">{overview.operationalPainPoints}</p>
                  </div>
                </div>
              )}

              {/* Analysis Header */}
              <div className="grid lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass">
                    <h3 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-[0.3em] mb-6 flex items-center gap-2">
                       <Compass size={14} className="text-primary" /> Strategic Market Analysis
                    </h3>
                    {isAnalyzing && !analysis ? (
                      <div className="space-y-4 animate-pulse">
                        <div className="h-8 bg-white/5 rounded-lg w-1/2" />
                        <div className="h-20 bg-white/5 rounded-lg w-full" />
                      </div>
                    ) : (
                      <>
                        <h4 className="text-2xl font-display font-medium text-white mb-4 italic">
                          Targeting: <span className="text-primary">{analysis?.currentField}</span>
                        </h4>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                          {analysis?.strategicRationale}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {analysis?.expansionIndustries.map((ind, i) => (
                            <span key={i} className="px-4 py-2 bg-primary/5 border border-primary/20 rounded-full text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
                              {ind}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                 </div>

                 <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 glass flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                          <TrendingUp className="text-emerald-500" size={24} />
                       </div>
                       <div>
                          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Growth Forecast</p>
                          <p className="text-2xl font-display font-bold text-white">High Potential</p>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: isAnalyzing ? '40%' : '85%' }}
                            className="h-full bg-emerald-500" 
                          />
                       </div>
                       <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-tighter">Market Readiness Index: {isAnalyzing ? 'SCALATING...' : '85%'}</p>
                    </div>
                 </div>
              </div>

              {/* Leads Results */}
              <div className="space-y-6">
                 <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-display font-medium uppercase tracking-[0.2em] italic text-primary">Generated High-Intent Leads</h3>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[9px] font-mono text-zinc-500">
                       <ShieldCheck size={12} className="text-emerald-500" /> IDENTITY_VERIFIED
                    </div>
                 </div>

                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isAnalyzing && leads.length === 0 ? (
                      [...Array(6)].map((_, i) => (
                        <div key={i} className="h-64 rounded-[2rem] bg-white/[0.01] border border-white/5 animate-pulse" />
                      ))
                    ) : (
                      leads.map((lead, i) => (
                        <motion.div 
                           key={i}
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: i * 0.1 }}
                           className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden"
                        >
                           <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-2">
                              <div className="px-2 py-1 bg-primary text-black text-[8px] font-mono font-black rounded">Score: {lead.score}</div>
                              <div className={`px-2 py-0.5 text-[8px] font-mono font-black rounded border ${
                                lead.temperature === 'Hot' ? 'bg-orange-500/20 border-orange-500/40 text-orange-400' : 
                                lead.temperature === 'Warm' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 
                                'bg-blue-500/20 border-blue-500/40 text-blue-400'
                              }`}>
                                {lead.temperature.toUpperCase()} LEAD
                              </div>
                              <div className={`px-2 py-0.5 text-[8px] font-mono font-black rounded border ${
                                lead.urgency === 'High' ? 'bg-red-500/20 border-red-500/40 text-red-400' : 
                                lead.urgency === 'Medium' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 
                                'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                              }`}>
                                {lead.urgency.toUpperCase()} INTENT
                              </div>
                           </div>
                           
                           <div className="flex items-center gap-4 mb-6">
                              <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/20 transition-colors">
                                 <Building2 size={24} className="text-zinc-500 group-hover:text-primary transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0 pr-16">
                                 <h4 className="text-lg font-display font-medium text-white truncate">{lead.name}</h4>
                                 <p className="text-[10px] font-mono text-zinc-500 uppercase truncate">{lead.industry}</p>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4 mb-3 pt-4 border-t border-white/5">
                              <div>
                                 <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Decision Authority</p>
                                 <p className="text-[10px] font-bold text-zinc-300 truncate">{lead.authority}</p>
                              </div>
                              <div>
                                 <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Target Persona</p>
                                 <p className="text-[10px] font-bold text-zinc-300 truncate">{lead.persona}</p>
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4 mb-6 border-b border-white/5 pb-4">
                              <div>
                                 <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Buying Stage</p>
                                 <p className="text-[10px] font-bold text-primary truncate italic">{lead.buyingStage}</p>
                              </div>
                              <div>
                                 <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">Budget level</p>
                                 <p className="text-[10px] font-bold text-emerald-500 truncate">{lead.budgetLevel}</p>
                              </div>
                           </div>

                           <div className="space-y-4 mb-8">
                              <div className="flex items-center gap-3 text-zinc-400">
                                 <MapPin size={14} className="text-zinc-600" />
                                 <span className="text-xs truncate">{lead.location}</span>
                              </div>
                              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 italic">
                                "{lead.relevance}"
                              </p>
                           </div>

                           <div className="grid grid-cols-2 gap-3">
                              {lead.website && (
                                <a href={lead.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                                   <Globe size={12} className="text-primary" />
                                   <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-300">Portal</span>
                                </a>
                              )}
                              {lead.phone && (
                                <div className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl">
                                   <Phone size={12} className="text-emerald-500" />
                                   <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-300">Direct</span>
                                </div>
                              )}
                              {(lead.email || lead.contact) && (
                                <div className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl col-span-2">
                                   <Mail size={12} className="text-blue-400" />
                                   <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-300">{lead.email || lead.contact}</span>
                                </div>
                              )}
                           </div>
                        </motion.div>
                      ))
                    )}
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-grid opacity-10" />
      </div>
    </div>
  );
}
