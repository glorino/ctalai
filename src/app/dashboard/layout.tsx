'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Target,
  GraduationCap,
  Brain,
  Heart,
  DollarSign,
  Briefcase,
  FolderKanban,
  Headphones,
  Handshake,
  FileText,
  Bot,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Menu,
  X,
  TrendingUp,
  Megaphone,
  Zap,
  BookOpen,
  Award,
  ClipboardCheck,
  MessageSquare,
  UserPlus,
  UserCheck,
  CalendarDays,
  FileCheck,
  Shield,
  AlertTriangle,
  PieChart,
  HelpCircle,
  LogOut,
  ChevronDown,
  Command,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ToastProvider } from '@/components/ui/toast'

interface NavSection {
  label: string
  items: NavItem[]
}

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: number
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: 'OVERVIEW',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'GROWTH',
    items: [
      { label: 'Leads', href: '/dashboard/leads', icon: Target },
      { label: 'Marketing', href: '/dashboard/marketing', icon: Megaphone },
      { label: 'Campaigns', href: '/dashboard/campaigns', icon: Megaphone },
      { label: 'Sales Pipeline', href: '/dashboard/pipeline', icon: TrendingUp },
      { label: 'Opportunities', href: '/dashboard/opportunities', icon: Zap },
    ],
  },
  {
    label: 'CUSTOMERS',
    items: [
      { label: 'Customers', href: '/dashboard/crm', icon: Users },
      { label: 'CRM', href: '/dashboard/crm', icon: UserCheck },
      { label: 'Customer Success', href: '/dashboard/customer-success', icon: Heart },
      { label: 'Support', href: '/dashboard/support', icon: Headphones },
      { label: 'Onboarding', href: '/dashboard/onboarding', icon: ClipboardCheck },
    ],
  },
  {
    label: 'LEARNING',
    items: [
      { label: 'Programmes', href: '/dashboard/programs', icon: GraduationCap },
      { label: 'Cohorts', href: '/dashboard/cohorts', icon: Users },
      { label: 'Participants', href: '/dashboard/participants', icon: UserCheck },
      { label: 'Attendance', href: '/dashboard/attendance', icon: CalendarDays },
      { label: 'Assessments', href: '/dashboard/assessments', icon: Award },
    ],
  },
  {
    label: 'COACHING',
    items: [
      { label: 'Coaching', href: '/dashboard/coaching', icon: Brain },
      { label: 'Sessions', href: '/dashboard/sessions', icon: CalendarDays },
    ],
  },
  {
    label: 'COMMUNITY',
    items: [
      { label: 'Alumni', href: '/dashboard/alumni', icon: GraduationCap },
      { label: 'Community', href: '/dashboard/community', icon: Users },
      { label: 'Partners', href: '/dashboard/partners', icon: Handshake },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      { label: 'Finance', href: '/dashboard/finance', icon: DollarSign },
      { label: 'Invoices', href: '/dashboard/invoices', icon: FileText },
    ],
  },
  {
    label: 'PEOPLE',
    items: [
      { label: 'HR', href: '/dashboard/hr', icon: Briefcase },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { label: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
      { label: 'SOPs', href: '/dashboard/sops', icon: FileCheck },
      { label: 'Knowledge Base', href: '/dashboard/knowledge', icon: BookOpen },
    ],
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { label: 'AI Agents', href: '/dashboard/ai', icon: Bot },
      { label: 'AI Knowledge', href: '/dashboard/ai-knowledge', icon: Brain },
      { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
      { label: 'Content', href: '/dashboard/content', icon: FileText },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
]

const BOTTOM_NAV: NavItem[] = [
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  { label: 'Help', href: '/dashboard/help', icon: HelpCircle },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [layoutToast, setLayoutToast] = useState<string | null>(null)
  const [notifications, setNotifications] = useState([
    { title: 'New payment received', desc: '₦125,000 from Tech Corp', time: '2m ago', unread: true },
    { title: 'Lead requires follow-up', desc: 'High-value lead from webinar', time: '15m ago', unread: true },
    { title: 'Programme engagement dropped', desc: 'Advanced Valuation Cohort', time: '1h ago', unread: false },
    { title: 'AI agent escalated a customer', desc: 'Auto-escalation from Growth Agent', time: '2h ago', unread: false },
  ])
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const initial: Record<string, boolean> = {}
    NAV_SECTIONS.forEach((s) => { initial[s.label] = true })
    setExpandedSections(initial)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (layoutToast) {
      const t = setTimeout(() => setLayoutToast(null), 3000)
      return () => clearTimeout(t)
    }
  }, [layoutToast])

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const handleSearchShortcut = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setSearchOpen(true)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleSearchShortcut)
    return () => document.removeEventListener('keydown', handleSearchShortcut)
  }, [handleSearchShortcut])

  return (
    <ToastProvider>
      <div className="min-h-screen bg-surface-light flex">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            'hidden lg:flex flex-col bg-surface border-r border-border fixed h-full z-40 transition-all duration-300',
            collapsed ? 'w-[72px]' : 'w-[260px]'
          )}
        >
          {/* Logo */}
          <div className="h-14 flex items-center px-4 border-b border-border shrink-0">
            <Link href="/" className="flex items-center gap-2.5 min-w-0">
              <img src="/logo/Coreskills_logo.png" alt="CTAL AI" className="w-8 h-8 rounded-lg object-contain shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-base font-bold font-[family-name:var(--font-space-grotesk)] whitespace-nowrap overflow-hidden"
                  >
                    CTAL AI
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-3 px-2.5">
            {NAV_SECTIONS.map((section) => (
              <div key={section.label} className="mb-1">
                {!collapsed && (
                  <button
                    onClick={() => toggleSection(section.label)}
                    className="flex items-center justify-between w-full px-2.5 py-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider hover:text-foreground transition-colors"
                  >
                    {section.label}
                    <ChevronDown className={cn('w-3 h-3 transition-transform', expandedSections[section.label] ? '' : '-rotate-90')} />
                  </button>
                )}
                {collapsed && (
                  <div className="mx-auto my-2 w-4 h-px bg-border" />
                )}
                <AnimatePresence initial={false}>
                  {(expandedSections[section.label] !== false || collapsed) && (
                    <motion.div
                      initial={collapsed ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={collapsed ? undefined : { height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-0.5">
                        {section.items.map((item) => {
                          const Icon = item.icon
                          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href + '/'))

                          return (
                            <Link
                              key={item.href + item.label}
                              href={item.href}
                              className={cn(
                                'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 group relative',
                                isActive
                                  ? 'bg-primary/8 text-primary font-medium'
                                  : 'text-text-muted hover:text-foreground hover:bg-surface-muted'
                              )}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="activeNav"
                                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full"
                                />
                              )}
                              <Icon className="w-[18px] h-[18px] shrink-0" />
                              <AnimatePresence>
                                {!collapsed && (
                                  <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="whitespace-nowrap overflow-hidden"
                                  >
                                    {item.label}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                              {item.badge && !collapsed && (
                                <span className="ml-auto text-[10px] font-semibold bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-md">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Collapse Toggle */}
          <div className="p-2.5 border-t border-border shrink-0">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center gap-2 px-2.5 py-2 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-muted transition-all duration-150"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-xs">Collapse</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed left-0 top-0 bottom-0 w-[260px] bg-surface border-r border-border z-50 lg:hidden flex flex-col"
              >
                <div className="h-14 flex items-center justify-between px-4 border-b border-border shrink-0">
                  <Link href="/" className="flex items-center gap-2.5">
                    <img src="/logo/Coreskills_logo.png" alt="CTAL AI" className="w-8 h-8 rounded-lg object-contain" />
                    <span className="text-base font-bold font-[family-name:var(--font-space-grotesk)]">CTAL AI</span>
                  </Link>
                  <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-text-muted hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto py-3 px-2.5">
                  {NAV_SECTIONS.map((section) => (
                    <div key={section.label} className="mb-1">
                      <div className="px-2.5 py-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                        {section.label}
                      </div>
                      <div className="space-y-0.5">
                        {section.items.map((item) => {
                          const Icon = item.icon
                          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href + '/'))
                          return (
                            <Link
                              key={item.href + item.label}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className={cn(
                                'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150',
                                isActive ? 'bg-primary/8 text-primary font-medium' : 'text-text-muted hover:text-foreground hover:bg-surface-muted'
                              )}
                            >
                              <Icon className="w-[18px] h-[18px] shrink-0" />
                              <span>{item.label}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className={cn('flex-1 transition-all duration-300', collapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]')}>
          {/* Top Header */}
          <header className="h-14 bg-surface border-b border-border sticky top-0 z-30 shrink-0">
            <div className="h-full flex items-center justify-between px-4 lg:px-6">
              <div className="flex items-center gap-3">
                <button onClick={() => setMobileOpen(true)} className="lg:hidden p-1.5 rounded-lg text-text-muted hover:text-foreground">
                  <Menu className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hidden md:flex items-center gap-2 bg-surface-muted border border-border rounded-lg px-3 py-1.5 text-sm text-text-muted hover:border-primary/20 transition-colors w-64"
                >
                  <Search className="w-4 h-4" />
                  <span>Search...</span>
                  <kbd className="ml-auto text-[10px] font-mono bg-surface px-1.5 py-0.5 rounded border border-border">
                    <Command className="w-2.5 h-2.5 inline" />K
                  </kbd>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-muted transition-colors"
                  >
                    <Bell className="w-[18px] h-[18px]" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
                  </button>

                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -4 }}
                        className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-xl shadow-lg z-50 overflow-hidden"
                      >
                        <div className="p-3 border-b border-border flex items-center justify-between">
                          <h3 className="text-sm font-semibold">Notifications</h3>
                           <button className="text-xs text-primary hover:text-primary-dark" onClick={() => { setNotifications(prev => prev.map(n => ({ ...n, unread: false }))); setLayoutToast('All notifications marked as read') }}>Mark all read</button>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.map((n, i) => (
                            <div key={i} onClick={() => { setNotifications(prev => prev.map((item, idx) => idx === i ? { ...item, unread: false } : item)); router.push('/dashboard/notifications'); setNotificationsOpen(false) }} className={cn('p-3 border-b border-border-light hover:bg-surface-light transition-colors cursor-pointer', n.unread && 'bg-primary/[0.02]')}>
                              <div className="flex items-start gap-2">
                                {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />}
                                <div className={cn(!n.unread && 'ml-3.5')}>
                                  <p className="text-sm font-medium">{n.title}</p>
                                  <p className="text-xs text-text-muted mt-0.5">{n.desc}</p>
                                  <p className="text-[11px] text-text-muted mt-1">{n.time}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-2 border-t border-border">
                          <Link href="/dashboard/notifications" className="block text-center text-xs text-primary hover:text-primary-dark py-1.5">
                            View all notifications
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-2.5 pl-2 ml-1 border-l border-border">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">JD</span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium leading-tight">John Doe</p>
                    <p className="text-[11px] text-text-muted">Super Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-4 lg:p-6">{children}</main>
        </div>

        {/* Search Modal */}
        <AnimatePresence>
          {searchOpen && (
            <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setSearchOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                className="relative w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                  <Search className="w-5 h-5 text-text-muted shrink-0" />
                  <input
                    type="text"
                    placeholder="Search customers, programmes, invoices..."
                    className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-text-muted"
                    autoFocus
                  />
                  <kbd className="text-[10px] font-mono bg-surface-muted px-1.5 py-0.5 rounded border border-border text-text-muted">ESC</kbd>
                </div>
                <div className="p-2 max-h-80 overflow-y-auto">
                  <p className="px-3 py-2 text-[11px] font-medium text-text-muted uppercase">Recent</p>
                  {[
                    { label: 'Customer: Adebayo Tech Corp', href: '/dashboard/crm' },
                    { label: 'Programme: Advanced Valuation', href: '/dashboard/programs' },
                    { label: 'Invoice: CTAL-2408-0042', href: '/dashboard/finance' },
                  ].map((item, i) => (
                    <button key={i} onClick={() => { router.push(item.href); setSearchOpen(false) }} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-surface-muted transition-colors flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-text-muted" />
                      {item.label}
                    </button>
                  ))}
                  <p className="px-3 py-2 text-[11px] font-medium text-text-muted uppercase mt-2">Quick Actions</p>
                  {[
                    { label: 'Add new customer', href: '/dashboard/crm' },
                    { label: 'Create invoice', href: '/dashboard/finance' },
                    { label: 'Schedule coaching session', href: '/dashboard/coaching' },
                  ].map((item, i) => (
                    <button key={i} onClick={() => { router.push(item.href); setSearchOpen(false) }} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-surface-muted transition-colors flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-primary" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {layoutToast && (
        <div className="fixed bottom-4 right-4 z-[100] px-4 py-3 rounded-xl bg-surface border border-border shadow-lg text-sm flex items-center gap-2 pointer-events-none">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          {layoutToast}
        </div>
      )}
    </ToastProvider>
  )
}
