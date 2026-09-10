'use client'

import { useRef } from 'react'
import {
  LogIn,
  Scan,
  UserPlus,
  Heart,
  CreditCard,
  ClipboardCheck,
  Monitor,
  Users,
  MessageSquare,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CUSTOMER_JOURNEY, COLORS } from '@/lib/constants'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  LogIn,
  Scan,
  UserPlus,
  Heart,
  CreditCard,
  ClipboardCheck,
  Monitor,
  Users,
  MessageSquare,
  GraduationCap,
  Sparkles,
  TrendingUp,
}

function getStepColor(index: number, total: number) {
  const t = index / (total - 1)
  const primary = [52, 82, 255]
  const secondary = [255, 16, 83]
  const r = Math.round(primary[0] + (secondary[0] - primary[0]) * t)
  const g = Math.round(primary[1] + (secondary[1] - primary[1]) * t)
  const b = Math.round(primary[2] + (secondary[2] - primary[2]) * t)
  return `rgb(${r}, ${g}, ${b})`
}

function getStepGradient(index: number, total: number) {
  const t = index / (total - 1)
  const primary = [52, 82, 255]
  const secondary = [255, 16, 83]
  const r1 = Math.round(primary[0] + (secondary[0] - primary[0]) * Math.max(0, t - 0.15))
  const g1 = Math.round(primary[1] + (secondary[1] - primary[1]) * Math.max(0, t - 0.15))
  const b1 = Math.round(primary[2] + (secondary[2] - primary[2]) * Math.max(0, t - 0.15))
  const r2 = Math.round(primary[0] + (secondary[0] - primary[0]) * Math.min(1, t + 0.15))
  const g2 = Math.round(primary[1] + (secondary[1] - primary[1]) * Math.min(1, t + 0.15))
  const b2 = Math.round(primary[2] + (secondary[2] - primary[2]) * Math.min(1, t + 0.15))
  return `linear-gradient(135deg, rgb(${r1},${g1},${b1}), rgb(${r2},${g2},${b2}))`
}

interface JourneyStepProps {
  step: (typeof CUSTOMER_JOURNEY)[number]
  index: number
  total: number
}

function JourneyStep({ step, index, total }: JourneyStepProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isLeft = index % 2 === 0
  const Icon = iconMap[step.icon]
  const color = getStepColor(index, total)
  const gradient = getStepGradient(index, total)

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      {/* Desktop: alternating layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] w-full items-center">
        {/* Left card */}
        {isLeft ? (
          <div className="flex justify-end pr-4">
            <StepCard step={step} index={index} total={total} color={color} gradient={gradient} Icon={Icon!} side="left" />
          </div>
        ) : (
          <div />
        )}

        {/* Center dot & line */}
        <div className="flex flex-col items-center relative">
          <div className="relative z-10">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border-2 relative"
              style={{
                borderColor: color,
                background: `rgba(${index / total < 0.5 ? '52,82,255' : '255,16,83'},0.1)`,
              }}
            >
              <span className="text-sm font-bold" style={{ color }}>
                {String(step.step).padStart(2, '0')}
              </span>
              <div
                className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"
                style={{ background: color }}
              />
            </div>
            {index < total - 1 && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-20 origin-top"
                style={{
                  background: `linear-gradient(to bottom, ${color}, ${getStepColor(index + 1, total)})`,
                }}
              />
            )}
          </div>
        </div>

        {/* Right card */}
        {!isLeft ? (
          <div className="flex justify-start pl-4">
            <StepCard step={step} index={index} total={total} color={color} gradient={gradient} Icon={Icon!} side="right" />
          </div>
        ) : (
          <div />
        )}
      </div>

      {/* Mobile: stacked layout */}
      <div className="md:hidden flex items-start gap-4 w-full">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="relative z-10">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center border-2"
              style={{
                borderColor: color,
                background: `rgba(${index / total < 0.5 ? '52,82,255' : '255,16,83'},0.1)`,
              }}
            >
              <span className="text-xs font-bold" style={{ color }}>
                {String(step.step).padStart(2, '0')}
              </span>
            </div>
            {index < total - 1 && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-16 origin-top"
                style={{
                  background: `linear-gradient(to bottom, ${color}, ${getStepColor(index + 1, total)})`,
                }}
              />
            )}
          </div>
        </div>
        <div className="flex-1 pb-8">
          <StepCard step={step} index={index} total={total} color={color} gradient={gradient} Icon={Icon!} side="left" mobile />
        </div>
      </div>
    </div>
  )
}

interface StepCardProps {
  step: (typeof CUSTOMER_JOURNEY)[number]
  index: number
  total: number
  color: string
  gradient: string
  Icon: LucideIcon
  side: 'left' | 'right'
  mobile?: boolean
}

function StepCard({ step, index, total, color, gradient, Icon, side, mobile }: StepCardProps) {
  return (
    <div
      className={cn(
        'group relative rounded-2xl bg-surface border border-border p-6 cursor-pointer max-w-md w-full',
        'transition-all duration-300',
        'hover:border-primary/30 hover:scale-[1.03] hover:-translate-y-1',
        mobile && 'max-w-full',
      )}
      style={{
        boxShadow: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 40px ${color}15, 0 0 80px ${color}08`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Glow accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      {/* Step number badge */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center border relative"
          style={{
            background: `${color}15`,
            borderColor: `${color}30`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
          <div
            className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
            style={{ background: `${color}20` }}
          />
        </div>
        <span
          className="text-xs font-mono font-semibold tracking-wider"
          style={{ color: `${color}80` }}
        >
          Step {String(step.step).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-foreground font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
        {step.title}
      </h3>
      <p className="text-text-muted text-sm leading-relaxed">
        {step.description}
      </p>

      {/* Progress bar */}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${((index + 1) / total) * 100}%`,
              background: gradient,
            }}
          />
        </div>
        <span className="text-xs font-mono text-text-muted">
          {Math.round(((index + 1) / total) * 100)}%
        </span>
      </div>
    </div>
  )
}

export default function Journey() {
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
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text-muted shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              12-Step Automated Flow
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 font-[family-name:var(--font-space-grotesk)]">
            <span className="text-foreground">Your Automated </span>
            <span className="gradient-text">
              Customer Journey
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-text-muted leading-relaxed">
            From first touch to loyal advocate, AI guides every step
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="relative">
          {/* Scroll progress indicator */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border">
            <div
              className="w-full rounded-full origin-top"
              style={{
                height: '100%',
                background: `linear-gradient(to bottom, ${COLORS.primary}, ${COLORS.secondary})`,
              }}
            />
          </div>

          {/* Mobile progress indicator */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-border">
            <div
              className="w-full rounded-full origin-top"
              style={{
                height: '100%',
                background: `linear-gradient(to bottom, ${COLORS.primary}, ${COLORS.secondary})`,
              }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-6 md:gap-4">
            {CUSTOMER_JOURNEY.map((step, index) => (
              <JourneyStep
                key={step.step}
                step={step}
                index={index}
                total={CUSTOMER_JOURNEY.length}
              />
            ))}
          </div>
        </div>

        {/* Bottom summary */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-surface px-8 py-5 shadow-sm">
            <div className="flex items-center gap-1">
              {CUSTOMER_JOURNEY.map((_, i) => {
                const color = getStepColor(i, CUSTOMER_JOURNEY.length)
                return (
                  <div
                    key={i}
                    className="h-1.5 w-6 rounded-full"
                    style={{ background: color }}
                  />
                )
              })}
            </div>
            <span className="text-sm text-text-muted ml-2">
              Fully automated end-to-end
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
