/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Arcade color palette
        'arcade-yellow': 'var(--arcade-yellow)',
        'arcade-blue': 'var(--arcade-blue)',
        'arcade-pink': 'var(--arcade-pink)',
        'arcade-cyan': 'var(--arcade-cyan)',
        'arcade-orange': 'var(--arcade-orange)',
        'arcade-green': 'var(--arcade-green)',
        'arcade-red': 'var(--arcade-red)',
        'arcade-purple': 'var(--arcade-purple)',
        'arcade-black': 'var(--arcade-black)',
        'arcade-white': 'var(--arcade-white)',
        'arcade-gray': 'var(--arcade-gray)',
        'arcade-dark': 'var(--arcade-dark)',
        'arcade-darker': 'var(--arcade-darker)',
        
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        'primary-hover': 'var(--primary-hover)',
        'primary-border-20': 'var(--primary-border-20)',
        'primary-border-30': 'var(--primary-border-30)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'arcade': ['"Press Start 2P"', 'monospace'],
        'pixel': ['VT323', 'monospace'],
      },
      animation: {
        'pacman-chomp': 'chomp 0.3s ease-in-out infinite',
        'pacman-dot': 'dot 2s ease-in-out infinite',
        'ghost-float': 'float 3s ease-in-out infinite',
        'power-pellet': 'pulse 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        chomp: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(45deg)' },
        },
        dot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
      backgroundImage: {
        'arcade-pattern': "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Ccircle cx=\"10\" cy=\"10\" r=\"1\" fill=\"%23FFD700\" opacity=\"0.3\"%3E%3C/circle%3E%3C/svg%3E')",
        'grid-pattern': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M 40 0 L 0 0 0 40\" fill=\"none\" stroke=\"%23FFD700\" stroke-width=\"1\" opacity=\"0.1\"%3E%3C/path%3E%3C/svg%3E')",
      },
      boxShadow: {
        'arcade': '0 0 20px rgba(255, 215, 0, 0.5)',
        'arcade-glow': '0 0 30px rgba(255, 215, 0, 0.8)',
        'ghost-glow': '0 0 20px rgba(255, 105, 180, 0.6)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 