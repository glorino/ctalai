'use client'

import { motion } from 'framer-motion'
import { FolderKanban, Plus, Calendar, CheckCircle2, Clock, AlertTriangle, Users, TrendingUp } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import KanbanBoard from '@/components/ui/kanban-board'
import Progress from '@/components/ui/progress'

const projects = [
  { name: 'Website Redesign', status: 'ACTIVE', progress: 65, tasks: 24, completed: 16, budget: '₦2.5M', dueDate: '30 Sep 2025', team: ['Chioma', 'Emeka', 'Aisha'] },
  { name: 'CRM Integration', status: 'ACTIVE', progress: 40, tasks: 18, completed: 7, budget: '₦1.8M', dueDate: '15 Oct 2025', team: ['Tunde', 'Blessing'] },
  { name: 'Mobile App Development', status: 'PLANNING', progress: 15, tasks: 32, completed: 5, budget: '₦5.2M', dueDate: '31 Dec 2025', team: ['Chioma', 'Emeka', 'Aisha', 'Tunde'] },
  { name: 'Marketing Campaign Q3', status: 'COMPLETED', progress: 100, tasks: 12, completed: 12, budget: '₦800K', dueDate: '31 Aug 2025', team: ['Aisha'] },
]

const tasks = [
  { id: '1', title: 'Design system documentation', status: 'TODO', priority: 'HIGH', assignee: 'Chioma', due: '18 Aug' },
  { id: '2', title: 'API integration testing', status: 'IN_PROGRESS', priority: 'HIGH', assignee: 'Tunde', due: '20 Aug' },
  { id: '3', title: 'User research interviews', status: 'TODO', priority: 'MEDIUM', assignee: 'Emeka', due: '22 Aug' },
  { id: '4', title: 'Performance optimization', status: 'IN_REVIEW', priority: 'MEDIUM', assignee: 'Aisha', due: '19 Aug' },
  { id: '5', title: 'Security audit', status: 'TODO', priority: 'HIGH', assignee: 'Tunde', due: '25 Aug' },
  { id: '6', title: 'Content migration', status: 'DONE', priority: 'LOW', assignee: 'Blessing', due: '15 Aug' },
]

const kanbanColumns = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-400', items: tasks.filter(t => t.status === 'TODO').map(t => ({ id: t.id, title: t.title, subtitle: `Due: ${t.due}`, tags: [{ label: t.priority, color: t.priority === 'HIGH' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600' }] })) },
  { id: 'progress', title: 'In Progress', color: 'bg-blue-400', items: tasks.filter(t => t.status === 'IN_PROGRESS').map(t => ({ id: t.id, title: t.title, subtitle: `Due: ${t.due} | ${t.assignee}` })) },
  { id: 'review', title: 'In Review', color: 'bg-amber-400', items: tasks.filter(t => t.status === 'IN_REVIEW').map(t => ({ id: t.id, title: t.title, subtitle: `Reviewer: ${t.assignee}` })) },
  { id: 'done', title: 'Done', color: 'bg-emerald-400', items: tasks.filter(t => t.status === 'DONE').map(t => ({ id: t.id, title: t.title })) },
]

const statusVariant: Record<string, 'primary' | 'warning' | 'success' | 'neutral'> = {
  ACTIVE: 'primary',
  PLANNING: 'neutral',
  COMPLETED: 'success',
  ON_HOLD: 'warning',
}

export default function ProjectsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Projects"
          description="Project management and task tracking"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Projects' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />}>New Project</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Projects" value="3" change="+1" changeType="up" icon={<FolderKanban className="w-5 h-5" />} />
        <StatCard title="Open Tasks" value="14" change="-3" changeType="up" icon={<CheckCircle2 className="w-5 h-5" />} />
        <StatCard title="Overdue Tasks" value="2" change="+1" changeType="down" icon={<AlertTriangle className="w-5 h-5" />} />
        <StatCard title="Team Members" value="8" change="0" changeType="neutral" icon={<Users className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <KanbanBoard columns={kanbanColumns} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-4">Active Projects</h3>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.name} className="flex items-center gap-4 p-3 rounded-xl bg-surface-light hover:bg-surface-muted transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{proj.name}</p>
                    <Badge variant={statusVariant[proj.status]} size="sm">{proj.status}</Badge>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">Due: {proj.dueDate} | Budget: {proj.budget} | {proj.completed}/{proj.tasks} tasks</p>
                </div>
                <div className="w-24">
                  <Progress value={proj.progress} size="sm" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{proj.progress}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
