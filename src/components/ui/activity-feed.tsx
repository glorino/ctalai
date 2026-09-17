import { cn } from '@/lib/utils'

interface Activity {
  id: string
  message: string
  time: string
  type?: 'default' | 'success' | 'warning' | 'error' | 'primary'
}

interface ActivityFeedProps {
  activities: Activity[]
  className?: string
}

export default function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const dotColors = {
    default: 'bg-gray-300',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    primary: 'bg-primary',
  }

  return (
    <div className={cn('space-y-0', className)}>
      {activities.map((activity, i) => (
        <div key={activity.id} className="flex items-start gap-3 py-3">
          <div className="flex flex-col items-center">
            <div className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', dotColors[activity.type || 'default'])} />
            {i < activities.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm leading-snug">{activity.message}</p>
            <p className="text-xs text-text-muted mt-0.5">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
