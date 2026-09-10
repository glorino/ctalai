'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Eye,
  Edit3,
  Calendar,
  Search,
  Plus,
  BookOpen,
  Clock,
  Tag,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  RefreshCw,
  Filter,
  Download,
  Sparkles,
  Lightbulb,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock3,
  Archive,
  Share2,
  Brain,
  RotateCcw,
  FolderOpen,
} from 'lucide-react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ContentStatus = 'Draft' | 'Published' | 'Review'

interface Article {
  id: string
  title: string
  category: string
  status: ContentStatus
  author: string
  date: string
  views: number
  tags: string[]
}

interface KBEntry {
  id: string
  title: string
  category: string
  type: string
  lastUpdated: string
  size: string
}

interface CalendarEvent {
  id: string
  title: string
  date: number
  type: 'publish' | 'review' | 'deadline'
  status: ContentStatus
}

interface Stat {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ElementType
  color: string
}

const stats: Stat[] = [
  { label: 'Total Articles', value: '127', change: '+12 this month', trend: 'up', icon: FileText, color: 'primary' },
  { label: 'Published', value: '89', change: '+8 this month', trend: 'up', icon: CheckCircle, color: 'success' },
  { label: 'Drafts', value: '31', change: '+3 this month', trend: 'up', icon: Edit3, color: 'warning' },
  { label: 'Total Views', value: '45.2K', change: '+18% vs last month', trend: 'up', icon: Eye, color: 'secondary' },
]

const articles: Article[] = [
  { id: '1', title: 'AI-Driven Decision Making in Modern Organizations', category: 'AI & Technology', status: 'Published', author: 'Adaeze Obi', date: '2026-09-05', views: 2341, tags: ['AI', 'Leadership', 'Innovation'] },
  { id: '2', title: 'Strategic Planning for Digital Transformation', category: 'Strategy', status: 'Published', author: 'Chinedu Eze', date: '2026-09-03', views: 1892, tags: ['Strategy', 'Digital', 'Planning'] },
  { id: '3', title: 'Building Resilient Teams in Uncertain Times', category: 'Leadership', status: 'Review', author: 'Ngozi Adichie', date: '2026-09-01', views: 0, tags: ['Leadership', 'Teams', 'Resilience'] },
  { id: '4', title: 'Financial Modelling for SMEs: A Practical Guide', category: 'Finance', status: 'Draft', author: 'Emeka Nwosu', date: '2026-08-28', views: 0, tags: ['Finance', 'SME', 'Modelling'] },
  { id: '5', title: 'The Future of Work: Remote vs Hybrid Models', category: 'HR & Culture', status: 'Published', author: 'Amina Bello', date: '2026-08-25', views: 3102, tags: ['HR', 'Workplace', 'Future'] },
  { id: '6', title: 'Mastering Executive Communication', category: 'Communication', status: 'Draft', author: 'Funke Adeyemi', date: '2026-08-22', views: 0, tags: ['Communication', 'Executive', 'Skills'] },
  { id: '7', title: 'Sustainable Business Practices in 2026', category: 'Sustainability', status: 'Review', author: 'Tunde Bakare', date: '2026-08-20', views: 0, tags: ['Sustainability', 'ESG', 'Business'] },
  { id: '8', title: 'Data-Driven Marketing Strategies', category: 'Marketing', status: 'Published', author: 'Chioma Nwankwo', date: '2026-08-18', views: 1567, tags: ['Marketing', 'Data', 'Strategy'] },
]

const kbEntries: KBEntry[] = [
  { id: '1', title: 'CTAL Training Framework v3.0', category: 'Frameworks', type: 'Document', lastUpdated: '2026-09-04', size: '2.4 MB' },
  { id: '2', title: 'Leadership Assessment Methodology', category: 'Assessments', type: 'Spreadsheet', lastUpdated: '2026-09-03', size: '1.1 MB' },
  { id: '3', title: 'Digital Transformation Playbook', category: 'Playbooks', type: 'PDF', lastUpdated: '2026-09-01', size: '5.8 MB' },
  { id: '4', title: 'Financial Templates Collection', category: 'Templates', type: 'Bundle', lastUpdated: '2026-08-30', size: '12.3 MB' },
  { id: '5', title: 'Coaching Session Recordings', category: 'Recordings', type: 'Video', lastUpdated: '2026-08-28', size: '45.6 MB' },
  { id: '6', title: 'Client Case Studies 2026', category: 'Case Studies', type: 'Document', lastUpdated: '2026-08-25', size: '3.2 MB' },
]

const calendarEvents: CalendarEvent[] = [
  { id: '1', title: 'AI Article Series Launch', date: 10, type: 'publish', status: 'Published' },
  { id: '2', title: 'Strategy Whitepaper', date: 12, type: 'review', status: 'Review' },
  { id: '3', title: 'Monthly Newsletter', date: 15, type: 'publish', status: 'Draft' },
  { id: '4', title: 'Webinar Blog Post', date: 18, type: 'deadline', status: 'Draft' },
  { id: '5', title: 'Case Study Publication', date: 20, type: 'publish', status: 'Review' },
  { id: '6', title: 'Quarterly Knowledge Review', date: 25, type: 'deadline', status: 'Published' },
]

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const categories = ['All', 'AI & Technology', 'Strategy', 'Leadership', 'Finance', 'HR & Culture', 'Communication']

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<'articles' | 'calendar' | 'kb' | 'repurpose'>('articles')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const publishedCount = articles.filter((a) => a.status === 'Published').length
  const draftCount = articles.filter((a) => a.status === 'Draft').length
  const reviewCount = articles.filter((a) => a.status === 'Review').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
            Content & Knowledge Management
          </h1>
          <p className="text-text-muted">
            Create, manage, and distribute content across all channels.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Article
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-muted text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-success" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-error" />
                    )}
                    <span className="text-sm text-success">{stat.change}</span>
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

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 p-1 bg-surface-light rounded-xl">
        {[
          { id: 'articles' as const, label: 'Articles', icon: FileText },
          { id: 'calendar' as const, label: 'Calendar', icon: Calendar },
          { id: 'kb' as const, label: 'Knowledge Base', icon: BookOpen },
          { id: 'repurpose' as const, label: 'Repurpose', icon: RotateCcw },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 justify-center',
              activeTab === tab.id
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'text-text-muted hover:text-text hover:bg-white/5'
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <motion.div
            key="articles"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search articles, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className={cn('w-4 h-4 ml-2 transition-transform', showFilters && 'rotate-180')} />
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Category Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 overflow-hidden"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                        selectedCategory === cat
                          ? 'bg-primary text-white'
                          : 'bg-surface-light text-text-muted hover:text-text hover:bg-white/10'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status Summary */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="text-text-muted">{publishedCount} Published</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-text-muted">{draftCount} Drafts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-text-muted">{reviewCount} In Review</span>
              </div>
            </div>

            {/* Articles List */}
            <div className="space-y-3">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:border-white/20 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium truncate">{article.title}</h3>
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded-full text-xs font-medium shrink-0',
                              article.status === 'Published' && 'bg-success/20 text-success',
                              article.status === 'Draft' && 'bg-warning/20 text-warning',
                              article.status === 'Review' && 'bg-primary/20 text-primary'
                            )}
                          >
                            {article.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text-muted">
                          <span>{article.category}</span>
                          <span>{article.author}</span>
                          <span>{article.date}</span>
                          {article.views > 0 && (
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {article.views.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-surface-light rounded-md text-xs text-text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Edit3 className="w-4 h-4 text-text-muted" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Share2 className="w-4 h-4 text-text-muted" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-text-muted" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  September 2026
                </h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg font-medium">
                    Today
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-white/5 rounded-xl overflow-hidden">
                {daysOfWeek.map((day) => (
                  <div key={day} className="p-3 text-center text-xs font-medium text-text-muted bg-surface">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                  const dayEvents = calendarEvents.filter((e) => e.date === day)
                  const isToday = day === 8
                  return (
                    <div
                      key={day}
                      className={cn(
                        'min-h-[80px] p-2 bg-surface hover:bg-surface-light transition-colors',
                        isToday && 'ring-2 ring-primary ring-inset'
                      )}
                    >
                      <span
                        className={cn(
                          'text-sm font-medium',
                          isToday && 'text-primary',
                          dayEvents.length === 0 && !isToday && 'text-text-muted'
                        )}
                      >
                        {day}
                      </span>
                      <div className="mt-1 space-y-1">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={cn(
                              'px-1.5 py-0.5 rounded text-[10px] font-medium truncate',
                              event.type === 'publish' && 'bg-success/20 text-success',
                              event.type === 'review' && 'bg-primary/20 text-primary',
                              event.type === 'deadline' && 'bg-secondary/20 text-secondary'
                            )}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-success/30" />
                  <span className="text-text-muted">Publish</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-primary/30" />
                  <span className="text-text-muted">Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-secondary/30" />
                  <span className="text-text-muted">Deadline</span>
                </div>
              </div>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock3 className="w-4 h-4 text-warning" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {calendarEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface-light"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold',
                          event.type === 'publish' && 'bg-success/10 text-success',
                          event.type === 'review' && 'bg-primary/10 text-primary',
                          event.type === 'deadline' && 'bg-secondary/10 text-secondary'
                        )}
                      >
                        {event.date}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-text-muted capitalize">{event.type}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium',
                        event.status === 'Published' && 'bg-success/20 text-success',
                        event.status === 'Draft' && 'bg-warning/20 text-warning',
                        event.status === 'Review' && 'bg-primary/20 text-primary'
                      )}
                    >
                      {event.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Knowledge Base Tab */}
        {activeTab === 'kb' && (
          <motion.div
            key="kb"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* KB Search */}
            <Card className="border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Knowledge Base</h2>
                  <p className="text-sm text-text-muted">Search and manage organizational knowledge</p>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search knowledge base..."
                  className="w-full pl-11 pr-4 py-3 bg-surface-light border border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </Card>

            {/* KB Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Total Resources', value: '248', icon: FolderOpen, color: 'primary' },
                { label: 'Categories', value: '18', icon: Tag, color: 'secondary' },
                { label: 'This Month', value: '+34', icon: TrendingUp, color: 'success' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <div className="flex items-center gap-3">
                      <div className={cn('p-2.5 rounded-xl', stat.color === 'primary' && 'bg-primary/10', stat.color === 'secondary' && 'bg-secondary/10', stat.color === 'success' && 'bg-success/10')}>
                        <stat.icon className={cn('w-5 h-5', stat.color === 'primary' && 'text-primary', stat.color === 'secondary' && 'text-secondary', stat.color === 'success' && 'text-success')} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-text-muted">{stat.label}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* KB Entries */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Resources</h3>
                <Button variant="primary" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Resource
                </Button>
              </div>
              <div className="space-y-3">
                {kbEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface-light hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{entry.title}</p>
                        <div className="flex items-center gap-3 text-xs text-text-muted mt-0.5">
                          <span>{entry.category}</span>
                          <span>{entry.type}</span>
                          <span>{entry.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-text-muted">{entry.lastUpdated}</p>
                      <button className="text-xs text-primary hover:text-primary-light transition-colors font-medium mt-1">
                        View
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Repurpose Tab */}
        {activeTab === 'repurpose' && (
          <motion.div
            key="repurpose"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <Card className="border border-secondary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <RotateCcw className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Content Repurposing</h2>
                  <p className="text-sm text-text-muted">Transform existing content into new formats</p>
                </div>
              </div>
            </Card>

            {/* Repurposing Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Blog Post → Social',
                  description: 'Convert long-form articles into engaging social media posts',
                  icon: Share2,
                  count: 24,
                  color: 'primary',
                },
                {
                  title: 'Webinar → Blog',
                  description: 'Transform webinar recordings into written content',
                  icon: FileText,
                  count: 12,
                  color: 'secondary',
                },
                {
                  title: 'Report → Infographic',
                  description: 'Visualize data reports as shareable infographics',
                  icon: TrendingUp,
                  count: 8,
                  color: 'success',
                },
              ].map((pipeline, index) => (
                <motion.div
                  key={pipeline.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <div className={cn('p-3 rounded-xl w-fit mb-4', pipeline.color === 'primary' && 'bg-primary/10', pipeline.color === 'secondary' && 'bg-secondary/10', pipeline.color === 'success' && 'bg-success/10')}>
                      <pipeline.icon className={cn('w-6 h-6', pipeline.color === 'primary' && 'text-primary', pipeline.color === 'secondary' && 'text-secondary', pipeline.color === 'success' && 'text-success')} />
                    </div>
                    <h3 className="font-semibold mb-2">{pipeline.title}</h3>
                    <p className="text-sm text-text-muted mb-4">{pipeline.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted">{pipeline.count} items queued</span>
                      <Button variant="outline" size="sm">
                        <Zap className="w-3 h-3 mr-1" />
                        Process
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* AI Suggestions */}
            <Card className="border border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">AI-Powered Suggestions</h2>
                  <p className="text-sm text-text-muted">Smart recommendations for content repurposing</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Lightbulb,
                    title: 'Thread Opportunity',
                    description: '"AI-Driven Decision Making" article has 3 key insights perfect for a Twitter thread.',
                    impact: 'High',
                    color: 'warning',
                  },
                  {
                    icon: Sparkles,
                    title: 'Video Potential',
                    description: '"Building Resilient Teams" is trending — consider converting to a short video.',
                    impact: 'Medium',
                    color: 'primary',
                  },
                  {
                    icon: Zap,
                    title: 'Carousel Content',
                    description: 'Financial Modelling guide has 5 steps ideal for an Instagram carousel.',
                    impact: 'High',
                    color: 'success',
                  },
                  {
                    icon: Share2,
                    title: 'Newsletter Feature',
                    description: 'Top 3 articles this month can be compiled into a digest newsletter.',
                    impact: 'Medium',
                    color: 'secondary',
                  },
                ].map((suggestion, index) => (
                  <motion.div
                    key={suggestion.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-surface-light border border-white/5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={cn('p-2 rounded-lg', suggestion.color === 'warning' && 'bg-warning/10', suggestion.color === 'primary' && 'bg-primary/10', suggestion.color === 'success' && 'bg-success/10', suggestion.color === 'secondary' && 'bg-secondary/10')}>
                        <suggestion.icon className={cn('w-4 h-4', suggestion.color === 'warning' && 'text-warning', suggestion.color === 'primary' && 'text-primary', suggestion.color === 'success' && 'text-success', suggestion.color === 'secondary' && 'text-secondary')} />
                      </div>
                      <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', suggestion.impact === 'High' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning')}>
                        {suggestion.impact} Impact
                      </span>
                    </div>
                    <h3 className="font-medium mb-2">{suggestion.title}</h3>
                    <p className="text-sm text-text-muted">{suggestion.description}</p>
                    <button className="mt-3 text-xs text-primary hover:text-primary-light transition-colors font-medium flex items-center gap-1">
                      Take Action
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Create Article', icon: Plus, color: 'primary' },
                { label: 'Add to KB', icon: BookOpen, color: 'secondary' },
                { label: 'View Analytics', icon: TrendingUp, color: 'success' },
              ].map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button className={cn(
                    'w-full p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-left group',
                    'bg-gradient-to-br from-surface to-surface-light'
                  )}>
                    <div className="flex items-center gap-3">
                      <div className={cn('p-2.5 rounded-xl transition-colors', action.color === 'primary' && 'bg-primary/10 group-hover:bg-primary/20', action.color === 'secondary' && 'bg-secondary/10 group-hover:bg-secondary/20', action.color === 'success' && 'bg-success/10 group-hover:bg-success/20')}>
                        <action.icon className={cn('w-5 h-5', action.color === 'primary' && 'text-primary', action.color === 'secondary' && 'text-secondary', action.color === 'success' && 'text-success')} />
                      </div>
                      <span className="font-medium">{action.label}</span>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
