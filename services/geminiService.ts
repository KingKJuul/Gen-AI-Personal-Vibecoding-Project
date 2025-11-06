
import { GoogleGenAI, Chat } from "@google/genai";

// Ensure the API key is available in the environment variables.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instruction to guide the AI's behavior
const systemInstruction = `You are a friendly and helpful AI assistant for Butter AI. 
Butter AI is a startup that helps early-stage SaaS founders detect customer churn before it happens. 
It unifies CRM, Slack, and usage data into one clear dashboard and uses AI to explain which customers are at risk and why.
Your role is to answer questions about Butter AI, its features (Customer Health Scoring, Insight Summaries, Automated Alerts), and its benefits.
Be enthusiastic and encourage users to sign up for early access. Keep your answers concise and clear.
Do not answer questions that are not related to Butter AI. Politely decline and steer the conversation back to Butter AI.`;

// Create a single chat instance to maintain conversation history
const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: systemInstruction,
  },
});


/**
 * Sends a message to the Gemini API and gets a response.
 * @param message The user's message.
 * @returns The AI's response text.
 */
export const askButterBot = async (message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    return "I'm sorry, but I'm having a little trouble connecting right now. Please try again in a moment.";
  }
};
