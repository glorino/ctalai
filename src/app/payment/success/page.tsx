'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowLeft, Receipt } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'

function SuccessContent() {
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference')
  const [amount, setAmount] = useState<number | null>(null)

  useEffect(() => {
    if (reference) {
      fetch(`/api/payments/verify?reference=${reference}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.amount) setAmount(data.amount)
        })
        .catch(() => {})
    }
  }, [reference])

  return (
    <div className="min-h-screen bg-surface-light flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="max-w-md w-full"
      >
        <Card className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto"
          >
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p className="text-sm text-text-muted">
              Thank you for your payment. Your transaction has been processed successfully.
            </p>
          </div>

          {(amount !== null || reference) && (
            <div className="bg-surface-light rounded-xl p-4 space-y-3 border border-border-light">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Receipt className="w-4 h-4 text-text-muted" />
                <span className="text-xs font-medium text-text-muted uppercase">Payment Details</span>
              </div>
              {amount !== null && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Amount Paid</span>
                  <span className="font-bold text-primary text-lg">{formatCurrency(amount)}</span>
                </div>
              )}
              {reference && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Reference</span>
                  <span className="font-mono text-xs">{reference}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Date</span>
                <span className="text-xs">{new Date().toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface-light flex items-center justify-center">
          <Card className="max-w-md w-full text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-bold">Loading...</h1>
          </Card>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
