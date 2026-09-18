import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const assessments = await prisma.assessment.findMany({
      include: {
        program: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const typeCounts = assessments.reduce((acc, a) => {
      acc[a.type] = (acc[a.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({ assessments, stats: { total: assessments.length, typeCounts } })
  } catch (error) {
    console.error('Assessments API error:', error)
    return NextResponse.json({ error: 'Failed to fetch assessments' }, { status: 500 })
  }
}
