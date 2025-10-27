
import React from 'react';
import Planner from './Planner';
import TimeMap from './TimeMap';
import EnergyCheck from './EnergyCheck';
import FocusBot from './FocusBot';

const Dashboard: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 space-y-6 pb-20">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-text-primary">Clarity Coach</h1>
                    <p className="text-brand-text-secondary">Your day, optimized.</p>
                </div>
                <img src={`https://picsum.photos/seed/user/40/40`} alt="User Avatar" className="w-10 h-10 rounded-full" />
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                    <Planner />
                </div>
                <TimeMap />
                <EnergyCheck />
                <div className="lg:col-span-2">
                    <FocusBot />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
