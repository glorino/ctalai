'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  FileText,
  Send,
  CreditCard,
  Wallet,
  Plus,
  Filter,
  ChevronDown,
  Eye,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Banknote,
  PieChart,
  BarChart3,
} from 'lucide-react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Invoice {
  id: string
  client: string
  email: string
  amount: number
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft'
  dueDate: string
  createdDate: string
  items: number
}

interface Payment {
  id: string
  invoiceId: string
  client: string
  amount: number
  method: 'Bank Transfer' | 'Card' | 'Cash' | 'Online'
  date: string
  reference: string
}

interface Expense {
  id: string
  category: string
  description: string
  amount: number
  date: string
  status: 'Approved' | 'Pending' | 'Rejected'
}

const sampleInvoices: Invoice[] = [
  {
    id: 'INV-2026-001',
    client: 'TechCorp Nigeria',
    email: 'accounts@techcorp.ng',
    amount: 2500000,
    status: 'Paid',
    dueDate: '2026-08-15',
    createdDate: '2026-08-01',
    items: 4,
  },
  {
    id: 'INV-2026-002',
    client: 'GreenLeaf Solutions',
    email: 'finance@greenleaf.com',
    amount: 1750000,
    status: 'Pending',
    dueDate: '2026-09-20',
    createdDate: '2026-09-01',
    items: 3,
  },
  {
    id: 'INV-2026-003',
    client: 'Atlas Enterprises',
    email: 'billing@atlas.co',
    amount: 3200000,
    status: 'Overdue',
    dueDate: '2026-08-30',
    createdDate: '2026-08-15',
    items: 5,
  },
  {
    id: 'INV-2026-004',
    client: 'Sunrise Holdings',
    email: 'pay@sunrise.ng',
    amount: 890000,
    status: 'Paid',
    dueDate: '2026-09-05',
    createdDate: '2026-08-20',
    items: 2,
  },
  {
    id: 'INV-2026-005',
    client: 'Velocity Digital',
    email: 'ap@velocity.io',
    amount: 4100000,
    status: 'Draft',
    dueDate: '2026-09-30',
    createdDate: '2026-09-07',
    items: 6,
  },
  {
    id: 'INV-2026-006',
    client: 'Prime Logistics',
    email: 'accounts@primelog.ng',
    amount: 1350000,
    status: 'Pending',
    dueDate: '2026-09-25',
    createdDate: '2026-09-05',
    items: 3,
  },
  {
    id: 'INV-2026-007',
    client: 'Nova Tech Labs',
    email: 'finance@novatech.com',
    amount: 5600000,
    status: 'Paid',
    dueDate: '2026-08-25',
    createdDate: '2026-08-10',
    items: 8,
  },
  {
    id: 'INV-2026-008',
    client: 'ClearView Consulting',
    email: 'billing@clearview.ng',
    amount: 720000,
    status: 'Overdue',
    dueDate: '2026-08-20',
    createdDate: '2026-08-05',
    items: 2,
  },
]

const samplePayments: Payment[] = [
  {
    id: 'PAY-001',
    invoiceId: 'INV-2026-001',
    client: 'TechCorp Nigeria',
    amount: 2500000,
    method: 'Bank Transfer',
    date: '2026-08-14',
    reference: 'TXN-20260814-001',
  },
  {
    id: 'PAY-002',
    invoiceId: 'INV-2026-004',
    client: 'Sunrise Holdings',
    amount: 890000,
    method: 'Card',
    date: '2026-09-04',
    reference: 'TXN-20260904-002',
  },
  {
    id: 'PAY-003',
    invoiceId: 'INV-2026-007',
    client: 'Nova Tech Labs',
    amount: 5600000,
    method: 'Bank Transfer',
    date: '2026-08-24',
    reference: 'TXN-20260824-003',
  },
  {
    id: 'PAY-004',
    invoiceId: 'INV-2026-002',
    client: 'GreenLeaf Solutions',
    amount: 875000,
    method: 'Online',
    date: '2026-09-07',
    reference: 'TXN-20260907-004',
  },
  {
    id: 'PAY-005',
    invoiceId: 'INV-2026-006',
    client: 'Prime Logistics',
    amount: 450000,
    method: 'Cash',
    date: '2026-09-06',
    reference: 'TXN-20260906-005',
  },
]

const sampleExpenses: Expense[] = [
  {
    id: 'EXP-001',
    category: 'Operations',
    description: 'Office rent - September',
    amount: 450000,
    date: '2026-09-01',
    status: 'Approved',
  },
  {
    id: 'EXP-002',
    category: 'Marketing',
    description: 'Social media ads campaign',
    amount: 280000,
    date: '2026-09-03',
    status: 'Approved',
  },
  {
    id: 'EXP-003',
    category: 'Technology',
    description: 'Cloud hosting fees',
    amount: 175000,
    date: '2026-09-05',
    status: 'Pending',
  },
  {
    id: 'EXP-004',
    category: 'Personnel',
    description: 'Freelancer payment',
    amount: 320000,
    date: '2026-09-06',
    status: 'Approved',
  },
  {
    id: 'EXP-005',
    category: 'Travel',
    description: 'Client meeting transport',
    amount: 45000,
    date: '2026-09-07',
    status: 'Rejected',
  },
]

const monthlyRevenue = [
  { month: 'Apr', value: 4200000 },
  { month: 'May', value: 5800000 },
  { month: 'Jun', value: 3900000 },
  { month: 'Jul', value: 7200000 },
  { month: 'Aug', value: 8100000 },
  { month: 'Sep', value: 6500000 },
]

const statusColors: Record<string, string> = {
  Paid: 'bg-success/20 text-success',
  Pending: 'bg-warning/20 text-warning',
  Overdue: 'bg-error/20 text-error',
  Draft: 'bg-surface-light text-text-muted',
  Approved: 'bg-success/20 text-success',
  Rejected: 'bg-error/20 text-error',
}

const methodColors: Record<string, string> = {
  'Bank Transfer': 'bg-primary/10 text-primary',
  Card: 'bg-secondary/10 text-secondary',
  Cash: 'bg-success/10 text-success',
  Online: 'bg-warning/10 text-warning',
}

const alertData = [
  {
    id: 1,
    type: 'warning' as const,
    message: '2 invoices are overdue — ₦3,920,000 total',
    action: 'View Invoices',
  },
  {
    id: 2,
    type: 'info' as const,
    message: 'Cash flow projection: ₦2.1M deficit by month end',
    action: 'View Forecast',
  },
  {
    id: 3,
    type: 'success' as const,
    message: 'Revenue target 82% achieved — ₦6.5M of ₦8M',
    action: 'View Details',
  },
]

export default function FinancePage() {
  const [invoiceFilter, setInvoiceFilter] = useState<string>('All')
  const [showFilters, setShowFilters] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const totalRevenue = 8100000
  const pendingPayments = 2625000
  const overdueAmount = 3920000
  const totalExpenses = 1270000

  const stats = [
    {
      title: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      change: '+18.2%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'primary',
    },
    {
      title: 'Pending Payments',
      value: formatCurrency(pendingPayments),
      change: '+5.4%',
      trend: 'up' as const,
      icon: Clock,
      color: 'warning',
    },
    {
      title: 'Overdue Invoices',
      value: formatCurrency(overdueAmount),
      change: '-12.1%',
      trend: 'down' as const,
      icon: AlertTriangle,
      color: 'error',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      change: '+3.7%',
      trend: 'up' as const,
      icon: Receipt,
      color: 'secondary',
    },
  ]

  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value))

  const filteredInvoices = sampleInvoices.filter(
    (inv) => invoiceFilter === 'All' || inv.status === invoiceFilter
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
            Finance & Payment Administration
          </h1>
          <p className="text-text-muted">
            Manage invoices, track payments, and monitor your financial health.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Cash Flow Alerts */}
      <div className="space-y-2">
        {alertData.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              'flex items-center justify-between p-3 rounded-xl border',
              alert.type === 'warning' && 'bg-warning/5 border-warning/20',
              alert.type === 'info' && 'bg-primary/5 border-primary/20',
              alert.type === 'success' && 'bg-success/5 border-success/20'
            )}
          >
            <div className="flex items-center gap-3">
              {alert.type === 'warning' && (
                <AlertTriangle className="w-4 h-4 text-warning" />
              )}
              {alert.type === 'info' && (
                <AlertTriangle className="w-4 h-4 text-primary" />
              )}
              {alert.type === 'success' && (
                <TrendingUp className="w-4 h-4 text-success" />
              )}
              <span className="text-sm">{alert.message}</span>
            </div>
            <button className="text-xs text-primary hover:text-primary-light transition-colors font-medium">
              {alert.action}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-muted text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-success" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-error" />
                    )}
                    <span
                      className={`text-sm ${
                        stat.trend === 'up' ? 'text-success' : 'text-error'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-text-muted text-sm">vs last month</span>
                  </div>
                </div>
                <div
                  className={cn(
                    'p-3 rounded-xl',
                    stat.color === 'primary' && 'bg-primary/10',
                    stat.color === 'warning' && 'bg-warning/10',
                    stat.color === 'error' && 'bg-error/10',
                    stat.color === 'secondary' && 'bg-secondary/10'
                  )}
                >
                  <stat.icon
                    className={cn(
                      'w-6 h-6',
                      stat.color === 'primary' && 'text-primary',
                      stat.color === 'warning' && 'text-warning',
                      stat.color === 'error' && 'text-error',
                      stat.color === 'secondary' && 'text-secondary'
                    )}
                  />
                </div>
              </div>
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 h-1',
                  stat.color === 'primary' &&
                    'bg-gradient-to-r from-primary to-primary-light',
                  stat.color === 'warning' &&
                    'bg-gradient-to-r from-warning to-amber-400',
                  stat.color === 'error' &&
                    'bg-gradient-to-r from-error to-red-400',
                  stat.color === 'secondary' &&
                    'bg-gradient-to-r from-secondary to-secondary-light'
                )}
              />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Revenue Overview
              </h2>
              <span className="text-sm text-text-muted">Last 6 months</span>
            </div>
            <div className="flex items-end gap-3 h-48">
              {monthlyRevenue.map((item, index) => (
                <motion.div
                  key={item.month}
                  className="flex-1 flex flex-col items-center gap-2"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  style={{ transformOrigin: 'bottom' }}
                >
                  <span className="text-xs text-text-muted">
                    {(item.value / 1000000).toFixed(1)}M
                  </span>
                  <div
                    className={cn(
                      'w-full rounded-t-lg transition-all duration-500',
                      index === monthlyRevenue.length - 1
                        ? 'bg-gradient-to-t from-primary to-primary-light'
                        : 'bg-gradient-to-t from-primary/60 to-primary/30'
                    )}
                    style={{
                      height: `${(item.value / maxRevenue) * 100}%`,
                    }}
                  />
                  <span className="text-xs text-text-muted">{item.month}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="h-full">
            <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {[
                {
                  label: 'Create Invoice',
                  icon: FileText,
                  color: 'text-primary',
                  bg: 'bg-primary/10',
                },
                {
                  label: 'Record Payment',
                  icon: CreditCard,
                  color: 'text-success',
                  bg: 'bg-success/10',
                },
                {
                  label: 'Add Expense',
                  icon: Wallet,
                  color: 'text-secondary',
                  bg: 'bg-secondary/10',
                },
                {
                  label: 'Send Reminder',
                  icon: Send,
                  color: 'text-warning',
                  bg: 'bg-warning/10',
                },
                {
                  label: 'Generate Report',
                  icon: PieChart,
                  color: 'text-primary',
                  bg: 'bg-primary/10',
                },
              ].map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-light hover:bg-primary/10 transition-all duration-200 group text-left"
                >
                  <div className={cn('p-2 rounded-lg', action.bg)}>
                    <action.icon className={cn('w-4 h-4', action.color)} />
                  </div>
                  <span className="text-sm text-text-muted group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Invoices Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Invoices
          </h2>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(showFilters && 'bg-primary/10 text-primary')}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
              <ChevronDown
                className={cn(
                  'w-4 h-4 ml-2 transition-transform',
                  showFilters && 'rotate-180'
                )}
              />
            </Button>
          </div>
        </div>

        {/* Filter Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-4"
            >
              <div className="flex flex-wrap gap-2">
                {['All', 'Paid', 'Pending', 'Overdue', 'Draft'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setInvoiceFilter(status)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      invoiceFilter === status
                        ? 'bg-primary text-white'
                        : 'bg-surface-light text-text-muted hover:text-white'
                    )}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Invoice Table */}
        <Card hover={false}>
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-3 text-sm text-text-muted border-b border-white/5">
            <div className="col-span-2">Invoice</div>
            <div className="col-span-3">Client</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-1">Action</div>
          </div>

          {/* Invoice Rows */}
          <AnimatePresence mode="popLayout">
            {filteredInvoices.map((invoice, index) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                layout
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center px-4 py-4 border-b border-white/5 last:border-0 hover:bg-surface-light/50 transition-colors"
              >
                {/* Invoice ID */}
                <div className="lg:col-span-2">
                  <p className="font-medium text-sm">{invoice.id}</p>
                  <p className="text-xs text-text-muted lg:hidden">{invoice.client}</p>
                </div>

                {/* Client */}
                <div className="lg:col-span-3 hidden lg:block">
                  <p className="font-medium text-sm">{invoice.client}</p>
                  <p className="text-xs text-text-muted">{invoice.email}</p>
                </div>

                {/* Amount */}
                <div className="lg:col-span-2">
                  <p className="font-semibold">{formatCurrency(invoice.amount)}</p>
                </div>

                {/* Status */}
                <div className="lg:col-span-2">
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      statusColors[invoice.status]
                    )}
                  >
                    {invoice.status}
                  </span>
                </div>

                {/* Due Date */}
                <div className="lg:col-span-2">
                  <p className="text-sm">{invoice.dueDate}</p>
                </div>

                {/* Action */}
                <div className="lg:col-span-1">
                  <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                    <Eye className="w-4 h-4 text-text-muted hover:text-primary" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-muted">No invoices found for this filter.</p>
            </div>
          )}
        </Card>
      </div>

      {/* Payment History + Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment History */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Banknote className="w-5 h-5 text-success" />
              Payment History
            </h2>
            <button className="text-sm text-primary hover:text-primary-light transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {samplePayments.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-surface-light"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'p-2 rounded-lg',
                      payment.method === 'Bank Transfer'
                        ? 'bg-primary/10'
                        : payment.method === 'Card'
                        ? 'bg-secondary/10'
                        : payment.method === 'Cash'
                        ? 'bg-success/10'
                        : 'bg-warning/10'
                    )}
                  >
                    {payment.method === 'Bank Transfer' && (
                      <DollarSign className="w-4 h-4 text-primary" />
                    )}
                    {payment.method === 'Card' && (
                      <CreditCard className="w-4 h-4 text-secondary" />
                    )}
                    {payment.method === 'Cash' && (
                      <Banknote className="w-4 h-4 text-success" />
                    )}
                    {payment.method === 'Online' && (
                      <Send className="w-4 h-4 text-warning" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{payment.client}</p>
                    <p className="text-xs text-text-muted">{payment.reference}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-success">
                    +{formatCurrency(payment.amount)}
                  </p>
                  <p className="text-xs text-text-muted">{payment.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Expenses */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Receipt className="w-5 h-5 text-secondary" />
              Recent Expenses
            </h2>
            <Button variant="ghost" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          <div className="space-y-3">
            {sampleExpenses.map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-surface-light"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-error/10">
                    <TrendingDown className="w-4 h-4 text-error" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{expense.description}</p>
                    <p className="text-xs text-text-muted">
                      {expense.category} &middot; {expense.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-error">
                    -{formatCurrency(expense.amount)}
                  </p>
                  <span
                    className={cn(
                      'text-xs px-2 py-0.5 rounded-full',
                      statusColors[expense.status]
                    )}
                  >
                    {expense.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Net Profit</p>
              <p className="text-xl font-bold">
                {formatCurrency(totalRevenue - totalExpenses)}
              </p>
              <p className="text-xs text-success mt-1">+22.4% from last month</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-success/10">
              <Wallet className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Collection Rate</p>
              <p className="text-xl font-bold">87.3%</p>
              <p className="text-xs text-success mt-1">+4.1% improvement</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-warning/10">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Avg. Payment Time</p>
              <p className="text-xl font-bold">12 days</p>
              <p className="text-xs text-success mt-1">-2 days faster</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
