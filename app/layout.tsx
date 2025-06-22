import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Buildify AI - Create Apps with AI',
  description: 'The AI-powered platform to build fully functioning apps from a single prompt.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            {/* Gradient background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-blue-500/20 to-transparent -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-yellow-500/20 to-transparent translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <main className="relative z-10">
              {children}
            </main>
            
            <Toaster 
              position="top-center"
              toastOptions={{
                style: {
                  background: 'var(--arcade-dark)',
                  color: 'var(--primary)',
                  border: '1px solid var(--primary)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                },
              }}
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 