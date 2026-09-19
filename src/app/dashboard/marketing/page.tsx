'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Megaphone, Plus, Users, TrendingUp, BarChart3 } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import AIInsight from '@/components/ui/ai-insight'
import { useToast } from '@/components/ui/toast'

const statusVariant: Record<string, 'success' | 'warning' | 'neutral'> = {
  ACTIVE: 'success',
  PAUSED: 'warning',
  COMPLETED: 'neutral',
}

export default function MarketingPage() {
  const { toast } = useToast()
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [funnel, setFunnel] = useState<any[]>([])
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/marketing')
      .then((res) => res.json())
      .then((d) => {
        setCampaigns(d.campaigns || [])
        setFunnel(d.funnel || [])
        setStats(d.stats || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Marketing"
          description="Campaigns, audiences, and marketing analytics"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Marketing' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => window.location.href = '/dashboard/campaigns'}>New Campaign</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? [1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-24 rounded-lg" />)
          : stats.map((stat: any) => (
              <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<Megaphone className="w-5 h-5" />} />
            ))
        }
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <Card padding="md">
            <h3 className="text-sm font-semibold mb-4">Active Campaigns</h3>
            {loading ? (
              <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
            ) : (
              <div className="space-y-3">
                {campaigns.map((camp: any) => (
                  <div key={camp.name} className="p-3 rounded-xl bg-surface-light hover:bg-surface-muted transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{camp.name}</p>
                        <Badge variant={statusVariant[camp.status] || 'neutral'} size="sm">{camp.status}</Badge>
                      </div>
                      <span className="text-xs text-text-muted">{camp.channel} | {camp.audience}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div><p className="text-[10px] text-text-muted">Reach</p><p className="text-sm font-semibold">{camp.reach?.toLocaleString()}</p></div>
                      <div><p className="text-[10px] text-text-muted">Engagement</p><p className="text-sm font-semibold">{camp.engagement}%</p></div>
                      <div><p className="text-[10px] text-text-muted">Conversions</p><p className="text-sm font-semibold">{camp.conversions}</p></div>
                      <div><p className="text-[10px] text-text-muted">Revenue</p><p className="text-sm font-semibold">{camp.revenue}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card padding="md">
            <h3 className="text-sm font-semibold mb-4">Conversion Funnel</h3>
            {loading ? (
              <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-8 rounded-lg" />)}</div>
            ) : (
              <div className="space-y-3">
                {funnel.map((step: any) => (
                  <div key={step.stage}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-text-secondary">{step.stage}</span>
                      <span className="text-xs font-semibold">{step.value?.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${step.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Marketing Insight">
          <p>Email campaigns have higher conversion than social media. Recommend increasing email frequency. Webinar series show strong engagement - consider monthly webinars. Review underperforming campaigns and test new creatives.</p>
        </AIInsight>
      </motion.div>
    </motion.div>
  )
}
