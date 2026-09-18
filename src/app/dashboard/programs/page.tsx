'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Plus,
  Users,
  Award,
  TrendingUp,
  ChevronRight,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { formatCurrency } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Progress from '@/components/ui/progress'
import { useToast } from '@/components/ui/toast'
import AIInsight from '@/components/ui/ai-insight'

interface Program {
  id: string
  name: string
  description: string | null
  category: string | null
  duration: string | null
  price: number | null
  capacity: number | null
  isActive: boolean
  _count: { enrollments: number; assessments: number }
}

export default function ProgrammesPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetch('/api/programs')
      .then((res) => res.json())
      .then((d) => setPrograms(d.programs || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Programmes"
          description="Manage training programmes and cohorts"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Programmes' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Create programme form coming soon', 'info')}>New Programme</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Programmes" value={loading ? '...' : programs.filter(p => p.isActive).length.toString()} change="+3" changeType="up" icon={<GraduationCap className="w-5 h-5" />} />
        <StatCard title="Total Enrollments" value={loading ? '...' : programs.reduce((s, p) => s + p._count.enrollments, 0).toString()} change="+142" changeType="up" icon={<Users className="w-5 h-5" />} />
        <StatCard title="Total Assessments" value={loading ? '...' : programs.reduce((s, p) => s + p._count.assessments, 0).toString()} change="+12" changeType="up" icon={<Award className="w-5 h-5" />} />
        <StatCard title="Categories" value={loading ? '...' : new Set(programs.map(p => p.category).filter(Boolean)).size.toString()} change="+1" changeType="up" icon={<TrendingUp className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Programme Insight">
          <p>Programme data is synced from the database. {programs.length} programmes active with {programs.reduce((s, p) => s + p._count.enrollments, 0)} total enrollments.</p>
        </AIInsight>
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          [1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-48 rounded-2xl" />)
        ) : (
          programs.map((prog) => (
            <Card key={prog.id} hover padding="md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold">{prog.name}</h3>
                  <p className="text-xs text-text-muted mt-0.5">{prog.category || 'General'} {prog.duration ? `\u2022 ${prog.duration}` : ''} {prog.price ? `\u2022 ${formatCurrency(prog.price)}` : ''}</p>
                </div>
                <Badge variant="success" dot>Active</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Enrolled</p>
                  <p className="text-sm font-semibold">{prog._count.enrollments}{prog.capacity ? `/${prog.capacity}` : ''}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Assessments</p>
                  <p className="text-sm font-semibold">{prog._count.assessments}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider">Status</p>
                  <p className="text-sm font-semibold text-emerald-600">Active</p>
                </div>
              </div>
              {prog.capacity && (
                <Progress value={prog._count.enrollments} max={prog.capacity} showLabel size="sm" />
              )}
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold gradient-text">{prog._count.enrollments} enrolled</span>
                <button onClick={() => router.push(`/dashboard/programs/${prog.id}`)} className="text-xs text-primary hover:text-primary-dark flex items-center gap-1">
                  View Details <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </Card>
          ))
        )}
        {!loading && programs.length === 0 && (
          <div className="col-span-2 text-center py-12 text-sm text-text-muted">No programmes found. Create your first programme.</div>
        )}
      </motion.div>
    </motion.div>
  )
}
