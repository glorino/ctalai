'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FolderKanban, Plus, CheckCircle2, AlertTriangle, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { formatCurrency } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Progress from '@/components/ui/progress'
import { useToast } from '@/components/ui/toast'

interface Project {
  id: string
  name: string
  description: string | null
  status: string
  progress: number
  budget: number | null
  spent: number
  startDate: string | null
  endDate: string | null
  _count: { tasks: number; risks: number }
  tasks: { id: string; status: string }[]
}

const statusVariant: Record<string, 'primary' | 'warning' | 'success' | 'neutral' | 'error'> = {
  ACTIVE: 'primary',
  PLANNING: 'neutral',
  COMPLETED: 'success',
  ON_HOLD: 'warning',
  CANCELLED: 'error',
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((d) => setProjects(d.projects || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const activeProjects = projects.filter((p) => p.status === 'ACTIVE')
  const openTasks = projects.reduce((s, p) => s + p.tasks.filter((t) => t.status !== 'DONE').length, 0)
  const overdueTasks = 0

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Projects"
          description="Project management and task tracking"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Projects' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Create project form coming soon', 'info')}>New Project</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Projects" value={loading ? '...' : activeProjects.length.toString()} change="+1" changeType="up" icon={<FolderKanban className="w-5 h-5" />} />
        <StatCard title="Open Tasks" value={loading ? '...' : openTasks.toString()} change="-3" changeType="up" icon={<CheckCircle2 className="w-5 h-5" />} />
        <StatCard title="Overdue Tasks" value={loading ? '...' : overdueTasks.toString()} change="+1" changeType="down" icon={<AlertTriangle className="w-5 h-5" />} />
        <StatCard title="Total Projects" value={loading ? '...' : projects.length.toString()} change="0" changeType="neutral" icon={<Users className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-4">Active Projects</h3>
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 rounded-xl bg-surface-light hover:bg-surface-muted transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{proj.name}</p>
                      <Badge variant={statusVariant[proj.status] || 'neutral'} size="sm">{proj.status}</Badge>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">
                      {proj.endDate ? `Due: ${new Date(proj.endDate).toLocaleDateString('en-NG')}` : 'No deadline'}
                      {proj.budget ? ` | Budget: ${formatCurrency(proj.budget)}` : ''}
                      {' | '}{proj.tasks.filter(t => t.status === 'DONE').length}/{proj._count.tasks} tasks
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-24">
                      <Progress value={proj.progress} size="sm" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{proj.progress}%</p>
                    </div>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="text-sm text-text-muted text-center py-4">No projects found</p>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
