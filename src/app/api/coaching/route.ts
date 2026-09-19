import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sessions = await prisma.coachingSession.findMany({
      include: {
        customer: { select: { name: true, email: true } },
        coach: { include: { user: { select: { name: true } } } },
      },
      orderBy: { scheduledAt: 'desc' },
    })

    const stats = await prisma.coachingSession.groupBy({
      by: ['status'],
      _count: true,
    })

    return NextResponse.json({ sessions, stats })
  } catch (error) {
    console.error('Coaching API error:', error)
    return NextResponse.json({ error: 'Failed to fetch coaching data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const session = await prisma.coachingSession.create({
      data: {
        customerId: data.customerId,
        coachId: data.coachId || null,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : new Date(),
        duration: data.duration ? parseInt(data.duration) : 60,
        notes: data.goal || null,
        status: 'SCHEDULED',
      },
    })
    return NextResponse.json(session, { status: 201 })
  } catch (error) {
    console.error('Coaching create error:', error)
    return NextResponse.json({ error: 'Failed to create coaching session' }, { status: 500 })
  }
}
