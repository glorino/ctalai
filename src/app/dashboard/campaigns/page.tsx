'use client'

import { motion } from 'framer-motion'
import { Megaphone, Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import EmptyState from '@/components/ui/empty-state'

const campaigns = [
  { name: 'August Webinar Series', type: 'EMAIL', status: 'ACTIVE', reach: 2840, engagement: '42%', conversions: 124 },
  { name: 'Referral Programme', type: 'MULTI', status: 'ACTIVE', reach: 1200, engagement: '35%', conversions: 56 },
  { name: 'LinkedIn Thought Leadership', type: 'SOCIAL', status: 'ACTIVE', reach: 5400, engagement: '28%', conversions: 34 },
]

export default function CampaignsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Campaigns"
          description="Manage marketing campaigns across all channels"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Campaigns' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />}>New Campaign</Button>}
        />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <div className="space-y-3">
            {campaigns.map((c) => (
              <div key={c.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-text-muted">{c.type} | Reach: {c.reach.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm">{c.engagement}</span>
                  <span className="text-sm font-semibold">{c.conversions} conversions</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
