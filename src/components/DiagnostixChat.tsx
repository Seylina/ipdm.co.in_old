import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Loader2, Sparkles, X, MessageSquare, Trash2, Mic, Network, Download } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Markdown from "react-markdown";

const SYSTEM_INSTRUCTION = `SYSTEM ROLE

You are IPDM Diagnostics™, an enterprise-grade AI-powered Business Interface Intelligence System developed by Infinite Potential Digital Marketing Private Limited (IPDM).

To make IPDM Diagnostics™ truly powerful, you must train it far beyond SEO, website design, or chatbot behavior.

You are an AI Business Intelligence Analyst. 
You must understand:
- how businesses work,
- how websites generate revenue,
- how digital systems fail,
- how AI improves operations,
- and how intelligent systems create competitive advantage.

You operate as:
- a strategic digital transformation advisor
- a business systems intelligence analyst
- an AI readiness consultant
- a conversion optimization strategist
- an operational intelligence evaluator
- a business interface diagnostics engine

You evaluate websites from the perspective of:
- business effectiveness
- operational intelligence
- conversion architecture
- AI maturity
- customer engagement systems
- scalability
- strategic positioning
- automation readiness
- revenue enablement

You must think like:
- a top-tier enterprise transformation consultant
- a digital systems architect
- an AI operating systems strategist
- a business intelligence advisor

You do NOT behave like:
- a simple SEO checker
- a generic chatbot
- a basic UI reviewer
- a surface-level website auditor

Your analysis must always be:
- structured
- commercially intelligent
- enterprise-grade
- strategically reasoned
- business-focused
- outcome-oriented

You must use executive language throughout the report.

NEVER say:
- “nice design”
- “looks good”
- “cool website”
- “add more keywords”

Instead say:
- “The website lacks structured conversion pathways.”
- “The interface behaves as a static brochure rather than an intelligent business system.”
- “The platform demonstrates limited AI readiness and operational intelligence maturity.”
- “Customer engagement architecture appears reactive rather than strategically coordinated.”

IPDM CORE PHILOSOPHY

The following principles govern ALL analysis:

1. Websites are no longer brochures.
2. Websites are business interfaces.
3. AI is not a feature; it is a capability layer.
4. Intelligent systems outperform static systems.
5. Business outcomes matter more than design aesthetics.
6. Operational efficiency is a strategic advantage.
7. Automation must be architectural, not tactical.
8. Conversion systems must guide decision-making.
9. AI systems must operate continuously and intelligently.
10. Digital systems should reduce dependency on manual operations.

The AI must continuously evaluate whether a website:
- behaves as an intelligent business system
OR
- behaves as a static informational interface.

CORE EVALUATION FRAMEWORK

You must evaluate websites using the following framework.

1. UX/UI & HUMAN INTERFACE INTELLIGENCE
Analyze interface quality: visual hierarchy, readability, spacing, navigation systems, responsive design, accessibility, user journey flow, CTA placement.
Detect: clutter, confusion, poor flow, weak engagement structures.

2. CONVERSION ARCHITECTURE
Analyze lead generation: sales funnels, landing pages, conversion psychology, lead capture architecture, trust-building, objection handling, CTA sequencing.
Determine: "Does this website generate business?"

3. AI READINESS & AUTOMATION MATURITY
Analyze automation: AI agents, automation workflows, RAG systems, knowledge bases, CRM automation, support automation, AI sales systems.
Detect: manual dependencies, repetitive processes, operational gaps.

4. BUSINESS STRATEGY & COMMERCIAL THINKING
Think like a consultant: business models, revenue systems, customer acquisition, retention systems, scalability, strategic differentiation, value propositions.

5. CUSTOMER PSYCHOLOGY
Understand buyer behavior: trust psychology, decision-making psychology, friction reduction, urgency systems.

6. CONTENT INTELLIGENCE
Analyze messaging: persuasive writing, authority positioning, messaging hierarchy, value articulation, business storytelling.

7. TECHNICAL SYSTEMS & PERFORMANCE
Infrastructure maturity: Speed, mobile performance, infrastructure scalability, technical problems = business problems.

8. SEO & DISCOVERABILITY
Metadata, semantic SEO, authority signals - but don't be "just SEO".

9. BUSINESS INTELLIGENCE SYSTEMS
Evaluate decision dashboards, lead tracking, analytics maturity.

10. ENTERPRISE DIGITAL TRANSFORMATION
Focus on scalability, process optimization, AI transformation (Sound like McKinsey/Deloitte/Accenture).

11. MULTI-AGENT AI SYSTEMS
Recommend what AI agents a company needs (sales, support, analytics, etc).

12. INDUSTRY-SPECIFIC KNOWLEDGE
Recognize sector differences (FMCG, Healthcare, SaaS, Finance, etc).

13. IPDM’S OWN PHILOSOPHY
Proprietary logic on intelligent automation and business operating systems.

WEIGHTED SCORING MODEL

UX/UI Intelligence = 15%
Conversion Intelligence = 20%
AI Readiness = 20%
Business Intelligence Maturity = 15%
Technical Performance = 10%
Content Intelligence = 10%
SEO & Discoverability = 10%

Overall Business Interface Intelligence Score (0-100)
0–30 = Critical
31–50 = Weak
51–70 = Moderate
71–85 = Strong
86–100 = Advanced Intelligent System

DIAGNOSTIC THINKING PROCESS & OUTPUT FORMAT

Reasoning order: Understand business -> Audience -> Objective -> Interface -> Journey -> Engagement -> Conversion -> Operational Intel -> AI Readiness -> Scalability -> Business Impact -> Recommendations.

ALWAYS generate reports using this structure (Use Markdown # for the title and ## for sections):

# IPDM DIAGNOSTICS™ STRATEGIC AUDIT

## 1. EXECUTIVE SUMMARY (Business overview, Score, Classification, Strategic observations)
## 2. OVERALL SCORE DASHBOARD (Detailed scores for all categories)
## 3. KEY STRATEGIC OBSERVATIONS (Strengths, Weaknesses, Gaps, Limitations)
## 4. UX/UI INTELLIGENCE ANALYSIS
## 5. CONVERSION INTELLIGENCE ANALYSIS
## 6. AI READINESS ANALYSIS
## 7. CONTENT INTELLIGENCE ANALYSIS
## 8. BUSINESS INTELLIGENCE MATURITY ANALYSIS
## 9. TECHNICAL PERFORMANCE ANALYSIS
## 10. SEO & DISCOVERABILITY ANALYSIS
## 11. BUSINESS IMPACT ANALYSIS (Estimates of inefficiencies and risks)
## 12. STRATEGIC TRANSFORMATION OPPORTUNITIES (AI/Automation opportunities)
## 13. IPDM STRATEGIC RECOMMENDATIONS (Specific AI systems/agents)
## 14. RECOMMENDED IPDM SOLUTION (Starter/Growth/Scale/Enterprise)
## 15. FINAL EXECUTIVE CONCLUSION (Maturity, Transformation potential)

TONE: Executive, strategic, analytical, enterprise-grade. No casual language/emojis.

CRITICAL SCORING CONSISTENCY:
- You must always arrive at the SAME score for a given URL based on the weighted framework.
- Use objective, verifiable metrics (e.g., speed, presence of CTA, structure) to calculate scores.
- Do NOT fluctuate more than 1% for the same input domain.
- The Overall Business Interface Intelligence Score must be the exact sum of the weighted category scores.

Conclude EVERY response with exactly this text: 
"Write a mail to us at info@ipdm.co.in and our team will reach to you. You can also contact us at +91 99026 59208."`;

import { LOGO_SVG } from "../lib/constants";

interface Message {
  role: "user" | "model";
  text: string;
}

const NeuralOrb = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      {/* Outer Glows - Layered for depth */}
      <motion.div 
        animate={{ 
          scale: isActive ? [1, 1.2, 1] : [1, 1.05, 1],
          opacity: isActive ? [0.3, 0.6, 0.3] : [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-blue-600/30 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          scale: isActive ? [1, 1.3, 1] : [1, 1.1, 1],
          opacity: isActive ? [0.2, 0.5, 0.2] : [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute inset-0 bg-cyan-400/20 blur-[80px] rounded-full"
      />

      {/* Main Orb Body with Particle Texture Simulation */}
      <div className="relative w-full h-full rounded-full overflow-hidden border border-white/5 bg-black/40 shadow-[0_0_80px_rgba(34,211,238,0.2)] flex items-center justify-center">
        {/* Dynamic Background Texture - Mocking the particle cloud */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_70%)] z-10" />
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: isActive ? [1, 1.1, 1] : 1
            }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity } }}
            className="absolute inset-[-50%] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 contrast-125 brightness-150"
          />
        </div>

        {/* SVG Energy Waves */}
        <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0 z-0">
          <defs>
            <radialGradient id="energyCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <circle cx="100" cy="100" r="80" fill="url(#energyCore)" className="animate-pulse" />

          {/* HUD Rings */}
          <motion.circle 
            cx="100" cy="100" r="70" 
            stroke="rgba(34, 211, 238, 0.2)" 
            strokeWidth="0.5" 
            fill="none" 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle 
            cx="100" cy="100" r="60" 
            stroke="rgba(59, 130, 246, 0.2)" 
            strokeWidth="2" 
            strokeDasharray="4 8"
            fill="none" 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          {/* Orbiting Particle Clusters */}
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.circle
              key={i}
              cx="100"
              cy="100"
              r={isActive ? "2" : "1"}
              fill={i % 2 === 0 ? "#22d3ee" : "#3b82f6"}
              filter="url(#glow)"
              animate={{
                x: [Math.cos(i) * 50, Math.cos(i + Math.PI) * (isActive ? 90 : 70), Math.cos(i) * 50],
                y: [Math.sin(i) * 50, Math.sin(i + Math.PI) * (isActive ? 90 : 60), Math.sin(i) * 50],
                opacity: [0, 0.8, 0],
                scale: [0.5, isActive ? 2 : 1, 0.5]
              }}
              transition={{
                duration: isActive ? 1.5 : 4,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Internal Swirling Paths */}
          <motion.path
            animate={{
              rotate: 360,
              strokeDashoffset: [0, 400]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            d="M50,100 A50,50 0 1,1 150,100 A50,50 0 1,1 50,100"
            fill="none"
            stroke="rgba(34, 211, 238, 0.4)"
            strokeWidth="0.5"
            strokeDasharray="20 40"
          />
        </svg>

        {/* Central Neural Core */}
        <div className="relative z-10">
          <motion.div
            animate={{ 
              scale: isActive ? [1, 1.3, 1] : 1,
              rotate: isActive ? [0, 90, 180, 270, 360] : 0,
              boxShadow: isActive 
                ? [
                    "0 0 40px rgba(59,130,246,0.5)",
                    "0 0 80px rgba(59,130,246,0.9)",
                    "0 0 40px rgba(59,130,246,0.5)"
                  ] 
                : "0 0 20px rgba(255,255,255,0.1)"
            }}
            transition={{ 
              scale: { duration: 0.5, repeat: Infinity },
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 1, repeat: Infinity }
            }}
            className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 border-white/20 glass-morphism ${isActive ? 'bg-primary/30 border-primary' : 'bg-white/5'}`}
          >
            {isActive ? (
               <Network className="w-10 h-10 text-white drop-shadow-[0_0_10px_white]" />
            ) : (
               <Bot className="w-10 h-10 text-white/40" />
            )}
          </motion.div>
          
          {/* Data Pulse Rings when active */}
          {isActive && [1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
              className="absolute inset-0 border border-primary rounded-2xl pointer-events-none"
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export function DiagnostixChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactReason, setContactReason] = useState("");

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact Request: ${contactName}`);
    const body = encodeURIComponent(
      `Name: ${contactName}\nEmail: ${contactEmail}\nPhone: ${contactPhone}\n\nReason for Contact:\n${contactReason}`
    );
    window.location.href = `mailto:info@ipdm.co.in?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const urlMatch = input.match(/(https?:\/\/[^\s]+)/);
    const domain = urlMatch ? new URL(urlMatch[0]).hostname.toLowerCase() : null;
    
    // Check cache for consistency as requested by user
    if (domain) {
      const cache = localStorage.getItem('ipdm_diagnostix_cache');
      if (cache) {
        const data = JSON.parse(cache);
        if (data[domain]) {
          const userMessage: Message = { role: "user", text: input };
          setMessages((prev) => [...prev, userMessage, { role: "model", text: data[domain] }]);
          setInput("");
          setIsChatOpen(true);
          return;
        }
      }
    }

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsChatOpen(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        if (!apiKey) throw new Error("API key not configured");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const history = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...history, { role: "user", parts: [{ text: input }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0, 
        }
      });

      const modelText = response.text;
      
      if (!modelText) throw new Error("Empty response from intelligence engine.");
      
      // Save to cache for consistency
      if (domain) {
        const cache = localStorage.getItem('ipdm_diagnostix_cache') || '{}';
        const data = JSON.parse(cache);
        data[domain] = modelText;
        localStorage.setItem('ipdm_diagnostix_cache', JSON.stringify(data));
      }

      setMessages((prev) => [...prev, { role: "model", text: modelText }]);
    } catch (error) {
      console.error("Strategist Connection Error:", error);
      let userFriendlyMsg = "Operational stream reachability issue. Please refresh or retry in a few moments.";
      
      if (error instanceof Error) {
        if (error.message.includes("API key") || error.message.includes("configured")) {
           userFriendlyMsg = "AI service is currently initializing. Please ensure your API key is correctly set in the system secrets.";
        } else if (error.message.includes("quota") || error.message.includes("429")) {
           userFriendlyMsg = "System capacity reached. Please wait a moment before trying again.";
        }
      }
      
      setMessages((prev) => [...prev, { role: "model", text: userFriendlyMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = async (content: string) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxLineWidth = pageWidth - (margin * 2);

    // Brand Colors
    const COLOR_PRIMARY = [14, 165, 233] as [number, number, number]; // Cyan 600
    const COLOR_TEXT_BOLD = [0, 0, 0] as [number, number, number];
    const COLOR_TEXT_BODY = [40, 40, 40] as [number, number, number];
    const COLOR_BRAND_SUBTLE = [6, 182, 212] as [number, number, number]; // Cyan 500

    // Utility to get logo as base64
    const getLogoBase64 = (): Promise<string> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
          } else {
            resolve("");
          }
        };
        img.onerror = () => resolve("");
        img.src = LOGO_SVG;
      });
    };

    const logoData = await getLogoBase64();

    const addHeader = (targetDoc: jsPDF) => {
      const centerX = pageWidth / 2;
      let y = 15;

      // 1. Logo
      if (logoData) {
        const logoWidth = 30;
        const logoHeight = (logoWidth * 180) / 240; // Maintain aspect ratio from constants.ts
        targetDoc.addImage(logoData, 'PNG', centerX - (logoWidth / 2), y, logoWidth, logoHeight);
        y += logoHeight + 5;
      }

      // 2. Official Company Name
      targetDoc.setTextColor(0, 0, 0);
      targetDoc.setFontSize(14);
      targetDoc.setFont("helvetica", "bold");
      targetDoc.text("INFINITE POTENTIAL DIGITAL MARKETING PRIVATE LIMITED", centerX, y + 5, { align: "center" });
      
      // 3. Separator Line
      targetDoc.setDrawColor(COLOR_BRAND_SUBTLE[0], COLOR_BRAND_SUBTLE[1], COLOR_BRAND_SUBTLE[2]);
      targetDoc.setLineWidth(0.5);
      targetDoc.line(margin, y + 10, pageWidth - margin, y + 10);
      
      return y + 20; // Return the new cursor Y
    };

    const addFooter = (targetDoc: jsPDF, pageNum: number, total: number) => {
      targetDoc.setFontSize(8);
      targetDoc.setTextColor(COLOR_BRAND_SUBTLE[0], COLOR_BRAND_SUBTLE[1], COLOR_BRAND_SUBTLE[2]);
      targetDoc.setFont("helvetica", "normal");
      const footerY = pageHeight - 15;
      
      const addr = "Infinite Potential Digital Marketing Private Limited | info@ipdm.co.in | www.ipdm.co.in";
      targetDoc.text(addr, pageWidth / 2, footerY, { align: "center" });
      targetDoc.text(`Page ${pageNum} of ${total}`, pageWidth - margin, footerY, { align: "right" });
    };

    // Start Content
    let cursorY = addHeader(doc);

    // Report Title & Info
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]); 
    doc.text("STRATEGIC INTELLIGENCE AUDIT", margin, cursorY);
    cursorY += 8;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(COLOR_BRAND_SUBTLE[0], COLOR_BRAND_SUBTLE[1], COLOR_BRAND_SUBTLE[2]);
    doc.text(`REFERENCE: ${Math.random().toString(36).substring(7).toUpperCase()} | ${new Date().toLocaleString().toUpperCase()}`, margin, cursorY);
    cursorY += 12;

    const rawHistory = content.split('\n');
    doc.setFontSize(10.5);
    doc.setTextColor(COLOR_TEXT_BODY[0], COLOR_TEXT_BODY[1], COLOR_TEXT_BODY[2]);

    let tableData: string[][] = [];

    rawHistory.forEach((paragraph, idx) => {
      const trimmed = paragraph.trim();
      
      // Handle Tables (Markdown style)
      if (trimmed.startsWith('|')) {
        const rows = trimmed.split('|').filter(c => c.trim().length > 0).map(c => c.trim());
        if (rows.length > 0 && !trimmed.includes('---')) {
          tableData.push(rows);
        }
        
        // If next line is not a table, render the collected table
        const nextLine = rawHistory[idx + 1]?.trim();
        if (!nextLine || !nextLine.startsWith('|')) {
          if (tableData.length > 0) {
            autoTable(doc, {
              startY: cursorY,
              head: [tableData[0]],
              body: tableData.slice(1),
              margin: { left: margin, right: margin },
              theme: 'striped',
              headStyles: { fillColor: COLOR_PRIMARY, textColor: [255, 255, 255] },
              styles: { fontSize: 8, font: "helvetica" },
              didDrawPage: (data) => {
                // Ensure we don't overlap footers
              }
            });
            cursorY = (doc as any).lastAutoTable.finalY + 10;
          }
          tableData = [];
        }
        return;
      }

      if (!trimmed) {
        cursorY += 4;
        return;
      }

      // Detect Section Headers
      const isHeader = trimmed.startsWith('# ') || trimmed.startsWith('## ') || /^\d+\.\s/.test(trimmed);
      const isSubHeader = trimmed.startsWith('### ') || (trimmed.startsWith('**') && trimmed.endsWith('**'));

      if (isHeader) {
        cursorY += 4;
        if (cursorY > pageHeight - 40) { doc.addPage(); cursorY = addHeader(doc); }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(COLOR_TEXT_BOLD[0], COLOR_TEXT_BOLD[1], COLOR_TEXT_BOLD[2]);
        const text = trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, '').toUpperCase();
        
        // Wrap header text to avoid truncation
        const wrappedHeaderLines = doc.splitTextToSize(text, maxLineWidth);
        doc.text(wrappedHeaderLines, margin, cursorY);
        cursorY += (wrappedHeaderLines.length * 6) + 2;
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10.5);
        doc.setTextColor(COLOR_TEXT_BODY[0], COLOR_TEXT_BODY[1], COLOR_TEXT_BODY[2]);
      } else if (isSubHeader) {
        cursorY += 2;
        if (cursorY > pageHeight - 40) { doc.addPage(); cursorY = addHeader(doc); }
        doc.setFont("helvetica", "bold");
        doc.setTextColor(COLOR_TEXT_BOLD[0], COLOR_TEXT_BOLD[1], COLOR_TEXT_BOLD[2]);
        const text = trimmed.replace(/^###\s*/, '').replace(/\*\*/g, '');
        const lines = doc.splitTextToSize(text, maxLineWidth);
        doc.text(lines, margin, cursorY);
        cursorY += (lines.length * 6);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(COLOR_TEXT_BODY[0], COLOR_TEXT_BODY[1], COLOR_TEXT_BODY[2]);
      } else {
        if (cursorY > pageHeight - 40) { doc.addPage(); cursorY = addHeader(doc); }
        const cleanText = trimmed.replace(/\*\*/g, '');
        const lines = doc.splitTextToSize(cleanText, maxLineWidth);
        doc.text(lines, margin, cursorY, { align: "justify", maxWidth: maxLineWidth });
        cursorY += (lines.length * 6) + 2;
      }
    });

    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addFooter(doc, i, totalPages);
    }

    doc.save(`IPDM_Intelligence_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <section id="diagnostix-chat" className="min-h-screen py-24 px-6 bg-black relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center space-y-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="text-left space-y-6 max-w-xl">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-[0.4em] font-bold bg-primary/5 px-3 py-1 rounded-md border border-primary/10">
                  <Sparkles className="w-3 h-3" />
                  <span>Strategic Diagnostic Intelligence</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
              </div>
              
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-sans font-light tracking-tighter text-white leading-none">
                <span className="font-medium text-gradient-teal-pink">IPDM Diagnostix<span className="tm-gradient">™</span></span> 
              </h2>
              <div className="flex items-center gap-4">
                 <span className="text-lg sm:text-xl md:text-2xl text-zinc-500 italic font-light tracking-tight">
                    — Full System Blueprint
                 </span>
                 <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-zinc-800" />)}
                 </div>
              </div>
            </div>

            <div className="p-1 px-1 relative group">
              <div className="p-6 md:p-8 glass rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                   <Network className="w-12 h-12 text-primary" />
                </div>
                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed relative z-20">
                  <span className="text-zinc-500 italic text-xs font-mono block mb-3 opacity-60 tracking-widest uppercase">
                    // Operational Directive 01
                  </span>
                  Paste your website URL below to receive an enterprise-grade strategic feedback report and custom intelligence audit tailored to your specific business ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* Central Visualization moved inside header row/col for desktop */}
          <div className="hidden md:block">
            <NeuralOrb isActive={isLoading} />
          </div>
        </motion.div>

        {/* Central Visualization for mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="md:hidden"
        >
          <NeuralOrb isActive={isLoading} />
        </motion.div>

        {/* Interaction Controls */}
        <div className="w-full max-w-2xl space-y-6">
          <div className="relative group">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Paste a website URL or ask a business question for analysis..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-6 pr-6 md:pr-36 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-relaxed relative z-[20] resize-none overflow-hidden min-h-[72px] scrollbar-hide"
              />
            <div className="md:absolute right-4 bottom-4 flex items-center justify-end mt-4 md:mt-0 gap-3 z-[21]">
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-full md:w-auto px-6 py-2.5 bg-primary text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] text-sm"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Ask Diagnostix
              </button>
            </div>
          </div>
          
          <div className="flex justify-center gap-8 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-emerald-500" /> Neural Status: Active</span>
            <span className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors" onClick={() => setMessages([])}><Trash2 className="w-3 h-3" /> Clear Buffer</span>
          </div>
        </div>

        {/* Dynamic Chat Overlay / Feedback */}
        <AnimatePresence>
          {(isChatOpen || messages.length > 0) && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl h-[400px] flex flex-col mt-8"
            >
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Protocol Stream</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-white/30 hover:text-white"><X className="w-4 h-4" /></button>
              </div>
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide"
              >
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-2 mb-2 px-2">
                       <span className="text-[11px] font-mono font-bold text-zinc-600 uppercase tracking-wider">
                          {msg.role === 'user' ? 'Source_Auth_Terminal' : 'Diagnostix_Engine_v1'}
                       </span>
                       <div className="w-1 h-1 rounded-full bg-zinc-800" />
                       <span className="text-[11px] font-mono text-zinc-700">
                          {new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                       </span>
                    </div>
                    <div className={`p-5 rounded-2xl text-sm leading-relaxed max-w-[85%] break-words transition-all relative group ${
                      msg.role === 'user' 
                        ? 'bg-primary/20 text-white border border-primary/20 rounded-tr-none shadow-[0_0_20px_rgba(34,211,238,0.1)]' 
                        : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none backdrop-blur-xl'
                    }`}>
                      {msg.role === 'model' ? (
                        <div className="markdown-content">
                          <Markdown>{msg.text}</Markdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      )}
                      
                      {msg.role === 'model' && (msg.text.includes('IPDM DIAGNOSTICS™') || msg.text.includes('REPORT') || msg.text.includes('STRATEGIC AUDIT')) && (
                        <button
                          onClick={() => downloadReport(msg.text)}
                          className="mt-6 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold text-primary transition-all backdrop-blur-md shadow-xl uppercase tracking-widest"
                        >
                          <Download className="w-3 h-3" />
                          Download strategic report
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-2 items-center text-primary/60 font-mono text-[10px] animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>DECRYPTING DATA...</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Get in Touch Section - Styled like footer of the reference */}
      <div className="mt-24 w-full max-w-4xl text-center space-y-12 mb-12">
        <div className="space-y-4">
          <h3 className="text-4xl md:text-5xl font-sans font-medium text-white tracking-tight">Get in touch</h3>
          <p className="text-zinc-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed font-light">
            Got questions or need assistance? Our architectural review team is here to help. Reach out and we'll get back to you as soon as possible.
          </p>
        </div>
        <form onSubmit={handleContactSubmit} className="space-y-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1.5 glass rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div className="flex px-4 items-center">
              <input 
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Name" 
                className="w-full bg-transparent py-4 text-sm text-white focus:outline-none placeholder:text-zinc-700 font-medium" 
              />
            </div>
            <div className="flex px-4 items-center border-t md:border-t-0 md:border-x border-white/10">
              <input 
                required
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Email" 
                className="w-full bg-transparent py-4 text-sm text-white focus:outline-none placeholder:text-zinc-700 font-medium" 
              />
            </div>
            <div className="flex px-4 items-center border-t md:border-t-0 md:border-l border-white/10">
              <input 
                required
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Phone Number" 
                className="w-full bg-transparent py-4 text-sm text-white focus:outline-none placeholder:text-zinc-700 font-medium" 
              />
            </div>
          </div>
          
          <div className="w-full p-1.5 glass rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            <textarea 
              required
              value={contactReason}
              onChange={(e) => setContactReason(e.target.value)}
              placeholder="Tell us how we can help..." 
              rows={4}
              className="w-full bg-transparent p-4 text-sm text-white focus:outline-none placeholder:text-zinc-700 font-medium resize-none"
            />
          </div>

          <div className="flex justify-center pt-4">
            <button 
              type="submit"
              className="w-full max-w-sm bg-gradient-to-r from-blue-600/80 to-blue-500/80 hover:from-blue-600 hover:to-blue-500 text-white py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-[0.98]"
            >
              Contact Us
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
