'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import AIInsight from '@/components/ui/ai-insight'
import { useToast } from '@/components/ui/toast'

export default function AIKnowledgePage() {
  const { toast } = useToast()
  const [sources, setSources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/ai-knowledge')
      .then((res) => res.json())
      .then((d) => {
        setSources(d.items || d.sources || d.data || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="AI Knowledge" description="Manage AI knowledge sources and grounding" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'AI Knowledge' }]} actions={<Button leftIcon={<Upload className="w-4 h-4" />} onClick={() => toast('Upload document form coming soon', 'info')}>Upload Document</Button>} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <AIInsight title="AI Knowledge Status">
          <p>AI Knowledge base contains 287 indexed items across 4 sources. Last sync was 2 hours ago. The AI agent answered 94% of questions using approved CTAL knowledge. 6% required general knowledge fallback.</p>
        </AIInsight>
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-4">Knowledge Sources</h3>
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {sources.map((s: any) => (
                <div key={s.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-text-muted">{s.type} | {s.items} items | Last sync: {s.lastSync}</p>
                  </div>
                  <Badge variant="success" size="sm">{s.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
