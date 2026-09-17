'use client'

import { motion } from 'framer-motion'
import { FileText, Plus, Download, Send } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Badge from '@/components/ui/badge'

const invoices = [
  { number: 'CTAL-2508-0042', customer: 'Adebayo Ogundimu', amount: '₦125,000', status: 'PAID', date: '12 Aug 2025', dueDate: '26 Aug 2025' },
  { number: 'CTAL-2508-0041', customer: 'TechStart Nigeria', amount: '₦450,000', status: 'SENT', date: '11 Aug 2025', dueDate: '25 Aug 2025' },
  { number: 'CTAL-2508-0040', customer: 'Lagos Business School', amount: '₦320,000', status: 'OVERDUE', date: '1 Aug 2025', dueDate: '15 Aug 2025' },
  { number: 'CTAL-2507-0039', customer: 'Green Energy Co', amount: '₦180,000', status: 'PAID', date: '28 Jul 2025', dueDate: '11 Aug 2025' },
]

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'primary' | 'neutral'> = {
  PAID: 'success',
  SENT: 'primary',
  VIEWED: 'neutral',
  OVERDUE: 'error',
  DRAFT: 'neutral',
}

const stats = [
  { title: 'Total Invoiced', value: '₦24.8M', change: '+18%', changeType: 'up' as const, icon: FileText },
  { title: 'Paid', value: '₦21.2M', change: '+15%', changeType: 'up' as const, icon: FileText },
  { title: 'Outstanding', value: '₦3.6M', change: '+24%', changeType: 'down' as const, icon: FileText },
  { title: 'Overdue', value: '₦1.2M', change: '+2', changeType: 'down' as const, icon: FileText },
]

export default function InvoicesPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Invoices" description="Invoice management and tracking" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Invoices' }]} actions={<Button leftIcon={<Plus className="w-4 h-4" />}>Create Invoice</Button>} />
      </motion.div>
      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<stat.icon className="w-5 h-5" />} />
        ))}
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold">All Invoices</h3>
          </div>
          <div className="divide-y divide-border-light">
            {invoices.map((inv) => (
              <div key={inv.number} className="px-6 py-4 flex items-center justify-between hover:bg-surface-light transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{inv.number}</p>
                    <Badge variant={statusVariant[inv.status]} dot size="sm">{inv.status}</Badge>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">{inv.customer} | Issued: {inv.date} | Due: {inv.dueDate}</p>
                </div>
                <p className="text-sm font-semibold">{inv.amount}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
