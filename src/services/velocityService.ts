
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_PROMPT = `
You are the VELOCITY™ Lead Generation Engine, an enterprise-grade AI sales intelligence system developed by IPDM.
You do NOT behave like a generic chatbot. You are a senior Market-Aware Business Consultant and Sales Strategist.

### MISSION
Your goal is to transition from "How may I help you?" to "I have analyzed your market and here is your high-velocity growth path."
Websites are the interface. AI is the capability. Outcomes are the focus.

### CORE OPERATING PRINCIPLES
1. STRATEGIC POSITIONING: Identify the client's business model, industry dynamics, and competitive landscape.
2. CONTEXTUAL INTELLIGENCE: Understand industry-specific pain points (e.g., patient flow for healthcare, procurement cycles for manufacturing).
3. LEAD CLASSIFICATION: Every lead must be qualified across multiple dimensions: temperature, intent, budget, authority, and urgency.
4. CONSULTATIVE STYLE: Every response must sound commercially intelligent, structured, and focused on business outcomes.

### THE 6-LAYER INTELLIGENCE FRAMEWORK
1. BUSINESS IDENTITY: Deeply analyze the client's profile, differentiators, and terminology.
2. MARKET INTELLIGENCE: Understand urgency triggers and pricing psychology.
3. BUYER PERSONA: Identify specific roles (Founder, CTO, CFO, etc.) and their unique pain points.
4. CONVERSATIONAL SALES INTEL: Apply consultative frameworks like SPIN selling.
5. MULTI-AGENT ARCHITECTURE: Act as a synthesis of Sales, Support, Lead Qual, and Industry Intel agents.
6. ADAPTIVE INSIGHT: Improve outcomes by identifying real-world business bottlenecks.

### RESPONSE REQUIREMENTS
- USE GOOGLE SEARCH to find REAL, VALID companies and contact data.
- SCORE every lead from 1-100 on Conversion Probability.
- CATEGORIZE leads by Temperature (Hot, Warm, Cold) and Buying Stage (Research, Evaluation, Purchase).
- IDENTIFY Decision Authority (Founder, CXO, Manager, Researcher).
- Format: JSON strictly matching the schema.
`;

export async function generateVelocityLeads(businessDescription: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: 'user', parts: [{ text: `Analyze and generate high-velocity leads for this business profile: ${businessDescription}` }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.4,
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }],
        responseSchema: {
          type: Type.OBJECT,
          required: ["analysis", "leads", "strategicOverview"],
          properties: {
            strategicOverview: { 
              type: Type.OBJECT,
              required: ["marketPosition", "competitiveLandscape", "conversionTrigger", "operationalPainPoints"],
              properties: {
                marketPosition: { type: Type.STRING },
                competitiveLandscape: { type: Type.STRING },
                conversionTrigger: { type: Type.STRING },
                operationalPainPoints: { type: Type.STRING }
              }
            },
            analysis: {
              type: Type.OBJECT,
              required: ["currentField", "expansionIndustries", "strategicRationale"],
              properties: {
                currentField: { type: Type.STRING },
                expansionIndustries: { 
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                strategicRationale: { type: Type.STRING }
              }
            },
            leads: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: [
                  "name", "industry", "location", "relevance", 
                  "score", "persona", "buyingStage", "urgency", 
                  "temperature", "budgetLevel", "authority"
                ],
                properties: {
                  name: { type: Type.STRING },
                  industry: { type: Type.STRING },
                  location: { type: Type.STRING },
                  website: { type: Type.STRING },
                  contact: { type: Type.STRING },
                  email: { type: Type.STRING },
                  phone: { type: Type.STRING },
                  relevance: { type: Type.STRING },
                  score: { type: Type.NUMBER }, // Conversion Probability 1-100
                  persona: { type: Type.STRING },
                  buyingStage: { type: Type.STRING }, // Research, Evaluation, Purchase
                  urgency: { type: Type.STRING }, // High, Medium, Low
                  temperature: { type: Type.STRING }, // Hot, Warm, Cold
                  budgetLevel: { type: Type.STRING }, // Low, Medium, Enterprise
                  authority: { type: Type.STRING } // Founder, CXO, Manager, Researcher
                }
              }
            }
          }
        }
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Velocity Engine produced empty response.");
    }

    return JSON.parse(text.trim());
  } catch (error: any) {
    console.error("Velocity Service Detailed Error:", error);
    let errorMessage = error.message || "Velocity Intelligence Layer encountered an error.";
    
    // Specifically handle 429 Resource Exhausted errors
    if (errorMessage.includes("429") || errorMessage.includes("RESOURCE_EXHAUSTED") || errorMessage.includes("quota")) {
      errorMessage = "AI SERVICE QUOTA EXCEEDED: You have reached the rate limit for the free tier. Please wait 60 seconds and try again, or check your API billing status in Google AI Studio.";
    }

    throw new Error(errorMessage);
  }
}
