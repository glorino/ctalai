import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      include: {
        cohorts: { select: { id: true, name: true, status: true, _count: { select: { enrollments: true } } } },
        _count: { select: { enrollments: true, assessments: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const totalEnrollments = await prisma.enrollment.count()
    const activeEnrollments = await prisma.enrollment.count({
      where: { status: { in: ['ENROLLED', 'IN_PROGRESS'] } },
    })

    return NextResponse.json({ programs, totalEnrollments, activeEnrollments })
  } catch (error) {
    console.error('Programs API error:', error)
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const program = await prisma.program.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        duration: data.duration,
        price: data.price,
        capacity: data.capacity,
      },
    })
    return NextResponse.json(program, { status: 201 })
  } catch (error) {
    console.error('Program create error:', error)
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 })
  }
}
