import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ items: [], message: 'Onboarding data' })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    return NextResponse.json({ id: 'onb_' + Date.now(), ...data, status: data.status || 'NOT_STARTED', createdAt: new Date().toISOString() }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create onboarding record' }, { status: 500 })
  }
}
