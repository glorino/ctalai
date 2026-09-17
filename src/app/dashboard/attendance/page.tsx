'use client'

import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Card from '@/components/ui/card'

const attendance = [
  { date: '12 Aug 2025', programme: 'Advanced Valuation', cohort: 'Cohort 7', present: 28, absent: 3, late: 1 },
  { date: '11 Aug 2025', programme: 'Digital Marketing', cohort: 'Cohort 12', present: 42, absent: 2, late: 1 },
  { date: '10 Aug 2025', programme: 'Leadership Academy', cohort: 'Cohort 3', present: 26, absent: 1, late: 1 },
]

export default function AttendancePage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Attendance" description="Track attendance across all programmes" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Attendance' }]} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <div className="space-y-3">
            {attendance.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                <div>
                  <p className="text-sm font-medium">{a.programme} - {a.cohort}</p>
                  <p className="text-xs text-text-muted">{a.date}</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-emerald-600">{a.present} present</span>
                  <span className="text-red-500">{a.absent} absent</span>
                  <span className="text-amber-500">{a.late} late</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
