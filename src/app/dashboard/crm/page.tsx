'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Plus,
  TrendingUp,
  UserPlus,
  AlertTriangle,
  MoreHorizontal,
  Mail,
  Phone,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import DataTable, { Column } from '@/components/ui/data-table'
import Tabs from '@/components/ui/tabs'
import Dropdown from '@/components/ui/dropdown'
import AIInsight from '@/components/ui/ai-insight'

interface Customer {
  id: string
  name: string
  email: string | null
  phone: string | null
  customerType: string
  status: string
  organisation: string | null
  owner: { name: string } | null
  createdAt: string
}

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'neutral' | 'primary'> = {
  ACTIVE: 'success',
  INACTIVE: 'neutral',
  PROSPECT: 'primary',
  LEAD: 'primary',
  CHURNED: 'error',
}

const typeVariant: Record<string, 'primary' | 'secondary' | 'neutral'> = {
  CORPORATE: 'primary',
  ORGANISATION: 'secondary',
  INDIVIDUAL: 'neutral',
  NGO: 'primary',
  GOVERNMENT: 'secondary',
}

export default function CRMPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [stats, setStats] = useState<{ status: string; _count: number }[]>([])

  useEffect(() => {
    fetch('/api/crm')
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data.customers || [])
        setStats(data.stats || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const activeCount = stats.find((s) => s.status === 'ACTIVE')?._count || 0
  const prospectCount = stats.find((s) => s.status === 'PROSPECT')?._count || 0
  const inactiveCount = stats.find((s) => s.status === 'INACTIVE')?._count || 0

  const filtered = customers.filter((c) => {
    if (activeTab !== 'all' && c.status.toLowerCase() !== activeTab) return false
    return true
  })

  const columns: Column<Customer>[] = [
    {
      key: 'name',
      label: 'Customer',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar name={item.name} size="sm" />
          <div>
            <p className="font-medium text-sm">{item.name}</p>
            <p className="text-xs text-text-muted">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'customerType',
      label: 'Type',
      render: (item) => <Badge variant={typeVariant[item.customerType] || 'neutral'}>{item.customerType}</Badge>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => <Badge variant={statusVariant[item.status] || 'neutral'} dot>{item.status}</Badge>,
    },
    {
      key: 'organisation',
      label: 'Organisation',
      render: (item) => <span className="text-sm text-text-secondary">{item.organisation || '—'}</span>,
    },
    {
      key: 'owner',
      label: 'Owner',
      render: (item) => <span className="text-sm text-text-secondary">{item.owner?.name || '—'}</span>,
    },
  ]

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="CRM"
          description="Manage your customer relationships"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'CRM' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />}>Add Customer</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Customers" value={customers.length.toString()} change="+12.8%" changeType="up" icon={<Users className="w-5 h-5" />} />
        <StatCard title="Active Customers" value={activeCount.toString()} change="+8.4%" changeType="up" icon={<TrendingUp className="w-5 h-5" />} />
        <StatCard title="Prospects" value={prospectCount.toString()} change="+24" changeType="up" icon={<UserPlus className="w-5 h-5" />} />
        <StatCard title="Inactive" value={inactiveCount.toString()} change="-5" changeType="up" icon={<AlertTriangle className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Customer Insight">
          <p>Customer data is now synced from the database. {customers.length} customers total, {activeCount} active. AI-powered engagement analysis coming soon.</p>
        </AIInsight>
      </motion.div>

      <motion.div variants={staggerItem}>
        <div className="card bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="px-6 pt-4">
            <Tabs
              tabs={[
                { id: 'all', label: 'All Customers', count: customers.length },
                { id: 'active', label: 'Active', count: activeCount },
                { id: 'prospect', label: 'Prospects', count: prospectCount },
                { id: 'inactive', label: 'Inactive', count: inactiveCount },
              ]}
              onChange={setActiveTab}
            />
          </div>
          <div className="p-6">
            {loading ? (
              <div className="space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-14 rounded-lg" />)}</div>
            ) : (
              <DataTable
                columns={columns}
                data={filtered}
                searchable
                searchPlaceholder="Search customers..."
                searchKey="name"
                onRowClick={(item) => window.location.href = `/dashboard/crm/${item.id}`}
                actions={(item) => (
                  <Dropdown
                    trigger={
                      <button className="p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-light transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    }
                    items={[
                      { label: 'View Profile', onClick: () => {}, icon: <Users className="w-4 h-4" /> },
                      { label: 'Send Email', onClick: () => {}, icon: <Mail className="w-4 h-4" /> },
                      { label: 'Call', onClick: () => {}, icon: <Phone className="w-4 h-4" /> },
                    ]}
                  />
                )}
              />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
