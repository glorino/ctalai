'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Timeline from '@/components/ui/timeline'
import { useToast } from '@/components/ui/toast'

export default function OnboardingPage() {
  const { toast } = useToast()
  const [onboardingSteps, setOnboardingSteps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/crm')
      .then((res) => res.json())
      .then((d) => {
        setOnboardingSteps(d.items || d.onboardingSteps || d.data || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

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
          {loading ? (
            <div className="space-y-3">{[1, 2, 3, 4, 5].map((i) => <div key={i} className="skeleton h-12 rounded-lg" />)}</div>
          ) : (
            <Timeline items={onboardingSteps.map((s: any) => ({ ...s, icon: s.status === 'completed' ? <span className="text-white text-xs">✓</span> : undefined }))} />
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
