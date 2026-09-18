import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const cohorts = await prisma.cohort.findMany({
      include: {
        program: { select: { name: true, description: true, price: true } },
        _count: { select: { enrollments: true, attendance: true, schedules: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const stats = await prisma.cohort.groupBy({
      by: ['status'],
      _count: true,
    })

    return NextResponse.json({ cohorts, stats })
  } catch (error) {
    console.error('Cohorts API error:', error)
    return NextResponse.json({ error: 'Failed to fetch cohorts' }, { status: 500 })
  }
}
