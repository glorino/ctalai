'use client'

import { motion } from 'framer-motion'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  FileText,
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  Download,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import DataTable, { Column } from '@/components/ui/data-table'
import Dropdown from '@/components/ui/dropdown'
import AIInsight from '@/components/ui/ai-insight'
import Progress from '@/components/ui/progress'

const stats = [
  { title: 'Revenue', value: '₦24.8M', change: '+18.4%', changeType: 'up' as const, icon: DollarSign },
  { title: 'Collected', value: '₦21.2M', change: '+15.2%', changeType: 'up' as const, icon: CheckCircle2 },
  { title: 'Outstanding', value: '₦3.6M', change: '+24%', changeType: 'down' as const, icon: Clock },
  { title: 'Expenses', value: '₦8.4M', change: '+5.1%', changeType: 'down' as const, icon: TrendingDown },
]

const payments = [
  { id: '1', customer: 'Adebayo Ogundimu', programme: 'Advanced Valuation', amount: '₦125,000', status: 'SUCCESSFUL', date: '12 Aug 2025', reference: 'PAY-2025-0842' },
  { id: '2', customer: 'TechStart Nigeria', programme: 'Corporate Training', amount: '₦450,000', status: 'SUCCESSFUL', date: '11 Aug 2025', reference: 'PAY-2025-0841' },
  { id: '3', customer: 'Lagos Business School', programme: 'Leadership Academy', amount: '₦320,000', status: 'PENDING', date: '10 Aug 2025', reference: 'PAY-2025-0840' },
  { id: '4', customer: 'Green Energy Co', programme: 'Digital Marketing', amount: '₦180,000', status: 'SUCCESSFUL', date: '9 Aug 2025', reference: 'PAY-2025-0839' },
  { id: '5', customer: 'Ibrahim Musa', programme: 'Advanced Valuation', amount: '₦125,000', status: 'FAILED', date: '8 Aug 2025', reference: 'PAY-2025-0838' },
  { id: '6', customer: 'Blessing Okoro', programme: 'Leadership Academy', amount: '₦85,000', status: 'SUCCESSFUL', date: '7 Aug 2025', reference: 'PAY-2025-0837' },
  { id: '7', customer: 'FinEdge Solutions', programme: 'Digital Marketing', amount: '₦180,000', status: 'PENDING', date: '6 Aug 2025', reference: 'PAY-2025-0836' },
]

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'neutral'> = {
  SUCCESSFUL: 'success',
  PENDING: 'warning',
  FAILED: 'error',
  REFUNDED: 'neutral',
}

const revenueByProgramme = [
  { name: 'Advanced Valuation', revenue: '₦8.2M', pct: 33 },
  { name: 'Digital Marketing', revenue: '₦6.4M', pct: 26 },
  { name: 'Leadership Academy', revenue: '₦5.1M', pct: 21 },
  { name: 'Corporate Training', revenue: '₦3.8M', pct: 15 },
  { name: 'Others', revenue: '₦1.3M', pct: 5 },
]

export default function FinancePage() {
  const columns: Column<typeof payments[0]>[] = [
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
      render: (item) => <span className="text-sm font-medium">{item.customer}</span>,
    },
    {
      key: 'programme',
      label: 'Programme',
      render: (item) => <span className="text-sm text-text-secondary">{item.programme}</span>,
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (item) => <span className="text-sm font-semibold">{item.amount}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => <Badge variant={statusVariant[item.status]} dot>{item.status}</Badge>,
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (item) => <span className="text-xs text-text-muted">{item.date}</span>,
    },
    {
      key: 'reference',
      label: 'Reference',
      render: (item) => <span className="text-xs text-text-muted font-mono">{item.reference}</span>,
    },
  ]

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Finance"
          description="Revenue, payments, and financial overview"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Finance' }]}
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
              <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>Create Invoice</Button>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<stat.icon className="w-5 h-5" />} />
        ))}
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Finance Insight">
          <p>Revenue is up 18.4% this month. ₦3.6M in outstanding payments requires follow-up. 2 invoices are overdue. Recommend automated payment reminders for pending invoices.</p>
        </AIInsight>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <Card padding="md">
            <h3 className="text-sm font-semibold mb-4">Revenue by Programme</h3>
            <div className="space-y-3">
              {revenueByProgramme.map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <span className="text-sm text-text-secondary w-40 shrink-0">{item.name}</span>
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-surface-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold w-20 text-right">{item.revenue}</span>
                  <span className="text-xs text-text-muted w-10 text-right">{item.pct}%</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card padding="md">
            <h3 className="text-sm font-semibold mb-4">Payment Status</h3>
            <div className="space-y-3">
              {[
                { label: 'Successful', count: 142, amount: '₦21.2M', color: 'bg-emerald-500' },
                { label: 'Pending', count: 8, amount: '₦1.8M', color: 'bg-amber-500' },
                { label: 'Failed', count: 3, amount: '₦420K', color: 'bg-red-500' },
                { label: 'Refunded', count: 2, amount: '₦180K', color: 'bg-gray-400' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-2.5 h-2.5 rounded-full', item.color)} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{item.amount}</p>
                    <p className="text-xs text-text-muted">{item.count} payments</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold">Recent Payments</h3>
          </div>
          <div className="p-6">
            <DataTable columns={columns} data={payments} searchable searchPlaceholder="Search payments..." searchKey="customer" />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
