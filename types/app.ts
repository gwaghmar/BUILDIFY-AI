export type AppType = 'game' | 'utility' | 'dashboard' | 'form' | 'tool' | 'web-app'

export type TechStack = 'electron' | 'tkinter' | 'kivy' | 'react' | 'vue' | 'vanilla' | 'flask' | 'django'

export interface GeneratedApp {
  id: string
  user_id: string
  prompt: string
  framework: TechStack
  appType: AppType
  codeFiles: CodeFile[]
  readme: string
  isBinaryCompatible: boolean
  downloadUrl?: string
  previewUrl?: string
  createdAt: string
  os: string
  template_used?: string
  tokens_used: number
  is_public: boolean
  collaborators: string[]
}

export interface CodeFile {
  name: string
  content: string
  language: string
  path: string
}

export interface TechStackInfo {
  name: string
  description: string
  icon: string
  color: string
  pros: string[]
  cons: string[]
  bestFor: string[]
}

export interface GenerationRequest {
  prompt: string
  os: string
  userId?: string
}

export interface GenerationResponse {
  success: boolean
  app?: GeneratedApp
  error?: string
}

export interface UserCredits {
  userId: string
  credits: number
  lastReset: Date
  totalGenerated: number
}

export interface AppTemplate {
  id: string
  name: string
  description: string
  category: AppType
  prompt: string
  preview: string
  difficulty: 'easy' | 'medium' | 'hard'
} 