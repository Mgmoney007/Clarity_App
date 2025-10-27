
import React, { useState } from 'react';
import { DayBlock, Activity, BlockType } from '../types';
import { generateDailyPlan } from '../services/geminiService';
import { BoltIcon, BrainIcon, MoonIcon } from '../constants';

const BlockIcon: React.FC<{type: BlockType}> = ({ type }) => {
    const iconClass = "w-6 h-6 mr-3";
    switch (type) {
        case BlockType.Power:
            return <BrainIcon className={`${iconClass} text-purple-400`} />;
        case BlockType.Momentum:
            return <BoltIcon className={`${iconClass} text-green-400`} />;
        case BlockType.Reset:
            return <MoonIcon className={`${iconClass} text-blue-400`} />;
        default:
            return null;
    }
}

const Planner: React.FC = () => {
    const [plan, setPlan] = useState<DayBlock[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [prompt, setPrompt] = useState("Math test prep and soccer practice today.");
    const [activities, setActivities] = useState<Map<string, boolean>>(new Map());

    const handleGeneratePlan = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateDailyPlan(prompt);
            setPlan(result);
            const initialActivities = new Map<string, boolean>();
            result.forEach(block => block.activities.forEach(act => initialActivities.set(act.id, act.completed)));
            setActivities(initialActivities);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const toggleActivity = (id: string) => {
        setActivities(prev => {
            const newActivities = new Map(prev);
            newActivities.set(id, !newActivities.get(id));
            return newActivities;
        });
    };

    return (
        <div className="bg-brand-surface rounded-xl p-4 sm:p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Smart Focus Planner</h2>
            
            <div className="mb-4">
                <label htmlFor="prompt" className="block text-sm font-medium text-brand-text-secondary mb-1">What's on your plate today?</label>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input 
                        type="text"
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., History essay, basketball practice"
                        className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    />
                    <button
                        onClick={handleGeneratePlan}
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-brand-primary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Generating...' : 'Plan My Day'}
                    </button>
                </div>
            </div>

            {error && <p className="text-red-400 text-center my-4">{error}</p>}
            
            {isLoading && (
                 <div className="flex justify-center items-center my-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
                 </div>
            )}

            {plan && (
                <div className="space-y-4 mt-6">
                    {plan.map((block, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center">
                                <BlockIcon type={block.type} />
                                <div>
                                    <h3 className="font-bold text-lg">{block.title}</h3>
                                    <p className="text-sm text-brand-text-secondary">{block.description}</p>
                                </div>
                            </div>
                            <ul className="mt-4 space-y-2">
                                {block.activities.map((activity) => (
                                    <li key={activity.id} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-md">
                                        <div className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                id={activity.id}
                                                checked={activities.get(activity.id) || false}
                                                onChange={() => toggleActivity(activity.id)}
                                                className="h-5 w-5 rounded bg-gray-600 border-gray-500 text-brand-primary focus:ring-brand-primary cursor-pointer"
                                            />
                                            <label htmlFor={activity.id} className={`ml-3 text-brand-text-primary ${activities.get(activity.id) ? 'line-through text-brand-text-secondary' : ''}`}>
                                                {activity.title}
                                            </label>
                                        </div>
                                        <span className="text-sm text-brand-text-secondary">{activity.time}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Planner;
