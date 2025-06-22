'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { auth } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess: () => void
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isSignUp) {
        const { error } = await auth.signUp(email, password)
        if (error) throw error
        toast.success('Account created! Check your email to verify.', {
          icon: '🎮',
          style: {
            background: '#1a1a1a',
            color: '#00FF00',
            border: '2px solid #00FF00',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '12px',
          },
        })
      } else {
        const { error } = await auth.signIn(email, password)
        if (error) throw error
        toast.success('Welcome back!', {
          icon: '👾',
          style: {
            background: '#1a1a1a',
            color: '#00FF00',
            border: '2px solid #00FF00',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '12px',
          },
        })
        onAuthSuccess()
        onClose()
      }
    } catch (error: any) {
      toast.error(error.message, {
        icon: '💥',
        style: {
          background: '#1a1a1a',
          color: '#FF0000',
          border: '2px solid #FF0000',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '12px',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="arcade-card w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="arcade-text text-xl">
                {isSignUp ? 'JOIN THE GAME' : 'LOGIN'}
              </h2>
              <button
                onClick={onClose}
                className="text-arcade-gray hover:text-arcade-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-arcade-gray" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="arcade-input w-full pl-10"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-arcade-gray" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="arcade-input w-full pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-arcade-gray hover:text-arcade-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="arcade-button w-full flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="pacman-loader" style={{ width: 16, height: 16 }}></div>
                    <span>{isSignUp ? 'Creating Account...' : 'Logging In...'}</span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="pixel-text text-sm text-arcade-gray">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-arcade-yellow hover:text-arcade-orange ml-2 transition-colors"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>

            {isSignUp && (
              <div className="mt-4 p-3 bg-arcade-dark/50 border border-arcade-yellow/30 rounded">
                <p className="pixel-text text-xs text-arcade-gray">
                  🎮 Get 10 free credits when you sign up!
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 