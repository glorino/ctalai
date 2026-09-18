'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import AIInsight from '@/components/ui/ai-insight'

export default function CommunityPage() {
  const [stats, setStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/community')
      .then((res) => res.json())
      .then((d) => {
        setStats(d.stats || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Community" description="Community engagement and networking" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Community' }]} />
      </motion.div>
      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading
          ? [1, 2, 3].map((i) => <div key={i} className="skeleton h-24 rounded-lg" />)
          : stats.map((stat: any) => (
              <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<Users className="w-5 h-5" />} />
            ))
        }
      </motion.div>
      <motion.div variants={staggerItem}>
        <AIInsight title="AI Community Insight">
          <p>Community engagement increased by 15% this week. The alumni networking event generated 12 new connections. Consider hosting a monthly virtual meetup.</p>
        </AIInsight>
      </motion.div>
    </motion.div>
  )
}
