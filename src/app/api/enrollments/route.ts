import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        customer: { select: { name: true, email: true } },
        program: { select: { name: true } },
        cohort: { select: { name: true } },
      },
      orderBy: { enrolledAt: 'desc' },
    })

    return NextResponse.json({ enrollments })
  } catch (error) {
    console.error('Enrollments API error:', error)
    return NextResponse.json({ error: 'Failed to fetch enrollments' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const enrollment = await prisma.enrollment.create({
      data: {
        customerId: data.customerId,
        programId: data.programId,
        cohortId: data.cohortId || null,
        status: 'ENROLLED',
      },
    })
    return NextResponse.json(enrollment, { status: 201 })
  } catch (error) {
    console.error('Enrollment create error:', error)
    return NextResponse.json({ error: 'Failed to create enrollment' }, { status: 500 })
  }
}
