'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Target, DollarSign, GraduationCap, Headphones, Calendar, Download } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import AIInsight from '@/components/ui/ai-insight'

const stats = [
  { title: 'Total Leads', value: '2,847', change: '+18.4%', changeType: 'up' as const, icon: Target },
  { title: 'Conversion Rate', value: '34.2%', change: '+2.1%', changeType: 'up' as const, icon: TrendingUp },
  { title: 'Revenue', value: '₦24.8M', change: '+18.4%', changeType: 'up' as const, icon: DollarSign },
  { title: 'Retention Rate', value: '87%', change: '+3%', changeType: 'up' as const, icon: Users },
]

const channelPerformance = [
  { channel: 'Webinars', leads: 342, conversions: 142, rate: '41.5%', revenue: '₦8.2M' },
  { channel: 'Referrals', leads: 198, conversions: 92, rate: '46.5%', revenue: '₦5.8M' },
  { channel: 'Website', leads: 524, conversions: 168, rate: '32.1%', revenue: '₦4.2M' },
  { channel: 'Social Media', leads: 412, conversions: 98, rate: '23.8%', revenue: '₦2.4M' },
  { channel: 'Paid Ads', leads: 287, conversions: 56, rate: '19.5%', revenue: '₦1.8M' },
  { channel: 'Events', leads: 156, conversions: 48, rate: '30.8%', revenue: '₦1.6M' },
]

const dateFilters = ['Today', '7 Days', '30 Days', '90 Days', 'Year']

export default function AnalyticsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Analytics"
          description="Business intelligence and performance analytics"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Analytics' }]}
          actions={
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-surface-muted rounded-lg p-0.5">
                {dateFilters.map((f) => (
                  <button key={f} className={cn('px-3 py-1.5 text-xs font-medium rounded-md transition-colors', f === '30 Days' ? 'bg-surface text-foreground shadow-sm' : 'text-text-muted hover:text-foreground')}>
                    {f}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<stat.icon className="w-5 h-5" />} />
        ))}
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Analytics Insight">
          <p>Webinar channel has the highest conversion rate at 41.5%. Referral leads convert at 46.5% but volume is low. Recommend incentivising referrals. Paid ads have the lowest ROI - consider reallocating budget to webinars.</p>
        </AIInsight>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={staggerItem}>
          <Card padding="md">
            <h3 className="text-sm font-semibold mb-4">Channel Performance</h3>
            <div className="space-y-3">
              {channelPerformance.map((ch) => (
                <div key={ch.channel} className="flex items-center gap-4">
                  <span className="text-sm text-text-secondary w-28 shrink-0">{ch.channel}</span>
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-surface-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${parseFloat(ch.rate)}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold w-16 text-right">{ch.rate}</span>
                  <span className="text-xs text-text-muted w-16 text-right">{ch.leads} leads</span>
                  <span className="text-xs font-medium w-16 text-right">{ch.revenue}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card padding="md">
            <h3 className="text-sm font-semibold mb-4">Key Metrics Summary</h3>
            <div className="space-y-4">
              {[
                { label: 'Lead to Customer Conversion', value: '34.2%', trend: '+2.1%', color: 'text-emerald-600' },
                { label: 'Customer Retention Rate', value: '87%', trend: '+3%', color: 'text-emerald-600' },
                { label: 'Programme Completion Rate', value: '82%', trend: '+5%', color: 'text-emerald-600' },
                { label: 'Customer Satisfaction', value: '4.8/5', trend: '+0.2', color: 'text-emerald-600' },
                { label: 'Avg Deal Size', value: '₦285K', trend: '+12%', color: 'text-emerald-600' },
                { label: 'Sales Cycle Length', value: '14 days', trend: '-2 days', color: 'text-emerald-600' },
                { label: 'Support Response Time', value: '2.4h', trend: '-18min', color: 'text-emerald-600' },
                { label: 'Net Promoter Score', value: '72', trend: '+8', color: 'text-emerald-600' },
              ].map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{metric.value}</span>
                    <span className={cn('text-xs font-medium', metric.color)}>{metric.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
