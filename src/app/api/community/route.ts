import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({ community: [] })
  } catch (error) {
    console.error('Community API error:', error)
    return NextResponse.json({ error: 'Failed to fetch community data' }, { status: 500 })
  }
}
