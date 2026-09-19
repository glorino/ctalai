import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [
      userCount,
      customerCount,
      leadCount,
      programCount,
      invoiceCount,
      ticketCount,
      staffCount,
      projectCount,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.customer.count(),
      prisma.lead.count(),
      prisma.program.count(),
      prisma.invoice.count(),
      prisma.supportTicket.count(),
      prisma.staff.count(),
      prisma.project.count(),
    ])

    const totalRevenue = await prisma.invoice.aggregate({
      where: { status: 'PAID' },
      _sum: { total: true },
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
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        category: true,
        price: true,
        _count: { select: { enrollments: true } },
      },
    })

    const topLeads = await prisma.lead.findMany({
      take: 5,
      orderBy: { score: 'desc' },
      where: { status: { notIn: ['WON', 'LOST', 'UNQUALIFIED'] } },
      select: {
        id: true,
        name: true,
        email: true,
        score: true,
        status: true,
        source: true,
      },
    })

    const upcomingTasks = await prisma.task.findMany({
      take: 5,
      where: { status: { in: ['TODO', 'IN_PROGRESS'] } },
      orderBy: { dueDate: 'asc' },
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        dueDate: true,
        assignedTo: { select: { name: true } },
      },
    })

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const aiAgentsRaw = await prisma.aIAgent.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        type: true,
        logs: {
          select: { status: true, createdAt: true },
        },
      },
    })

    const aiAgents = aiAgentsRaw.map((agent) => {
      const todayLogs = agent.logs.filter((log) => log.createdAt >= todayStart)
      const successCount = todayLogs.filter((log) => log.status === 'SUCCESS').length
      const totalToday = todayLogs.length
      return {
        id: agent.id,
        name: agent.name,
        type: agent.type,
        tasks: totalToday,
        success: totalToday > 0 ? Math.round((successCount / totalToday) * 1000) / 10 : 0,
      }
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
      revenue: totalRevenue._sum.total || 0,
      recentLeads,
      activePrograms,
      topLeads,
      upcomingTasks,
      aiAgents,
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
