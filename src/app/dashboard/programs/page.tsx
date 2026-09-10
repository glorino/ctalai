'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Users,
  Clock,
  Calendar,
  Award,
  TrendingUp,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  BookOpen,
  UserCheck,
  Download,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ProgramStatus = 'Active' | 'Upcoming' | 'Completed'
type CohortStatus = 'Enrolling' | 'In Progress' | 'Completed' | 'Cancelled'

interface Program {
  id: string
  name: string
  description: string
  price: number
  duration: string
  enrolledCount: number
  maxCapacity: number
  status: ProgramStatus
  category: string
  startDate: string
  completionRate: number
  instructor: string
}

interface Cohort {
  id: string
  programId: string
  programName: string
  cohortNumber: number
  startDate: string
  endDate: string
  enrolledCount: number
  maxCapacity: number
  status: CohortStatus
  schedule: string
}

interface AttendanceRecord {
  id: string
  studentName: string
  programName: string
  cohortId: string
  date: string
  status: 'Present' | 'Absent' | 'Late'
}

interface Certificate {
  id: string
  studentName: string
  programName: string
  cohortId: string
  issueDate: string
  certificateId: string
  status: 'Generated' | 'Pending'
}

const samplePrograms: Program[] = [
  {
    id: 'PRG-001',
    name: 'Digital Marketing Mastery',
    description: 'Comprehensive digital marketing course covering SEO, SEM, social media marketing, and analytics.',
    price: 150000,
    duration: '12 weeks',
    enrolledCount: 45,
    maxCapacity: 50,
    status: 'Active',
    category: 'Marketing',
    startDate: '2026-08-15',
    completionRate: 68,
    instructor: 'Sarah Chen',
  },
  {
    id: 'PRG-002',
    name: 'Full-Stack Web Development',
    description: 'Master React, Node.js, databases, and deployment with hands-on projects.',
    price: 250000,
    duration: '16 weeks',
    enrolledCount: 32,
    maxCapacity: 40,
    status: 'Active',
    category: 'Technology',
    startDate: '2026-07-20',
    completionRate: 45,
    instructor: 'James Okafor',
  },
  {
    id: 'PRG-003',
    name: 'Business Analytics & Data Science',
    description: 'Learn data analysis, visualization, machine learning, and business intelligence tools.',
    price: 200000,
    duration: '10 weeks',
    enrolledCount: 28,
    maxCapacity: 35,
    status: 'Active',
    category: 'Analytics',
    startDate: '2026-09-01',
    completionRate: 22,
    instructor: 'Michael Brown',
  },
  {
    id: 'PRG-004',
    name: 'Project Management Professional',
    description: 'PMP certification prep covering project lifecycle, risk management, and leadership.',
    price: 180000,
    duration: '8 weeks',
    enrolledCount: 0,
    maxCapacity: 30,
    status: 'Upcoming',
    category: 'Management',
    startDate: '2026-10-01',
    completionRate: 0,
    instructor: 'Grace Adekunle',
  },
  {
    id: 'PRG-005',
    name: 'UX/UI Design Fundamentals',
    description: 'From wireframes to high-fidelity prototypes using Figma and design thinking principles.',
    price: 120000,
    duration: '6 weeks',
    enrolledCount: 30,
    maxCapacity: 30,
    status: 'Completed',
    category: 'Design',
    startDate: '2026-05-10',
    completionRate: 100,
    instructor: 'Chioma Eze',
  },
  {
    id: 'PRG-006',
    name: 'Cloud Architecture with AWS',
    description: 'Design scalable cloud solutions with AWS services, security best practices, and cost optimization.',
    price: 220000,
    duration: '14 weeks',
    enrolledCount: 18,
    maxCapacity: 25,
    status: 'Active',
    category: 'Technology',
    startDate: '2026-08-25',
    completionRate: 35,
    instructor: 'Emmanuel Nwankwo',
  },
]

const sampleCohorts: Cohort[] = [
  {
    id: 'COH-001',
    programId: 'PRG-001',
    programName: 'Digital Marketing Mastery',
    cohortNumber: 1,
    startDate: '2026-08-15',
    endDate: '2026-11-07',
    enrolledCount: 45,
    maxCapacity: 50,
    status: 'In Progress',
    schedule: 'Mon & Wed, 6:00 PM - 8:00 PM',
  },
  {
    id: 'COH-002',
    programId: 'PRG-001',
    programName: 'Digital Marketing Mastery',
    cohortNumber: 2,
    startDate: '2026-10-01',
    endDate: '2026-12-23',
    enrolledCount: 12,
    maxCapacity: 50,
    status: 'Enrolling',
    schedule: 'Tue & Thu, 7:00 PM - 9:00 PM',
  },
  {
    id: 'COH-003',
    programId: 'PRG-002',
    programName: 'Full-Stack Web Development',
    cohortNumber: 1,
    startDate: '2026-07-20',
    endDate: '2026-11-10',
    enrolledCount: 32,
    maxCapacity: 40,
    status: 'In Progress',
    schedule: 'Sat, 9:00 AM - 1:00 PM',
  },
  {
    id: 'COH-004',
    programId: 'PRG-003',
    programName: 'Business Analytics & Data Science',
    cohortNumber: 1,
    startDate: '2026-09-01',
    endDate: '2026-11-10',
    enrolledCount: 28,
    maxCapacity: 35,
    status: 'In Progress',
    schedule: 'Mon & Fri, 5:00 PM - 7:00 PM',
  },
  {
    id: 'COH-005',
    programId: 'PRG-005',
    programName: 'UX/UI Design Fundamentals',
    cohortNumber: 1,
    startDate: '2026-05-10',
    endDate: '2026-06-20',
    enrolledCount: 30,
    maxCapacity: 30,
    status: 'Completed',
    schedule: 'Wed & Fri, 6:00 PM - 8:00 PM',
  },
  {
    id: 'COH-006',
    programId: 'PRG-006',
    programName: 'Cloud Architecture with AWS',
    cohortNumber: 1,
    startDate: '2026-08-25',
    endDate: '2026-12-01',
    enrolledCount: 18,
    maxCapacity: 25,
    status: 'In Progress',
    schedule: 'Tue & Thu, 6:00 PM - 8:30 PM',
  },
]

const sampleAttendance: AttendanceRecord[] = [
  { id: 'ATT-001', studentName: 'Adebayo Johnson', programName: 'Digital Marketing Mastery', cohortId: 'COH-001', date: '2026-09-07', status: 'Present' },
  { id: 'ATT-002', studentName: 'Fatima Al-Hassan', programName: 'Digital Marketing Mastery', cohortId: 'COH-001', date: '2026-09-07', status: 'Present' },
  { id: 'ATT-003', studentName: 'Chinedu Eze', programName: 'Full-Stack Web Development', cohortId: 'COH-003', date: '2026-09-06', status: 'Late' },
  { id: 'ATT-004', studentName: 'Grace Nwankwo', programName: 'Business Analytics & Data Science', cohortId: 'COH-004', date: '2026-09-05', status: 'Absent' },
  { id: 'ATT-005', studentName: 'Oluwaseun Adeyemi', programName: 'Digital Marketing Mastery', cohortId: 'COH-001', date: '2026-09-07', status: 'Present' },
  { id: 'ATT-006', studentName: 'Amina Bello', programName: 'Cloud Architecture with AWS', cohortId: 'COH-006', date: '2026-09-04', status: 'Present' },
  { id: 'ATT-007', studentName: 'Emeka Obi', programName: 'Full-Stack Web Development', cohortId: 'COH-003', date: '2026-09-06', status: 'Present' },
  { id: 'ATT-008', studentName: 'Ngozi Okonkwo', programName: 'Digital Marketing Mastery', cohortId: 'COH-001', date: '2026-09-07', status: 'Present' },
]

const sampleCertificates: Certificate[] = [
  { id: 'CRT-001', studentName: 'Amina Bello', programName: 'UX/UI Design Fundamentals', cohortId: 'COH-005', issueDate: '2026-06-20', certificateId: 'CERT-UX-2026-001', status: 'Generated' },
  { id: 'CRT-002', studentName: 'Emeka Obi', programName: 'UX/UI Design Fundamentals', cohortId: 'COH-005', issueDate: '2026-06-20', certificateId: 'CERT-UX-2026-002', status: 'Generated' },
  { id: 'CRT-003', studentName: 'Funke Adekunle', programName: 'UX/UI Design Fundamentals', cohortId: 'COH-005', issueDate: '2026-06-20', certificateId: 'CERT-UX-2026-003', status: 'Generated' },
  { id: 'CRT-004', studentName: 'Ibrahim Mohammed', programName: 'Digital Marketing Mastery', cohortId: 'COH-001', issueDate: '', certificateId: '', status: 'Pending' },
  { id: 'CRT-005', studentName: 'Chioma Igwe', programName: 'Full-Stack Web Development', cohortId: 'COH-003', issueDate: '', certificateId: '', status: 'Pending' },
]

const statusColors: Record<ProgramStatus, string> = {
  Active: 'bg-success/20 text-success',
  Upcoming: 'bg-primary/20 text-primary',
  Completed: 'bg-surface-light text-text-muted',
}

const cohortStatusColors: Record<CohortStatus, string> = {
  Enrolling: 'bg-primary/20 text-primary',
  'In Progress': 'bg-warning/20 text-warning',
  Completed: 'bg-success/20 text-success',
  Cancelled: 'bg-error/20 text-error',
}

const attendanceStatusColors: Record<string, string> = {
  Present: 'bg-success/20 text-success',
  Absent: 'bg-error/20 text-error',
  Late: 'bg-warning/20 text-warning',
}

type ActiveTab = 'programs' | 'cohorts' | 'attendance' | 'certificates'

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('programs')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProgramStatus | 'All'>('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPrograms = samplePrograms.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || program.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = [
    {
      title: 'Total Programmes',
      value: samplePrograms.length.toString(),
      change: '+2',
      trend: 'up' as const,
      icon: BookOpen,
      color: 'primary',
    },
    {
      title: 'Active Cohorts',
      value: sampleCohorts.filter((c) => c.status === 'In Progress').length.toString(),
      change: '+1',
      trend: 'up' as const,
      icon: Users,
      color: 'success',
    },
    {
      title: 'Total Students',
      value: sampleCohorts.reduce((sum, c) => sum + c.enrolledCount, 0).toString(),
      change: '+15.3%',
      trend: 'up' as const,
      icon: GraduationCap,
      color: 'secondary',
    },
    {
      title: 'Completion Rate',
      value: '78.5%',
      change: '+3.2%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'warning',
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const tabs: { id: ActiveTab; label: string; icon: typeof BookOpen }[] = [
    { id: 'programs', label: 'Programmes', icon: BookOpen },
    { id: 'cohorts', label: 'Cohorts', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'certificates', label: 'Certificates', icon: Award },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
            Training Programme Management
          </h1>
          <p className="text-text-muted">
            Manage programmes, cohorts, attendance, and certificates.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Programme
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

      {/* Quick Actions */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Create Programme', icon: Plus, color: 'primary' },
            { label: 'View Cohorts', icon: Users, color: 'success' },
            { label: 'Generate Certificates', icon: Award, color: 'secondary' },
            { label: 'Track Attendance', icon: UserCheck, color: 'warning' },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-surface-light hover:bg-primary/10 transition-all duration-200 group text-left"
            >
              <div
                className={cn(
                  'p-2 rounded-lg',
                  action.color === 'primary' && 'bg-primary/20 group-hover:bg-primary/30',
                  action.color === 'success' && 'bg-success/20 group-hover:bg-success/30',
                  action.color === 'secondary' && 'bg-secondary/20 group-hover:bg-secondary/30',
                  action.color === 'warning' && 'bg-warning/20 group-hover:bg-warning/30'
                )}
              >
                <action.icon
                  className={cn(
                    'w-5 h-5',
                    action.color === 'primary' && 'text-primary',
                    action.color === 'success' && 'text-success',
                    action.color === 'secondary' && 'text-secondary',
                    action.color === 'warning' && 'text-warning'
                  )}
                />
              </div>
              <span className="text-sm text-text-muted group-hover:text-white transition-colors">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-surface rounded-xl border border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex-1 justify-center',
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-text-muted hover:text-white hover:bg-surface-light'
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'programs' && (
          <motion.div
            key="programs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Search and Filters */}
            <Card hover={false}>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search programmes by name, description, or category..."
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
                          onChange={(e) => setStatusFilter(e.target.value as ProgramStatus | 'All')}
                          className="w-full px-4 py-2.5 bg-surface-light border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                        >
                          <option value="All">All Status</option>
                          <option value="Active">Active</option>
                          <option value="Upcoming">Upcoming</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                      <div className="flex items-end">
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
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className={cn(
                          'px-3 py-1 rounded-full text-xs font-medium',
                          statusColors[program.status]
                        )}
                      >
                        {program.status}
                      </span>
                      <button className="p-1 rounded-lg hover:bg-surface-light transition-colors">
                        <MoreVertical className="w-4 h-4 text-text-muted" />
                      </button>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{program.name}</h3>
                    <p className="text-sm text-text-muted mb-4 line-clamp-2 flex-1">
                      {program.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Price</span>
                        <span className="font-semibold text-primary">
                          {formatCurrency(program.price)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Duration</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-text-muted" />
                          {program.duration}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Enrolled</span>
                        <span>
                          {program.enrolledCount}/{program.maxCapacity}
                        </span>
                      </div>

                      {/* Capacity Progress Bar */}
                      <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(program.enrolledCount / program.maxCapacity) * 100}%`,
                          }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={cn(
                            'h-full rounded-full',
                            program.enrolledCount / program.maxCapacity >= 0.9
                              ? 'bg-secondary'
                              : program.enrolledCount / program.maxCapacity >= 0.6
                              ? 'bg-primary'
                              : 'bg-success'
                          )}
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Completion</span>
                        <span className="font-medium">{program.completionRate}%</span>
                      </div>

                      {/* Completion Progress Bar */}
                      <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${program.completionRate}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                          className="h-full bg-success rounded-full"
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Instructor</span>
                        <span>{program.instructor}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredPrograms.length === 0 && (
              <Card hover={false} className="text-center py-12">
                <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No programmes found</h3>
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
          </motion.div>
        )}

        {activeTab === 'cohorts' && (
          <motion.div
            key="cohorts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {sampleCohorts.map((cohort, index) => (
              <motion.div
                key={cohort.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{cohort.programName}</h3>
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-xs font-medium',
                            cohortStatusColors[cohort.status]
                          )}
                        >
                          {cohort.status}
                        </span>
                        <span className="text-sm text-text-muted">
                          Cohort #{cohort.cohortNumber}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm text-text-muted">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {cohort.startDate} - {cohort.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-text-muted">
                          <Clock className="w-4 h-4" />
                          <span>{cohort.schedule}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-text-muted" />
                          <span>
                            {cohort.enrolledCount}/{cohort.maxCapacity} enrolled
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <BarChart3 className="w-4 h-4 text-text-muted" />
                          <span>
                            {Math.round((cohort.enrolledCount / cohort.maxCapacity) * 100)}% capacity
                          </span>
                        </div>
                      </div>

                      {/* Capacity Progress */}
                      <div className="mt-3">
                        <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(cohort.enrolledCount / cohort.maxCapacity) * 100}%`,
                            }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={cn(
                              'h-full rounded-full',
                              cohort.enrolledCount / cohort.maxCapacity >= 0.9
                                ? 'bg-secondary'
                                : 'bg-primary'
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                      <Button variant="ghost" size="sm">
                        <UserCheck className="w-4 h-4 mr-1" />
                        Attendance
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Award className="w-4 h-4 mr-1" />
                        Certificates
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'attendance' && (
          <motion.div
            key="attendance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Attendance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-success/10">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Present Today</p>
                    <p className="text-xl font-bold">
                      {sampleAttendance.filter((a) => a.status === 'Present').length}
                    </p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-warning/10">
                    <Clock className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Late Today</p>
                    <p className="text-xl font-bold">
                      {sampleAttendance.filter((a) => a.status === 'Late').length}
                    </p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-error/10">
                    <CircleDollarSign className="w-6 h-6 text-error" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Absent Today</p>
                    <p className="text-xl font-bold">
                      {sampleAttendance.filter((a) => a.status === 'Absent').length}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Attendance Table */}
            <Card hover={false}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Attendance Records</h3>
                <Button variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Mark Attendance
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Student</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Programme</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleAttendance.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-white/5 hover:bg-surface-light transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-semibold">
                              {record.studentName
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <span className="text-sm font-medium">{record.studentName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-text-muted">{record.programName}</td>
                        <td className="py-3 px-4 text-sm text-text-muted">{record.date}</td>
                        <td className="py-3 px-4">
                          <span
                            className={cn(
                              'px-3 py-1 rounded-full text-xs font-medium',
                              attendanceStatusColors[record.status]
                            )}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="p-1 rounded hover:bg-surface transition-colors">
                            <Edit className="w-4 h-4 text-text-muted hover:text-primary" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'certificates' && (
          <motion.div
            key="certificates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Certificate Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-success/10">
                    <Award className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Generated</p>
                    <p className="text-xl font-bold">
                      {sampleCertificates.filter((c) => c.status === 'Generated').length}
                    </p>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-warning/10">
                    <Clock className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Pending</p>
                    <p className="text-xl font-bold">
                      {sampleCertificates.filter((c) => c.status === 'Pending').length}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Certificates List */}
            <Card hover={false}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Certificate Records</h3>
                <Button variant="primary" size="sm">
                  <Award className="w-4 h-4 mr-2" />
                  Generate Certificates
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Student</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Programme</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Certificate ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Issue Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleCertificates.map((cert, index) => (
                      <motion.tr
                        key={cert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-white/5 hover:bg-surface-light transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-semibold">
                              {cert.studentName
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <span className="text-sm font-medium">{cert.studentName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-text-muted">{cert.programName}</td>
                        <td className="py-3 px-4 text-sm font-mono text-text-muted">
                          {cert.certificateId || '—'}
                        </td>
                        <td className="py-3 px-4 text-sm text-text-muted">
                          {cert.issueDate || '—'}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={cn(
                              'px-3 py-1 rounded-full text-xs font-medium',
                              cert.status === 'Generated'
                                ? 'bg-success/20 text-success'
                                : 'bg-warning/20 text-warning'
                            )}
                          >
                            {cert.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {cert.status === 'Generated' ? (
                              <button className="p-1 rounded hover:bg-surface transition-colors">
                                <Download className="w-4 h-4 text-text-muted hover:text-primary" />
                              </button>
                            ) : (
                              <button className="p-1 rounded hover:bg-surface transition-colors">
                                <Award className="w-4 h-4 text-text-muted hover:text-success" />
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Program Performance Summary */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Programme Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {samplePrograms
            .filter((p) => p.status === 'Active')
            .slice(0, 3)
            .map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-surface-light"
              >
                <h4 className="font-medium text-sm mb-3">{program.name}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">Enrollment</span>
                    <span className="font-medium">
                      {Math.round((program.enrolledCount / program.maxCapacity) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${(program.enrolledCount / program.maxCapacity) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">Completion</span>
                    <span className="font-medium">{program.completionRate}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success rounded-full"
                      style={{ width: `${program.completionRate}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">Revenue</span>
                    <span className="font-medium text-primary">
                      {formatCurrency(program.price * program.enrolledCount)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </Card>
    </div>
  )
}
