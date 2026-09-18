import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      include: {
        _count: { select: { agreements: true, meetings: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ partners })
  } catch (error) {
    console.error('Partners API error:', error)
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 })
  }
}
