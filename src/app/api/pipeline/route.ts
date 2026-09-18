import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const opportunities = await prisma.opportunity.findMany({
      include: {
        lead: { select: { name: true, email: true } },
        _count: { select: { proposals: true, activities: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const stages = ['QUALIFICATION', 'NEEDS_ANALYSIS', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'] as const
    const grouped = stages.reduce((acc, stage) => {
      acc[stage] = opportunities.filter(o => o.stage === stage)
      return acc
    }, {} as Record<string, typeof opportunities>)

    return NextResponse.json({ opportunities, grouped })
  } catch (error) {
    console.error('Pipeline API error:', error)
    return NextResponse.json({ error: 'Failed to fetch pipeline data' }, { status: 500 })
  }
}
