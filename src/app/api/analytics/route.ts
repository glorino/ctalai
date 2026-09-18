import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Revenue by month (last 12 months)
    const payments = await prisma.payment.findMany({
      where: { status: 'SUCCESSFUL' },
      select: { amount: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    })

    // Customer counts
    const totalCustomers = await prisma.customer.count()
    const activeCustomers = await prisma.customer.count({ where: { status: 'ACTIVE' } })

    // Lead counts by source
    const leadsBySource = await prisma.lead.groupBy({
      by: ['source'],
      _count: true,
      _avg: { score: true },
    })

    // Lead counts by status
    const leadsByStatus = await prisma.lead.groupBy({
      by: ['status'],
      _count: true,
    })

    // Enrollments
    const totalEnrollments = await prisma.enrollment.count()
    const completedEnrollments = await prisma.enrollment.count({ where: { status: 'COMPLETED' } })

    // Program performance
    const programStats = await prisma.program.findMany({
      select: {
        id: true,
        name: true,
        _count: { select: { enrollments: true } },
      },
    })

    // Support stats
    const openTickets = await prisma.supportTicket.count({ where: { status: 'OPEN' } })
    const resolvedTickets = await prisma.supportTicket.count({ where: { status: 'RESOLVED' } })

    return NextResponse.json({
      revenue: {
        total: payments.reduce((sum, p) => sum + p.amount, 0),
        monthly: payments,
      },
      customers: { total: totalCustomers, active: activeCustomers },
      leads: { bySource: leadsBySource, byStatus: leadsByStatus },
      enrollments: { total: totalEnrollments, completed: completedEnrollments },
      programs: programStats,
      support: { open: openTickets, resolved: resolvedTickets },
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
