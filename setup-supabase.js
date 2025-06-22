#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Supabase configuration
const SUPABASE_URL = 'https://sbpporlmfetxvmqfzzhg.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNicHBvcmxtZmV0eHZtcWZ6emhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1Nzc4MTMsImV4cCI6MjA2NjE1MzgxM30.ZzGKiii-U_dSeDTxMNEWHgef6-bVMYvLEndT159o6FI'

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// SQL setup script
const setupSQL = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  credits INTEGER DEFAULT 10 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated apps table
CREATE TABLE IF NOT EXISTS generated_apps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  prompt TEXT NOT NULL,
  framework TEXT NOT NULL,
  app_type TEXT NOT NULL,
  code_files JSONB NOT NULL,
  readme TEXT NOT NULL,
  is_binary_compatible BOOLEAN DEFAULT false,
  download_url TEXT,
  preview_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  os TEXT NOT NULL,
  template_used TEXT,
  tokens_used INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT false,
  collaborators TEXT[] DEFAULT '{}'
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  members UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collaborations table
CREATE TABLE IF NOT EXISTS collaborations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  app_id UUID REFERENCES generated_apps(id) ON DELETE CASCADE NOT NULL,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role TEXT CHECK (role IN ('owner', 'editor', 'viewer')) DEFAULT 'viewer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborations ENABLE ROW LEVEL SECURITY;

-- Basic policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own apps" ON generated_apps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view public apps" ON generated_apps FOR SELECT USING (is_public = true);
CREATE POLICY "Users can insert own apps" ON generated_apps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own apps" ON generated_apps FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own apps" ON generated_apps FOR DELETE USING (auth.uid() = user_id);

-- Auto-create user on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, credits)
  VALUES (NEW.id, NEW.email, 10);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
`

async function setupSupabase() {
  console.log('🚀 Setting up Supabase database...')
  
  try {
    // Execute the setup SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql: setupSQL })
    
    if (error) {
      console.error('❌ Error setting up database:', error)
      console.log('\n📝 Manual Setup Required:')
      console.log('1. Go to your Supabase dashboard')
      console.log('2. Navigate to SQL Editor')
      console.log('3. Copy and paste the SQL from database-setup.sql')
      console.log('4. Click Run')
      return
    }
    
    console.log('✅ Database setup completed!')
    
    // Create .env.local file
    const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3002
NEXT_PUBLIC_APP_NAME=Buildify AI
`
    
    fs.writeFileSync('.env.local', envContent)
    console.log('✅ Created .env.local file')
    
    console.log('\n🎉 Setup completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('1. Add your OpenAI API key to .env.local')
    console.log('2. Run: npm install')
    console.log('3. Run: npm run dev')
    console.log('4. Test the application at http://localhost:3002')
    
  } catch (error) {
    console.error('❌ Setup failed:', error)
    console.log('\n📝 Manual Setup Required:')
    console.log('1. Go to your Supabase dashboard')
    console.log('2. Navigate to SQL Editor')
    console.log('3. Copy and paste the SQL from database-setup.sql')
    console.log('4. Click Run')
  }
}

// Run the setup
setupSupabase() 