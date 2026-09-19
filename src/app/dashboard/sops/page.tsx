'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FileCheck, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import Textarea from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast'

interface SOP {
  id: string
  title: string
  category: string
  description: string
  status: string
  createdAt: string
}

export default function SOPsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [sops, setSops] = useState<SOP[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: '', category: '', description: '', status: 'DRAFT' })
  const [submitting, setSubmitting] = useState(false)

  const fetchData = () => {
    setLoading(true)
    fetch('/api/sops')
      .then((res) => res.json())
      .then((d) => setSops(d.sops || d.items || d.data || []))
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
      const res = await fetch('/api/sops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast('Created successfully', 'success')
        setShowForm(false)
        setFormData({ title: '', category: '', description: '', status: 'DRAFT' })
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
        <PageHeader title="SOPs" description="Standard Operating Procedures" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'SOPs' }]} actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(true)}>New SOP</Button>} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {sops.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                  <div>
                    <p className="text-sm font-medium">{s.title}</p>
                    <p className="text-xs text-text-muted">{s.category} | {s.status}</p>
                  </div>
                  <span className="text-xs text-text-muted">{new Date(s.createdAt).toLocaleDateString('en-NG')}</span>
                </div>
              ))}
              {sops.length === 0 && (
                <p className="text-sm text-text-muted text-center py-4">No SOPs found</p>
              )}
            </div>
          )}
        </Card>
      </motion.div>

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Create SOP</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              <Input label="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              <Textarea label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} />
              <Select label="Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} options={[
                { value: 'DRAFT', label: 'Draft' },
                { value: 'ACTIVE', label: 'Active' },
                { value: 'ARCHIVED', label: 'Archived' },
              ]} />
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
