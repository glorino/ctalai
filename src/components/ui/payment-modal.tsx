'use client'

import { useState } from 'react'
import { CreditCard, ExternalLink } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import Modal from '@/components/ui/modal'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  invoiceId: string
  amount: number
  customerEmail: string
  customerName: string
  invoiceNumber?: string
}

export default function PaymentModal({
  isOpen,
  onClose,
  invoiceId,
  amount,
  customerEmail,
  customerName,
  invoiceNumber,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const initializePayment = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customerEmail,
          amount: amount,
          invoiceId: invoiceId,
        }),
      })
      const data = await res.json()
      if (data.authorization_url) {
        window.location.href = data.authorization_url
      } else {
        toast(data.error || 'Payment initialization failed', 'error')
      }
    } catch {
      toast('Payment initialization failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Make Payment"
      description="Pay securely via Paystack"
      size="sm"
    >
      <div className="space-y-4">
        <Card className="bg-surface-light border border-border-light">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Invoice</span>
              <span className="text-sm font-medium">{invoiceNumber || invoiceId.slice(0, 8)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Customer</span>
              <span className="text-sm font-medium">{customerName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Email</span>
              <span className="text-sm font-medium">{customerEmail}</span>
            </div>
            <div className="border-t border-border-light pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Amount</span>
                <span className="text-lg font-bold text-primary">{formatCurrency(amount)}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-center gap-2 px-1">
          <CreditCard className="w-4 h-4 text-text-muted" />
          <p className="text-xs text-text-muted">
            You will be redirected to Paystack to complete payment securely.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={initializePayment}
            isLoading={loading}
            rightIcon={!loading ? <ExternalLink className="w-4 h-4" /> : undefined}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </Modal>
  )
}
