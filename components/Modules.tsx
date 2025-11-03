
import React, { useState } from 'react';
import { Module } from '../types';
import { MODULE_DATA, LockIcon, ChevronRightIcon } from '../constants';
import ChallengeCard from './ChallengeCard';
import ModuleThreeContent from './ModuleThreeContent';

export const moduleColorStyles = [
    { border: 'border-violet-500', bg: 'bg-violet-500/10', text: 'text-violet-400', button: 'bg-violet-500 hover:bg-violet-600', hoverBorder: 'hover:border-violet-500/80' },
    { border: 'border-sky-500', bg: 'bg-sky-500/10', text: 'text-sky-400', button: 'bg-sky-500 hover:bg-sky-600', hoverBorder: 'hover:border-sky-500/80' },
    { border: 'border-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-400', button: 'bg-emerald-500 hover:bg-emerald-600', hoverBorder: 'hover:border-emerald-500/80' },
    { border: 'border-pink-500', bg: 'bg-pink-500/10', text: 'text-pink-400', button: 'bg-pink-500 hover:bg-pink-600', hoverBorder: 'hover:border-pink-500/80' },
    { border: 'border-amber-500', bg: 'bg-amber-500/10', text: 'text-amber-400', button: 'bg-amber-500 hover:bg-amber-600', hoverBorder: 'hover:border-amber-500/80' },
    { border: 'border-indigo-500', bg: 'bg-indigo-500/10', text: 'text-indigo-400', button: 'bg-indigo-500 hover:bg-indigo-600', hoverBorder: 'hover:border-indigo-500/80' },
];

const Modules: React.FC = () => {
    const modules: Module[] = MODULE_DATA;
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);

    const handleSelectModule = (module: Module) => {
        if (!module.locked) {
            setSelectedModule(module);
        }
    };

    const handleCloseModule = () => {
        setSelectedModule(null);
    };
    
    const renderModuleContent = () => {
        if (!selectedModule) return null;

        switch (selectedModule.id) {
            case 3:
                return <ModuleThreeContent module={selectedModule} onClose={handleCloseModule} />;
            default:
                return <ChallengeCard module={selectedModule} onClose={handleCloseModule} />;
        }
    };

    if (selectedModule) {
        return renderModuleContent();
    }

    return (
        <div className="p-4 sm:p-6 pb-20">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-brand-text-primary">Learning Modules</h1>
                <p className="text-brand-text-secondary">Short, gamified lessons to build your skills.</p>
            </header>
            
            <div className="space-y-4">
                {modules.map((module) => {
                    const colorStyle = moduleColorStyles[module.id - 1];
                    const isLocked = module.locked;
                    const Icon = module.icon;

                    return (
                        <div 
                            key={module.id} 
                            onClick={() => handleSelectModule(module)}
                            className={`
                                group bg-brand-surface rounded-xl p-4 shadow-md flex items-center 
                                transition-all duration-300 ease-in-out border-2
                                ${isLocked ? 'opacity-60 cursor-not-allowed border-transparent' : `${colorStyle.hoverBorder} hover:bg-gray-800 hover:-translate-y-1 cursor-pointer border-gray-700/50`}
                            `}
                        >
                            <div className={`flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center mr-5 transition-all duration-300 ${colorStyle.bg} ${isLocked ? 'filter grayscale' : ''}`}>
                                <Icon className={`w-9 h-9 ${colorStyle.text}`} />
                            </div>
                            <div className="flex-grow">
                                <p className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isLocked ? 'text-gray-500' : colorStyle.text}`}>Module {module.id}</p>
                                <h3 className="font-bold text-lg text-brand-text-primary mt-1">{module.theme}</h3>
                                <p className="text-sm text-brand-text-secondary">{module.coreSkill}</p>
                            </div>
                            <div className="flex-shrink-0 ml-4">
                                {isLocked ? (
                                    <LockIcon className="w-6 h-6 text-brand-text-secondary" />
                                ) : (
                                    <ChevronRightIcon className="w-6 h-6 text-brand-text-secondary transition-transform duration-300 group-hover:translate-x-1" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Modules;