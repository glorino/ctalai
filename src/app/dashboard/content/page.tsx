'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Plus, Clock, CheckCircle2, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'

interface ContentItem {
  id: string
  title: string
  type: string
  status: string
  tags: string[]
  createdAt: string
  publishedAt: string | null
}

const statusVariant: Record<string, 'success' | 'warning' | 'neutral' | 'primary'> = {
  PUBLISHED: 'success',
  DRAFT: 'neutral',
  REVIEW: 'warning',
  APPROVED: 'primary',
  ARCHIVED: 'neutral',
}

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: '', type: 'ARTICLE', category: '', status: 'DRAFT' })
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const fetchData = () => {
    setLoading(true)
    fetch('/api/content')
      .then((res) => res.json())
      .then((d) => setContent(d.content || []))
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
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast('Created successfully', 'success')
        setShowForm(false)
        setFormData({ title: '', type: 'ARTICLE', category: '', status: 'DRAFT' })
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
          title="Content"
          description="Content management and knowledge base"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Content' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(true)}>Create Content</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Content" value={loading ? '...' : content.length.toString()} change="+12" changeType="up" icon={<FileText className="w-5 h-5" />} />
        <StatCard title="Published" value={loading ? '...' : content.filter(c => c.status === 'PUBLISHED').length.toString()} change="+5" changeType="up" icon={<CheckCircle2 className="w-5 h-5" />} />
        <StatCard title="Drafts" value={loading ? '...' : content.filter(c => c.status === 'DRAFT').length.toString()} change="+3" changeType="up" icon={<Clock className="w-5 h-5" />} />
        <StatCard title="In Review" value={loading ? '...' : content.filter(c => c.status === 'REVIEW').length.toString()} change="+2" changeType="up" icon={<Eye className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold">All Content</h3>
          </div>
          {loading ? (
            <div className="p-6 space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="divide-y divide-border-light">
              {content.map((item) => (
                <div key={item.id} className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-surface-light transition-colors cursor-pointer">
                  <FileText className="w-5 h-5 text-text-muted shrink-0 hidden sm:block" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-text-muted mt-0.5">{item.type} {item.tags.length > 0 ? `\u2022 ${item.tags.join(', ')}` : ''}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant[item.status] || 'neutral'} dot>{item.status}</Badge>
                    <span className="text-xs text-text-muted">{new Date(item.createdAt).toLocaleDateString('en-NG')}</span>
                  </div>
                </div>
              ))}
              {content.length === 0 && (
                <div className="px-6 py-8 text-center text-sm text-text-muted">No content found. Create your first piece of content.</div>
              )}
            </div>
          )}
        </Card>
      </motion.div>

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Create Content</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              <Select label="Type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} options={[
                { value: 'ARTICLE', label: 'Article' },
                { value: 'VIDEO', label: 'Video' },
                { value: 'DOCUMENT', label: 'Document' },
                { value: 'TEMPLATE', label: 'Template' },
              ]} />
              <Input label="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              <Select label="Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} options={[
                { value: 'DRAFT', label: 'Draft' },
                { value: 'PUBLISHED', label: 'Published' },
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
