'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Timeline from '@/components/ui/timeline'
import Badge from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'

const onboardingSteps = [
  { id: '1', title: 'Registration', description: 'Customer completes registration form', status: 'completed', time: 'Day 0' },
  { id: '2', title: 'Payment', description: 'Payment processed and confirmed', status: 'completed', time: 'Day 0' },
  { id: '3', title: 'Welcome Email', description: 'Welcome email with programme details sent', status: 'completed', time: 'Day 0' },
  { id: '4', title: 'Forms', description: 'Pre-programme assessment forms completed', status: 'active', time: 'Day 1' },
  { id: '5', title: 'Orientation', description: 'Virtual orientation session', status: 'pending', time: 'Day 2' },
  { id: '6', title: 'Resource Access', description: 'Programme materials and portal access granted', status: 'pending', time: 'Day 3' },
  { id: '7', title: 'Calendar Invite', description: 'Session calendar invites sent', status: 'pending', time: 'Day 3' },
  { id: '8', title: 'First Activity', description: 'First learning activity completed', status: 'pending', time: 'Day 5' },
  { id: '9', title: 'Completion', description: 'Onboarding flow completed successfully', status: 'pending', time: 'Day 7' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Onboarding"
          description="Customer onboarding workflow management"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Onboarding' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Create onboarding form coming soon', 'info')}>New Onboarding</Button>}
        />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-6">Onboarding Workflow</h3>
          <Timeline items={onboardingSteps.map(s => ({ ...s, icon: s.status === 'completed' ? <span className="text-white text-xs">✓</span> : undefined }))} />
        </Card>
      </motion.div>
    </motion.div>
  )
}
