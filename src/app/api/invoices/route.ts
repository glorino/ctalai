import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        customer: { select: { name: true, email: true } },
        _count: { select: { payments: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const total = invoices.length
    const paid = invoices.filter(i => i.status === 'PAID').reduce((sum, i) => sum + i.total, 0)
    const pending = invoices.filter(i => ['SENT', 'VIEWED'].includes(i.status)).reduce((sum, i) => sum + i.total, 0)
    const overdue = invoices.filter(i => i.status === 'OVERDUE').reduce((sum, i) => sum + i.total, 0)

    return NextResponse.json({ invoices, stats: { total, paid, pending, overdue } })
  } catch (error) {
    console.error('Invoices API error:', error)
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 })
  }
}
