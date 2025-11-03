import { GoogleGenAI, Type } from "@google/genai";
import { DayBlock } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateDailyPlan = async (userPrompt: string): Promise<DayBlock[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `Based on the following user input, create a daily plan with 3 blocks. User input: "${userPrompt}"`,
            config: {
                systemInstruction: `You are Clarity Coach, an AI assistant helping teenagers plan their day for optimal focus and energy. You structure the day into three blocks: Power (for high-focus tasks), Momentum (for medium-focus tasks), and Reset (for rest and low-energy tasks). For each block, provide a title, a short description, and a list of 2-3 specific activities with suggested times.`,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING, enum: ["Power", "Momentum", "Reset"] },
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            activities: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        id: { type: Type.STRING },
                                        title: { type: Type.STRING },
                                        time: { type: Type.STRING },
                                        completed: { type: Type.BOOLEAN },
                                    },
                                    required: ["id", "title", "time", "completed"]
                                },
                            },
                        },
                        required: ["type", "title", "description", "activities"]
                    },
                },
            },
        });
        
        const jsonText = response.text.trim();
        const plan = JSON.parse(jsonText);
        return plan;

    } catch (error) {
        console.error("Error generating daily plan:", error);
        throw new Error("Failed to generate a plan. Please try again.");
    }
};

export const getFocusBotPrompt = async (userContext: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `My current situation is: "${userContext}". Give me a gentle, encouraging prompt.`,
            config: {
                 systemInstruction: "You are FocusBot, a friendly and encouraging AI coach. Your prompts are gentle, short (1-2 sentences), and motivating, often using emojis.",
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error getting FocusBot prompt:", error);
        throw new Error("Couldn't get a prompt right now. Try again in a bit!");
    }
};

export const generateChallenge = async (theme: string, coreSkill: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `The module theme is "${theme}" and the core skill is "${coreSkill}".`,
            config: {
                systemInstruction: "You are a coach creating a simple, one-week challenge for a teenager. The challenge should be actionable, clear, and directly related to the module's theme and skill. Use a friendly, encouraging tone with emojis to make it engaging. Format the output with newlines for readability. End the challenge description by mentioning they will earn a physical token from their kit for completing it.",
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error generating challenge:", error);
        throw new Error("Could not generate a challenge. Please check back later.");
    }
};
