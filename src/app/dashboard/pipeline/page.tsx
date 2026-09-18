'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import KanbanBoard from '@/components/ui/kanban-board'
import { useToast } from '@/components/ui/toast'

const columns = [
  { id: 'new', title: 'New', color: 'bg-blue-400', items: [{ id: '1', title: 'Enterprise Package', subtitle: '₦4.2M' }, { id: '2', title: 'Corporate Training', subtitle: '₦1.8M' }] },
  { id: 'qualified', title: 'Qualified', color: 'bg-amber-400', items: [{ id: '3', title: 'Leadership Programme', subtitle: '₦3.5M' }] },
  { id: 'proposal', title: 'Proposal', color: 'bg-emerald-400', items: [{ id: '4', title: 'Marketing Workshop', subtitle: '₦850K' }] },
  { id: 'won', title: 'Won', color: 'bg-emerald-600', items: [{ id: '5', title: 'TechCorp Training', subtitle: '₦2.4M' }] },
]

export default function PipelinePage() {
  const router = useRouter()
  const { toast } = useToast()

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
        <KanbanBoard columns={columns} />
      </motion.div>
    </motion.div>
  )
}
