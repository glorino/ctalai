'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  TrendingDown,
  CheckCircle2,
  Clock,
  Plus,
  Download,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn, formatCurrency } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import DataTable, { Column } from '@/components/ui/data-table'
import AIInsight from '@/components/ui/ai-insight'
import { useToast } from '@/components/ui/toast'
import PaymentModal from '@/components/ui/payment-modal'

interface Invoice {
  id: string
  invoiceNumber: string
  amount: number
  total: number
  status: string
  createdAt: string
  dueDate: string | null
  customer: { name: string; email: string | null }
}

interface FinanceData {
  invoices: Invoice[]
  stats: { status: string; _count: number; _sum: { amount: number | null } }[]
  revenue: number
  expenses: number
}

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'neutral'> = {
  PAID: 'success',
  SENT: 'warning',
  VIEWED: 'warning',
  DRAFT: 'neutral',
  PARTIALLY_PAID: 'warning',
  OVERDUE: 'error',
  CANCELLED: 'error',
}

export default function FinancePage() {
  const [data, setData] = useState<FinanceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [paymentModal, setPaymentModal] = useState<{
    open: boolean
    invoice: Invoice | null
  }>({ open: false, invoice: null })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetch('/api/finance')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const paidCount = data?.stats.find((s) => s.status === 'PAID')?._count || 0
  const pendingCount = data?.stats.find((s) => s.status === 'SENT')?._count || 0
  const overdueCount = data?.stats.find((s) => s.status === 'OVERDUE')?._count || 0

  const outstanding = (data?.invoices || [])
    .filter((i) => ['SENT', 'VIEWED', 'OVERDUE', 'PARTIALLY_PAID'].includes(i.status))
    .reduce((sum, i) => sum + i.total, 0)

  const columns: Column<Invoice>[] = [
    {
      key: 'invoiceNumber',
      label: 'Invoice',
      sortable: true,
      render: (item) => <span className="text-sm font-mono font-medium">{item.invoiceNumber}</span>,
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (item) => <span className="text-sm">{item.customer.name}</span>,
    },
    {
      key: 'total',
      label: 'Amount',
      sortable: true,
      render: (item) => <span className="text-sm font-semibold">{formatCurrency(item.total)}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => <Badge variant={statusVariant[item.status] || 'neutral'} dot>{item.status.replace('_', ' ')}</Badge>,
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (item) => <span className="text-xs text-text-muted">{new Date(item.createdAt).toLocaleDateString('en-NG')}</span>,
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      render: (item) => <span className="text-xs text-text-muted">{item.dueDate ? new Date(item.dueDate).toLocaleDateString('en-NG') : '—'}</span>,
    },
  ]

  const canPay = (status: string) => ['SENT', 'VIEWED', 'PARTIALLY_PAID', 'OVERDUE', 'DRAFT'].includes(status)

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Finance"
          description="Revenue, payments, and financial overview"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Finance' }]}
          actions={
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />} onClick={() => {
                if (!data?.invoices) return
                const csv = 'Invoice,Customer,Amount,Status,Date\n' + data.invoices.map(i => `${i.invoiceNumber},${i.customer.name},${formatCurrency(i.total)},${i.status},${new Date(i.createdAt).toLocaleDateString('en-NG')}`).join('\n')
                const blob = new Blob([csv], { type: 'text/csv' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'finance-export.csv'
                a.click()
                URL.revokeObjectURL(url)
                toast('Exported successfully', 'success')
              }}>Export</Button>
              <Button size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Create invoice form coming soon', 'info')}>Create Invoice</Button>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={loading ? '...' : formatCurrency(data?.revenue || 0)} change="+18.4%" changeType="up" icon={<DollarSign className="w-5 h-5" />} />
        <StatCard title="Paid Invoices" value={loading ? '...' : paidCount.toString()} change="+12" changeType="up" icon={<CheckCircle2 className="w-5 h-5" />} />
        <StatCard title="Outstanding" value={loading ? '...' : formatCurrency(outstanding)} change="+24%" changeType="down" icon={<Clock className="w-5 h-5" />} />
        <StatCard title="Overdue" value={loading ? '...' : overdueCount.toString()} change="-2" changeType="up" icon={<TrendingDown className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Finance Insight">
          <p>
            {loading ? 'Loading financial data...' : `Total revenue collected: ${formatCurrency(data?.revenue || 0)}. ${outstanding > 0 ? `${formatCurrency(outstanding)} in outstanding payments requires follow-up.` : 'All payments are up to date.'} ${overdueCount > 0 ? `${overdueCount} invoices are overdue.` : ''}`}
          </p>
        </AIInsight>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold">Invoices</h3>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-12 rounded-lg" />)}</div>
            ) : (
              <DataTable
                columns={columns}
                data={data?.invoices || []}
                searchable
                searchPlaceholder="Search invoices..."
                searchKey="invoiceNumber"
                actions={(item) =>
                  canPay(item.status) ? (
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() =>
                        setPaymentModal({
                          open: true,
                          invoice: item,
                        })
                      }
                    >
                      Pay
                    </Button>
                  ) : null
                }
              />
            )}
          </div>
        </Card>
      </motion.div>

      <PaymentModal
        isOpen={paymentModal.open}
        onClose={() => setPaymentModal({ open: false, invoice: null })}
        invoiceId={paymentModal.invoice?.id || ''}
        amount={paymentModal.invoice?.total || 0}
        customerEmail={paymentModal.invoice?.customer?.email || ''}
        customerName={paymentModal.invoice?.customer?.name || ''}
        invoiceNumber={paymentModal.invoice?.invoiceNumber}
      />
    </motion.div>
  )
}
