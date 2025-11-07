
import React, { useState, useEffect } from 'react';
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
    const [prompt, setPrompt] = useState("");
    const [activities, setActivities] = useState<Map<string, boolean>>(new Map());
    const [activeFocusSession, setActiveFocusSession] = useState<{ activityId: string; timeLeft: number; } | null>(null);

    const POMODORO_DURATION = 25 * 60; // 25 minutes in seconds

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (activeFocusSession && activeFocusSession.timeLeft > 0) {
            timer = setInterval(() => {
                setActiveFocusSession(prev => {
                    if (prev && prev.timeLeft > 1) {
                        return { ...prev, timeLeft: prev.timeLeft - 1 };
                    }
                    clearInterval(timer);
                     const activityTitle = plan
                        ?.flatMap(b => b.activities)
                        .find(a => a.id === (prev ? prev.activityId : ''))?.title;
                    alert(`Focus session for "${activityTitle || 'your task'}" is over! Time for a break. 🧘`);
                    return null;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [activeFocusSession, plan]);

    const handleGeneratePlan = async () => {
        setIsLoading(true);
        setError(null);
        setActiveFocusSession(null); // Stop any active session when generating a new plan
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

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStartFocus = (activityId: string) => {
        if (activeFocusSession) {
            alert("Another focus session is already in progress.");
            return;
        }
        setActiveFocusSession({ activityId, timeLeft: POMODORO_DURATION });
    };

    const handleStopFocus = () => {
        setActiveFocusSession(null);
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
                                    <li key={activity.id} className="bg-gray-700/50 p-3 rounded-md">
                                        <div className="flex items-center justify-between">
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
                                            <span className="text-sm text-brand-text-secondary flex-shrink-0 ml-2">{activity.time}</span>
                                        </div>
                                        {block.type === BlockType.Power && (
                                            <div className="mt-3 pl-8">
                                                {activeFocusSession?.activityId === activity.id ? (
                                                    <div className="flex items-center gap-4">
                                                        <p className="font-mono text-lg text-brand-primary font-bold">
                                                            {formatTime(activeFocusSession.timeLeft)}
                                                        </p>
                                                        <button
                                                            onClick={handleStopFocus}
                                                            className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-md transition duration-200"
                                                        >
                                                            Stop
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleStartFocus(activity.id)}
                                                        disabled={!!activeFocusSession}
                                                        className="bg-brand-primary/80 hover:bg-brand-primary text-white text-xs font-bold py-1 px-3 rounded-md transition duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                                    >
                                                        Start Focus Session
                                                    </button>
                                                )}
                                            </div>
                                        )}
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