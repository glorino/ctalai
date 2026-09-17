'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  TrendingUp,
  Heart,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import DataTable, { Column } from '@/components/ui/data-table'
import Tabs from '@/components/ui/tabs'
import Dropdown from '@/components/ui/dropdown'
import EmptyState from '@/components/ui/empty-state'
import AIInsight from '@/components/ui/ai-insight'

const customers = [
  { id: '1', name: 'Adebayo Ogundimu', email: 'adebayo@techcorp.ng', phone: '+234 803 456 7890', type: 'CORPORATE', status: 'ACTIVE', programme: 'Advanced Valuation', value: '₦2.4M', lastActivity: '2 hours ago', owner: 'Chioma', tags: ['Enterprise', 'VIP'] },
  { id: '2', name: 'Fatima Al-Rashid', email: 'fatima@greenenergy.ng', phone: '+234 805 123 4567', type: 'ORGANISATION', status: 'ACTIVE', programme: 'Digital Marketing', value: '₦1.2M', lastActivity: '1 day ago', owner: 'Emeka', tags: ['Mid-Market'] },
  { id: '3', name: 'Chukwuma Eze', email: 'chukwuma@startup.ng', phone: '+234 807 890 1234', type: 'INDIVIDUAL', status: 'ACTIVE', programme: 'Leadership Academy', value: '₦850K', lastActivity: '3 hours ago', owner: 'Chioma', tags: ['Startup'] },
  { id: '4', name: 'Ngozi Okafor', email: 'ngozi@consult.ng', phone: '+234 809 234 5678', type: 'INDIVIDUAL', status: 'INACTIVE', programme: 'Digital Marketing', value: '₦420K', lastActivity: '2 weeks ago', owner: 'Emeka', tags: ['Consultant'] },
  { id: '5', name: 'Ibrahim Musa', email: 'ibrahim@corp.ng', phone: '+234 812 345 6789', type: 'CORPORATE', status: 'ACTIVE', programme: 'Advanced Valuation', value: '₦3.1M', lastActivity: '5 hours ago', owner: 'Chioma', tags: ['Enterprise', 'Renewal'] },
  { id: '6', name: 'Blessing Okoro', email: 'blessing@ngo.ng', phone: '+234 814 567 8901', type: 'NGO', status: 'ACTIVE', programme: 'Leadership Academy', value: '₦680K', lastActivity: '1 day ago', owner: 'Emeka', tags: ['NGO'] },
  { id: '7', name: 'Tunde Bakare', email: 'tunde@fin.ng', phone: '+234 816 789 0123', type: 'CORPORATE', status: 'PROSPECT', programme: 'Advanced Valuation', value: '₦1.8M', lastActivity: '4 hours ago', owner: 'Chioma', tags: ['Finance', 'Hot Lead'] },
  { id: '8', name: 'Amina Bello', email: 'amina@edu.ng', phone: '+234 818 901 2345', type: 'ORGANISATION', status: 'ACTIVE', programme: 'Digital Marketing', value: '₦920K', lastActivity: '6 hours ago', owner: 'Emeka', tags: ['Education'] },
]

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
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = customers.filter((c) => {
    if (activeTab !== 'all' && c.status.toLowerCase() !== activeTab) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.email.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const columns: Column<typeof customers[0]>[] = [
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
      key: 'type',
      label: 'Type',
      render: (item) => <Badge variant={typeVariant[item.type] || 'neutral'}>{item.type}</Badge>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => <Badge variant={statusVariant[item.status] || 'neutral'} dot>{item.status}</Badge>,
    },
    {
      key: 'programme',
      label: 'Programme',
      render: (item) => <span className="text-sm text-text-secondary">{item.programme}</span>,
    },
    {
      key: 'value',
      label: 'Value',
      sortable: true,
      render: (item) => <span className="text-sm font-semibold">{item.value}</span>,
    },
    {
      key: 'owner',
      label: 'Owner',
      render: (item) => <span className="text-sm text-text-secondary">{item.owner}</span>,
    },
    {
      key: 'lastActivity',
      label: 'Last Activity',
      render: (item) => <span className="text-xs text-text-muted">{item.lastActivity}</span>,
    },
  ]

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="CRM"
          description="Manage your customer relationships"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'CRM' }]}
          actions={
            <Button leftIcon={<Plus className="w-4 h-4" />}>Add Customer</Button>
          }
        />
      </motion.div>

      {/* Stats */}
      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Customers" value="2,481" change="+12.8%" changeType="up" icon={<Users className="w-5 h-5" />} />
        <StatCard title="Active Customers" value="1,892" change="+8.4%" changeType="up" icon={<TrendingUp className="w-5 h-5" />} />
        <StatCard title="New This Month" value="142" change="+24" changeType="up" icon={<UserPlus className="w-5 h-5" />} />
        <StatCard title="At Risk" value="23" change="-5" changeType="up" icon={<AlertTriangle className="w-5 h-5" />} />
      </motion.div>

      {/* AI Insight */}
      <motion.div variants={staggerItem}>
        <AIInsight title="AI Customer Insight">
          <p>Customer engagement increased by 15% this week. 3 customers are at risk of churning and require immediate attention. Recommend personalised outreach for the top 5 dormant accounts.</p>
        </AIInsight>
      </motion.div>

      {/* Tabs & Table */}
      <motion.div variants={staggerItem}>
        <div className="card bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="px-6 pt-4">
            <Tabs
              tabs={[
                { id: 'all', label: 'All Customers', count: customers.length },
                { id: 'active', label: 'Active', count: customers.filter(c => c.status === 'ACTIVE').length },
                { id: 'prospect', label: 'Prospects', count: customers.filter(c => c.status === 'PROSPECT').length },
                { id: 'inactive', label: 'Inactive', count: customers.filter(c => c.status === 'INACTIVE').length },
              ]}
              onChange={setActiveTab}
            />
          </div>
          <div className="p-6">
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
                    { divider: true, label: '', onClick: () => {} },
                    { label: 'Delete', onClick: () => {}, icon: <AlertTriangle className="w-4 h-4" />, danger: true },
                  ]}
                />
              )}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
