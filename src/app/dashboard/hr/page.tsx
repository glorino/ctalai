'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Users, Calendar, TrendingUp, ChevronRight, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import Card from '@/components/ui/card'
import Progress from '@/components/ui/progress'
import { useToast } from '@/components/ui/toast'

interface Staff {
  id: string
  employeeId: string
  department: string
  position: string
  hireDate: string
  salary: number | null
  status: string
  user: { name: string; email: string; avatar: string | null }
  _count: { performances: number; leaveRequests: number; kpis: number }
}

interface HRData {
  staff: Staff[]
  stats: { status: string; _count: number }[]
}

const statusVariant: Record<string, 'success' | 'warning' | 'error'> = {
  ACTIVE: 'success',
  ON_LEAVE: 'warning',
  TERMINATED: 'error',
  SUSPENDED: 'error',
}

export default function HRPage() {
  const [data, setData] = useState<HRData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetch('/api/hr')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const activeCount = data?.stats.find((s) => s.status === 'ACTIVE')?._count || 0
  const onLeaveCount = data?.stats.find((s) => s.status === 'ON_LEAVE')?._count || 0

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="HR & People"
          description="Employee management, performance, and recruitment"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'HR' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Add employee form coming soon', 'info')}>Add Employee</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Staff" value={loading ? '...' : (data?.staff.length || 0).toString()} change="+2" changeType="up" icon={<Users className="w-5 h-5" />} />
        <StatCard title="Active Employees" value={loading ? '...' : activeCount.toString()} change="+1" changeType="up" icon={<Briefcase className="w-5 h-5" />} />
        <StatCard title="On Leave" value={loading ? '...' : onLeaveCount.toString()} change="0" changeType="neutral" icon={<Calendar className="w-5 h-5" />} />
        <StatCard title="Departments" value={loading ? '...' : new Set(data?.staff.map(s => s.department)).size.toString()} change="+1" changeType="up" icon={<TrendingUp className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold">Employee Directory</h3>
          </div>
          {loading ? (
            <div className="p-6 space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="divide-y divide-border-light">
              {(data?.staff || []).map((emp) => (
                <div key={emp.id} className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-surface-light transition-colors cursor-pointer">
                  <Avatar name={emp.user.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{emp.user.name}</p>
                      <Badge variant={statusVariant[emp.status] || 'neutral'} dot size="sm">{emp.status.replace('_', ' ')}</Badge>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{emp.position} | {emp.department}</p>
                  </div>
                  <div className="flex sm:flex-col sm:items-end gap-2 sm:gap-0">
                    <p className="text-sm font-semibold">{emp._count.kpis} KPIs</p>
                    <p className="text-xs text-text-muted">{emp._count.performances} reviews</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted shrink-0 hidden sm:block" />
                </div>
              ))}
              {(!data?.staff || data.staff.length === 0) && (
                <div className="px-6 py-8 text-center text-sm text-text-muted">No employees found</div>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
