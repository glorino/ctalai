'use client'

import { motion } from 'framer-motion'
import { Handshake, Plus, TrendingUp, Calendar, FileText, AlertCircle, ChevronRight } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import Card from '@/components/ui/card'
import AIInsight from '@/components/ui/ai-insight'

const partners = [
  { name: 'Lagos Business School', type: 'ACADEMIC', status: 'ACTIVE', agreements: 2, value: '₦4.2M', meetings: 8, nextReview: '15 Sep 2025' },
  { name: 'Nigerian Ports Authority', type: 'GOVERNMENT', status: 'ACTIVE', agreements: 1, value: '₦8.5M', meetings: 4, nextReview: '30 Sep 2025' },
  { name: 'TechStart Nigeria', type: 'CORPORATE', status: 'PROSPECT', agreements: 0, value: '₦1.2M', meetings: 2, nextReview: '1 Sep 2025' },
  { name: 'AfDB Innovation Hub', type: 'NGO', status: 'ACTIVE', agreements: 1, value: '₦3.8M', meetings: 6, nextReview: '10 Oct 2025' },
  { name: 'Stanbic IBTC', type: 'CORPORATE', status: 'ACTIVE', agreements: 1, value: '₦5.4M', meetings: 10, nextReview: '20 Sep 2025' },
]

const statusVariant: Record<string, 'success' | 'warning' | 'primary' | 'neutral'> = {
  ACTIVE: 'success',
  PROSPECT: 'primary',
  INACTIVE: 'neutral',
  TERMINATED: 'error',
}

const stats = [
  { title: 'Total Partners', value: '18', change: '+3', changeType: 'up' as const, icon: Handshake },
  { title: 'Active Agreements', value: '12', change: '+2', changeType: 'up' as const, icon: FileText },
  { title: 'Partnership Revenue', value: '₦23.1M', change: '+35%', changeType: 'up' as const, icon: TrendingUp },
  { title: 'Meetings This Month', value: '24', change: '+6', changeType: 'up' as const, icon: Calendar },
]

export default function PartnersPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Partnerships"
          description="Partner management, agreements, and opportunities"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Partners' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />}>Add Partner</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<stat.icon className="w-5 h-5" />} />
        ))}
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Partnership Insight">
          <p>Stanbic IBTC is your highest-value partner with ₦5.4M in active agreements. Consider expanding the partnership to include co-branded programmes. TechStart Nigeria shows strong interest - schedule a discovery meeting this week.</p>
        </AIInsight>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold">Partners</h3>
          </div>
          <div className="divide-y divide-border-light">
            {partners.map((partner) => (
              <div key={partner.name} className="px-6 py-4 flex items-center gap-4 hover:bg-surface-light transition-colors cursor-pointer">
                <Avatar name={partner.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{partner.name}</p>
                    <Badge variant={statusVariant[partner.status]} dot size="sm">{partner.status}</Badge>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">{partner.type} | {partner.agreements} agreements | {partner.meetings} meetings</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{partner.value}</p>
                  <p className="text-xs text-text-muted">Next review: {partner.nextReview}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
