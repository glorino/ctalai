'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Card from '@/components/ui/card'
import Progress from '@/components/ui/progress'
import Badge from '@/components/ui/badge'
import AIInsight from '@/components/ui/ai-insight'

export default function CustomerSuccessPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/customer-success')
      .then((res) => res.json())
      .then((d) => {
        setAccounts(d.items || d.accounts || d.data || [])
        setStats(d.stats || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

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
        {loading
          ? [1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-24 rounded-lg" />)
          : stats.map((stat: any) => (
              <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<Heart className="w-5 h-5" />} />
            ))
        }
      </motion.div>
      <motion.div variants={staggerItem}>
        <AIInsight title="AI Success Insight">
          <p>Chukwuma Eze has a health score of 45% and is at risk of churning. Recommend immediate outreach and personalised action plan. 3 customers have not engaged in over 2 weeks.</p>
        </AIInsight>
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-4">Customer Health Overview</h3>
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {accounts.map((acc: any) => (
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
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
