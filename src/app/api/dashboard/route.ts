import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const userCount = await prisma.user.count()
    const customerCount = await prisma.customer.count()
    const leadCount = await prisma.lead.count()
    const programCount = await prisma.program.count()
    const invoiceCount = await prisma.invoice.count()
    const ticketCount = await prisma.supportTicket.count()
    const staffCount = await prisma.staff.count()
    const projectCount = await prisma.project.count()

    const totalRevenue = await prisma.payment.aggregate({
      where: { status: 'SUCCESSFUL' },
      _sum: { amount: true },
    })

    const recentLeads = await prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        source: true,
        score: true,
        status: true,
        createdAt: true,
      },
    })

    const activePrograms = await prisma.program.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        category: true,
        price: true,
        _count: { select: { enrollments: true } },
      },
    })

    return NextResponse.json({
      counts: {
        users: userCount,
        customers: customerCount,
        leads: leadCount,
        programs: programCount,
        invoices: invoiceCount,
        tickets: ticketCount,
        staff: staffCount,
        projects: projectCount,
      },
      revenue: totalRevenue._sum.amount || 0,
      recentLeads,
      activePrograms,
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
