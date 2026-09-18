import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        owner: { select: { name: true } },
        _count: { select: { interactions: true, invoices: true, enrollments: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const stats = await prisma.customer.groupBy({
      by: ['status'],
      _count: true,
    })

    const typeStats = await prisma.customer.groupBy({
      by: ['customerType'],
      _count: true,
    })

    return NextResponse.json({ customers, stats, typeStats })
  } catch (error) {
    console.error('CRM API error:', error)
    return NextResponse.json({ error: 'Failed to fetch CRM data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        organisation: data.organisation,
        customerType: data.customerType || 'INDIVIDUAL',
        source: data.source,
        tags: data.tags || [],
        ownerId: data.ownerId,
      },
    })
    return NextResponse.json(customer, { status: 201 })
  } catch (error) {
    console.error('CRM create error:', error)
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}
