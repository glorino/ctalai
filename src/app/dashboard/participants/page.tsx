'use client'

import { motion } from 'framer-motion'
import { UserCheck, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Avatar from '@/components/ui/avatar'
import Badge from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'

const participants = [
  { name: 'Adebayo Ogundimu', programme: 'Advanced Valuation', cohort: 'Cohort 7', progress: 78, status: 'IN_PROGRESS' },
  { name: 'Fatima Al-Rashid', programme: 'Digital Marketing', cohort: 'Cohort 12', progress: 45, status: 'IN_PROGRESS' },
  { name: 'Chukwuma Eze', programme: 'Leadership Academy', cohort: 'Cohort 3', progress: 33, status: 'IN_PROGRESS' },
  { name: 'Ngozi Okafor', programme: 'Digital Marketing', cohort: 'Cohort 10', progress: 100, status: 'COMPLETED' },
]

export default function ParticipantsPage() {
  const router = useRouter()
  const { toast } = useToast()

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Participants"
          description="Manage programme participants"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Participants' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Add participant form coming soon', 'info')}>Add Participant</Button>}
        />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="divide-y divide-border-light">
            {participants.map((p) => (
              <div key={p.name} className="px-6 py-4 flex items-center gap-4 hover:bg-surface-light transition-colors">
                <Avatar name={p.name} size="sm" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{p.name}</p>
                    <Badge variant={p.status === 'COMPLETED' ? 'success' : 'primary'} size="sm">{p.status === 'COMPLETED' ? 'Completed' : 'In Progress'}</Badge>
                  </div>
                  <p className="text-xs text-text-muted">{p.programme} | {p.cohort} | {p.progress}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
