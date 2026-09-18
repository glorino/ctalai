import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        customer: { select: { name: true, email: true } },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    const stats = await prisma.invoice.groupBy({
      by: ['status'],
      _count: true,
      _sum: { amount: true },
    })

    const totalRevenue = await prisma.payment.aggregate({
      where: { status: 'SUCCESSFUL' },
      _sum: { amount: true },
    })

    const totalExpenses = await prisma.expense.aggregate({
      _sum: { amount: true },
    })

    return NextResponse.json({
      invoices,
      stats,
      revenue: totalRevenue._sum.amount || 0,
      expenses: totalExpenses._sum.amount || 0,
    })
  } catch (error) {
    console.error('Finance API error:', error)
    return NextResponse.json({ error: 'Failed to fetch finance data' }, { status: 500 })
  }
}
