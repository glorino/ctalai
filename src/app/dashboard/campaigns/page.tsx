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

export default function CampaignsPage() {
  const { toast } = useToast()
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', type: 'EMAIL', status: 'DRAFT', budget: '', startDate: '', endDate: '' })
  const [submitting, setSubmitting] = useState(false)

  const fetchData = useCallback(() => {
    fetch('/api/campaigns')
      .then((res) => res.json())
      .then((d) => {
        setCampaigns(d.items || d.campaigns || d.data || [])
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
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast('Campaign created successfully', 'success')
        setShowForm(false)
        setFormData({ name: '', type: 'EMAIL', status: 'DRAFT', budget: '', startDate: '', endDate: '' })
        fetchData()
      } else {
        const data = await res.json()
        toast(data.error || 'Failed to create campaign', 'error')
      }
    } catch {
      toast('Failed to create campaign', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Campaigns"
          description="Manage marketing campaigns across all channels"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Campaigns' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(true)}>New Campaign</Button>}
        />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {campaigns.map((c: any) => (
                <div key={c.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-text-muted">{c.type} | Reach: {c.reach?.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">{c.engagement}</span>
                    <span className="text-sm font-semibold">{c.conversions} conversions</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Create Campaign</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Campaign name" />
              <Select label="Type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} options={[{ value: 'EMAIL', label: 'Email' }, { value: 'WEBINAR', label: 'Webinar' }, { value: 'SOCIAL_MEDIA', label: 'Social Media' }, { value: 'PAID_AD', label: 'Paid Ad' }, { value: 'CONTENT', label: 'Content' }, { value: 'REFERRAL', label: 'Referral' }]} />
              <Select label="Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} options={[{ value: 'DRAFT', label: 'Draft' }, { value: 'SCHEDULED', label: 'Scheduled' }, { value: 'ACTIVE', label: 'Active' }, { value: 'PAUSED', label: 'Paused' }, { value: 'COMPLETED', label: 'Completed' }]} />
              <Input label="Budget" type="number" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} placeholder="0.00" />
              <Input label="Start Date" type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
              <Input label="End Date" type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
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
