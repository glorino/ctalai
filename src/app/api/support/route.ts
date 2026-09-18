import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const tickets = await prisma.supportTicket.findMany({
      include: {
        customer: { select: { name: true, email: true } },
        responses: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: { createdAt: 'desc' },
    })

    const stats = await prisma.supportTicket.groupBy({
      by: ['status'],
      _count: true,
    })

    return NextResponse.json({ tickets, stats })
  } catch (error) {
    console.error('Support API error:', error)
    return NextResponse.json({ error: 'Failed to fetch support data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const ticket = await prisma.supportTicket.create({
      data: {
        customerId: data.customerId,
        subject: data.subject,
        description: data.description,
        category: data.category || 'GENERAL',
        priority: data.priority || 'MEDIUM',
        status: 'OPEN',
      },
      include: {
        customer: { select: { name: true, email: true } },
        responses: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    })
    return NextResponse.json(ticket, { status: 201 })
  } catch (error) {
    console.error('Ticket create error:', error)
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 })
  }
}
