import { Brain, Users, Network, Cpu, Zap, TrendingUp, BarChart3, Sparkles, Activity, PenTool, Radio, Archive, Search, Sliders, Eye, Workflow, Code, RotateCw, MessageSquare, ShieldCheck, Gamepad2, Compass, Stethoscope, Terminal, Target } from "lucide-react";
import React from "react";

export interface SystemEngine {
  name: string;
  role: string;
  desc: string;
  icon: React.ReactNode;
  stats: Record<string, string>;
  tags: string[];
}

export interface SystemCategory {
  id: string;
  name: string;
  shortName: string;
  desc: string;
  engines: SystemEngine[];
}

export const SYSTEMS_ECOSYSTEM: SystemCategory[] = [
  {
    id: "core-intelligence",
    name: "Core Intelligence AI System",
    shortName: "Core Intelligence",
    desc: "The primary cognitive layer providing enterprise-grade reasoning and cross-functional coordination.",
    engines: [
      {
        name: "ASTRA™",
        role: "Decision Intelligence System",
        desc: "The central neural architecture for autonomous decision intelligence and cross-system orchestration.",
        icon: React.createElement(Brain),
        stats: { reasoning: "Enterprise", coordination: "Deep", uptime: "99.99%" },
        tags: ["Core", "Reasoning", "Intelligence"]
      }
    ]
  },
  {
    id: "decision-modeling",
    name: "Decision and Modeling AI System",
    shortName: "Decision & Modeling",
    desc: "Advanced logic engines designed for scenario-based forecasting and deterministic decision-making.",
    engines: [
      {
        name: "QUANTUM™",
        role: "Modeling & Decision Engine",
        desc: "Simulation-driven decision modeling for complex market environments and resource allocation.",
        icon: React.createElement(Cpu),
        stats: { precision: "99.98%", engine: "Stochastic", compute: "Edge-Optimized" },
        tags: ["Modeling", "Forecasting", "Quant"]
      }
    ]
  },
  {
    id: "revenue-growth",
    name: "Revenue and Growth AI System",
    shortName: "Revenue & Growth",
    desc: "Performance-oriented AI clusters optimized for demand generation and revenue lifecycle management.",
    engines: [
      {
        name: "VELOCITY™",
        role: "Lead Generation Engine",
        desc: "High-velocity demand generation system focused on identifying and acquiring high-intent prospects.",
        icon: React.createElement(Zap),
        stats: { conversion: "High", throughput: "Extreme", intent: "Verified" },
        tags: ["Leads", "Growth", "Demand Gen"]
      },
      {
        name: "CONVERTIX™",
        role: "Conversion Engine",
        desc: "Optimization engine designed to maximize conversion rates across all digital and physical touchpoints.",
        icon: React.createElement(Target),
        stats: { optimization: "Continuous", uplift: "Significant", friction: "Minimal" },
        tags: ["Conversion", "CRO", "Sales"]
      },
      {
        name: "PIPELINE™",
        role: "Revenue Intelligence Engine",
        desc: "Provides deep visibility into the revenue lifecycle, forecasting growth and identifying leakage.",
        icon: React.createElement(TrendingUp),
        stats: { forecasting: "Predictive", insight: "Deep", accuracy: "98%" },
        tags: ["Revenue", "Intelligence", "Analytics"]
      }
    ]
  },
  {
    id: "brand-content",
    name: "Brand and Content AI System",
    shortName: "Brand & Content",
    desc: "Creative intelligence layer for generating, managing, and optimizing multi-channel brand assets.",
    engines: [
      {
        name: "AURA™",
        role: "Brand Intelligence Engine",
        desc: "Ensures visual and communicative consistency across all digital touchpoints and platforms.",
        icon: React.createElement(Sparkles),
        stats: { fidelity: "High", consistency: "100%", speed: "Infinite" },
        tags: ["Brand", "Creative", "Visual"]
      },
      {
        name: "PULSE™",
        role: "Social Media Engine",
        desc: "Real-time market sentiment and trend analysis to inform content strategy and direction.",
        icon: React.createElement(Activity),
        stats: { monitoring: "24/7", reach: "Global", analysis: "Real-time" },
        tags: ["Sentiment", "Trends", "Social"]
      },
      {
        name: "SCRIBE™",
        role: "Blog & Content Engine",
        desc: "Proprietary language model optimized for brand-aligned editorial and technical content production.",
        icon: React.createElement(PenTool),
        stats: { throughput: "High", tone: "Adaptive", output: "Native-Level" },
        tags: ["Copywriting", "Editorial", "NLP"]
      },
      {
        name: "AMPLIFY™",
        role: "Distribution Engine",
        desc: "Automates the cross-platform distribution and scheduling of content for maximum reach.",
        icon: React.createElement(Radio),
        stats: { channels: "All-Major", automation: "Full", efficiency: "x10" },
        tags: ["Social", "Distribution", "Omnichannel"]
      }
    ]
  },
  {
    id: "knowledge-research",
    name: "Knowledge and Research AI System",
    shortName: "Knowledge & Research",
    desc: "Deep research and knowledge management clusters for processing vast amounts of unstructured data.",
    engines: [
      {
        name: "ARCHIVE™",
        role: "Knowledge Engine",
        desc: "Secure, intelligent repository for organizational knowledge and historical operational data.",
        icon: React.createElement(Archive),
        stats: { security: "Tier 4", storage: "Unlimited", recall: "< 10ms" },
        tags: ["Knowledge", "Database", "Secure"]
      },
      {
        name: "INSIGHTRA™",
        role: "Research Engine",
        desc: "Deploys deep research agents to scrape, summarize, and synthesize market intelligence.",
        icon: React.createElement(Search),
        stats: { depth: "Extreme", accuracy: "98.5%", speed: "High" },
        tags: ["Research", "Intelligence", "Synthesis"]
      },
      {
        name: "SYNAPSE™",
        role: "Decision Intelligence Engine",
        desc: "Identifies hidden correlations between disparate data sets to uncover strategic opportunities.",
        icon: React.createElement(Network),
        stats: { correlation: "0.9+", logic: "Graph-based", compute: "Parallel" },
        tags: ["Graph", "Correlations", "Insights"]
      },
      {
        name: "LENS™",
        role: "Analytics Engine",
        desc: "Computer vision engine for analyzing visual trends, patterns, and competitor assets.",
        icon: React.createElement(Eye),
        stats: { recognition: "99.2%", types: "Object/Text/Brand", latency: "Fast" },
        tags: ["Vision", "Visual-Intel", "OCR"]
      },
      {
        name: "IPDM SPECTRA™",
        role: "Autonomous Business Intelligence & Opportunity Discovery Infrastructure",
        desc: "Websites are public interfaces. Intelligence is the advantage. Opportunity is the outcome.",
        icon: React.createElement(Target),
        stats: { intelligence: "Autonomous", discovery: "Real-time", vantage: "Definitive" },
        tags: ["Business Intelligence", "Market Discovery", "Strategy Alignment"]
      }
    ]
  },
  {
    id: "operations-automations",
    name: "Operations and Automations AI System",
    shortName: "Operations & Automations",
    desc: "Infrastructure-level AI for optimizing internal processes, code, and evolving workflows.",
    engines: [
      {
        name: "FLOW™",
        role: "Workflow Engine",
        desc: "Dynamically manages and optimizes business processes through intelligent routing and execution.",
        icon: React.createElement(Workflow),
        stats: { throughuput: "Unlimited", sync: "Native", nodes: "Configurable" },
        tags: ["Workflows", "BPM", "Automation"]
      },
      {
        name: "CORE™",
        role: "Infrastructure Engine",
        desc: "Assists in the rapid development, testing, and deployment of custom software and AI layers.",
        icon: React.createElement(Code),
        stats: { lang: "Polyglt", safety: "High", speed: "Instant" },
        tags: ["DevOps", "Software", "Scripts"]
      },
      {
        name: "EVOLVE™",
        role: "Continuous Intelligence Engine",
        desc: "Self-optimizing system that learns from process data to suggest and implement efficiency improvements.",
        icon: React.createElement(RotateCw),
        stats: { learning: "Active", gain: "+15% / month", manual: "Zero-approx" },
        tags: ["ML", "Evolution", "Scaling"]
      }
    ]
  },
  {
    id: "customer-experience",
    name: "Customer Experience AI System",
    shortName: "Customer Experience",
    desc: "Intelligent interaction layers designed to provide seamless, high-value support and engagement.",
    engines: [
      {
        name: "ENGAGE™",
        role: "Interaction Engine",
        desc: "The primary user-facing intelligence portal for real-time engagement and guided journeys.",
        icon: React.createElement(MessageSquare),
        stats: { satisfaction: "CSAT 4.9", bounce: "-35%", speed: "Real-time" },
        tags: ["UI", "Interaction", "CX"]
      },
      {
        name: "SUPPORTA™",
        role: "Support Engine",
        desc: "Outcome-oriented support system that autonomously resolves complex user inquiries.",
        icon: React.createElement(ShieldCheck),
        stats: { FCR: "88%", avg_handle: "12s", sentiment: "Positive" },
        tags: ["Support", "Resolution", "Service"]
      }
    ]
  },
  {
    id: "advanced-strategic",
    name: "Advanced Strategic AI Systems",
    shortName: "Advanced Strategic",
    desc: "High-level strategic modeling and simulation systems for enterprise transformation.",
    engines: [
      {
        name: "SIMULATE™",
        role: "Scenario Engine",
        desc: "Creates digital twins of business environments to test strategic changes before deployment.",
        icon: React.createElement(Gamepad2),
        stats: { risk_reduction: "80%", fidelity: "99%" },
        tags: ["Simulation", "Digital-Twin", "Strategy"]
      },
      {
        name: "STRATEGOS™",
        role: "Strategic Intelligence Engine",
        desc: "Senior-level AI advisor capable of generating complex business strategies and roadmaps.",
        icon: React.createElement(Compass),
        stats: { wisdom_score: "9.8", depth: "Multidisciplinary", output: "Executive" },
        tags: ["Advisory", "Strategy", "Management"]
      }
    ]
  },
  {
    id: "queries-guiding",
    name: "Queries and Guiding AI Systems",
    shortName: "Queries & Guiding",
    desc: "Analytical tools for diagnosing business heath and providing real-time operational guidance.",
    engines: [
      {
        name: "DIAGNOSTIX™",
        role: "Health & Diagnostic Intelligence",
        desc: "Deep-scanning tool that evaluates business readiness across intelligence, revenue, and scale.",
        icon: React.createElement(Stethoscope),
        stats: { depth: "Full-Stack", audit_time: "5m", accuracy: "99.4%" },
        tags: ["Audit", "Vitals", "Health"]
      },
      {
        name: "JARVIS™",
        role: "Executive Guidance System",
        desc: "A personalized AI assistant for decision-makers, providing real-time insights and controls.",
        icon: React.createElement(Brain),
        stats: { availability: "24/7", access: "Secure", response: "Instant" },
        tags: ["Assistant", "Executive", "Control"]
      }
    ]
  }
];
