'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Plus,
  Users,
  Award,
  TrendingUp,
  ChevronRight,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { formatCurrency } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Progress from '@/components/ui/progress'
import { useToast } from '@/components/ui/toast'
import AIInsight from '@/components/ui/ai-insight'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'

interface Program {
  id: string
  name: string
  description: string | null
  category: string | null
  duration: string | null
  price: number | null
  capacity: number | null
  isActive: boolean
  _count: { enrollments: number; assessments: number }
}

export default function ProgrammesPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', category: 'STRATEGY', duration: '', price: '', capacity: '' })
  const [submitting, setSubmitting] = useState(false)

  const fetchData = useCallback(() => {
    fetch('/api/programs')
      .then((res) => res.json())
      .then((d) => setPrograms(d.programs || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) { toast('Name is required', 'error'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          duration: formData.duration,
          price: formData.price ? parseFloat(formData.price) : null,
          capacity: formData.capacity ? parseInt(formData.capacity) : null,
        }),
      })
      if (res.ok) {
        toast('Programme created successfully', 'success')
        setShowForm(false)
        setFormData({ name: '', category: 'STRATEGY', duration: '', price: '', capacity: '' })
        fetchData()
      } else {
        const data = await res.json()
        toast(data.error || 'Failed to create programme', 'error')
      }
    } catch {
      toast('Failed to create programme', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Programmes"
          description="Manage training programmes and cohorts"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Programmes' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(true)}>New Programme</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Programmes" value={loading ? '...' : programs.filter(p => p.isActive).length.toString()} change="+3" changeType="up" icon={<GraduationCap className="w-5 h-5" />} />
        <StatCard title="Total Enrollments" value={loading ? '...' : programs.reduce((s, p) => s + p._count.enrollments, 0).toString()} change="+142" changeType="up" icon={<Users className="w-5 h-5" />} />
        <StatCard title="Total Assessments" value={loading ? '...' : programs.reduce((s, p) => s + p._count.assessments, 0).toString()} change="+12" changeType="up" icon={<Award className="w-5 h-5" />} />
        <StatCard title="Categories" value={loading ? '...' : new Set(programs.map(p => p.category).filter(Boolean)).size.toString()} change="+1" changeType="up" icon={<TrendingUp className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Programme Insight">
          <p>Programme data is synced from the database. {programs.length} programmes active with {programs.reduce((s, p) => s + p._count.enrollments, 0)} total enrollments.</p>
        </AIInsight>
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          [1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-48 rounded-2xl" />)
        ) : (
          programs.map((prog) => (
            <Card key={prog.id} hover padding="md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold">{prog.name}</h3>
                  <p className="text-xs text-text-muted mt-0.5">{prog.category || 'General'} {prog.duration ? `\u2022 ${prog.duration}` : ''} {prog.price ? `\u2022 ${formatCurrency(prog.price)}` : ''}</p>
                </div>
                <Badge variant="success" dot>Active</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Enrolled</p>
                  <p className="text-sm font-semibold">{prog._count.enrollments}{prog.capacity ? `/${prog.capacity}` : ''}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Assessments</p>
                  <p className="text-sm font-semibold">{prog._count.assessments}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Status</p>
                  <p className="text-sm font-semibold text-emerald-600">Active</p>
                </div>
              </div>
              {prog.capacity && (
                <Progress value={prog._count.enrollments} max={prog.capacity} showLabel size="sm" />
              )}
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold gradient-text">{prog._count.enrollments} enrolled</span>
                <button onClick={() => toast(`Programme: ${prog.name} — ${prog._count.enrollments} enrolled`, 'info')} className="text-xs text-primary hover:text-primary-dark flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </Card>
          ))
        )}
        {!loading && programs.length === 0 && (
          <div className="col-span-2 text-center py-12 text-sm text-text-muted">No programmes found. Create your first programme.</div>
        )}
      </motion.div>

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Create Programme</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Programme name" />
              <Select label="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} options={[{ value: 'STRATEGY', label: 'Strategy' }, { value: 'TECHNOLOGY', label: 'Technology' }, { value: 'FINANCE', label: 'Finance' }, { value: 'MARKETING', label: 'Marketing' }, { value: 'LEADERSHIP', label: 'Leadership' }]} />
              <Input label="Duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g. 8 weeks" />
              <Input label="Fee" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="0.00" />
              <Input label="Max Enrolments" type="number" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} placeholder="0" />
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
