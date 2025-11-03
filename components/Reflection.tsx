import React, { useState } from 'react';

const Reflection: React.FC = () => {
    const [reflection, setReflection] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        // In a real app, this would save to a backend or local storage.
        if (reflection.trim()) {
            setIsSaved(true);
            setTimeout(() => {
                setIsSaved(false);
                // Optionally clear the textarea after saving
                // setReflection(''); 
            }, 2000);
        }
    };

    return (
        <div className="bg-brand-surface rounded-xl p-4 sm:p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-2">Daily Reflection</h2>
            <p className="text-sm text-brand-text-secondary mb-4">What went well today?</p>
            <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="e.g., I finished my math homework early and felt proud..."
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:outline-none min-h-[100px] resize-none"
                aria-label="Daily reflection input"
            />
            <button
                onClick={handleSave}
                disabled={!reflection.trim() || isSaved}
                className="mt-4 w-full bg-brand-primary hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                {isSaved ? 'Saved!' : 'Save Reflection'}
            </button>
        </div>
    );
};

export default Reflection;