import { GoogleGenAI } from "@google/genai";
import { BASE_TRAINING } from "./astra/base";
import { CATEGORY_1 } from "./astra/category1";
import { CATEGORY_2 } from "./astra/category2";
import { CATEGORY_3 } from "./astra/category3";
import { CATEGORY_4 } from "./astra/category4";
import { CATEGORY_5 } from "./astra/category5";
import { CATEGORY_6 } from "./astra/category6";
import { CATEGORY_7 } from "./astra/category7";
import { CATEGORY_8 } from "./astra/category8";
import { CATEGORY_9 } from "./astra/category9";
import { CATEGORY_10 } from "./astra/category10";
import { CATEGORY_11 } from "./astra/category11";
import { CATEGORY_12 } from "./astra/category12";
import { CATEGORY_13 } from "./astra/category13";
import { CATEGORY_14 } from "./astra/category14";

const TRAINING_DATA = `
${BASE_TRAINING}

${CATEGORY_1}

${CATEGORY_2}

${CATEGORY_3}

${CATEGORY_4}

${CATEGORY_5}

${CATEGORY_6}

${CATEGORY_7}

${CATEGORY_8}

${CATEGORY_9}

${CATEGORY_10}

${CATEGORY_11}

${CATEGORY_12}

${CATEGORY_13}

${CATEGORY_14}
`;

let ai: GoogleGenAI | null = null;

function getAI() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is missing.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export async function askAstra(prompt: string, history: any[] = []) {
  try {
    const client = getAI();
    
    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are IPDM ASTRA™, the master executive intelligence layer. 
        
        ${TRAINING_DATA}
        
        CRITICAL: Your output MUST strictly follow the 7-point response architecture provided in the training document.
        Always maintain an executive, strategic tone. Never act like a casual chatbot.`
      }
    });

    return response.text || "";
  } catch (error) {
    console.error("Astra Service Error:", error);
    throw error;
  }
}
