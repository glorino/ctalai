import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({ notifications: [] })
  } catch (error) {
    console.error('Notifications API error:', error)
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
  }
}
