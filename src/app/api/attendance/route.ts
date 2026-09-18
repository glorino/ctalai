import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany({
      include: {
        cohort: { select: { name: true }, include: { program: { select: { name: true } } } },
      },
      orderBy: { date: 'desc' },
    })

    const stats = await prisma.attendance.groupBy({
      by: ['status'],
      _count: true,
    })

    return NextResponse.json({ attendance, stats })
  } catch (error) {
    console.error('Attendance API error:', error)
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 })
  }
}
