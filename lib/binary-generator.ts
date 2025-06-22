import { GeneratedApp, TechStack } from '@/types/app'
import JSZip from 'jszip'

export interface BinaryConfig {
  platform: 'windows' | 'macos' | 'linux'
  architecture: 'x64' | 'arm64'
  outputFormat: 'exe' | 'app' | 'deb' | 'rpm'
  icon?: string
  version: string
  description: string
  author: string
}

export interface BuildResult {
  success: boolean
  binaryUrl?: string
  error?: string
  buildLog?: string
}

export class BinaryGenerator {
  private static readonly BUILD_SCRIPTS = {
    electron: {
      windows: {
        packageJson: (config: BinaryConfig) => ({
          name: config.description.toLowerCase().replace(/\s+/g, '-'),
          version: config.version,
          description: config.description,
          author: config.author,
          main: 'main.js',
          scripts: {
            start: 'electron .',
            build: 'electron-builder',
            dist: 'electron-builder --publish=never'
          },
          build: {
            appId: `com.buildify.${config.description.toLowerCase().replace(/\s+/g, '-')}`,
            productName: config.description,
            directories: {
              output: 'dist'
            },
            win: {
              target: 'nsis',
              icon: config.icon || 'assets/icon.ico'
            },
            mac: {
              target: 'dmg',
              icon: config.icon || 'assets/icon.icns'
            },
            linux: {
              target: 'AppImage',
              icon: config.icon || 'assets/icon.png'
            }
          },
          devDependencies: {
            'electron': '^25.0.0',
            'electron-builder': '^24.0.0'
          }
        }),
        buildScript: (config: BinaryConfig) => `
          @echo off
          echo Building ${config.description} for Windows...
          npm install
          npm run build
          echo Build complete!
        `
      },
      macos: {
        packageJson: (config: BinaryConfig) => ({
          name: config.description.toLowerCase().replace(/\s+/g, '-'),
          version: config.version,
          description: config.description,
          author: config.author,
          main: 'main.js',
          scripts: {
            start: 'electron .',
            build: 'electron-builder',
            dist: 'electron-builder --publish=never'
          },
          build: {
            appId: `com.buildify.${config.description.toLowerCase().replace(/\s+/g, '-')}`,
            productName: config.description,
            directories: {
              output: 'dist'
            },
            mac: {
              target: 'dmg',
              icon: config.icon || 'assets/icon.icns',
              category: 'public.app-category.utilities'
            }
          },
          devDependencies: {
            'electron': '^25.0.0',
            'electron-builder': '^24.0.0'
          }
        }),
        buildScript: (config: BinaryConfig) => `
          #!/bin/bash
          echo "Building ${config.description} for macOS..."
          npm install
          npm run build
          echo "Build complete!"
        `
      },
      linux: {
        packageJson: (config: BinaryConfig) => ({
          name: config.description.toLowerCase().replace(/\s+/g, '-'),
          version: config.version,
          description: config.description,
          author: config.author,
          main: 'main.js',
          scripts: {
            start: 'electron .',
            build: 'electron-builder',
            dist: 'electron-builder --publish=never'
          },
          build: {
            appId: `com.buildify.${config.description.toLowerCase().replace(/\s+/g, '-')}`,
            productName: config.description,
            directories: {
              output: 'dist'
            },
            linux: {
              target: 'AppImage',
              icon: config.icon || 'assets/icon.png',
              category: 'Utility'
            }
          },
          devDependencies: {
            'electron': '^25.0.0',
            'electron-builder': '^24.0.0'
          }
        }),
        buildScript: (config: BinaryConfig) => `
          #!/bin/bash
          echo "Building ${config.description} for Linux..."
          npm install
          npm run build
          echo "Build complete!"
        `
      }
    },
    python: {
      windows: {
        requirements: (config: BinaryConfig) => `
          pyinstaller==5.13.0
          auto-py-to-exe==2.32.0
        `,
        buildScript: (config: BinaryConfig) => `
          @echo off
          echo Building ${config.description} for Windows...
          pip install -r requirements.txt
          pyinstaller --onefile --windowed --name "${config.description}" main.py
          echo Build complete!
        `
      },
      macos: {
        requirements: (config: BinaryConfig) => `
          pyinstaller==5.13.0
        `,
        buildScript: (config: BinaryConfig) => `
          #!/bin/bash
          echo "Building ${config.description} for macOS..."
          pip3 install -r requirements.txt
          pyinstaller --onefile --windowed --name "${config.description}" main.py
          echo "Build complete!"
        `
      },
      linux: {
        requirements: (config: BinaryConfig) => `
          pyinstaller==5.13.0
        `,
        buildScript: (config: BinaryConfig) => `
          #!/bin/bash
          echo "Building ${config.description} for Linux..."
          pip3 install -r requirements.txt
          pyinstaller --onefile --windowed --name "${config.description}" main.py
          echo "Build complete!"
        `
      }
    }
  }

  static async generateBinary(
    app: GeneratedApp, 
    config: BinaryConfig
  ): Promise<BuildResult> {
    try {
      const zip = new JSZip()
      
      // Add all code files
      app.codeFiles.forEach(file => {
        zip.file(file.path, file.content)
      })

      // Add build configuration based on framework and platform
      const buildConfig = this.getBuildConfiguration(app.framework, config)
      
      if (buildConfig.packageJson) {
        zip.file('package.json', JSON.stringify(buildConfig.packageJson, null, 2))
      }
      
      if (buildConfig.requirements) {
        zip.file('requirements.txt', buildConfig.requirements)
      }
      
      if (buildConfig.buildScript) {
        const scriptName = config.platform === 'windows' ? 'build.bat' : 'build.sh'
        zip.file(scriptName, buildConfig.buildScript)
      }

      // Add README with build instructions
      const buildReadme = this.generateBuildReadme(app, config)
      zip.file('BUILD_README.md', buildReadme)

      // Generate ZIP
      const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })

      return {
        success: true,
        binaryUrl: `data:application/zip;base64,${zipBuffer.toString('base64')}`,
        buildLog: 'Binary package generated successfully. Follow BUILD_README.md for instructions.'
      }

    } catch (error) {
      return {
        success: false,
        error: `Failed to generate binary: ${error}`,
        buildLog: `Error: ${error}`
      }
    }
  }

  private static getBuildConfiguration(framework: TechStack, config: BinaryConfig) {
    const frameworkConfigs = this.BUILD_SCRIPTS[framework as keyof typeof this.BUILD_SCRIPTS]
    
    if (!frameworkConfigs) {
      return {}
    }

    const platformConfig = frameworkConfigs[config.platform as keyof typeof frameworkConfigs]
    
    if (!platformConfig) {
      return {}
    }

    return {
      packageJson: 'packageJson' in platformConfig ? platformConfig.packageJson(config) : undefined,
      requirements: 'requirements' in platformConfig ? platformConfig.requirements(config) : undefined,
      buildScript: 'buildScript' in platformConfig ? platformConfig.buildScript(config) : undefined
    }
  }

  private static generateBuildReadme(app: GeneratedApp, config: BinaryConfig): string {
    const framework = app.framework
    const platform = config.platform

    let instructions = ''

    if (framework === 'electron') {
      instructions = `
## Building ${config.description}

### Prerequisites
- Node.js 18+ and npm
- For Windows: Windows 10/11
- For macOS: macOS 10.15+
- For Linux: Ubuntu 18.04+ or similar

### Build Steps

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run the build script:**
   ${platform === 'windows' ? 
     '\n   ```cmd\n   build.bat\n   ```' : 
     '\n   ```bash\n   chmod +x build.sh\n   ./build.sh\n   ```'
   }

3. **Find your binary:**
   - Windows: \`dist/${config.description} Setup.exe\`
   - macOS: \`dist/${config.description}.dmg\`
   - Linux: \`dist/${config.description}.AppImage\`

### Development
To run the app in development mode:
\`\`\`bash
npm start
\`\`\`
`
    } else if (framework === 'tkinter' || framework === 'kivy') {
      instructions = `
## Building ${config.description}

### Prerequisites
- Python 3.8+
- pip package manager
- For Windows: Windows 10/11
- For macOS: macOS 10.15+
- For Linux: Ubuntu 18.04+ or similar

### Build Steps

1. **Install dependencies:**
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

2. **Run the build script:**
   ${platform === 'windows' ? 
     '\n   ```cmd\n   build.bat\n   ```' : 
     '\n   ```bash\n   chmod +x build.sh\n   ./build.sh\n   ```'
   }

3. **Find your binary:**
   - Windows: \`dist/${config.description}.exe\`
   - macOS: \`dist/${config.description}\`
   - Linux: \`dist/${config.description}\`

### Development
To run the app in development mode:
\`\`\`bash
python main.py
\`\`\`
`
    }

    return `
# ${config.description}

${app.readme}

## Binary Build Instructions

${instructions}

## App Information
- **Framework:** ${framework}
- **Platform:** ${platform}
- **Version:** ${config.version}
- **Author:** ${config.author}
- **Generated:** ${new Date().toISOString()}

## Files Included
${app.codeFiles.map(file => `- ${file.name}`).join('\n')}

---
*Generated by Buildify AI - Transform prompts into applications!*
`
  }

  static getSupportedPlatforms(framework: TechStack): string[] {
    const frameworkConfigs = this.BUILD_SCRIPTS[framework as keyof typeof this.BUILD_SCRIPTS]
    
    if (!frameworkConfigs) {
      return []
    }

    return Object.keys(frameworkConfigs)
  }

  static getSupportedFormats(platform: string): string[] {
    const formats = {
      windows: ['exe', 'msi'],
      macos: ['app', 'dmg'],
      linux: ['deb', 'rpm', 'AppImage', 'snap']
    }

    return formats[platform as keyof typeof formats] || []
  }
} 