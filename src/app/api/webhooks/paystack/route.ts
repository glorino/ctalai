import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-paystack-signature')

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: 'Paystack not configured' }, { status: 500 })
    }

    // Verify webhook signature
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(body)
      .digest('hex')

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)

    if (event.event === 'charge.success') {
      const transaction = event.data
      const reference = transaction.reference

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

        await prisma.invoice.update({
          where: { id: payment.invoiceId },
          data: {
            status: 'PAID',
            paidAt: new Date(transaction.created_at),
          },
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Paystack webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
