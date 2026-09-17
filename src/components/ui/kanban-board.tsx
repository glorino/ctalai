'use client'

import { cn } from '@/lib/utils'

interface KanbanColumn {
  id: string
  title: string
  color?: string
  items: KanbanItem[]
}

interface KanbanItem {
  id: string
  title: string
  subtitle?: string
  meta?: React.ReactNode
  tags?: Array<{ label: string; color?: string }>
  render?: (item: KanbanItem) => React.ReactNode
}

interface KanbanBoardProps {
  columns: KanbanColumn[]
  onCardClick?: (item: KanbanItem) => void
}

export default function KanbanBoard({ columns, onCardClick }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((col) => (
        <div key={col.id} className="flex-shrink-0 w-72">
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className={cn('w-2 h-2 rounded-full', col.color || 'bg-gray-300')} />
            <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
            <span className="text-xs text-text-muted bg-surface-muted px-1.5 py-0.5 rounded-md">
              {col.items.length}
            </span>
          </div>
          <div className="space-y-2">
            {col.items.map((item) => (
              <div
                key={item.id}
                onClick={() => onCardClick?.(item)}
                className={cn(
                  'bg-surface border border-border rounded-xl p-3.5 cursor-pointer',
                  'transition-all duration-150',
                  'hover:border-primary/20 hover:shadow-sm'
                )}
              >
                {item.render ? item.render(item) : (
                  <>
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    {item.subtitle && <p className="text-xs text-text-muted mt-1">{item.subtitle}</p>}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className={cn('px-1.5 py-0.5 rounded text-[10px] font-medium', tag.color || 'bg-surface-muted text-text-muted')}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.meta && <div className="mt-2">{item.meta}</div>}
                  </>
                )}
              </div>
            ))}
            {col.items.length === 0 && (
              <div className="text-center py-8 text-xs text-text-muted">
                No items
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
