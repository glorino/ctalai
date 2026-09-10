'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  GripVertical,
  ChevronDown,
  X,
  Star,
  Mail,
  Phone,
  Building2,
  Tag,
} from 'lucide-react'
import Card from '@/components/ui/card'

type Stage = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiating' | 'won' | 'lost'

interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  score: number
  source: 'web' | 'referral' | 'social' | 'cold_outreach' | 'event' | 'organic'
  status: Stage
  value: number
  assignedTo: string
  createdAt: string
  lastActivity: string
  tags: string[]
}

const stageLabels: Record<Stage, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  proposal_sent: 'Proposal Sent',
  negotiating: 'Negotiating',
  won: 'Won',
  lost: 'Lost',
}

const stageColors: Record<Stage, string> = {
  new: 'bg-primary/20 text-primary',
  contacted: 'bg-blue-500/20 text-blue-400',
  qualified: 'bg-purple-500/20 text-purple-400',
  proposal_sent: 'bg-amber-500/20 text-amber-400',
  negotiating: 'bg-orange-500/20 text-orange-400',
  won: 'bg-success/20 text-success',
  lost: 'bg-error/20 text-error',
}

const stageOrder: Stage[] = ['new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'won', 'lost']

const sourceIcons: Record<Lead['source'], string> = {
  web: '🌐',
  referral: '🤝',
  social: '📱',
  cold_outreach: '📧',
  event: '🎤',
  organic: '🌱',
}

const sourceLabels: Record<Lead['source'], string> = {
  web: 'Web',
  referral: 'Referral',
  social: 'Social',
  cold_outreach: 'Cold Outreach',
  event: 'Event',
  organic: 'Organic',
}

const sampleLeads: Lead[] = [
  {
    id: '1',
    name: 'Adebayo Johnson',
    company: 'TechVentures Nigeria',
    email: 'adebayo@techventures.ng',
    phone: '+234 801 234 5678',
    score: 85,
    source: 'web',
    status: 'qualified',
    value: 2500000,
    assignedTo: 'Sarah Chen',
    createdAt: '2026-09-01',
    lastActivity: '2 hours ago',
    tags: ['Enterprise', 'SaaS'],
  },
  {
    id: '2',
    name: 'Fatima Al-Hassan',
    company: 'GreenEnergy Solutions',
    email: 'fatima@greenenergy.com',
    phone: '+234 802 345 6789',
    score: 92,
    source: 'referral',
    status: 'negotiating',
    value: 5000000,
    assignedTo: 'James Okafor',
    createdAt: '2026-08-28',
    lastActivity: '1 hour ago',
    tags: ['Renewable', 'Enterprise'],
  },
  {
    id: '3',
    name: 'Chinedu Eze',
    company: 'FinTech Hub',
    email: 'chinedu@fintechhub.io',
    phone: '+234 803 456 7890',
    score: 68,
    source: 'social',
    status: 'contacted',
    value: 1200000,
    assignedTo: 'Sarah Chen',
    createdAt: '2026-09-05',
    lastActivity: '3 hours ago',
    tags: ['Fintech', 'Startup'],
  },
  {
    id: '4',
    name: 'Grace Nwankwo',
    company: 'HealthPlus Africa',
    email: 'grace@healthplus.africa',
    phone: '+234 804 567 8901',
    score: 78,
    source: 'event',
    status: 'proposal_sent',
    value: 3200000,
    assignedTo: 'Michael Brown',
    createdAt: '2026-08-20',
    lastActivity: '5 hours ago',
    tags: ['Healthcare', 'Mid-Market'],
  },
  {
    id: '5',
    name: 'Oluwaseun Adeyemi',
    company: 'AgroTech Nigeria',
    email: 'seun@agrotech.ng',
    phone: '+234 805 678 9012',
    score: 45,
    source: 'cold_outreach',
    status: 'new',
    value: 800000,
    assignedTo: 'James Okafor',
    createdAt: '2026-09-07',
    lastActivity: '1 day ago',
    tags: ['Agriculture', 'SMB'],
  },
  {
    id: '6',
    name: 'Amina Bello',
    company: 'EduTech Academy',
    email: 'amina@edutech.ac',
    phone: '+234 806 789 0123',
    score: 88,
    source: 'organic',
    status: 'won',
    value: 4500000,
    assignedTo: 'Sarah Chen',
    createdAt: '2026-08-15',
    lastActivity: '2 days ago',
    tags: ['Education', 'Enterprise'],
  },
  {
    id: '7',
    name: 'Emeka Obi',
    company: 'LogiFlow Systems',
    email: 'emeka@logiflow.com',
    phone: '+234 807 890 1234',
    score: 55,
    source: 'web',
    status: 'contacted',
    value: 1800000,
    assignedTo: 'Michael Brown',
    createdAt: '2026-09-03',
    lastActivity: '4 hours ago',
    tags: ['Logistics', 'Mid-Market'],
  },
  {
    id: '8',
    name: 'Ngozi Okonkwo',
    company: 'Digital Marketing Pro',
    email: 'ngozi@digitalmarketing.ng',
    phone: '+234 808 901 2345',
    score: 72,
    source: 'referral',
    status: 'qualified',
    value: 2100000,
    assignedTo: 'James Okafor',
    createdAt: '2026-09-02',
    lastActivity: '6 hours ago',
    tags: ['Marketing', 'SMB'],
  },
  {
    id: '9',
    name: 'Tunde Bakare',
    company: 'CryptoVault Exchange',
    email: 'tunde@cryptovault.io',
    phone: '+234 809 012 3456',
    score: 35,
    source: 'social',
    status: 'lost',
    value: 600000,
    assignedTo: 'Sarah Chen',
    createdAt: '2026-08-25',
    lastActivity: '1 week ago',
    tags: ['Crypto', 'Startup'],
  },
  {
    id: '10',
    name: 'Chioma Igwe',
    company: 'SmartHome Nigeria',
    email: 'chioma@smarthome.ng',
    phone: '+234 810 123 4567',
    score: 81,
    source: 'event',
    status: 'proposal_sent',
    value: 2800000,
    assignedTo: 'Michael Brown',
    createdAt: '2026-08-22',
    lastActivity: '12 hours ago',
    tags: ['IoT', 'Enterprise'],
  },
  {
    id: '11',
    name: 'Ibrahim Mohammed',
    company: 'Supply Chain Africa',
    email: 'ibrahim@supplychain.africa',
    phone: '+234 811 234 5678',
    score: 62,
    source: 'cold_outreach',
    status: 'new',
    value: 950000,
    assignedTo: 'James Okafor',
    createdAt: '2026-09-06',
    lastActivity: '2 days ago',
    tags: ['Logistics', 'SMB'],
  },
  {
    id: '12',
    name: 'Funke Adekunle',
    company: 'CloudFirst Solutions',
    email: 'funke@cloudfirst.dev',
    phone: '+234 812 345 6789',
    score: 90,
    source: 'web',
    status: 'negotiating',
    value: 4200000,
    assignedTo: 'Sarah Chen',
    createdAt: '2026-08-18',
    lastActivity: '30 minutes ago',
    tags: ['Cloud', 'Enterprise'],
  },
]

const teamMembers = ['Sarah Chen', 'James Okafor', 'Michael Brown']

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(sampleLeads)
  const [searchQuery, setSearchQuery] = useState('')
  const [sourceFilter, setSourceFilter] = useState<Lead['source'] | 'all'>('all')
  const [scoreFilter, setScoreFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [draggedLead, setDraggedLead] = useState<string | null>(null)
  const [dragOverStage, setDragOverStage] = useState<Stage | null>(null)

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter

      const matchesScore =
        scoreFilter === 'all' ||
        (scoreFilter === 'high' && lead.score >= 80) ||
        (scoreFilter === 'medium' && lead.score >= 50 && lead.score < 80) ||
        (scoreFilter === 'low' && lead.score < 50)

      return matchesSearch && matchesSource && matchesScore
    })
  }, [leads, searchQuery, sourceFilter, scoreFilter])

  const stats = useMemo(() => {
    const totalLeads = filteredLeads.length
    const wonLeads = filteredLeads.filter((l) => l.status === 'won').length
    const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : '0'
    const pipelineValue = filteredLeads
      .filter((l) => !['won', 'lost'].includes(l.status))
      .reduce((sum, l) => sum + l.value, 0)
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const newThisWeek = filteredLeads.filter((l) => new Date(l.createdAt) >= weekAgo).length

    return { totalLeads, conversionRate, pipelineValue, newThisWeek }
  }, [filteredLeads])

  const handleDragStart = (leadId: string) => {
    setDraggedLead(leadId)
  }

  const handleDragOver = (e: React.DragEvent, stage: Stage) => {
    e.preventDefault()
    setDragOverStage(stage)
  }

  const handleDragLeave = () => {
    setDragOverStage(null)
  }

  const handleDrop = (e: React.DragEvent, stage: Stage) => {
    e.preventDefault()
    if (draggedLead) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === draggedLead ? { ...lead, status: stage } : lead
        )
      )
    }
    setDraggedLead(null)
    setDragOverStage(null)
  }

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `₦${(value / 1000000).toFixed(1)}M`
    }
    return `₦${(value / 1000).toFixed(0)}K`
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success'
    if (score >= 50) return 'text-warning'
    return 'text-error'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-success/20'
    if (score >= 50) return 'bg-warning/20'
    return 'bg-error/20'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">
            Lead Generation & Pipeline
          </h1>
          <p className="text-text-muted">
            Manage and track your leads through the sales pipeline.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-gradient flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Lead
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Leads',
            value: stats.totalLeads.toString(),
            change: '+8.3%',
            trend: 'up',
            icon: Users,
            color: 'primary',
          },
          {
            title: 'Conversion Rate',
            value: `${stats.conversionRate}%`,
            change: '+2.1%',
            trend: 'up',
            icon: Target,
            color: 'success',
          },
          {
            title: 'Pipeline Value',
            value: formatValue(stats.pipelineValue),
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'secondary',
          },
          {
            title: 'New This Week',
            value: stats.newThisWeek.toString(),
            change: '+3',
            trend: 'up',
            icon: Calendar,
            color: 'warning',
          },
        ].map((stat, index) => (
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
                  className={`p-3 rounded-xl ${
                    stat.color === 'primary'
                      ? 'bg-primary/10'
                      : stat.color === 'success'
                      ? 'bg-success/10'
                      : stat.color === 'secondary'
                      ? 'bg-secondary/10'
                      : 'bg-warning/10'
                  }`}
                >
                  <stat.icon
                    className={`w-6 h-6 ${
                      stat.color === 'primary'
                        ? 'text-primary'
                        : stat.color === 'success'
                        ? 'text-success'
                        : stat.color === 'secondary'
                        ? 'text-secondary'
                        : 'text-warning'
                    }`}
                  />
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 ${
                  stat.color === 'primary'
                    ? 'bg-gradient-to-r from-primary to-primary-light'
                    : stat.color === 'success'
                    ? 'bg-gradient-to-r from-success to-emerald-400'
                    : stat.color === 'secondary'
                    ? 'bg-gradient-to-r from-secondary to-secondary-light'
                    : 'bg-gradient-to-r from-warning to-amber-400'
                }`}
              />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="!p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search leads by name, company, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-white/10 text-text-muted hover:border-white/20'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-muted">Source:</span>
                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value as Lead['source'] | 'all')}
                    className="input-field text-sm py-1 px-3"
                  >
                    <option value="all">All Sources</option>
                    {Object.entries(sourceLabels).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-muted">Score:</span>
                  <select
                    value={scoreFilter}
                    onChange={(e) => setScoreFilter(e.target.value as typeof scoreFilter)}
                    className="input-field text-sm py-1 px-3"
                  >
                    <option value="all">All Scores</option>
                    <option value="high">High (80+)</option>
                    <option value="medium">Medium (50-79)</option>
                    <option value="low">Low (&lt;50)</option>
                  </select>
                </div>
                {(sourceFilter !== 'all' || scoreFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSourceFilter('all')
                      setScoreFilter('all')
                    }}
                    className="flex items-center gap-1 text-sm text-secondary hover:text-secondary-light transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Clear filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Pipeline Board */}
      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: '500px' }}>
        {stageOrder.map((stage) => {
          const stageLeads = filteredLeads.filter((lead) => lead.status === stage)
          const isDragOver = dragOverStage === stage

          return (
            <div
              key={stage}
              className={`flex-shrink-0 w-72 flex flex-col rounded-2xl transition-colors ${
                isDragOver ? 'bg-primary/5 ring-2 ring-primary/30' : 'bg-surface/50'
              }`}
              onDragOver={(e) => handleDragOver(e, stage)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage)}
            >
              {/* Column Header */}
              <div className="p-4 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${stageColors[stage]}`}
                    >
                      {stageLabels[stage]}
                    </span>
                    <span className="text-sm text-text-muted font-medium">
                      {stageLeads.length}
                    </span>
                  </div>
                  {stageLeads.length > 0 && (
                    <span className="text-xs text-text-muted">
                      {formatValue(stageLeads.reduce((sum, l) => sum + l.value, 0))}
                    </span>
                  )}
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {stageLeads.map((lead) => (
                    <motion.div
                      key={lead.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      draggable
                      onDragStart={() => handleDragStart(lead.id)}
                      onDragEnd={() => {
                        setDraggedLead(null)
                        setDragOverStage(null)
                      }}
                      className={`bg-surface rounded-xl p-4 border border-white/5 cursor-grab active:cursor-grabbing transition-all hover:border-primary/30 ${
                        draggedLead === lead.id ? 'opacity-50 scale-95' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <GripVertical className="w-4 h-4 text-text-muted" />
                          <div>
                            <h4 className="font-medium text-sm">{lead.name}</h4>
                            <p className="text-xs text-text-muted">{lead.company}</p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getScoreBg(
                            lead.score
                          )} ${getScoreColor(lead.score)}`}
                        >
                          {lead.score}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs" title={sourceLabels[lead.source]}>
                          {sourceIcons[lead.source]}
                        </span>
                        <span className="text-xs text-text-muted">{lead.source.replace('_', ' ')}</span>
                        <span className="text-xs text-text-muted mx-1">•</span>
                        <span className="text-xs font-medium text-primary">
                          {formatValue(lead.value)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-[10px] font-medium text-primary">
                              {lead.assignedTo
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </span>
                          </div>
                          <span className="text-xs text-text-muted">{lead.assignedTo.split(' ')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {lead.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded text-[10px] bg-surface-light text-text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                          {lead.tags.length > 2 && (
                            <span className="text-[10px] text-text-muted">
                              +{lead.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          <Mail className="w-3 h-3" />
                          <span className="truncate max-w-[120px]">{lead.email}</span>
                        </div>
                        <span className="text-[10px] text-text-muted">{lead.lastActivity}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {stageLeads.length === 0 && (
                  <div className="text-center py-8 text-text-muted text-sm">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Team Performance */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-warning" />
          Team Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teamMembers.map((member, index) => {
            const memberLeads = leads.filter((l) => l.assignedTo === member)
            const memberWon = memberLeads.filter((l) => l.status === 'won').length
            const memberValue = memberLeads.reduce((sum, l) => sum + l.value, 0)

            return (
              <motion.div
                key={member}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-surface-light"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {member
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{member}</h4>
                    <p className="text-xs text-text-muted">
                      {memberLeads.length} leads assigned
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 rounded-lg bg-surface">
                    <p className="text-xs text-text-muted">Won</p>
                    <p className="text-lg font-bold text-success">{memberWon}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-surface">
                    <p className="text-xs text-text-muted">Value</p>
                    <p className="text-lg font-bold text-primary">{formatValue(memberValue)}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
