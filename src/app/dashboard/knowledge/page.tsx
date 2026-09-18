'use client'

import { motion } from 'framer-motion'
import { BookOpen, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'

const articles = [
  { title: 'Getting Started with CTAL AI', category: 'Guide', lastUpdated: '10 Aug 2025', views: 234 },
  { title: 'Programme Management Best Practices', category: 'Operations', lastUpdated: '8 Aug 2025', views: 189 },
  { title: 'Customer Success Playbook', category: 'Customer Success', lastUpdated: '5 Aug 2025', views: 156 },
]

export default function KnowledgePage() {
  const router = useRouter()
  const { toast } = useToast()

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Knowledge Base" description="Internal knowledge and documentation" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Knowledge Base' }]} actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Create article form coming soon', 'info')}>New Article</Button>} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <div className="space-y-3">
            {articles.map((a) => (
              <div key={a.title} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                <div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-text-muted">{a.category} | {a.lastUpdated}</p>
                </div>
                <span className="text-xs text-text-muted">{a.views} views</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
