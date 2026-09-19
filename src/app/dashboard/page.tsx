'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Users,
  DollarSign,
  GraduationCap,
  ArrowUpRight,
  Target,
  Headphones,
  Bot,
  CheckCircle2,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn, formatCurrency } from '@/lib/utils'
import Link from 'next/link'
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
  topLeads: Array<{
    id: string
    name: string
    email: string
    score: number
    status: string
    source: string
  }>
  upcomingTasks: Array<{
    id: string
    title: string
    status: string
    priority: string
    dueDate: string | null
    assignedTo: { name: string } | null
  }>
  aiAgents: Array<{
    id: string
    name: string
    type: string
    tasks: number
    success: number
  }>
}

const PROGRAMS_PER_PAGE = 10

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

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [programPage, setProgramPage] = useState(1)
  const { toast } = useToast()
  const router = useRouter()
  const today = new Date().toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const totalPrograms = data?.activePrograms.length || 0
  const totalProgramPages = Math.ceil(totalPrograms / PROGRAMS_PER_PAGE)

  const paginatedPrograms = useMemo(() => {
    const programs = data?.activePrograms || []
    const start = (programPage - 1) * PROGRAMS_PER_PAGE
    return programs.slice(start, start + PROGRAMS_PER_PAGE)
  }, [data?.activePrograms, programPage])

  const programStart = totalPrograms > 0 ? (programPage - 1) * PROGRAMS_PER_PAGE + 1 : 0
  const programEnd = Math.min(programPage * PROGRAMS_PER_PAGE, totalPrograms)

  const priorityActions = useMemo(() => {
    if (!data) return []
    const actions: Array<{ id: number; action: string; priority: string; icon: typeof Target }> = []
    let id = 1
    if (data.topLeads.length > 0) {
      actions.push({ id: id++, action: `Follow up with ${data.topLeads[0].name} (top lead)`, priority: 'high', icon: Target })
    }
    if (data.counts.tickets > 0) {
      actions.push({ id: id++, action: `Review ${data.counts.tickets} open support tickets`, priority: 'medium', icon: Headphones })
    }
    if (data.upcomingTasks.length > 0) {
      actions.push({ id: id++, action: `Complete: ${data.upcomingTasks[0].title}`, priority: 'medium', icon: CheckCircle2 })
    }
    return actions
  }, [data])

  const kpis = [
    {
      title: 'TOTAL CUSTOMERS',
      value: data?.counts.customers.toLocaleString() || '—',
      icon: Users,
      color: 'primary',
      sparkline: [40, 45, 42, 50, 48, 55, 60, 58, 65, 70, 72, 78],
    },
    {
      title: 'ACTIVE LEADS',
      value: data?.counts.leads.toLocaleString() || '—',
      icon: Target,
      color: 'secondary',
      sparkline: [20, 25, 30, 28, 35, 40, 38, 45, 50, 55, 58, 62],
    },
    {
      title: 'PROGRAMMES',
      value: data?.counts.programs.toString() || '—',
      icon: GraduationCap,
      color: 'primary',
      sparkline: [15, 16, 18, 17, 19, 20, 21, 20, 22, 23, 24, 24],
    },
    {
      title: 'REVENUE',
      value: data ? formatCurrency(data.revenue) : '—',
      icon: DollarSign,
      color: 'warning',
      sparkline: [30, 35, 32, 38, 42, 40, 45, 48, 50, 55, 58, 62],
    },
    {
      title: 'OPEN TICKETS',
      value: data?.counts.tickets.toString() || '—',
      icon: Headphones,
      color: 'success',
      sparkline: [40, 42, 41, 43, 44, 43, 45, 46, 47, 48, 48, 48],
    },
    {
      title: 'TEAM MEMBERS',
      value: data?.counts.staff.toString() || '—',
      icon: Users,
      color: 'primary',
      sparkline: [20, 22, 24, 25, 26, 27, 28, 28, 29, 30, 31, 32],
    },
  ]

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
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
                </div>
                <MiniSparkline data={kpi.sparkline} color={kpi.color} />
              </div>
              <div className={cn('absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r', colors.bar, 'opacity-0 group-hover:opacity-100 transition-opacity')} />
            </motion.div>
          )
        })}
      </div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Executive Briefing">
          <p className="leading-relaxed">
            CTAL is performing well. You have <strong>{data?.counts.customers || 0}</strong> customers,{' '}
            <strong>{data?.counts.leads || 0}</strong> active leads, and{' '}
            <strong>{data?.counts.programs || 0}</strong> programmes running.
            {data?.revenue ? ` Total revenue collected is ${formatCurrency(data.revenue)}.` : ' No revenue recorded yet.'}
          </p>
          <div className="mt-4 space-y-2">
            {priorityActions.map((pa) => (
              <div key={pa.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/60 border border-white/80">
                <pa.icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm flex-1">{pa.action}</span>
                <Badge variant={pa.priority === 'high' ? 'error' : 'warning'} size="sm">{pa.priority}</Badge>
              </div>
            ))}
            {priorityActions.length === 0 && (
              <p className="text-sm text-text-muted">No priority actions at this time.</p>
            )}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Button size="sm" variant="outline" onClick={() => router.push('/dashboard/leads')}>Review Actions</Button>
            <Button size="sm" onClick={() => router.push('/dashboard/ai')}>Ask AI</Button>
          </div>
        </AIInsight>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <div className="card bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold">Recent Leads</h2>
              <Link href="/dashboard/leads" className="text-xs text-primary hover:text-primary-dark transition-colors">View all</Link>
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

        <motion.div variants={staggerItem}>
          <div className="card bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold">Active Programmes</h2>
              <Link href="/dashboard/programs" className="text-xs text-primary hover:text-primary-dark">View all</Link>
            </div>
            {loading ? (
              <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-12 rounded-lg" />)}</div>
            ) : (
              <>
                <div className="space-y-3">
                  {paginatedPrograms.map((prog) => (
                    <div key={prog.id} className="p-3 rounded-xl bg-surface-light">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">{prog.name}</p>
                        <span className="text-xs text-text-muted">{prog._count.enrollments} enrolled</span>
                      </div>
                      <p className="text-xs text-text-muted">{prog.category}</p>
                    </div>
                  ))}
                  {totalPrograms === 0 && (
                    <p className="text-sm text-text-muted text-center py-4">No programmes yet</p>
                  )}
                </div>
                {totalPrograms > PROGRAMS_PER_PAGE && (
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <span className="text-xs text-text-muted">
                      Showing {programStart}–{programEnd} of {totalPrograms}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        className="inline-flex items-center justify-center rounded-md text-xs font-medium border border-border bg-surface hover:bg-surface-muted disabled:opacity-50 disabled:pointer-events-none h-7 w-7"
                        onClick={() => setProgramPage((p) => Math.max(1, p - 1))}
                        disabled={programPage === 1}
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                      <button
                        className="inline-flex items-center justify-center rounded-md text-xs font-medium border border-border bg-surface hover:bg-surface-muted disabled:opacity-50 disabled:pointer-events-none h-7 w-7"
                        onClick={() => setProgramPage((p) => Math.min(totalProgramPages, p + 1))}
                        disabled={programPage === totalProgramPages}
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={staggerItem}>
          <div className="card bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Top Leads
              </h2>
              <Link href="/dashboard/leads" className="text-xs text-primary hover:text-primary-dark">View all</Link>
            </div>
            {loading ? (
              <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-12 rounded-lg" />)}</div>
            ) : (
              <div className="space-y-2">
                {(data?.topLeads || []).map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                    <div>
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-text-muted">{lead.source.replace('_', ' ')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{lead.score}</p>
                      <Badge variant={lead.status === 'WON' ? 'success' : lead.status === 'LOST' ? 'error' : 'primary'} size="sm">
                        {lead.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
                {(!data?.topLeads || data.topLeads.length === 0) && (
                  <p className="text-sm text-text-muted text-center py-4">No active leads</p>
                )}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div variants={staggerItem}>
          <div className="card bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Upcoming Tasks
              </h2>
              <Link href="/dashboard/projects" className="text-xs text-primary hover:text-primary-dark">View all</Link>
            </div>
            {loading ? (
              <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-12 rounded-lg" />)}</div>
            ) : (
              <div className="space-y-2">
                {(data?.upcomingTasks || []).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-text-muted">
                        {task.assignedTo?.name || 'Unassigned'}
                        {task.dueDate && ` • Due ${new Date(task.dueDate).toLocaleDateString('en-NG')}`}
                      </p>
                    </div>
                    <Badge
                      variant={task.priority === 'HIGH' || task.priority === 'URGENT' ? 'error' : task.priority === 'MEDIUM' ? 'warning' : 'primary'}
                      size="sm"
                    >
                      {task.priority.toLowerCase()}
                    </Badge>
                  </div>
                ))}
                {(!data?.upcomingTasks || data.upcomingTasks.length === 0) && (
                  <p className="text-sm text-text-muted text-center py-4">No upcoming tasks</p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div variants={staggerItem}>
        <div className="card bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              AI Agents
            </h2>
            <Link href="/dashboard/ai" className="text-xs text-primary hover:text-primary-dark">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {(data?.aiAgents || []).map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
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
            {(!data?.aiAgents || data.aiAgents.length === 0) && (
              <p className="text-sm text-text-muted text-center py-4 col-span-full">No AI agents configured</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
