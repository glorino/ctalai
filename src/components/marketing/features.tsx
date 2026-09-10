'use client'

import { useState } from 'react'
import {
  Megaphone,
  TrendingUp,
  Users,
  UserPlus,
  GraduationCap,
  Headphones,
  Target,
  Heart,
  RefreshCw,
  MessageSquare,
  FileText,
  BookOpen,
  DollarSign,
  Briefcase,
  FolderKanban,
  Crown,
  BarChart3,
  Handshake,
  FileCheck,
  PieChart,
  AlertTriangle,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { FEATURES } from '@/lib/constants'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Megaphone,
  TrendingUp,
  Users,
  UserPlus,
  GraduationCap,
  Headphones,
  Target,
  Heart,
  RefreshCw,
  MessageSquare,
  FileText,
  BookOpen,
  DollarSign,
  Briefcase,
  FolderKanban,
  Crown,
  BarChart3,
  Handshake,
  FileCheck,
  PieChart,
  AlertTriangle,
}

const CATEGORY_MAP: Record<string, string[]> = {
  all: [],
  marketing: ['marketing', 'growth'],
  sales: ['sales'],
  operations: ['operations', 'finance', 'people', 'intelligence'],
  learning: ['learning', 'crm', 'support', 'community'],
  analytics: ['analytics'],
}

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'sales', label: 'Sales' },
  { id: 'operations', label: 'Operations' },
  { id: 'learning', label: 'Learning' },
  { id: 'analytics', label: 'Analytics' },
]

export default function Features() {
  const [activeTab, setActiveTab] = useState('all')

  const filteredFeatures =
    activeTab === 'all'
      ? FEATURES
      : FEATURES.filter((f) =>
          CATEGORY_MAP[activeTab]?.includes(f.category)
        )

  return (
    <section className="py-24 sm:py-32 bg-surface-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-muted shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              22 Automation Modules
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 font-[family-name:var(--font-space-grotesk)]">
            <span className="text-foreground">Everything You Need to </span>
            <span className="gradient-text">Scale</span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-text-muted leading-relaxed">
            A complete AI-powered operating system covering every aspect of your business — from lead generation to financial reporting.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-foreground hover:bg-surface border border-border'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFeatures.map((feature) => {
            const Icon = iconMap[feature.icon]
            if (!Icon) return null

            return (
              <div
                key={feature.id}
                className="feature-card group cursor-pointer"
              >
                {/* Number badge */}
                <div className="absolute top-4 right-4 text-xs font-mono text-text-muted/40 group-hover:text-primary/60 transition-colors duration-300">
                  {feature.number}
                </div>

                {/* Icon */}
                <div className="relative mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-foreground font-semibold text-base mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Count indicator */}
        <div className="text-center mt-12">
          <p className="text-sm text-text-muted">
            Showing{' '}
            <span className="text-primary font-medium">{filteredFeatures.length}</span> of{' '}
            <span className="text-foreground">{FEATURES.length}</span> automation modules
          </p>
        </div>
      </div>
    </section>
  )
}
