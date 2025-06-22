'use client'

import { motion } from 'framer-motion'

export default function LoadingAnimation() {
  const loadingText = "AI is building your app...".split("")

  return (
    <div className="flex flex-col items-center justify-center text-center py-10 arcade-card">
      {/* Pac-Man and ghost animation */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Pac-Man */}
        <div className="w-12 h-12 relative">
           <div className="pacman-loader" style={{ width: 48, height: 48 }}></div>
        </div>

        {/* Dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 0.5, 1],
                opacity: [0.7, 0.2, 0.7]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-3 h-3 bg-arcade-yellow rounded-full"
            />
          ))}
        </div>

        {/* Ghost */}
        <motion.div
           animate={{ y: [0, -5, 0] }}
           transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="ghost-loader" style={{ width: 48, height: 48 }}></div>
        </motion.div>
      </div>

      {/* Loading text */}
      <div className="text-center">
        <h3 className="arcade-text text-lg mb-2">GENERATING...</h3>
        <p className="pixel-text text-arcade-gray">
          {loadingText.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </p>
      </div>
    </div>
  )
} 