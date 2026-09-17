'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Filter {
  key: string
  label: string
  value: string
}

interface FilterPillsProps {
  filters: Filter[]
  onRemove: (key: string) => void
  onClearAll?: () => void
  className?: string
}

export default function FilterPills({ filters, onRemove, onClearAll, className }: FilterPillsProps) {
  if (filters.length === 0) return null

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      {filters.map((filter) => (
        <span
          key={filter.key}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/8 text-primary text-xs font-medium"
        >
          {filter.label}: {filter.value}
          <button onClick={() => onRemove(filter.key)} className="hover:bg-primary/15 rounded p-0.5">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      {filters.length > 1 && onClearAll && (
        <button
          onClick={onClearAll}
          className="text-xs text-text-muted hover:text-foreground underline"
        >
          Clear all
        </button>
      )}
    </div>
  )
}
