'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Card from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import { CheckCircle2, XCircle, Clock, Users } from 'lucide-react'
import { useToast } from '@/components/ui/toast'

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<any[]>([])
  const [stats, setStats] = useState<{ status: string; _count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/attendance')
      .then((res) => res.json())
      .then((d) => {
        setAttendance(d.attendance || d.items || d.data || [])
        setStats(d.stats || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const presentCount = stats.find((s) => s.status === 'PRESENT')?._count || 0
  const absentCount = stats.find((s) => s.status === 'ABSENT')?._count || 0
  const lateCount = stats.find((s) => s.status === 'LATE')?._count || 0

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Attendance" description="Track attendance across all programmes" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Attendance' }]} />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? [1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-24 rounded-lg" />)
          : (
            <>
              <StatCard title="Total Records" value={attendance.length.toString()} change="" changeType="up" icon={<Users className="w-5 h-5" />} />
              <StatCard title="Present" value={presentCount.toString()} change="" changeType="up" icon={<CheckCircle2 className="w-5 h-5" />} />
              <StatCard title="Absent" value={absentCount.toString()} change="" changeType="down" icon={<XCircle className="w-5 h-5" />} />
              <StatCard title="Late" value={lateCount.toString()} change="" changeType="up" icon={<Clock className="w-5 h-5" />} />
            </>
          )
        }
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-4">Attendance Records</h3>
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {attendance.map((a: any, i: number) => (
                <div key={a.id || i} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                  <div>
                    <p className="text-sm font-medium">{a.cohort?.program?.name || a.programme || '—'} - {a.cohort?.name || a.cohort || '—'}</p>
                    <p className="text-xs text-text-muted">{a.date ? new Date(a.date).toLocaleDateString('en-NG') : a.date || '—'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={a.status === 'PRESENT' ? 'success' : a.status === 'ABSENT' ? 'error' : a.status === 'LATE' ? 'warning' : 'neutral'} dot size="sm">{(a.status || '—').replace('_', ' ')}</Badge>
                    {a.notes && <span className="text-xs text-text-muted">{a.notes}</span>}
                  </div>
                </div>
              ))}
              {attendance.length === 0 && (
                <p className="text-sm text-text-muted text-center py-4">No attendance records found</p>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
