'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'

export default function OpportunitiesPage() {
  const { toast } = useToast()
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', value: '', stage: 'QUALIFICATION', source: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)

  const fetchData = useCallback(() => {
    fetch('/api/opportunities')
      .then((res) => res.json())
      .then((d) => {
        setOpportunities(d.opportunities || d.items || d.data || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) { toast('Name is required', 'error'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast('Opportunity created successfully', 'success')
        setShowForm(false)
        setFormData({ name: '', value: '', stage: 'QUALIFICATION', source: '', notes: '' })
        fetchData()
      } else {
        const data = await res.json()
        toast(data.error || 'Failed to create opportunity', 'error')
      }
    } catch {
      toast('Failed to create opportunity', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Opportunities"
          description="Track sales opportunities"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Opportunities' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(true)}>New Opportunity</Button>}
        />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {opportunities.map((opp: any) => (
                <div key={opp.id || opp.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                  <div>
                    <p className="text-sm font-medium">{opp.name}</p>
                    <p className="text-xs text-text-muted">{opp.stage} | {opp.probability || 0}% probability</p>
                  </div>
                  <Badge variant={opp.stage === 'CLOSED_WON' ? 'success' : opp.stage === 'CLOSED_LOST' ? 'error' : 'primary'}>{opp.value ? `₦${opp.value.toLocaleString()}` : '—'}</Badge>
                </div>
              ))}
              {!loading && opportunities.length === 0 && (
                <p className="text-sm text-text-muted text-center py-4">No opportunities found. Create your first one.</p>
              )}
            </div>
          )}
        </Card>
      </motion.div>

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Create Opportunity</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Opportunity name" />
              <Input label="Value" type="number" value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} placeholder="0.00" />
              <Select label="Stage" value={formData.stage} onChange={(e) => setFormData({ ...formData, stage: e.target.value })} options={[{ value: 'QUALIFICATION', label: 'Qualification' }, { value: 'NEEDS_ANALYSIS', label: 'Needs Analysis' }, { value: 'PROPOSAL', label: 'Proposal' }, { value: 'NEGOTIATION', label: 'Negotiation' }, { value: 'CLOSED_WON', label: 'Closed Won' }, { value: 'CLOSED_LOST', label: 'Closed Lost' }]} />
              <Input label="Source" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} placeholder="e.g. Referral, Website" />
              <Input label="Notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Additional notes" />
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
