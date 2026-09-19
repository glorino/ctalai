'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Brain, Plus, Calendar, Target, TrendingUp, Users, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import Card from '@/components/ui/card'
import Progress from '@/components/ui/progress'
import AIInsight from '@/components/ui/ai-insight'
import { useToast } from '@/components/ui/toast'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'

interface CoachingSession {
  id: string
  scheduledAt: string
  duration: number
  status: string
  notes: string | null
  customer: { name: string; email: string | null }
  coach: { user: { name: string } } | null
}

interface CoachingData {
  sessions: CoachingSession[]
  stats: { status: string; _count: number }[]
}

const statusColor: Record<string, string> = {
  SCHEDULED: 'text-primary bg-primary/8',
  IN_PROGRESS: 'text-amber-600 bg-amber-50',
  COMPLETED: 'text-emerald-600 bg-emerald-50',
  CANCELLED: 'text-red-600 bg-red-50',
}

export default function CoachingPage() {
  const [data, setData] = useState<CoachingData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ customerId: '', coachName: '', duration: '60', goal: '', scheduledAt: '' })
  const [submitting, setSubmitting] = useState(false)
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([])

  const fetchData = useCallback(() => {
    fetch('/api/coaching')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  useEffect(() => {
    fetch('/api/crm')
      .then((res) => res.json())
      .then((data) => setCustomers((data.customers || []).map((c: any) => ({ id: c.id, name: c.name }))))
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.customerId) { toast('Customer is required', 'error'); return }
    if (!formData.goal.trim()) { toast('Goal is required', 'error'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/coaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast('Coaching session created successfully', 'success')
        setShowForm(false)
        setFormData({ customerId: '', coachName: '', duration: '60', goal: '', scheduledAt: '' })
        fetchData()
      } else {
        const data = await res.json()
        toast(data.error || 'Failed to create coaching session', 'error')
      }
    } catch {
      toast('Failed to create coaching session', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const scheduledCount = data?.stats.find((s) => s.status === 'SCHEDULED')?._count || 0
  const completedCount = data?.stats.find((s) => s.status === 'COMPLETED')?._count || 0

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Coaching & Mentoring"
          description="Client coaching, goals, and progress tracking"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Coaching' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(true)}>Add Client</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Sessions" value={loading ? '...' : (data?.sessions.length || 0).toString()} change="+5" changeType="up" icon={<Users className="w-5 h-5" />} />
        <StatCard title="Scheduled" value={loading ? '...' : scheduledCount.toString()} change="+3" changeType="up" icon={<Calendar className="w-5 h-5" />} />
        <StatCard title="Completed" value={loading ? '...' : completedCount.toString()} change="+8" changeType="up" icon={<Target className="w-5 h-5" />} />
        <StatCard title="Completion Rate" value={loading ? '...' : (data?.sessions.length ? `${Math.round((completedCount / data.sessions.length) * 100)}%` : '0%')} change="+5%" changeType="up" icon={<TrendingUp className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Coaching Insight">
          <p>Coaching data is synced from the database. {data?.sessions.length || 0} total sessions, {scheduledCount} scheduled, {completedCount} completed.</p>
        </AIInsight>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <Card padding="none">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-sm font-semibold">Coaching Sessions</h3>
            </div>
            {loading ? (
              <div className="p-6 space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
            ) : (
              <div className="divide-y divide-border-light">
                {(data?.sessions || []).map((session) => (
                  <div key={session.id} className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-surface-light transition-colors cursor-pointer">
                    <Avatar name={session.customer.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">{session.customer.name}</p>
                        <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', statusColor[session.status] || 'text-text-muted bg-surface-muted')}>{session.status.replace('_', ' ')}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">
                        {session.coach?.user?.name || 'Unassigned'} | {session.duration}min | {new Date(session.scheduledAt).toLocaleDateString('en-NG')}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted shrink-0 hidden sm:block" />
                  </div>
                ))}
                {(!data?.sessions || data.sessions.length === 0) && (
                  <div className="px-6 py-8 text-center text-sm text-text-muted">No coaching sessions found</div>
                )}
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card padding="md">
            <h3 className="text-sm font-semibold mb-4">Session Status</h3>
            <div className="space-y-3">
              {data?.stats.map((stat) => (
                <div key={stat.status} className="flex items-center justify-between py-2">
                  <span className="text-sm text-text-secondary">{stat.status.replace('_', ' ')}</span>
                  <span className="text-sm font-semibold">{stat._count}</span>
                </div>
              ))}
              {(!data?.stats || data.stats.length === 0) && (
                <p className="text-sm text-text-muted text-center py-4">No data yet</p>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Add Coaching Client</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Select label="Customer" value={formData.customerId} onChange={(e) => setFormData({ ...formData, customerId: e.target.value })} placeholder="Select customer" options={customers.map((c) => ({ value: c.id, label: c.name }))} />
              <Input label="Coach" value={formData.coachName} onChange={(e) => setFormData({ ...formData, coachName: e.target.value })} placeholder="Coach name" />
              <Input label="Duration (minutes)" type="number" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="60" />
              <Input label="Goal" required value={formData.goal} onChange={(e) => setFormData({ ...formData, goal: e.target.value })} placeholder="Coaching goal" />
              <Input label="Scheduled At" type="datetime-local" value={formData.scheduledAt} onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })} />
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" isLoading={submitting}>Create</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  )
}
