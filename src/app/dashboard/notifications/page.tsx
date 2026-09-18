'use client'

import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Card from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'

const notifications = [
  { title: 'New payment received', desc: '₦125,000 from Adebayo Ogundimu', time: '2m ago', unread: true, category: 'Finance' },
  { title: 'Lead requires follow-up', desc: 'High-value lead from webinar: TechStart Nigeria', time: '15m ago', unread: true, category: 'Sales' },
  { title: 'Programme engagement dropped', desc: 'Advanced Valuation Cohort 7 attendance below 85%', time: '1h ago', unread: false, category: 'Programmes' },
  { title: 'AI agent escalated a customer', desc: 'Auto-escalation from Growth Agent for Chukwuma Eze', time: '2h ago', unread: false, category: 'AI' },
  { title: 'Invoice overdue', desc: 'CTAL-2508-0040 for Lagos Business School', time: '3h ago', unread: false, category: 'Finance' },
  { title: 'New support ticket', desc: 'Payment failed issue from Ibrahim Musa', time: '4h ago', unread: false, category: 'Support' },
]

const categoryColors: Record<string, string> = {
  Finance: 'badge-primary',
  Sales: 'badge-secondary',
  Programmes: 'badge-success',
  AI: 'badge-warning',
  Support: 'badge-error',
}

export default function NotificationsPage() {
  const { toast } = useToast()
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Notifications" description="All notifications and alerts" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Notifications' }]} />
      </motion.div>
      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold">All Notifications</h3>
            <button onClick={() => toast('All notifications marked as read', 'success')} className="text-xs text-primary hover:text-primary-dark">Mark all read</button>
          </div>
          <div className="divide-y divide-border-light">
            {notifications.map((n, i) => (
              <div key={i} className={`px-6 py-4 flex items-start gap-3 hover:bg-surface-light transition-colors cursor-pointer ${n.unread ? 'bg-primary/[0.02]' : ''}`}>
                <div className="mt-1">
                  {n.unread ? <div className="w-2 h-2 rounded-full bg-primary" /> : <div className="w-2 h-2 rounded-full bg-transparent" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-text-muted mt-0.5">{n.desc}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] text-text-muted">{n.time}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${categoryColors[n.category] || 'badge-neutral'}`}>{n.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
