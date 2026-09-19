import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const opportunities = await prisma.opportunity.findMany({
      include: {
        lead: { select: { name: true, email: true } },
        _count: { select: { proposals: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const stageCounts = opportunities.reduce((acc, o) => {
      acc[o.stage] = (acc[o.stage] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const totalValue = opportunities.reduce((sum, o) => sum + (o.value || 0), 0)

    return NextResponse.json({ opportunities, stats: { total: opportunities.length, totalValue, stageCounts } })
  } catch (error) {
    console.error('Opportunities API error:', error)
    return NextResponse.json({ error: 'Failed to fetch opportunities' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const opportunity = await prisma.opportunity.create({
      data: {
        name: data.name,
        value: data.value ? parseFloat(data.value) : null,
        stage: data.stage || 'QUALIFICATION',
        probability: data.probability ? parseInt(data.probability) : 0,
        notes: data.notes,
        leadId: data.leadId || null,
        customerId: data.customerId || null,
      },
    })
    return NextResponse.json(opportunity, { status: 201 })
  } catch (error) {
    console.error('Opportunity create error:', error)
    return NextResponse.json({ error: 'Failed to create opportunity' }, { status: 500 })
  }
}
