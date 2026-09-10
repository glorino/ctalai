'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import {
  Rocket,
  HeartHandshake,
  Brain,
  Globe,
  Settings,
  Calculator,
  Users,
  Zap,
  Sparkles,
  ArrowRight,
  X,
  Activity,
  Shield,
  TrendingUp,
  Clock,
} from 'lucide-react'
import Navbar from '@/components/marketing/navbar'
import Footer from '@/components/marketing/footer'
import { cn } from '@/lib/utils'
import { AI_AGENTS, COLORS } from '@/lib/constants'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  HeartHandshake,
  Brain,
  Globe,
  Settings,
  Calculator,
  Users,
  Zap,
}

interface ConnectionLine {
  from: { x: number; y: number }
  to: { x: number; y: number }
  color: string
}

const CONNECTIONS: Array<[number, number]> = [
  [0, 1],
  [0, 4],
  [1, 2],
  [2, 3],
  [3, 6],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 0],
  [1, 5],
  [2, 4],
]

const AGENT_DETAILS: Record<string, { fullDescription: string; metrics: { label: string; value: string }[] }> = {
  growth: {
    fullDescription:
      'The Growth Agent orchestrates your entire marketing-to-sales pipeline. It scores leads in real-time, optimizes campaign spend across channels, forecasts revenue with machine learning accuracy, and tracks every conversion touchpoint to maximize ROI.',
    metrics: [
      { label: 'Lead Score Accuracy', value: '96%' },
      { label: 'Campaign ROI Boost', value: '+340%' },
      { label: 'Forecast Precision', value: '94%' },
      { label: 'Conversion Lift', value: '+67%' },
    ],
  },
  'customer-success': {
    fullDescription:
      'The Customer Success Agent proactively manages the entire customer lifecycle. It predicts churn before it happens, automates personalized onboarding journeys, routes support tickets intelligently, and maintains health scores for every account.',
    metrics: [
      { label: 'Churn Reduction', value: '-45%' },
      { label: 'NPS Improvement', value: '+32 pts' },
      { label: 'Resolution Time', value: '-60%' },
      { label: 'Retention Rate', value: '94%' },
    ],
  },
  learning: {
    fullDescription:
      'The Learning Agent transforms how you deliver education and training. It adapts content to individual learning styles, tracks engagement in real-time, recommends next-best content, and analyzes assessment results to continuously improve outcomes.',
    metrics: [
      { label: 'Completion Rate', value: '89%' },
      { label: 'Knowledge Retention', value: '+55%' },
      { label: 'Content Relevance', value: '92%' },
      { label: 'Time to Mastery', value: '-40%' },
    ],
  },
  community: {
    fullDescription:
      'The Community Agent powers your alumni and professional network. It matches skills to opportunities with precision, analyzes engagement patterns to prevent drift, and tracks referral chains to identify your most valuable connectors.',
    metrics: [
      { label: 'Match Accuracy', value: '91%' },
      { label: 'Engagement Rate', value: '78%' },
      { label: 'Referral Conversion', value: '34%' },
      { label: 'Network Growth', value: '+120%' },
    ],
  },
  operations: {
    fullDescription:
      'The Operations Agent is your digital COO. It prioritizes tasks based on impact and urgency, detects bottlenecks before they cause delays, optimizes resource allocation across teams, and ensures SOP compliance with automated audits.',
    metrics: [
      { label: 'Task Efficiency', value: '+75%' },
      { label: 'Bottleneck Detection', value: '99%' },
      { label: 'Resource Utilization', value: '88%' },
      { label: 'SOP Compliance', value: '97%' },
    ],
  },
  finance: {
    fullDescription:
      'The Finance Agent automates your financial operations end-to-end. It predicts cash flow 90 days ahead, automates invoice generation and follow-ups, detects anomalies in spending patterns, and optimizes budgets across departments.',
    metrics: [
      { label: 'Cash Flow Accuracy', value: '93%' },
      { label: 'Invoice Processing', value: '-80%' },
      { label: 'Anomaly Detection', value: '99.5%' },
      { label: 'Budget Savings', value: '22%' },
    ],
  },
  people: {
    fullDescription:
      'The People Agent streamlines your entire HR lifecycle. It screens CVs with AI precision, analyzes performance patterns to surface insights, balances workloads to prevent burnout, and optimizes leave scheduling for maximum coverage.',
    metrics: [
      { label: 'CV Screening Speed', value: '50x' },
      { label: 'Hire Quality', value: '+40%' },
      { label: 'Workload Balance', value: '92%' },
      { label: 'Retention Impact', value: '+28%' },
    ],
  },
  'ceo-intelligence': {
    fullDescription:
      'The CEO Intelligence Agent is your strategic command center. It generates executive summaries from raw data, provides decision support with scenario modeling, surfaces market trends before they become obvious, and delivers priority alerts that demand attention.',
    metrics: [
      { label: 'Decision Speed', value: '+60%' },
      { label: 'Insight Accuracy', value: '95%' },
      { label: 'Alert Relevance', value: '97%' },
      { label: 'Time Saved/Week', value: '15hrs' },
    ],
  },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const headerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

function ConnectionLines({ connections }: { connections: ConnectionLine[] }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {connections.map((conn, i) => (
        <motion.line
          key={i}
          x1={conn.from.x}
          y1={conn.from.y}
          x2={conn.to.x}
          y2={conn.to.y}
          stroke={conn.color}
          strokeWidth="1"
          strokeOpacity="0.12"
          initial={{ pathLength: 0, strokeOpacity: 0 }}
          animate={{ pathLength: 1, strokeOpacity: 0.12 }}
          transition={{ duration: 1.8, delay: i * 0.12, ease: 'easeInOut' }}
        />
      ))}
      {connections.map((conn, i) => (
        <motion.circle
          key={`dot-${i}`}
          r="2.5"
          fill={conn.color}
          initial={{ opacity: 0 }}
          animate={{
            cx: [conn.from.x, conn.to.x],
            cy: [conn.from.y, conn.to.y],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3.5,
            delay: i * 0.35 + 1.8,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  )
}

function AgentCard({
  agent,
  index,
  isSelected,
  onSelect,
}: {
  agent: (typeof AI_AGENTS)[number]
  index: number
  isSelected: boolean
  onSelect: () => void
}) {
  const Icon = iconMap[agent.icon]
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-150, 150], [6, -6])
  const rotateY = useTransform(mouseX, [-150, 150], [-6, 6])

  const details = AGENT_DETAILS[agent.id]

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  if (!Icon) return null

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className={cn(
        'relative group rounded-2xl bg-surface border p-6 cursor-pointer',
        'transition-all duration-300 overflow-hidden',
        isSelected
          ? 'border-opacity-60 z-10'
          : 'border-border hover:border-opacity-40'
      )}
      whileHover={{ scale: 1.04, y: -10 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${agent.color}18, transparent 70%)`,
        }}
      />

      {/* Floating particle */}
      <motion.div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${agent.color}, transparent 70%)` }}
        animate={{
          y: [0, -12, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="relative mb-5">
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center border"
            style={{
              backgroundColor: `${agent.color}15`,
              borderColor: `${agent.color}30`,
            }}
            whileHover={{ rotate: [0, -12, 12, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-7 h-7" style={{ color: agent.color }} />
          </motion.div>
          <motion.div
            className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"
            style={{ backgroundColor: `${agent.color}20` }}
          />
        </div>

        {/* Name */}
        <h3 className="text-foreground font-bold text-lg mb-2 group-hover:text-foreground transition-colors">
          {agent.name}
        </h3>

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed mb-4 group-hover:text-foreground/80 transition-colors duration-300">
          {agent.description}
        </p>

        {/* Capabilities */}
        <div className="flex flex-wrap gap-2">
          {agent.capabilities.map((cap) => (
            <span
              key={cap}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium border transition-all duration-300"
              style={{
                backgroundColor: `${agent.color}10`,
                borderColor: `${agent.color}20`,
                color: `${agent.color}cc`,
              }}
            >
              {cap}
            </span>
          ))}
        </div>

        {/* Expand indicator */}
        <motion.div
          className="absolute bottom-0 right-0 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: agent.color }}
        >
          <span>View Details</span>
          <ArrowRight className="w-3 h-3" />
        </motion.div>
      </div>

      {/* Bottom border glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, transparent, ${agent.color}60, transparent)`,
        }}
      />
    </motion.div>
  )
}

function AgentDetail({
  agent,
  onClose,
}: {
  agent: (typeof AI_AGENTS)[number]
  onClose: () => void
}) {
  const Icon = iconMap[agent.icon]
  const details = AGENT_DETAILS[agent.id]

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!Icon || !details) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.88, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.88, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl rounded-3xl bg-surface border border-border p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${agent.color}, transparent 60%)`,
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-text-muted hover:text-foreground hover:bg-surface-light transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <motion.div
              className="w-18 h-18 rounded-2xl flex items-center justify-center border shrink-0"
              style={{
                width: 72,
                height: 72,
                backgroundColor: `${agent.color}20`,
                borderColor: `${agent.color}40`,
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon className="w-9 h-9" style={{ color: agent.color }} />
            </motion.div>
            <div>
              <h3 className="text-foreground font-bold text-2xl mb-1">{agent.name}</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {details.fullDescription}
              </p>
            </div>
          </div>

          {/* Capabilities */}
          <div className="mb-8">
            <h4 className="text-text-muted text-sm font-semibold uppercase tracking-wider mb-4">
              Core Capabilities
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {agent.capabilities.map((cap, i) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 rounded-xl bg-background border border-border p-3"
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: agent.color }}
                  />
                  <span className="text-foreground text-sm font-medium">{cap}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mb-8">
            <h4 className="text-text-muted text-sm font-semibold uppercase tracking-wider mb-4">
              Performance Metrics
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {details.metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                  className="text-center rounded-xl bg-background border border-border p-4"
                >
                  <div
                    className="text-xl font-bold mb-1"
                    style={{ color: agent.color }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-text-muted text-xs leading-tight">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* System Stats */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Uptime', value: '99.97%', icon: Shield },
              { label: 'Avg Response', value: '<800ms', icon: Clock },
              { label: 'Tasks / Day', value: '12K+', icon: Activity },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.1 }}
                className="flex items-center gap-3 rounded-xl bg-background border border-border p-3"
              >
                <stat.icon
                  className="w-5 h-5 shrink-0"
                  style={{ color: agent.color }}
                />
                <div>
                  <div className="text-foreground font-bold text-sm">{stat.value}</div>
                  <div className="text-text-muted text-xs">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-xl py-3.5 font-semibold text-white transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${agent.color}, ${agent.color}aa)`,
              boxShadow: `0 4px 24px ${agent.color}40`,
            }}
          >
            Activate {agent.name}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<(typeof AI_AGENTS)[number] | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [connections, setConnections] = useState<ConnectionLine[]>([])

  useEffect(() => {
    function calculateConnections() {
      if (!gridRef.current) return
      const cards = gridRef.current.querySelectorAll('[data-agent-card]')
      if (cards.length === 0) return

      const newConnections: ConnectionLine[] = []
      CONNECTIONS.forEach(([fromIdx, toIdx]) => {
        const fromCard = cards[fromIdx]
        const toCard = cards[toIdx]
        if (!fromCard || !toCard) return

        const fromRect = fromCard.getBoundingClientRect()
        const toRect = toCard.getBoundingClientRect()
        const gridRect = gridRef.current!.getBoundingClientRect()

        newConnections.push({
          from: {
            x: fromRect.left + fromRect.width / 2 - gridRect.left,
            y: fromRect.top + fromRect.height / 2 - gridRect.top,
          },
          to: {
            x: toRect.left + toRect.width / 2 - gridRect.left,
            y: toRect.top + toRect.height / 2 - gridRect.top,
          },
          color: AI_AGENTS[fromIdx].color,
        })
      })

      setConnections(newConnections)
    }

    calculateConnections()
    window.addEventListener('resize', calculateConnections)
    return () => window.removeEventListener('resize', calculateConnections)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/12 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm text-primary-light backdrop-blur-md">
                <Sparkles className="w-4 h-4" />
                {AI_AGENTS.length} Specialized AI Agents
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-display">
              Your AI-Powered{' '}
              <span className="gradient-text">Dream Team</span>
            </h1>

            <p className="text-xl text-text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
              8 intelligent agents working 24/7 across every department.
              Each agent specializes in a critical business function, collaborating
              seamlessly to drive growth.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
              {[
                { icon: Activity, text: '99.97% Uptime' },
                { icon: Clock, text: '< 800ms Response' },
                { icon: Shield, text: 'Enterprise Security' },
                { icon: TrendingUp, text: 'Continuous Learning' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid with Connection Lines */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div ref={gridRef} className="relative">
            <ConnectionLines connections={connections} />

            <div
              className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {AI_AGENTS.map((agent, index) => (
                <div key={agent.id} data-agent-card>
                  <AgentCard
                    agent={agent}
                    index={index}
                    isSelected={selectedAgent?.id === agent.id}
                    onSelect={() => setSelectedAgent(agent)}
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="text-center mt-10 text-sm text-text-muted/60">
            Click any agent to explore capabilities and performance metrics
          </p>
        </div>
      </section>

      {/* How Agents Work Together */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display">
              Agents That <span className="gradient-text">Work Together</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg">
              Every agent shares context and intelligence across the platform,
              creating a unified operating system for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Shared Intelligence',
                description:
                  'Every agent learns from the same data pool. When the Growth Agent qualifies a lead, the Customer Success Agent already knows their history and preferences.',
                icon: Brain,
                color: COLORS.primary,
              },
              {
                title: 'Autonomous Workflows',
                description:
                  'Agents trigger actions across departments without human intervention. A payment from the Finance Agent automatically updates CRM, triggers onboarding, and schedules training.',
                icon: Zap,
                color: COLORS.secondary,
              },
              {
                title: 'Continuous Optimization',
                description:
                  'Machine learning models improve daily. Agents detect patterns, predict outcomes, and self-optimize their strategies based on real business results.',
                icon: TrendingUp,
                color: '#10b981',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-surface border border-border p-8 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border mb-6"
                  style={{
                    backgroundColor: `${item.color}15`,
                    borderColor: `${item.color}30`,
                  }}
                >
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <h3 className="text-foreground font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl bg-surface border border-border p-8 md:p-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { value: '8', label: 'AI Agents', color: COLORS.primary },
                { value: '32', label: 'Core Capabilities', color: COLORS.secondary },
                { value: '99.97%', label: 'Platform Uptime', color: '#10b981' },
                { value: '<800ms', label: 'Average Response', color: '#f59e0b' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8">
              <Rocket className="w-4 h-4" />
              Deploy your AI team today
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-display">
              Ready to Meet Your{' '}
              <span className="gradient-text">AI Team</span>?
            </h2>
            <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
              Deploy all {AI_AGENTS.length} agents in minutes. Watch them learn your business,
              connect your systems, and start delivering results from day one.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center justify-center gap-2"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/features"
                className="px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-surface transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Explore Features
                <Zap className="w-5 h-5" />
              </a>
            </div>

            <p className="text-sm text-text-muted mt-8">
              No credit card required · 14-day free trial · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Detail Modal */}
      {selectedAgent && (
        <AgentDetail
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </main>
  )
}
