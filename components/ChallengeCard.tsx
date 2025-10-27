import React, { useState, useEffect } from 'react';
import { Module } from '../types';
import { generateChallenge } from '../services/geminiService';
import { TokenIcon } from '../constants';
import { moduleColorStyles } from './Modules';

interface ChallengeCardProps {
    module: Module;
    onClose: () => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ module, onClose }) => {
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
        <div className="p-4 sm:p-6 animate-fade-in">
            <button onClick={onClose} className="text-brand-primary font-semibold mb-4">&larr; Back to Modules</button>
            <div className={`bg-brand-surface rounded-xl shadow-lg p-6 border-t-4 ${colorStyle.border}`}>
                <header className="text-center mb-6">
                    <h2 className={`text-sm font-bold uppercase tracking-widest ${colorStyle.text}`}>Module {module.id} Challenge</h2>
                    <h1 className="text-2xl font-bold text-brand-text-primary mt-1">{module.theme}</h1>
                </header>

                <div className="bg-gray-800 rounded-lg p-4 min-h-[120px] flex items-center justify-center text-center">
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
                    ) : error ? (
                        <p className="text-red-400">{error}</p>
                    ) : (
                        <p className="text-brand-text-secondary italic">"{challengeText}"</p>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <div className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center">
                        <TokenIcon className={`w-10 h-10 mb-2 ${colorStyle.text}`} />
                        <p className="font-bold text-brand-text-primary">Earn 1 Token</p>
                        <p className="text-xs text-brand-text-secondary">Add it to your physical kit!</p>
                    </div>

                    <button className={`w-full mt-4 font-bold text-white py-3 px-4 rounded-md transition duration-200 ${colorStyle.button}`}>
                        Complete Challenge
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChallengeCard;