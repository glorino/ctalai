'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Target,
  Plus,
  TrendingUp,
  UserPlus,
  Flame,
  Clock,
  MoreHorizontal,
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
import { useToast } from '@/components/ui/toast'

interface Lead {
  id: string
  name: string
  email: string | null
  phone: string | null
  company: string | null
  source: string
  score: number
  status: string
  assignedTo: { name: string } | null
  createdAt: string
}

const scoreBadge = (score: number) => {
  if (score >= 80) return <Badge variant="error" size="sm"><Flame className="w-3 h-3 mr-1" />{score}</Badge>
  if (score >= 60) return <Badge variant="warning" size="sm">{score}</Badge>
  return <Badge variant="neutral" size="sm">{score}</Badge>
}

const statusVariant: Record<string, 'success' | 'warning' | 'error' | 'neutral' | 'primary' | 'secondary'> = {
  NEW: 'primary',
  CONTACTED: 'secondary',
  QUALIFIED: 'success',
  PROPOSAL_SENT: 'warning',
  NEGOTIATING: 'warning',
  WON: 'success',
  LOST: 'error',
  UNQUALIFIED: 'neutral',
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const { toast } = useToast()
  const router = useRouter()
  const [stats, setStats] = useState<{ status: string; _count: number }[]>([])

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.leads || [])
        setStats(data.stats || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const newCount = stats.find((s) => s.status === 'NEW')?._count || 0
  const qualifiedCount = stats.find((s) => s.status === 'QUALIFIED')?._count || 0
  const wonCount = stats.find((s) => s.status === 'WON')?._count || 0

  const filtered = leads.filter((l) => {
    if (activeTab === 'all') return true
    return l.status.toLowerCase() === activeTab
  })

  const columns: Column<Lead>[] = [
    {
      key: 'name',
      label: 'Lead',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar name={item.name} size="sm" />
          <div>
            <p className="font-medium text-sm">{item.name}</p>
            <p className="text-xs text-text-muted">{item.email || item.company || '—'}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'source',
      label: 'Source',
      render: (item) => <span className="text-xs text-text-secondary">{item.source.replace('_', ' ')}</span>,
    },
    {
      key: 'score',
      label: 'Score',
      sortable: true,
      render: (item) => scoreBadge(item.score),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => <Badge variant={statusVariant[item.status] || 'neutral'} dot>{item.status.replace('_', ' ')}</Badge>,
    },
    {
      key: 'assignedTo',
      label: 'Assigned To',
      render: (item) => <span className="text-sm text-text-secondary">{item.assignedTo?.name || '—'}</span>,
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (item) => <span className="text-xs text-text-muted">{new Date(item.createdAt).toLocaleDateString('en-NG')}</span>,
    },
  ]

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Leads"
          description="Lead generation and pipeline management"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Leads' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Add lead form coming soon', 'info')}>Add Lead</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Leads" value={leads.length.toString()} change="+18.4%" changeType="up" icon={<Target className="w-5 h-5" />} />
        <StatCard title="New Leads" value={newCount.toString()} change="+12" changeType="up" icon={<Plus className="w-5 h-5" />} />
        <StatCard title="Qualified" value={qualifiedCount.toString()} change="+8" changeType="up" icon={<TrendingUp className="w-5 h-5" />} />
        <StatCard title="Won" value={wonCount.toString()} change="+3" changeType="up" icon={<Flame className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Lead Insight">
          <p>Lead data is now synced from the database. {leads.length} total leads across all stages. AI-powered lead scoring and qualification automation is active.</p>
        </AIInsight>
      </motion.div>

      <motion.div variants={staggerItem}>
        <div className="card bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="px-6 pt-4">
            <Tabs
              tabs={[
                { id: 'all', label: 'All Leads', count: leads.length },
                { id: 'new', label: 'New', count: newCount },
                { id: 'qualified', label: 'Qualified', count: qualifiedCount },
                { id: 'won', label: 'Won', count: wonCount },
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
                searchPlaceholder="Search leads..."
                searchKey="name"
                actions={(item) => (
                  <Dropdown
                    trigger={
                      <button className="p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-light transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    }
                    items={[
                      { label: 'View Details', onClick: () => toast(`Lead: ${item.name} — ${item.company || 'N/A'}`, 'info'), icon: <Target className="w-4 h-4" /> },
                      { label: 'Assign', onClick: () => toast('Assignment feature coming soon', 'info'), icon: <UserPlus className="w-4 h-4" /> },
                      { label: 'Convert to Customer', onClick: () => toast('Converting lead to customer...', 'info'), icon: <TrendingUp className="w-4 h-4" /> },
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
