'use client'

import { motion } from 'framer-motion'
import { Zap, CornerDownLeft, Sparkles } from 'lucide-react'
import React from 'react'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  onGenerate: () => void
  isGenerating: boolean
  disabled?: boolean
}

const suggestionChips = [
  "A weather app with a minimalist design",
  "A snake game that gets faster over time",
  "A personal blog with a clean layout",
]

export default function PromptInput({
  value,
  onChange,
  onGenerate,
  isGenerating,
  disabled = false
}: PromptInputProps) {
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!disabled && value.trim() && !isGenerating) {
        onGenerate()
      }
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative arcade-card p-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. 'A chess game with an AI opponent...'"
          disabled={disabled || isGenerating}
          className="arcade-input w-full pr-40 !text-base bg-transparent border-0 focus:ring-0 resize-none h-24"
          rows={3}
        />
        <button
          onClick={onGenerate}
          disabled={disabled || isGenerating || !value.trim()}
          className="arcade-button absolute right-4 bottom-4 !text-sm !px-4 !py-2 flex items-center space-x-2"
        >
          {isGenerating ? (
            <>
              <div className="pacman-loader" style={{ width: 16, height: 16 }}></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Generate</span>
            </>
          )}
        </button>
      </div>
      <div className="flex items-center justify-center space-x-2 mt-4">
        <Sparkles className="w-4 h-4 text-primary" />
        <p className="pixel-text text-sm">Suggestions:</p>
        {suggestionChips.map((chip) => (
          <button 
            key={chip}
            onClick={() => handleSuggestionClick(chip)}
            className="pixel-text text-xs border border-primary/50 rounded-full px-3 py-1 hover:bg-primary/10 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  )
} 