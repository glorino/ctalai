import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const agents = await prisma.aIAgent.findMany({
      include: {
        _count: { select: { logs: true, actions: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ agents })
  } catch (error) {
    console.error('AI Agents API error:', error)
    return NextResponse.json({ error: 'Failed to fetch AI agents' }, { status: 500 })
  }
}
