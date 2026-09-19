'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Timeline from '@/components/ui/timeline'
import { useToast } from '@/components/ui/toast'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'

export default function OnboardingPage() {
  const { toast } = useToast()
  const [onboardingSteps, setOnboardingSteps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ customerId: '', programId: '', startDate: '', status: 'NOT_STARTED' })
  const [submitting, setSubmitting] = useState(false)
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([])
  const [programs, setPrograms] = useState<{ id: string; name: string }[]>([])

  const fetchData = useCallback(() => {
    fetch('/api/crm')
      .then((res) => res.json())
      .then((d) => {
        setOnboardingSteps(d.items || d.onboardingSteps || d.data || [])
      })
      .catch(console.error)
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
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.customerId) { toast('Customer is required', 'error'); return }
    if (!formData.programId) { toast('Programme is required', 'error'); return }
    if (!formData.startDate) { toast('Start date is required', 'error'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast('Onboarding created successfully', 'success')
        setShowForm(false)
        setFormData({ customerId: '', programId: '', startDate: '', status: 'NOT_STARTED' })
        fetchData()
      } else {
        const data = await res.json()
        toast(data.error || 'Failed to create onboarding', 'error')
      }
    } catch {
      toast('Failed to create onboarding', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Onboarding"
          description="Customer onboarding workflow management"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Onboarding' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(true)}>New Onboarding</Button>}
        />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-6">Onboarding Workflow</h3>
          {loading ? (
            <div className="space-y-3">{[1, 2, 3, 4, 5].map((i) => <div key={i} className="skeleton h-12 rounded-lg" />)}</div>
          ) : (
            <Timeline items={onboardingSteps.map((s: any) => ({ ...s, icon: s.status === 'completed' ? <span className="text-white text-xs">✓</span> : undefined }))} />
          )}
        </Card>
      </motion.div>

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Create Onboarding</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Select label="Customer" value={formData.customerId} onChange={(e) => setFormData({ ...formData, customerId: e.target.value })} placeholder="Select customer" options={customers.map((c) => ({ value: c.id, label: c.name }))} />
              <Select label="Programme" value={formData.programId} onChange={(e) => setFormData({ ...formData, programId: e.target.value })} placeholder="Select programme" options={programs.map((p) => ({ value: p.id, label: p.name }))} />
              <Input label="Start Date" type="date" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
              <Select label="Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} options={[{ value: 'NOT_STARTED', label: 'Not Started' }, { value: 'IN_PROGRESS', label: 'In Progress' }, { value: 'COMPLETED', label: 'Completed' }]} />
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
