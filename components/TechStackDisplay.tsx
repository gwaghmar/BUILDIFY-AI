'use client'

import { TechStack, AppType } from '@/types/app'
import { Code, Monitor, Gamepad2, Settings, Database, Globe } from 'lucide-react'
import React from 'react';

interface TechStackDisplayProps {
  framework: TechStack
  appType: AppType
  os: string
}

const techStackInfo = {
  electron: { name: 'Electron', icon: Monitor, color: 'text-arcade-cyan' },
  tkinter: { name: 'Tkinter', icon: Code, color: 'text-arcade-green' },
  kivy: { name: 'Kivy', icon: Gamepad2, color: 'text-arcade-pink' },
  react: { name: 'React', icon: Globe, color: 'text-arcade-blue' },
  vue: { name: 'Vue.js', icon: Globe, color: 'text-arcade-green' },
  vanilla: { name: 'Vanilla JS', icon: Code, color: 'text-arcade-yellow' },
  flask: { name: 'Flask', icon: Database, color: 'text-arcade-orange' },
  django: { name: 'Django', icon: Database, color: 'text-arcade-green' },
  'web-app': { name: 'Web App', icon: Globe },
}

const appTypeInfo = {
  game: { name: 'Game', icon: Gamepad2 },
  utility: { name: 'Utility', icon: Settings },
  dashboard: { name: 'Dashboard', icon: Database },
  form: { name: 'Form', icon: Settings },
  tool: { name: 'Tool', icon: Code },
  'web-app': { name: 'Web App', icon: Globe },
}

interface InfoRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  colorClass?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon: Icon, label, value, colorClass }) => (
  <div className="flex items-center space-x-3 py-2 border-b-2 border-dashed border-arcade-gray/20 last:border-b-0">
    <Icon className={`w-5 h-5 ${colorClass || 'text-arcade-gray'}`} />
    <span className="pixel-text text-arcade-gray">{label}:</span>
    <span className="pixel-text text-arcade-white font-medium">{value}</span>
  </div>
);

export default function TechStackDisplay({ framework, appType, os }: TechStackDisplayProps) {
  const tech = techStackInfo[framework];
  const type = appTypeInfo[appType];

  return (
    <div className="space-y-1">
      <InfoRow icon={tech.icon} label="Framework" value={tech.name} colorClass={tech.color} />
      <InfoRow icon={type.icon} label="App Type" value={type.name} />
      <InfoRow icon={Monitor} label="Target OS" value={os} />
    </div>
  )
} 