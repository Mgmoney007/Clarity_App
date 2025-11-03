import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';

interface Message {
    text: string;
    sender: 'user' | 'ai';
}

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
);

const useClarityChat = () => {
    const chatRef = useRef<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-pro',
            config: {
                systemInstruction: `You are Clarity, an AI-powered personal coach designed to help high-school students balance school, sports, social life, and rest.
Your mission is to build focus, rhythm, and self-awareness — not control or guilt.
You coach teens through short reflections, focus blocks, and weekly reviews using a friendly, gamified voice.
Tone & Style:
- Voice: Encouraging coach, not teacher.
- Sentences: Short, clear, motivational.
- Use emoji cues to keep tone light (⚡ 💬 🧠 💤 🎯).
- Avoid formal phrasing or “productivity” jargon.
- Speak like a supportive mentor or trainer.`,
            },
        });
        setMessages([{ text: "Hey! I'm Clarity, your AI coach. How can I help you build focus today? ⚡", sender: 'ai' }]);
    }, []);

    const sendMessage = async (message: string) => {
        if (!chatRef.current || message.trim() === '') return;

        const userMessage: Message = { text: message, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await chatRef.current.sendMessage({ message });
            const aiMessage: Message = { text: response.text, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error sending message to chat:", error);
            const errorMessage: Message = { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'ai' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return { messages, isLoading, sendMessage };
};


const ChatInterface: React.FC = () => {
    const { messages, isLoading, sendMessage } = useClarityChat();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        sendMessage(input);
        setInput('');
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="bg-brand-surface rounded-xl shadow-lg flex flex-col flex-grow">
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-primary text-white' : 'bg-gray-700 text-brand-text-primary'}`}>
                           {msg.text.split('\n').map((line, i) => <p key={i} className="whitespace-pre-wrap">{line}</p>)}
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex justify-start">
                        <div className="bg-gray-700 text-brand-text-primary px-4 py-2 rounded-2xl">
                           <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-brand-text-secondary rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-brand-text-secondary rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                <div className="w-2 h-2 bg-brand-text-secondary rounded-full animate-pulse [animation-delay:0.4s]"></div>
                           </div>
                        </div>
                     </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-700">
                <div className="flex items-center bg-gray-700 rounded-lg">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask Clarity anything..."
                        className="flex-grow bg-transparent px-4 py-2 text-brand-text-primary focus:outline-none"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading || input.trim() === ''} className="p-3 text-brand-primary disabled:text-gray-500 disabled:cursor-not-allowed transition-colors">
                        <SendIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
