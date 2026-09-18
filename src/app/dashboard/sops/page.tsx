'use client'

import { motion } from 'framer-motion'
import { FileCheck, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'

const sops = [
  { title: 'Customer Onboarding Process', category: 'Operations', version: 3, lastUpdated: '10 Aug 2025', owner: 'Chioma' },
  { title: 'Invoice Generation', category: 'Finance', version: 2, lastUpdated: '5 Aug 2025', owner: 'Blessing' },
  { title: 'Lead Qualification Workflow', category: 'Sales', version: 1, lastUpdated: '1 Aug 2025', owner: 'Emeka' },
]

export default function SOPsPage() {
  const router = useRouter()
  const { toast } = useToast()

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="SOPs" description="Standard Operating Procedures" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'SOPs' }]} actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Create SOP form coming soon', 'info')}>New SOP</Button>} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <div className="space-y-3">
            {sops.map((s) => (
              <div key={s.title} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                <div>
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="text-xs text-text-muted">{s.category} | Version {s.version} | Owner: {s.owner}</p>
                </div>
                <span className="text-xs text-text-muted">{s.lastUpdated}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
