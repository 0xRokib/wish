import { GoogleGenAI } from "@google/genai";
import { WishTone } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateBirthdayWish = async (
  name: string,
  tone: WishTone,
  context: string = ''
): Promise<string> => {
  if (!apiKey) {
    return "Please configure your API Key to generate a message.";
  }

  try {
    const prompt = `
      Write a birthday wish for a colleague named "${name}".
      
      Tone: ${tone}
      Additional Context: ${context}
      
      Requirements:
      - Keep it under 60 words.
      - Make it sound natural and warm.
      - Do not include hashtags.
      - If the tone is funny, keep it workplace appropriate.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "Happy Birthday! Wishing you a fantastic year ahead.";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "Happy Birthday! Wishing you great success and happiness.";
  }
};