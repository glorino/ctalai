'use client'

import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Card from '@/components/ui/card'
import AIInsight from '@/components/ui/ai-insight'

export default function CommunityPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Community" description="Community engagement and networking" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Community' }]} />
      </motion.div>
      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Community Members" value="892" change="+45" changeType="up" icon={<Users className="w-5 h-5" />} />
        <StatCard title="Posts This Week" value="34" change="+8" changeType="up" icon={<Users className="w-5 h-5" />} />
        <StatCard title="Engagement Rate" value="68%" change="+5%" changeType="up" icon={<Users className="w-5 h-5" />} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <AIInsight title="AI Community Insight">
          <p>Community engagement increased by 15% this week. The alumni networking event generated 12 new connections. Consider hosting a monthly virtual meetup.</p>
        </AIInsight>
      </motion.div>
    </motion.div>
  )
}
