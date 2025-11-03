import React from 'react';
import { TargetIcon, BoltIcon, UsersIcon, MoonIcon } from '../constants';

const tips = [
    {
        category: 'Focus',
        text: "Try the 'Pomodoro Technique' for your next study block: 25 minutes of deep work, then a 5-minute break. Your brain will thank you! 🎯",
        Icon: TargetIcon,
        color: 'text-purple-400',
        bgColor: 'bg-purple-400/20',
    },
    {
        category: 'Energy',
        text: "Feeling a slump? A 10-minute walk outside can boost your energy more than you think. Give it a try! ⚡",
        Icon: BoltIcon,
        color: 'text-green-400',
        bgColor: 'bg-green-400/20',
    },
    {
        category: 'Social',
        text: "Schedule your social time like you schedule study time. It's just as important for your well-being. 💬",
        Icon: UsersIcon,
        color: 'text-pink-400',
        bgColor: 'bg-pink-400/20',
    },
    {
        category: 'Rest',
        text: "Aim for 8-10 hours of sleep. A good night's rest is your secret weapon for a productive day. 💤",
        Icon: MoonIcon,
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/20',
    }
];

const Tips: React.FC = () => {
    return (
        <div className="bg-brand-surface rounded-xl p-4 sm:p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Clarity Tips</h2>
            <p className="text-sm text-brand-text-secondary mb-6">Insights based on your 4D map.</p>
            <div className="space-y-4">
                {tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${tip.bgColor}`}>
                            <tip.Icon className={`w-5 h-5 ${tip.color}`} />
                        </div>
                        <p className="text-brand-text-primary text-sm pt-1">{tip.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tips;