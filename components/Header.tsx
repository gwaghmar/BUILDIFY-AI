'use client'

import { Gamepad2, User, LogOut, Coins } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { auth } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface HeaderProps {
  user?: any
  credits?: number
  onAuthClick?: () => void
}

export default function Header({ user, credits = 5, onAuthClick }: HeaderProps) {
  const handleSignOut = async () => {
    try {
      await auth.signOut()
      toast.success('Signed out successfully!', {
        icon: '👾',
        style: {
          background: '#1a1a1a',
          color: '#00FF00',
          border: '2px solid #00FF00',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '12px',
        },
      })
      window.location.reload()
    } catch (error) {
      toast.error('Failed to sign out', {
        icon: '💥',
        style: {
          background: '#1a1a1a',
          color: '#FF0000',
          border: '2px solid #FF0000',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '12px',
        },
      })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm border-b-2 border-primary">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Gamepad2 className="w-6 h-6 text-primary" />
          <h1 className="arcade-text text-xl">Buildify AI</h1>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="pixel-text text-sm text-secondary hover:text-primary cursor-pointer">Features</span>
          <span className="pixel-text text-sm text-accent hover:text-primary cursor-pointer">Pricing</span>
          <span className="pixel-text text-sm text-arcade-green hover:text-primary cursor-pointer">Docs</span>
        </div>
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <div className="flex items-center space-x-2 px-3 py-1 bg-arcade-dark/50 border border-arcade-yellow/30 rounded">
                <Coins className="w-4 h-4 text-arcade-yellow" />
                <span className="pixel-text text-xs text-arcade-white">{credits}</span>
              </div>
              <div className="flex items-center space-x-1 px-3 py-1 bg-arcade-dark/50 border border-arcade-cyan/30 rounded">
                <User className="w-4 h-4 text-arcade-cyan" />
                <span className="pixel-text text-xs text-arcade-white">
                  {user.email?.split('@')[0] || 'User'}
                </span>
              </div>
              <button 
                onClick={handleSignOut}
                className="arcade-button text-xs px-2 py-1 bg-arcade-red text-arcade-white"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={onAuthClick}
                className="arcade-button text-xs px-3 py-1"
              >
                Login
              </button>
              <button 
                onClick={onAuthClick}
                className="arcade-button text-xs px-3 py-1 bg-arcade-dark text-primary"
              >
                Sign Up
              </button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
} 