'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { UserCheck, Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Avatar from '@/components/ui/avatar'
import Badge from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'
import Select from '@/components/ui/select'

export default function ParticipantsPage() {
  const { toast } = useToast()
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ customerId: '', programId: '', cohortId: '' })
  const [submitting, setSubmitting] = useState(false)
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([])
  const [programs, setPrograms] = useState<{ id: string; name: string }[]>([])
  const [cohorts, setCohorts] = useState<{ id: string; name: string }[]>([])

  const fetchData = useCallback(() => {
    fetch('/api/enrollments')
      .then((res) => res.json())
      .then((d) => {
        setEnrollments(d.enrollments || d.items || d.data || [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  useEffect(() => {
    fetch('/api/crm')
      .then((res) => res.json())
      .then((data) => setCustomers((data.customers || []).map((c: any) => ({ id: c.id, name: c.name }))))
      .catch(console.error)
    fetch('/api/programs')
      .then((res) => res.json())
      .then((data) => setPrograms((data.programs || []).map((p: any) => ({ id: p.id, name: p.name }))))
      .catch(console.error)
    fetch('/api/cohorts')
      .then((res) => res.json())
      .then((data) => setCohorts((data.cohorts || []).map((c: any) => ({ id: c.id, name: c.name }))))
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.customerId) { toast('Customer is required', 'error'); return }
    if (!formData.programId) { toast('Programme is required', 'error'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast('Participant enrolled successfully', 'success')
        setShowForm(false)
        setFormData({ customerId: '', programId: '', cohortId: '' })
        fetchData()
      } else {
        const data = await res.json()
        toast(data.error || 'Failed to enroll participant', 'error')
      }
    } catch {
      toast('Failed to enroll participant', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Participants"
          description="Manage programme participants"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Participants' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(true)}>Add Participant</Button>}
        />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="none">
          {loading ? (
            <div className="p-6 space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="divide-y divide-border-light">
              {enrollments.map((p: any) => (
                <div key={p.id} className="px-6 py-4 flex items-center gap-4 hover:bg-surface-light transition-colors">
                  <Avatar name={p.customer?.name || 'Unknown'} size="sm" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{p.customer?.name || 'Unknown'}</p>
                      <Badge variant={p.status === 'COMPLETED' ? 'success' : 'primary'} size="sm">{p.status === 'COMPLETED' ? 'Completed' : p.status === 'IN_PROGRESS' ? 'In Progress' : 'Enrolled'}</Badge>
                    </div>
                    <p className="text-xs text-text-muted">{p.program?.name || '—'} | {p.cohort?.name || '—'}</p>
                  </div>
                </div>
              ))}
              {enrollments.length === 0 && (
                <div className="px-6 py-8 text-center text-sm text-text-muted">No participants found. Enroll your first participant.</div>
              )}
            </div>
          )}
        </Card>
      </motion.div>

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Add Participant</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Select label="Customer" value={formData.customerId} onChange={(e) => setFormData({ ...formData, customerId: e.target.value })} placeholder="Select customer" options={customers.map((c) => ({ value: c.id, label: c.name }))} />
              <Select label="Programme" value={formData.programId} onChange={(e) => setFormData({ ...formData, programId: e.target.value })} placeholder="Select programme" options={programs.map((p) => ({ value: p.id, label: p.name }))} />
              <Select label="Cohort" value={formData.cohortId} onChange={(e) => setFormData({ ...formData, cohortId: e.target.value })} placeholder="Select cohort (optional)" options={cohorts.map((c) => ({ value: c.id, label: c.name }))} />
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" isLoading={submitting}>Enroll</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  )
}
