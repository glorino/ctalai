import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const reference = searchParams.get('reference')

    if (!reference) {
      return NextResponse.json({ error: 'Reference is required' }, { status: 400 })
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: 'Paystack not configured' }, { status: 500 })
    }

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    })

    const data = await response.json()

    if (!data.status) {
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 })
    }

    const transaction = data.data

    // Update payment record
    if (transaction.status === 'success') {
      const payment = await prisma.payment.findFirst({
        where: { reference },
      })

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: 'SUCCESSFUL',
            paidAt: new Date(transaction.created_at),
          },
        })

        // Update invoice status
        await prisma.invoice.update({
          where: { id: payment.invoiceId },
          data: {
            status: 'PAID',
            paidAt: new Date(transaction.created_at),
          },
        })
      }
    }

    return NextResponse.json({
      status: transaction.status,
      amount: transaction.amount / 100,
      reference: transaction.reference,
      paid_at: transaction.created_at,
    })
  } catch (error) {
    console.error('Paystack verify error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
