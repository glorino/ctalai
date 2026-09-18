'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Headphones,
  Plus,
  AlertCircle,
  Clock,
  CheckCircle2,
  MoreHorizontal,
  Send,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Tabs from '@/components/ui/tabs'
import AIInsight from '@/components/ui/ai-insight'
import Dropdown from '@/components/ui/dropdown'
import { useToast } from '@/components/ui/toast'

interface Ticket {
  id: string
  subject: string
  description: string | null
  category: string
  priority: string
  status: string
  createdAt: string
  customer: { name: string; email: string | null }
  responses: { message: string; isStaff: boolean; createdAt: string }[]
}

interface SupportData {
  tickets: Ticket[]
  stats: { status: string; _count: number }[]
}

const priorityVariant: Record<string, 'error' | 'warning' | 'primary' | 'neutral'> = {
  URGENT: 'error',
  HIGH: 'error',
  MEDIUM: 'warning',
  LOW: 'neutral',
}

const statusVariant: Record<string, 'primary' | 'warning' | 'neutral' | 'success' | 'error'> = {
  OPEN: 'primary',
  IN_PROGRESS: 'warning',
  WAITING: 'neutral',
  RESOLVED: 'success',
  CLOSED: 'error',
}

export default function SupportPage() {
  const [data, setData] = useState<SupportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetch('/api/support')
      .then((res) => res.json())
      .then((d) => {
        setData(d)
        if (d.tickets?.length > 0) setSelectedTicket(d.tickets[0])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const openCount = data?.stats.find((s) => s.status === 'OPEN')?._count || 0
  const progressCount = data?.stats.find((s) => s.status === 'IN_PROGRESS')?._count || 0
  const resolvedCount = data?.stats.find((s) => s.status === 'RESOLVED')?._count || 0

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Support"
          description="Customer support tickets and helpdesk"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Support' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />}>New Ticket</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Open Tickets" value={loading ? '...' : openCount.toString()} change="-3" changeType="up" icon={<AlertCircle className="w-5 h-5" />} />
        <StatCard title="In Progress" value={loading ? '...' : progressCount.toString()} change="+2" changeType="down" icon={<Clock className="w-5 h-5" />} />
        <StatCard title="Resolved" value={loading ? '...' : resolvedCount.toString()} change="+5" changeType="up" icon={<CheckCircle2 className="w-5 h-5" />} />
        <StatCard title="Total Tickets" value={loading ? '...' : (data?.tickets.length || 0).toString()} change="+8" changeType="up" icon={<Headphones className="w-5 h-5" />} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <Card padding="none">
            <div className="px-6 py-4 border-b border-border">
              <Tabs
                tabs={[
                  { id: 'all', label: 'All', count: data?.tickets.length || 0 },
                  { id: 'open', label: 'Open', count: openCount },
                  { id: 'progress', label: 'In Progress', count: progressCount },
                  { id: 'resolved', label: 'Resolved', count: resolvedCount },
                ]}
                onChange={() => {}}
              />
            </div>
            {loading ? (
              <div className="p-6 space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-20 rounded-lg" />)}</div>
            ) : (
              <div className="divide-y divide-border-light">
                {(data?.tickets || []).map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={cn(
                      'px-6 py-4 cursor-pointer transition-colors hover:bg-surface-light',
                      selectedTicket?.id === ticket.id && 'bg-primary/[0.03] border-l-2 border-l-primary'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-medium truncate">{ticket.subject}</h4>
                          <Badge variant={priorityVariant[ticket.priority]} size="sm">{ticket.priority}</Badge>
                        </div>
                        <p className="text-xs text-text-muted truncate">{ticket.customer.name} • {ticket.category.replace('_', ' ')}</p>
                      </div>
                      <Badge variant={statusVariant[ticket.status]} dot>{ticket.status.replace('_', ' ')}</Badge>
                    </div>
                  </div>
                ))}
                {(!data?.tickets || data.tickets.length === 0) && (
                  <div className="px-6 py-8 text-center text-sm text-text-muted">No tickets found</div>
                )}
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Ticket Detail</h3>
              <Dropdown
                trigger={<button className="p-1.5 rounded-lg text-text-muted hover:bg-surface-light"><MoreHorizontal className="w-4 h-4" /></button>}
                items={[
                  { label: 'Assign', onClick: () => toast('Assignment feature coming soon', 'info') },
                  { label: 'Escalate', onClick: () => toast('Ticket escalated to management', 'success') },
                  { label: 'Resolve', onClick: () => toast('Ticket marked as resolved', 'success') },
                ]}
              />
            </div>
            {selectedTicket ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-semibold">{selectedTicket.subject}</h4>
                  <p className="text-sm text-text-muted mt-1">{selectedTicket.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={priorityVariant[selectedTicket.priority]}>{selectedTicket.priority}</Badge>
                  <Badge variant={statusVariant[selectedTicket.status]}>{selectedTicket.status.replace('_', ' ')}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-text-muted">Customer</span><span>{selectedTicket.customer.name}</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Category</span><span>{selectedTicket.category.replace('_', ' ')}</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Created</span><span>{new Date(selectedTicket.createdAt).toLocaleDateString('en-NG')}</span></div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-text-muted text-center py-8">Select a ticket to view details</p>
            )}
          </Card>

          <AIInsight title="AI Suggested Response" className="mt-4">
            <p className="text-xs">AI will suggest responses based on the ticket category and historical resolutions. Configure your OpenAI API key in settings to enable this feature.</p>
            <div className="flex gap-2 mt-3">
              <Button size="xs" leftIcon={<Send className="w-3 h-3" />} onClick={() => toast('Configure OpenAI API key to enable AI responses', 'info')}>Use Response</Button>
              <Button size="xs" variant="outline" onClick={() => toast('Response editor coming soon', 'info')}>Edit</Button>
            </div>
          </AIInsight>
        </motion.div>
      </div>
    </motion.div>
  )
}
