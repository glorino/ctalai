'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Tag,
  Building2,
  User,
  CreditCard,
  GraduationCap,
  Headphones,
  Brain,
  Award,
  FileText,
  Clock,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  MoreHorizontal,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import Card from '@/components/ui/card'
import Tabs from '@/components/ui/tabs'
import AIInsight from '@/components/ui/ai-insight'
import Progress from '@/components/ui/progress'
import ActivityFeed from '@/components/ui/activity-feed'
import Dropdown from '@/components/ui/dropdown'
import { useToast } from '@/components/ui/toast'

const customer = {
  name: 'Adebayo Ogundimu',
  email: 'adebayo@techcorp.ng',
  phone: '+234 803 456 7890',
  type: 'CORPORATE',
  status: 'ACTIVE',
  organisation: 'TechCorp Nigeria',
  owner: 'Chioma Nwosu',
  tags: ['Enterprise', 'VIP', 'Renewal Due'],
  source: 'Webinar',
  createdAt: '15 Jan 2024',
  health: 87,
  engagement: 92,
  lifetimeValue: '₦8.4M',
  lastPurchase: '12 Aug 2025',
  nextAction: 'Schedule QBR',
  churnRisk: 'Low',
}

const activities = [
  { id: '1', message: 'Attended Advanced Valuation Session 8', time: '2 hours ago', type: 'primary' as const },
  { id: '2', message: 'Payment received: ₦125,000', time: '1 day ago', type: 'success' as const },
  { id: '3', message: 'Email: Programme feedback request sent', time: '2 days ago', type: 'default' as const },
  { id: '4', message: 'Support ticket #1234 resolved', time: '3 days ago', type: 'success' as const },
  { id: '5', message: 'Coaching session with Coach Emeka', time: '5 days ago', type: 'primary' as const },
  { id: '6', message: 'Enrolled in Advanced Valuation Cohort 7', time: '2 weeks ago', type: 'default' as const },
]

const programmes = [
  { name: 'Advanced Valuation', cohort: 'Cohort 7', status: 'IN_PROGRESS', progress: 78, startDate: '1 Jul 2025', endDate: '30 Sep 2025' },
  { name: 'Digital Marketing Mastery', cohort: 'Cohort 5', status: 'COMPLETED', progress: 100, startDate: '1 Mar 2025', endDate: '31 May 2025' },
  { name: 'Leadership Academy', cohort: 'Cohort 2', status: 'COMPLETED', progress: 100, startDate: '1 Sep 2024', endDate: '30 Nov 2024' },
]

const invoices = [
  { number: 'CTAL-2508-0042', amount: '₦125,000', status: 'PAID', date: '12 Aug 2025' },
  { number: 'CTAL-2507-0038', amount: '₦125,000', status: 'PAID', date: '12 Jul 2025' },
  { number: 'CTAL-2506-0035', amount: '₦125,000', status: 'PAID', date: '12 Jun 2025' },
]

export default function CustomerDetailPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { toast } = useToast()
  const router = useRouter()

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      {/* Back */}
      <motion.div variants={staggerItem}>
        <Link href="/dashboard/crm" className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to CRM
        </Link>
      </motion.div>

      {/* Customer Header */}
      <motion.div variants={staggerItem}>
        <div className="card bg-surface border border-border rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <Avatar name={customer.name} size="xl" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{customer.name}</h1>
                  <Badge variant="success" dot>{customer.status}</Badge>
                </div>
                <p className="text-sm text-text-muted mt-0.5">{customer.organisation} • {customer.type}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{customer.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {customer.tags.map((tag) => (
                    <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" leftIcon={<Mail className="w-4 h-4" />} onClick={() => { window.location.href = `mailto:${customer.email}` }}>Email</Button>
              <Button variant="outline" size="sm" leftIcon={<Phone className="w-4 h-4" />} onClick={() => { window.location.href = `tel:${customer.phone}` }}>Call</Button>
              <Button variant="outline" size="sm" leftIcon={<MessageSquare className="w-4 h-4" />} onClick={() => { window.open(`https://wa.me/${customer.phone.replace(/\D/g, '')}`, '_blank') }}>WhatsApp</Button>
              <Dropdown
                trigger={<button className="p-2 rounded-lg border border-border text-text-muted hover:bg-surface-light"><MoreHorizontal className="w-4 h-4" /></button>}
                items={[
                  { label: 'Create Task', onClick: () => toast('Task creation coming soon', 'info') },
                  { label: 'Schedule Meeting', onClick: () => toast('Meeting scheduler coming soon', 'info') },
                  { label: 'Add Note', onClick: () => toast('Note added', 'success') },
                ]}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={staggerItem}>
            <Tabs
              tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'programmes', label: 'Programmes', count: programmes.length },
                { id: 'payments', label: 'Payments', count: invoices.length },
                { id: 'support', label: 'Support' },
                { id: 'activity', label: 'Activity' },
              ]}
              onChange={setActiveTab}
            />
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={staggerItem} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Health Score', value: `${customer.health}%`, color: 'text-emerald-600' },
              { label: 'Engagement', value: `${customer.engagement}%`, color: 'text-primary' },
              { label: 'Lifetime Value', value: customer.lifetimeValue, color: 'text-foreground' },
              { label: 'Churn Risk', value: customer.churnRisk, color: 'text-emerald-600' },
            ].map((stat) => (
              <div key={stat.label} className="p-3 rounded-xl bg-surface-light border border-border-light">
                <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider">{stat.label}</p>
                <p className={cn('text-lg font-bold mt-0.5', stat.color)}>{stat.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Activity */}
          <motion.div variants={staggerItem}>
            <Card padding="md">
              <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
              <ActivityFeed activities={activities} />
            </Card>
          </motion.div>

          {/* Programmes */}
          <motion.div variants={staggerItem}>
            <Card padding="md">
              <h3 className="text-sm font-semibold mb-4">Programmes</h3>
              <div className="space-y-3">
                {programmes.map((prog) => (
                  <div key={prog.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/8">
                        <GraduationCap className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{prog.name}</p>
                        <p className="text-xs text-text-muted">{prog.cohort} • {prog.startDate} – {prog.endDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20">
                        <Progress value={prog.progress} size="sm" />
                      </div>
                      <Badge variant={prog.status === 'COMPLETED' ? 'success' : 'primary'} size="sm">
                        {prog.status === 'COMPLETED' ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* AI Insight */}
          <motion.div variants={staggerItem}>
            <AIInsight title="AI Customer Insight">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">Health Score</span>
                  <span className="text-sm font-semibold text-emerald-600">{customer.health}%</span>
                </div>
                <Progress value={customer.health} color="success" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">Engagement</span>
                  <span className="text-sm font-semibold text-primary">{customer.engagement}%</span>
                </div>
                <Progress value={customer.engagement} />
                <div className="pt-2 border-t border-white/50">
                  <p className="text-xs font-medium text-foreground mb-1">Recommended Next Action</p>
                  <p className="text-xs text-text-secondary">{customer.nextAction}</p>
                </div>
                <div className="pt-2 border-t border-white/50">
                  <p className="text-xs font-medium text-foreground mb-1">Lifetime Value</p>
                  <p className="text-lg font-bold">{customer.lifetimeValue}</p>
                </div>
              </div>
            </AIInsight>
          </motion.div>

          {/* Contact Details */}
          <motion.div variants={staggerItem}>
            <Card padding="md">
              <h3 className="text-sm font-semibold mb-4">Contact Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-text-secondary"><Mail className="w-4 h-4 text-text-muted" />{customer.email}</div>
                <div className="flex items-center gap-2 text-text-secondary"><Phone className="w-4 h-4 text-text-muted" />{customer.phone}</div>
                <div className="flex items-center gap-2 text-text-secondary"><Building2 className="w-4 h-4 text-text-muted" />{customer.organisation}</div>
                <div className="flex items-center gap-2 text-text-secondary"><User className="w-4 h-4 text-text-muted" />Owner: {customer.owner}</div>
                <div className="flex items-center gap-2 text-text-secondary"><Calendar className="w-4 h-4 text-text-muted" />Customer since {customer.createdAt}</div>
              </div>
            </Card>
          </motion.div>

          {/* Recent Payments */}
          <motion.div variants={staggerItem}>
            <Card padding="md">
              <h3 className="text-sm font-semibold mb-4">Recent Payments</h3>
              <div className="space-y-2">
                {invoices.map((inv) => (
                  <div key={inv.number} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">{inv.number}</p>
                      <p className="text-xs text-text-muted">{inv.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{inv.amount}</p>
                      <Badge variant="success" size="sm">{inv.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
