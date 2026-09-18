import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        owner: { select: { name: true } },
        enrollments: {
          include: {
            program: { select: { name: true } },
            cohort: { select: { name: true } },
          },
        },
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        interactions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: { select: { interactions: true, invoices: true, enrollments: true, supportTickets: true } },
      },
    })

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    return NextResponse.json(customer)
  } catch (error) {
    console.error('CRM detail error:', error)
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 })
  }
}
