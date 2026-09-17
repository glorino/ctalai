'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Target,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  Thermometer,
  Snowflake,
  Sparkles,
  Kanban,
  Table2,
  BarChart3,
  TrendingUp,
  User,
  Mail,
  Phone,
  Clock,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import DataTable, { Column } from '@/components/ui/data-table'
import Tabs from '@/components/ui/tabs'
import KanbanBoard from '@/components/ui/kanban-board'
import Dropdown from '@/components/ui/dropdown'
import AIInsight from '@/components/ui/ai-insight'

const leads = [
  { id: '1', name: 'TechStart Nigeria', email: 'contact@techstart.ng', phone: '+234 801 234 5678', source: 'WEBINAR', score: 87, status: 'QUALIFIED', value: '₦2.4M', owner: 'Chioma', lastActivity: '2 hours ago', nextAction: 'Send proposal' },
  { id: '2', name: 'Lagos Business School', email: 'partnerships@lbs.edu.ng', phone: '+234 802 345 6789', source: 'REFERRAL', score: 82, status: 'CONTACTED', value: '₦1.8M', owner: 'Emeka', lastActivity: '1 day ago', nextAction: 'Follow up call' },
  { id: '3', name: 'Green Energy Co', email: 'info@greenenergy.ng', phone: '+234 803 456 7890', source: 'WEBSITE', score: 76, status: 'NEW', value: '₦950K', owner: 'Chioma', lastActivity: '3 hours ago', nextAction: 'Qualify lead' },
  { id: '4', name: 'FinEdge Solutions', email: 'hello@finedge.ng', phone: '+234 804 567 8901', source: 'PAID_AD', score: 65, status: 'NEW', value: '₦1.2M', owner: 'Emeka', lastActivity: '5 hours ago', nextAction: 'Send brochure' },
  { id: '5', name: 'EduVentures Africa', email: 'team@eduventures.africa', phone: '+234 805 678 9012', source: 'SOCIAL_MEDIA', score: 58, status: 'QUALIFICATION', value: '₦780K', owner: 'Chioma', lastActivity: '1 day ago', nextAction: 'Discovery call' },
  { id: '6', name: 'Meridian Holdings', email: 'info@meridian.ng', phone: '+234 806 789 0123', source: 'PARTNER', score: 91, status: 'PROPOSAL_SENT', value: '₦3.5M', owner: 'Emeka', lastActivity: '4 hours ago', nextAction: 'Follow up on proposal' },
  { id: '7', name: 'Nigerian Ports Authority', email: 'training@npa.gov.ng', phone: '+234 807 890 1234', source: 'EVENT', score: 72, status: 'NEGOTIATING', value: '₦4.2M', owner: 'Chioma', lastActivity: '2 days ago', nextAction: 'Final negotiation' },
  { id: '8', name: 'DataVault Analytics', email: 'sales@datavault.ng', phone: '+234 808 901 2345', source: 'LANDING_PAGE', score: 54, status: 'NEW', value: '₦620K', owner: 'Emeka', lastActivity: '6 hours ago', nextAction: 'Qualify lead' },
]

const scoreVariant: Record<number, 'error' | 'warning' | 'neutral'> = {
  80: 'error',
  70: 'warning',
  60: 'warning',
}

const kanbanColumns = [
  {
    id: 'new',
    title: 'New',
    color: 'bg-blue-400',
    items: leads.filter(l => l.status === 'NEW').map(l => ({ id: l.id, title: l.name, subtitle: l.value, tags: [{ label: l.source.replace('_', ' '), color: 'bg-primary/10 text-primary' }] })),
  },
  {
    id: 'qualified',
    title: 'Qualified',
    color: 'bg-amber-400',
    items: leads.filter(l => l.status === 'QUALIFIED').map(l => ({ id: l.id, title: l.name, subtitle: l.value, tags: [{ label: `Score: ${l.score}`, color: 'bg-amber-50 text-amber-700' }] })),
  },
  {
    id: 'contacted',
    title: 'Contacted',
    color: 'bg-purple-400',
    items: leads.filter(l => l.status === 'CONTACTED').map(l => ({ id: l.id, title: l.name, subtitle: l.value })),
  },
  {
    id: 'proposal',
    title: 'Proposal Sent',
    color: 'bg-emerald-400',
    items: leads.filter(l => l.status === 'PROPOSAL_SENT').map(l => ({ id: l.id, title: l.name, subtitle: l.value })),
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    color: 'bg-orange-400',
    items: leads.filter(l => l.status === 'NEGOTIATING').map(l => ({ id: l.id, title: l.name, subtitle: l.value })),
  },
]

function getScoreLabel(score: number) {
  if (score >= 80) return { label: 'HOT', variant: 'error' as const, icon: Flame }
  if (score >= 65) return { label: 'WARM', variant: 'warning' as const, icon: Thermometer }
  return { label: 'COLD', variant: 'neutral' as const, icon: Snowflake }
}

export default function LeadsPage() {
  const [view, setView] = useState<'table' | 'kanban'>('table')

  const columns: Column<typeof leads[0]>[] = [
    {
      key: 'name',
      label: 'Lead',
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
      key: 'source',
      label: 'Source',
      render: (item) => <Badge variant="neutral">{item.source.replace('_', ' ')}</Badge>,
    },
    {
      key: 'score',
      label: 'Score',
      sortable: true,
      render: (item) => {
        const { label, variant } = getScoreLabel(item.score)
        return <Badge variant={variant} dot>{label} ({item.score})</Badge>
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => <Badge variant="primary">{item.status.replace('_', ' ')}</Badge>,
    },
    {
      key: 'value',
      label: 'Value',
      sortable: true,
      render: (item) => <span className="text-sm font-semibold">{item.value}</span>,
    },
    {
      key: 'nextAction',
      label: 'Next Action',
      render: (item) => <span className="text-xs text-text-secondary">{item.nextAction}</span>,
    },
  ]

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Leads"
          description="Track and manage your leads"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Leads' }]}
          actions={
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-surface-muted rounded-lg p-0.5">
                <button onClick={() => setView('table')} className={cn('p-1.5 rounded-md transition-colors', view === 'table' ? 'bg-surface text-foreground shadow-sm' : 'text-text-muted hover:text-foreground')}>
                  <Table2 className="w-4 h-4" />
                </button>
                <button onClick={() => setView('kanban')} className={cn('p-1.5 rounded-md transition-colors', view === 'kanban' ? 'bg-surface text-foreground shadow-sm' : 'text-text-muted hover:text-foreground')}>
                  <Kanban className="w-4 h-4" />
                </button>
              </div>
              <Button leftIcon={<Plus className="w-4 h-4" />}>Add Lead</Button>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Leads" value="847" change="+18.4%" changeType="up" icon={<Target className="w-5 h-5" />} />
        <StatCard title="Hot Leads" value="124" change="+12" changeType="up" icon={<Flame className="w-5 h-5" />} />
        <StatCard title="Conversion Rate" value="34.2%" change="+2.1%" changeType="up" icon={<TrendingUp className="w-5 h-5" />} />
        <StatCard title="Pipeline Value" value="₦15.4M" change="+22%" changeType="up" icon={<BarChart3 className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Lead Insight">
          <p>8 high-value leads require immediate follow-up. The webinar funnel generated 23 new leads this week with a 42% qualification rate. Meridian Holdings is your highest-value opportunity at ₦3.5M.</p>
        </AIInsight>
      </motion.div>

      <motion.div variants={staggerItem}>
        {view === 'table' ? (
          <div className="card bg-surface border border-border rounded-2xl overflow-hidden p-6">
            <DataTable
              columns={columns}
              data={leads}
              searchable
              searchPlaceholder="Search leads..."
              searchKey="name"
              actions={(item) => (
                <Dropdown
                  trigger={<button className="p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-light"><MoreHorizontal className="w-4 h-4" /></button>}
                  items={[
                    { label: 'View Details', onClick: () => {} },
                    { label: 'Send Email', onClick: () => {}, icon: <Mail className="w-4 h-4" /> },
                    { label: 'Call', onClick: () => {}, icon: <Phone className="w-4 h-4" /> },
                    { divider: true, label: '', onClick: () => {} },
                    { label: 'Delete', onClick: () => {}, danger: true },
                  ]}
                />
              )}
            />
          </div>
        ) : (
          <KanbanBoard columns={kanbanColumns} />
        )}
      </motion.div>
    </motion.div>
  )
}
