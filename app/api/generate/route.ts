import { NextRequest, NextResponse } from 'next/server'
import { generateApp } from '@/lib/ai-generator'

export async function POST(request: NextRequest) {
  try {
    const { prompt, os, userId } = await request.json()

    if (!prompt || !os) {
      return NextResponse.json(
        { error: 'Missing required fields: prompt and os' },
        { status: 400 }
      )
    }

    // Generate the app
    const generatedApp = await generateApp(prompt, os)

    // TODO: Save to database if user is authenticated
    if (userId) {
      // await saveAppToDatabase(generatedApp, userId)
    }

    return NextResponse.json({
      success: true,
      app: generatedApp
    })

  } catch (error) {
    console.error('App generation failed:', error)
    return NextResponse.json(
      { error: 'Failed to generate application' },
      { status: 500 }
    )
  }
} 