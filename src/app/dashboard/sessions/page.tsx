'use client'

import { motion } from 'framer-motion'
import { CalendarDays, Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'

const sessions = [
  { id: '1', client: 'Adebayo Ogundimu', coach: 'Coach Emeka', date: '15 Aug 2025', time: '10:00 AM', type: 'Progress Review', status: 'SCHEDULED' },
  { id: '2', client: 'Fatima Al-Rashid', coach: 'Coach Chioma', date: '16 Aug 2025', time: '2:00 PM', type: 'Goal Setting', status: 'SCHEDULED' },
  { id: '3', client: 'Chukwuma Eze', coach: 'Coach Emeka', date: '14 Aug 2025', time: '11:00 AM', type: 'Action Plan Review', status: 'SCHEDULED' },
]

export default function SessionsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Coaching Sessions" description="Upcoming and past coaching sessions" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Sessions' }]} actions={<Button leftIcon={<Plus className="w-4 h-4" />}>Schedule Session</Button>} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <div className="space-y-3">
            {sessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                <div>
                  <p className="text-sm font-medium">{s.client} with {s.coach}</p>
                  <p className="text-xs text-text-muted">{s.type} | {s.date} at {s.time}</p>
                </div>
                <span className="badge badge-primary">{s.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
