import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TimeMapData } from '../types';
import { INITIAL_TIME_MAP_DATA } from '../constants';

const TimeMap: React.FC = () => {
    const data: TimeMapData[] = INITIAL_TIME_MAP_DATA;

    const renderLegend = (props: any) => {
        const { payload } = props;
        return (
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-4">
                {payload.map((entry: any, index: number) => {
                    const Icon = data[index].icon;
                    return (
                        // FIX: The Icon component does not accept a `style` prop, so the color is applied to the parent `li` element to be inherited.
                        <li key={`item-${index}`} className="flex items-center text-sm" style={{ color: entry.color }}>
                            <Icon className="w-4 h-4 mr-2" />
                            <span style={{ fontWeight: 600 }}>{entry.value}</span>
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="bg-brand-surface rounded-xl p-4 sm:p-6 shadow-lg h-full flex flex-col">
            <h2 className="text-xl font-bold mb-2">4D Time Map</h2>
            <p className="text-sm text-brand-text-secondary mb-4">Your daily time breakdown.</p>
            <div className="flex-grow w-full h-56 sm:h-64">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            labelLine={false}
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                return (
                                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                        {`${(percent * 100).toFixed(0)}%`}
                                    </text>
                                );
                            }}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '0.5rem' }}
                            formatter={(value: number, name: string) => [`${value}%`, name]}
                        />
                        <Legend content={renderLegend} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TimeMap;