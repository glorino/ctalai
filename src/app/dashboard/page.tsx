'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  DollarSign,
  GraduationCap,
  ArrowUpRight,
  Target,
  Headphones,
  Bot,
  Brain,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Zap,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn, formatCurrency } from '@/lib/utils'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import AIInsight from '@/components/ui/ai-insight'
import { useToast } from '@/components/ui/toast'

interface DashboardData {
  counts: {
    users: number
    customers: number
    leads: number
    programs: number
    invoices: number
    tickets: number
    staff: number
    projects: number
  }
  revenue: number
  recentLeads: Array<{
    id: string
    name: string
    email: string
    source: string
    score: number
    status: string
    createdAt: string
  }>
  activePrograms: Array<{
    id: string
    name: string
    category: string
    price: number
    _count: { enrollments: number }
  }>
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const h = 32
  const w = 80
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ')

  return (
    <svg width={w} height={h} className="shrink-0">
      <defs>
        <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke="var(--primary)" strokeWidth="1.5" points={points} opacity="0.6" />
      <polygon fill={`url(#spark-${color})`} points={`0,${h} ${points} ${w},${h}`} />
    </svg>
  )
}

const colorMap = {
  primary: { bg: 'bg-primary/8', text: 'text-primary', bar: 'from-primary to-primary-light' },
  secondary: { bg: 'bg-secondary/8', text: 'text-secondary', bar: 'from-secondary to-secondary-light' },
  success: { bg: 'bg-emerald-50', text: 'text-emerald-600', bar: 'from-emerald-500 to-emerald-400' },
  warning: { bg: 'bg-amber-50', text: 'text-amber-600', bar: 'from-amber-500 to-amber-400' },
}

const agentStatus = [
  { name: 'Growth Agent', status: 'active', tasks: 147, success: 94.2 },
  { name: 'Customer Success', status: 'active', tasks: 89, success: 91.8 },
  { name: 'Learning Agent', status: 'active', tasks: 124, success: 96.1 },
  { name: 'Finance Agent', status: 'active', tasks: 56, success: 98.5 },
]

const priorityActions = [
  { id: 1, action: 'Follow up with high-value leads', priority: 'high', icon: Target },
  { id: 2, action: 'Review declining programme engagement', priority: 'medium', icon: AlertTriangle },
  { id: 3, action: 'Approve pending partnership proposals', priority: 'medium', icon: CheckCircle2 },
]

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const today = new Date().toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const kpis = [
    {
      title: 'TOTAL CUSTOMERS',
      value: data?.counts.customers.toLocaleString() || '—',
      change: '+12.8%',
      changeType: 'up' as const,
      vs: 'vs last month',
      icon: Users,
      color: 'primary',
      sparkline: [40, 45, 42, 50, 48, 55, 60, 58, 65, 70, 72, 78],
    },
    {
      title: 'ACTIVE LEADS',
      value: data?.counts.leads.toLocaleString() || '—',
      change: '+18.4%',
      changeType: 'up' as const,
      vs: 'vs last month',
      icon: Target,
      color: 'secondary',
      sparkline: [20, 25, 30, 28, 35, 40, 38, 45, 50, 55, 58, 62],
    },
    {
      title: 'PROGRAMMES',
      value: data?.counts.programs.toString() || '—',
      change: '+3',
      changeType: 'up' as const,
      vs: 'vs last month',
      icon: GraduationCap,
      color: 'primary',
      sparkline: [15, 16, 18, 17, 19, 20, 21, 20, 22, 23, 24, 24],
    },
    {
      title: 'REVENUE',
      value: data ? formatCurrency(data.revenue) : '—',
      change: '+18.4%',
      changeType: 'up' as const,
      vs: 'vs last month',
      icon: DollarSign,
      color: 'warning',
      sparkline: [30, 35, 32, 38, 42, 40, 45, 48, 50, 55, 58, 62],
    },
    {
      title: 'OPEN TICKETS',
      value: data?.counts.tickets.toString() || '—',
      change: '-3',
      changeType: 'up' as const,
      vs: 'vs last month',
      icon: Headphones,
      color: 'success',
      sparkline: [40, 42, 41, 43, 44, 43, 45, 46, 47, 48, 48, 48],
    },
    {
      title: 'TEAM MEMBERS',
      value: data?.counts.staff.toString() || '—',
      change: '+2',
      changeType: 'up' as const,
      vs: 'vs last month',
      icon: Users,
      color: 'primary',
      sparkline: [20, 22, 24, 25, 26, 27, 28, 28, 29, 30, 31, 32],
    },
  ]

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good morning, Admin</h1>
          <p className="text-sm text-text-muted mt-0.5">Here&apos;s what is happening across CTAL today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Calendar className="w-4 h-4" />
          {today}
        </div>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => {
          const colors = colorMap[kpi.color as keyof typeof colorMap] || colorMap.primary
          return (
            <motion.div
              key={kpi.title}
              variants={staggerItem}
              className="card bg-surface border border-border rounded-2xl p-5 relative overflow-hidden group hover:border-primary/15 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">{kpi.title}</p>
                <div className={cn('p-2 rounded-xl', colors.bg)}>
                  <kpi.icon className={cn('w-4 h-4', colors.text)} />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold tracking-tight">{loading ? '...' : kpi.value}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" />{kpi.change}
                    </span>
                    <span className="text-xs text-text-muted">{kpi.vs}</span>
                  </div>
                </div>
                <MiniSparkline data={kpi.sparkline} color={kpi.color} />
              </div>
              <div className={cn('absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r', colors.bar, 'opacity-0 group-hover:opacity-100 transition-opacity')} />
            </motion.div>
          )
        })}
      </div>

      {/* AI Executive Briefing */}
      <motion.div variants={staggerItem}>
        <AIInsight title="AI Executive Briefing">
          <p className="leading-relaxed">
            CTAL is performing well. You have <strong>{data?.counts.customers || 0}</strong> customers,{' '}
            <strong>{data?.counts.leads || 0}</strong> active leads, and{' '}
            <strong>{data?.counts.programs || 0}</strong> programmes running.
            {data?.revenue ? ` Total revenue collected is ${formatCurrency(data.revenue)}.` : ''}
          </p>
          <div className="mt-4 space-y-2">
            {priorityActions.map((pa) => (
              <div key={pa.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/60 border border-white/80">
                <pa.icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm flex-1">{pa.action}</span>
                <Badge variant={pa.priority === 'high' ? 'error' : 'warning'} size="sm">{pa.priority}</Badge>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Button size="sm" variant="outline" onClick={() => toast('Review Actions: 3 items need attention', 'info')}>Review Actions</Button>
            <Button size="sm" onClick={() => toast('AI Assistant is being prepared...', 'info')}>Ask AI</Button>
          </div>
        </AIInsight>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <div className="card bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold">Recent Leads</h2>
              <a href="/dashboard/leads" className="text-xs text-primary hover:text-primary-dark transition-colors">View all</a>
            </div>
            {loading ? (
              <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-12 rounded-lg" />)}</div>
            ) : (
              <div className="space-y-2">
                {(data?.recentLeads || []).map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-light hover:bg-surface-muted transition-colors">
                    <div>
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-text-muted">{lead.source.replace('_', ' ')} • Score: {lead.score}</p>
                    </div>
                    <Badge variant={lead.status === 'WON' ? 'success' : lead.status === 'LOST' ? 'error' : 'primary'} size="sm">
                      {lead.status.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
                {(!data?.recentLeads || data.recentLeads.length === 0) && (
                  <p className="text-sm text-text-muted text-center py-4">No leads yet</p>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Active Programmes */}
        <motion.div variants={staggerItem}>
          <div className="card bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold">Active Programmes</h2>
              <a href="/dashboard/programs" className="text-xs text-primary hover:text-primary-dark">View all</a>
            </div>
            {loading ? (
              <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-12 rounded-lg" />)}</div>
            ) : (
              <div className="space-y-3">
                {(data?.activePrograms || []).map((prog) => (
                  <div key={prog.id} className="p-3 rounded-xl bg-surface-light">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{prog.name}</p>
                      <span className="text-xs text-text-muted">{prog._count.enrollments} enrolled</span>
                    </div>
                    <p className="text-xs text-text-muted">{prog.category}</p>
                  </div>
                ))}
                {(!data?.activePrograms || data.activePrograms.length === 0) && (
                  <p className="text-sm text-text-muted text-center py-4">No programmes yet</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Second Row: AI Agent Status */}
      <motion.div variants={staggerItem}>
        <div className="card bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              AI Agents
            </h2>
            <a href="/dashboard/ai" className="text-xs text-primary hover:text-primary-dark">View all</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {agentStatus.map((agent) => (
              <div key={agent.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ai-pulse" />
                  <div>
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-xs text-text-muted">{agent.tasks} tasks today</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-emerald-600">{agent.success}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
