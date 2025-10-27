
import React, { useState } from 'react';
import { getFocusBotPrompt } from '../services/geminiService';

const FocusBot: React.FC = () => {
    const [prompt, setPrompt] = useState("✨ You've crushed your Output block — time for a 15-min Recharge?");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetAdvice = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const context = "I've been scrolling social media for an hour and my energy is low.";
            const newPrompt = await getFocusBotPrompt(context);
            setPrompt(newPrompt);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-brand-surface rounded-xl p-4 sm:p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">FocusBot AI Coach</h2>
            <div className="bg-gray-800 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
                {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-primary"></div>
                ) : error ? (
                    <p className="text-red-400 text-center">{error}</p>
                ) : (
                    <p className="text-brand-text-primary text-center italic">"{prompt}"</p>
                )}
            </div>
            <button
                onClick={handleGetAdvice}
                disabled={isLoading}
                className="mt-4 w-full bg-transparent border border-brand-primary text-brand-primary font-semibold py-2 px-4 rounded-md hover:bg-brand-primary hover:text-white transition duration-200 disabled:opacity-50"
            >
                Get a Gentle Prompt
            </button>
        </div>
    );
};

export default FocusBot;
