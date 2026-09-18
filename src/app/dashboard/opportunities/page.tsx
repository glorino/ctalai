'use client'

import { motion } from 'framer-motion'
import { Zap, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'

const opportunities = [
  { name: 'NPA Enterprise Training', value: '₦8.5M', stage: 'Negotiation', probability: 75, owner: 'Chioma' },
  { name: 'LBS Research Partnership', value: '₦4.2M', stage: 'Proposal', probability: 60, owner: 'Emeka' },
  { name: 'TechStart Onboarding', value: '₦2.4M', stage: 'Discovery', probability: 40, owner: 'Chioma' },
]

export default function OpportunitiesPage() {
  const router = useRouter()
  const { toast } = useToast()

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Opportunities"
          description="Track sales opportunities"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Opportunities' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Create opportunity form coming soon', 'info')}>New Opportunity</Button>}
        />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <div className="space-y-3">
            {opportunities.map((opp) => (
              <div key={opp.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                <div>
                  <p className="text-sm font-medium">{opp.name}</p>
                  <p className="text-xs text-text-muted">{opp.stage} | Owner: {opp.owner} | {opp.probability}% probability</p>
                </div>
                <span className="text-sm font-semibold">{opp.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
