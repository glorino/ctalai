'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'

export default function CohortsPage() {
  const { toast } = useToast()
  const [cohorts, setCohorts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cohorts')
      .then((res) => res.json())
      .then((d) => {
        setCohorts(d.items || d.cohorts || d.data || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

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
        {loading
          ? [1, 2, 3].map((i) => <div key={i} className="skeleton h-28 rounded-lg" />)
          : cohorts.map((c: any) => (
              <Card key={c.name} hover padding="md">
                <h3 className="text-sm font-semibold">{c.name}</h3>
                <p className="text-xs text-text-muted mt-1">{c.enrolled}/{c.capacity} enrolled | {c.startDate} - {c.endDate}</p>
                <div className="mt-3 h-1.5 rounded-full bg-surface-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(c.enrolled / c.capacity) * 100}%` }} />
                </div>
              </Card>
            ))
        }
      </motion.div>
    </motion.div>
  )
}
