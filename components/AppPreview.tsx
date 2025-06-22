'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Code, Eye, Download, Play, Copy, Monitor, Smartphone, Tablet } from 'lucide-react'
import { GeneratedApp, TechStack } from '@/types/app'
import { LivePreview } from '@/lib/live-preview'
import Editor from "@monaco-editor/react";
import toast from 'react-hot-toast';

interface AppPreviewProps {
  app: GeneratedApp
  framework: TechStack
}

export default function AppPreview({ app, framework }: AppPreviewProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('code')
  const [selectedFile, setSelectedFile] = useState(0)
  const [monacoTheme, setMonacoTheme] = useState('vs-dark')
  const [previewSize, setPreviewSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const previewContainerRef = useRef<HTMLDivElement>(null)

  const isWebApp = framework === 'electron' || framework === 'react' || framework === 'vue' || framework === 'vanilla'

  useEffect(() => {
    if (viewMode === 'preview' && previewContainerRef.current) {
      const config = {
        width: previewSize === 'desktop' ? 1200 : previewSize === 'tablet' ? 768 : 375,
        height: previewSize === 'desktop' ? 800 : previewSize === 'tablet' ? 1024 : 667,
        theme: 'dark' as const,
        responsive: true
      }
      
      LivePreview.renderPreview(app, previewContainerRef.current, config)
    }

    return () => {
      if (viewMode === 'preview') {
        LivePreview.destroyPreview()
      }
    }
  }, [viewMode, app, previewSize])

  const handleCopyCode = () => {
    const code = app.codeFiles[selectedFile]?.content;
    if (code) {
      navigator.clipboard.writeText(code);
      toast('Code copied!', {
        icon: '👾',
        style: {
          background: '#1a1a1a',
          color: '#00FF00',
          border: '2px solid #00FF00',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '12px',
        },
      });
    }
  }

  const getPreviewSizeStyles = () => {
    switch (previewSize) {
      case 'mobile':
        return 'max-w-sm mx-auto'
      case 'tablet':
        return 'max-w-2xl mx-auto'
      default:
        return 'w-full'
    }
  }

  return (
    <div className="w-full bg-arcade-darker border-2 border-arcade-yellow">
      {/* View mode toggle */}
      <div className="flex space-x-2 p-2 bg-arcade-darker border-b-2 border-arcade-yellow">
        <button
          onClick={() => setViewMode('preview')}
          className={`arcade-button !text-xs !px-3 !py-1 ${
            viewMode !== 'preview' && 'bg-arcade-dark text-arcade-yellow'
          }`}
        >
          <Eye className="w-4 h-4 inline mr-2" />
          Preview
        </button>
        
        <button
          onClick={() => setViewMode('code')}
          className={`arcade-button !text-xs !px-3 !py-1 ${
            viewMode !== 'code' && 'bg-arcade-dark text-arcade-yellow'
          }`}
        >
          <Code className="w-4 h-4 inline mr-2" />
          Code
        </button>

        {viewMode === 'preview' && isWebApp && (
          <div className="flex space-x-1 ml-auto">
            <button
              onClick={() => setPreviewSize('desktop')}
              className={`arcade-button !text-xs !px-2 !py-1 ${
                previewSize !== 'desktop' && 'bg-arcade-dark text-arcade-yellow'
              }`}
            >
              <Monitor className="w-3 h-3" />
            </button>
            <button
              onClick={() => setPreviewSize('tablet')}
              className={`arcade-button !text-xs !px-2 !py-1 ${
                previewSize !== 'tablet' && 'bg-arcade-dark text-arcade-yellow'
              }`}
            >
              <Tablet className="w-3 h-3" />
            </button>
            <button
              onClick={() => setPreviewSize('mobile')}
              className={`arcade-button !text-xs !px-2 !py-1 ${
                previewSize !== 'mobile' && 'bg-arcade-dark text-arcade-yellow'
              }`}
            >
              <Smartphone className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <div className="min-h-[500px] p-2">
        {/* Preview mode */}
        {viewMode === 'preview' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className={`p-4 h-full ${getPreviewSizeStyles()}`}
          >
            {isWebApp ? (
              <div 
                ref={previewContainerRef}
                className="w-full h-[500px] border-2 border-arcade-cyan/50 rounded overflow-hidden"
                style={{
                  maxWidth: previewSize === 'mobile' ? '375px' : 
                           previewSize === 'tablet' ? '768px' : '100%'
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center pixel-text text-arcade-gray">
                  <Play className="w-16 h-16 mx-auto mb-4 text-arcade-yellow" />
                  <p className="text-lg mb-2">Desktop App Preview</p>
                  <p className="text-sm mb-4">Download the ZIP to run this {framework} application</p>
                  <div className="bg-arcade-dark/50 p-4 rounded border border-arcade-yellow/30">
                    <h4 className="arcade-text text-sm mb-2">App Details</h4>
                    <div className="text-xs space-y-1">
                      <p><span className="text-arcade-gray">Framework:</span> {framework}</p>
                      <p><span className="text-arcade-gray">Type:</span> {app.appType}</p>
                      <p><span className="text-arcade-gray">Files:</span> {app.codeFiles.length}</p>
                      <p><span className="text-arcade-gray">Binary:</span> {app.isBinaryCompatible ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Code mode */}
        {viewMode === 'code' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* File selector */}
            <div className="flex flex-wrap gap-2 mb-2">
              {app.codeFiles.map((file, index) => (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(index)}
                  className={`arcade-button !text-xs !px-2 !py-1 ${
                    selectedFile !== index && 'bg-arcade-dark text-arcade-yellow'
                  }`}
                >
                  {file.name}
                </button>
              ))}
            </div>

            {/* Code display */}
            <div className="relative h-[500px] border-2 border-arcade-cyan/50">
               <button onClick={handleCopyCode} className="arcade-button absolute top-2 right-2 z-10 !p-1 !text-xs h-auto">
                 <Copy className="w-4 h-4"/>
               </button>
               <Editor
                  height="100%"
                  language={app.codeFiles[selectedFile]?.language || 'javascript'}
                  value={app.codeFiles[selectedFile]?.content}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    fontFamily: 'VT323, monospace',
                  }}
                />
            </div>
          </motion.div>
        )}
      </div>

      {/* App info */}
      <div className="bg-arcade-darker border border-arcade-yellow p-4">
        <h4 className="arcade-text text-sm mb-2">APP INFO</h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="pixel-text text-arcade-gray">Files:</span>
            <span className="pixel-text text-arcade-white ml-2">{app.codeFiles.length}</span>
          </div>
          <div>
            <span className="pixel-text text-arcade-gray">Framework:</span>
            <span className="pixel-text text-arcade-white ml-2">{framework}</span>
          </div>
          <div>
            <span className="pixel-text text-arcade-gray">Type:</span>
            <span className="pixel-text text-arcade-white ml-2">{app.appType}</span>
          </div>
          <div>
            <span className="pixel-text text-arcade-gray">Binary:</span>
            <span className="pixel-text text-arcade-white ml-2">
              {app.isBinaryCompatible ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 