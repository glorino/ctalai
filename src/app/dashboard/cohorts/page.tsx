'use client'

import { motion } from 'framer-motion'
import { Users, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'

const cohorts = [
  { name: 'Advanced Valuation - Cohort 7', programme: 'Advanced Valuation', enrolled: 32, capacity: 40, status: 'ACTIVE', startDate: '1 Jul 2025', endDate: '30 Sep 2025' },
  { name: 'Digital Marketing - Cohort 12', programme: 'Digital Marketing', enrolled: 45, capacity: 50, status: 'ACTIVE', startDate: '1 Aug 2025', endDate: '31 Oct 2025' },
  { name: 'Leadership Academy - Cohort 3', programme: 'Leadership Academy', enrolled: 28, capacity: 30, status: 'ACTIVE', startDate: '15 Jun 2025', endDate: '15 Oct 2025' },
]

export default function CohortsPage() {
  const router = useRouter()
  const { toast } = useToast()

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Cohorts"
          description="Manage training cohorts"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Cohorts' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Create cohort form coming soon', 'info')}>New Cohort</Button>}
        />
      </motion.div>
      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cohorts.map((c) => (
          <Card key={c.name} hover padding="md">
            <h3 className="text-sm font-semibold">{c.name}</h3>
            <p className="text-xs text-text-muted mt-1">{c.enrolled}/{c.capacity} enrolled | {c.startDate} - {c.endDate}</p>
            <div className="mt-3 h-1.5 rounded-full bg-surface-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${(c.enrolled / c.capacity) * 100}%` }} />
            </div>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  )
}
