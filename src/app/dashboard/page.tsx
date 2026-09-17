'use client'

import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  DollarSign,
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Headphones,
  Sparkles,
  Calendar,
  Search,
  Bell,
  MoreHorizontal,
  Bot,
  Brain,
  ChevronRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import AIInsight from '@/components/ui/ai-insight'

const kpis = [
  {
    title: 'TOTAL CUSTOMERS',
    value: '2,481',
    change: '+12.8%',
    changeType: 'up' as const,
    vs: 'vs last month',
    icon: Users,
    color: 'primary',
    sparkline: [40, 45, 42, 50, 48, 55, 60, 58, 65, 70, 72, 78],
  },
  {
    title: 'ACTIVE LEADS',
    value: '847',
    change: '+18.4%',
    changeType: 'up' as const,
    vs: 'vs last month',
    icon: Target,
    color: 'secondary',
    sparkline: [20, 25, 30, 28, 35, 40, 38, 45, 50, 55, 58, 62],
  },
  {
    title: 'CONVERSION RATE',
    value: '34.2%',
    change: '+2.1%',
    changeType: 'up' as const,
    vs: 'vs last month',
    icon: TrendingUp,
    color: 'success',
    sparkline: [25, 28, 26, 30, 29, 32, 31, 33, 34, 33, 35, 34],
  },
  {
    title: 'REVENUE',
    value: '₦24.8M',
    change: '+18.4%',
    changeType: 'up' as const,
    vs: 'vs last month',
    icon: DollarSign,
    color: 'warning',
    sparkline: [30, 35, 32, 38, 42, 40, 45, 48, 50, 55, 58, 62],
  },
  {
    title: 'ACTIVE PROGRAMMES',
    value: '24',
    change: '+3',
    changeType: 'up' as const,
    vs: 'vs last month',
    icon: GraduationCap,
    color: 'primary',
    sparkline: [15, 16, 18, 17, 19, 20, 21, 20, 22, 23, 24, 24],
  },
  {
    title: 'CUSTOMER SATISFACTION',
    value: '4.8/5',
    change: '+0.2',
    changeType: 'up' as const,
    vs: 'vs last month',
    icon: Headphones,
    color: 'success',
    sparkline: [40, 42, 41, 43, 44, 43, 45, 46, 47, 48, 48, 48],
  },
]

const colorMap = {
  primary: { bg: 'bg-primary/8', text: 'text-primary', bar: 'from-primary to-primary-light' },
  secondary: { bg: 'bg-secondary/8', text: 'text-secondary', bar: 'from-secondary to-secondary-light' },
  success: { bg: 'bg-emerald-50', text: 'text-emerald-600', bar: 'from-emerald-500 to-emerald-400' },
  warning: { bg: 'bg-amber-50', text: 'text-amber-600', bar: 'from-amber-500 to-amber-400' },
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
      <polygon
        fill={`url(#spark-${color})`}
        points={`0,${h} ${points} ${w},${h}`}
      />
    </svg>
  )
}

const recentActivities = [
  { id: 1, type: 'lead', message: 'New lead captured from webinar: TechStart Nigeria', time: '2 min ago', icon: Target },
  { id: 2, type: 'enrollment', message: 'Sarah enrolled in Advanced Valuation Programme', time: '15 min ago', icon: GraduationCap },
  { id: 3, type: 'payment', message: 'Payment received: ₦125,000 from Tech Corp', time: '1 hour ago', icon: DollarSign },
  { id: 4, type: 'support', message: 'Ticket #1234 resolved by Agent Chioma', time: '2 hours ago', icon: CheckCircle2 },
  { id: 5, type: 'coaching', message: 'Coaching session completed with Adebayo', time: '3 hours ago', icon: Brain },
]

const priorityActions = [
  { id: 1, action: 'Follow up with 8 high-value leads', priority: 'high', icon: Target },
  { id: 2, action: 'Review declining engagement in Advanced Valuation Cohort', priority: 'medium', icon: AlertTriangle },
  { id: 3, action: 'Approve 2 pending partnership proposals', priority: 'medium', icon: CheckCircle2 },
]

const upcomingTasks = [
  { id: 1, task: 'Follow up with Lead #892', priority: 'high', due: 'Today' },
  { id: 2, task: 'Review programme curriculum', priority: 'medium', due: 'Tomorrow' },
  { id: 3, task: 'Prepare investor report', priority: 'high', due: 'In 3 days' },
  { id: 4, task: 'Team meeting preparation', priority: 'low', due: 'In 5 days' },
]

const topLeads = [
  { name: 'TechStart Nigeria', source: 'Webinar', score: 87, value: '₦2.4M' },
  { name: 'Lagos Business School', source: 'Referral', score: 82, value: '₦1.8M' },
  { name: 'Green Energy Co', source: 'Website', score: 76, value: '₦950K' },
]

const programmes = [
  { name: 'Advanced Valuation', cohort: 'Cohort 7', enrolled: 32, completion: 78 },
  { name: 'Digital Marketing', cohort: 'Cohort 12', enrolled: 45, completion: 92 },
  { name: 'Leadership Academy', cohort: 'Cohort 3', enrolled: 28, completion: 65 },
]

const agentStatus = [
  { name: 'Growth Agent', status: 'active', tasks: 147, success: 94.2 },
  { name: 'Customer Success', status: 'active', tasks: 89, success: 91.8 },
  { name: 'Learning Agent', status: 'active', tasks: 124, success: 96.1 },
  { name: 'Finance Agent', status: 'active', tasks: 56, success: 98.5 },
]

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good morning, John</h1>
          <p className="text-sm text-text-muted mt-0.5">Here&apos;s what is happening across CTAL today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Calendar className="w-4 h-4" />
          {today}
        </div>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => {
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
                  <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
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
            CTAL had a strong week. Lead volume increased by <strong>18%</strong>, while conversion improved by <strong>6.2%</strong>. 
            Three high-value opportunities require follow-up today. Revenue is trending upward with ₦4.2M collected this week.
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
            <Button size="sm" variant="outline">Review Actions</Button>
            <Button size="sm">Ask AI</Button>
          </div>
        </AIInsight>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <div className="card bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold">Recent Activity</h2>
              <button className="text-xs text-primary hover:text-primary-dark transition-colors">View all</button>
            </div>
            <div className="space-y-0">
              {recentActivities.map((a, i) => (
                <div key={a.id} className="flex items-start gap-3 py-3 group">
                  <div className="flex flex-col items-center">
                    <div className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', {
                      'bg-primary': a.type === 'lead',
                      'bg-emerald-500': a.type === 'enrollment' || a.type === 'support',
                      'bg-amber-500': a.type === 'payment',
                      'bg-secondary': a.type === 'coaching',
                    })} />
                    {i < recentActivities.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug">{a.message}</p>
                    <p className="text-xs text-text-muted mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div variants={staggerItem}>
          <div className="card bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-text-muted" />
                Upcoming Tasks
              </h2>
              <button className="text-xs text-primary hover:text-primary-dark transition-colors">View all</button>
            </div>
            <div className="space-y-2">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-3 rounded-xl bg-surface-light border border-border-light hover:border-border transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm leading-snug">{task.task}</p>
                    <Badge variant={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'neutral'} size="sm">
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-text-muted mt-1.5">Due: {task.due}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Second Row: Top Leads, Active Programmes, Agent Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Leads */}
        <motion.div variants={staggerItem}>
          <div className="card bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold">Top Leads</h2>
              <button className="text-xs text-primary hover:text-primary-dark">View all</button>
            </div>
            <div className="space-y-3">
              {topLeads.map((lead, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                  <div>
                    <p className="text-sm font-medium">{lead.name}</p>
                    <p className="text-xs text-text-muted mt-0.5">{lead.source}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{lead.value}</p>
                    <p className="text-xs text-text-muted">Score: {lead.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Active Programmes */}
        <motion.div variants={staggerItem}>
          <div className="card bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold">Active Programmes</h2>
              <button className="text-xs text-primary hover:text-primary-dark">View all</button>
            </div>
            <div className="space-y-3">
              {programmes.map((prog, i) => (
                <div key={i} className="p-3 rounded-xl bg-surface-light">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium">{prog.name}</p>
                      <p className="text-xs text-text-muted">{prog.cohort} • {prog.enrolled} enrolled</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">{prog.completion}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-border">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${prog.completion}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Agent Status */}
        <motion.div variants={staggerItem}>
          <div className="card bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                AI Agents
              </h2>
              <button className="text-xs text-primary hover:text-primary-dark">View all</button>
            </div>
            <div className="space-y-2">
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
      </div>
    </motion.div>
  )
}
