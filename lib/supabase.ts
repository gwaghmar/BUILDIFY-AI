import { createClient } from '@supabase/supabase-js'
import { GeneratedApp } from '@/types/app'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  credits: number
  created_at: string
  updated_at: string
}

// export interface GeneratedApp {
//   id: string
//   user_id: string
//   prompt: string
//   framework: string
//   app_type: string
//   code_files: any[]
//   readme: string
//   is_binary_compatible: boolean
//   download_url?: string
//   preview_url?: string
//   created_at: string
//   os: string
//   template_used?: string
//   tokens_used: number
//   is_public: boolean
//   collaborators: string[]
// }

export interface Team {
  id: string
  name: string
  owner_id: string
  members: string[]
  created_at: string
  updated_at: string
}

export interface Collaboration {
  id: string
  app_id: string
  team_id: string
  user_id: string
  role: 'owner' | 'editor' | 'viewer'
  created_at: string
}

// Authentication helpers
export const auth = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helpers
export const db = {
  // User management
  createUser: async (userId: string, email: string) => {
    const { data, error } = await supabase
      .from('users')
      .insert([{ id: userId, email, credits: 10 }])
    return { data, error }
  },

  getUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  updateUserCredits: async (userId: string, credits: number) => {
    const { data, error } = await supabase
      .from('users')
      .update({ credits })
      .eq('id', userId)
    return { data, error }
  },

  // App management
  saveApp: async (app: Omit<GeneratedApp, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('generated_apps')
      .insert([app])
      .select()
    return { data, error }
  },

  getUserApps: async (userId: string) => {
    const { data, error } = await supabase
      .from('generated_apps')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  getPublicApps: async () => {
    const { data, error } = await supabase
      .from('generated_apps')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  updateApp: async (appId: string, updates: Partial<GeneratedApp>) => {
    const { data, error } = await supabase
      .from('generated_apps')
      .update(updates)
      .eq('id', appId)
    return { data, error }
  },

  deleteApp: async (appId: string) => {
    const { data, error } = await supabase
      .from('generated_apps')
      .delete()
      .eq('id', appId)
    return { data, error }
  },

  // Team management
  createTeam: async (name: string, ownerId: string) => {
    const { data, error } = await supabase
      .from('teams')
      .insert([{ name, owner_id: ownerId, members: [ownerId] }])
      .select()
    return { data, error }
  },

  getUserTeams: async (userId: string) => {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .contains('members', [userId])
    return { data, error }
  },

  addTeamMember: async (teamId: string, userId: string) => {
    // First get current members
    const { data: team } = await supabase
      .from('teams')
      .select('members')
      .eq('id', teamId)
      .single()
    
    if (team && !team.members.includes(userId)) {
      const updatedMembers = [...team.members, userId]
      const { data, error } = await supabase
        .from('teams')
        .update({ members: updatedMembers })
        .eq('id', teamId)
      return { data, error }
    }
    return { data: null, error: null }
  },

  // Collaboration
  createCollaboration: async (appId: string, teamId: string, userId: string, role: string) => {
    const { data, error } = await supabase
      .from('collaborations')
      .insert([{ app_id: appId, team_id: teamId, user_id: userId, role }])
    return { data, error }
  },

  getAppCollaborators: async (appId: string) => {
    const { data, error } = await supabase
      .from('collaborations')
      .select(`
        *,
        users:user_id(id, email),
        teams:team_id(id, name)
      `)
      .eq('app_id', appId)
    return { data, error }
  }
} 