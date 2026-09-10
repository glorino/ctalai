'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FolderKanban,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Users,
  DollarSign,
  BarChart3,
  ListTodo,
  Flag,
  Shield,
  GanttChart,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cn, formatDate } from '@/lib/utils'

type ProjectStatus = 'Planning' | 'Active' | 'On Hold' | 'Completed'
type TaskStatus = 'Todo' | 'In Progress' | 'Review' | 'Done'
type Priority = 'Low' | 'Medium' | 'High' | 'Critical'
type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical'

interface Task {
  id: string
  title: string
  status: TaskStatus
  priority: Priority
  assignee: string
  dueDate: string
  projectId: string
}

interface Milestone {
  id: string
  title: string
  date: string
  completed: boolean
  projectId: string
}

interface Risk {
  id: string
  title: string
  level: RiskLevel
  description: string
  mitigation: string
  projectId: string
}

interface Project {
  id: string
  name: string
  status: ProjectStatus
  progress: number
  budget: number
  spent: number
  startDate: string
  endDate: string
  manager: string
  team: number
  tasks: number
  completedTasks: number
}

const sampleProjects: Project[] = [
  {
    id: 'PRJ-001',
    name: 'E-Commerce Platform Redesign',
    status: 'Active',
    progress: 68,
    budget: 15000000,
    spent: 10200000,
    startDate: '2026-06-01',
    endDate: '2026-12-31',
    manager: 'Aisha Mohammed',
    team: 8,
    tasks: 42,
    completedTasks: 29,
  },
  {
    id: 'PRJ-002',
    name: 'Mobile Banking App',
    status: 'Active',
    progress: 45,
    budget: 25000000,
    spent: 11250000,
    startDate: '2026-04-15',
    endDate: '2027-03-30',
    manager: 'Michael Chen',
    team: 12,
    tasks: 67,
    completedTasks: 30,
  },
  {
    id: 'PRJ-003',
    name: 'AI Chatbot Integration',
    status: 'Planning',
    progress: 15,
    budget: 8000000,
    spent: 1200000,
    startDate: '2026-09-01',
    endDate: '2027-01-15',
    manager: 'Sarah Johnson',
    team: 5,
    tasks: 28,
    completedTasks: 4,
  },
  {
    id: 'PRJ-004',
    name: 'Data Analytics Dashboard',
    status: 'On Hold',
    progress: 30,
    budget: 12000000,
    spent: 3600000,
    startDate: '2026-03-10',
    endDate: '2026-11-30',
    manager: 'James Okonkwo',
    team: 6,
    tasks: 35,
    completedTasks: 10,
  },
  {
    id: 'PRJ-005',
    name: 'Legacy System Migration',
    status: 'Completed',
    progress: 100,
    budget: 18000000,
    spent: 16800000,
    startDate: '2026-01-05',
    endDate: '2026-08-31',
    manager: 'Chioma Eze',
    team: 10,
    tasks: 54,
    completedTasks: 54,
  },
  {
    id: 'PRJ-006',
    name: 'Cloud Infrastructure Upgrade',
    status: 'Active',
    progress: 82,
    budget: 9500000,
    spent: 7790000,
    startDate: '2026-05-20',
    endDate: '2026-10-15',
    manager: 'David Williams',
    team: 7,
    tasks: 38,
    completedTasks: 31,
  },
]

const sampleTasks: Task[] = [
  { id: 'TSK-001', title: 'Design system components', status: 'In Progress', priority: 'High', assignee: 'Aisha Mohammed', dueDate: '2026-09-15', projectId: 'PRJ-001' },
  { id: 'TSK-002', title: 'API integration setup', status: 'Todo', priority: 'Critical', assignee: 'Michael Chen', dueDate: '2026-09-20', projectId: 'PRJ-002' },
  { id: 'TSK-003', title: 'User authentication flow', status: 'Review', priority: 'High', assignee: 'Sarah Johnson', dueDate: '2026-09-10', projectId: 'PRJ-003' },
  { id: 'TSK-004', title: 'Database schema design', status: 'Done', priority: 'Medium', assignee: 'James Okonkwo', dueDate: '2026-09-05', projectId: 'PRJ-001' },
  { id: 'TSK-005', title: 'Performance testing', status: 'Todo', priority: 'Medium', assignee: 'David Williams', dueDate: '2026-09-25', projectId: 'PRJ-006' },
  { id: 'TSK-006', title: 'Security audit', status: 'Todo', priority: 'Critical', assignee: 'Chioma Eze', dueDate: '2026-09-30', projectId: 'PRJ-002' },
  { id: 'TSK-007', title: 'Mobile responsive design', status: 'In Progress', priority: 'High', assignee: 'Aisha Mohammed', dueDate: '2026-09-18', projectId: 'PRJ-001' },
  { id: 'TSK-008', title: 'Deployment pipeline', status: 'Review', priority: 'Medium', assignee: 'David Williams', dueDate: '2026-09-12', projectId: 'PRJ-006' },
]

const sampleMilestones: Milestone[] = [
  { id: 'MS-001', title: 'Design Phase Complete', date: '2026-08-15', completed: true, projectId: 'PRJ-001' },
  { id: 'MS-002', title: 'Backend API Ready', date: '2026-09-30', completed: false, projectId: 'PRJ-001' },
  { id: 'MS-003', title: 'Beta Release', date: '2026-11-15', completed: false, projectId: 'PRJ-002' },
  { id: 'MS-004', title: 'MVP Launch', date: '2026-12-01', completed: false, projectId: 'PRJ-002' },
  { id: 'MS-005', title: 'System Migration Done', date: '2026-08-31', completed: true, projectId: 'PRJ-005' },
  { id: 'MS-006', title: 'Go-Live', date: '2026-10-15', completed: false, projectId: 'PRJ-006' },
]

const sampleRisks: Risk[] = [
  { id: 'RSK-001', title: 'Budget Overrun', level: 'High', description: 'Current spending pace may exceed budget by 15%', mitigation: 'Review scope and prioritize critical features', projectId: 'PRJ-002' },
  { id: 'RSK-002', title: 'Resource Conflict', level: 'Medium', description: 'Team members shared across multiple projects', mitigation: 'Implement resource allocation matrix', projectId: 'PRJ-001' },
  { id: 'RSK-003', title: 'Third-party API Dependency', level: 'Low', description: 'Payment gateway API changes pending', mitigation: 'Develop abstraction layer for API integration', projectId: 'PRJ-003' },
  { id: 'RSK-004', title: 'Data Migration Risk', level: 'Critical', description: 'Potential data loss during legacy migration', mitigation: 'Full backup and rollback strategy in place', projectId: 'PRJ-005' },
]

const stats = [
  { title: 'Total Projects', value: '6', change: '+2', trend: 'up' as const, icon: FolderKanban, color: 'primary' },
  { title: 'Active', value: '3', change: '+1', trend: 'up' as const, icon: Play, color: 'success' },
  { title: 'Completed', value: '1', change: '+1', trend: 'up' as const, icon: CheckCircle2, color: 'secondary' },
  { title: 'Overdue', value: '0', change: '-2', trend: 'down' as const, icon: AlertTriangle, color: 'error' },
]

const statusColors: Record<ProjectStatus, string> = {
  Planning: 'bg-warning/20 text-warning',
  Active: 'bg-success/20 text-success',
  'On Hold': 'bg-primary/20 text-primary',
  Completed: 'bg-secondary/20 text-secondary',
}

const taskStatusColors: Record<TaskStatus, string> = {
  Todo: 'bg-surface-light text-text-muted',
  'In Progress': 'bg-primary/20 text-primary',
  Review: 'bg-warning/20 text-warning',
  Done: 'bg-success/20 text-success',
}

const priorityColors: Record<Priority, string> = {
  Low: 'bg-surface-light text-text-muted',
  Medium: 'bg-warning/20 text-warning',
  High: 'bg-secondary/20 text-secondary',
  Critical: 'bg-error/20 text-error',
}

const riskLevelColors: Record<RiskLevel, string> = {
  Low: 'bg-success/20 text-success',
  Medium: 'bg-warning/20 text-warning',
  High: 'bg-secondary/20 text-secondary',
  Critical: 'bg-error/20 text-error',
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'tasks' | 'milestones' | 'risks' | 'gantt'>('projects')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const filteredProjects = sampleProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || project.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const tabs = [
    { id: 'projects' as const, label: 'Projects', icon: FolderKanban },
    { id: 'tasks' as const, label: 'Tasks', icon: ListTodo },
    { id: 'milestones' as const, label: 'Milestones', icon: Target },
    { id: 'risks' as const, label: 'Risks', icon: Shield },
    { id: 'gantt' as const, label: 'Gantt', icon: GanttChart },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
            Project Management
          </h1>
          <p className="text-text-muted">
            Track projects, manage tasks, and monitor milestones.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Shield className="w-4 h-4 mr-2" />
            View Risks
          </Button>
          <Button variant="outline" size="sm">
            <ListTodo className="w-4 h-4 mr-2" />
            Add Task
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Project
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
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-success' : 'text-error'}`}>
                      {stat.change}
                    </span>
                    <span className="text-text-muted text-sm">vs last month</span>
                  </div>
                </div>
                <div className={cn('p-3 rounded-xl', stat.color === 'primary' && 'bg-primary/10', stat.color === 'success' && 'bg-success/10', stat.color === 'secondary' && 'bg-secondary/10', stat.color === 'error' && 'bg-error/10')}>
                  <stat.icon className={cn('w-6 h-6', stat.color === 'primary' && 'text-primary', stat.color === 'success' && 'text-success', stat.color === 'secondary' && 'text-secondary', stat.color === 'error' && 'text-error')} />
                </div>
              </div>
              <div className={cn('absolute bottom-0 left-0 right-0 h-1', stat.color === 'primary' && 'bg-gradient-to-r from-primary to-primary-light', stat.color === 'success' && 'bg-gradient-to-r from-success to-emerald-400', stat.color === 'secondary' && 'bg-gradient-to-r from-secondary to-secondary-light', stat.color === 'error' && 'bg-gradient-to-r from-error to-red-400')} />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Card hover={false}>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-text-muted hover:bg-surface-light hover:text-white'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Projects Tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'projects' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Search and Filters */}
            <Card hover={false}>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search projects..."
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
                  <option value="Planning">Planning</option>
                  <option value="Active">Active</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </Card>

            {/* Project Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={cn(
                      'cursor-pointer',
                      selectedProject === project.id && 'ring-2 ring-primary'
                    )}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-xs text-text-muted">{project.id}</p>
                          <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', statusColors[project.status])}>
                            {project.status}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                      </div>
                      <button
                        className="p-2 rounded-lg hover:bg-surface-light transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-4 h-4 text-text-muted" />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-text-muted">Progress</span>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={cn(
                            'h-full rounded-full',
                            project.progress >= 80
                              ? 'bg-success'
                              : project.progress >= 50
                              ? 'bg-primary'
                              : project.progress >= 30
                              ? 'bg-warning'
                              : 'bg-secondary'
                          )}
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-text-muted" />
                        <div>
                          <p className="text-xs text-text-muted">Budget</p>
                          <p className="text-sm font-medium">{formatCurrency(project.budget)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-text-muted" />
                        <div>
                          <p className="text-xs text-text-muted">Spent</p>
                          <p className="text-sm font-medium">{formatCurrency(project.spent)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-text-muted" />
                        <div>
                          <p className="text-xs text-text-muted">Team</p>
                          <p className="text-sm font-medium">{project.team} members</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ListTodo className="w-4 h-4 text-text-muted" />
                        <div>
                          <p className="text-xs text-text-muted">Tasks</p>
                          <p className="text-sm font-medium">{project.completedTasks}/{project.tasks}</p>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-semibold">
                          {project.manager.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <span className="text-sm text-text-muted">{project.manager}</span>
                      </div>
                      <div className="flex items-center gap-1 text-text-muted">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">{formatDate(project.endDate)}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <motion.div
            key="tasks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Card hover={false}>
              <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-3 text-sm text-text-muted border-b border-white/5">
                <div className="col-span-4">Task</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Priority</div>
                <div className="col-span-2">Assignee</div>
                <div className="col-span-2">Due Date</div>
              </div>

              <AnimatePresence mode="popLayout">
                {sampleTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center px-4 py-4 border-b border-white/5 last:border-0 hover:bg-surface-light/50 transition-colors"
                  >
                    <div className="lg:col-span-4">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-text-muted">{task.id}</p>
                    </div>
                    <div className="lg:col-span-2">
                      <span className={cn('px-3 py-1 rounded-full text-xs font-medium', taskStatusColors[task.status])}>
                        {task.status}
                      </span>
                    </div>
                    <div className="lg:col-span-2">
                      <span className={cn('px-3 py-1 rounded-full text-xs font-medium', priorityColors[task.priority])}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="lg:col-span-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs">
                        {task.assignee.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-sm text-text-muted">{task.assignee.split(' ')[0]}</span>
                    </div>
                    <div className="lg:col-span-2 flex items-center gap-1 text-text-muted">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(task.dueDate)}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}

        {/* Milestones Tab */}
        {activeTab === 'milestones' && (
          <motion.div
            key="milestones"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Card hover={false}>
              <div className="space-y-0">
                {sampleMilestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 relative"
                  >
                    {/* Timeline line */}
                    {index < sampleMilestones.length - 1 && (
                      <div className="absolute left-[15px] top-[30px] w-0.5 h-[calc(100%-10px)] bg-surface-light" />
                    )}
                    {/* Timeline dot */}
                    <div className={cn('w-8 h-8 rounded-full flex items-center justify-center z-10 shrink-0', milestone.completed ? 'bg-success' : 'bg-surface-light border-2 border-white/10')}>
                      {milestone.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <Target className="w-4 h-4 text-text-muted" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{milestone.title}</p>
                          <p className="text-sm text-text-muted">{milestone.id} • Project: {milestone.projectId}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-text-muted">{formatDate(milestone.date)}</span>
                          {milestone.completed ? (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-success/20 text-success">Completed</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-warning/20 text-warning">Pending</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Risks Tab */}
        {activeTab === 'risks' && (
          <motion.div
            key="risks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {sampleRisks.map((risk, index) => (
              <motion.div
                key={risk.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-text-muted" />
                      <span className="text-xs text-text-muted">{risk.id}</span>
                    </div>
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', riskLevelColors[risk.level])}>
                      {risk.level}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{risk.title}</h3>
                  <p className="text-sm text-text-muted mb-3">{risk.description}</p>
                  <div className="pt-3 border-t border-white/5">
                    <p className="text-xs text-text-muted mb-1">Mitigation Strategy</p>
                    <p className="text-sm">{risk.mitigation}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Gantt Tab */}
        {activeTab === 'gantt' && (
          <motion.div
            key="gantt"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card hover={false}>
              <div className="overflow-x-auto">
                {/* Header with months */}
                <div className="flex items-center min-w-[800px]">
                  <div className="w-48 shrink-0 p-3 text-sm font-medium text-text-muted border-b border-white/5">Project</div>
                  <div className="flex-1 grid grid-cols-8 gap-px">
                    {['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'].map((month) => (
                      <div key={month} className="p-3 text-center text-xs text-text-muted border-b border-white/5">{month}</div>
                    ))}
                  </div>
                </div>

                {/* Project rows */}
                {sampleProjects.filter((p) => p.status !== 'Completed').map((project, index) => {
                  const startDate = new Date(project.startDate)
                  const endDate = new Date(project.endDate)
                  const startMonth = startDate.getMonth() - 5 // Offset from June
                  const durationMonths = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
                  const widthPercent = (durationMonths / 8) * 100
                  const leftPercent = (startMonth / 8) * 100

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center min-w-[800px] border-b border-white/5"
                    >
                      <div className="w-48 shrink-0 p-3 border-r border-white/5">
                        <p className="text-sm font-medium truncate">{project.name}</p>
                        <p className="text-xs text-text-muted">{project.status}</p>
                      </div>
                      <div className="flex-1 relative h-12">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${widthPercent}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className={cn(
                            'absolute top-3 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white',
                            project.status === 'Active' ? 'bg-primary' : project.status === 'Planning' ? 'bg-warning' : 'bg-surface-light'
                          )}
                          style={{ left: `${leftPercent}%` }}
                        >
                          <span className="px-2 truncate">{project.progress}%</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Avg. Completion</p>
              <p className="text-xl font-bold">72%</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/10">
              <Flag className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Open Risks</p>
              <p className="text-xl font-bold">4</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-success/10">
              <Target className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Milestones Hit</p>
              <p className="text-xl font-bold">2/6</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}