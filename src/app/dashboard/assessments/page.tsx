'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Card from '@/components/ui/card'

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/assessments')
      .then((res) => res.json())
      .then((d) => {
        setAssessments(d.items || d.assessments || d.data || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Assessments" description="Programme assessments and evaluations" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Assessments' }]} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          {loading ? (
            <div className="space-y-3">{[1, 2].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {assessments.map((a: any) => (
                <div key={a.title} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                  <div>
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-text-muted">{a.programme} | {a.type} | {a.submissions} submissions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{a.avgScore}/{a.maxScore}</p>
                    <p className="text-xs text-text-muted">avg score</p>
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
