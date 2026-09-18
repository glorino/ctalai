import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      include: {
        user: { select: { name: true, email: true, avatar: true } },
        _count: { select: { performances: true, leaveRequests: true, kpis: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const stats = await prisma.staff.groupBy({
      by: ['status'],
      _count: true,
    })

    return NextResponse.json({ staff, stats })
  } catch (error) {
    console.error('HR API error:', error)
    return NextResponse.json({ error: 'Failed to fetch HR data' }, { status: 500 })
  }
}
