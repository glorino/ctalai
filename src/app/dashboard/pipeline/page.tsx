'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import KanbanBoard from '@/components/ui/kanban-board'
import { useToast } from '@/components/ui/toast'

export default function PipelinePage() {
  const { toast } = useToast()
  const [columns, setColumns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', value: '', stage: 'QUALIFICATION', source: '' })
  const [submitting, setSubmitting] = useState(false)

  const fetchData = () => {
    setLoading(true)
    fetch('/api/pipeline')
      .then((res) => res.json())
      .then((d) => {
        setColumns(d.columns || d.items || d.data || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, value: formData.value ? parseFloat(formData.value) : null }),
      })
      if (res.ok) {
        toast('Created successfully', 'success')
        setShowForm(false)
        setFormData({ name: '', value: '', stage: 'QUALIFICATION', source: '' })
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
        <PageHeader
          title="Sales Pipeline"
          description="Track opportunities through your sales pipeline"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Pipeline' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(true)}>New Opportunity</Button>}
        />
      </motion.div>
      <motion.div variants={staggerItem}>
        {loading ? (
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="skeleton h-8 rounded-lg" />
                <div className="skeleton h-20 rounded-lg" />
                <div className="skeleton h-20 rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <KanbanBoard columns={columns} />
        )}
      </motion.div>

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Create Opportunity</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              <Input label="Value" type="number" step="0.01" value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} />
              <Select label="Stage" value={formData.stage} onChange={(e) => setFormData({ ...formData, stage: e.target.value })} options={[
                { value: 'QUALIFICATION', label: 'Qualification' },
                { value: 'PROPOSAL', label: 'Proposal' },
                { value: 'NEGOTIATION', label: 'Negotiation' },
                { value: 'CLOSED_WON', label: 'Closed Won' },
                { value: 'CLOSED_LOST', label: 'Closed Lost' },
              ]} />
              <Input label="Source" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} />
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
