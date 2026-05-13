import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateBusinessInsight(industry: string, audience: string, challenge: string) {
  try {
    const prompt = `You are the IPDM (Infinite Potential Digital Marketing) Strategy Engine. 
    Analyze the following business parameters and provide a concise, high-impact 3-point AI-driven tactical growth plan.
    
    Industry: ${industry}
    Target Audience: ${audience}
    Critical Challenge: ${challenge}
    
    Structure your response as follows:
    1. [Strategy Title]: [Short Description]
    2. [Strategy Title]: [Short Description]
    3. [Strategy Title]: [Short Description]
    
    Keep it visionary, elite, and focused on AI systems rather than traditional marketing. Be concise.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        maxOutputTokens: 300,
        temperature: 0.8,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate tactical insight. Please try again.";
  }
}

export async function chatWithAI(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: "You are the Infinite Potential AI assistant. You represent an AI-first technology company that builds intelligent business systems, not just websites. Be professional, visionary, and concise. Your goal is to explain why companies need AI-integrated systems rather than just digital brochures." }] // System instruction style
        },
        ...history.map(h => ({ role: h.role === 'model' ? 'model' as const : 'user' as const, parts: h.parts })),
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        maxOutputTokens: 500,
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my neural network right now. Please try again later.";
  }
}
