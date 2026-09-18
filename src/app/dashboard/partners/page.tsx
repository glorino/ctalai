'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Handshake, Plus, TrendingUp, Calendar, FileText, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { formatCurrency } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import Card from '@/components/ui/card'
import AIInsight from '@/components/ui/ai-insight'
import { useToast } from '@/components/ui/toast'

interface PartnerData {
  id: string
  name: string
  type: string
  status: string
  agreements: number
  meetings: number
  createdAt: string
  _count: { agreements: number; meetings: number }
}

const statusVariant: Record<string, 'success' | 'warning' | 'primary' | 'neutral'> = {
  ACTIVE: 'success',
  PROSPECT: 'primary',
  INACTIVE: 'neutral',
  TERMINATED: 'error',
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<PartnerData[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetch('/api/partners')
      .then((res) => res.json())
      .then((d) => setPartners(d.partners || d.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const totalPartners = partners.length
  const activePartners = partners.filter(p => p.status === 'ACTIVE').length
  const totalAgreements = partners.reduce((sum, p) => sum + (p._count?.agreements || p.agreements || 0), 0)
  const totalMeetings = partners.reduce((sum, p) => sum + (p._count?.meetings || p.meetings || 0), 0)

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Partnerships"
          description="Partner management, agreements, and opportunities"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Partners' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast('Add partner form coming soon', 'info')}>Add Partner</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Partners" value={loading ? '...' : totalPartners.toString()} change="+3" changeType="up" icon={<Handshake className="w-5 h-5" />} />
        <StatCard title="Active Agreements" value={loading ? '...' : totalAgreements.toString()} change="+2" changeType="up" icon={<FileText className="w-5 h-5" />} />
        <StatCard title="Active Partners" value={loading ? '...' : activePartners.toString()} change="+1" changeType="up" icon={<TrendingUp className="w-5 h-5" />} />
        <StatCard title="Total Meetings" value={loading ? '...' : totalMeetings.toString()} change="+6" changeType="up" icon={<Calendar className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Partnership Insight">
          {loading ? (
            <p>Loading partnership insights...</p>
          ) : (
            <p>You have {activePartners} active partners with {totalAgreements} agreements. Focus on deepening relationships with your most engaged partners.</p>
          )}
        </AIInsight>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold">Partners</h3>
          </div>
          {loading ? (
            <div className="p-6 space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="divide-y divide-border-light">
              {partners.map((partner) => (
                <div key={partner.id} className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-surface-light transition-colors cursor-pointer">
                  <Avatar name={partner.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{partner.name}</p>
                      <Badge variant={statusVariant[partner.status] || 'neutral'} dot size="sm">{partner.status}</Badge>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{partner.type} | {partner._count?.agreements || partner.agreements || 0} agreements | {partner._count?.meetings || partner.meetings || 0} meetings</p>
                  </div>
                  <div className="flex sm:flex-col sm:items-end gap-2 sm:gap-0">
                    <p className="text-xs text-text-muted">Created: {new Date(partner.createdAt).toLocaleDateString('en-NG')}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted shrink-0 hidden sm:block" />
                </div>
              ))}
              {partners.length === 0 && (
                <div className="px-6 py-8 text-center text-sm text-text-muted">No partners found</div>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
