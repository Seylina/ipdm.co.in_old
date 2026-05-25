import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import { 
  Target, 
  Search, 
  Globe, 
  ShieldAlert, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Layers, 
  Workflow, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Copy, 
  ChevronRight, 
  TrendingUp, 
  Zap, 
  FileJson, 
  BookOpen, 
  Database, 
  Award,
  Lock,
  ExternalLink,
  Bot,
  Filter,
  RefreshCw,
  Sparkles,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { Trademark } from "./Trademark";
import { openMeeting as openCalendly } from "../lib/calendly";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar,
  BarChart,
  Bar,
  Legend
} from "recharts";

interface Lead {
  name: string;
  website: string;
  industry: 'Healthcare' | 'B2B Agencies' | 'SaaS & Tech' | 'Real Estate' | 'Legal Services';
  location: string;
  emails: string[];
  phones: string[];
  channels: string[];
  gaps: string[];
  qualityIndex: number;
  intentScore: number;
  status: 'Hot' | 'Warm' | 'Cold';
  detectedOfferings: string[];
}

const PRE_SCRAPED_DATABASE: Lead[] = [
  {
    name: "Apex Healthcare & Dentistry",
    website: "https://apex-dental-bengaluru.in",
    industry: "Healthcare",
    location: "Koramangala 4th Block, Bengaluru, KA 560034",
    emails: ["contact@apexdentalbengaluru.in", "info@apexdentalbengaluru.in"],
    phones: ["+91 80 4912 3099", "+91 98144 23991"],
    channels: ["Contact Form", "Email", "WhatsApp Support Line"],
    gaps: [
      "No automated patient scheduling assistant",
      "Outdated mobile responsive viewport configuration",
      "Zero CRM tracking or patient inquiry pipeline"
    ],
    qualityIndex: 64,
    intentScore: 92,
    status: "Hot",
    detectedOfferings: ["Dentistry", "Orthodontics", "Implants", "Pediatric Care"]
  },
  {
    name: "BlueSky Digital Marketing Agency",
    website: "https://blueskydigital.co.in",
    industry: "B2B Agencies",
    location: "Indiranagar 100 Feet Road, Bengaluru, KA 560038",
    emails: ["grow@blueskyagency.co.in", "hello@blueskyagency.co.in"],
    phones: ["+91 90123 45889"],
    channels: ["Email", "LinkedIn Page", "Instagram Business"],
    gaps: [
      "No real-time proposal automation block",
      "High landing page load latency (3.4s)",
      "Zero interactive marketing-ROI assessment tool"
    ],
    qualityIndex: 72,
    intentScore: 84,
    status: "Warm",
    detectedOfferings: ["SEO Strategy", "Meta Ad Campaigns", "Brand Storyboard"]
  },
  {
    name: "FinFlow SaaS Solutions",
    website: "https://finflow-accounting.co",
    industry: "SaaS & Tech",
    location: "HSR Layout Sector 3, Bengaluru, KA 560102",
    emails: ["billing@finflow.co", "solutions@finflow.co"],
    phones: ["+91 80 4677 2200"],
    channels: ["Email", "Intercom Bubble", "Book Demo Form"],
    gaps: [
      "Inbound leads dropped due to poor validation",
      "No adaptive chatbot for global multicurrency queries",
      "High customer churn due to passive trial onboarding"
    ],
    qualityIndex: 81,
    intentScore: 89,
    status: "Hot",
    detectedOfferings: ["Cloud Ledger", "Auto Invoice API", "Tax Compliance Suite"]
  },
  {
    name: "Prestige Estates & Realty Prime",
    website: "https://prestige-realty-prime-india.com",
    industry: "Real Estate",
    location: "UB City, Vittal Mallya Road, Bengaluru, KA 560001",
    emails: ["sales@prestigerprime.com", "partner@prestigerprime.com"],
    phones: ["+91 80 2201 3900", "+91 97188 56641"],
    channels: ["Contact Form", "WhatsApp Hub", "Sales Team Office"],
    gaps: [
      "High delay in lead qualification (avg. 14 hours)",
      "No automated property recommendation roadmap",
      "Missing voice-assistant callback logic for site visits"
    ],
    qualityIndex: 58,
    intentScore: 95,
    status: "Hot",
    detectedOfferings: ["Luxury Apartments", "Tech Park Leasing", "Villa Projects"]
  },
  {
    name: "Murthy & Associates Corporate Law",
    website: "https://murthylawpartners.in",
    industry: "Legal Services",
    location: "MG Road, Trinity Metro Circle, Bengaluru, KA 560001",
    emails: ["counsel@murthylawpartners.in"],
    phones: ["+91 80 2554 0988"],
    channels: ["Email", "Office Landline"],
    gaps: [
      "No corporate legal retainer query bot",
      "Extremely outdated legacy web template (non-secure HTTP)",
      "No client portal or contract automation hooks"
    ],
    qualityIndex: 45,
    intentScore: 78,
    status: "Warm",
    detectedOfferings: ["M&A Advisory", "IPR Filing", "Corporate Governance"]
  }
];

export function IPDMSpectra({ onNavigate }: { onNavigate: (page: any) => void }) {
  const [urlInput, setUrlInput] = useState("");
  const [crawlActive, setCrawlActive] = useState(false);
  const [crawlStep, setCrawlStep] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [scannedResult, setScannedResult] = useState<Lead | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead>(PRE_SCRAPED_DATABASE[0]);
  const [activeTab, setActiveTab] = useState<'profiler' | 'audit' | 'signals' | 'deck'>('profiler');
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [showCopyMessage, setShowCopyMessage] = useState<string | null>(null);

  // Compliance States
  const [respectRobots, setRespectRobots] = useState(true);
  const [avoidPersonal, setAvoidPersonal] = useState(true);
  const [rateLimit, setRateLimit] = useState(2.5);
  const [strictB2BFilter, setStrictB2BFilter] = useState(true);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  // Simulate Crawl Steps
  const handleStartDiscovery = (targetUrl: string) => {
    if (!targetUrl) return;
    setCrawlActive(true);
    setScannedResult(null);
    setCrawlStep(0);
    setTerminalLogs([]);

    const domain = targetUrl.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    const companyDisplayName = domain.split('.')[0].toUpperCase();

    const steps = [
      { log: `[SYSTEM] Initiating Autonomous discovery request for domain: ${domain}...`, duration: 400 },
      { log: `[COMPLIANCE] Reading robots.txt configurations for https://${domain}...`, duration: 700 },
      { log: respectRobots ? `[COMPLIANCE] OK: No restrictive paths. Politeness rate limiting config: ${rateLimit}s enabled.` : `[SYSTEM] Crawling with standard configurations.`, duration: 500 },
      { log: `[CRAWLER] Requesting site root. Fetching markup headers... success IP: 104.22.4.91`, duration: 600 },
      { log: `[PARSER] Schema.org JSON-LD found. Parsing Business Metadata...`, duration: 500 },
      { log: `[EXTRACTOR] Document scan complete. Extracting public contact info...`, duration: 600 },
      { log: `[EXTRACTOR] Captured 1 corporate email | 1 phone line | 1 WhatsApp anchor point.`, duration: 400 },
      { log: `[ANALYZER] AI Contextual Agent running industry classification for: ${companyDisplayName}...`, duration: 800 },
      { log: `[AUDITOR] Performance scoring target. Mobile responsiveness detected: PASS | Outdated CSS: YES | AI Assistant missing.`, duration: 600 },
      { log: `[SCORING] Aligning opportunity gap indexes. Intent model scoring active...`, duration: 500 },
      { log: `[KNOWLEDGE-GRAPH] Writing edge: ${companyDisplayName} -> B2B Opportunity discovered!`, duration: 400 },
      { log: `[SYSTEM] Complete. Loading custom visual workspace...`, duration: 300 }
    ];

    let currentLogIndex = 0;
    
    const executeNextStep = () => {
      if (currentLogIndex < steps.length) {
        setTerminalLogs(prev => [...prev, steps[currentLogIndex].log]);
        setCrawlStep(currentLogIndex);
        setTimeout(() => {
          currentLogIndex++;
          executeNextStep();
        }, steps[currentLogIndex].duration);
      } else {
        // Complete Scan and Generate a rich mock result based on real URLs
        const generatedResult: Lead = {
          name: companyDisplayName.length > 3 ? `${companyDisplayName.charAt(0) + companyDisplayName.slice(1).toLowerCase()} Corp` : `${companyDisplayName} Systems`,
          website: targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`,
          industry: targetUrl.includes('care') || targetUrl.includes('dent') ? 'Healthcare' :
                    targetUrl.includes('agency') || targetUrl.includes('tech') ? 'SaaS & Tech' : 'B2B Agencies',
          location: "Bangalore Outer Ring Road Corridor, Karnataka 560103",
          emails: [`partnerships@${domain}`, `info@${domain}`],
          phones: ["+91 80 4390 1200"],
          channels: ["Contact Form Page", "Public Mail Server", "LinkedIn Profile", "Google Map Location"],
          gaps: [
            "No proactive customer intake conversation loop",
            "Outdated landing page visual hierarchy & high mobile latency",
            "Missing unified omnichannel coordination across Email and WhatsApp"
          ],
          qualityIndex: Math.floor(Math.random() * 25) + 50,
          intentScore: Math.floor(Math.random() * 15) + 80,
          status: "Hot",
          detectedOfferings: ["Digital Interfaces", "Services Catalog", "Contact Desk"]
        };
        
        setScannedResult(generatedResult);
        setSelectedLead(generatedResult);
        setCrawlActive(false);
      }
    };

    executeNextStep();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setShowCopyMessage(label);
    setTimeout(() => setShowCopyMessage(null), 2000);
  };

  const getProposalTemplate = (lead: Lead) => {
    return `Subject: Opportunity Discovery Report for ${lead.name} • Intelligence & Outbound Pipeline Analysis

Dear Team at ${lead.name},

I am writing you after our autonomous discovery infrastructure publicly mapped and completed a compliance-aware digital maturity audit for your website (${lead.website}). 

At IPDM, we look at websites not as static billboards, but as public, operational interfaces designed for enterprise intelligence.

Our audit identified several high-value conversion opportunities where your business could leverage automated operational agents:

* IDENTIFIED STRATEGIC GAPS:
${lead.gaps.map((g, i) => `  ${i+1}. ${g}`).join('\n')}

By introducing co-ordinated task agents, we estimate you can accelerate your active inbound pipeline velocity by 25–40% and recapture dropped leads without increasing human overhead.

We have generated a custom Transformation Roadmap deck tailored for ${lead.name}'s specific services: ${lead.detectedOfferings.join(', ')}.

May we share the technical deck and run through the audit roadmap with your team this week?

Warm regards,
Outbound Discovery Team • IPDM SPECTRA™
Email: discovery@ipdm.co.in
Website: https://ipdm.co.in
---
Compliance & Consent Protection Note: You received this strategic advisory analysis because ${lead.website} is listed under business intelligence indicators. To decline further analysis, respond with 'Unsubscribe'.`;
  };

  const filteredLeads = PRE_SCRAPED_DATABASE.filter(lead => 
    industryFilter === 'All' ? true : lead.industry === industryFilter
  );

  return (
    <div className="bg-zinc-950 text-white min-h-screen relative overflow-hidden pb-32 selection:bg-rose-500/30">
      {/* Blueprint background grid */}
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-[0.02]" />
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
        
        {/* Navigation back button */}
        <button 
          onClick={() => onNavigate('ecosystem')}
          className="flex items-center gap-2 text-zinc-500 hover:text-rose-400 transition-colors group mb-10"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] font-mono font-black uppercase tracking-wider">Back to Ecosystem</span>
        </button>

        {/* Title and Hero Positioning banner */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 rounded-full border border-rose-500/20 text-[10px] font-mono font-black text-rose-400 uppercase tracking-widest mb-6">
            Autonomous Discovery Stack // IPDM CORE LAYER V
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-medium mb-6 italic tracking-tight uppercase">
            IPDM <span className="text-rose-500">SPECTRA™</span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-3xl leading-relaxed italic border-l-4 border-rose-500/20 pl-6">
            Autonomous Business Intelligence & Opportunity Discovery Infrastructure. 
            Websites are public interfaces. Intelligence is the advantage. Opportunity is the outcome.
          </p>
        </div>

        {/* Live Crawler Demonstration / Discovery Engine UI */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          
          {/* Main Scanner input terminal (Left side - Col 7) */}
          <div className="lg:col-span-7 bg-zinc-950/60 border border-zinc-900 rounded-[2rem] p-6 md:p-8 backdrop-blur-xl relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-mono uppercase text-zinc-400 rounded-full">
              LIVE DIGITAL DISCOVERY ENGINE
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-display font-semibold mb-2">Configure & Scan Domain</h2>
              <p className="text-xs text-zinc-500">
                Specify any Indian or Bangalore-based B2B website to ethical crawl public touchpoints.
              </p>
            </div>

            {/* URL Scanning inputs info */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                <input 
                  type="text" 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="e.g. spacex.com, info@apexdentalbengaluru.in"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-sm focus:border-rose-500/40 focus:outline-none transition-all"
                  disabled={crawlActive}
                />
              </div>
              <button 
                onClick={() => handleStartDiscovery(urlInput)}
                disabled={crawlActive || !urlInput}
                className="px-6 py-4 bg-rose-600 text-white font-mono text-xs font-black rounded-xl hover:bg-rose-500 disabled:opacity-50 transition-all flex items-center gap-2 group cursor-pointer"
              >
                {crawlActive ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                DISCOVER
              </button>
            </div>

            {/* Ethical Crawling & Custom Compliance Config */}
            <div className="bg-zinc-900/40 border border-zinc-900/60 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-900">
                <span className="text-[11px] font-mono text-emerald-400 font-bold tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> COMPLIANCE CONTROLS ACTIVE
                </span>
                <span className="text-[10px] font-mono text-zinc-600">CCPA / GDPR COMPLIANT</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Robots.txt Guard */}
                <div className="flex items-start justify-between p-3 bg-zinc-950/40 rounded-xl border border-zinc-900">
                  <div className="mr-3">
                    <div className="text-xs font-semibold text-zinc-300">Respect robots.txt</div>
                    <div className="text-[10px] text-zinc-500">Gracefully stop at blocked paths</div>
                  </div>
                  <button 
                    onClick={() => setRespectRobots(!respectRobots)}
                    className={`w-9 h-5 rounded-full transition-colors flex items-center px-1 ${respectRobots ? 'bg-emerald-500 justify-end' : 'bg-zinc-800 justify-start'}`}
                  >
                    <div className="w-3 h-3 bg-white rounded-full shadow" />
                  </button>
                </div>

                {/* Personal E-mail Guard */}
                <div className="flex items-start justify-between p-3 bg-zinc-950/40 rounded-xl border border-zinc-900">
                  <div className="mr-3">
                    <div className="text-xs font-semibold text-zinc-300">Muffle Personal Data</div>
                    <div className="text-[10px] text-zinc-500">Ignore strictly personal emails</div>
                  </div>
                  <button 
                    onClick={() => setAvoidPersonal(!avoidPersonal)}
                    className={`w-9 h-5 rounded-full transition-colors flex items-center px-1 ${avoidPersonal ? 'bg-emerald-500 justify-end' : 'bg-zinc-800 justify-start'}`}
                  >
                    <div className="w-3 h-3 bg-white rounded-full shadow" />
                  </button>
                </div>

                {/* Politeness Rate-limiting Delay */}
                <div className="flex items-center justify-between p-3 bg-zinc-950/40 rounded-xl border border-zinc-900">
                  <div>
                    <div className="text-xs font-semibold text-zinc-300">Politeness Interval</div>
                    <div className="text-[10px] text-zinc-500">Delay between page requests</div>
                  </div>
                  <select 
                    value={rateLimit} 
                    onChange={(e) => setRateLimit(parseFloat(e.target.value))}
                    className="bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 rounded p-1 cursor-pointer"
                  >
                    <option value={1.0}>1.0s</option>
                    <option value={2.5}>2.5s (Std)</option>
                    <option value={5.0}>5.0s</option>
                  </select>
                </div>

                {/* Commercial Intent filter */}
                <div className="flex items-start justify-between p-3 bg-zinc-950/40 rounded-xl border border-zinc-900">
                  <div className="mr-3">
                    <div className="text-xs font-semibold text-zinc-300">B2B Intent Focus</div>
                    <div className="text-[10px] text-zinc-500">Isolate high-value corporate gaps</div>
                  </div>
                  <button 
                    onClick={() => setStrictB2BFilter(!strictB2BFilter)}
                    className={`w-9 h-5 rounded-full transition-colors flex items-center px-1 ${strictB2BFilter ? 'bg-emerald-500 justify-end' : 'bg-zinc-800 justify-start'}`}
                  >
                    <div className="w-3 h-3 bg-white rounded-full shadow" />
                  </button>
                </div>

              </div>
            </div>

            {/* Simulated Live Scraper console output */}
            <div className="bg-black/90 rounded-2xl border border-zinc-900 p-4 font-mono text-xs overflow-hidden h-44 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-2">
                <span className="text-zinc-500 uppercase text-[10px] font-bold">TERMINAL CONSOLE PROXY</span>
                <span className="flex h-2 w-2 relative">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${crawlActive ? 'bg-rose-400' : 'bg-emerald-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${crawlActive ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                </span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800 pr-1 text-zinc-400 select-none">
                {terminalLogs.length === 0 ? (
                  <div className="text-zinc-600 text-[11px] italic">Ready. Enter website and click discover. Compliance monitors initialized...</div>
                ) : (
                  terminalLogs.map((log, i) => (
                    <div key={i} className={`text-[10px] leading-tight ${log.includes('[SYSTEM]') ? 'text-zinc-500' : log.includes('[COMPLIANCE]') ? 'text-emerald-400' : log.includes('[EXTRACTOR]') ? 'text-cyan-400' : 'text-zinc-300'}`}>
                      {log}
                    </div>
                  ))
                )}
                <div ref={terminalEndRef} />
              </div>
            </div>

          </div>

          {/* Dynamic visual graph / scoring output (Right side - Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-[2rem] p-6 backdrop-blur-xl flex-1 flex flex-col justify-between relative overflow-hidden min-h-[350px]">
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-md font-display font-medium text-zinc-300 uppercase">Operational Scoring</h3>
                  <p className="text-[10px] text-zinc-500 font-mono">INTELLIGENCE OPPORTUNITY INDEX</p>
                </div>
                {crawlActive ? (
                  <div className="text-rose-400 animate-pulse text-xs font-mono">SCRAPING ENGAGED...</div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-emerald-400 text-xs font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> IDLE
                  </div>
                )}
              </div>

              {/* Dynamic Meter graphics and numerical percentage overlays */}
              <div className="flex-1 flex flex-col justify-around items-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {/* Outer circle layout */}
                  <svg className="absolute w-full h-full transform -rotate-90">
                    <circle 
                      cx="72" cy="72" r="64" 
                      className="stroke-zinc-900 fill-none" 
                      strokeWidth="6" 
                    />
                    <circle 
                      cx="72" cy="72" r="64" 
                      className="stroke-rose-500 fill-none transition-all duration-1000" 
                      strokeWidth="6" 
                      strokeDasharray={`${2 * Math.PI * 64}`}
                      strokeDashoffset={`${2 * Math.PI * 64 * (1 - (scannedResult ? scannedResult.intentScore : selectedLead.intentScore) / 100)}`}
                    />
                  </svg>
                  <div className="text-center">
                    <div className="text-4xl font-display font-bold italic text-white tracking-widest">
                      {scannedResult ? scannedResult.intentScore : selectedLead.intentScore}%
                    </div>
                    <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest leading-none mt-1">INTENT RECEPTIVITY</div>
                  </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-900 text-center">
                    <span className="text-[9px] text-zinc-500 font-mono block">GAP DEFICIT SPEED</span>
                    <span className="text-lg font-bold font-display text-rose-400">
                      {100 - (scannedResult ? scannedResult.qualityIndex : selectedLead.qualityIndex)}%
                    </span>
                  </div>
                  <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-900 text-center">
                    <span className="text-[9px] text-zinc-500 font-mono block">TRANSFORMATION TYPE</span>
                    <span className="text-xs font-bold font-mono text-zinc-300">
                      OPPORTUNITY MATCH
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Tactical Cooperative Visualizer Node Section */}
        <div className="mb-16">
          <div className="p-8 rounded-[2rem] bg-zinc-950/60 border border-zinc-900/80 backdrop-blur-xl">
            <h3 className="text-xl font-display font-semibold mb-2">Dual Cooperative Intelligence Pipeline</h3>
            <p className="text-xs text-zinc-500 mb-8 max-w-2xl">
              An elegant outline of how four individual, compliant micro-agents execute public discovery, performance tracking, dynamic intent profiling, and outbound alignment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {[
                {
                  id: "agent-1",
                  name: "Discovery Stack",
                  icon: <Globe className="w-5 h-5 text-rose-400" />,
                  desc: "Muffles private nodes. Identifies publicly published corporate contact, emails, WhatsApp lines, and anchors."
                },
                {
                  id: "agent-2",
                  name: "Gap Auditor",
                  icon: <ShieldAlert className="w-5 h-5 text-emerald-400" />,
                  desc: "Audits interfaces in real-time. Identifies outdated design loops, speed blockages, and missing conversational AI setups."
                },
                {
                  id: "agent-3",
                  name: "Scoring Engine",
                  icon: <Target className="w-5 h-5 text-cyan-400" />,
                  desc: "Scores buying intent & transformation receptivity based on active tracking, location metrics, and tech maturity indices."
                },
                {
                  id: "agent-4",
                  name: "Outreach Copywriter",
                  icon: <Send className="w-5 h-5 text-rose-400" />,
                  desc: "Crafts outcome-centric presentation proposals. Includes transparent compliance and clear opt-out systems."
                }
              ].map((agent, index) => (
                <div key={agent.id} className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-900 relative hover:border-zinc-800 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6">
                    {agent.icon}
                  </div>
                  <h4 className="text-sm font-mono font-black uppercase tracking-wider mb-2 text-zinc-200">
                    0{index+1} / {agent.name}
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{agent.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Opportunity Explorer list Hub */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Vertical filter & lists catalog (Left side - Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-[2rem] p-6 backdrop-blur-xl">
              
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-900">
                <span className="text-sm font-mono uppercase text-zinc-400 tracking-wider">OPPORTUNITY EXPLORER</span>
                <span className="text-[10px] text-zinc-600 font-mono">DATABASE SYNC: ACTIVE</span>
              </div>

              {/* Filter pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['All', 'Healthcare', 'B2B Agencies', 'SaaS & Tech', 'Real Estate', 'Legal Services'].map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustryFilter(ind)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-black uppercase tracking-wider transition-all ${industryFilter === ind ? 'bg-rose-500 text-white' : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'}`}
                  >
                    {ind}
                  </button>
                ))}
              </div>

              {/* Catalog list */}
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
                {filteredLeads.map((lead) => (
                  <div 
                    key={lead.name}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedLead.name === lead.name ? 'bg-rose-500/5 border-rose-500/40' : 'bg-zinc-900/40 border-zinc-900 hover:border-zinc-800'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono text-zinc-400 block">{lead.industry}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-black tracking-widest ${lead.status === 'Hot' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                        {lead.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2">{lead.name}</h4>
                    <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-mono">
                      <span>Opportunity: {lead.intentScore}%</span>
                      <span>•</span>
                      <span>Quality: {lead.qualityIndex}/100</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Core Deep-Dive & proposal cockpit (Right side - Col 7) */}
          <div className="lg:col-span-7 bg-zinc-950/60 border border-zinc-900 rounded-[2rem] p-6 md:p-8 backdrop-blur-xl">
            
            <div className="flex items-start justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-rose-400 font-black uppercase tracking-widest">{selectedLead.industry} Profile Context</span>
                <h3 className="text-2xl font-display font-semibold mt-1">{selectedLead.name}</h3>
                <a href={selectedLead.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-rose-400 transition-colors mt-1">
                  <Globe className="w-3.5 h-3.5" /> {selectedLead.website} <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Digital Maturity</span>
                <div className="text-2xl font-bold font-display text-emerald-400 mt-0.5">{selectedLead.qualityIndex}%</div>
              </div>
            </div>

            {/* Sub Tabs workspace inside opportunity panel */}
            <div className="flex border-b border-zinc-900 mb-6 gap-6">
              {[
                { id: "profiler", label: "Public Profile Info", icon: <Database className="w-3.5 h-3.5" /> },
                { id: "audit", label: "Interface Audit", icon: <ShieldAlert className="w-3.5 h-3.5" /> },
                { id: "signals", label: "Transformation Signals", icon: <TrendingUp className="w-3.5 h-3.5" /> },
                { id: "deck", label: "Proposal Copy", icon: <FileText className="w-3.5 h-3.5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 text-xs font-mono font-black uppercase tracking-wider flex items-center gap-2 transition-all border-b-2 ${activeTab === tab.id ? 'border-rose-500 text-rose-400' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Tab 1: Profile Info */}
              {activeTab === 'profiler' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 font-mono block">CORPORATE LOCATION</span>
                        <span className="text-xs text-zinc-200">{selectedLead.location}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 font-mono block">DETECTED CATEGORIES</span>
                        <span className="text-xs text-zinc-200">{selectedLead.detectedOfferings.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">Compliance Certified Contact Points</h4>
                    <div className="space-y-2">
                      {selectedLead.emails.map(email => (
                        <div key={email} className="flex justify-between items-center p-3.5 bg-zinc-900/20 border border-zinc-900/60 rounded-xl">
                          <span className="text-xs font-mono text-zinc-300 flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-zinc-500" /> {email}
                          </span>
                          <button 
                            onClick={() => copyToClipboard(email, email)}
                            className="text-[10px] text-zinc-500 hover:text-rose-400 font-mono flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="w-3 h-3" /> {showCopyMessage === email ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      ))}
                      {selectedLead.phones.map(phone => (
                        <div key={phone} className="flex justify-between items-center p-3.5 bg-zinc-900/20 border border-zinc-900/60 rounded-xl">
                          <span className="text-xs font-mono text-zinc-300 flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-zinc-500" /> {phone}
                          </span>
                          <button 
                            onClick={() => copyToClipboard(phone, phone)}
                            className="text-[10px] text-zinc-500 hover:text-rose-400 font-mono flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="w-3 h-3" /> {showCopyMessage === phone ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Gap Audit report description */}
              {activeTab === 'audit' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="p-4 bg-zinc-900/30 border border-zinc-900 rounded-2xl">
                    <h4 className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> REVEALED OPPORTUNITY DEFICITS
                    </h4>
                    <div className="space-y-3">
                      {selectedLead.gaps.map((gp, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                          <p className="text-xs text-zinc-300 leading-relaxed">{gp}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 bg-zinc-900/10 border border-zinc-900 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-300 mb-1">Recommended Transformation Architecture</h4>
                      <p className="text-[11px] text-zinc-500">Deploy IPDM ASTRA™ or SUPPORTA™ as a digital intake buffer.</p>
                    </div>
                    <button 
                      onClick={() => onNavigate('ecosystem')}
                      className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-[10px] font-mono font-black uppercase tracking-wider rounded-lg hover:text-rose-400 hover:border-rose-400/20 transition-all cursor-pointer"
                    >
                      EXPLORE AGENTS
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Signals */}
              {activeTab === 'signals' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 animate-fade-in"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { l: "Ad Adoption", v: "Low", c: "text-rose-400" },
                      { l: "UX Friction", v: "High", c: "text-amber-400" },
                      { l: "Growth Intent", v: "Extremely High", c: "text-emerald-400" },
                      { l: "Tech Stack", v: "Legacy", c: "text-zinc-400" }
                    ].map((sig, i) => (
                      <div key={i} className="p-4 bg-zinc-900/40 border border-zinc-900 rounded-xl text-center">
                        <span className="text-[9px] text-zinc-500 font-mono uppercase block mb-1">{sig.l}</span>
                        <span className={`text-xs font-bold font-mono uppercase ${sig.c}`}>{sig.v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-rose-950/20 border border-rose-500/20 rounded-2xl">
                    <h4 className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> Outbound Engagement Trigger
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      This business is in the <strong>Evaluation stage</strong>. Corporate contact endpoints are verified active and public. Recommend initiating Outbound sequence emphasizing friction-free appointment automation.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Tab 4: Deck generated copy email */}
              {activeTab === 'deck' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase">AI OUTBOUND ENGAGEMENT TEMPLATE</span>
                    <button 
                      onClick={() => copyToClipboard(getProposalTemplate(selectedLead), 'proposal')}
                      className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-rose-400 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" /> 
                      {showCopyMessage === 'proposal' ? 'Copied proposal copy!' : 'Copy Proposal Text'}
                    </button>
                  </div>
                  <div className="p-4 bg-zinc-950 border border-zinc-900 text-zinc-400 font-mono text-[10px] leading-relaxed rounded-xl h-64 overflow-y-auto pr-1 select-all scrollbar-thin scrollbar-thumb-zinc-800">
                    <pre className="whitespace-pre-wrap">{getProposalTemplate(selectedLead)}</pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Legal educational guidelines banner */}
        <div className="mt-24">
          <div className="p-8 rounded-[2rem] bg-zinc-900/30 border border-zinc-950 relative overflow-hidden">
            <div className="absolute top-0 right-10 -translate-y-1/2 flex items-center gap-2 px-3 py-1 bg-zinc-950 text-emerald-400 border border-zinc-800 text-[10px] font-mono uppercase tracking-widest rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> COOPERATIVE COMPLIANCE BLUEPRINT
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-display font-semibold text-emerald-400 mb-4 uppercase">LEGALLY & ETHICALLY DOABLE</h3>
                <div className="space-y-3">
                  {[
                    "Standard Business Identity: Fetching Company name, categorized products and service lists.",
                    "Intent Signals: Recording mobile layout status, latency speeds, and missing automation.",
                    "Public Context: Structured contact lists intentionally published to generate incoming transactions."
                  ].map((it, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mt-1 flex-shrink-0 text-[10px] font-bold">✓</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{it}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-display font-semibold text-rose-400 mb-4 uppercase">STRICTLY AVOIDED & BLOCKED</h3>
                <div className="space-y-3">
                  {[
                    "Personal Confidentiality: Skipping non-business phone lines or private individual emails.",
                    "Security Integrity: Strictly bypasses CAPTCHA, hidden portals, or paywall boundaries.",
                    "Respect Blockers: Statically honors robots.txt limits and imposes polite rate limit delays."
                  ].map((it, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mt-1 flex-shrink-0 text-[10px] font-bold">×</div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{it}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Outbound CTA Banner */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-display font-bold italic text-white uppercase mb-4">
            READY TO DEPLOY SPECTRA™ INTEL SOLUTIONS?
          </h2>
          <p className="text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed mb-8">
            Access our fully managed client discovery pipelines. Build custom intelligence architectures, reduce operational churn, and discover opportunities automatically.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={openCalendly}
              className="px-8 py-4 bg-rose-600 text-white font-mono text-xs font-black uppercase rounded-xl hover:bg-rose-500 transition-all cursor-pointer"
            >
              Deploy Discover Stack
            </button>
            <button 
              onClick={openCalendly}
              className="px-6 py-4 bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs font-black uppercase tracking-wider rounded-xl hover:border-rose-400/20 hover:text-rose-400 transition-all cursor-pointer"
            >
              Request Specs Sheet
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
