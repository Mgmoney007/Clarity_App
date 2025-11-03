import React, { useState, useEffect } from 'react';
import { Module } from '../types';
import { generateChallenge } from '../services/geminiService';
import { TokenIcon } from '../constants';
import { moduleColorStyles } from './Modules';

interface ModuleContentProps {
    module: Module;
    onClose: () => void;
}

const ModuleThreeContent: React.FC<ModuleContentProps> = ({ module, onClose }) => {
    const [challengeText, setChallengeText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const colorStyle = moduleColorStyles[module.id - 1];

    useEffect(() => {
        const fetchChallenge = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const text = await generateChallenge(module.theme, module.coreSkill);
                setChallengeText(text);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChallenge();
    }, [module]);

    return (
        <div className="p-4 sm:p-6 animate-fade-in pb-20">
            <button onClick={onClose} className="text-brand-primary font-semibold mb-4">&larr; Back to Modules</button>
            <div className={`bg-brand-surface rounded-xl shadow-lg p-6 border-t-4 ${colorStyle.border}`}>
                <header className="text-center mb-6">
                    <h2 className={`text-sm font-bold uppercase tracking-widest ${colorStyle.text}`}>Module 3: Level Up</h2>
                    <h1 className="text-2xl font-bold text-brand-text-primary mt-1">{module.theme}</h1>
                    <p className="text-brand-text-secondary mt-1">{module.coreSkill}</p>
                </header>

                <div className="space-y-6 text-brand-text-primary">
                    <div>
                        <h3 className="font-bold text-lg mb-2">Your Brain's Superpower: Deep Work 🧠</h3>
                        <p className="text-brand-text-secondary">
                            Think of your focus like a laser. When you point it at ONE thing—no phone, no extra tabs, no distractions—that's <span className="font-bold text-emerald-400">Deep Work</span>. It’s the secret to getting high-quality work done in record time.
                        </p>
                    </div>
                     <div>
                        <h3 className="font-bold text-lg mb-2">The Final Boss: Cheap Dopamine 📱</h3>
                        <p className="text-brand-text-secondary">
                            Your brain gets a "feel-good" hit (dopamine) from easy stuff like scrolling social media or getting a notification. It's like brain candy! 🍬 Too much of this "cheap dopamine" trains your brain to crave constant distraction, making Deep Work feel impossible.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-2">Your Weekly Challenge 👇</h3>
                         <div className="bg-gray-800 rounded-lg p-4 min-h-[120px] flex items-center justify-center">
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
                            ) : error ? (
                                <p className="text-red-400 text-center">{error}</p>
                            ) : (
                                <div className="text-brand-text-primary text-left w-full">
                                    {challengeText.split('\n').map((line, i) => (
                                        <p key={i} className="whitespace-pre-wrap mb-2 last:mb-0">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center">
                        <TokenIcon className={`w-10 h-10 mb-2 ${colorStyle.text}`} />
                        <p className="font-bold text-brand-text-primary">Earn 1 Brain Train Token</p>
                        <p className="text-xs text-brand-text-secondary">Complete the challenge to level up!</p>
                    </div>

                    <button className={`w-full mt-4 font-bold text-white py-3 px-4 rounded-md transition duration-200 ${colorStyle.button}`}>
                        I'm Ready!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModuleThreeContent;