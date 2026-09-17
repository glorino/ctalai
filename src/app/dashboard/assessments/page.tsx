'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Card from '@/components/ui/card'

const assessments = [
  { title: 'Valuation Fundamentals Quiz', programme: 'Advanced Valuation', type: 'QUIZ', maxScore: 100, avgScore: 78, submissions: 28 },
  { title: 'Marketing Strategy Assignment', programme: 'Digital Marketing', type: 'ASSIGNMENT', maxScore: 50, avgScore: 42, submissions: 40 },
]

export default function AssessmentsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Assessments" description="Programme assessments and evaluations" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Assessments' }]} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <div className="space-y-3">
            {assessments.map((a) => (
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
        </Card>
      </motion.div>
    </motion.div>
  )
}
