import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        _count: { select: { enrollments: true, invoices: true, feedback: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const groupedByStatus = customers.reduce((acc, customer) => {
      const status = customer.status
      if (!acc[status]) acc[status] = []
      acc[status].push(customer)
      return acc
    }, {} as Record<string, typeof customers>)

    const stats = await prisma.customer.groupBy({
      by: ['status'],
      _count: true,
    })

    return NextResponse.json({ customers, groupedByStatus, stats })
  } catch (error) {
    console.error('Customer success API error:', error)
    return NextResponse.json({ error: 'Failed to fetch customer success data' }, { status: 500 })
  }
}
