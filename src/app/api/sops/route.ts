import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sops = await prisma.sOP.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ sops })
  } catch (error) {
    console.error('SOPs API error:', error)
    return NextResponse.json({ error: 'Failed to fetch SOPs' }, { status: 500 })
  }
}
