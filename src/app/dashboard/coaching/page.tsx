'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Calendar,
  BarChart3,
  Target,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  User,
  Zap,
  FileText,
  Eye,
  Edit,
  CircleDot,
  BookOpen,
  Briefcase,
  Award,
  MessageSquare,
} from 'lucide-react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Coach {
  id: string
  name: string
  title: string
  specialties: string[]
  availability: 'Available' | 'Busy' | 'Offline'
  rating: number
  sessions: number
  clients: number
  initials: string
  gradient: string
}

interface Session {
  id: string
  client: string
  coach: string
  type: string
  date: string
  time: string
  duration: string
  status: 'Scheduled' | 'Completed' | 'Cancelled'
}

interface Client {
  id: string
  name: string
  coach: string
  sessionsCompleted: number
  totalSessions: number
  goals: number
  goalsCompleted: number
  progress: number
  initials: string
  gradient: string
}

interface ActionPlan {
  id: string
  client: string
  title: string
  deadline: string
  progress: number
  status: 'Active' | 'Completed' | 'Overdue'
  tasks: number
  tasksCompleted: number
}

const sampleCoaches: Coach[] = [
  {
    id: 'COACH-001',
    name: 'Dr. Aisha Mensah',
    title: 'Executive Leadership Coach',
    specialties: ['Leadership', 'Executive Presence', 'Strategic Thinking'],
    availability: 'Available',
    rating: 4.9,
    sessions: 248,
    clients: 42,
    initials: 'AM',
    gradient: 'from-primary to-primary-light',
  },
  {
    id: 'COACH-002',
    name: 'Kwame Asante',
    title: 'Career Development Specialist',
    specialties: ['Career Transition', 'Personal Branding', 'Interview Prep'],
    availability: 'Busy',
    rating: 4.8,
    sessions: 186,
    clients: 35,
    initials: 'KA',
    gradient: 'from-secondary to-secondary-light',
  },
  {
    id: 'COACH-003',
    name: 'Ngozi Okafor',
    title: 'Performance & Productivity Coach',
    specialties: ['Goal Setting', 'Time Management', 'Accountability'],
    availability: 'Available',
    rating: 4.7,
    sessions: 312,
    clients: 58,
    initials: 'NO',
    gradient: 'from-emerald-500 to-emerald-400',
  },
  {
    id: 'COACH-004',
    name: 'Tunde Bakare',
    title: 'Team Dynamics Coach',
    specialties: ['Team Building', 'Conflict Resolution', 'Communication'],
    availability: 'Offline',
    rating: 4.6,
    sessions: 157,
    clients: 28,
    initials: 'TB',
    gradient: 'from-warning to-amber-400',
  },
]

const sampleSessions: Session[] = [
  {
    id: 'SES-1001',
    client: 'Chidinma Eze',
    coach: 'Dr. Aisha Mensah',
    type: 'Leadership Coaching',
    date: '2026-09-08',
    time: '09:00 AM',
    duration: '60 min',
    status: 'Completed',
  },
  {
    id: 'SES-1002',
    client: 'Emeka Nwankwo',
    coach: 'Kwame Asante',
    type: 'Career Strategy',
    date: '2026-09-08',
    time: '11:00 AM',
    duration: '45 min',
    status: 'Scheduled',
  },
  {
    id: 'SES-1003',
    client: 'Fatima Al-Hassan',
    coach: 'Ngozi Okafor',
    type: 'Goal Setting Review',
    date: '2026-09-08',
    time: '02:00 PM',
    duration: '30 min',
    status: 'Scheduled',
  },
  {
    id: 'SES-1004',
    client: 'Grace Adekunle',
    coach: 'Dr. Aisha Mensah',
    type: 'Executive Presence',
    date: '2026-09-07',
    time: '10:00 AM',
    duration: '60 min',
    status: 'Completed',
  },
  {
    id: 'SES-1005',
    client: 'David Williams',
    coach: 'Tunde Bakare',
    type: 'Team Communication',
    date: '2026-09-07',
    time: '03:00 PM',
    duration: '45 min',
    status: 'Cancelled',
  },
  {
    id: 'SES-1006',
    client: 'Amina Ibrahim',
    coach: 'Ngozi Okafor',
    type: 'Productivity Systems',
    date: '2026-09-09',
    time: '09:30 AM',
    duration: '45 min',
    status: 'Scheduled',
  },
  {
    id: 'SES-1007',
    client: 'Michael Chen',
    coach: 'Kwame Asante',
    type: 'Personal Branding',
    date: '2026-09-09',
    time: '01:00 PM',
    duration: '30 min',
    status: 'Scheduled',
  },
  {
    id: 'SES-1008',
    client: 'Sarah Johnson',
    coach: 'Dr. Aisha Mensah',
    type: 'Strategic Thinking',
    date: '2026-09-06',
    time: '11:00 AM',
    duration: '60 min',
    status: 'Completed',
  },
]

const sampleClients: Client[] = [
  {
    id: 'CLI-001',
    name: 'Chidinma Eze',
    coach: 'Dr. Aisha Mensah',
    sessionsCompleted: 8,
    totalSessions: 12,
    goals: 5,
    goalsCompleted: 3,
    progress: 75,
    initials: 'CE',
    gradient: 'from-primary to-primary-light',
  },
  {
    id: 'CLI-002',
    name: 'Emeka Nwankwo',
    coach: 'Kwame Asante',
    sessionsCompleted: 5,
    totalSessions: 10,
    goals: 4,
    goalsCompleted: 2,
    progress: 50,
    initials: 'EN',
    gradient: 'from-secondary to-secondary-light',
  },
  {
    id: 'CLI-003',
    name: 'Fatima Al-Hassan',
    coach: 'Ngozi Okafor',
    sessionsCompleted: 10,
    totalSessions: 10,
    goals: 6,
    goalsCompleted: 6,
    progress: 100,
    initials: 'FA',
    gradient: 'from-emerald-500 to-emerald-400',
  },
  {
    id: 'CLI-004',
    name: 'Grace Adekunle',
    coach: 'Dr. Aisha Mensah',
    sessionsCompleted: 3,
    totalSessions: 8,
    goals: 3,
    goalsCompleted: 1,
    progress: 37,
    initials: 'GA',
    gradient: 'from-warning to-amber-400',
  },
  {
    id: 'CLI-005',
    name: 'David Williams',
    coach: 'Tunde Bakare',
    sessionsCompleted: 7,
    totalSessions: 12,
    goals: 4,
    goalsCompleted: 3,
    progress: 62,
    initials: 'DW',
    gradient: 'from-purple-500 to-purple-400',
  },
]

const sampleActionPlans: ActionPlan[] = [
  {
    id: 'AP-001',
    client: 'Chidinma Eze',
    title: 'Leadership Presence Development',
    deadline: '2026-09-30',
    progress: 60,
    status: 'Active',
    tasks: 8,
    tasksCompleted: 5,
  },
  {
    id: 'AP-002',
    client: 'Emeka Nwankwo',
    title: 'Career Pivot Strategy',
    deadline: '2026-10-15',
    progress: 35,
    status: 'Active',
    tasks: 6,
    tasksCompleted: 2,
  },
  {
    id: 'AP-003',
    client: 'Fatima Al-Hassan',
    title: 'Productivity Mastery Program',
    deadline: '2026-09-10',
    progress: 100,
    status: 'Completed',
    tasks: 5,
    tasksCompleted: 5,
  },
  {
    id: 'AP-004',
    client: 'Grace Adekunle',
    title: 'Executive Communication Skills',
    deadline: '2026-09-05',
    progress: 45,
    status: 'Overdue',
    tasks: 7,
    tasksCompleted: 3,
  },
]

const statusColors: Record<string, string> = {
  Scheduled: 'bg-primary/20 text-primary',
  Completed: 'bg-success/20 text-success',
  Cancelled: 'bg-error/20 text-error',
}

const availabilityColors: Record<string, string> = {
  Available: 'bg-success/20 text-success',
  Busy: 'bg-warning/20 text-warning',
  Offline: 'bg-text-muted/20 text-text-muted',
}

const planStatusColors: Record<string, string> = {
  Active: 'bg-primary/20 text-primary',
  Completed: 'bg-success/20 text-success',
  Overdue: 'bg-error/20 text-error',
}

const calendarDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function CoachingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [activeTab, setActiveTab] = useState<'sessions' | 'coaches' | 'progress' | 'plans'>('sessions')
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date(2026, 8, 8))

  const totalClients = sampleClients.length
  const sessionsThisWeek = sampleSessions.filter((s) => s.status === 'Scheduled').length
  const completedSessions = sampleSessions.filter((s) => s.status === 'Completed').length
  const completionRate = Math.round((completedSessions / sampleSessions.length) * 100)
  const satisfactionScore = '96.3%'

  const stats = [
    {
      title: 'Active Clients',
      value: totalClients.toString(),
      change: '+2',
      trend: 'up' as const,
      icon: Users,
      color: 'primary',
    },
    {
      title: 'Sessions This Week',
      value: sessionsThisWeek.toString(),
      change: '+5',
      trend: 'up' as const,
      icon: Calendar,
      color: 'success',
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      change: '+8%',
      trend: 'up' as const,
      icon: CheckCircle,
      color: 'warning',
    },
    {
      title: 'Satisfaction',
      value: satisfactionScore,
      change: '+1.2%',
      trend: 'up' as const,
      icon: Star,
      color: 'secondary',
    },
  ]

  const filteredSessions = sampleSessions.filter((session) => {
    const matchesSearch =
      session.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || session.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredClients = sampleClients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.coach.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
            Coaching & Mentoring Automation
          </h1>
          <p className="text-text-muted">
            Manage coaches, schedule sessions, track progress, and match clients.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Session
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
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    <span className="text-sm text-success">{stat.change}</span>
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

      {/* Tab Navigation + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {/* Tab Buttons */}
          <div className="flex items-center gap-2 mb-4">
            {[
              { key: 'sessions' as const, label: 'Sessions', icon: Calendar },
              { key: 'coaches' as const, label: 'Coaches', icon: Users },
              { key: 'progress' as const, label: 'Client Progress', icon: BarChart3 },
              { key: 'plans' as const, label: 'Action Plans', icon: Target },
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
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
              <motion.div
                key="sessions"
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
                        placeholder="Search sessions by client, coach, or type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-surface-light border border-white/5 rounded-xl text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-3 bg-surface-light border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                    >
                      <option value="All">All Status</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </Card>

                {/* Session Cards */}
                <div className="space-y-3">
                  {filteredSessions.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <span className="text-xs text-text-muted font-mono">{session.id}</span>
                              <span
                                className={cn(
                                  'px-2 py-0.5 rounded-full text-xs font-medium',
                                  statusColors[session.status]
                                )}
                              >
                                {session.status}
                              </span>
                            </div>
                            <h3 className="font-semibold mb-1">{session.type}</h3>
                            <div className="flex items-center gap-4 text-sm text-text-muted">
                              <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                {session.client}
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3.5 h-3.5" />
                                {session.coach}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {session.duration}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right">
                              <p className="text-sm font-medium">{session.date}</p>
                              <p className="text-xs text-text-muted">{session.time}</p>
                            </div>
                            <div className="flex items-center gap-1">
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

                {filteredSessions.length === 0 && (
                  <Card hover={false} className="text-center py-12">
                    <Calendar className="w-12 h-12 text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No sessions found</h3>
                    <p className="text-text-muted">Try adjusting your search or filter criteria.</p>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Coaches Tab */}
            {activeTab === 'coaches' && (
              <motion.div
                key="coaches"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sampleCoaches.map((coach, index) => (
                    <motion.div
                      key={coach.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              'w-14 h-14 rounded-xl flex items-center justify-center text-white text-lg font-bold bg-gradient-to-br shrink-0',
                              coach.gradient
                            )}
                          >
                            {coach.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold">{coach.name}</h3>
                              <span
                                className={cn(
                                  'px-2 py-0.5 rounded-full text-xs font-medium',
                                  availabilityColors[coach.availability]
                                )}
                              >
                                {coach.availability}
                              </span>
                            </div>
                            <p className="text-sm text-text-muted mb-2">{coach.title}</p>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {coach.specialties.map((s) => (
                                <span
                                  key={s}
                                  className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-text-muted">
                              <span className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-warning" />
                                {coach.rating}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {coach.sessions} sessions
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" />
                                {coach.clients} clients
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                          <Button variant="outline" size="sm" className="flex-1">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          <Button variant="primary" size="sm" className="flex-1">
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card hover={false} className="mb-4">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Client Progress Overview
                  </h2>
                </Card>

                <div className="space-y-3">
                  {filteredClients.map((client, index) => (
                    <motion.div
                      key={client.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card>
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              'w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold bg-gradient-to-br shrink-0',
                              client.gradient
                            )}
                          >
                            {client.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold">{client.name}</h3>
                              <span
                                className={cn(
                                  'text-sm font-medium',
                                  client.progress === 100
                                    ? 'text-success'
                                    : client.progress >= 50
                                    ? 'text-primary'
                                    : 'text-warning'
                                )}
                              >
                                {client.progress}%
                              </span>
                            </div>
                            <p className="text-xs text-text-muted mb-2">
                              Coach: {client.coach}
                            </p>
                            <div className="flex items-center gap-6 text-sm text-text-muted">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {client.sessionsCompleted}/{client.totalSessions} sessions
                              </span>
                              <span className="flex items-center gap-1">
                                <Target className="w-3.5 h-3.5" />
                                {client.goalsCompleted}/{client.goals} goals
                              </span>
                            </div>
                            <div className="mt-3 h-2 bg-surface-light rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${client.progress}%` }}
                                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                                className={cn(
                                  'h-full rounded-full',
                                  client.progress === 100
                                    ? 'bg-success'
                                    : client.progress >= 50
                                    ? 'bg-primary'
                                    : 'bg-warning'
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Plans Tab */}
            {activeTab === 'plans' && (
              <motion.div
                key="plans"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card hover={false} className="mb-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Action Plans
                    </h2>
                    <Button variant="primary" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      New Plan
                    </Button>
                  </div>
                </Card>

                <div className="space-y-3">
                  {sampleActionPlans.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <span className="text-xs text-text-muted font-mono">{plan.id}</span>
                              <span
                                className={cn(
                                  'px-2 py-0.5 rounded-full text-xs font-medium',
                                  planStatusColors[plan.status]
                                )}
                              >
                                {plan.status}
                              </span>
                            </div>
                            <h3 className="font-semibold mb-1">{plan.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-text-muted">
                              <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                {plan.client}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                Due {plan.deadline}
                              </span>
                              <span className="flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" />
                                {plan.tasksCompleted}/{plan.tasks} tasks
                              </span>
                            </div>
                            <div className="mt-3 h-2 bg-surface-light rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${plan.progress}%` }}
                                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                                className={cn(
                                  'h-full rounded-full',
                                  plan.status === 'Completed'
                                    ? 'bg-success'
                                    : plan.status === 'Overdue'
                                    ? 'bg-error'
                                    : 'bg-primary'
                                )}
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
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
                { label: 'Schedule Session', icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
                { label: 'Match Coach', icon: Users, color: 'text-success', bg: 'bg-success/10' },
                { label: 'View Progress', icon: BarChart3, color: 'text-warning', bg: 'bg-warning/10' },
                { label: 'Create Action Plan', icon: Target, color: 'text-secondary', bg: 'bg-secondary/10' },
                { label: 'Client Reports', icon: FileText, color: 'text-primary', bg: 'bg-primary/10' },
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

          {/* Weekly Calendar */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">This Week</h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setCurrentWeekStart(
                      new Date(currentWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000)
                    )
                  }
                  className="p-1 rounded-lg hover:bg-surface-light transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-text-muted" />
                </button>
                <button
                  onClick={() =>
                    setCurrentWeekStart(
                      new Date(currentWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
                    )
                  }
                  className="p-1 rounded-lg hover:bg-surface-light transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-text-muted" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {calendarDays.map((day) => (
                <div key={day} className="text-center text-xs text-text-muted py-1">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }, (_, i) => {
                const date = new Date(currentWeekStart)
                date.setDate(date.getDate() + i)
                const dayNum = date.getDate()
                const isToday = dayNum === 8
                const hasSessions = [6, 7, 8, 9].includes(dayNum)
                return (
                  <button
                    key={i}
                    className={cn(
                      'aspect-square rounded-lg text-sm flex flex-col items-center justify-center relative transition-colors',
                      isToday
                        ? 'bg-primary text-white'
                        : 'hover:bg-surface-light text-text-muted',
                      hasSessions && !isToday && 'text-white'
                    )}
                  >
                    {dayNum}
                    {hasSessions && (
                      <span
                        className={cn(
                          'absolute bottom-1 w-1 h-1 rounded-full',
                          isToday ? 'bg-white' : 'bg-primary'
                        )}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </Card>

          {/* Session Status */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Session Status</h2>
            <div className="space-y-3">
              {[
                {
                  label: 'Scheduled',
                  count: sampleSessions.filter((s) => s.status === 'Scheduled').length,
                  color: 'bg-primary',
                },
                {
                  label: 'Completed',
                  count: sampleSessions.filter((s) => s.status === 'Completed').length,
                  color: 'bg-success',
                },
                {
                  label: 'Cancelled',
                  count: sampleSessions.filter((s) => s.status === 'Cancelled').length,
                  color: 'bg-error',
                },
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
                      animate={{
                        width: `${(status.count / sampleSessions.length) * 100}%`,
                      }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className={cn('h-full rounded-full', status.color)}
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
                {
                  action: 'Session completed with Chidinma Eze',
                  time: '1 hour ago',
                  icon: CheckCircle,
                  color: 'text-success',
                },
                {
                  action: 'New client matched with Dr. Mensah',
                  time: '3 hours ago',
                  icon: Users,
                  color: 'text-primary',
                },
                {
                  action: 'Action plan updated for Emeka Nwankwo',
                  time: '5 hours ago',
                  icon: Edit,
                  color: 'text-warning',
                },
                {
                  action: 'Session cancelled by David Williams',
                  time: 'Yesterday',
                  icon: XCircle,
                  color: 'text-error',
                },
                {
                  action: 'Coach availability updated',
                  time: 'Yesterday',
                  icon: Clock,
                  color: 'text-text-muted',
                },
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
