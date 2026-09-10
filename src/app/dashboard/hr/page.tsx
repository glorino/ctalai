'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  UserCheck,
  UserMinus,
  Briefcase,
  Search,
  Filter,
  ChevronDown,
  Plus,
  Clock,
  Calendar,
  Award,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  Edit,
  BarChart3,
  Target,
  BriefcaseBusiness,
  GraduationCap,
} from 'lucide-react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface StaffMember {
  id: string
  name: string
  role: string
  department: string
  status: 'Active' | 'On Leave' | 'Remote' | 'Probation'
  joinDate: string
  email: string
  performance: number
  attendance: number
  initials: string
}

interface LeaveRequest {
  id: string
  staffName: string
  type: 'Annual' | 'Sick' | 'Maternity' | 'Paternity' | 'Compassionate'
  startDate: string
  endDate: string
  days: number
  status: 'Pending' | 'Approved' | 'Rejected'
  reason: string
}

interface KPI {
  id: string
  title: string
  target: number
  current: number
  unit: string
  department: string
}

interface JobOpening {
  id: string
  title: string
  department: string
  applicants: number
  status: 'Open' | 'Interviewing' | 'Closed'
  deadline: string
}

interface RecruitmentPipeline {
  stage: string
  count: number
  color: string
}

const sampleStaff: StaffMember[] = [
  {
    id: 'STF-001',
    name: 'Adaeze Okonkwo',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    status: 'Active',
    joinDate: '2024-03-15',
    email: 'adaeze.okonkwo@ctal.com',
    performance: 92,
    attendance: 97,
    initials: 'AO',
  },
  {
    id: 'STF-002',
    name: 'Kemi Adeyemi',
    role: 'Marketing Manager',
    department: 'Marketing',
    status: 'Active',
    joinDate: '2023-09-01',
    email: 'kemi.adeyemi@ctal.com',
    performance: 88,
    attendance: 95,
    initials: 'KA',
  },
  {
    id: 'STF-003',
    name: 'Emeka Nwosu',
    role: 'Financial Analyst',
    department: 'Finance',
    status: 'On Leave',
    joinDate: '2024-01-10',
    email: 'emeka.nwosu@ctal.com',
    performance: 85,
    attendance: 91,
    initials: 'EN',
  },
  {
    id: 'STF-004',
    name: 'Fatima Bello',
    role: 'UX Designer',
    department: 'Product',
    status: 'Remote',
    joinDate: '2024-06-20',
    email: 'fatima.bello@ctal.com',
    performance: 90,
    attendance: 93,
    initials: 'FB',
  },
  {
    id: 'STF-005',
    name: 'Tunde Afolabi',
    role: 'Sales Executive',
    department: 'Sales',
    status: 'Active',
    joinDate: '2025-01-05',
    email: 'tunde.afolabi@ctal.com',
    performance: 78,
    attendance: 88,
    initials: 'TA',
  },
  {
    id: 'STF-006',
    name: 'Chidinma Eze',
    role: 'HR Coordinator',
    department: 'Human Resources',
    status: 'Active',
    joinDate: '2023-11-15',
    email: 'chidinma.eze@ctal.com',
    performance: 94,
    attendance: 98,
    initials: 'CE',
  },
  {
    id: 'STF-007',
    name: 'Yusuf Abdullahi',
    role: 'DevOps Engineer',
    department: 'Engineering',
    status: 'Active',
    joinDate: '2024-04-01',
    email: 'yusuf.abdullahi@ctal.com',
    performance: 87,
    attendance: 94,
    initials: 'YA',
  },
  {
    id: 'STF-008',
    name: 'Grace Ogundimu',
    role: 'Project Manager',
    department: 'Operations',
    status: 'Probation',
    joinDate: '2026-07-15',
    email: 'grace.ogundimu@ctal.com',
    performance: 82,
    attendance: 96,
    initials: 'GO',
  },
]

const sampleLeaveRequests: LeaveRequest[] = [
  {
    id: 'LV-001',
    staffName: 'Emeka Nwosu',
    type: 'Annual',
    startDate: '2026-09-10',
    endDate: '2026-09-15',
    days: 5,
    status: 'Approved',
    reason: 'Family vacation',
  },
  {
    id: 'LV-002',
    staffName: 'Kemi Adeyemi',
    type: 'Sick',
    startDate: '2026-09-08',
    endDate: '2026-09-09',
    days: 2,
    status: 'Pending',
    reason: 'Medical appointment',
  },
  {
    id: 'LV-003',
    staffName: 'Tunde Afolabi',
    type: 'Compassionate',
    startDate: '2026-09-12',
    endDate: '2026-09-14',
    days: 3,
    status: 'Pending',
    reason: 'Family emergency',
  },
  {
    id: 'LV-004',
    staffName: 'Fatima Bello',
    type: 'Annual',
    startDate: '2026-09-20',
    endDate: '2026-09-25',
    days: 5,
    status: 'Pending',
    reason: 'Personal travel',
  },
  {
    id: 'LV-005',
    staffName: 'Adaeze Okonkwo',
    type: 'Annual',
    startDate: '2026-08-28',
    endDate: '2026-08-30',
    days: 3,
    status: 'Approved',
    reason: 'Conference attendance',
  },
]

const sampleKPIs: KPI[] = [
  { id: 'KPI-001', title: 'Employee Retention Rate', target: 95, current: 91, unit: '%', department: 'HR' },
  { id: 'KPI-002', title: 'Training Completion', target: 100, current: 78, unit: '%', department: 'All' },
  { id: 'KPI-003', title: 'Avg. Time to Hire', target: 21, current: 18, unit: 'days', department: 'HR' },
  { id: 'KPI-004', title: 'Employee Satisfaction', target: 90, current: 86, unit: '%', department: 'All' },
  { id: 'KPI-005', title: 'Absenteeism Rate', target: 3, current: 4.2, unit: '%', department: 'All' },
]

const sampleJobOpenings: JobOpening[] = [
  { id: 'JOB-001', title: 'Senior React Developer', department: 'Engineering', applicants: 24, status: 'Interviewing', deadline: '2026-09-30' },
  { id: 'JOB-002', title: 'Product Designer', department: 'Product', applicants: 18, status: 'Open', deadline: '2026-10-15' },
  { id: 'JOB-003', title: 'Sales Manager', department: 'Sales', applicants: 31, status: 'Open', deadline: '2026-10-01' },
  { id: 'JOB-004', title: 'Data Analyst', department: 'Engineering', applicants: 12, status: 'Closed', deadline: '2026-08-31' },
]

const recruitmentPipeline: RecruitmentPipeline[] = [
  { stage: 'Applied', count: 85, color: 'bg-primary' },
  { stage: 'Screening', count: 42, color: 'bg-secondary' },
  { stage: 'Interview', count: 28, color: 'bg-warning' },
  { stage: 'Offer', count: 8, color: 'bg-success' },
  { stage: 'Hired', count: 5, color: 'bg-emerald-400' },
]

const departmentBreakdown = [
  { name: 'Engineering', count: 45, color: 'bg-primary' },
  { name: 'Marketing', count: 22, color: 'bg-secondary' },
  { name: 'Sales', count: 28, color: 'bg-warning' },
  { name: 'Finance', count: 15, color: 'bg-success' },
  { name: 'Operations', count: 18, color: 'bg-primary-light' },
  { name: 'Product', count: 12, color: 'bg-secondary-light' },
]

const statusColors: Record<string, string> = {
  Active: 'bg-success/20 text-success',
  'On Leave': 'bg-warning/20 text-warning',
  Remote: 'bg-primary/20 text-primary',
  Probation: 'bg-secondary/20 text-secondary',
  Pending: 'bg-warning/20 text-warning',
  Approved: 'bg-success/20 text-success',
  Rejected: 'bg-error/20 text-error',
  Open: 'bg-success/20 text-success',
  Interviewing: 'bg-primary/20 text-primary',
  Closed: 'bg-text-muted/20 text-text-muted',
}

const leaveTypeColors: Record<string, string> = {
  Annual: 'bg-primary/10 text-primary',
  Sick: 'bg-error/10 text-error',
  Maternity: 'bg-secondary/10 text-secondary',
  Paternity: 'bg-secondary/10 text-secondary',
  Compassionate: 'bg-warning/10 text-warning',
}

export default function HRPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [departmentFilter, setDepartmentFilter] = useState<string>('All')
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState<'staff' | 'leave' | 'recruitment'>('staff')

  const filteredStaff = sampleStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || staff.status === statusFilter
    const matchesDept = departmentFilter === 'All' || staff.department === departmentFilter
    return matchesSearch && matchesStatus && matchesDept
  })

  const totalStaff = sampleStaff.length
  const activeStaff = sampleStaff.filter((s) => s.status === 'Active').length
  const onLeave = sampleStaff.filter((s) => s.status === 'On Leave').length
  const openPositions = sampleJobOpenings.filter((j) => j.status !== 'Closed').length

  const stats = [
    {
      title: 'Total Staff',
      value: totalStaff.toString(),
      change: '+8.3%',
      trend: 'up' as const,
      icon: Users,
      color: 'primary',
    },
    {
      title: 'Active Staff',
      value: activeStaff.toString(),
      change: '+5.2%',
      trend: 'up' as const,
      icon: UserCheck,
      color: 'success',
    },
    {
      title: 'On Leave',
      value: onLeave.toString(),
      change: '+2',
      trend: 'up' as const,
      icon: UserMinus,
      color: 'warning',
    },
    {
      title: 'Open Positions',
      value: openPositions.toString(),
      change: '-1',
      trend: 'down' as const,
      icon: Briefcase,
      color: 'secondary',
    },
  ]

  const pendingLeaves = sampleLeaveRequests.filter((l) => l.status === 'Pending').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
            HR & Staff Management
          </h1>
          <p className="text-text-muted">
            Manage staff, track performance, handle leaves, and oversee recruitment.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Staff
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
              { key: 'staff' as const, label: 'Staff Directory', icon: Users },
              { key: 'leave' as const, label: 'Leave Management', icon: Calendar, badge: pendingLeaves },
              { key: 'recruitment' as const, label: 'Recruitment', icon: BriefcaseBusiness },
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

          {/* Staff Directory Tab */}
          <AnimatePresence mode="wait">
            {activeTab === 'staff' && (
              <motion.div
                key="staff"
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
                        placeholder="Search staff by name, role, or department..."
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
                              <option value="Active">Active</option>
                              <option value="On Leave">On Leave</option>
                              <option value="Remote">Remote</option>
                              <option value="Probation">Probation</option>
                            </select>
                          </div>
                          <div className="flex-1 min-w-[200px]">
                            <label className="text-sm text-text-muted mb-2 block">Department</label>
                            <select
                              value={departmentFilter}
                              onChange={(e) => setDepartmentFilter(e.target.value)}
                              className="w-full px-4 py-2.5 bg-surface-light border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                            >
                              <option value="All">All Departments</option>
                              <option value="Engineering">Engineering</option>
                              <option value="Marketing">Marketing</option>
                              <option value="Finance">Finance</option>
                              <option value="Product">Product</option>
                              <option value="Sales">Sales</option>
                              <option value="Human Resources">Human Resources</option>
                              <option value="Operations">Operations</option>
                            </select>
                          </div>
                          <div className="flex items-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSearchQuery('')
                                setStatusFilter('All')
                                setDepartmentFilter('All')
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

                {/* Staff Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredStaff.map((staff, index) => (
                    <motion.div
                      key={staff.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card>
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {staff.initials}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold">{staff.name}</h3>
                                <p className="text-sm text-text-muted">{staff.role}</p>
                              </div>
                              <span
                                className={cn(
                                  'px-3 py-1 rounded-full text-xs font-medium shrink-0',
                                  statusColors[staff.status]
                                )}
                              >
                                {staff.status}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 mt-3 text-sm text-text-muted">
                              <span className="flex items-center gap-1">
                                <GraduationCap className="w-3.5 h-3.5" />
                                {staff.department}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                Joined {staff.joinDate}
                              </span>
                            </div>

                            {/* Performance & Attendance Bars */}
                            <div className="mt-4 space-y-2">
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-text-muted flex items-center gap-1">
                                    <Target className="w-3 h-3" />
                                    Performance
                                  </span>
                                  <span className="text-white font-medium">{staff.performance}%</span>
                                </div>
                                <div className="h-1.5 bg-surface-light rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${staff.performance}%` }}
                                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                                    className={cn(
                                      'h-full rounded-full',
                                      staff.performance >= 90
                                        ? 'bg-gradient-to-r from-success to-emerald-400'
                                        : staff.performance >= 80
                                        ? 'bg-gradient-to-r from-primary to-primary-light'
                                        : 'bg-gradient-to-r from-warning to-amber-400'
                                    )}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-text-muted flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Attendance
                                  </span>
                                  <span className="text-white font-medium">{staff.attendance}%</span>
                                </div>
                                <div className="h-1.5 bg-surface-light rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${staff.attendance}%` }}
                                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-4">
                              <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                                <Eye className="w-4 h-4 text-text-muted hover:text-primary" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                                <Edit className="w-4 h-4 text-text-muted hover:text-primary" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredStaff.length === 0 && (
                  <Card hover={false} className="text-center py-12">
                    <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No staff found</h3>
                    <p className="text-text-muted">Try adjusting your search or filter criteria.</p>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Leave Management Tab */}
            {activeTab === 'leave' && (
              <motion.div
                key="leave"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Leave Requests
                    </h2>
                    <Button variant="primary" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      New Request
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {sampleLeaveRequests.map((leave, index) => (
                      <motion.div
                        key={leave.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-surface-light hover:bg-surface-light/80 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shrink-0">
                              {leave.staffName.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-medium">{leave.staffName}</h3>
                                <span
                                  className={cn(
                                    'px-2 py-0.5 rounded-full text-xs font-medium',
                                    leaveTypeColors[leave.type]
                                  )}
                                >
                                  {leave.type}
                                </span>
                                <span
                                  className={cn(
                                    'px-2 py-0.5 rounded-full text-xs font-medium',
                                    statusColors[leave.status]
                                  )}
                                >
                                  {leave.status}
                                </span>
                              </div>
                              <p className="text-sm text-text-muted mt-1">{leave.reason}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {leave.startDate} — {leave.endDate}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {leave.days} days
                                </span>
                              </div>
                            </div>
                          </div>

                          {leave.status === 'Pending' && (
                            <div className="flex items-center gap-2 shrink-0">
                              <button className="p-2 rounded-lg bg-success/10 hover:bg-success/20 transition-colors">
                                <CheckCircle className="w-4 h-4 text-success" />
                              </button>
                              <button className="p-2 rounded-lg bg-error/10 hover:bg-error/20 transition-colors">
                                <XCircle className="w-4 h-4 text-error" />
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Recruitment Tab */}
            {activeTab === 'recruitment' && (
              <motion.div
                key="recruitment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* Recruitment Pipeline */}
                <Card>
                  <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Recruitment Pipeline
                  </h2>
                  <div className="flex items-end gap-3 h-32">
                    {recruitmentPipeline.map((stage, index) => (
                      <motion.div
                        key={stage.stage}
                        className="flex-1 flex flex-col items-center gap-2"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        style={{ transformOrigin: 'bottom' }}
                      >
                        <span className="text-xs text-text-muted">{stage.count}</span>
                        <div
                          className={cn('w-full rounded-t-lg', stage.color)}
                          style={{
                            height: `${(stage.count / Math.max(...recruitmentPipeline.map((s) => s.count))) * 100}%`,
                          }}
                        />
                        <span className="text-xs text-text-muted">{stage.stage}</span>
                      </motion.div>
                    ))}
                  </div>
                </Card>

                {/* Job Openings */}
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-secondary" />
                      Job Openings
                    </h2>
                    <Button variant="primary" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Post Job
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {sampleJobOpenings.map((job, index) => (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-surface-light hover:bg-surface-light/80 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-medium">{job.title}</h3>
                            <span
                              className={cn(
                                'px-2 py-0.5 rounded-full text-xs font-medium',
                                statusColors[job.status]
                              )}
                            >
                              {job.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-text-muted">
                            <span className="flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5" />
                              {job.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              {job.applicants} applicants
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              Deadline: {job.deadline}
                            </span>
                          </div>
                        </div>
                        <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                          <Eye className="w-4 h-4 text-text-muted hover:text-primary" />
                        </button>
                      </motion.div>
                    ))}
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
                { label: 'Add Staff', icon: Plus, color: 'text-primary', bg: 'bg-primary/10' },
                { label: 'View KPIs', icon: Target, color: 'text-success', bg: 'bg-success/10' },
                { label: 'Approve Leave', icon: CheckCircle, color: 'text-warning', bg: 'bg-warning/10' },
                { label: 'Post Job', icon: Briefcase, color: 'text-secondary', bg: 'bg-secondary/10' },
                { label: 'Generate Report', icon: BarChart3, color: 'text-primary', bg: 'bg-primary/10' },
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

          {/* Department Breakdown */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Department Breakdown</h2>
            <div className="space-y-3">
              {departmentBreakdown.map((dept, index) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-muted">{dept.name}</span>
                    <span className="font-medium">{dept.count}</span>
                  </div>
                  <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(dept.count / 50) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className={cn('h-full rounded-full', dept.color)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* KPIs */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Key Performance Indicators</h2>
            <div className="space-y-4">
              {sampleKPIs.map((kpi, index) => {
                const percentage = kpi.unit === '%' ? kpi.current : (kpi.current / kpi.target) * 100
                const isOnTrack = percentage >= 85
                return (
                  <motion.div
                    key={kpi.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text-muted">{kpi.title}</span>
                      <span className={cn('font-medium flex items-center gap-1', isOnTrack ? 'text-success' : 'text-warning')}>
                        {isOnTrack ? <TrendingUp className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {kpi.current}{kpi.unit} / {kpi.target}{kpi.unit}
                      </span>
                    </div>
                    <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        className={cn(
                          'h-full rounded-full',
                          isOnTrack ? 'bg-gradient-to-r from-success to-emerald-400' : 'bg-gradient-to-r from-warning to-amber-400'
                        )}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
