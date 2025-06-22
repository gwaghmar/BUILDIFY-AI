import OpenAI from 'openai';
import { PromptOptimizer, TokenTracker } from './prompt-optimizer';
import { ResponseCache } from './response-cache';
import { getTemplateById, APP_TEMPLATES } from './templates';
import { GeneratedApp, AppType, TechStack, CodeFile } from '@/types/app'
import { getRecommendedTechStack } from './os-detector'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "YOUR_DUMMY_API_KEY",
});

export interface GenerationRequest {
  prompt: string;
  templateId?: string;
  useOptimization?: boolean;
  useCache?: boolean;
}

export interface GenerationResponse {
  code: string;
  tokensUsed: number;
  fromCache: boolean;
  templateUsed?: string;
  optimizationApplied?: boolean;
}

function findBestTemplateForPrompt(prompt: string) {
  const lowerPrompt = prompt.toLowerCase();
  // 1. Exact tag match
  let best = APP_TEMPLATES.find(t => t.tags && t.tags.some(tag => lowerPrompt.includes(tag)));
  if (best) return best;
  // 2. Category keyword match
  best = APP_TEMPLATES.find(t => lowerPrompt.includes(t.category.replace('-', ' ')));
  if (best) return best;
  // 3. Name/description match
  best = APP_TEMPLATES.find(t => lowerPrompt.includes(t.name.toLowerCase()) || lowerPrompt.includes(t.description.toLowerCase()));
  if (best) return best;
  // 4. Fallback: no match
  return undefined;
}

export class AIGenerator {
  static async generateApp(request: GenerationRequest): Promise<GenerationResponse> {
    let finalPrompt = request.prompt;
    let templateUsed: string | undefined;
    let optimizationApplied = false;
    let fromCache = false;

    // 1. Try to match a template automatically if no templateId is provided
    let template;
    if (request.templateId) {
      template = getTemplateById(request.templateId);
    } else {
      template = findBestTemplateForPrompt(request.prompt);
    }
    if (template) {
      finalPrompt = template.prompt;
      templateUsed = template.name;
    }

    // 2. Apply prompt optimization if enabled
    if (request.useOptimization !== false) {
      const optimized = PromptOptimizer.optimizePrompt(finalPrompt);
      finalPrompt = optimized.prompt;
      optimizationApplied = true;
    }

    // 3. Check cache first
    if (request.useCache !== false) {
      const cached = await ResponseCache.get(finalPrompt);
      if (cached) {
        TokenTracker.trackUsage(finalPrompt, 0); // Cache hit = 0 tokens
        return {
          code: cached.response,
          tokensUsed: 0,
          fromCache: true,
          templateUsed,
          optimizationApplied
        };
      }

      // Try to find similar cached response
      const similar = await ResponseCache.findSimilar(finalPrompt);
      if (similar) {
        TokenTracker.trackUsage(finalPrompt, 0);
        return {
          code: similar.response,
          tokensUsed: 0,
          fromCache: true,
          templateUsed,
          optimizationApplied
        };
      }
    }

    // 4. Generate new response
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert React developer. Generate clean, modern React components with TypeScript. Focus on functionality and responsive design. Keep responses concise but complete."
          },
          {
            role: "user",
            content: finalPrompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      });

      const code = completion.choices[0]?.message?.content || '';
      const tokensUsed = completion.usage?.total_tokens || 0;

      // 5. Cache the response
      if (request.useCache !== false) {
        await ResponseCache.set(finalPrompt, code, tokensUsed);
      }

      // 6. Track token usage
      TokenTracker.trackUsage(finalPrompt, tokensUsed);

      return {
        code,
        tokensUsed,
        fromCache: false,
        templateUsed,
        optimizationApplied
      };

    } catch (error) {
      console.error('AI generation error:', error);
      throw new Error('Failed to generate application code');
    }
  }

  static getTemplates() {
    return APP_TEMPLATES;
  }

  static getUsageStats() {
    return TokenTracker.getUsageStats();
  }

  static getCacheStats() {
    return ResponseCache.getStats();
  }

  static getMostExpensivePrompts() {
    return TokenTracker.getMostExpensivePrompts();
  }
}

// Mock OpenAI client - replace with actual OpenAI integration
class MockOpenAIClient {
  async chatCompletion(messages: any[]) {
    // Simulate AI response
    const lastMessage = messages[messages.length - 1]
    const prompt = lastMessage.content

    // Simple classification logic
    let appType: AppType = 'utility'
    if (prompt.toLowerCase().includes('game') || prompt.toLowerCase().includes('chess') || prompt.toLowerCase().includes('puzzle')) {
      appType = 'game'
    } else if (prompt.toLowerCase().includes('dashboard') || prompt.toLowerCase().includes('analytics')) {
      appType = 'dashboard'
    } else if (prompt.toLowerCase().includes('form') || prompt.toLowerCase().includes('input')) {
      appType = 'form'
    } else if (prompt.toLowerCase().includes('web') || prompt.toLowerCase().includes('website')) {
      appType = 'web-app'
    }

    return {
      choices: [{
        message: {
          content: JSON.stringify({
            appType,
            framework: 'electron',
            code: this.generateMockCode(prompt, appType, 'electron')
          })
        }
      }]
    }
  }

  private generateMockCode(prompt: string, appType: AppType, framework: TechStack): any {
    const timestamp = Date.now()
    
    if (framework === 'electron') {
      return {
        codeFiles: [
          {
            name: 'package.json',
            content: JSON.stringify({
              name: `app-${timestamp}`,
              version: '1.0.0',
              main: 'main.js',
              scripts: {
                start: 'electron .',
                build: 'electron-builder'
              },
              dependencies: {
                electron: '^25.0.0'
              }
            }, null, 2),
            language: 'json',
            path: 'package.json'
          },
          {
            name: 'main.js',
            content: `const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})`,
            language: 'javascript',
            path: 'main.js'
          },
          {
            name: 'index.html',
            content: `<!DOCTYPE html>
<html>
<head>
    <title>${prompt}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: #1a1a1a;
            color: #fff;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            color: #FFD700;
            font-size: 2.5em;
            margin-bottom: 20px;
        }
        .app-content {
            background: #333;
            padding: 30px;
            border-radius: 10px;
            border: 2px solid #FFD700;
        }
        button {
            background: #FFD700;
            color: #000;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            margin: 10px;
            border-radius: 5px;
        }
        button:hover {
            background: #FF8C00;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${prompt}</h1>
        <div class="app-content">
            <p>Your ${appType} application is ready!</p>
            <button onclick="alert('Hello from your app!')">Click Me</button>
            <button onclick="document.body.style.background = '#FF69B4'">Change Theme</button>
        </div>
    </div>
</body>
</html>`,
            language: 'html',
            path: 'index.html'
          }
        ],
        readme: `# ${prompt}

This is a ${appType} application generated by Buildify AI.

## Installation

\`\`\`bash
npm install
\`\`\`

## Running the app

\`\`\`bash
npm start
\`\`\`

## Building for distribution

\`\`\`bash
npm run build
\`\`\`

## Features

- Generated from prompt: "${prompt}"
- App type: ${appType}
- Framework: ${framework}
- Created with Buildify AI
`
      }
    }

    // Default fallback
    return {
      codeFiles: [
        {
          name: 'app.py',
          content: `import tkinter as tk
from tkinter import messagebox

class App:
    def __init__(self, root):
        self.root = root
        self.root.title("${prompt}")
        self.root.geometry("600x400")
        self.root.configure(bg='#1a1a1a')
        
        # Create main frame
        main_frame = tk.Frame(root, bg='#1a1a1a')
        main_frame.pack(expand=True, fill='both', padx=20, pady=20)
        
        # Title
        title = tk.Label(main_frame, text="${prompt}", 
                        font=('Arial', 24, 'bold'), 
                        fg='#FFD700', bg='#1a1a1a')
        title.pack(pady=20)
        
        # Content
        content = tk.Label(main_frame, text="Your ${appType} application is ready!", 
                          font=('Arial', 14), 
                          fg='white', bg='#1a1a1a')
        content.pack(pady=20)
        
        # Buttons
        button_frame = tk.Frame(main_frame, bg='#1a1a1a')
        button_frame.pack(pady=20)
        
        tk.Button(button_frame, text="Click Me", 
                 command=lambda: messagebox.showinfo("Hello", "Hello from your app!"),
                 bg='#FFD700', fg='black', font=('Arial', 12),
                 padx=20, pady=10).pack(side=tk.LEFT, padx=10)
        
        tk.Button(button_frame, text="Exit", 
                 command=root.quit,
                 bg='#FF0000', fg='white', font=('Arial', 12),
                 padx=20, pady=10).pack(side=tk.LEFT, padx=10)

if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()`,
          language: 'python',
          path: 'app.py'
        }
      ],
      readme: `# ${prompt}

This is a ${appType} application generated by Buildify AI.

## Requirements

- Python 3.7+
- tkinter (usually comes with Python)

## Running the app

\`\`\`bash
python app.py
\`\`\`

## Features

- Generated from prompt: "${prompt}"
- App type: ${appType}
- Framework: ${framework}
- Created with Buildify AI
`
    }
  }
}

const mockOpenAI = new MockOpenAIClient()

export async function generateApp(prompt: string, os: string): Promise<GeneratedApp> {
  try {
    // Step 1: Classify the app and select tech stack
    const classificationMessages = [
      {
        role: 'system',
        content: `You are an AI assistant that classifies app prompts and selects the best technology stack. 
        Analyze the user's prompt and determine:
        1. App type (game, utility, dashboard, form, tool, web-app)
        2. Best technology stack for the user's OS (${os})
        
        Return a JSON response with appType and framework fields.`
      },
      {
        role: 'user',
        content: prompt
      }
    ]

    const classificationResponse = await mockOpenAI.chatCompletion(classificationMessages)
    const classification = JSON.parse(classificationResponse.choices[0].message.content)

    // Step 2: Generate the actual app code
    const generationMessages = [
      {
        role: 'system',
        content: `You are an expert developer. Generate a complete, working application based on the user's prompt.
        Use the specified framework and create all necessary files.
        Make the app functional and visually appealing with an arcade-style theme.
        Include proper error handling and documentation.`
      },
      {
        role: 'user',
        content: `Create a ${classification.appType} application using ${classification.framework} for ${os}.
        Prompt: ${prompt}
        
        Generate all necessary files with complete, runnable code.`
      }
    ]

    const generationResponse = await mockOpenAI.chatCompletion(generationMessages)
    const generation = JSON.parse(generationResponse.choices[0].message.content)

    // Final assembly
    const app: GeneratedApp = {
      id: `app_${Date.now()}`,
      prompt: generation.prompt,
      framework: classification.framework,
      appType: classification.app_type,
      codeFiles: generation.code_files,
      readme: generation.readme,
      isBinaryCompatible: ['electron', 'tkinter', 'kivy'].includes(classification.framework),
      createdAt: new Date().toISOString(),
      os: os,
      user_id: '', // This will be set when saved
      tokens_used: 0,
      is_public: false,
      collaborators: []
    }

    return app
  } catch (error) {
    console.error('AI generation error:', error)
    throw new Error('Failed to generate application code')
  }
}

export async function classifyPrompt(prompt: string): Promise<{ appType: AppType; framework: TechStack }> {
  // This would use OpenAI to classify the prompt
  // For now, return a simple classification
  const appType: AppType = prompt.toLowerCase().includes('game') ? 'game' : 'utility';
  const framework: TechStack = 'electron';
  return { appType, framework };
}