import React from 'react';
import { TimeMapData, Module } from './types';

export const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C9.25 2 7 4.25 7 7c0 1.59.74 3.03 1.88 4.06L7 13.72V19c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-5.28l-1.88-2.66A5.002 5.002 0 0 0 17 7c0-2.75-2.25-5-5-5zm-3 5c0-1.65 1.35-3 3-3s3 1.35 3 3-.3 1.5-.79 2.13l-2.21 3.07-2.21-3.07C9.3 8.5 9 7.77 9 7z"/></svg>
);

export const BoltIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
);

export const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.3 2.1c-.24-.04-.48-.04-.72 0C6.98 2.69 3 7.02 3 12c0 4.97 4.03 9 9 9 4.98 0 8.31-3.98 8.89-8.58.07-.59-.39-1.12-.99-1.12-.43 0-.81.27-.95.68-.8 2.4-3.19 4.02-5.95 4.02-3.53 0-6.4-2.87-6.4-6.4 0-2.76 1.62-5.15 4.02-5.95.41-.14.68-.52.68-.95 0-.59-.53-1.06-1.12-1.12z"/></svg>
);

export const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
);

export const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
);

export const ModulesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M4 11h6.5v6.5H4V11zm7.5 0V4H18v7h-6.5zM4 20h6.5V13H4v7zm7.5 0h7V11h-7v9z"/></svg>
);

export const TokenIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.04 15.61L12 13.89l1.04 3.72-2.08-1.99zM12 10.12l-1.53 1.1.58-1.81L9.24 8.2l1.89-.01L12 6.4l.87 1.79 1.89.01-1.81 1.21.58 1.81L12 10.12z"/></svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

// New Icons for TimeMap
export const TargetIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
);

export const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
);

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
);


const EnergyIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9h5l-4 9 1.5 1.5L18 9h-4Z M4.5 9.5 3 11l-1.5-1.5 M9.5 2.5 11 1l1.5 1.5"/></svg>;
const TimeIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8h8v8H8z"/></svg>;
const BrainTrainIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v2a4 4 0 1 0 8 0v-2h2a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4Z"/><path d="M9.5 13a2.5 2.5 0 0 1 5 0"/><path d="M12 22a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z"/></svg>;
const BalanceIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 16 4-16 4 16"/><path d="M2 16h12"/><path d="M12 16h10"/><path d="M17 20a2 2 0 0 0 2-2V4"/><path d="M21 4H9"/></svg>;
const MoneyIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>;
const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V22h4v-7.34"/><path d="M12 15c5.523 0 10-4.477 10-10H2c0 5.523 4.477 10 10 10Z"/></svg>;

export const INITIAL_TIME_MAP_DATA: TimeMapData[] = [
    { name: 'Focus', value: 35, color: '#8B5CF6', icon: LightbulbIcon, description: 'Represents time spent on deep work or study.' },
    { name: 'Energy', value: 25, color: '#34D399', icon: BoltIcon, description: 'Represents time dedicated to exercise and activities that boost energy.' },
    { name: 'Rest', value: 25, color: '#60A5FA', icon: UsersIcon, description: 'Represents time for sleep, relaxation, and recharging.' },
    { name: 'Social', value: 15, color: '#F472B6', icon: ChatIcon, description: 'Represents time for connecting with friends and family.' },
];

export const MODULE_DATA: Module[] = [
    { id: 1, theme: 'Master Your Energy', coreSkill: 'Understand focus cycles', locked: false, icon: EnergyIcon },
    { id: 2, theme: 'Reclaim Your Time', coreSkill: '3-Block Day + 4D Map', locked: false, icon: TimeIcon },
    { id: 3, theme: 'Train Your Brain', coreSkill: 'Deep work + dopamine discipline', locked: true, icon: BrainTrainIcon },
    { id: 4, theme: 'Build Your Balance', coreSkill: 'Sport, social, and study alignment', locked: true, icon: BalanceIcon },
    { id: 5, theme: 'Money = Time', coreSkill: 'Micro-mastery budgeting', locked: true, icon: MoneyIcon },
    { id: 6, theme: 'Win the Week', coreSkill: 'Reflection + goal system', locked: true, icon: TrophyIcon },
];