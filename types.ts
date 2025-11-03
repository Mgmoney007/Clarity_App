// FIX: Import React to resolve 'React.FC' type.
import React from 'react';

export enum BlockType {
  Power = 'Power',
  Momentum = 'Momentum',
  Reset = 'Reset',
}

export interface Activity {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

export interface DayBlock {
  type: BlockType;
  title: string;
  description: string;
  activities: Activity[];
}

export interface TimeMapData {
  name: string;
  value: number;
  color: string;
  icon: React.FC<{ className?: string }>;
  description: string;
}

export interface EnergyLog {
  timestamp: Date;
  level: number;
}

export interface Module {
  id: number;
  theme: string;
  coreSkill: string;
  locked: boolean;
  icon: React.FC<{ className?: string }>;
}

export enum AppView {
    Dashboard = 'Dashboard',
    Coach = 'Coach',
    Modules = 'Modules',
}