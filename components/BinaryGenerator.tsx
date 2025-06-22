'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Settings, Monitor, Smartphone, Tablet, Package, Terminal, X } from 'lucide-react'
import { GeneratedApp, TechStack } from '@/types/app'
import { BinaryConfig } from '@/lib/binary-generator'
import toast from 'react-hot-toast'

interface BinaryGeneratorProps {
  app: GeneratedApp
  onClose: () => void
  isOpen?: boolean
}

export default function BinaryGenerator({ app, onClose, isOpen = false }: BinaryGeneratorProps) {
  const [config, setConfig] = useState<BinaryConfig>({
    platform: 'windows',
    architecture: 'x64',
    outputFormat: 'exe',
    version: '1.0.0',
    description: app.prompt,
    author: 'Buildify AI User'
  })
  
  const [supportedPlatforms, setSupportedPlatforms] = useState<string[]>([])
  const [supportedFormats, setSupportedFormats] = useState<Record<string, string[]>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [buildLog, setBuildLog] = useState('')

  useEffect(() => {
    loadBinaryOptions()
  }, [app.framework])

  const loadBinaryOptions = async () => {
    try {
      const response = await fetch(`/api/binary?framework=${app.framework}`)
      const data = await response.json()
      
      if (data.success) {
        setSupportedPlatforms(data.supportedPlatforms)
        setSupportedFormats(data.supportedFormats)
        
        // Set default platform if current one isn't supported
        if (!data.supportedPlatforms.includes(config.platform)) {
          setConfig(prev => ({
            ...prev,
            platform: data.supportedPlatforms[0] || 'windows'
          }))
        }
      }
    } catch (error) {
      console.error('Failed to load binary options:', error)
    }
  }

  const generateBinary = async () => {
    setIsGenerating(true)
    setBuildLog('')

    try {
      const response = await fetch('/api/binary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ app, config }),
      })

      const data = await response.json()

      if (data.success) {
        // Create download link
        const link = document.createElement('a')
        link.href = data.binaryUrl
        link.download = `${config.description.toLowerCase().replace(/\s+/g, '-')}-${config.platform}.zip`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast.success('Binary package generated!', {
          icon: '🎮',
          style: {
            background: '#1a1a1a',
            color: '#00FF00',
            border: '2px solid #00FF00',
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '12px',
          },
        })

        setBuildLog(data.buildLog || 'Binary generated successfully!')
      } else {
        throw new Error(data.error || 'Failed to generate binary')
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
      setBuildLog(`Error: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const updateConfig = (field: keyof BinaryConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'windows': return <Monitor className="w-4 h-4" />
      case 'macos': return <Smartphone className="w-4 h-4" />
      case 'linux': return <Terminal className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
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
            className="arcade-card w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="arcade-text text-xl">BINARY GENERATOR</h2>
              <button
                onClick={onClose}
                className="text-arcade-gray hover:text-arcade-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* App Info */}
            <div className="mb-6 p-4 bg-arcade-dark/50 border border-arcade-yellow/30 rounded">
              <h3 className="arcade-text text-base mb-2">App Details</h3>
              <div className="text-sm space-y-1">
                <p><span className="text-arcade-gray">Name:</span> {app.prompt}</p>
                <p><span className="text-arcade-gray">Framework:</span> {app.framework}</p>
                <p><span className="text-arcade-gray">Type:</span> {app.appType}</p>
                <p><span className="text-arcade-gray">Files:</span> {app.codeFiles.length}</p>
              </div>
            </div>

            {/* Configuration */}
            <div className="space-y-4 mb-6">
              <h3 className="arcade-text text-lg">Build Configuration</h3>

              {/* Platform Selection */}
              <div>
                <label className="pixel-text text-sm text-arcade-gray mb-2 block">Platform</label>
                <div className="flex space-x-2">
                  {supportedPlatforms.map(platform => (
                    <button
                      key={platform}
                      onClick={() => updateConfig('platform', platform)}
                      className={`arcade-button !text-xs !px-3 !py-2 flex items-center space-x-1 ${
                        config.platform !== platform && 'bg-arcade-dark text-arcade-yellow'
                      }`}
                    >
                      {getPlatformIcon(platform)}
                      <span className="capitalize">{platform}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Architecture */}
              <div>
                <label className="pixel-text text-sm text-arcade-gray mb-2 block">Architecture</label>
                <div className="flex space-x-2">
                  {['x64', 'arm64'].map(arch => (
                    <button
                      key={arch}
                      onClick={() => updateConfig('architecture', arch)}
                      className={`arcade-button !text-xs !px-3 !py-2 ${
                        config.architecture !== arch && 'bg-arcade-dark text-arcade-yellow'
                      }`}
                    >
                      {arch.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Format */}
              <div>
                <label className="pixel-text text-sm text-arcade-gray mb-2 block">Output Format</label>
                <div className="flex flex-wrap gap-2">
                  {supportedFormats[config.platform]?.map(format => (
                    <button
                      key={format}
                      onClick={() => updateConfig('outputFormat', format)}
                      className={`arcade-button !text-xs !px-3 !py-2 ${
                        config.outputFormat !== format && 'bg-arcade-dark text-arcade-yellow'
                      }`}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* App Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="pixel-text text-sm text-arcade-gray mb-2 block">Version</label>
                  <input
                    type="text"
                    value={config.version}
                    onChange={(e) => updateConfig('version', e.target.value)}
                    className="arcade-input w-full !text-sm"
                    placeholder="1.0.0"
                  />
                </div>
                <div>
                  <label className="pixel-text text-sm text-arcade-gray mb-2 block">Author</label>
                  <input
                    type="text"
                    value={config.author}
                    onChange={(e) => updateConfig('author', e.target.value)}
                    className="arcade-input w-full !text-sm"
                    placeholder="Your Name"
                  />
                </div>
              </div>

              <div>
                <label className="pixel-text text-sm text-arcade-gray mb-2 block">Description</label>
                <input
                  type="text"
                  value={config.description}
                  onChange={(e) => updateConfig('description', e.target.value)}
                  className="arcade-input w-full !text-sm"
                  placeholder="App description"
                />
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateBinary}
              disabled={isGenerating || supportedPlatforms.length === 0}
              className="arcade-button w-full flex items-center justify-center space-x-2 mb-4"
            >
              {isGenerating ? (
                <>
                  <div className="pacman-loader" style={{ width: 16, height: 16 }}></div>
                  <span>Generating Binary...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Generate Binary Package</span>
                </>
              )}
            </button>

            {/* Build Log */}
            <AnimatePresence>
              {buildLog && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-arcade-dark/50 border border-arcade-cyan/30 rounded"
                >
                  <h4 className="arcade-text text-sm mb-2">Build Log</h4>
                  <pre className="pixel-text text-xs text-arcade-gray whitespace-pre-wrap">
                    {buildLog}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructions */}
            <div className="mt-4 p-3 bg-arcade-dark/30 border border-arcade-yellow/30 rounded">
              <h4 className="arcade-text text-sm mb-2">Instructions</h4>
              <p className="pixel-text text-xs text-arcade-gray">
                The generated package contains all necessary files and build scripts. 
                Follow the README.md file for platform-specific build instructions.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 