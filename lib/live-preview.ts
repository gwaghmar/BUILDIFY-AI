import { GeneratedApp } from '@/types/app'

export interface PreviewConfig {
  width: number
  height: number
  theme: 'light' | 'dark'
  responsive: boolean
}

export class LivePreview {
  private static previewContainer: HTMLDivElement | null = null
  private static iframe: HTMLIFrameElement | null = null

  static createPreviewContainer(): HTMLDivElement {
    if (this.previewContainer) {
      return this.previewContainer
    }

    this.previewContainer = document.createElement('div')
    this.previewContainer.id = 'live-preview-container'
    this.previewContainer.style.cssText = `
      position: relative;
      width: 100%;
      height: 100%;
      background: #1a1a1a;
      border: 2px solid #FFD700;
      border-radius: 8px;
      overflow: hidden;
    `

    return this.previewContainer
  }

  static generatePreviewHTML(app: GeneratedApp, config: PreviewConfig = {
    width: 800,
    height: 600,
    theme: 'dark',
    responsive: true
  }): string {
    const mainFile = app.codeFiles.find(file => 
      file.name === 'index.html' || 
      file.name === 'App.jsx' || 
      file.name === 'App.tsx' ||
      file.name === 'main.js' ||
      file.name === 'main.ts'
    )

    if (!mainFile) {
      return this.generateFallbackHTML(app)
    }

    let html = ''
    let css = ''
    let js = ''

    // Extract CSS and JS from code files
    app.codeFiles.forEach(file => {
      if (file.language === 'css' || file.name.endsWith('.css')) {
        css += file.content + '\n'
      } else if (file.language === 'javascript' || file.language === 'typescript' || 
                 file.name.endsWith('.js') || file.name.endsWith('.ts') || 
                 file.name.endsWith('.jsx') || file.name.endsWith('.tsx')) {
        js += file.content + '\n'
      }
    })

    // Generate HTML structure
    if (mainFile.name === 'index.html') {
      html = mainFile.content
    } else {
      html = this.generateHTMLFromComponent(mainFile, app)
    }

    // Create complete HTML document
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${app.prompt}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: ${config.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
            color: ${config.theme === 'dark' ? '#ffffff' : '#000000'};
            overflow: hidden;
          }
          
          ${css}
          
          ${config.responsive ? `
            @media (max-width: 768px) {
              body { font-size: 14px; }
            }
          ` : ''}
        </style>
      </head>
      <body>
        <div id="root">
          ${html}
        </div>
        
        <script>
          // Sandbox environment
          const sandbox = {
            console: {
              log: (...args) => console.log('[Preview]', ...args),
              error: (...args) => console.error('[Preview]', ...args),
              warn: (...args) => console.warn('[Preview]', ...args)
            },
            window: window,
            document: document,
            setTimeout,
            setInterval,
            clearTimeout,
            clearInterval,
            Math,
            Date,
            JSON,
            localStorage: {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
              clear: () => {}
            }
          };
          
          try {
            ${js}
          } catch (error) {
            console.error('Preview error:', error);
            document.getElementById('root').innerHTML = 
              '<div style="padding: 20px; color: #ff6b6b;">Error loading preview: ' + error.message + '</div>';
          }
        </script>
      </body>
      </html>
    `
  }

  private static generateHTMLFromComponent(componentFile: any, app: GeneratedApp): string {
    const componentName = componentFile.name.replace(/\.(jsx|tsx|js|ts)$/, '')
    
    // Try to extract JSX/TSX content
    if (componentFile.language === 'javascript' || componentFile.language === 'typescript') {
      // Simple JSX to HTML conversion for preview
      let content = componentFile.content
      
      // Replace React components with basic HTML
      content = content.replace(/<(\w+)([^>]*)>/g, '<div class="$1"$2>')
      content = content.replace(/<\/(\w+)>/g, '</div>')
      
      // Extract text content
      const textMatch = content.match(/return\s*\(([\s\S]*?)\)/)
      if (textMatch) {
        return textMatch[1].trim()
      }
    }
    
    return `<div class="app-container">
      <h1>${app.prompt}</h1>
      <p>Generated with ${app.framework}</p>
    </div>`
  }

  private static generateFallbackHTML(app: GeneratedApp): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${app.prompt}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #1a1a1a;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          .fallback {
            text-align: center;
            padding: 2rem;
          }
          .title {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #FFD700;
          }
          .subtitle {
            color: #888;
            margin-bottom: 2rem;
          }
          .files {
            background: #2a2a2a;
            padding: 1rem;
            border-radius: 8px;
            text-align: left;
          }
          .file {
            color: #00FF00;
            margin: 0.5rem 0;
          }
        </style>
      </head>
      <body>
        <div class="fallback">
          <h1 class="title">${app.prompt}</h1>
          <p class="subtitle">Generated with ${app.framework}</p>
          <div class="files">
            <h3>Generated Files:</h3>
            ${app.codeFiles.map(file => `<div class="file">📄 ${file.name}</div>`).join('')}
          </div>
        </div>
      </body>
      </html>
    `
  }

  static renderPreview(app: GeneratedApp, container: HTMLElement, config?: PreviewConfig): void {
    const html = this.generatePreviewHTML(app, config)
    
    // Create iframe for sandboxed preview
    const iframe = document.createElement('iframe')
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      background: #1a1a1a;
    `
    iframe.sandbox.add('allow-scripts', 'allow-same-origin')
    
    // Clear container and add iframe
    container.innerHTML = ''
    container.appendChild(iframe)
    
    // Write HTML to iframe
    iframe.onload = () => {
      const doc = iframe.contentDocument || iframe.contentWindow?.document
      if (doc) {
        doc.open()
        doc.write(html)
        doc.close()
      }
    }
    
    // Trigger load
    iframe.src = 'about:blank'
  }

  static destroyPreview(): void {
    if (this.previewContainer) {
      this.previewContainer.remove()
      this.previewContainer = null
    }
    if (this.iframe) {
      this.iframe.remove()
      this.iframe = null
    }
  }
} 