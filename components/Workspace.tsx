'use client'

import { Gamepad2, Code, Monitor, Smartphone } from 'lucide-react'

const recentApps = [
  {
    name: 'Space Invaders Clone',
    icon: 'game',
    appType: 'Game',
    lastEdited: '2 hours ago',
  },
  {
    name: 'Portfolio Website',
    icon: 'web',
    appType: 'Web App',
    lastEdited: '1 day ago',
  },
  {
    name: 'Task Tracker',
    icon: 'mobile',
    appType: 'Mobile App',
    lastEdited: '3 days ago',
  }
]

function renderIcon(icon: string) {
  switch (icon) {
    case 'game':
      return <Gamepad2 className="w-8 h-8 text-secondary" />
    case 'web':
      return <Monitor className="w-8 h-8 text-secondary" />
    case 'mobile':
      return <Smartphone className="w-8 h-8 text-secondary" />
    default:
      return <Code className="w-8 h-8 text-secondary" />
  }
}

export default function Workspace() {
  return (
    <div className="w-full max-w-7xl mx-auto mt-16">
      <h2 className="arcade-text text-2xl mb-6 text-center">Your Recent Apps</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentApps.map((app) => (
          <div key={app.name} className="arcade-card p-4 flex items-center space-x-4">
            {renderIcon(app.icon)}
            <div>
              <p className="pixel-text text-lg">{app.name}</p>
              <p className="text-sm text-foreground/70">{app.appType} - {app.lastEdited}</p>
            </div>
          </div>
        ))}
        <div className="arcade-card p-4 flex items-center justify-center space-x-4 border-2 border-dashed border-primary/50 text-primary/80 hover:bg-primary/10 cursor-pointer transition-colors">
            <p className="pixel-text text-lg">+ Create New App</p>
        </div>
      </div>
    </div>
  )
} 