import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const alumni = await prisma.alumni.findMany({
      include: {
        opportunities: true,
        _count: { select: { connections: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ alumni })
  } catch (error) {
    console.error('Alumni API error:', error)
    return NextResponse.json({ error: 'Failed to fetch alumni' }, { status: 500 })
  }
}
