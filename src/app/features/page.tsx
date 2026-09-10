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
  ArrowRight,
  Check,
} from 'lucide-react'
import Navbar from '@/components/marketing/navbar'
import Footer from '@/components/marketing/footer'
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

const CATEGORY_INFO: Record<string, { label: string; description: string; color: string }> = {
  marketing: { label: 'Marketing', description: 'Automate lead capture, scoring, segmentation and qualification across all channels.', color: '#3452ff' },
  sales: { label: 'Sales', description: 'Pipeline management, automated follow-ups and opportunity detection to close more deals.', color: '#ff1053' },
  crm: { label: 'CRM', description: '360-degree customer profiles, onboarding workflows, and retention strategies.', color: '#10b981' },
  learning: { label: 'Learning', description: 'Training programme management, coaching, and curriculum development.', color: '#f59e0b' },
  support: { label: 'Support', description: 'Automated FAQ responses, ticketing and escalation workflows.', color: '#8b5cf6' },
  community: { label: 'Community', description: 'Alumni networks, opportunities and AI-powered skill matching.', color: '#ec4899' },
  analytics: { label: 'Analytics', description: 'Surveys, sentiment analysis, marketing analytics and performance monitoring.', color: '#06b6d4' },
  operations: { label: 'Operations', description: 'Content management, project management, SOPs and risk management.', color: '#a855f7' },
  finance: { label: 'Finance', description: 'Invoicing, payment tracking, revenue analytics and cash flow alerts.', color: '#14b8a6' },
  people: { label: 'People', description: 'Recruitment, onboarding, KPIs and performance tracking.', color: '#f43f5e' },
  intelligence: { label: 'Intelligence', description: 'Daily briefings, meeting prep and executive dashboards.', color: '#f97316' },
  growth: { label: 'Growth', description: 'Partner database, MoU tracking and performance reporting.', color: '#22c55e' },
}

const CATEGORIES_ORDER = ['marketing', 'sales', 'crm', 'learning', 'support', 'community', 'analytics', 'operations', 'finance', 'people', 'intelligence', 'growth']

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const groupedFeatures = CATEGORIES_ORDER.reduce(
    (acc, cat) => {
      const features = FEATURES.filter((f) => f.category === cat)
      if (features.length > 0) acc[cat] = features
      return acc
    },
    {} as Record<string, typeof FEATURES>
  )

  const visibleCategories = activeCategory
    ? { [activeCategory]: groupedFeatures[activeCategory] }
    : groupedFeatures

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[140px]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              {FEATURES.length} Automation Modules
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
              Every Feature Your{' '}
              <span className="gradient-text">Business Needs</span>
            </h1>

            <p className="text-xl text-text-muted max-w-3xl mx-auto mb-10">
              A complete AI-powered operating system covering every aspect of your business — from lead generation to financial reporting, all interconnected and automated.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span>22 Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span>8 AI Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span>Full Integration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                !activeCategory
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-muted hover:text-foreground border border-border'
              )}
            >
              All Features
            </button>
            {CATEGORIES_ORDER.map((cat) => {
              const info = CATEGORY_INFO[cat]
              if (!groupedFeatures[cat]) return null
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={cn(
                    'px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300',
                    activeCategory === cat
                      ? 'text-white shadow-sm'
                      : 'text-text-muted hover:text-foreground border border-border'
                  )}
                  style={activeCategory === cat ? { backgroundColor: info.color } : undefined}
                >
                  {info.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-20">
            {Object.entries(visibleCategories).map(([category, features]) => {
              const info = CATEGORY_INFO[category]
              if (!info) return null
              const Icon = iconMap[features[0]?.icon]

              return (
                <div key={category}>
                  {/* Category Header */}
                  <div className="mb-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${info.color}15`,
                          border: `1px solid ${info.color}30`,
                        }}
                      >
                        {Icon && <Icon className="w-7 h-7" style={{ color: info.color }} />}
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">
                          {info.label}
                        </h2>
                        <p className="text-text-muted text-sm">{info.description}</p>
                      </div>
                    </div>
                    <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${info.color}40, transparent)` }} />
                  </div>

                  {/* Feature Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((feature) => {
                      const FeatureIcon = iconMap[feature.icon]
                      return (
                        <div
                          key={feature.id}
                          className="group relative rounded-2xl bg-surface border border-border p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                          {/* Number badge */}
                          <div className="absolute top-4 right-4 text-xs font-mono text-text-muted/40">
                            {feature.number}
                          </div>

                          {/* Icon */}
                          <div className="relative mb-5">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{
                                backgroundColor: `${info.color}12`,
                                border: `1px solid ${info.color}25`,
                              }}
                            >
                              {FeatureIcon && <FeatureIcon className="w-6 h-6" style={{ color: info.color }} />}
                            </div>
                          </div>

                          {/* Content */}
                          <h3 className="text-foreground font-semibold text-lg mb-2">{feature.title}</h3>
                          <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl bg-surface border border-border p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '22', label: 'Automation Modules' },
                { value: '8', label: 'AI Agents' },
                { value: '12', label: 'Business Categories' },
                { value: '100%', label: 'Integrated' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-text-muted text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            Ready to <span className="gradient-text">Get Started</span>?
          </h2>
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            Start automating your business operations today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/pricing"
              className="px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-surface transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
