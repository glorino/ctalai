'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  Building,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from 'lucide-react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cn, formatDate } from '@/lib/utils'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  type: 'Individual' | 'Corporate' | 'Enterprise'
  status: 'Active' | 'Inactive' | 'Lead' | 'Churned'
  lastInteraction: string
  joinedDate: string
  totalSpend: number
  avatar?: string
}

const sampleCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+234 801 234 5678',
    type: 'Corporate',
    status: 'Active',
    lastInteraction: '2026-09-05',
    joinedDate: '2025-03-15',
    totalSpend: 2500000,
  },
  {
    id: 'CUST-002',
    name: 'Michael Chen',
    email: 'michael.chen@innovate.io',
    phone: '+234 802 345 6789',
    type: 'Enterprise',
    status: 'Active',
    lastInteraction: '2026-09-07',
    joinedDate: '2024-11-20',
    totalSpend: 5200000,
  },
  {
    id: 'CUST-003',
    name: 'Amina Ibrahim',
    email: 'amina.ibrahim@gmail.com',
    phone: '+234 803 456 7890',
    type: 'Individual',
    status: 'Lead',
    lastInteraction: '2026-09-08',
    joinedDate: '2026-09-01',
    totalSpend: 0,
  },
  {
    id: 'CUST-004',
    name: 'David Williams',
    email: 'david.w@startup.ng',
    phone: '+234 804 567 8901',
    type: 'Corporate',
    status: 'Active',
    lastInteraction: '2026-09-04',
    joinedDate: '2025-06-10',
    totalSpend: 1800000,
  },
  {
    id: 'CUST-005',
    name: 'Fatima Al-Hassan',
    email: 'fatima@enterprise.com',
    phone: '+234 805 678 9012',
    type: 'Enterprise',
    status: 'Churned',
    lastInteraction: '2026-07-15',
    joinedDate: '2024-08-05',
    totalSpend: 3400000,
  },
  {
    id: 'CUST-006',
    name: 'James Okonkwo',
    email: 'james.o@creative.co',
    phone: '+234 806 789 0123',
    type: 'Individual',
    status: 'Active',
    lastInteraction: '2026-09-06',
    joinedDate: '2025-01-22',
    totalSpend: 750000,
  },
  {
    id: 'CUST-007',
    name: 'Grace Adekunle',
    email: 'grace.a@finserv.com',
    phone: '+234 807 890 1234',
    type: 'Corporate',
    status: 'Inactive',
    lastInteraction: '2026-06-20',
    joinedDate: '2024-12-01',
    totalSpend: 1200000,
  },
  {
    id: 'CUST-008',
    name: 'Emmanuel Nwankwo',
    email: 'emmanuel@techstartup.ng',
    phone: '+234 808 901 2345',
    type: 'Individual',
    status: 'Lead',
    lastInteraction: '2026-09-08',
    joinedDate: '2026-09-05',
    totalSpend: 0,
  },
  {
    id: 'CUST-009',
    name: 'Chioma Eze',
    email: 'chioma.eze@megacorp.com',
    phone: '+234 809 012 3456',
    type: 'Enterprise',
    status: 'Active',
    lastInteraction: '2026-09-03',
    joinedDate: '2024-05-18',
    totalSpend: 7800000,
  },
  {
    id: 'CUST-010',
    name: 'Oluwaseun Bakare',
    email: 'seun.b@digital.ng',
    phone: '+234 810 123 4567',
    type: 'Individual',
    status: 'Active',
    lastInteraction: '2026-09-07',
    joinedDate: '2025-09-30',
    totalSpend: 450000,
  },
  {
    id: 'CUST-011',
    name: 'Aisha Mohammed',
    email: 'aisha.m@consulting.com',
    phone: '+234 811 234 5678',
    type: 'Corporate',
    status: 'Active',
    lastInteraction: '2026-09-02',
    joinedDate: '2025-04-12',
    totalSpend: 2100000,
  },
  {
    id: 'CUST-012',
    name: 'Tunde Afolabi',
    email: 'tunde.a@freelance.com',
    phone: '+234 812 345 6789',
    type: 'Individual',
    status: 'Churned',
    lastInteraction: '2026-05-10',
    joinedDate: '2024-10-08',
    totalSpend: 320000,
  },
]

const stats = [
  {
    title: 'Total Customers',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'primary',
  },
  {
    title: 'Active Customers',
    value: '1,923',
    change: '+8.3%',
    trend: 'up',
    icon: UserCheck,
    color: 'success',
  },
  {
    title: 'Churned',
    value: '184',
    change: '-2.1%',
    trend: 'down',
    icon: UserX,
    color: 'error',
  },
  {
    title: 'New This Month',
    value: '127',
    change: '+24.5%',
    trend: 'up',
    icon: UserPlus,
    color: 'secondary',
  },
]

const statusColors: Record<string, string> = {
  Active: 'bg-success/20 text-success',
  Inactive: 'bg-warning/20 text-warning',
  Lead: 'bg-primary/20 text-primary',
  Churned: 'bg-error/20 text-error',
}

const typeColors: Record<string, string> = {
  Individual: 'bg-surface-light text-text-muted',
  Corporate: 'bg-primary/10 text-primary',
  Enterprise: 'bg-secondary/10 text-secondary',
}

export default function CRMPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [typeFilter, setTypeFilter] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const itemsPerPage = 6

  const filteredCustomers = sampleCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter
    const matchesType = typeFilter === 'All' || customer.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const paginatedCustomers = filteredCustomers.slice(
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
            Customer Relationship Management
          </h1>
          <p className="text-text-muted">
            Manage your customers, track interactions, and grow relationships.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
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
                    <span className="text-text-muted text-sm">vs last month</span>
                  </div>
                </div>
                <div
                  className={cn(
                    'p-3 rounded-xl',
                    stat.color === 'primary' && 'bg-primary/10',
                    stat.color === 'success' && 'bg-success/10',
                    stat.color === 'secondary' && 'bg-secondary/10',
                    stat.color === 'error' && 'bg-error/10'
                  )}
                >
                  <stat.icon
                    className={cn(
                      'w-6 h-6',
                      stat.color === 'primary' && 'text-primary',
                      stat.color === 'success' && 'text-success',
                      stat.color === 'secondary' && 'text-secondary',
                      stat.color === 'error' && 'text-error'
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
                  stat.color === 'error' && 'bg-gradient-to-r from-error to-red-400'
                )}
              />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <Card hover={false}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search customers by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-3 bg-surface-light border border-white/5 rounded-xl text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Filter Toggle */}
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

        {/* Filter Options */}
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
                {/* Status Filter */}
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
                    <option value="Lead">Lead</option>
                    <option value="Churned">Churned</option>
                  </select>
                </div>

                {/* Type Filter */}
                <div className="flex-1 min-w-[200px]">
                  <label className="text-sm text-text-muted mb-2 block">Customer Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => {
                      setTypeFilter(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full px-4 py-2.5 bg-surface-light border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                  >
                    <option value="All">All Types</option>
                    <option value="Individual">Individual</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('')
                      setStatusFilter('All')
                      setTypeFilter('All')
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

      {/* Customer List */}
      <div className="space-y-4">
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-sm text-text-muted">
          <div className="col-span-3">Customer</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Last Interaction</div>
          <div className="col-span-2">Total Spend</div>
          <div className="col-span-1">Actions</div>
        </div>

        {/* Customer Cards */}
        <AnimatePresence mode="popLayout">
          {paginatedCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <Card
                className={cn(
                  'cursor-pointer',
                  selectedCustomer === customer.id && 'ring-2 ring-primary'
                )}
                onClick={() => setSelectedCustomer(customer.id)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  {/* Customer Info */}
                  <div className="lg:col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
                      {customer.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-text-muted">{customer.email}</p>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="lg:col-span-2">
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium',
                        typeColors[customer.type]
                      )}
                    >
                      {customer.type}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="lg:col-span-2">
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium',
                        statusColors[customer.status]
                      )}
                    >
                      {customer.status}
                    </span>
                  </div>

                  {/* Last Interaction */}
                  <div className="lg:col-span-2">
                    <p className="text-sm">{formatDate(customer.lastInteraction)}</p>
                  </div>

                  {/* Total Spend */}
                  <div className="lg:col-span-2">
                    <p className="text-sm font-medium">{formatCurrency(customer.totalSpend)}</p>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-1 flex items-center gap-2">
                    <button
                      className="p-2 rounded-lg hover:bg-surface-light transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        // View action
                      }}
                    >
                      <Eye className="w-4 h-4 text-text-muted hover:text-primary" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-surface-light transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Edit action
                      }}
                    >
                      <Edit className="w-4 h-4 text-text-muted hover:text-primary" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-surface-light transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Delete action
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-text-muted hover:text-error" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <Card hover={false} className="text-center py-12">
            <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No customers found</h3>
            <p className="text-text-muted mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('All')
                setTypeFilter('All')
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {filteredCustomers.length > 0 && (
        <Card hover={false}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of{' '}
              {filteredCustomers.length} customers
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

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Building className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Corporate Clients</p>
              <p className="text-xl font-bold">847</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/10">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Individual Clients</p>
              <p className="text-xl font-bold">1,523</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-success/10">
              <Calendar className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Avg. Retention</p>
              <p className="text-xl font-bold">89%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}