'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Target, DollarSign, Download } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { formatCurrency } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import AIInsight from '@/components/ui/ai-insight'

interface AnalyticsData {
  revenue: { total: number; monthly: { amount: number; createdAt: string }[] }
  customers: { total: number; active: number }
  leads: { bySource: { source: string; _count: number; _avg: { score: number | null } }[]; byStatus: { status: string; _count: number }[] }
  enrollments: { total: number; completed: number }
  programs: { id: string; name: string; _count: { enrollments: number } }[]
  support: { open: number; resolved: number }
}

const dateFilters = ['Today', '7 Days', '30 Days', '90 Days', 'Year']

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const totalLeads = data?.leads.bySource.reduce((s, l) => s + l._count, 0) || 0
  const conversionRate = data && data.customers.total > 0
    ? ((data.customers.total / (totalLeads + data.customers.total)) * 100).toFixed(1)
    : '0'

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Analytics"
          description="Business intelligence and performance analytics"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Analytics' }]}
          actions={
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center bg-surface-muted rounded-lg p-0.5 overflow-x-auto">
                {dateFilters.map((f) => (
                  <button key={f} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${f === '30 Days' ? 'bg-surface text-foreground shadow-sm' : 'text-text-muted hover:text-foreground'}`}>
                    {f}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Leads" value={loading ? '...' : totalLeads.toString()} change="+18.4%" changeType="up" icon={<Target className="w-5 h-5" />} />
        <StatCard title="Conversion Rate" value={loading ? '...' : `${conversionRate}%`} change="+2.1%" changeType="up" icon={<TrendingUp className="w-5 h-5" />} />
        <StatCard title="Revenue" value={loading ? '...' : formatCurrency(data?.revenue.total || 0)} change="+18.4%" changeType="up" icon={<DollarSign className="w-5 h-5" />} />
        <StatCard title="Active Customers" value={loading ? '...' : (data?.customers.active || 0).toString()} change="+3%" changeType="up" icon={<Users className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Analytics Insight">
          <p>
            {loading ? 'Loading analytics...' : `Total revenue: ${formatCurrency(data?.revenue.total || 0)} from ${data?.customers.total || 0} customers. ${data?.leads.bySource.length || 0} lead sources active. ${data?.support.open || 0} open support tickets.`}
          </p>
        </AIInsight>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={staggerItem}>
          <Card padding="md">
            <h3 className="text-sm font-semibold mb-4">Leads by Source</h3>
            {loading ? (
              <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-8 rounded-lg" />)}</div>
            ) : (
              <div className="space-y-3">
                {(data?.leads.bySource || []).map((src) => (
                  <div key={src.source} className="flex items-center gap-4">
                    <span className="text-sm text-text-secondary w-32 shrink-0">{src.source.replace('_', ' ')}</span>
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-surface-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min((src._count / (totalLeads || 1)) * 100, 100)}%` }} />
                      </div>
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">{src._count}</span>
                    <span className="text-xs text-text-muted w-12 text-right">{src._avg.score ? Math.round(src._avg.score) : 0}</span>
                  </div>
                ))}
                {(!data?.leads.bySource || data.leads.bySource.length === 0) && (
                  <p className="text-sm text-text-muted text-center py-4">No lead data yet</p>
                )}
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card padding="md">
            <h3 className="text-sm font-semibold mb-4">Programme Performance</h3>
            {loading ? (
              <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-8 rounded-lg" />)}</div>
            ) : (
              <div className="space-y-3">
                {(data?.programs || []).map((prog) => (
                  <div key={prog.id} className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">{prog.name}</span>
                    <span className="text-sm font-semibold">{prog._count.enrollments} enrolled</span>
                  </div>
                ))}
                {(!data?.programs || data.programs.length === 0) && (
                  <p className="text-sm text-text-muted text-center py-4">No programme data yet</p>
                )}
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      <motion.div variants={staggerItem}>
        <Card padding="md">
          <h3 className="text-sm font-semibold mb-4">Key Metrics Summary</h3>
          <div className="space-y-4">
            {[
              { label: 'Total Customers', value: data?.customers.total || 0 },
              { label: 'Active Customers', value: data?.customers.active || 0 },
              { label: 'Total Leads', value: totalLeads },
              { label: 'Total Enrollments', value: data?.enrollments.total || 0 },
              { label: 'Completed Enrollments', value: data?.enrollments.completed || 0 },
              { label: 'Open Support Tickets', value: data?.support.open || 0 },
              { label: 'Resolved Support Tickets', value: data?.support.resolved || 0 },
              { label: 'Total Revenue', value: formatCurrency(data?.revenue.total || 0) },
            ].map((metric) => (
              <div key={metric.label} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{metric.label}</span>
                <span className="text-sm font-semibold">{loading ? '...' : metric.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
