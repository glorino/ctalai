'use client'

import { motion } from 'framer-motion'
import { Brain, Plus, Calendar, Target, TrendingUp, Users, ChevronRight } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import Card from '@/components/ui/card'
import Progress from '@/components/ui/progress'
import AIInsight from '@/components/ui/ai-insight'

const clients = [
  { name: 'Adebayo Ogundimu', coach: 'Coach Emeka', goals: 5, completed: 4, progress: 80, nextSession: '15 Aug 2025', status: 'On Track' },
  { name: 'Fatima Al-Rashid', coach: 'Coach Chioma', goals: 4, completed: 3, progress: 75, nextSession: '16 Aug 2025', status: 'On Track' },
  { name: 'Chukwuma Eze', coach: 'Coach Emeka', goals: 6, completed: 2, progress: 33, nextSession: '14 Aug 2025', status: 'At Risk' },
  { name: 'Ngozi Okafor', coach: 'Coach Chioma', goals: 4, completed: 4, progress: 100, nextSession: 'Completed', status: 'Completed' },
  { name: 'Ibrahim Musa', coach: 'Coach Emeka', goals: 5, completed: 3, progress: 60, nextSession: '17 Aug 2025', status: 'On Track' },
]

const upcomingSessions = [
  { id: '1', client: 'Adebayo Ogundimu', coach: 'Coach Emeka', date: '15 Aug 2025', time: '10:00 AM', type: 'Progress Review' },
  { id: '2', client: 'Fatima Al-Rashid', coach: 'Coach Chioma', date: '16 Aug 2025', time: '2:00 PM', type: 'Goal Setting' },
  { id: '3', client: 'Chukwuma Eze', coach: 'Coach Emeka', date: '14 Aug 2025', time: '11:00 AM', type: 'Action Plan Review' },
]

const stats = [
  { title: 'Active Clients', value: '48', change: '+5', changeType: 'up' as const, icon: Users },
  { title: 'Sessions This Week', value: '24', change: '+3', changeType: 'up' as const, icon: Calendar },
  { title: 'Avg Progress', value: '72%', change: '+8%', changeType: 'up' as const, icon: TrendingUp },
  { title: 'Goals Completed', value: '156', change: '+22', changeType: 'up' as const, icon: Target },
]

const statusColor: Record<string, string> = {
  'On Track': 'text-emerald-600 bg-emerald-50',
  'At Risk': 'text-amber-600 bg-amber-50',
  'Completed': 'text-primary bg-primary/8',
}

export default function CoachingPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Coaching & Mentoring"
          description="Client coaching, goals, and progress tracking"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Coaching' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />}>Add Client</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<stat.icon className="w-5 h-5" />} />
        ))}
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Coaching Insight">
          <p>Client Chukwuma Eze has completed only 33% of their action plan and is at risk of disengaging. Recommend an intensive progress review session. Adebayo is on track with 80% completion - consider an advanced goal-setting session.</p>
        </AIInsight>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <Card padding="none">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-sm font-semibold">Client Progress</h3>
            </div>
            <div className="divide-y divide-border-light">
              {clients.map((client) => (
                <div key={client.name} className="px-6 py-4 flex items-center gap-4 hover:bg-surface-light transition-colors cursor-pointer">
                  <Avatar name={client.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{client.name}</p>
                      <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', statusColor[client.status])}>{client.status}</span>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{client.coach} | {client.completed}/{client.goals} goals | Next: {client.nextSession}</p>
                  </div>
                  <div className="w-24">
                    <Progress value={client.progress} size="sm" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card padding="md">
            <h3 className="text-sm font-semibold mb-4">Upcoming Sessions</h3>
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="p-3 rounded-xl bg-surface-light">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">{session.type}</span>
                  </div>
                  <p className="text-sm font-medium">{session.client}</p>
                  <p className="text-xs text-text-muted">{session.date} at {session.time}</p>
                  <p className="text-xs text-text-muted">{session.coach}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
