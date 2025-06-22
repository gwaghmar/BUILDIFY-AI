import { NextRequest, NextResponse } from 'next/server'
import { BinaryGenerator, BinaryConfig } from '@/lib/binary-generator'
import { GeneratedApp } from '@/types/app'

export async function POST(request: NextRequest) {
  try {
    const { app, config } = await request.json()

    if (!app || !config) {
      return NextResponse.json(
        { error: 'Missing required fields: app and config' },
        { status: 400 }
      )
    }

    // Validate the app structure
    if (!app.codeFiles || !Array.isArray(app.codeFiles)) {
      return NextResponse.json(
        { error: 'Invalid app structure: missing codeFiles' },
        { status: 400 }
      )
    }

    // Validate config
    const requiredConfigFields = ['platform', 'architecture', 'outputFormat', 'version', 'description', 'author']
    for (const field of requiredConfigFields) {
      if (!config[field]) {
        return NextResponse.json(
          { error: `Missing required config field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Generate binary
    const result = await BinaryGenerator.generateBinary(app as GeneratedApp, config as BinaryConfig)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to generate binary' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      binaryUrl: result.binaryUrl,
      buildLog: result.buildLog
    })

  } catch (error) {
    console.error('Binary generation failed:', error)
    return NextResponse.json(
      { error: 'Failed to generate binary' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const framework = searchParams.get('framework')
    const platform = searchParams.get('platform')

    if (!framework) {
      return NextResponse.json(
        { error: 'Framework parameter is required' },
        { status: 400 }
      )
    }

    // Get supported platforms and formats
    const supportedPlatforms = BinaryGenerator.getSupportedPlatforms(framework as any)
    
    const supportedFormats: Record<string, string[]> = {}
    if (platform) {
      supportedFormats[platform] = BinaryGenerator.getSupportedFormats(platform)
    } else {
      supportedPlatforms.forEach(p => {
        supportedFormats[p] = BinaryGenerator.getSupportedFormats(p)
      })
    }

    return NextResponse.json({
      success: true,
      supportedPlatforms,
      supportedFormats
    })

  } catch (error) {
    console.error('Failed to get binary options:', error)
    return NextResponse.json(
      { error: 'Failed to get binary options' },
      { status: 500 }
    )
  }
} 