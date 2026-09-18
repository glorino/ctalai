import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        _count: { select: { leads: true, emailSequences: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const total = campaigns.length
    const active = campaigns.filter(c => c.status === 'ACTIVE').length
    const draft = campaigns.filter(c => c.status === 'DRAFT').length
    const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0)

    return NextResponse.json({ campaigns, stats: { total, active, draft, totalBudget } })
  } catch (error) {
    console.error('Campaigns API error:', error)
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const campaign = await prisma.campaign.create({
      data: {
        name: data.name,
        type: data.type || 'EMAIL',
        status: data.status || 'DRAFT',
        budget: data.budget ? parseFloat(data.budget) : null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    })
    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error('Campaign create error:', error)
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 })
  }
}
