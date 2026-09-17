'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Headphones,
  Plus,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Send,
  Bot,
  User,
  MoreHorizontal,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import Card from '@/components/ui/card'
import Tabs from '@/components/ui/tabs'
import AIInsight from '@/components/ui/ai-insight'
import Dropdown from '@/components/ui/dropdown'

const tickets = [
  { id: '1', customer: 'Adebayo Ogundimu', subject: 'Cannot access course materials', category: 'PROGRAMME', priority: 'HIGH', status: 'OPEN', assignee: 'Chioma', timeOpen: '2h', description: 'Unable to download PDF materials from the Advanced Valuation programme portal.' },
  { id: '2', customer: 'Fatima Al-Rashid', subject: 'Invoice discrepancy', category: 'PAYMENT', priority: 'MEDIUM', status: 'IN_PROGRESS', assignee: 'Emeka', timeOpen: '4h', description: 'Invoice amount does not match agreed price for corporate package.' },
  { id: '3', customer: 'Chukwuma Eze', subject: 'Schedule change request', category: 'SCHEDULE', priority: 'LOW', status: 'OPEN', assignee: 'Chioma', timeOpen: '1d', description: 'Requesting to move coaching session from Thursday to Friday.' },
  { id: '4', customer: 'Ngozi Okafor', subject: 'Certificate not received', category: 'CERTIFICATE', priority: 'MEDIUM', status: 'WAITING', assignee: 'Emeka', timeOpen: '3d', description: 'Completed Digital Marketing programme 2 weeks ago but no certificate received.' },
  { id: '5', customer: 'Ibrahim Musa', subject: 'Payment failed', category: 'PAYMENT', priority: 'URGENT', status: 'OPEN', assignee: 'Chioma', timeOpen: '1h', description: 'Payment of ₦125,000 failed but amount was debited from account.' },
]

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

const stats = [
  { title: 'Open Tickets', value: '12', change: '-3', changeType: 'up' as const, icon: AlertCircle },
  { title: 'In Progress', value: '8', change: '+2', changeType: 'down' as const, icon: Clock },
  { title: 'Resolved Today', value: '14', change: '+5', changeType: 'up' as const, icon: CheckCircle2 },
  { title: 'Avg Response', value: '2.4h', change: '-18min', changeType: 'up' as const, icon: Headphones },
]

export default function SupportPage() {
  const [selectedTicket, setSelectedTicket] = useState(tickets[0])

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
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<stat.icon className="w-5 h-5" />} />
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <Card padding="none">
            <div className="px-6 py-4 border-b border-border">
              <Tabs
                tabs={[
                  { id: 'all', label: 'All', count: tickets.length },
                  { id: 'open', label: 'Open', count: tickets.filter(t => t.status === 'OPEN').length },
                  { id: 'progress', label: 'In Progress', count: tickets.filter(t => t.status === 'IN_PROGRESS').length },
                  { id: 'resolved', label: 'Resolved' },
                ]}
                onChange={() => {}}
              />
            </div>
            <div className="divide-y divide-border-light">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={cn(
                    'px-6 py-4 cursor-pointer transition-colors hover:bg-surface-light',
                    selectedTicket.id === ticket.id && 'bg-primary/[0.03] border-l-2 border-l-primary'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium truncate">{ticket.subject}</h4>
                        <Badge variant={priorityVariant[ticket.priority]} size="sm">{ticket.priority}</Badge>
                      </div>
                      <p className="text-xs text-text-muted truncate">{ticket.customer} • {ticket.category.replace('_', ' ')}</p>
                      <p className="text-xs text-text-muted mt-1">{ticket.timeOpen} ago • Assigned to {ticket.assignee}</p>
                    </div>
                    <Badge variant={statusVariant[ticket.status]} dot>{ticket.status.replace('_', ' ')}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Ticket Detail */}
        <motion.div variants={staggerItem}>
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Ticket Detail</h3>
              <Dropdown
                trigger={<button className="p-1.5 rounded-lg text-text-muted hover:bg-surface-light"><MoreHorizontal className="w-4 h-4" /></button>}
                items={[
                  { label: 'Assign', onClick: () => {} },
                  { label: 'Escalate', onClick: () => {} },
                  { label: 'Resolve', onClick: () => {} },
                ]}
              />
            </div>
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
                <div className="flex justify-between"><span className="text-text-muted">Customer</span><span>{selectedTicket.customer}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Category</span><span>{selectedTicket.category.replace('_', ' ')}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Assigned</span><span>{selectedTicket.assignee}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Time Open</span><span>{selectedTicket.timeOpen}</span></div>
              </div>
            </div>
          </Card>

          {/* AI Suggested Response */}
          <AIInsight title="AI Suggested Response" className="mt-4">
            <p className="text-xs">I understand you&apos;re having trouble accessing the course materials. This is usually resolved by clearing your browser cache or trying a different browser. Let me check your account status and send you a direct link to the materials.</p>
            <div className="flex gap-2 mt-3">
              <Button size="xs" leftIcon={<Send className="w-3 h-3" />}>Use Response</Button>
              <Button size="xs" variant="outline">Edit</Button>
            </div>
          </AIInsight>
        </motion.div>
      </div>
    </motion.div>
  )
}
