'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Bot,
  Rocket,
  HeartHandshake,
  Brain,
  Globe,
  Settings,
  Calculator,
  Users,
  Zap,
  Activity,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import AIInsight from '@/components/ui/ai-insight'
import Progress from '@/components/ui/progress'
import { useToast } from '@/components/ui/toast'

const agents = [
  {
    id: 'growth',
    name: 'Growth Agent',
    description: 'Marketing, lead generation, qualification, sales and conversion.',
    icon: Rocket,
    color: 'from-primary to-primary-light',
    status: 'Active',
    tasks: 147,
    success: 94.2,
    humanEscalations: 3,
    timeSaved: '24h',
    lastActivity: '10:47 AM',
  },
  {
    id: 'customer-success',
    name: 'Customer Success Agent',
    description: 'CRM, onboarding, support, customer experience and retention.',
    icon: HeartHandshake,
    color: 'from-secondary to-secondary-light',
    status: 'Active',
    tasks: 89,
    success: 91.8,
    humanEscalations: 5,
    timeSaved: '18h',
    lastActivity: '10:32 AM',
  },
  {
    id: 'learning',
    name: 'Learning Agent',
    description: 'Training programmes, participant engagement, assessments and learning workflows.',
    icon: Brain,
    color: 'from-emerald-500 to-emerald-400',
    status: 'Active',
    tasks: 124,
    success: 96.1,
    humanEscalations: 2,
    timeSaved: '32h',
    lastActivity: '10:45 AM',
  },
  {
    id: 'community',
    name: 'Community Agent',
    description: 'Alumni engagement, networking, opportunities and referrals.',
    icon: Globe,
    color: 'from-amber-500 to-amber-400',
    status: 'Active',
    tasks: 56,
    success: 89.3,
    humanEscalations: 1,
    timeSaved: '12h',
    lastActivity: '10:20 AM',
  },
  {
    id: 'operations',
    name: 'Operations Agent',
    description: 'Tasks, projects, SOPs, deadlines and operational coordination.',
    icon: Settings,
    color: 'from-violet-500 to-violet-400',
    status: 'Active',
    tasks: 203,
    success: 97.5,
    humanEscalations: 0,
    timeSaved: '45h',
    lastActivity: '10:50 AM',
  },
  {
    id: 'finance',
    name: 'Finance Agent',
    description: 'Payments, invoices, revenue tracking, financial alerts and reporting.',
    icon: Calculator,
    color: 'from-cyan-500 to-cyan-400',
    status: 'Active',
    tasks: 56,
    success: 98.5,
    humanEscalations: 1,
    timeSaved: '15h',
    lastActivity: '10:42 AM',
  },
  {
    id: 'people',
    name: 'People Agent',
    description: 'Recruitment, onboarding, staff records, KPIs, performance and workload.',
    icon: Users,
    color: 'from-pink-500 to-pink-400',
    status: 'Active',
    tasks: 34,
    success: 93.2,
    humanEscalations: 2,
    timeSaved: '8h',
    lastActivity: '10:15 AM',
  },
  {
    id: 'ceo-intelligence',
    name: 'CEO Intelligence Agent',
    description: 'Executive dashboards, insights, alerts, summaries and decision support.',
    icon: Zap,
    color: 'from-orange-500 to-orange-400',
    status: 'Active',
    tasks: 78,
    success: 95.8,
    humanEscalations: 0,
    timeSaved: '20h',
    lastActivity: '10:48 AM',
  },
]

const activityTimeline = [
  { time: '10:31', agent: 'Growth Agent', action: 'Qualified 14 leads from webinar funnel', type: 'success' },
  { time: '10:47', agent: 'Growth Agent', action: 'Sent follow-up sequence to 23 warm leads', type: 'success' },
  { time: '11:04', agent: 'Growth Agent', action: 'Escalated high-value opportunity (₦3.5M) to sales team', type: 'warning' },
  { time: '11:15', agent: 'Customer Success', action: 'Identified 3 at-risk customers and initiated outreach', type: 'success' },
  { time: '11:30', agent: 'Learning Agent', action: 'Sent reminder to 12 participants for upcoming session', type: 'success' },
  { time: '11:45', agent: 'Operations Agent', action: 'Updated 8 project statuses and notified stakeholders', type: 'success' },
]

export default function AIAgentsPage() {
  const router = useRouter()
  const { toast } = useToast()
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="AI Agents"
          description="Intelligent agents automating your business operations"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'AI Agents' }]}
          actions={<Button leftIcon={<Sparkles className="w-4 h-4" />} onClick={() => toast('AI Assistant is being prepared...', 'info')}>Open AI Assistant</Button>}
        />
      </motion.div>

      {/* Summary Stats */}
      <motion.div variants={staggerItem} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Actions Today', value: '787', icon: Activity, color: 'bg-primary/8 text-primary' },
          { label: 'Success Rate', value: '95.2%', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Human Escalations', value: '14', icon: Users, color: 'bg-amber-50 text-amber-600' },
          { label: 'Time Saved Today', value: '174h', icon: Clock, color: 'bg-violet-50 text-violet-600' },
        ].map((stat) => (
          <Card key={stat.label} padding="sm">
            <div className="flex items-center gap-3">
              <div className={cn('p-2 rounded-xl', stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-text-muted">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* AI Briefing */}
      <motion.div variants={staggerItem}>
        <AIInsight title="AI System Status">
          <p>All 8 agents are operational. Growth Agent processed 147 actions today with 94.2% success rate. 3 escalations require human review. Operations Agent saved the most time (45h) through automated task management.</p>
        </AIInsight>
      </motion.div>

      {/* Agent Grid */}
      <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id} hover padding="md" className="group">
            <div className="flex items-start justify-between mb-4">
              <div className={cn('p-2.5 rounded-xl bg-gradient-to-br', agent.color)}>
                <agent.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ai-pulse" />
                <span className="text-xs text-emerald-600 font-medium">{agent.status}</span>
              </div>
            </div>
            <h3 className="text-sm font-semibold mb-1">{agent.name}</h3>
            <p className="text-xs text-text-muted leading-relaxed mb-4">{agent.description}</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-[10px] text-text-muted uppercase">Tasks Today</p>
                <p className="text-sm font-semibold">{agent.tasks}</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase">Success</p>
                <p className="text-sm font-semibold text-emerald-600">{agent.success}%</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase">Escalations</p>
                <p className="text-sm font-semibold">{agent.humanEscalations}</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase">Time Saved</p>
                <p className="text-sm font-semibold text-primary">{agent.timeSaved}</p>
              </div>
            </div>
            <button onClick={() => { toast(`Opening ${agent.name}...`, 'info'); router.push(`/dashboard/ai/${agent.id}`) }} className="w-full flex items-center justify-center gap-1 text-xs text-primary hover:text-primary-dark font-medium py-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
              Open Agent <ChevronRight className="w-3 h-3" />
            </button>
          </Card>
        ))}
      </motion.div>

      {/* Activity Timeline */}
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-4">Recent Agent Activity</h3>
          <div className="space-y-0">
            {activityTimeline.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5">
                <span className="text-xs text-text-muted font-mono w-12 shrink-0 pt-0.5">{item.time}</span>
                <div className="flex flex-col items-center">
                  <div className={cn('w-2 h-2 rounded-full shrink-0', item.type === 'success' ? 'bg-emerald-500' : 'bg-amber-500')} />
                  {i < activityTimeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-primary">{item.agent}</p>
                  <p className="text-sm">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
