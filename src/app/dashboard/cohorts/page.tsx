'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'

export default function CohortsPage() {
  const { toast } = useToast()
  const [cohorts, setCohorts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', programId: '', startDate: '', endDate: '', maxStudents: '' })
  const [submitting, setSubmitting] = useState(false)
  const [programs, setPrograms] = useState<{ id: string; name: string }[]>([])

  const fetchData = useCallback(() => {
    fetch('/api/cohorts')
      .then((res) => res.json())
      .then((d) => {
        setCohorts(d.cohorts || d.items || d.data || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  useEffect(() => {
    fetch('/api/programs')
      .then((res) => res.json())
      .then((data) => setPrograms((data.programs || []).map((p: any) => ({ id: p.id, name: p.name }))))
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) { toast('Name is required', 'error'); return }
    if (!formData.programId) { toast('Programme is required', 'error'); return }
    if (!formData.startDate) { toast('Start date is required', 'error'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/cohorts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast('Cohort created successfully', 'success')
        setShowForm(false)
        setFormData({ name: '', programId: '', startDate: '', endDate: '', maxStudents: '' })
        fetchData()
      } else {
        const data = await res.json()
        toast(data.error || 'Failed to create cohort', 'error')
      }
    } catch {
      toast('Failed to create cohort', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Cohorts"
          description="Manage training cohorts"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Cohorts' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(true)}>New Cohort</Button>}
        />
      </motion.div>
      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? [1, 2, 3].map((i) => <div key={i} className="skeleton h-28 rounded-lg" />)
          : cohorts.map((c: any) => (
              <Card key={c.id || c.name} hover padding="md">
                <h3 className="text-sm font-semibold">{c.name}</h3>
                <p className="text-xs text-text-muted mt-1">{c._count?.enrollments || 0}/{c.maxStudents || '?'} enrolled | {c.startDate ? new Date(c.startDate).toLocaleDateString() : ''} - {c.endDate ? new Date(c.endDate).toLocaleDateString() : ''}</p>
                <div className="mt-3 h-1.5 rounded-full bg-surface-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${c.maxStudents ? Math.min(((c._count?.enrollments || 0) / c.maxStudents) * 100, 100) : 0}%` }} />
                </div>
              </Card>
            ))
        }
      </motion.div>

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Create Cohort</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Cohort name" />
              <Select label="Programme" value={formData.programId} onChange={(e) => setFormData({ ...formData, programId: e.target.value })} placeholder="Select programme" options={programs.map((p) => ({ value: p.id, label: p.name }))} />
              <Input label="Start Date" type="date" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
              <Input label="End Date" type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
              <Input label="Max Participants" type="number" value={formData.maxStudents} onChange={(e) => setFormData({ ...formData, maxStudents: e.target.value })} placeholder="0" />
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
