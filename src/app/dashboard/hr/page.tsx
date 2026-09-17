'use client'

import { motion } from 'framer-motion'
import { Briefcase, Users, Calendar, TrendingUp, Award, Clock, ChevronRight, Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import Card from '@/components/ui/card'
import Progress from '@/components/ui/progress'

const employees = [
  { name: 'Chioma Nwosu', department: 'Customer Success', position: 'CS Manager', hireDate: 'Jan 2023', performance: 92, status: 'ACTIVE', kpis: 8 },
  { name: 'Emeka Okonkwo', department: 'Sales', position: 'Sales Lead', hireDate: 'Mar 2022', performance: 88, status: 'ACTIVE', kpis: 7 },
  { name: 'Aisha Abdullahi', department: 'Marketing', position: 'Marketing Manager', hireDate: 'Jun 2023', performance: 95, status: 'ACTIVE', kpis: 6 },
  { name: 'Tunde Bakare', department: 'Operations', position: 'Ops Coordinator', hireDate: 'Sep 2023', performance: 82, status: 'ACTIVE', kpis: 5 },
  { name: 'Blessing Okoro', department: 'Finance', position: 'Finance Analyst', hireDate: 'Feb 2024', performance: 90, status: 'ON_LEAVE', kpis: 6 },
]

const stats = [
  { title: 'Total Staff', value: '32', change: '+2', changeType: 'up' as const, icon: Users },
  { title: 'Active Employees', value: '28', change: '+1', changeType: 'up' as const, icon: Briefcase },
  { title: 'On Leave', value: '4', change: '0', changeType: 'neutral' as const, icon: Calendar },
  { title: 'Avg Performance', value: '89%', change: '+3%', changeType: 'up' as const, icon: TrendingUp },
]

const statusVariant: Record<string, 'success' | 'warning' | 'error'> = {
  ACTIVE: 'success',
  ON_LEAVE: 'warning',
  TERMINATED: 'error',
}

export default function HRPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="HR & People"
          description="Employee management, performance, and recruitment"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'HR' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />}>Add Employee</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<stat.icon className="w-5 h-5" />} />
        ))}
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold">Employee Directory</h3>
          </div>
          <div className="divide-y divide-border-light">
            {employees.map((emp) => (
              <div key={emp.name} className="px-6 py-4 flex items-center gap-4 hover:bg-surface-light transition-colors cursor-pointer">
                <Avatar name={emp.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{emp.name}</p>
                    <Badge variant={statusVariant[emp.status]} dot size="sm">{emp.status.replace('_', ' ')}</Badge>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">{emp.position} | {emp.department} | Joined {emp.hireDate}</p>
                </div>
                <div className="w-28">
                  <p className="text-[10px] text-text-muted mb-1">Performance: {emp.performance}%</p>
                  <Progress value={emp.performance} size="sm" color={emp.performance >= 90 ? 'success' : 'primary'} />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{emp.kpis}</p>
                  <p className="text-xs text-text-muted">KPIs</p>
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
