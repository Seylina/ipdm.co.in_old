/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Cpu, 
  Database, 
  Globe, 
  Zap, 
  Shield, 
  Terminal, 
  Layers, 
  ArrowUpRight, 
  AlertCircle,
  Network,
  Share2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

// Mock data generation
const generateData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `${i}:00`,
    throughput: Math.floor(Math.random() * 400) + 100,
    latency: Math.floor(Math.random() * 50) + 10,
    intelligence: Math.floor(Math.random() * 80) + 20,
  }));
};

const AI_SYSTEMS = [
  // COGNITIVE CLUSTER
  { id: 'QUANTUM', category: 'Cognitive', name: 'Quantum-1', output: 'Neural Mapping', load: 45, status: 'Active', pulse: 'Optimal' },
  { id: 'ARCHIVE', category: 'Cognitive', name: 'Archive', output: 'Context Weaver', load: 88, status: 'Warning', pulse: 'Congested' },
  { id: 'CORE', category: 'Cognitive', name: 'Core Engine', output: 'Pattern Extract', load: 12, status: 'Idle', pulse: 'Standby' },
  { id: 'LUMINA', category: 'Cognitive', name: 'Lumina', output: 'Insight Gen', load: 65, status: 'Active', pulse: 'Stable' },
  { id: 'SYNAPSE', category: 'Cognitive', name: 'Synapse', output: 'Relation Map', load: 30, status: 'Active', pulse: 'Optimal' },
  
  // MARKETING CLUSTER
  { id: 'AD_ALCHEMIST', category: 'Marketing', name: 'AdAlchemist', output: 'Creative Gen', load: 92, status: 'Peak', pulse: 'Hot' },
  { id: 'ECHO', category: 'Marketing', name: 'Echo-7', output: 'Social Synth', load: 55, status: 'Active', pulse: 'Fluid' },
  { id: 'CAMPAIGN_NODE', category: 'Marketing', name: 'CPGN-Node', output: 'Spend Optim', load: 22, status: 'Active', pulse: 'Stable' },
  { id: 'PERSONA_BOT', category: 'Marketing', name: 'PersonaForge', output: 'Audience Arch', load: 40, status: 'Active', pulse: 'Stable' },
  { id: 'SEO_GHOST', category: 'Marketing', name: 'GhostIndex', output: 'SERP Infil', load: 15, status: 'Idle', pulse: 'Quiet' },
  { id: 'CONVERT_MAX', category: 'Marketing', name: 'ConvMax', output: 'UX Mutation', load: 78, status: 'Active', pulse: 'Aggressive' },

  // OPERATIONAL CLUSTER
  { id: 'FLOW', category: 'Operations', name: 'Flow', output: 'Supply Chain', load: 50, status: 'Active', pulse: 'Consistent' },
  { id: 'AUTO_DOC', category: 'Operations', name: 'AutoDoc', output: 'Legal Synth', load: 0, status: 'Sleep', pulse: 'Offline' },
  { id: 'CRM_PILOT', category: 'Operations', name: 'Pilot-CRM', output: 'Lead Nurture', load: 85, status: 'Warning', pulse: 'Busy' },
  { id: 'QUARK', category: 'Operations', name: 'Quark', output: 'Micro-Svc', load: 10, status: 'Active', pulse: 'Minimal' },
  { id: 'HYPERION', category: 'Operations', name: 'Hyperion', output: 'Infra Scale', load: 33, status: 'Active', pulse: 'Cool' },
  { id: 'DATA_STREAM', category: 'Operations', name: 'DataStream', output: 'Data Flow', load: 99, status: 'Critical', pulse: 'Overflow' },

  // STRATEGIC CLUSTER
  { id: 'ORACLE', category: 'Strategy', name: 'Oracle-X', output: 'Market Pred', load: 60, status: 'Active', pulse: 'Deep' },
  { id: 'VALUATION_AI', category: 'Strategy', name: 'ValNode', output: 'Asset Eval', load: 45, status: 'Active', pulse: 'Precise' },
  { id: 'RISK_ENGINE', category: 'Strategy', name: 'RiskSentry', output: 'Threat Model', load: 20, status: 'Active', pulse: 'Calm' },
  { id: 'MERGE_BOT', category: 'Strategy', name: 'M&A-Synth', output: 'Synergy Map', load: 5, status: 'Idle', pulse: 'Scanning' },
  { id: 'FOUNDER_GEN', category: 'Strategy', name: 'ExecAI', output: 'Decision Assist', load: 70, status: 'Active', pulse: 'Focused' },
  { id: 'LEGAL_SHIELD', category: 'Strategy', name: 'Shield-L', output: 'Compliance', load: 15, status: 'Active', pulse: 'Quiet' },
];

const logs = [
  { time: '16:53:12', msg: 'QUANTUM node rerouting traffic to secondary clusters.', type: 'info' },
  { time: '16:53:15', msg: 'AD_ALCHEMIST generated 4,200 unique variants for Campaign #92.', type: 'success' },
  { time: '16:53:20', msg: 'DATA_STREAM approaching memory limit. Auto-scaling initiated.', type: 'warning' },
  { time: '16:53:25', msg: 'ORACLE detected shift in micro-cap correlations.', type: 'info' },
  { time: '16:53:30', msg: 'Unauthorized access attempt blocked by RISK_ENGINE.', type: 'error' },
];

export function Dashboard() {
  const [data, setData] = useState(generateData());
  const [activeCategory, setActiveCategory] = useState<'All' | 'Cognitive' | 'Marketing' | 'Operations' | 'Strategy'>('All');
  const [logItems, setLogItems] = useState(logs);
  const [systems, setSystems] = useState(AI_SYSTEMS);

  const toggleSystem = (id: string) => {
    setSystems(prev => prev.map(sys => 
      sys.id === id 
        ? { ...sys, status: sys.status === 'Active' ? 'Idle' : 'Active', load: sys.status === 'Active' ? 0 : 50 } 
        : sys
    ));
  };

  const filteredSystems = activeCategory === 'All' 
    ? systems 
    : systems.filter(s => s.category === activeCategory);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), {
          time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          throughput: Math.floor(Math.random() * 400) + 100,
          latency: Math.floor(Math.random() * 50) + 10,
          intelligence: Math.floor(Math.random() * 80) + 20,
        }];
        return newData;
      });

      if (Math.random() > 0.7) {
        const target = systems[Math.floor(Math.random() * systems.length)];
        const newLog = {
          time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          msg: `${target.id} output: ${target.output} sequence ${Math.random().toString(36).substring(7)}`,
          type: ['info', 'success', 'warning'][Math.floor(Math.random() * 3)] as any
        };
        setLogItems(prev => [newLog, ...prev.slice(0, 14)]);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [systems]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] p-4 md:p-8 pt-24 font-sans selection:bg-primary/30 transition-colors duration-1000">
      <div className="max-w-[1700px] mx-auto space-y-8">
        
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-[var(--color-text)]/5 pb-10 transition-colors duration-1000">
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                 <span className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.4em]">Autonomous Intelligence Grid</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-medium tracking-tight">System Command</h1>
              <p className="text-zinc-500 dark:text-zinc-500 light:text-zinc-800 font-mono text-xs uppercase tracking-widest mt-4 transition-colors duration-1000">Monitoring 23 autonomous output nodes across 4 cognitive clusters</p>
           </div>
           
           <div className="flex flex-wrap gap-2">
              {['All', 'Cognitive', 'Marketing', 'Operations', 'Strategy'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-6 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                    ? 'bg-primary text-black font-bold' 
                    : 'bg-[var(--color-text)]/5 hover:bg-[var(--color-text)]/10 text-zinc-400 border border-[var(--color-text)]/10 transition-colors duration-1000'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* TOP LEVEL GLOBAL STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <StatCard label="Total Intelligence Throttling" value="842.1 PX/s" trend="+12.4" color="text-primary" />
           <StatCard label="Global Synthesis Rate" value="98.2%" trend="+0.4" color="text-emerald-400" />
           <StatCard label="Active Output Threads" value="12,402" trend="+142" color="text-secondary" />
           <StatCard label="System Integrity" value="OPTIMAL" trend="0.0" color="text-blue-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           
           {/* LEFT: LIVE LOGS & SYSTEM FEEDS */}
           <div className="lg:col-span-1 space-y-6">
              <div className="glass p-6 border-t-2 border-primary/50 h-[600px] flex flex-col">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Live Activity</h3>
                    <div className="flex gap-1">
                       <div className="w-1 h-1 rounded-full bg-zinc-700" />
                       <div className="w-1 h-1 rounded-full bg-zinc-700" />
                       <div className="w-1 h-1 rounded-full bg-zinc-700" />
                    </div>
                 </div>
                 <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-hide">
                    <AnimatePresence initial={false}>
                      {logItems.map((log, i) => (
                        <motion.div 
                          key={log.time + i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-1"
                        >
                          <div className="flex justify-between items-center transition-colors duration-1000">
                             <span className="text-[11px] font-mono text-zinc-600 transition-colors duration-1000">{log.time}</span>
                             <span className={`text-[10px] font-mono px-1 rounded transition-colors duration-1000 ${
                                log.type === 'error' ? 'bg-rose-500/20 text-rose-600 dark:bg-rose-500/10 dark:text-rose-500' :
                                log.type === 'warning' ? 'bg-amber-500/20 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500' :
                                log.type === 'success' ? 'bg-emerald-500/20 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-500' :
                                'bg-[var(--color-text)]/10 text-zinc-500'
                             }`}>
                                {log.type.toUpperCase()}
                             </span>
                          </div>
                          <p className="text-[11px] font-mono text-zinc-600 dark:text-zinc-300 leading-relaxed transition-colors duration-1000">{log.msg}</p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                 </div>
              </div>

              <div className="glass p-6">
                 <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-6">Processing Efficiency</h4>
                 <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={data.slice(-7)}>
                          <Bar dataKey="intelligence">
                             {data.slice(-7).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#22d3ee' : '#818cf8'} fillOpacity={0.8} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>

           {/* RIGHT: THE 23-SYSTEMS GRID */}
           <div className="lg:col-span-3 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 <AnimatePresence mode="popLayout">
                    {filteredSystems.map((sys) => (
                      <motion.div
                        layout
                        key={sys.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`glass p-6 border-l-2 transition-all group ${
                          sys.status === 'Critical' ? 'border-rose-500 bg-rose-500/5' : 
                          sys.status === 'Warning' ? 'border-amber-500' : 
                          sys.status === 'Active' ? 'border-primary' : 'border-zinc-800'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-6 transition-colors duration-1000">
                           <div>
                              <div className="flex items-center gap-2 mb-1 transition-colors duration-1000">
                                 <span className="text-[10px] font-mono text-zinc-500 transition-colors duration-1000">{sys.id}</span>
                                 <div className={`w-1.5 h-1.5 rounded-full transition-all duration-1000 ${
                                    sys.status === 'Active' ? 'bg-primary shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 
                                    sys.status === 'Idle' ? 'bg-zinc-700' : 'bg-rose-500'
                                 }`} />
                              </div>
                              <h3 className="font-display font-medium text-lg leading-tight text-[var(--color-text)] transition-colors duration-1000">{sys.name}</h3>
                           </div>
                           <div className="text-right transition-colors duration-1000">
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest transition-colors duration-1000">{sys.pulse}</span>
                              <p className="text-xs font-mono font-bold text-[var(--color-text)] transition-colors duration-1000">{sys.load}% LOAD</p>
                           </div>
                        </div>

                        <div className="space-y-4 mb-8">
                           <div className="flex justify-between items-center text-[10px] font-mono uppercase text-zinc-500 transition-colors duration-1000">
                              <span>Output Feed</span>
                              <span className="text-[var(--color-text)] transition-colors duration-1000">{sys.output}</span>
                           </div>
                           <div className="w-full h-1 bg-[var(--color-text)]/5 rounded-full overflow-hidden transition-colors duration-1000">
                              <motion.div 
                                animate={{ width: `${sys.load}%` }}
                                className={`h-full ${
                                   sys.status === 'Critical' ? 'bg-rose-500' : 
                                   sys.status === 'Warning' ? 'bg-amber-500' : 'bg-primary'
                                }`} 
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                           <button 
                             onClick={() => toggleSystem(sys.id)}
                             className="py-2 rounded bg-[var(--color-text)]/5 hover:bg-[var(--color-text)]/10 text-[11px] font-mono font-black uppercase tracking-wider transition-all transition-colors duration-1000"
                           >
                             {sys.status === 'Active' ? 'Pause Output' : 'Engage Node'}
                           </button>
                           <button className="py-2 rounded border border-[var(--color-text)]/10 hover:border-primary/50 text-[11px] font-mono text-zinc-400 hover:text-primary transition-all uppercase tracking-wider transition-colors duration-1000">
                             Tweak Flow
                           </button>
                           <button className="py-2 rounded border border-[var(--color-text)]/10 hover:border-emerald-500/50 text-[11px] font-mono text-zinc-400 hover:text-emerald-500 transition-all uppercase tracking-wider transition-colors duration-1000">
                             Reroute
                           </button>
                           <button className="py-2 rounded border border-[var(--color-text)]/10 hover:border-rose-500/50 text-[11px] font-mono text-zinc-400 hover:text-rose-500 transition-all uppercase tracking-wider transition-colors duration-1000">
                             Purge
                           </button>
                        </div>
                      </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, color }: { label: string, value: string, trend: string, color: string }) {
  return (
    <div className="glass p-6 group hover:border-primary/30 transition-all">
       <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-500 light:text-zinc-800 uppercase tracking-widest mb-2 transition-colors duration-1000">{label}</p>
       <div className="flex justify-between items-end">
          <h4 className={`text-2xl md:text-3xl font-display font-bold ${color}`}>{value}</h4>
          <span className="text-[10px] font-mono text-emerald-400 mb-1">+{trend}%</span>
       </div>
    </div>
  );
}

const LOG_MESSAGES = [
  'Processing heuristic data',
  'Node Archive: Sync complete',
  'Core: Latency spike detected',
  'Applying quantum shield protocol',
  'Data stream v2 initialized',
  'Neural network backprop phase 4',
  'User session authorized: 8821',
  'Cache purge executed successfully',
  'Optimizing resource allocation',
  'Quantum: Cloud bridge stable'
];
