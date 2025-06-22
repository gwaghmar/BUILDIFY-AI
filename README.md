# 🎮 Buildify AI - Arcade-Style App Generator

Transform your ideas into working desktop and web applications with AI-powered arcade-style development!

## 🚀 Features

- **🎯 Prompt-to-App**: Describe your app idea in natural language
- **🤖 AI-Powered**: Intelligent tech stack selection based on your prompt and OS
- **🎮 Arcade Design**: Pac-Man inspired retro gaming aesthetic
- **💻 Multi-Platform**: Generate apps for Windows, macOS, and Linux
- **🔧 Multiple Frameworks**: Support for Electron, Tkinter, Kivy, React, Vue, and more
- **📦 Ready-to-Run**: Download complete, runnable applications
- **🎨 Live Preview**: See your app in action before downloading

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **AI**: OpenAI GPT-4 (mock implementation included)
- **Styling**: Custom arcade theme with Pac-Man animations
- **Packaging**: JSZip for app downloads
- **Database**: Supabase (ready for integration)

## 🎯 Supported App Types

- **Games**: Chess, puzzles, arcade games
- **Utilities**: File organizers, calculators, tools
- **Dashboards**: Analytics, monitoring, data visualization
- **Forms**: Data entry, surveys, applications
- **Web Apps**: Interactive websites, web tools
- **Desktop Apps**: Native applications for your OS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd buildify-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your configuration:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

1. **Enter your prompt**: Describe the app you want to create
   - Example: "Make a chess game with reset button"
   - Example: "Create a file organizer with drag & drop"

2. **AI Analysis**: The system automatically:
   - Detects your operating system
   - Classifies your app type
   - Selects the best technology stack

3. **Preview & Download**: 
   - View your app in live preview
   - Browse the generated code
   - Download the complete application

## 🎨 Arcade Design Features

- **Pac-Man Animations**: Chomping animations during loading
- **Ghost Characters**: Floating ghost animations
- **Power Pellets**: Glowing power pellet effects
- **Retro Typography**: Press Start 2P and VT323 fonts
- **Arcade Colors**: Yellow, blue, pink, cyan color palette
- **Pixel Art Elements**: Dot patterns and grid backgrounds

## 🔧 Framework Support

### Desktop Applications
- **Electron**: Cross-platform desktop apps with web technologies
- **Tkinter**: Lightweight Python GUI applications
- **Kivy**: Modern Python framework for multi-touch apps

### Web Applications
- **React**: Component-based JavaScript applications
- **Vue.js**: Progressive JavaScript framework
- **Vanilla JS**: Pure JavaScript without frameworks

## 📦 App Generation Process

1. **Prompt Analysis**: AI analyzes your description
2. **Tech Selection**: Chooses optimal framework for your OS and app type
3. **Code Generation**: Creates complete, runnable application
4. **File Packaging**: Organizes code into proper directory structure
5. **Documentation**: Generates README with setup instructions
6. **Download**: Provides ZIP file with all necessary files

## 🎯 Example Prompts

### Games
- "Create a chess game with AI opponent"
- "Make a snake game with high score tracking"
- "Build a memory card matching game"

### Utilities
- "File organizer with drag & drop functionality"
- "Calculator with scientific functions"
- "Password generator with strength meter"

### Tools
- "Todo app with categories and due dates"
- "Weather dashboard with location detection"
- "Note-taking app with markdown support"

## 🔮 Future Features

- **Binary Generation**: Create .exe and .app files
- **Template Gallery**: Pre-built app templates
- **User Accounts**: Save and manage your apps
- **Team Collaboration**: Share apps with team members
- **Advanced AI**: More sophisticated code generation
- **Real-time Preview**: Live app preview in browser

## 🛠️ Development

### Project Structure
```
buildify-ai/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── PromptInput.tsx    # Prompt input with arcade design
│   ├── LoadingAnimation.tsx # Pac-Man loading animation
│   ├── TechStackDisplay.tsx # Framework information
│   └── AppPreview.tsx     # App preview and code display
├── lib/                   # Utility functions
│   ├── ai-generator.ts    # AI app generation logic
│   └── os-detector.ts     # OS detection utilities
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

### Key Components

- **PromptInput**: Arcade-style text input with Pac-Man animations
- **LoadingAnimation**: Animated Pac-Man and ghost loading sequence
- **TechStackDisplay**: Framework information with arcade styling
- **AppPreview**: Code viewer and live preview with toggle

### Styling

The app uses a custom TailwindCSS configuration with:
- Arcade color palette (yellow, blue, pink, cyan)
- Retro fonts (Press Start 2P, VT323)
- Custom animations (Pac-Man chomp, ghost float)
- Pixel art patterns and effects

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎮 Credits

- **Design Inspiration**: Pac-Man arcade game
- **Fonts**: Press Start 2P, VT323 from Google Fonts
- **Icons**: Lucide React
- **Animations**: Framer Motion

---

**Ready to build your next app? Let's make some magic! 🎮✨** 