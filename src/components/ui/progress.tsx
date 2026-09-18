'use client'

import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  showLabel?: boolean
  className?: string
}

export default function Progress({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel,
  className,
}: ProgressProps) {
  const pct = Math.min(Math.round((value / max) * 100), 100)

  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }

  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
  }

  return (
    <div className={cn('space-y-1', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs">
          <span className="text-text-muted">{value} of {max}</span>
          <span className="font-medium">{pct}%</span>
        </div>
      )}
      <div className={cn('w-full rounded-full bg-surface-muted', heights[size])}>
        <div
          className={cn('rounded-full transition-all duration-500 ease-out', heights[size], colors[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
