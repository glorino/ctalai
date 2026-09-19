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

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const cohort = await prisma.cohort.create({
      data: {
        name: data.name,
        programId: data.programId,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        maxStudents: data.maxStudents ? parseInt(data.maxStudents) : null,
        status: data.status || 'UPCOMING',
      },
    })
    return NextResponse.json(cohort, { status: 201 })
  } catch (error) {
    console.error('Cohort create error:', error)
    return NextResponse.json({ error: 'Failed to create cohort' }, { status: 500 })
  }
}
