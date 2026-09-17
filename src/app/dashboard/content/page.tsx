'use client'

import { motion } from 'framer-motion'
import { FileText, Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Badge from '@/components/ui/badge'

const content = [
  { title: 'Top 10 Valuation Techniques', type: 'ARTICLE', status: 'PUBLISHED', date: '10 Aug 2025', views: 234 },
  { title: 'Digital Marketing Trends 2025', type: 'ARTICLE', status: 'PUBLISHED', date: '5 Aug 2025', views: 189 },
  { title: 'Webinar: Advanced Strategies', type: 'WEBINAR', status: 'DRAFT', date: '', views: 0 },
]

const statusVariant: Record<string, 'success' | 'warning' | 'neutral' | 'primary'> = {
  PUBLISHED: 'success',
  DRAFT: 'neutral',
  REVIEW: 'warning',
}

export default function ContentPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Content" description="Content management and publishing" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Content' }]} actions={<Button leftIcon={<Plus className="w-4 h-4" />}>New Content</Button>} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <div className="space-y-3">
            {content.map((c) => (
              <div key={c.title} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{c.title}</p>
                    <Badge variant={statusVariant[c.status]} size="sm">{c.status}</Badge>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">{c.type} | {c.date || 'No date'}</p>
                </div>
                <span className="text-xs text-text-muted">{c.views} views</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
