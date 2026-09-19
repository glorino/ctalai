'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'

export default function SessionsPage() {
  const { toast } = useToast()
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ coachName: '', customer: '', duration: '60', date: '', goal: '' })
  const [submitting, setSubmitting] = useState(false)
  const [customers, setCustomers] = useState<any[]>([])

  const fetchData = () => {
    setLoading(true)
    fetch('/api/sessions')
      .then((res) => res.json())
      .then((d) => {
        setSessions(d.items || d.sessions || d.data || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
    fetch('/api/crm')
      .then((res) => res.json())
      .then((d) => setCustomers(d.customers || d.items || d.data || []))
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, duration: parseInt(formData.duration) }),
      })
      if (res.ok) {
        toast('Created successfully', 'success')
        setShowForm(false)
        setFormData({ coachName: '', customer: '', duration: '60', date: '', goal: '' })
        fetchData()
      } else {
        const data = await res.json()
        toast(data.error || 'Failed to create', 'error')
      }
    } catch {
      toast('Failed to create', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Coaching Sessions" description="Upcoming and past coaching sessions" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Sessions' }]} actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(true)}>Schedule Session</Button>} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {sessions.map((s: any) => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                  <div>
                    <p className="text-sm font-medium">{s.client} with {s.coach}</p>
                    <p className="text-xs text-text-muted">{s.type} | {s.date} at {s.time}</p>
                  </div>
                  <span className="badge badge-primary">{s.status}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Schedule Session</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Coach Name" value={formData.coachName} onChange={(e) => setFormData({ ...formData, coachName: e.target.value })} required />
              <Select label="Customer" value={formData.customer} onChange={(e) => setFormData({ ...formData, customer: e.target.value })} placeholder="Select a customer" options={customers.map((c: any) => ({ value: c.id || c.name, label: c.name }))} />
              <Input label="Duration (minutes)" type="number" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required />
              <Input label="Date" type="datetime-local" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
              <Input label="Goal" value={formData.goal} onChange={(e) => setFormData({ ...formData, goal: e.target.value })} />
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
