import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import type { SectorProps, PieLabelRenderProps } from 'recharts';
import { TimeMapData } from '../types';
import { INITIAL_TIME_MAP_DATA } from '../constants';

const renderActiveShape = (props: SectorProps) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={(outerRadius || 0) + 6}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
        />
    );
};

const renderCustomizedLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    
    if (typeof cx !== 'number' || typeof cy !== 'number' || typeof midAngle !== 'number' || typeof innerRadius !== 'number' || typeof outerRadius !== 'number' || typeof percent !== 'number') {
        return null;
    }

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const TimeMap: React.FC = () => {
    const data: TimeMapData[] = INITIAL_TIME_MAP_DATA;
    const pieData = data.map(({ icon, ...rest }) => rest);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleSegmentClick = (_: any, index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="bg-brand-surface rounded-xl p-4 sm:p-6 shadow-lg h-full flex flex-col">
            <h2 className="text-xl font-bold mb-2">4D Time Map</h2>
            <p className="text-sm text-brand-text-secondary mb-4">Your ideal time allocation.</p>
            <div className="flex-grow w-full h-56 sm:h-64 cursor-pointer">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={pieData}
                            activeIndex={activeIndex ?? undefined}
                            activeShape={renderActiveShape}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            onClick={handleSegmentClick}
                        >
                            {data.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.color} 
                                    style={{ transition: 'opacity 0.3s ease-in-out' }}
                                    fillOpacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
             <div className="mt-6">
                <ul className="space-y-2">
                    {data.map((entry, index) => (
                        <li 
                            key={`legend-${entry.name}`} 
                            className={`p-3 rounded-lg transition-all duration-300 cursor-pointer ${activeIndex === index ? 'bg-gray-800/60' : 'bg-transparent'}`}
                            onClick={(e) => handleSegmentClick(e, index)}
                        >
                            <div className="flex items-center text-lg font-semibold" style={{ color: entry.color }}>
                                <div className="w-6 h-6 mr-4 flex-shrink-0">
                                    <entry.icon className="w-full h-full" />
                                </div>
                                <span>{entry.name}</span>
                            </div>
                            {activeIndex === index && (
                                <p className="mt-2 ml-10 text-sm text-brand-text-secondary animate-fade-in">
                                    {entry.description}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TimeMap;
