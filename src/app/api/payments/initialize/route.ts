import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email, amount, invoiceId, customerId } = await request.json()

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Paystack is not configured. Please add PAYSTACK_SECRET_KEY to your environment variables.' },
        { status: 500 }
      )
    }

    const paystackAmount = Math.round(amount * 100) // Convert to kobo

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: paystackAmount,
        currency: 'NGN',
        metadata: {
          invoiceId,
          customerId,
          platform: 'ctal-ai',
        },
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/finance?payment=callback`,
      }),
    })

    const data = await response.json()

    if (!data.status) {
      return NextResponse.json(
        { error: data.message || 'Failed to initialize payment' },
        { status: 400 }
      )
    }

    // Create payment record
    if (invoiceId) {
      await prisma.payment.create({
        data: {
          invoiceId,
          amount,
          method: 'PAYSTACK',
          reference: data.data.reference,
          status: 'PENDING',
        },
      })
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference,
    })
  } catch (error) {
    console.error('Paystack initialize error:', error)
    return NextResponse.json(
      { error: 'Failed to initialize payment' },
      { status: 500 }
    )
  }
}
