'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import KanbanBoard from '@/components/ui/kanban-board'
import { useToast } from '@/components/ui/toast'

export default function PipelinePage() {
  const { toast } = useToast()
  const [columns, setColumns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/pipeline')
      .then((res) => res.json())
      .then((d) => {
        setColumns(d.columns || d.items || d.data || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Sales Pipeline"
          description="Track opportunities through your sales pipeline"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Pipeline' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Create opportunity form coming soon', 'info')}>New Opportunity</Button>}
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
    </motion.div>
  )
}
