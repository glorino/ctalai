'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Card from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import { ClipboardCheck, FileText, Award, TrendingUp } from 'lucide-react'

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<any[]>([])
  const [stats, setStats] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/assessments')
      .then((res) => res.json())
      .then((d) => {
        setAssessments(d.assessments || d.items || d.data || [])
        setStats(d.stats || {})
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const typeCounts = stats.typeCounts || {}
  const quizCount = typeCounts.QUIZ || 0
  const assignmentCount = typeCounts.ASSIGNMENT || 0
  const examCount = typeCounts.EXAM || 0

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Assessments" description="Programme assessments and evaluations" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Assessments' }]} />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? [1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-24 rounded-lg" />)
          : (
            <>
              <StatCard title="Total Assessments" value={(stats.total || assessments.length).toString()} change="" changeType="up" icon={<ClipboardCheck className="w-5 h-5" />} />
              <StatCard title="Quizzes" value={quizCount.toString()} change="" changeType="up" icon={<FileText className="w-5 h-5" />} />
              <StatCard title="Assignments" value={assignmentCount.toString()} change="" changeType="up" icon={<Award className="w-5 h-5" />} />
              <StatCard title="Exams" value={examCount.toString()} change="" changeType="up" icon={<TrendingUp className="w-5 h-5" />} />
            </>
          )
        }
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-4">Assessment List</h3>
          {loading ? (
            <div className="space-y-3">{[1, 2].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {assessments.map((a: any) => (
                <div key={a.id || a.title} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                  <div>
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-text-muted">{a.program?.name || a.programme || '—'} | {a.type} | {a.createdAt ? new Date(a.createdAt).toLocaleDateString('en-NG') : ''}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={a.type === 'EXAM' ? 'error' : a.type === 'QUIZ' ? 'primary' : 'neutral'} size="sm">{a.type}</Badge>
                    {a.maxScore && <p className="text-xs text-text-muted mt-1">Max: {a.maxScore}</p>}
                  </div>
                </div>
              ))}
              {assessments.length === 0 && (
                <p className="text-sm text-text-muted text-center py-4">No assessments found</p>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
