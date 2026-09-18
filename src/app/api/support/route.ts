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
