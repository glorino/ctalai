'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'

export default function SessionsPage() {
  const { toast } = useToast()
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/sessions')
      .then((res) => res.json())
      .then((d) => {
        setSessions(d.items || d.sessions || d.data || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Coaching Sessions" description="Upcoming and past coaching sessions" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Sessions' }]} actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Schedule session form coming soon', 'info')}>Schedule Session</Button>} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {sessions.map((s: any) => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                  <div>
                    <p className="text-sm font-medium">{s.client} with {s.coach}</p>
                    <p className="text-xs text-text-muted">{s.type} | {s.date} at {s.time}</p>
                  </div>
                  <span className="badge badge-primary">{s.status}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
