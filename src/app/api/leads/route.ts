import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        assignedTo: { select: { name: true } },
        campaign: { select: { name: true } },
        _count: { select: { activities: true, opportunities: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const stats = await prisma.lead.groupBy({
      by: ['status'],
      _count: true,
    })

    const sourceStats = await prisma.lead.groupBy({
      by: ['source'],
      _count: true,
    })

    return NextResponse.json({ leads, stats, sourceStats })
  } catch (error) {
    console.error('Leads API error:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        source: data.source || 'WEBSITE',
        score: data.score || 0,
        status: data.status || 'NEW',
        assignedToId: data.assignedToId,
        campaignId: data.campaignId,
        notes: data.notes,
      },
    })
    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    console.error('Lead create error:', error)
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 })
  }
}
