'use client'

import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

export default function Card({ children, className, padding = 'md', hover = false }: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={cn(
        'card bg-surface border border-border rounded-2xl',
        paddings[padding],
        hover && 'card-hover cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  description?: string
  className?: string
}

export function StatCard({ title, value, change, changeType = 'neutral', icon, description, className }: StatCardProps) {
  return (
    <div className={cn('card bg-surface border border-border rounded-2xl p-5', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1.5 min-w-0">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {(change || description) && (
            <div className="flex items-center gap-2">
              {change && (
                <span className={cn('text-xs font-medium', {
                  'text-emerald-600': changeType === 'up',
                  'text-red-500': changeType === 'down',
                  'text-text-muted': changeType === 'neutral',
                })}>
                  {changeType === 'up' && '↑'}{changeType === 'down' && '↓'}{change}
                </span>
              )}
              {description && (
                <span className="text-xs text-text-muted">{description}</span>
              )}
            </div>
          )}
        </div>
        <div className="p-2.5 rounded-xl bg-primary/8 shrink-0">
          <div className="text-primary">{icon}</div>
        </div>
      </div>
    </div>
  )
}

interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
  breadcrumbs?: Array<{ label: string; href?: string }>
}

export function PageHeader({ title, description, actions, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="space-y-1">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="flex items-center gap-1.5 text-sm text-text-muted">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-border">/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-foreground transition-colors">{crumb.label}</a>
              ) : (
                <span className="text-foreground">{crumb.label}</span>
              )}
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-sm text-text-muted mt-1">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>
    </div>
  )
}
