
import React, { useState } from 'react';
import { AppView } from './types';
import Dashboard from './components/Dashboard';
import Modules from './components/Modules';
import Coach from './components/Coach';
import { DashboardIcon, ModulesIcon, ChatIcon } from './constants';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<AppView>(AppView.Dashboard);

    const renderView = () => {
        switch (currentView) {
            case AppView.Dashboard:
                return <Dashboard />;
            case AppView.Coach:
                return <Coach />;
            case AppView.Modules:
                return <Modules />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="h-screen bg-brand-bg text-brand-text-primary font-sans flex flex-col">
            <main className="flex-1 overflow-y-auto">
                {renderView()}
            </main>
            
            <nav className="flex-shrink-0 bg-brand-surface border-t border-gray-700 shadow-lg">
                <div className="max-w-md mx-auto flex justify-around">
                    <button
                        onClick={() => setCurrentView(AppView.Dashboard)}
                        className={`flex flex-col items-center justify-center w-full py-3 transition-colors duration-200 ${currentView === AppView.Dashboard ? 'text-brand-primary' : 'text-brand-text-secondary hover:text-brand-primary'}`}
                    >
                        <DashboardIcon className="h-6 w-6" />
                        <span className="text-xs font-medium">Dashboard</span>
                    </button>
                    <button
                        onClick={() => setCurrentView(AppView.Coach)}
                        className={`flex flex-col items-center justify-center w-full py-3 transition-colors duration-200 ${currentView === AppView.Coach ? 'text-brand-primary' : 'text-brand-text-secondary hover:text-brand-primary'}`}
                    >
                        <ChatIcon className="h-6 w-6" />
                        <span className="text-xs font-medium">Coach</span>
                    </button>
                    <button
                        onClick={() => setCurrentView(AppView.Modules)}
                        className={`flex flex-col items-center justify-center w-full py-3 transition-colors duration-200 ${currentView === AppView.Modules ? 'text-brand-primary' : 'text-brand-text-secondary hover:text-brand-primary'}`}
                    >
                        <ModulesIcon className="h-6 w-6" />
                        <span className="text-xs font-medium">Modules</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default App;
