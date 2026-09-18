'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Card from '@/components/ui/card'

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/attendance')
      .then((res) => res.json())
      .then((d) => {
        setAttendance(d.items || d.attendance || d.data || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Attendance" description="Track attendance across all programmes" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Attendance' }]} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {attendance.map((a: any, i: number) => (
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
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
