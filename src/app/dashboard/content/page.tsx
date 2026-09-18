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
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((d) => setContent(d.content || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Content"
          description="Content management and knowledge base"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Content' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Create content form coming soon', 'info')}>Create Content</Button>}
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
    </motion.div>
  )
}
