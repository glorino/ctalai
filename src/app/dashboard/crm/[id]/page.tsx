'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  GraduationCap,
  MoreHorizontal,
  CreditCard,
} from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn, formatCurrency } from '@/lib/utils'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import Card from '@/components/ui/card'
import Tabs from '@/components/ui/tabs'
import ActivityFeed from '@/components/ui/activity-feed'
import Dropdown from '@/components/ui/dropdown'
import { useToast } from '@/components/ui/toast'

interface CustomerData {
  id: string
  name: string
  email: string | null
  phone: string | null
  customerType: string
  status: string
  organisation: string | null
  source: string | null
  tags: string[]
  createdAt: string
  owner: { name: string } | null
  enrollments: Array<{
    id: string
    status: string
    progress: number
    programme: { name: string }
    cohort: { name: string } | null
  }>
  invoices: Array<{
    id: string
    invoiceNumber: string
    amount: number
    status: string
    createdAt: string
  }>
  interactions: Array<{
    id: string
    type: string
    description: string | null
    createdAt: string
  }>
  _count: { interactions: number; invoices: number; enrollments: number; supportTickets: number }
}

export default function CustomerDetailPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [customer, setCustomer] = useState<CustomerData | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    fetch(`/api/crm/${id}`)
      .then((res) => res.json())
      .then(setCustomer)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-32 rounded" />
        <div className="skeleton h-40 rounded-2xl" />
        <div className="skeleton h-60 rounded-2xl" />
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">Customer not found</p>
        <Link href="/dashboard/crm" className="text-primary text-sm mt-2 inline-block">Back to CRM</Link>
      </div>
    )
  }

  const totalInvoiceAmount = customer.invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const paidInvoices = customer.invoices.filter(inv => inv.status === 'PAID').length

  const activities = customer.interactions.map((i) => ({
    id: i.id,
    message: i.description || i.type,
    time: new Date(i.createdAt).toLocaleDateString('en-NG'),
    type: 'default' as const,
  }))

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <Link href="/dashboard/crm" className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to CRM
        </Link>
      </motion.div>

      <motion.div variants={staggerItem}>
        <div className="card bg-surface border border-border rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <Avatar name={customer.name} size="xl" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{customer.name}</h1>
                  <Badge variant="success" dot>{customer.status}</Badge>
                </div>
                <p className="text-sm text-text-muted mt-0.5">{customer.organisation || 'N/A'} • {customer.customerType}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
                  {customer.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{customer.email}</span>}
                  {customer.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{customer.phone}</span>}
                </div>
                {customer.tags.length > 0 && (
                  <div className="flex items-center gap-2 mt-3">
                    {customer.tags.map((tag) => (
                      <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {customer.email && <Button variant="outline" size="sm" leftIcon={<Mail className="w-4 h-4" />} onClick={() => window.open(`mailto:${customer.email}`)}>Email</Button>}
              {customer.phone && <Button variant="outline" size="sm" leftIcon={<Phone className="w-4 h-4" />} onClick={() => window.open(`tel:${customer.phone}`)}>Call</Button>}
              {customer.phone && <Button variant="outline" size="sm" leftIcon={<MessageSquare className="w-4 h-4" />} onClick={() => window.open(`https://wa.me/${(customer.phone as string).replace(/\D/g, '')}`, '_blank')}>WhatsApp</Button>}
              <Dropdown
                trigger={<button className="p-2 rounded-lg border border-border text-text-muted hover:bg-surface-light"><MoreHorizontal className="w-4 h-4" /></button>}
                items={[
                  { label: 'Create Task', onClick: () => toast('Task creation coming soon', 'info') },
                  { label: 'Schedule Meeting', onClick: () => toast('Meeting scheduler coming soon', 'info') },
                  { label: 'Add Note', onClick: () => toast('Note added', 'success') },
                ]}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={staggerItem}>
            <Tabs
              tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'programmes', label: 'Programmes', count: customer.enrollments.length },
                { id: 'payments', label: 'Payments', count: customer.invoices.length },
                { id: 'activity', label: 'Activity' },
              ]}
              onChange={setActiveTab}
            />
          </motion.div>

          <motion.div variants={staggerItem} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Value', value: formatCurrency(totalInvoiceAmount), color: 'text-foreground' },
              { label: 'Enrollments', value: customer._count.enrollments.toString(), color: 'text-primary' },
              { label: 'Invoices', value: `${paidInvoices}/${customer.invoices.length}`, color: 'text-emerald-600' },
              { label: 'Interactions', value: customer._count.interactions.toString(), color: 'text-foreground' },
            ].map((stat) => (
              <div key={stat.label} className="p-3 rounded-xl bg-surface-light border border-border-light">
                <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider">{stat.label}</p>
                <p className={cn('text-lg font-bold mt-0.5', stat.color)}>{stat.value}</p>
              </div>
            ))}
          </motion.div>

          {activities.length > 0 && (
            <motion.div variants={staggerItem}>
              <Card padding="md">
                <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
                <ActivityFeed activities={activities} />
              </Card>
            </motion.div>
          )}

          {customer.enrollments.length > 0 && (
            <motion.div variants={staggerItem}>
              <Card padding="md">
                <h3 className="text-sm font-semibold mb-4">Programmes</h3>
                <div className="space-y-3">
                  {customer.enrollments.map((enrollment) => (
                    <div key={enrollment.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/8">
                          <GraduationCap className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{enrollment.programme.name}</p>
                          <p className="text-xs text-text-muted">{enrollment.cohort?.name || 'N/A'}</p>
                        </div>
                      </div>
                      <Badge variant={enrollment.status === 'COMPLETED' ? 'success' : 'primary'} size="sm">
                        {enrollment.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {customer.invoices.length > 0 && (
            <motion.div variants={staggerItem}>
              <Card padding="md">
                <h3 className="text-sm font-semibold mb-4">Invoices</h3>
                <div className="space-y-2">
                  {customer.invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/8">
                          <CreditCard className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{invoice.invoiceNumber}</p>
                          <p className="text-xs text-text-muted">{new Date(invoice.createdAt).toLocaleDateString('en-NG')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{formatCurrency(invoice.amount)}</p>
                        <Badge variant={invoice.status === 'PAID' ? 'success' : invoice.status === 'OVERDUE' ? 'error' : 'warning'} size="sm">{invoice.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div variants={staggerItem}>
            <Card padding="md">
              <h3 className="text-sm font-semibold mb-4">Customer Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Owner</span>
                  <span className="font-medium">{customer.owner?.name || 'Unassigned'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Source</span>
                  <span className="font-medium">{customer.source || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Created</span>
                  <span className="font-medium">{new Date(customer.createdAt).toLocaleDateString('en-NG')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Type</span>
                  <span className="font-medium">{customer.customerType}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
