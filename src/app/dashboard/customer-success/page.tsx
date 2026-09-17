'use client'

import { motion } from 'framer-motion'
import { Heart, Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Progress from '@/components/ui/progress'
import Badge from '@/components/ui/badge'
import AIInsight from '@/components/ui/ai-insight'

const accounts = [
  { name: 'Adebayo Ogundimu', health: 87, engagement: 92, programme: 'Advanced Valuation', risk: 'Low' },
  { name: 'Fatima Al-Rashid', health: 78, engagement: 85, programme: 'Digital Marketing', risk: 'Low' },
  { name: 'Chukwuma Eze', health: 45, engagement: 52, programme: 'Leadership Academy', risk: 'High' },
  { name: 'Ibrahim Musa', health: 92, engagement: 88, programme: 'Advanced Valuation', risk: 'Low' },
]

export default function CustomerSuccessPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Customer Success"
          description="Customer health, engagement, and retention"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Customer Success' }]}
        />
      </motion.div>
      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Avg Health Score" value="78%" change="+5%" changeType="up" icon={<Heart className="w-5 h-5" />} />
        <StatCard title="At Risk" value="3" change="-1" changeType="up" icon={<Heart className="w-5 h-5" />} />
        <StatCard title="Retention Rate" value="87%" change="+3%" changeType="up" icon={<Heart className="w-5 h-5" />} />
        <StatCard title="NPS Score" value="72" change="+8" changeType="up" icon={<Heart className="w-5 h-5" />} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <AIInsight title="AI Success Insight">
          <p>Chukwuma Eze has a health score of 45% and is at risk of churning. Recommend immediate outreach and personalised action plan. 3 customers have not engaged in over 2 weeks.</p>
        </AIInsight>
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-4">Customer Health Overview</h3>
          <div className="space-y-3">
            {accounts.map((acc) => (
              <div key={acc.name} className="flex items-center gap-4 p-3 rounded-xl bg-surface-light">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{acc.name}</p>
                    <Badge variant={acc.risk === 'High' ? 'error' : 'success'} size="sm">{acc.risk} Risk</Badge>
                  </div>
                  <p className="text-xs text-text-muted">{acc.programme}</p>
                </div>
                <div className="w-32">
                  <p className="text-[10px] text-text-muted mb-1">Health: {acc.health}%</p>
                  <Progress value={acc.health} size="sm" color={acc.health >= 70 ? 'success' : acc.health >= 50 ? 'warning' : 'error'} />
                </div>
                <div className="w-32">
                  <p className="text-[10px] text-text-muted mb-1">Engagement: {acc.engagement}%</p>
                  <Progress value={acc.engagement} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
