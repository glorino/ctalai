'use client'

import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/utils'

interface AvatarProps {
  src?: string | null
  alt?: string
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

export default function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  const initials = getInitials(name)

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name}
        className={cn('rounded-full object-cover', sizeClasses[size], className)}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold text-white',
        'bg-gradient-to-br from-primary to-primary-dark',
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  )
}

interface AvatarGroupProps {
  names: string[]
  max?: number
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export function AvatarGroup({ names, max = 3, size = 'sm' }: AvatarGroupProps) {
  const displayed = names.slice(0, max)
  const remaining = names.length - max

  return (
    <div className="flex items-center -space-x-2">
      {displayed.map((name, i) => (
        <Avatar
          key={i}
          name={name}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      {remaining > 0 && (
        <div className={cn(
          'rounded-full flex items-center justify-center font-medium bg-surface-muted text-text-secondary ring-2 ring-white',
          size === 'xs' ? 'w-6 h-6 text-[10px]' :
          size === 'sm' ? 'w-8 h-8 text-xs' :
          size === 'md' ? 'w-10 h-10 text-sm' :
          'w-12 h-12 text-base'
        )}>
          +{remaining}
        </div>
      )}
    </div>
  )
}
