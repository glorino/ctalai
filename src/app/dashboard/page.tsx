'use client'

import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  DollarSign,
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Briefcase,
  Clock,
} from 'lucide-react'
import Card from '@/components/ui/card'

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
    title: 'Revenue',
    value: '₦12.4M',
    change: '+8.2%',
    trend: 'up',
    icon: DollarSign,
    color: 'success',
  },
  {
    title: 'Active Programmes',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: GraduationCap,
    color: 'secondary',
  },
  {
    title: 'Conversion Rate',
    value: '34.2%',
    change: '+2.1%',
    trend: 'up',
    icon: Target,
    color: 'warning',
  },
]

const recentActivities = [
  { id: 1, type: 'lead', message: 'New lead captured from webinar', time: '2 min ago' },
  { id: 2, type: 'enrollment', message: 'Sarah enrolled in Digital Marketing', time: '15 min ago' },
  { id: 3, type: 'payment', message: 'Payment received from Tech Corp', time: '1 hour ago' },
  { id: 4, type: 'support', message: 'Ticket #1234 resolved', time: '2 hours ago' },
  { id: 5, type: 'coaching', message: 'Coaching session completed', time: '3 hours ago' },
]

const upcomingTasks = [
  { id: 1, task: 'Follow up with Lead #892', priority: 'high', due: 'Today' },
  { id: 2, task: 'Review programme curriculum', priority: 'medium', due: 'Tomorrow' },
  { id: 3, task: 'Prepare investor report', priority: 'high', due: 'In 3 days' },
  { id: 4, task: 'Team meeting preparation', priority: 'low', due: 'In 5 days' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
          Welcome back, John
        </h1>
        <p className="text-text-muted">
          Here&apos;s what&apos;s happening with your business today.
        </p>
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
              {/* Decorative gradient */}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Recent Activity
              </h2>
              <button className="text-sm text-primary hover:text-primary-light transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-light transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'lead'
                        ? 'bg-primary'
                        : activity.type === 'enrollment'
                        ? 'bg-success'
                        : activity.type === 'payment'
                        ? 'bg-warning'
                        : 'bg-secondary'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-text-muted mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                Upcoming Tasks
              </h2>
              <button className="text-sm text-primary hover:text-primary-light transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg bg-surface-light"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm">{task.task}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === 'high'
                          ? 'bg-error/20 text-error'
                          : task.priority === 'medium'
                          ? 'bg-warning/20 text-warning'
                          : 'bg-success/20 text-success'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-2">Due: {task.due}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Customer', icon: Users, href: '/dashboard/crm/new' },
            { label: 'Create Lead', icon: Target, href: '/dashboard/leads/new' },
            { label: 'New Programme', icon: GraduationCap, href: '/dashboard/programs/new' },
            { label: 'Generate Invoice', icon: DollarSign, href: '/dashboard/finance/invoices/new' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-4 rounded-xl bg-surface-light hover:bg-primary/10 transition-all duration-200 group"
            >
              <action.icon className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
              <span className="text-sm text-text-muted group-hover:text-white transition-colors">
                {action.label}
              </span>
            </a>
          ))}
        </div>
      </Card>

      {/* AI Agent Status */}
      <Card>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          AI Agent Status
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Growth Agent', status: 'active', tasks: 12 },
            { name: 'Customer Success', status: 'active', tasks: 8 },
            { name: 'Learning Agent', status: 'active', tasks: 15 },
            { name: 'Finance Agent', status: 'active', tasks: 6 },
          ].map((agent) => (
            <div
              key={agent.name}
              className="p-4 rounded-xl bg-surface-light text-center"
            >
              <div className="w-3 h-3 rounded-full bg-success mx-auto mb-2 animate-pulse" />
              <p className="text-sm font-medium">{agent.name}</p>
              <p className="text-xs text-text-muted mt-1">
                {agent.tasks} tasks running
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
