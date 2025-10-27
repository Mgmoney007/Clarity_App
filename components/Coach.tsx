
import React from 'react';
import ChatInterface from './ChatInterface';

const Coach: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 flex flex-col h-full">
             <header className="mb-4 flex-shrink-0">
                <h1 className="text-2xl font-bold text-brand-text-primary">Clarity AI Coach</h1>
                <p className="text-brand-text-secondary">Your personal guide to focus and balance.</p>
            </header>
            <ChatInterface />
        </div>
    );
};

export default Coach;
