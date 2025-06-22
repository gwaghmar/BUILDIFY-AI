'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Code, Download, Gamepad2, Monitor, Smartphone, Ghost, Users, Package, User } from 'lucide-react'
import PromptInput from '@/components/PromptInput'
import AppPreview from '@/components/AppPreview'
import TechStackDisplay from '@/components/TechStackDisplay'
import LoadingAnimation from '@/components/LoadingAnimation'
import AuthModal from '@/components/AuthModal'
import TeamCollaboration from '@/components/TeamCollaboration'
import BinaryGenerator from '@/components/BinaryGenerator'
import { generateApp } from '@/lib/ai-generator'
import { detectOS } from '@/lib/os-detector'
import { auth, db } from '@/lib/supabase'
import { GeneratedApp } from '@/types/app'
import Header from '@/components/Header'
import Workspace from '@/components/Workspace'
import toast from 'react-hot-toast'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedApp, setGeneratedApp] = useState<GeneratedApp | null>(null)
  const [userOS, setUserOS] = useState<string>('')
  const [credits, setCredits] = useState(5)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [showBinaryModal, setShowBinaryModal] = useState(false)
  const [userCredits, setUserCredits] = useState(10)

  useEffect(() => {
    const os = detectOS()
    setUserOS(os)
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const user = await auth.getCurrentUser()
      if (user) {
        setCurrentUser(user)
        const { data: userData } = await db.getUser(user.id)
        if (userData) {
          setUserCredits(userData.credits)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    }
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    // Check credits
    const availableCredits = currentUser ? userCredits : credits
    if (availableCredits === 0) {
      if (!currentUser) {
        setShowAuthModal(true)
        return
      } else {
        toast.error('No credits remaining. Please purchase more credits.', {
          icon: '💥',
          style: {
            background: '#1a1a1a',
            color: '#FF0000',
            border: '2px solid #FF0000',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '12px',
          },
        })
        return
      }
    }
    
    setIsGenerating(true)
    setGeneratedApp(null)
    
    try {
      const result = await generateApp(prompt, userOS)
      setGeneratedApp(result)
      
      // Update credits
      if (currentUser) {
        const newCredits = Math.max(0, userCredits - 1)
        setUserCredits(newCredits)
        await db.updateUserCredits(currentUser.id, newCredits)
        
        // Save app to database
        await db.saveApp({
          user_id: currentUser.id,
          prompt: result.prompt,
          framework: result.framework,
          app_type: result.appType,
          code_files: result.codeFiles,
          readme: result.readme,
          is_binary_compatible: result.isBinaryCompatible,
          os: userOS,
          tokens_used: 0,
          is_public: false,
          collaborators: []
        } as any)
      } else {
        setCredits(prev => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error('Generation failed:', error)
      toast.error('Failed to generate application. Please try again.', {
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
      setIsGenerating(false)
    }
  }

  const handleAuthSuccess = () => {
    checkAuth()
    setShowAuthModal(false)
  }

  const handleDownload = async () => {
    if (!generatedApp) return

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ app: generatedApp }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${generatedApp.prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.zip`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        toast.success('App downloaded successfully!', {
          icon: '🎮',
          style: {
            background: '#1a1a1a',
            color: '#00FF00',
            border: '2px solid #00FF00',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '12px',
          },
        })
      }
    } catch (error) {
      console.error('Download failed:', error)
      toast.error('Failed to download app', {
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
    <div className="min-h-screen w-full dark:bg-arcade-dark dark:bg-grid-pattern">
      <Header 
        user={currentUser}
        credits={currentUser ? userCredits : credits}
        onAuthClick={() => setShowAuthModal(true)}
      />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center pt-12 pb-12"
        >
          <h1 className="arcade-text text-4xl md:text-6xl mb-4">
            PROMPT-TO-APP
          </h1>
          <p className="pixel-text text-lg md:text-xl text-arcade-gray max-w-2xl mx-auto mb-8">
            Describe your app in the box below and our AI will build it for you.
          </p>
          
          <PromptInput 
            value={prompt}
            onChange={setPrompt}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            disabled={(currentUser ? userCredits : credits) === 0}
          />

          {(currentUser ? userCredits : credits) === 0 && (
            <p className="text-arcade-red mt-4 pixel-text">
              {currentUser ? 'You have no more credits. Please purchase more to continue.' : 'You have no more credits. Please sign up to continue.'}
            </p>
          )}
        </motion.div>

        {/* Workspace Section */}
        {!isGenerating && !generatedApp && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Workspace />
          </motion.div>
        )}

        {/* Output Section */}
        <div className="max-w-7xl mx-auto w-full pb-12">
          {isGenerating && (
            <LoadingAnimation />
          )}

          {generatedApp && !isGenerating && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="animate-fade-in"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Tech Stack & Actions */}
                <div className="md:col-span-1">
                  <div className="arcade-card p-6 sticky top-24 space-y-6">
                    <h3 className="arcade-text text-lg mb-4">TECH STACK</h3>
                    <TechStackDisplay 
                      framework={generatedApp.framework}
                      appType={generatedApp.appType}
                      os={userOS}
                    />

                    <div className="border-t-2 border-dashed border-arcade-gray/30 my-4"></div>

                    <h3 className="arcade-text text-lg mb-4">ACTIONS</h3>
                    <div className="space-y-3">
                      <button onClick={handleDownload} className="arcade-button w-full">
                        <Download className="w-4 h-4 mr-2" /> Download .zip
                      </button>
                      <button onClick={() => setShowBinaryModal(true)} className="arcade-button w-full">
                        <Package className="w-4 h-4 mr-2" /> Generate Binary
                      </button>
                      <button onClick={() => setShowTeamModal(true)} className="arcade-button w-full">
                        <Users className="w-4 h-4 mr-2" /> Collaborate
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: App Preview */}
                <div className="md:col-span-2">
                  <AppPreview app={generatedApp} framework={generatedApp.framework} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {generatedApp && (
        <>
          <TeamCollaboration 
            app={generatedApp}
            onClose={() => setShowTeamModal(false)}
            isOpen={showTeamModal}
          />

          <BinaryGenerator 
            app={generatedApp}
            onClose={() => setShowBinaryModal(false)}
            isOpen={showBinaryModal}
          />
        </>
      )}
    </div>
  )
} 