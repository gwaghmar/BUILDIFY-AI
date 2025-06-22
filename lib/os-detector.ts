export function detectOS(): string {
  if (typeof window === 'undefined') {
    return 'unknown'
  }

  const platform = navigator.platform.toLowerCase()
  const userAgent = navigator.userAgent.toLowerCase()

  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'Windows'
  } else if (platform.includes('mac') || userAgent.includes('macintosh')) {
    return 'macOS'
  } else if (platform.includes('linux') || userAgent.includes('linux')) {
    return 'Linux'
  } else if (userAgent.includes('android')) {
    return 'Android'
  } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
    return 'iOS'
  }

  return 'unknown'
}

export function isDesktop(): boolean {
  const os = detectOS()
  return ['Windows', 'macOS', 'Linux'].includes(os)
}

export function isMobile(): boolean {
  const os = detectOS()
  return ['Android', 'iOS'].includes(os)
}

export function getRecommendedTechStack(os: string, appType: string): string[] {
  const recommendations: Record<string, Record<string, string[]>> = {
    Windows: {
      game: ['electron', 'tkinter', 'kivy'],
      utility: ['electron', 'tkinter'],
      dashboard: ['electron', 'react'],
      form: ['electron', 'tkinter'],
      tool: ['electron', 'tkinter'],
      'web-app': ['electron', 'react']
    },
    macOS: {
      game: ['electron', 'tkinter', 'kivy'],
      utility: ['electron', 'tkinter'],
      dashboard: ['electron', 'react'],
      form: ['electron', 'tkinter'],
      tool: ['electron', 'tkinter'],
      'web-app': ['electron', 'react']
    },
    Linux: {
      game: ['electron', 'tkinter', 'kivy'],
      utility: ['electron', 'tkinter'],
      dashboard: ['electron', 'react'],
      form: ['electron', 'tkinter'],
      tool: ['electron', 'tkinter'],
      'web-app': ['electron', 'react']
    }
  }

  return recommendations[os]?.[appType] || ['electron']
} 