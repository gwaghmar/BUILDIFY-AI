# 🚀 Quick Setup Guide

## ⚡ **One-Click Setup (Recommended)**

1. **Run the setup script:**
   ```bash
   npm run setup
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the app:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Go to [http://localhost:3002](http://localhost:3002)

## 🔧 **Manual Setup (If automated fails)**

### **Step 1: Set up Supabase Database**

1. Go to [supabase.com](https://supabase.com)
2. Sign in and open your project
3. Go to **SQL Editor**
4. Click **New Query**
5. Copy the entire contents of `database-setup.sql`
6. Paste and click **Run**

### **Step 2: Create Environment File**

Create `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://sbpporlmfetxvmqfzzhg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNicHBvcmxtZmV0eHZtcWZ6emhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1Nzc4MTMsImV4cCI6MjA2NjE1MzgxM30.ZzGKiii-U_dSeDTxMNEWHgef6-bVMYvLEndT159o6FI
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3002
NEXT_PUBLIC_APP_NAME=Buildify AI
```

### **Step 3: Install and Run**

```bash
npm install
npm run dev
```

## ✅ **Test Your Setup**

1. **Authentication:** Click "Sign Up" → Create account → Get 10 credits
2. **App Generation:** Enter a prompt → Generate app → Uses 1 credit
3. **Live Preview:** Click "Preview" tab → See app running
4. **Binary Generation:** Click "Generate Binary" → Download package
5. **Team Collaboration:** Click "Share with Team" → Create team

## 🎯 **Features Ready to Use**

- ✅ **User Authentication** (Supabase)
- ✅ **Live Preview** (Real-time app rendering)
- ✅ **Binary Generation** (.exe, .app, .deb files)
- ✅ **Team Collaboration** (Create teams, share apps)
- ✅ **Advanced AI** (Template matching, optimization)
- ✅ **Credit System** (10 free credits on signup)

## 🚨 **Troubleshooting**

### **If setup script fails:**
- Use manual setup instead
- Check your internet connection
- Verify Supabase project is active

### **If authentication doesn't work:**
- Check `.env.local` file exists
- Verify Supabase credentials
- Check browser console for errors

### **If database errors occur:**
- Run SQL script manually in Supabase dashboard
- Check table permissions
- Verify RLS policies

## 🎉 **You're Ready!**

Your Buildify AI platform is now fully set up with:
- **Live preview** of generated apps
- **Binary generation** for executables
- **User authentication** with credits
- **Team collaboration** features
- **Advanced AI** capabilities

**Start building amazing apps! 🎮** 