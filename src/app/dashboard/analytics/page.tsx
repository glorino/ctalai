'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  Filter,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  Info,
  RefreshCw,
  Eye,
  Users,
  Target,
  Zap,
  Globe,
  ShoppingCart,
  DollarSign,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  Clock,
  ArrowRight,
  Sparkles,
  Brain,
  Lightbulb,
} from 'lucide-react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface KPI {
  id: string
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: React.ElementType
  color: string
}

interface RevenueData {
  month: string
  revenue: number
  target: number
}

interface CustomerSegment {
  segment: string
  count: number
  percentage: number
  color: string
}

interface MarketingChannel {
  channel: string
  leads: number
  conversions: number
  roi: number
}

interface Programme {
  name: string
  enrolled: number
  completed: number
  satisfaction: number
}

interface KPIAlert {
  id: number
  type: 'warning' | 'info' | 'success' | 'danger'
  message: string
  action: string
}

const kpis: KPI[] = [
  {
    id: '1',
    title: 'Revenue Growth',
    value: '+24.8%',
    change: '+5.2%',
    trend: 'up',
    icon: TrendingUp,
    color: 'primary',
  },
  {
    id: '2',
    title: 'Customer Growth',
    value: '+1,247',
    change: '+18.3%',
    trend: 'up',
    icon: Users,
    color: 'success',
  },
  {
    id: '3',
    title: 'Conversion Rate',
    value: '12.4%',
    change: '+2.1%',
    trend: 'up',
    icon: Target,
    color: 'secondary',
  },
  {
    id: '4',
    title: 'Satisfaction',
    value: '4.8/5.0',
    change: '+0.3',
    trend: 'up',
    icon: Sparkles,
    color: 'warning',
  },
]

const revenueData: RevenueData[] = [
  { month: 'Apr', revenue: 4200000, target: 4000000 },
  { month: 'May', revenue: 5800000, target: 5500000 },
  { month: 'Jun', revenue: 3900000, target: 5000000 },
  { month: 'Jul', revenue: 7200000, target: 6000000 },
  { month: 'Aug', revenue: 8100000, target: 7500000 },
  { month: 'Sep', revenue: 6500000, target: 7000000 },
]

const customerSegments: CustomerSegment[] = [
  { segment: 'Enterprise', count: 245, percentage: 32, color: 'bg-primary' },
  { segment: 'Corporate', count: 487, percentage: 42, color: 'bg-secondary' },
  { segment: 'Individual', count: 892, percentage: 18, color: 'bg-success' },
  { segment: 'Startup', count: 123, percentage: 8, color: 'bg-warning' },
]

const marketingChannels: MarketingChannel[] = [
  { channel: 'Organic Search', leads: 1247, conversions: 156, roi: 340 },
  { channel: 'Social Media', leads: 892, conversions: 89, roi: 280 },
  { channel: 'Email Campaign', leads: 567, conversions: 78, roi: 420 },
  { channel: 'Paid Ads', leads: 423, conversions: 45, roi: 190 },
  { channel: 'Referrals', leads: 234, conversions: 34, roi: 520 },
]

const programmes: Programme[] = [
  { name: 'Leadership Mastery', enrolled: 127, completed: 89, satisfaction: 4.9 },
  { name: 'Digital Transformation', enrolled: 98, completed: 67, satisfaction: 4.7 },
  { name: 'AI & Innovation', enrolled: 156, completed: 112, satisfaction: 4.8 },
  { name: 'Executive Coaching', enrolled: 45, completed: 32, satisfaction: 4.9 },
  { name: 'Strategic Planning', enrolled: 78, completed: 54, satisfaction: 4.6 },
]

const kpiAlerts: KPIAlert[] = [
  {
    id: 1,
    type: 'success',
    message: 'Revenue target 92% achieved — ₦6.5M of ₦7M goal',
    action: 'View Details',
  },
  {
    id: 2,
    type: 'warning',
    message: 'Customer acquisition cost increased by 8% this month',
    action: 'Optimize',
  },
  {
    id: 3,
    type: 'info',
    message: 'New AI-powered analytics features available',
    action: 'Explore',
  },
  {
    id: 4,
    type: 'danger',
    message: '3 programmes below satisfaction threshold',
    action: 'Review',
  },
]

const monthlyTrends = [
  { metric: 'Page Views', value: '245K', change: '+12%', trend: 'up' },
  { metric: 'Unique Visitors', value: '89K', change: '+8%', trend: 'up' },
  { metric: 'Bounce Rate', value: '34%', change: '-5%', trend: 'down' },
  { metric: 'Avg. Session', value: '4m 32s', change: '+15%', trend: 'up' },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<string>('Last 30 Days')
  const [showDateRange, setShowDateRange] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('overview')

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue))
  const maxTarget = Math.max(...revenueData.map((d) => d.target))

  const totalLeads = marketingChannels.reduce((sum, ch) => sum + ch.leads, 0)
  const totalConversions = marketingChannels.reduce(
    (sum, ch) => sum + ch.conversions,
    0
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
            Business Intelligence & Decision Support
          </h1>
          <p className="text-text-muted">
            Real-time analytics and insights to drive strategic decisions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-success">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Live Data
          </div>
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDateRange(!showDateRange)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {dateRange}
              <ChevronDown
                className={cn(
                  'w-4 h-4 ml-2 transition-transform',
                  showDateRange && 'rotate-180'
                )}
              />
            </Button>
            <AnimatePresence>
              {showDateRange && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 bg-surface border border-white/10 rounded-xl shadow-xl z-50 w-48"
                >
                  {[
                    'Last 7 Days',
                    'Last 30 Days',
                    'Last Quarter',
                    'Year to Date',
                    'Custom Range',
                  ].map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setDateRange(range)
                        setShowDateRange(false)
                      }}
                      className={cn(
                        'w-full text-left px-4 py-2.5 text-sm hover:bg-primary/10 transition-colors first:rounded-t-xl last:rounded-b-xl',
                        dateRange === range && 'text-primary bg-primary/5'
                      )}
                    >
                      {range}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="primary" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Alerts */}
      <div className="space-y-2">
        {kpiAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              'flex items-center justify-between p-3 rounded-xl border',
              alert.type === 'warning' && 'bg-warning/5 border-warning/20',
              alert.type === 'info' && 'bg-primary/5 border-primary/20',
              alert.type === 'success' && 'bg-success/5 border-success/20',
              alert.type === 'danger' && 'bg-error/5 border-error/20'
            )}
          >
            <div className="flex items-center gap-3">
              {alert.type === 'warning' && (
                <AlertTriangle className="w-4 h-4 text-warning" />
              )}
              {alert.type === 'info' && (
                <Info className="w-4 h-4 text-primary" />
              )}
              {alert.type === 'success' && (
                <CheckCircle className="w-4 h-4 text-success" />
              )}
              {alert.type === 'danger' && (
                <AlertTriangle className="w-4 h-4 text-error" />
              )}
              <span className="text-sm">{alert.message}</span>
            </div>
            <button className="text-xs text-primary hover:text-primary-light transition-colors font-medium">
              {alert.action}
            </button>
          </motion.div>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-muted text-sm">{kpi.title}</p>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-success" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-error" />
                    )}
                    <span
                      className={`text-sm ${
                        kpi.trend === 'up' ? 'text-success' : 'text-error'
                      }`}
                    >
                      {kpi.change}
                    </span>
                    <span className="text-text-muted text-sm">vs last month</span>
                  </div>
                </div>
                <div
                  className={cn(
                    'p-3 rounded-xl',
                    kpi.color === 'primary' && 'bg-primary/10',
                    kpi.color === 'success' && 'bg-success/10',
                    kpi.color === 'secondary' && 'bg-secondary/10',
                    kpi.color === 'warning' && 'bg-warning/10'
                  )}
                >
                  <kpi.icon
                    className={cn(
                      'w-6 h-6',
                      kpi.color === 'primary' && 'text-primary',
                      kpi.color === 'success' && 'text-success',
                      kpi.color === 'secondary' && 'text-secondary',
                      kpi.color === 'warning' && 'text-warning'
                    )}
                  />
                </div>
              </div>
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 h-1',
                  kpi.color === 'primary' &&
                    'bg-gradient-to-r from-primary to-primary-light',
                  kpi.color === 'success' &&
                    'bg-gradient-to-r from-success to-emerald-400',
                  kpi.color === 'secondary' &&
                    'bg-gradient-to-r from-secondary to-secondary-light',
                  kpi.color === 'warning' &&
                    'bg-gradient-to-r from-warning to-amber-400'
                )}
              />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Revenue Analytics
              </h2>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  Revenue
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary/50" />
                  Target
                </div>
              </div>
            </div>
            <div className="flex items-end gap-3 h-64">
              {revenueData.map((item, index) => (
                <motion.div
                  key={item.month}
                  className="flex-1 flex flex-col items-center gap-2"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  style={{ transformOrigin: 'bottom' }}
                >
                  <span className="text-xs text-text-muted">
                    {(item.revenue / 1000000).toFixed(1)}M
                  </span>
                  <div className="w-full flex gap-1 items-end h-full">
                    <div
                      className={cn(
                        'flex-1 rounded-t-lg transition-all duration-500',
                        index === revenueData.length - 1
                          ? 'bg-gradient-to-t from-primary to-primary-light'
                          : 'bg-gradient-to-t from-primary/60 to-primary/30'
                      )}
                      style={{
                        height: `${(item.revenue / maxRevenue) * 100}%`,
                      }}
                    />
                    <div
                      className="flex-1 rounded-t-lg bg-secondary/30 border border-secondary/20"
                      style={{
                        height: `${(item.target / maxTarget) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-text-muted">{item.month}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Customer Segments */}
        <Card>
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-secondary" />
            Customer Segments
          </h2>
          <div className="space-y-4">
            {customerSegments.map((segment, index) => (
              <motion.div
                key={segment.segment}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{segment.segment}</span>
                  <span className="text-sm text-text-muted">
                    {segment.count.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${segment.percentage}%` }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className={cn('h-full rounded-full', segment.color)}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>{segment.percentage}% of total</span>
                  <span>{segment.count.toLocaleString()} customers</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Marketing & Programme Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Marketing Analytics */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Globe className="w-5 h-5 text-success" />
              Marketing Analytics
            </h2>
            <div className="text-right">
              <p className="text-xs text-text-muted">Total Leads</p>
              <p className="text-lg font-bold text-success">
                {totalLeads.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {marketingChannels.map((channel, index) => (
              <motion.div
                key={channel.channel}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-xl bg-surface-light"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{channel.channel}</span>
                  <span
                    className={cn(
                      'text-xs px-2 py-0.5 rounded-full font-medium',
                      channel.roi >= 400
                        ? 'bg-success/20 text-success'
                        : channel.roi >= 200
                        ? 'bg-warning/20 text-warning'
                        : 'bg-error/20 text-error'
                    )}
                  >
                    {channel.roi}% ROI
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-text-muted">Leads</p>
                    <p className="text-sm font-semibold">
                      {channel.leads.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Conversions</p>
                    <p className="text-sm font-semibold">
                      {channel.conversions.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-2 h-1.5 bg-surface rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(channel.conversions / channel.leads) * 100}%`,
                    }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-success to-emerald-400 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Programme Analytics */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" />
              Programme Analytics
            </h2>
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {programmes.map((programme, index) => (
              <motion.div
                key={programme.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-xl bg-surface-light"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{programme.name}</span>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-warning" />
                    <span className="text-sm font-medium">
                      {programme.satisfaction}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-text-muted">Enrolled</p>
                    <p className="text-sm font-semibold">{programme.enrolled}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Completed</p>
                    <p className="text-sm font-semibold">{programme.completed}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Completion</p>
                    <p className="text-sm font-semibold text-success">
                      {Math.round(
                        (programme.completed / programme.enrolled) * 100
                      )}
                      %
                    </p>
                  </div>
                </div>
                <div className="mt-2 h-1.5 bg-surface rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        (programme.completed / programme.enrolled) * 100
                      }%`,
                    }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-secondary to-secondary-light rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Website Metrics */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <LineChart className="w-5 h-5 text-primary" />
            Website Performance
          </h2>
          <span className="text-xs text-text-muted">Last 30 days</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {monthlyTrends.map((trend, index) => (
            <motion.div
              key={trend.metric}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-surface-light text-center"
            >
              <p className="text-text-muted text-sm mb-1">{trend.metric}</p>
              <p className="text-2xl font-bold">{trend.value}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                {trend.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-success" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-success" />
                )}
                <span className="text-sm text-success">{trend.change}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="border border-primary/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">AI-Powered Insights</h2>
            <p className="text-sm text-text-muted">
              Smart recommendations based on your data
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Lightbulb,
              title: 'Revenue Opportunity',
              description:
                'Increase pricing for Enterprise segment by 15% to maximize revenue potential.',
              impact: 'High',
              color: 'success',
            },
            {
              icon: Users,
              title: 'Customer Retention',
              description:
                'Implement loyalty programme for Corporate clients showing 20% churn risk.',
              impact: 'Medium',
              color: 'warning',
            },
            {
              icon: Target,
              title: 'Conversion Optimization',
              description:
                'Optimize landing pages for Paid Ads channel to improve conversion rate by 25%.',
              impact: 'High',
              color: 'primary',
            },
          ].map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-surface-light border border-white/5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={cn(
                    'p-2 rounded-lg',
                    insight.color === 'success' && 'bg-success/10',
                    insight.color === 'warning' && 'bg-warning/10',
                    insight.color === 'primary' && 'bg-primary/10'
                  )}
                >
                  <insight.icon
                    className={cn(
                      'w-4 h-4',
                      insight.color === 'success' && 'text-success',
                      insight.color === 'warning' && 'text-warning',
                      insight.color === 'primary' && 'text-primary'
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-medium',
                    insight.impact === 'High'
                      ? 'bg-success/20 text-success'
                      : 'bg-warning/20 text-warning'
                  )}
                >
                  {insight.impact} Impact
                </span>
              </div>
              <h3 className="font-medium mb-2">{insight.title}</h3>
              <p className="text-sm text-text-muted">{insight.description}</p>
              <button className="mt-3 text-xs text-primary hover:text-primary-light transition-colors font-medium flex items-center gap-1">
                Learn More
                <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Total Revenue</p>
              <p className="text-xl font-bold">{formatCurrency(35700000)}</p>
              <p className="text-xs text-success mt-1">+24.8% YoY growth</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-success/10">
              <Users className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Total Customers</p>
              <p className="text-xl font-bold">1,747</p>
              <p className="text-xs text-success mt-1">+18.3% growth</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-secondary/10">
              <Zap className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Overall ROI</p>
              <p className="text-xl font-bold">342%</p>
              <p className="text-xs text-success mt-1">+45% improvement</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
