'use client'

import { useState, useRef, useEffect } from 'react'
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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { AI_AGENTS } from '@/lib/constants'
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

function ConnectionLines({ connections }: { connections: ConnectionLine[] }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {connections.map((conn, i) => (
        <line
          key={i}
          x1={conn.from.x}
          y1={conn.from.y}
          x2={conn.to.x}
          y2={conn.to.y}
          stroke={conn.color}
          strokeWidth="1"
          strokeOpacity="0.15"
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

  if (!Icon) return null

  return (
    <div
      onClick={onSelect}
      className={cn(
        'relative group rounded-2xl bg-surface border border-border p-6 cursor-pointer',
        'transition-all duration-300 overflow-hidden hover:scale-[1.03] hover:-translate-y-2 active:scale-[0.98]',
        isSelected
          ? 'border-primary/60 z-10 shadow-lg'
          : 'hover:border-primary/30'
      )}
    >
      {/* Glow background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${agent.color}15, transparent 70%)`,
        }}
      />

      {/* Floating particle */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${agent.color}, transparent 70%)` }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="relative mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:rotate-0"
            style={{
              backgroundColor: `${agent.color}15`,
              borderColor: `${agent.color}30`,
            }}
          >
            <Icon className="w-7 h-7" style={{ color: agent.color }} />
          </div>
          <div
            className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"
            style={{ backgroundColor: `${agent.color}20` }}
          />
        </div>

        {/* Name */}
        <h3 className="text-foreground font-bold text-lg mb-2 group-hover:text-primary transition-colors">
          {agent.name}
        </h3>

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed mb-4">
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
        <div
          className="absolute bottom-0 right-0 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: agent.color }}
        >
          <span>Details</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>

      {/* Bottom border glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, transparent, ${agent.color}60, transparent)`,
        }}
      />
    </div>
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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!Icon) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-3xl bg-surface border border-border p-8 overflow-hidden shadow-xl"
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
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-text-muted hover:text-foreground hover:bg-surface transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center border shrink-0"
              style={{
                backgroundColor: `${agent.color}20`,
                borderColor: `${agent.color}40`,
              }}
            >
              <Icon className="w-8 h-8" style={{ color: agent.color }} />
            </div>
            <div>
              <h3 className="text-foreground font-bold text-2xl mb-1">{agent.name}</h3>
              <p className="text-text-muted text-sm">{agent.description}</p>
            </div>
          </div>

          {/* Capabilities */}
          <div className="mb-6">
            <h4 className="text-text-muted text-sm font-semibold uppercase tracking-wider mb-3">
              Core Capabilities
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {agent.capabilities.map((cap, i) => (
                <div
                  key={cap}
                  className="flex items-center gap-3 rounded-xl bg-background border border-border p-3"
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: agent.color }}
                  />
                  <span className="text-foreground text-sm font-medium">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Uptime', value: '99.9%' },
              { label: 'Avg Response', value: '<1s' },
              { label: 'Tasks/Day', value: '10K+' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="text-center rounded-xl bg-background border border-border p-3"
              >
                <div className="text-foreground font-bold text-lg">{stat.value}</div>
                <div className="text-text-muted text-xs">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            className="mt-6 w-full rounded-xl py-3 font-semibold text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${agent.color}, ${agent.color}aa)`,
              boxShadow: `0 4px 20px ${agent.color}40`,
            }}
          >
            Activate {agent.name}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Agents() {
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
    <section className="relative py-24 sm:py-32 overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/3 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-secondary/3 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-muted shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              8 AI Agents
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 font-[family-name:var(--font-space-grotesk)]">
            <span className="text-foreground">Meet Your </span>
            <span className="gradient-text">
              AI Team
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-text-muted leading-relaxed">
            8 specialized agents working 24/7 to grow your business
          </p>
        </div>

        {/* Agents Grid with Connection Lines */}
        <div ref={gridRef} className="relative">
          <ConnectionLines connections={connections} />

          <div
            className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
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

        {/* Footer note */}
        <div className="text-center mt-12">
          <p className="text-sm text-white/30">
            Click any agent to view details and activate
          </p>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAgent && (
        <AgentDetail
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </section>
  )
}
