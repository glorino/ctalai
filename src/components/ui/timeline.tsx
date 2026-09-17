import { cn } from '@/lib/utils'

interface TimelineItem {
  id: string
  title: string
  description?: string
  time?: string
  icon?: React.ReactNode
  status?: 'completed' | 'active' | 'pending' | 'error'
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export default function Timeline({ items, className }: TimelineProps) {
  const statusStyles = {
    completed: 'bg-emerald-500',
    active: 'bg-primary',
    pending: 'bg-gray-300',
    error: 'bg-red-500',
  }

  return (
    <div className={cn('relative', className)}>
      {items.map((item, i) => (
        <div key={item.id} className="flex gap-4 pb-6 last:pb-0">
          <div className="flex flex-col items-center">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
              statusStyles[item.status || 'pending']
            )}>
              {item.icon || (
                <span className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            {i < items.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
          </div>
          <div className="pt-1 min-w-0">
            <h4 className="text-sm font-medium">{item.title}</h4>
            {item.description && <p className="text-xs text-text-muted mt-0.5">{item.description}</p>}
            {item.time && <p className="text-xs text-text-muted mt-1">{item.time}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
