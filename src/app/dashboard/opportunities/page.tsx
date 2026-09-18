'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'

export default function OpportunitiesPage() {
  const { toast } = useToast()
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/opportunities')
      .then((res) => res.json())
      .then((d) => {
        setOpportunities(d.items || d.opportunities || d.data || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Opportunities"
          description="Track sales opportunities"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Opportunities' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Create opportunity form coming soon', 'info')}>New Opportunity</Button>}
        />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {opportunities.map((opp: any) => (
                <div key={opp.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                  <div>
                    <p className="text-sm font-medium">{opp.name}</p>
                    <p className="text-xs text-text-muted">{opp.stage} | Owner: {opp.owner} | {opp.probability}% probability</p>
                  </div>
                  <span className="text-sm font-semibold">{opp.value}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
