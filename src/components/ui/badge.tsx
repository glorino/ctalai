import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
  size?: 'sm' | 'md'
  dot?: boolean
}

export default function Badge({ children, variant = 'neutral', size = 'sm', dot }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/8 text-primary',
    secondary: 'bg-secondary/8 text-secondary',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    error: 'bg-red-50 text-red-600',
    neutral: 'bg-surface-muted text-text-secondary',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  return (
    <span className={cn('inline-flex items-center gap-1.5 font-medium rounded-md', variants[variant], sizes[size])}>
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full', {
          'bg-primary': variant === 'primary',
          'bg-secondary': variant === 'secondary',
          'bg-emerald-500': variant === 'success',
          'bg-amber-500': variant === 'warning',
          'bg-red-500': variant === 'error',
          'bg-gray-400': variant === 'neutral',
        })} />
      )}
      {children}
    </span>
  )
}
