import React, { useState } from 'react';
import { EnergyLog } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';

const EnergyCheck: React.FC = () => {
    const [energyLevel, setEnergyLevel] = useState(5);
    const [logs, setLogs] = useState<EnergyLog[]>([
        { timestamp: new Date(Date.now() - 3600000 * 5), level: 7 },
        { timestamp: new Date(Date.now() - 3600000 * 4), level: 8 },
        { timestamp: new Date(Date.now() - 3600000 * 3), level: 6 },
        { timestamp: new Date(Date.now() - 3600000 * 2), level: 7 },
        { timestamp: new Date(Date.now() - 3600000), level: 5 },
    ]);

    const handleSubmit = () => {
        const newLogs = [...logs, { timestamp: new Date(), level: energyLevel }].sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime());
        setLogs(newLogs);
    };

    const formatXAxis = (tickItem: Date) => {
        return tickItem.toLocaleTimeString('en-US', { hour: 'numeric', minute:'2-digit', hour12: true });
    };

    return (
        <div className="bg-brand-surface rounded-xl p-4 sm:p-6 shadow-lg h-full flex flex-col">
            <h2 className="text-xl font-bold mb-2">Energy Pulse</h2>
            <p className="text-sm text-brand-text-secondary mb-4">How are you feeling right now?</p>

            <div className="my-4">
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-secondary"
                />
                <div className="flex justify-between text-xs text-brand-text-secondary mt-2">
                    <span>Drained</span>
                    <span className="font-bold text-brand-text-primary text-base">{energyLevel}</span>
                    <span>Energized</span>
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="w-full bg-brand-secondary hover:bg-emerald-500 text-brand-bg font-bold py-2 px-4 rounded-md transition duration-200"
            >
                Log Energy
            </button>
            <div className="flex-grow w-full h-32 sm:h-40 mt-6">
                <ResponsiveContainer>
                    <LineChart data={logs} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                        <XAxis dataKey="timestamp" tickFormatter={formatXAxis} stroke="#9CA3AF" fontSize={12} />
                        <YAxis stroke="#9CA3AF" domain={[0, 10]} fontSize={12} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }} 
                          labelFormatter={(label) => formatXAxis(new Date(label))}
                        />
                        <Line type="monotone" dataKey="level" stroke="#34D399" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Brush 
                            dataKey="timestamp" 
                            height={25} 
                            stroke="#8B5CF6" 
                            fill="#1F2937"
                            tickFormatter={formatXAxis}
                            travellerWidth={10}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EnergyCheck;