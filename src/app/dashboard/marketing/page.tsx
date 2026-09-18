'use client'

import { motion } from 'framer-motion'
import { Megaphone, Plus, Users, TrendingUp, Mail, MessageSquare, BarChart3 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Tabs from '@/components/ui/tabs'
import Progress from '@/components/ui/progress'
import AIInsight from '@/components/ui/ai-insight'
import { useToast } from '@/components/ui/toast'

const campaigns = [
  { name: 'August Webinar Series', channel: 'Email', audience: 'All Leads', status: 'ACTIVE', reach: 2840, engagement: 42, conversions: 124, revenue: '₦1.8M' },
  { name: 'Referral Programme', channel: 'Multi', audience: 'Customers', status: 'ACTIVE', reach: 1200, engagement: 35, conversions: 56, revenue: '₦820K' },
  { name: 'LinkedIn Thought Leadership', channel: 'Social', audience: 'Prospects', status: 'ACTIVE', reach: 5400, engagement: 28, conversions: 34, revenue: '₦480K' },
  { name: 'Retargeting Campaign', channel: 'Paid Ad', audience: 'Website Visitors', status: 'PAUSED', reach: 3200, engagement: 15, conversions: 18, revenue: '₦240K' },
]

const funnel = [
  { stage: 'Reach', value: 12000, pct: 100 },
  { stage: 'Engaged', value: 4800, pct: 40 },
  { stage: 'Leads', value: 847, pct: 7.1 },
  { stage: 'Qualified', value: 342, pct: 2.9 },
  { stage: 'Customers', value: 142, pct: 1.2 },
  { stage: 'Revenue', value: 248, pct: 0 },
]

const statusVariant: Record<string, 'success' | 'warning' | 'neutral'> = {
  ACTIVE: 'success',
  PAUSED: 'warning',
  COMPLETED: 'neutral',
}

const stats = [
  { title: 'Active Campaigns', value: '12', change: '+3', changeType: 'up' as const, icon: Megaphone },
  { title: 'Total Reach', value: '24.8K', change: '+4.2K', changeType: 'up' as const, icon: Users },
  { title: 'Engagement Rate', value: '32%', change: '+5%', changeType: 'up' as const, icon: TrendingUp },
  { title: 'Campaign Revenue', value: '₦3.4M', change: '+28%', changeType: 'up' as const, icon: BarChart3 },
]

export default function MarketingPage() {
  const router = useRouter()
  const { toast } = useToast()

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Marketing"
          description="Campaigns, audiences, and marketing analytics"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Marketing' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Create campaign form coming soon', 'info')}>New Campaign</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<stat.icon className="w-5 h-5" />} />
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <Card padding="md">
            <h3 className="text-sm font-semibold mb-4">Active Campaigns</h3>
            <div className="space-y-3">
              {campaigns.map((camp) => (
                <div key={camp.name} className="p-3 rounded-xl bg-surface-light hover:bg-surface-muted transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{camp.name}</p>
                      <Badge variant={statusVariant[camp.status]} size="sm">{camp.status}</Badge>
                    </div>
                    <span className="text-xs text-text-muted">{camp.channel} | {camp.audience}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div><p className="text-[10px] text-text-muted">Reach</p><p className="text-sm font-semibold">{camp.reach.toLocaleString()}</p></div>
                    <div><p className="text-[10px] text-text-muted">Engagement</p><p className="text-sm font-semibold">{camp.engagement}%</p></div>
                    <div><p className="text-[10px] text-text-muted">Conversions</p><p className="text-sm font-semibold">{camp.conversions}</p></div>
                    <div><p className="text-[10px] text-text-muted">Revenue</p><p className="text-sm font-semibold">{camp.revenue}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card padding="md">
            <h3 className="text-sm font-semibold mb-4">Conversion Funnel</h3>
            <div className="space-y-3">
              {funnel.map((step) => (
                <div key={step.stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">{step.stage}</span>
                    <span className="text-xs font-semibold">{step.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${step.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Marketing Insight">
          <p>Email campaigns have 2x higher conversion than social media. Recommend increasing email frequency. Webinar series generated ₦1.8M in revenue - consider monthly webinars. Retargeting campaign ROI is low - recommend pausing and testing new creatives.</p>
        </AIInsight>
      </motion.div>
    </motion.div>
  )
}
