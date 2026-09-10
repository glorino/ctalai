'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Handshake,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Mail,
  Phone,
  Building,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Star,
  TrendingUp,
} from 'lucide-react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Partner {
  id: string
  name: string
  email: string
  phone: string
  contactPerson: string
  type: 'Technology' | 'Consulting' | 'Marketing' | 'Finance' | 'Education'
  status: 'Active' | 'Inactive' | 'Pending' | 'Prospect'
  since: string
  revenue: number
  agreements: number
  rating: number
}

interface Agreement {
  id: string
  partner: string
  type: 'Revenue Share' | 'Referral' | 'Integration' | 'Co-Marketing'
  status: 'Active' | 'Pending' | 'Expired' | 'Under Review'
  startDate: string
  endDate: string
  value: number
}

interface Meeting {
  id: string
  partner: string
  title: string
  date: string
  time: string
  type: 'Strategy' | 'Review' | 'Onboarding' | 'Negotiation'
  status: 'Scheduled' | 'Completed' | 'Cancelled'
}

const samplePartners: Partner[] = [
  {
    id: 'PTR-001',
    name: 'TechNova Solutions',
    email: 'partnerships@technova.com',
    phone: '+234 801 234 5678',
    contactPerson: 'Adebayo Johnson',
    type: 'Technology',
    status: 'Active',
    since: '2025-01-15',
    revenue: 4500000,
    agreements: 3,
    rating: 4.8,
  },
  {
    id: 'PTR-002',
    name: 'GreenField Consulting',
    email: 'bizdev@greenfield.ng',
    phone: '+234 802 345 6789',
    contactPerson: 'Chioma Okafor',
    type: 'Consulting',
    status: 'Active',
    since: '2025-03-22',
    revenue: 2800000,
    agreements: 2,
    rating: 4.5,
  },
  {
    id: 'PTR-003',
    name: 'DigitalPulse Media',
    email: 'partners@digitalpulse.io',
    phone: '+234 803 456 7890',
    contactPerson: 'Tunde Afolabi',
    type: 'Marketing',
    status: 'Active',
    since: '2025-06-10',
    revenue: 1900000,
    agreements: 2,
    rating: 4.2,
  },
  {
    id: 'PTR-004',
    name: 'Atlas Financial Services',
    email: 'partnerships@atlasfin.com',
    phone: '+234 804 567 8901',
    contactPerson: 'Fatima Ibrahim',
    type: 'Finance',
    status: 'Pending',
    since: '2026-08-20',
    revenue: 0,
    agreements: 1,
    rating: 0,
  },
  {
    id: 'PTR-005',
    name: 'LearnHub Academy',
    email: 'collab@learnhub.ng',
    phone: '+234 805 678 9012',
    contactPerson: 'Emmanuel Nwankwo',
    type: 'Education',
    status: 'Active',
    since: '2025-09-05',
    revenue: 3200000,
    agreements: 2,
    rating: 4.7,
  },
  {
    id: 'PTR-006',
    name: 'CloudPeak Technologies',
    email: 'devrel@cloudpeak.tech',
    phone: '+234 806 789 0123',
    contactPerson: 'Aisha Mohammed',
    type: 'Technology',
    status: 'Inactive',
    since: '2024-11-12',
    revenue: 850000,
    agreements: 1,
    rating: 3.9,
  },
  {
    id: 'PTR-007',
    name: 'NovaStrat Partners',
    email: 'deals@novastrat.co',
    phone: '+234 807 890 1234',
    contactPerson: 'Olumide Bakare',
    type: 'Consulting',
    status: 'Prospect',
    since: '2026-09-01',
    revenue: 0,
    agreements: 0,
    rating: 0,
  },
  {
    id: 'PTR-008',
    name: 'SwiftMetrics Analytics',
    email: 'partners@swiftmetrics.io',
    phone: '+234 808 901 2345',
    contactPerson: 'Ngozi Eze',
    type: 'Technology',
    status: 'Active',
    since: '2025-07-18',
    revenue: 5100000,
    agreements: 4,
    rating: 4.9,
  },
]

const sampleAgreements: Agreement[] = [
  {
    id: 'AGR-001',
    partner: 'TechNova Solutions',
    type: 'Revenue Share',
    status: 'Active',
    startDate: '2025-01-15',
    endDate: '2027-01-14',
    value: 12000000,
  },
  {
    id: 'AGR-002',
    partner: 'GreenField Consulting',
    type: 'Referral',
    status: 'Active',
    startDate: '2025-03-22',
    endDate: '2026-03-21',
    value: 3500000,
  },
  {
    id: 'AGR-003',
    partner: 'DigitalPulse Media',
    type: 'Co-Marketing',
    status: 'Active',
    startDate: '2025-06-10',
    endDate: '2026-06-09',
    value: 2800000,
  },
  {
    id: 'AGR-004',
    partner: 'Atlas Financial Services',
    type: 'Integration',
    status: 'Pending',
    startDate: '2026-09-01',
    endDate: '2028-08-31',
    value: 8500000,
  },
  {
    id: 'AGR-005',
    partner: 'LearnHub Academy',
    type: 'Revenue Share',
    status: 'Active',
    startDate: '2025-09-05',
    endDate: '2027-09-04',
    value: 6200000,
  },
  {
    id: 'AGR-006',
    partner: 'CloudPeak Technologies',
    type: 'Referral',
    status: 'Expired',
    startDate: '2024-11-12',
    endDate: '2025-11-11',
    value: 1500000,
  },
  {
    id: 'AGR-007',
    partner: 'SwiftMetrics Analytics',
    type: 'Integration',
    status: 'Active',
    startDate: '2025-07-18',
    endDate: '2027-07-17',
    value: 9800000,
  },
  {
    id: 'AGR-008',
    partner: 'SwiftMetrics Analytics',
    type: 'Revenue Share',
    status: 'Under Review',
    startDate: '2026-08-01',
    endDate: '2028-07-31',
    value: 5400000,
  },
]

const sampleMeetings: Meeting[] = [
  {
    id: 'MTG-001',
    partner: 'TechNova Solutions',
    title: 'Q3 Strategy Review',
    date: '2026-09-10',
    time: '10:00 AM',
    type: 'Strategy',
    status: 'Scheduled',
  },
  {
    id: 'MTG-002',
    partner: 'GreenField Consulting',
    title: 'Referral Program Update',
    date: '2026-09-12',
    time: '2:00 PM',
    type: 'Review',
    status: 'Scheduled',
  },
  {
    id: 'MTG-003',
    partner: 'Atlas Financial Services',
    title: 'Onboarding Kickoff',
    date: '2026-09-15',
    time: '11:00 AM',
    type: 'Onboarding',
    status: 'Scheduled',
  },
  {
    id: 'MTG-004',
    partner: 'NovaStrat Partners',
    title: 'Initial Partnership Discussion',
    date: '2026-09-18',
    time: '3:00 PM',
    type: 'Negotiation',
    status: 'Scheduled',
  },
  {
    id: 'MTG-005',
    partner: 'DigitalPulse Media',
    title: 'Co-Marketing Campaign Planning',
    date: '2026-09-05',
    time: '10:30 AM',
    type: 'Strategy',
    status: 'Completed',
  },
  {
    id: 'MTG-006',
    partner: 'LearnHub Academy',
    title: 'Revenue Share Review',
    date: '2026-09-03',
    time: '1:00 PM',
    type: 'Review',
    status: 'Completed',
  },
  {
    id: 'MTG-007',
    partner: 'SwiftMetrics Analytics',
    title: 'Integration Roadmap',
    date: '2026-08-28',
    time: '4:00 PM',
    type: 'Strategy',
    status: 'Completed',
  },
]

const stats = [
  {
    title: 'Total Partners',
    value: '24',
    change: '+4 this quarter',
    trend: 'up',
    icon: Handshake,
    color: 'primary',
  },
  {
    title: 'Active Agreements',
    value: '18',
    change: '+2 this month',
    trend: 'up',
    icon: FileText,
    color: 'success',
  },
  {
    title: 'Meetings This Month',
    value: '12',
    change: '4 remaining',
    trend: 'up',
    icon: Calendar,
    color: 'secondary',
  },
  {
    title: 'Revenue from Partners',
    value: '₦18.4M',
    change: '+23.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'warning',
  },
]

const statusColors: Record<string, string> = {
  Active: 'bg-success/20 text-success',
  Inactive: 'bg-surface-light text-text-muted',
  Pending: 'bg-warning/20 text-warning',
  Prospect: 'bg-primary/20 text-primary',
  Expired: 'bg-error/20 text-error',
  'Under Review': 'bg-secondary/20 text-secondary',
  Scheduled: 'bg-primary/20 text-primary',
  Completed: 'bg-success/20 text-success',
  Cancelled: 'bg-error/20 text-error',
}

const typeColors: Record<string, string> = {
  Technology: 'bg-primary/10 text-primary',
  Consulting: 'bg-success/10 text-success',
  Marketing: 'bg-secondary/10 text-secondary',
  Finance: 'bg-warning/10 text-warning',
  Education: 'bg-primary/10 text-primary',
  'Revenue Share': 'bg-success/10 text-success',
  Referral: 'bg-primary/10 text-primary',
  Integration: 'bg-secondary/10 text-secondary',
  'Co-Marketing': 'bg-warning/10 text-warning',
  Strategy: 'bg-primary/10 text-primary',
  Review: 'bg-success/10 text-success',
  Onboarding: 'bg-secondary/10 text-secondary',
  Negotiation: 'bg-warning/10 text-warning',
}

export default function PartnersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [activeTab, setActiveTab] = useState<'directory' | 'agreements' | 'meetings'>('directory')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 5

  const filteredPartners = samplePartners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || partner.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage)
  const paginatedPartners = filteredPartners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
            Partnerships & Business Development
          </h1>
          <p className="text-text-muted">
            Manage partners, track agreements, and drive business growth.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            View Agreements
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Partner
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
                  </div>
                </div>
                <div
                  className={cn(
                    'p-3 rounded-xl',
                    stat.color === 'primary' && 'bg-primary/10',
                    stat.color === 'success' && 'bg-success/10',
                    stat.color === 'secondary' && 'bg-secondary/10',
                    stat.color === 'warning' && 'bg-warning/10'
                  )}
                >
                  <stat.icon
                    className={cn(
                      'w-6 h-6',
                      stat.color === 'primary' && 'text-primary',
                      stat.color === 'success' && 'text-success',
                      stat.color === 'secondary' && 'text-secondary',
                      stat.color === 'warning' && 'text-warning'
                    )}
                  />
                </div>
              </div>
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 h-1',
                  stat.color === 'primary' && 'bg-gradient-to-r from-primary to-primary-light',
                  stat.color === 'success' && 'bg-gradient-to-r from-success to-emerald-400',
                  stat.color === 'secondary' && 'bg-gradient-to-r from-secondary to-secondary-light',
                  stat.color === 'warning' && 'bg-gradient-to-r from-warning to-amber-400'
                )}
              />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-surface rounded-xl w-fit">
        {[
          { id: 'directory' as const, label: 'Partner Directory', icon: Users },
          { id: 'agreements' as const, label: 'Agreements', icon: FileText },
          { id: 'meetings' as const, label: 'Meeting Logs', icon: Calendar },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-text-muted hover:text-white hover:bg-surface-light'
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <Card hover={false}>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search partners, contacts, or emails..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
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
                    onChange={(e) => {
                      setStatusFilter(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full px-4 py-2.5 bg-surface-light border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                    <option value="Prospect">Prospect</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('')
                      setStatusFilter('All')
                      setCurrentPage(1)
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

      {/* Partner Directory Tab */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {paginatedPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Card>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Partner Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                        {partner.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{partner.name}</h3>
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded-full text-xs font-medium',
                              statusColors[partner.status]
                            )}
                          >
                            {partner.status}
                          </span>
                        </div>
                        <p className="text-sm text-text-muted">{partner.contactPerson}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1 text-xs text-text-muted">
                            <Mail className="w-3 h-3" />
                            {partner.email}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-text-muted">
                            <Phone className="w-3 h-3" />
                            {partner.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Partner Details */}
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-text-muted">Type</p>
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-medium',
                            typeColors[partner.type]
                          )}
                        >
                          {partner.type}
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-text-muted">Revenue</p>
                        <p className="text-sm font-semibold">
                          {partner.revenue > 0 ? formatCurrency(partner.revenue) : '-'}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-text-muted">Agreements</p>
                        <p className="text-sm font-semibold">{partner.agreements}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-text-muted">Rating</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-warning fill-warning" />
                          <p className="text-sm font-semibold">
                            {partner.rating > 0 ? partner.rating : '-'}
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-text-muted">Since</p>
                        <p className="text-sm font-semibold">{partner.since}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                          <Eye className="w-4 h-4 text-text-muted hover:text-primary" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                          <Edit className="w-4 h-4 text-text-muted hover:text-primary" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                          <ExternalLink className="w-4 h-4 text-text-muted hover:text-primary" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredPartners.length === 0 && (
            <Card hover={false} className="text-center py-12">
              <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No partners found</h3>
              <p className="text-text-muted mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setStatusFilter('All')
                }}
              >
                Clear Filters
              </Button>
            </Card>
          )}

          {filteredPartners.length > 0 && (
            <Card hover={false}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-text-muted">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, filteredPartners.length)} of{' '}
                  {filteredPartners.length} partners
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        'w-8 h-8 rounded-lg text-sm font-medium transition-all',
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'text-text-muted hover:bg-surface-light'
                      )}
                    >
                      {page}
                    </button>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Agreements Tab */}
      {activeTab === 'agreements' && (
        <div className="space-y-4">
          <Card hover={false}>
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-sm text-text-muted border-b border-white/5">
              <div className="col-span-2">Agreement</div>
              <div className="col-span-3">Partner</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Value</div>
              <div className="col-span-1">End Date</div>
              <div className="col-span-1">Action</div>
            </div>

            <AnimatePresence mode="popLayout">
              {sampleAgreements.map((agreement, index) => (
                <motion.div
                  key={agreement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center px-6 py-4 border-b border-white/5 last:border-0 hover:bg-surface-light/50 transition-colors"
                >
                  <div className="lg:col-span-2">
                    <p className="font-medium text-sm">{agreement.id}</p>
                  </div>
                  <div className="lg:col-span-3">
                    <p className="font-medium text-sm">{agreement.partner}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium',
                        typeColors[agreement.type]
                      )}
                    >
                      {agreement.type}
                    </span>
                  </div>
                  <div className="lg:col-span-2">
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium',
                        statusColors[agreement.status]
                      )}
                    >
                      {agreement.status}
                    </span>
                  </div>
                  <div className="lg:col-span-1">
                    <p className="text-sm font-semibold">{formatCurrency(agreement.value)}</p>
                  </div>
                  <div className="lg:col-span-1">
                    <p className="text-sm">{agreement.endDate}</p>
                  </div>
                  <div className="lg:col-span-1">
                    <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                      <Eye className="w-4 h-4 text-text-muted hover:text-primary" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </Card>
        </div>
      )}

      {/* Meetings Tab */}
      {activeTab === 'meetings' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Meetings */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Upcoming Meetings
                </h2>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Schedule
                </Button>
              </div>
              <div className="space-y-3">
                {sampleMeetings
                  .filter((m) => m.status === 'Scheduled')
                  .map((meeting, index) => (
                    <motion.div
                      key={meeting.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-surface-light"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{meeting.title}</h4>
                          <p className="text-sm text-text-muted">{meeting.partner}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-xs text-text-muted">
                              <Calendar className="w-3 h-3" />
                              {meeting.date}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-text-muted">
                              <Clock className="w-3 h-3" />
                              {meeting.time}
                            </span>
                          </div>
                        </div>
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-medium',
                            typeColors[meeting.type]
                          )}
                        >
                          {meeting.type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </Card>

            {/* Completed Meetings */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Completed Meetings
                </h2>
              </div>
              <div className="space-y-3">
                {sampleMeetings
                  .filter((m) => m.status === 'Completed')
                  .map((meeting, index) => (
                    <motion.div
                      key={meeting.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-surface-light"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{meeting.title}</h4>
                          <p className="text-sm text-text-muted">{meeting.partner}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="flex items-center gap-1 text-xs text-text-muted">
                              <Calendar className="w-3 h-3" />
                              {meeting.date}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-text-muted">
                              <Clock className="w-3 h-3" />
                              {meeting.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              'px-3 py-1 rounded-full text-xs font-medium',
                              typeColors[meeting.type]
                            )}
                          >
                            {meeting.type}
                          </span>
                          <CheckCircle className="w-4 h-4 text-success" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Quick Actions & Performance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Summary */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              Performance Summary
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-surface-light">
                <p className="text-sm text-text-muted">Partner Revenue</p>
                <p className="text-xl font-bold mt-1">₦18.4M</p>
                <p className="text-xs text-success mt-1">+23.5% vs last quarter</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-light">
                <p className="text-sm text-text-muted">Avg. Deal Size</p>
                <p className="text-xl font-bold mt-1">₦2.3M</p>
                <p className="text-xs text-success mt-1">+12.8% growth</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-light">
                <p className="text-sm text-text-muted">Conversion Rate</p>
                <p className="text-xl font-bold mt-1">68%</p>
                <p className="text-xs text-success mt-1">+5.2% improvement</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-light">
                <p className="text-sm text-text-muted">Partner Satisfaction</p>
                <p className="text-xl font-bold mt-1">4.6/5</p>
                <p className="text-xs text-success mt-1">+0.3 from last survey</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="h-full">
            <h2 className="text-lg font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {[
                {
                  label: 'Add Partner',
                  icon: Plus,
                  color: 'text-primary',
                  bg: 'bg-primary/10',
                },
                {
                  label: 'Schedule Meeting',
                  icon: Calendar,
                  color: 'text-success',
                  bg: 'bg-success/10',
                },
                {
                  label: 'View Agreements',
                  icon: FileText,
                  color: 'text-secondary',
                  bg: 'bg-secondary/10',
                },
                {
                  label: 'Generate Report',
                  icon: TrendingUp,
                  color: 'text-warning',
                  bg: 'bg-warning/10',
                },
                {
                  label: 'Send Proposal',
                  icon: Mail,
                  color: 'text-primary',
                  bg: 'bg-primary/10',
                },
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
        </div>
      </div>
    </div>
  )
}
