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

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const invoiceCount = await prisma.invoice.count()
    const invoiceNumber = `INV-${String(invoiceCount + 1).padStart(4, '0')}`
    const amount = parseFloat(data.amount) || 0
    const tax = parseFloat(data.tax) || 0
    const discount = parseFloat(data.discount) || 0
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        customerId: data.customerId,
        amount,
        tax,
        discount,
        total: amount + tax - discount,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        notes: data.description,
        status: 'DRAFT',
      },
    })
    return NextResponse.json(invoice, { status: 201 })
  } catch (error) {
    console.error('Invoice create error:', error)
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 })
  }
}
