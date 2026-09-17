'use client'

import { motion } from 'framer-motion'
import { Brain, Upload, Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import AIInsight from '@/components/ui/ai-insight'

const sources = [
  { name: 'Programme Catalogue', type: 'Document', items: 24, lastSync: '2 hours ago', status: 'Indexed' },
  { name: 'FAQ Database', type: 'FAQ', items: 156, lastSync: '1 hour ago', status: 'Indexed' },
  { name: 'Company Policies', type: 'Policy', items: 18, lastSync: '1 day ago', status: 'Indexed' },
  { name: 'Course Materials', type: 'Document', items: 89, lastSync: '3 hours ago', status: 'Indexed' },
]

export default function AIKnowledgePage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="AI Knowledge" description="Manage AI knowledge sources and grounding" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'AI Knowledge' }]} actions={<Button leftIcon={<Upload className="w-4 h-4" />}>Upload Document</Button>} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <AIInsight title="AI Knowledge Status">
          <p>AI Knowledge base contains 287 indexed items across 4 sources. Last sync was 2 hours ago. The AI agent answered 94% of questions using approved CTAL knowledge. 6% required general knowledge fallback.</p>
        </AIInsight>
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-4">Knowledge Sources</h3>
          <div className="space-y-3">
            {sources.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                <div>
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-xs text-text-muted">{s.type} | {s.items} items | Last sync: {s.lastSync}</p>
                </div>
                <Badge variant="success" size="sm">{s.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
