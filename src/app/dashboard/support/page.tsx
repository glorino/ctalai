'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Headphones,
  MessageSquare,
  BookOpen,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Eye,
  Edit,
  BarChart3,
  Send,
  User,
  Tag,
  Star,
  HelpCircle,
  FileText,
  Zap,
  CircleDot,
  MessageCircle,
} from 'lucide-react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SupportTicket {
  id: string
  subject: string
  customer: string
  category: 'Technical' | 'Billing' | 'Account' | 'General' | 'Feature Request'
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed'
  createdAt: string
  lastUpdate: string
  assignee: string
  messages: number
}

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  helpful: number
  views: number
}

interface KnowledgeBaseArticle {
  id: string
  title: string
  category: string
  excerpt: string
  updated: string
  readTime: string
  views: number
}

interface ChatMessage {
  id: string
  sender: 'customer' | 'agent'
  name: string
  message: string
  time: string
}

const sampleTickets: SupportTicket[] = [
  {
    id: 'TKT-1001',
    subject: 'Payment gateway not processing transactions',
    customer: 'Sarah Johnson',
    category: 'Technical',
    priority: 'Urgent',
    status: 'In Progress',
    createdAt: '2026-09-08T09:15:00',
    lastUpdate: '2026-09-08T10:30:00',
    assignee: 'Adaeze Okonkwo',
    messages: 8,
  },
  {
    id: 'TKT-1002',
    subject: 'Cannot access premium features after upgrade',
    customer: 'Michael Chen',
    category: 'Account',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-09-08T08:45:00',
    lastUpdate: '2026-09-08T09:00:00',
    assignee: 'Kemi Adeyemi',
    messages: 3,
  },
  {
    id: 'TKT-1003',
    subject: 'Request for annual billing cycle',
    customer: 'Amina Ibrahim',
    category: 'Billing',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-09-07T16:20:00',
    lastUpdate: '2026-09-07T16:20:00',
    assignee: 'Unassigned',
    messages: 1,
  },
  {
    id: 'TKT-1004',
    subject: 'Mobile app crashes on Android 14',
    customer: 'David Williams',
    category: 'Technical',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-09-07T14:10:00',
    lastUpdate: '2026-09-08T08:45:00',
    assignee: 'Yusuf Abdullahi',
    messages: 12,
  },
  {
    id: 'TKT-1005',
    subject: 'How to export data to CSV',
    customer: 'Fatima Al-Hassan',
    category: 'General',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-09-06T11:30:00',
    lastUpdate: '2026-09-07T09:15:00',
    assignee: 'Chidinma Eze',
    messages: 5,
  },
  {
    id: 'TKT-1006',
    subject: 'Add dark mode support',
    customer: 'James Okonkwo',
    category: 'Feature Request',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2026-09-05T10:00:00',
    lastUpdate: '2026-09-06T14:30:00',
    assignee: 'Adaeze Okonkwo',
    messages: 6,
  },
  {
    id: 'TKT-1007',
    subject: 'Invoice discrepancy for August billing',
    customer: 'Grace Adekunle',
    category: 'Billing',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-09-07T09:00:00',
    lastUpdate: '2026-09-08T07:20:00',
    assignee: 'Kemi Adeyemi',
    messages: 4,
  },
  {
    id: 'TKT-1008',
    subject: 'API rate limit exceeded',
    customer: 'Emmanuel Nwankwo',
    category: 'Technical',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-09-08T07:30:00',
    lastUpdate: '2026-09-08T07:30:00',
    assignee: 'Unassigned',
    messages: 2,
  },
]

const sampleFAQs: FAQItem[] = [
  {
    id: 'FAQ-001',
    question: 'How do I reset my password?',
    answer: 'Go to Settings > Security > Change Password. You will receive a verification code via email. Enter the code and create a new password with at least 8 characters including uppercase, lowercase, and numbers.',
    category: 'Account',
    helpful: 234,
    views: 1520,
  },
  {
    id: 'FAQ-002',
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit/debit cards (Visa, MasterCard, Verve), bank transfers, and mobile money (MTN, Airtel). Payments are processed securely through our PCI-compliant payment gateway.',
    category: 'Billing',
    helpful: 189,
    views: 1230,
  },
  {
    id: 'FAQ-003',
    question: 'How do I upgrade my subscription plan?',
    answer: 'Navigate to Settings > Subscription > Upgrade Plan. Select your desired plan and complete the payment. The upgrade takes effect immediately, and you will be charged a prorated amount for the current billing cycle.',
    category: 'Billing',
    helpful: 156,
    views: 980,
  },
  {
    id: 'FAQ-004',
    question: 'Can I integrate with third-party tools?',
    answer: 'Yes! We support integrations with Slack, Google Workspace, Microsoft 365, Zapier, and custom APIs. Go to Settings > Integrations to browse and connect available tools.',
    category: 'Technical',
    helpful: 312,
    views: 2100,
  },
  {
    id: 'FAQ-005',
    question: 'How do I invite team members?',
    answer: 'Go to Team Management > Invite Members. Enter their email addresses, assign roles (Admin, Editor, Viewer), and send invitations. They will receive an email with a link to join your workspace.',
    category: 'Account',
    helpful: 178,
    views: 1450,
  },
  {
    id: 'FAQ-006',
    question: 'What is the refund policy?',
    answer: 'We offer a 30-day money-back guarantee on all plans. If you are not satisfied, contact support within 30 days of purchase for a full refund. Annual plans can be prorated for unused months.',
    category: 'Billing',
    helpful: 145,
    views: 890,
  },
]

const sampleArticles: KnowledgeBaseArticle[] = [
  {
    id: 'KB-001',
    title: 'Getting Started with CTAL AI Platform',
    category: 'Quick Start',
    excerpt: 'A comprehensive guide to setting up your account, configuring your workspace, and making the most of our AI-powered features.',
    updated: '2026-09-05',
    readTime: '8 min',
    views: 3420,
  },
  {
    id: 'KB-002',
    title: 'API Documentation & Authentication',
    category: 'Developer',
    excerpt: 'Complete API reference with authentication guides, rate limits, endpoints, and code examples in multiple languages.',
    updated: '2026-09-07',
    readTime: '15 min',
    views: 2890,
  },
  {
    id: 'KB-003',
    title: 'Managing Your Billing & Subscription',
    category: 'Billing',
    excerpt: 'Learn how to update payment methods, view invoices, change plans, and manage billing contacts for your organization.',
    updated: '2026-09-01',
    readTime: '5 min',
    views: 1980,
  },
  {
    id: 'KB-004',
    title: 'Troubleshooting Common Issues',
    category: 'Support',
    excerpt: 'Solutions for frequently encountered problems including login issues, sync errors, performance optimization, and more.',
    updated: '2026-09-08',
    readTime: '10 min',
    views: 4210,
  },
  {
    id: 'KB-005',
    title: 'Team Collaboration Best Practices',
    category: 'Guide',
    excerpt: 'Tips and strategies for effective team collaboration, role management, permissions, and workflow automation.',
    updated: '2026-08-28',
    readTime: '7 min',
    views: 1560,
  },
  {
    id: 'KB-006',
    title: 'Data Security & Privacy Compliance',
    category: 'Security',
    excerpt: 'Our commitment to data security, GDPR compliance, encryption standards, and how we protect your information.',
    updated: '2026-09-03',
    readTime: '6 min',
    views: 2340,
  },
]

const sampleChatMessages: ChatMessage[] = [
  { id: '1', sender: 'customer', name: 'Michael Chen', message: 'Hi, I upgraded to Premium but still can not access the advanced analytics dashboard.', time: '10:32 AM' },
  { id: '2', sender: 'agent', name: 'Support Agent', message: 'Hello Michael! Let me check your account status. Can you confirm the email associated with your Premium subscription?', time: '10:33 AM' },
  { id: '3', sender: 'customer', name: 'Michael Chen', message: 'Yes, it is michael.chen@innovate.io', time: '10:34 AM' },
  { id: '4', sender: 'agent', name: 'Support Agent', message: 'Thank you. I can see your Premium plan is active. The analytics dashboard requires a separate permission. Let me enable that for you now.', time: '10:35 AM' },
  { id: '5', sender: 'customer', name: 'Michael Chen', message: 'That would be great, thanks!', time: '10:35 AM' },
  { id: '6', sender: 'agent', name: 'Support Agent', message: 'Done! Please refresh your browser and try accessing the analytics dashboard again. You should now have full access.', time: '10:36 AM' },
]

const statusColors: Record<string, string> = {
  Open: 'bg-primary/20 text-primary',
  'In Progress': 'bg-warning/20 text-warning',
  Resolved: 'bg-success/20 text-success',
  Closed: 'bg-text-muted/20 text-text-muted',
}

const priorityColors: Record<string, string> = {
  Low: 'bg-surface-light text-text-muted',
  Medium: 'bg-primary/10 text-primary',
  High: 'bg-warning/10 text-warning',
  Urgent: 'bg-error/10 text-error',
}

const categoryColors: Record<string, string> = {
  Technical: 'bg-primary/10 text-primary',
  Billing: 'bg-secondary/10 text-secondary',
  Account: 'bg-success/10 text-success',
  General: 'bg-surface-light text-text-muted',
  'Feature Request': 'bg-warning/10 text-warning',
}

const kbCategoryColors: Record<string, string> = {
  'Quick Start': 'bg-primary/10 text-primary',
  Developer: 'bg-success/10 text-success',
  Billing: 'bg-secondary/10 text-secondary',
  Support: 'bg-warning/10 text-warning',
  Guide: 'bg-primary/10 text-primary',
  Security: 'bg-error/10 text-error',
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [priorityFilter, setPriorityFilter] = useState<string>('All')
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState<'tickets' | 'faq' | 'knowledge' | 'live'>('tickets')
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [kbSearch, setKbSearch] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(sampleChatMessages)

  const filteredTickets = sampleTickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter
    const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const filteredArticles = sampleArticles.filter((article) =>
    article.title.toLowerCase().includes(kbSearch.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(kbSearch.toLowerCase()) ||
    article.category.toLowerCase().includes(kbSearch.toLowerCase())
  )

  const openTickets = sampleTickets.filter((t) => t.status === 'Open').length
  const resolvedToday = sampleTickets.filter((t) => t.status === 'Resolved').length
  const avgResponseTime = '24 min'
  const satisfactionScore = '94.2%'

  const stats = [
    {
      title: 'Open Tickets',
      value: openTickets.toString(),
      change: '+3',
      trend: 'up' as const,
      icon: CircleDot,
      color: 'primary',
    },
    {
      title: 'Resolved Today',
      value: resolvedToday.toString(),
      change: '+12',
      trend: 'up' as const,
      icon: CheckCircle,
      color: 'success',
    },
    {
      title: 'Avg. Response Time',
      value: avgResponseTime,
      change: '-8 min',
      trend: 'down' as const,
      icon: Clock,
      color: 'warning',
    },
    {
      title: 'Satisfaction Score',
      value: satisfactionScore,
      change: '+2.1%',
      trend: 'up' as const,
      icon: Star,
      color: 'secondary',
    },
  ]

  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    const newMessage: ChatMessage = {
      id: (chatMessages.length + 1).toString(),
      sender: 'agent',
      name: 'Support Agent',
      message: chatInput,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    }
    setChatMessages([...chatMessages, newMessage])
    setChatInput('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
            Customer Support & Live Q&A
          </h1>
          <p className="text-text-muted">
            Manage tickets, FAQs, knowledge base, and live customer interactions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Ticket
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-muted text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-success" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-error" />
                    )}
                    <span
                      className={`text-sm ${
                        stat.trend === 'up' ? 'text-success' : 'text-error'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-text-muted text-sm">vs last week</span>
                  </div>
                </div>
                <div
                  className={cn(
                    'p-3 rounded-xl',
                    stat.color === 'primary' && 'bg-primary/10',
                    stat.color === 'success' && 'bg-success/10',
                    stat.color === 'warning' && 'bg-warning/10',
                    stat.color === 'secondary' && 'bg-secondary/10'
                  )}
                >
                  <stat.icon
                    className={cn(
                      'w-6 h-6',
                      stat.color === 'primary' && 'text-primary',
                      stat.color === 'success' && 'text-success',
                      stat.color === 'warning' && 'text-warning',
                      stat.color === 'secondary' && 'text-secondary'
                    )}
                  />
                </div>
              </div>
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 h-1',
                  stat.color === 'primary' && 'bg-gradient-to-r from-primary to-primary-light',
                  stat.color === 'success' && 'bg-gradient-to-r from-success to-emerald-400',
                  stat.color === 'warning' && 'bg-gradient-to-r from-warning to-amber-400',
                  stat.color === 'secondary' && 'bg-gradient-to-r from-secondary to-secondary-light'
                )}
              />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs & Content */}
        <div className="lg:col-span-3">
          {/* Tab Buttons */}
          <div className="flex items-center gap-2 mb-4">
            {[
              { key: 'tickets' as const, label: 'Support Tickets', icon: Headphones, badge: openTickets },
              { key: 'faq' as const, label: 'FAQ', icon: HelpCircle },
              { key: 'knowledge' as const, label: 'Knowledge Base', icon: BookOpen },
              { key: 'live' as const, label: 'Live Q&A', icon: MessageCircle },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all relative',
                  activeTab === tab.key
                    ? 'bg-primary text-white'
                    : 'bg-surface-light text-text-muted hover:text-white hover:bg-surface-light/80'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Tickets Tab */}
            {activeTab === 'tickets' && (
              <motion.div
                key="tickets"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Search & Filters */}
                <Card hover={false} className="mb-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type="text"
                        placeholder="Search tickets by subject, customer, or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-surface-light border border-white/5 rounded-xl text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className={cn(showFilters && 'bg-primary/10 text-primary')}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 ml-2 transition-transform',
                          showFilters && 'rotate-180'
                        )}
                      />
                    </Button>
                  </div>

                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-4 pt-4 mt-4 border-t border-white/5">
                          <div className="flex-1 min-w-[200px]">
                            <label className="text-sm text-text-muted mb-2 block">Status</label>
                            <select
                              value={statusFilter}
                              onChange={(e) => setStatusFilter(e.target.value)}
                              className="w-full px-4 py-2.5 bg-surface-light border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                            >
                              <option value="All">All Status</option>
                              <option value="Open">Open</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </div>
                          <div className="flex-1 min-w-[200px]">
                            <label className="text-sm text-text-muted mb-2 block">Priority</label>
                            <select
                              value={priorityFilter}
                              onChange={(e) => setPriorityFilter(e.target.value)}
                              className="w-full px-4 py-2.5 bg-surface-light border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                            >
                              <option value="All">All Priorities</option>
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                              <option value="Urgent">Urgent</option>
                            </select>
                          </div>
                          <div className="flex items-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSearchQuery('')
                                setStatusFilter('All')
                                setPriorityFilter('All')
                              }}
                            >
                              Clear Filters
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>

                {/* Ticket Cards */}
                <div className="space-y-3">
                  {filteredTickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <span className="text-xs text-text-muted font-mono">{ticket.id}</span>
                              <span
                                className={cn(
                                  'px-2 py-0.5 rounded-full text-xs font-medium',
                                  priorityColors[ticket.priority]
                                )}
                              >
                                {ticket.priority}
                              </span>
                              <span
                                className={cn(
                                  'px-2 py-0.5 rounded-full text-xs font-medium',
                                  categoryColors[ticket.category]
                                )}
                              >
                                {ticket.category}
                              </span>
                              <span
                                className={cn(
                                  'px-2 py-0.5 rounded-full text-xs font-medium',
                                  statusColors[ticket.status]
                                )}
                              >
                                {ticket.status}
                              </span>
                            </div>
                            <h3 className="font-semibold mb-1">{ticket.subject}</h3>
                            <div className="flex items-center gap-4 text-sm text-text-muted">
                              <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                {ticket.customer}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {ticket.lastUpdate}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-3.5 h-3.5" />
                                {ticket.messages} messages
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="text-right mr-2">
                              <p className="text-xs text-text-muted">Assigned to</p>
                              <p className="text-sm font-medium">{ticket.assignee}</p>
                            </div>
                            <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                              <Eye className="w-4 h-4 text-text-muted hover:text-primary" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                              <Edit className="w-4 h-4 text-text-muted hover:text-primary" />
                            </button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredTickets.length === 0 && (
                  <Card hover={false} className="text-center py-12">
                    <Headphones className="w-12 h-12 text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No tickets found</h3>
                    <p className="text-text-muted">Try adjusting your search or filter criteria.</p>
                  </Card>
                )}
              </motion.div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card hover={false} className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      Frequently Asked Questions
                    </h2>
                    <Button variant="primary" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add FAQ
                    </Button>
                  </div>

                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Search FAQs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-surface-light border border-white/5 rounded-xl text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    {sampleFAQs
                      .filter(
                        (faq) =>
                          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((faq, index) => (
                        <motion.div
                          key={faq.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div
                            className={cn(
                              'rounded-xl border border-white/5 overflow-hidden transition-all',
                              expandedFAQ === faq.id ? 'bg-primary/5' : 'bg-surface-light hover:bg-surface-light/80'
                            )}
                          >
                            <button
                              onClick={() =>
                                setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                              }
                              className="w-full flex items-center justify-between p-4 text-left"
                            >
                              <div className="flex items-center gap-3">
                                <ChevronRight
                                  className={cn(
                                    'w-5 h-5 text-text-muted transition-transform',
                                    expandedFAQ === faq.id && 'rotate-90'
                                  )}
                                />
                                <div>
                                  <p className="font-medium">{faq.question}</p>
                                  <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                                    <span
                                      className={cn(
                                        'px-2 py-0.5 rounded-full',
                                        categoryColors[faq.category]
                                      )}
                                    >
                                      {faq.category}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Star className="w-3 h-3" />
                                      {faq.helpful} found helpful
                                    </span>
                                    <span>{faq.views} views</span>
                                  </div>
                                </div>
                              </div>
                            </button>
                            <AnimatePresence>
                              {expandedFAQ === faq.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 pt-0 pl-12">
                                    <p className="text-text-muted leading-relaxed">
                                      {faq.answer}
                                    </p>
                                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5">
                                      <button className="flex items-center gap-1 text-xs text-text-muted hover:text-success transition-colors">
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        Helpful
                                      </button>
                                      <button className="flex items-center gap-1 text-xs text-text-muted hover:text-error transition-colors">
                                        <XCircle className="w-3.5 h-3.5" />
                                        Not helpful
                                      </button>
                                      <button className="flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors ml-auto">
                                        <Edit className="w-3.5 h-3.5" />
                                        Edit
                                      </button>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Knowledge Base Tab */}
            {activeTab === 'knowledge' && (
              <motion.div
                key="knowledge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card hover={false} className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Knowledge Base
                    </h2>
                    <Button variant="primary" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      New Article
                    </Button>
                  </div>

                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Search knowledge base articles..."
                      value={kbSearch}
                      onChange={(e) => setKbSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-surface-light border border-white/5 rounded-xl text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredArticles.map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="h-full cursor-pointer hover:border-primary/30">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <span
                              className={cn(
                                'px-2 py-0.5 rounded-full text-xs font-medium',
                                kbCategoryColors[article.category]
                              )}
                            >
                              {article.category}
                            </span>
                          </div>
                          <h3 className="font-semibold mb-2">{article.title}</h3>
                          <p className="text-sm text-text-muted mb-3 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-text-muted">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readTime} read
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {article.views} views
                            </span>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {filteredArticles.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No articles found</h3>
                      <p className="text-text-muted">Try a different search term.</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}

            {/* Live Q&A Tab */}
            {activeTab === 'live' && (
              <motion.div
                key="live"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card hover={false}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-success" />
                      Live Chat — Michael Chen
                      <span className="flex items-center gap-1 text-xs text-success">
                        <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        Online
                      </span>
                    </h2>
                    <Button variant="ghost" size="sm">
                      <XCircle className="w-4 h-4 mr-2" />
                      End Chat
                    </Button>
                  </div>

                  {/* Chat Messages */}
                  <div className="h-80 overflow-y-auto space-y-4 p-4 bg-surface-light rounded-xl mb-4">
                    {chatMessages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          'flex gap-3',
                          msg.sender === 'agent' && 'flex-row-reverse'
                        )}
                      >
                        <div
                          className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0',
                            msg.sender === 'customer'
                              ? 'bg-gradient-to-br from-secondary to-secondary-light'
                              : 'bg-gradient-to-br from-primary to-primary-light'
                          )}
                        >
                          {msg.sender === 'customer' ? 'MC' : 'SA'}
                        </div>
                        <div
                          className={cn(
                            'max-w-xs lg:max-w-sm rounded-xl px-4 py-2',
                            msg.sender === 'customer'
                              ? 'bg-surface border border-white/5'
                              : 'bg-primary/10'
                          )}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p className="text-xs text-text-muted mt-1">{msg.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Type your response..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 px-4 py-3 bg-surface-light border border-white/5 rounded-xl text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                    <Button variant="primary" size="sm" onClick={handleSendMessage}>
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>

                  {/* Quick Responses */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['Thank you for contacting us!', 'Let me check that for you.', 'Is there anything else I can help with?', 'Your issue has been resolved.'].map(
                      (quick) => (
                        <button
                          key={quick}
                          onClick={() => setChatInput(quick)}
                          className="px-3 py-1.5 text-xs bg-surface-light hover:bg-primary/10 text-text-muted hover:text-primary rounded-full transition-colors"
                        >
                          {quick}
                        </button>
                      )
                    )}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: 'Create Ticket', icon: Plus, color: 'text-primary', bg: 'bg-primary/10' },
                { label: 'Add FAQ', icon: HelpCircle, color: 'text-success', bg: 'bg-success/10' },
                { label: 'View Analytics', icon: BarChart3, color: 'text-warning', bg: 'bg-warning/10' },
                { label: 'Knowledge Base', icon: BookOpen, color: 'text-secondary', bg: 'bg-secondary/10' },
                { label: 'Start Live Chat', icon: MessageCircle, color: 'text-primary', bg: 'bg-primary/10' },
              ].map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-light hover:bg-primary/10 transition-all duration-200 group text-left"
                >
                  <div className={cn('p-2 rounded-lg', action.bg)}>
                    <action.icon className={cn('w-4 h-4', action.color)} />
                  </div>
                  <span className="text-sm text-text-muted group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </Card>

          {/* Ticket Status Breakdown */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Ticket Status</h2>
            <div className="space-y-3">
              {[
                { label: 'Open', count: sampleTickets.filter((t) => t.status === 'Open').length, color: 'bg-primary' },
                { label: 'In Progress', count: sampleTickets.filter((t) => t.status === 'In Progress').length, color: 'bg-warning' },
                { label: 'Resolved', count: sampleTickets.filter((t) => t.status === 'Resolved').length, color: 'bg-success' },
                { label: 'Closed', count: sampleTickets.filter((t) => t.status === 'Closed').length, color: 'bg-text-muted' },
              ].map((status, index) => (
                <motion.div
                  key={status.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-muted flex items-center gap-2">
                      <span className={cn('w-2 h-2 rounded-full', status.color)} />
                      {status.label}
                    </span>
                    <span className="font-medium">{status.count}</span>
                  </div>
                  <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(status.count / sampleTickets.length) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className={cn('h-full rounded-full', status.color)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Priority Breakdown */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Priority Breakdown</h2>
            <div className="space-y-3">
              {[
                { label: 'Urgent', count: sampleTickets.filter((t) => t.priority === 'Urgent').length, color: 'bg-error' },
                { label: 'High', count: sampleTickets.filter((t) => t.priority === 'High').length, color: 'bg-warning' },
                { label: 'Medium', count: sampleTickets.filter((t) => t.priority === 'Medium').length, color: 'bg-primary' },
                { label: 'Low', count: sampleTickets.filter((t) => t.priority === 'Low').length, color: 'bg-text-muted' },
              ].map((priority, index) => (
                <motion.div
                  key={priority.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-muted flex items-center gap-2">
                      <span className={cn('w-2 h-2 rounded-full', priority.color)} />
                      {priority.label}
                    </span>
                    <span className="font-medium">{priority.count}</span>
                  </div>
                  <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(priority.count / sampleTickets.length) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className={cn('h-full rounded-full', priority.color)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: 'Ticket TKT-1001 updated', time: '5 min ago', icon: Edit, color: 'text-primary' },
                { action: 'FAQ added: "API Rate Limits"', time: '1 hour ago', icon: HelpCircle, color: 'text-success' },
                { action: 'Ticket TKT-1005 resolved', time: '2 hours ago', icon: CheckCircle, color: 'text-success' },
                { action: 'KB article updated', time: '3 hours ago', icon: FileText, color: 'text-warning' },
                { action: 'New ticket TKT-1008 created', time: '4 hours ago', icon: Plus, color: 'text-secondary' },
              ].map((activity, index) => (
                <motion.div
                  key={activity.action}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-light transition-colors"
                >
                  <activity.icon className={cn('w-4 h-4', activity.color)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{activity.action}</p>
                    <p className="text-xs text-text-muted">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
