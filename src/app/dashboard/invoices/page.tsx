'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FileText, Plus, Download } from 'lucide-react'
import { generateInvoicePDF } from '@/lib/invoice-pdf'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'
import PaymentModal from '@/components/ui/payment-modal'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'primary' | 'neutral'> = {
  PAID: 'success',
  SENT: 'primary',
  VIEWED: 'neutral',
  OVERDUE: 'error',
  DRAFT: 'neutral',
}

interface InvoiceItem {
  id: string
  number: string
  customer: string
  customerEmail: string
  customerId: string
  date: string
  dueDate: string
  amount: string
  total: number
  status: string
}

export default function InvoicesPage() {
  const { toast } = useToast()
  const [invoices, setInvoices] = useState<InvoiceItem[]>([])
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [paymentModal, setPaymentModal] = useState<{
    open: boolean
    invoice: InvoiceItem | null
  }>({ open: false, invoice: null })

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ customerId: '', amount: '', description: '', dueDate: '' })
  const [submitting, setSubmitting] = useState(false)
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([])

  const fetchData = useCallback(() => {
    fetch('/api/invoices')
      .then((res) => res.json())
      .then((d) => {
        const items = (d.items || d.invoices || d.data || []).map((inv: any) => ({
          id: inv.id,
          number: inv.invoiceNumber || inv.number,
          customer: inv.customer?.name || inv.customer || 'Unknown',
          customerEmail: inv.customer?.email || '',
          customerId: inv.customerId || '',
          date: inv.createdAt ? new Date(inv.createdAt).toLocaleDateString('en-NG') : inv.date || '',
          dueDate: inv.dueDate ? new Date(inv.dueDate).toLocaleDateString('en-NG') : inv.dueDate || '',
          amount: inv.total ? `₦${inv.total.toLocaleString()}` : inv.amount || '₦0',
          total: inv.total || 0,
          status: inv.status,
        }))
        setInvoices(items)
        setStats(d.stats || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  useEffect(() => {
    fetch('/api/crm')
      .then((res) => res.json())
      .then((data) => setCustomers((data.customers || []).map((c: any) => ({ id: c.id, name: c.name }))))
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.customerId) { toast('Customer is required', 'error'); return }
    if (!formData.amount || parseFloat(formData.amount) <= 0) { toast('Amount is required', 'error'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast('Invoice created successfully', 'success')
        setShowForm(false)
        setFormData({ customerId: '', amount: '', description: '', dueDate: '' })
        fetchData()
      } else {
        const data = await res.json()
        toast(data.error || 'Failed to create invoice', 'error')
      }
    } catch {
      toast('Failed to create invoice', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const canPay = (status: string) => ['SENT', 'VIEWED', 'DRAFT', 'OVERDUE'].includes(status)

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Invoices" description="Invoice management and tracking" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Invoices' }]} actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(true)}>Create Invoice</Button>} />
      </motion.div>
      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? [1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-24 rounded-lg" />)
          : stats.map((stat: any) => (
              <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<FileText className="w-5 h-5" />} />
            ))
        }
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold">All Invoices</h3>
          </div>
          {loading ? (
            <div className="p-6 space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="divide-y divide-border-light">
              {invoices.map((inv) => (
                <div key={inv.id || inv.number} className="px-6 py-4 flex items-center justify-between hover:bg-surface-light transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{inv.number}</p>
                      <Badge variant={statusVariant[inv.status] || 'neutral'} dot size="sm">{inv.status}</Badge>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{inv.customer} | Issued: {inv.date} | Due: {inv.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold">{inv.amount}</p>
                    <Button
                      size="xs"
                      variant="ghost"
                      leftIcon={<Download className="w-3 h-3" />}
                      onClick={() =>
                        generateInvoicePDF({
                          invoiceNumber: inv.number,
                          customerName: inv.customer,
                          customerEmail: inv.customerEmail,
                          amount: inv.total,
                          description: 'Programme Fee',
                          dueDate: inv.dueDate,
                          status: inv.status,
                        })
                      }
                    >
                      Download
                    </Button>
                    {canPay(inv.status) && (
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => setPaymentModal({ open: true, invoice: inv })}
                      >
                        Pay
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      <PaymentModal
        isOpen={paymentModal.open}
        onClose={() => setPaymentModal({ open: false, invoice: null })}
        invoiceId={paymentModal.invoice?.id || ''}
        amount={paymentModal.invoice?.total || 0}
        customerEmail={paymentModal.invoice?.customerEmail || ''}
        customerName={paymentModal.invoice?.customer || ''}
        invoiceNumber={paymentModal.invoice?.number}
      />

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Create Invoice</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Select label="Customer" value={formData.customerId} onChange={(e) => setFormData({ ...formData, customerId: e.target.value })} placeholder="Select customer" options={customers.map((c) => ({ value: c.id, label: c.name }))} />
              <Input label="Amount" type="number" required value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="0.00" />
              <Input label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Invoice description" />
              <Input label="Due Date" type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" isLoading={submitting}>Create</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  )
}
