import { NextRequest, NextResponse } from 'next/server'
import JSZip from 'jszip'

export async function POST(request: NextRequest) {
  try {
    const { app } = await request.json()

    if (!app || !app.codeFiles) {
      return NextResponse.json(
        { error: 'Invalid app data' },
        { status: 400 }
      )
    }

    // Create ZIP file
    const zip = new JSZip()
    
    // Add code files
    app.codeFiles.forEach((file: any) => {
      zip.file(file.path, file.content)
    })

    // Add README
    if (app.readme) {
      zip.file('README.md', app.readme)
    }

    // Generate ZIP
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })

    // Return ZIP file
    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${app.prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.zip"`
      }
    })

  } catch (error) {
    console.error('Download failed:', error)
    return NextResponse.json(
      { error: 'Failed to create download' },
      { status: 500 }
    )
  }
} 