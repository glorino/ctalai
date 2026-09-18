import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const content = await prisma.content.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Content API error:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}
