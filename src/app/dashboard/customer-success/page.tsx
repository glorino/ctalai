'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Card from '@/components/ui/card'
import Progress from '@/components/ui/progress'
import Badge from '@/components/ui/badge'
import AIInsight from '@/components/ui/ai-insight'

export default function CustomerSuccessPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [stats, setStats] = useState<{ status: string; _count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/customer-success')
      .then((res) => res.json())
      .then((d) => {
        setAccounts(d.customers || d.items || d.accounts || d.data || [])
        setStats(d.stats || [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const activeCount = stats.find((s) => s.status === 'ACTIVE')?._count || 0
  const inactiveCount = stats.find((s) => s.status === 'INACTIVE')?._count || 0
  const churnedCount = stats.find((s) => s.status === 'CHURNED')?._count || 0
  const prospectCount = stats.find((s) => s.status === 'PROSPECT')?._count || 0

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Customer Success"
          description="Customer health, engagement, and retention"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Customer Success' }]}
        />
      </motion.div>
      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? [1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-24 rounded-lg" />)
          : (
            <>
              <StatCard title="Total Customers" value={accounts.length.toString()} change="+12.8%" changeType="up" icon={<Users className="w-5 h-5" />} />
              <StatCard title="Active" value={activeCount.toString()} change="+8.4%" changeType="up" icon={<CheckCircle2 className="w-5 h-5" />} />
              <StatCard title="At Risk" value={churnedCount.toString()} change="-5" changeType="up" icon={<AlertTriangle className="w-5 h-5" />} />
              <StatCard title="Prospects" value={prospectCount.toString()} change="+24" changeType="up" icon={<TrendingUp className="w-5 h-5" />} />
            </>
          )
        }
      </motion.div>
      <motion.div variants={staggerItem}>
        <AIInsight title="AI Success Insight">
          <p>Chukwuma Eze has a health score of 45% and is at risk of churning. Recommend immediate outreach and personalised action plan. 3 customers have not engaged in over 2 weeks.</p>
        </AIInsight>
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-4">Customer Health Overview</h3>
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-3">
              {accounts.map((acc: any) => (
                <div key={acc.id || acc.name} className="flex items-center gap-4 p-3 rounded-xl bg-surface-light">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{acc.name}</p>
                      <Badge variant={acc.status === 'CHURNED' ? 'error' : acc.status === 'ACTIVE' ? 'success' : 'neutral'} size="sm">{acc.status}</Badge>
                    </div>
                    <p className="text-xs text-text-muted">{acc._count?.enrollments || 0} enrollments | {acc._count?.invoices || 0} invoices | {acc._count?.feedback || 0} feedback</p>
                  </div>
                </div>
              ))}
              {accounts.length === 0 && (
                <p className="text-sm text-text-muted text-center py-4">No customer data available</p>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
