'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'primary' | 'neutral'> = {
  PAID: 'success',
  SENT: 'primary',
  VIEWED: 'neutral',
  OVERDUE: 'error',
  DRAFT: 'neutral',
}

export default function InvoicesPage() {
  const { toast } = useToast()
  const [invoices, setInvoices] = useState<any[]>([])
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/invoices')
      .then((res) => res.json())
      .then((d) => {
        setInvoices(d.items || d.invoices || d.data || [])
        setStats(d.stats || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Invoices" description="Invoice management and tracking" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Invoices' }]} actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Create invoice form coming soon', 'info')}>Create Invoice</Button>} />
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
              {invoices.map((inv: any) => (
                <div key={inv.number} className="px-6 py-4 flex items-center justify-between hover:bg-surface-light transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{inv.number}</p>
                      <Badge variant={statusVariant[inv.status] || 'neutral'} dot size="sm">{inv.status}</Badge>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{inv.customer} | Issued: {inv.date} | Due: {inv.dueDate}</p>
                  </div>
                  <p className="text-sm font-semibold">{inv.amount}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
