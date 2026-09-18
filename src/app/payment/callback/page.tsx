'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Loader2, ArrowLeft } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'

interface PaymentResult {
  status: string
  amount: number
  reference: string
  paid_at: string
}

function CallbackContent() {
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference')
  const [result, setResult] = useState<PaymentResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!reference) {
      setError('No payment reference found')
      setLoading(false)
      return
    }

    fetch(`/api/payments/verify?reference=${reference}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setResult(data)
        }
      })
      .catch(() => setError('Failed to verify payment'))
      .finally(() => setLoading(false))
  }, [reference])

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-light flex items-center justify-center">
        <Card className="max-w-md w-full text-center space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <h1 className="text-xl font-bold">Verifying Payment</h1>
          <p className="text-sm text-text-muted">Please wait while we confirm your payment...</p>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-light flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-xl font-bold">Payment Failed</h1>
            <p className="text-sm text-text-muted">{error}</p>
            {reference && (
              <p className="text-xs text-text-muted font-mono">Reference: {reference}</p>
            )}
            <div className="flex gap-3 pt-2">
              <Link href="/dashboard/finance" className="flex-1">
                <Button variant="outline" className="w-full" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back to Finance
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-light flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Card className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-xl font-bold">Payment Successful</h1>
          <p className="text-sm text-text-muted">Your payment has been confirmed.</p>
          <div className="bg-surface-light rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Amount</span>
              <span className="font-semibold">{formatCurrency(result?.amount || 0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Reference</span>
              <span className="font-mono text-xs">{result?.reference}</span>
            </div>
            {result?.paid_at && (
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Paid At</span>
                <span className="text-xs">{new Date(result.paid_at).toLocaleString('en-NG')}</span>
              </div>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <Link href="/dashboard/finance" className="flex-1">
              <Button variant="outline" className="w-full" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back to Finance
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface-light flex items-center justify-center">
          <Card className="max-w-md w-full text-center space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
            <h1 className="text-xl font-bold">Loading...</h1>
          </Card>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  )
}
