'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIInsightProps {
  title?: string
  children: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export default function AIInsight({ title = 'AI Insight', children, actions, className }: AIInsightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/[0.03] to-secondary/[0.02] p-6 overflow-hidden',
        className
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-secondary">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider gradient-text">{title}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ai-pulse ml-1" />
        </div>
        <div className="text-sm text-text-secondary leading-relaxed">{children}</div>
        {actions && <div className="mt-3 flex items-center gap-2">{actions}</div>}
      </div>
    </motion.div>
  )
}
