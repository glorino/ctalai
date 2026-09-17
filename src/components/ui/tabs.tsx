'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  count?: number
}

interface TabsProps {
  tabs: Tab[]
  activeTab?: string
  onChange: (id: string) => void
  className?: string
}

export default function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  const [active, setActive] = useState(activeTab || tabs[0]?.id)

  const handleChange = (id: string) => {
    setActive(id)
    onChange(id)
  }

  return (
    <div className={cn('border-b border-border', className)}>
      <div className="flex gap-0 overflow-x-auto -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
              active === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:text-foreground hover:border-border'
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                'ml-2 px-1.5 py-0.5 rounded-md text-xs',
                active === tab.id ? 'bg-primary/10 text-primary' : 'bg-surface-muted text-text-muted'
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
