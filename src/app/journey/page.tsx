'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
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
  ArrowRight,
  Zap,
  Bot,
  Clock,
  Target,
  Check,
  ChevronDown,
} from 'lucide-react'
import Navbar from '@/components/marketing/navbar'
import Footer from '@/components/marketing/footer'
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

const STEP_DETAILS: Record<number, { longDescription: string; duration: string; agent: string }> = {
  1: {
    longDescription: 'A potential customer enters the CTAL ecosystem through any touchpoint — website, social media, referral, or event. AI immediately captures and catalogues the interaction.',
    duration: 'Instant',
    agent: 'Growth Agent',
  },
  2: {
    longDescription: 'AI analyses the lead across multiple data points, qualifies intent, assigns a score, and segments into the appropriate nurture track — all without human intervention.',
    duration: '< 30 seconds',
    agent: 'Growth Agent',
  },
  3: {
    longDescription: 'A comprehensive CRM profile is created or updated with enriched data including company info, engagement history, and predicted interests.',
    duration: 'Automatic',
    agent: 'Customer Success Agent',
  },
  4: {
    longDescription: 'AI delivers personalised content sequences, recommends the optimal next action, and identifies the best moment to convert — nurturing leads around the clock.',
    duration: 'Ongoing',
    agent: 'Growth Agent',
  },
  5: {
    longDescription: 'The customer completes registration and payment through a seamless checkout experience. Invoices, confirmations, and access are delivered automatically.',
    duration: '< 5 minutes',
    agent: 'Finance Agent',
  },
  6: {
    longDescription: 'Automated welcome sequences, form collection, and orientation workflows ensure every customer gets a consistent, professional onboarding experience.',
    duration: '1-3 days',
    agent: 'Customer Success Agent',
  },
  7: {
    longDescription: 'AI monitors engagement, completion rates, and satisfaction signals throughout the programme delivery, proactively flagging at-risk participants.',
    duration: 'Programme duration',
    agent: 'Learning Agent',
  },
  8: {
    longDescription: 'When AI detects situations requiring human judgement, it seamlessly escalates to the right team member with full context and recommended actions.',
    duration: 'As needed',
    agent: 'People Agent',
  },
  9: {
    longDescription: 'Post-interaction surveys, sentiment analysis, and NPS tracking feed directly into AI models that continuously improve the customer experience.',
    duration: 'Continuous',
    agent: 'CEO Intelligence Agent',
  },
  10: {
    longDescription: 'Customers graduate into an AI-powered alumni network with skill matching, opportunity recommendations, and community engagement features.',
    duration: 'Ongoing',
    agent: 'Community Agent',
  },
  11: {
    longDescription: 'AI analyses the customer journey and recommends the most relevant next programme, workshop, coaching session, or partnership opportunity.',
    duration: 'Automated',
    agent: 'CEO Intelligence Agent',
  },
  12: {
    longDescription: 'Satisfied customers return for new programmes, refer others, and evolve into partners — completing the growth flywheel that drives sustainable scaling.',
    duration: 'Ongoing',
    agent: 'Growth Agent',
  },
}

const BENEFITS = [
  {
    icon: Bot,
    title: 'AI-Native at Every Step',
    description: 'Every stage is powered by specialised AI agents working together to deliver seamless experiences.',
    color: COLORS.primary,
  },
  {
    icon: Clock,
    title: 'Zero Manual Handoffs',
    description: 'Automated transitions between stages eliminate delays and ensure no lead falls through the cracks.',
    color: COLORS.secondary,
  },
  {
    icon: Target,
    title: 'Predictive Intelligence',
    description: 'AI predicts customer needs before they arise, enabling proactive engagement and higher conversion.',
    color: '#10b981',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Optimization',
    description: 'Every interaction improves the system. AI learns from each customer to make the next one better.',
    color: '#f59e0b',
  },
]

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

const headerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

interface JourneyStepProps {
  step: (typeof CUSTOMER_JOURNEY)[number]
  index: number
  total: number
  expandedStep: number | null
  setExpandedStep: (step: number | null) => void
}

function JourneyStep({ step, index, total, expandedStep, setExpandedStep }: JourneyStepProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0
  const Icon = iconMap[step.icon]
  const color = getStepColor(index, total)
  const gradient = getStepGradient(index, total)
  const details = STEP_DETAILS[step.step]
  const isExpanded = expandedStep === step.step

  return (
    <div ref={ref} className="relative">
      {/* Desktop: alternating layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_100px_1fr] w-full items-center">
        {/* Left card */}
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-end pr-6"
          >
            <StepCard
              step={step}
              index={index}
              total={total}
              color={color}
              gradient={gradient}
              Icon={Icon!}
              side="left"
              details={details!}
              isExpanded={isExpanded}
              onToggle={() => setExpandedStep(isExpanded ? null : step.step)}
            />
          </motion.div>
        ) : (
          <div />
        )}

        {/* Center timeline node */}
        <div className="flex flex-col items-center relative">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center border-2 relative cursor-pointer group"
              style={{
                borderColor: color,
                background: `rgba(${index / total < 0.5 ? '52,82,255' : '255,16,83'},0.1)`,
              }}
              onClick={() => setExpandedStep(isExpanded ? null : step.step)}
            >
              <span className="text-sm font-bold" style={{ color }}>
                {String(step.step).padStart(2, '0')}
              </span>
              <div
                className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"
                style={{ background: color }}
              />
            </div>
            {index < total - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-24 origin-top"
                style={{
                  background: `linear-gradient(to bottom, ${color}, ${getStepColor(index + 1, total)})`,
                }}
              />
            )}
          </motion.div>
        </div>

        {/* Right card */}
        {!isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-start pl-6"
          >
            <StepCard
              step={step}
              index={index}
              total={total}
              color={color}
              gradient={gradient}
              Icon={Icon!}
              side="right"
              details={details!}
              isExpanded={isExpanded}
              onToggle={() => setExpandedStep(isExpanded ? null : step.step)}
            />
          </motion.div>
        ) : (
          <div />
        )}
      </div>

      {/* Mobile: stacked layout */}
      <div className="md:hidden flex items-start gap-4 w-full">
        <div className="flex flex-col items-center flex-shrink-0">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
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
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-16 origin-top"
                style={{
                  background: `linear-gradient(to bottom, ${color}, ${getStepColor(index + 1, total)})`,
                }}
              />
            )}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 pb-4"
        >
          <StepCard
            step={step}
            index={index}
            total={total}
            color={color}
            gradient={gradient}
            Icon={Icon!}
            side="left"
            details={details!}
            isExpanded={isExpanded}
            onToggle={() => setExpandedStep(isExpanded ? null : step.step)}
            mobile
          />
        </motion.div>
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
  details: { longDescription: string; duration: string; agent: string }
  isExpanded: boolean
  onToggle: () => void
  mobile?: boolean
}

function StepCard({ step, index, total, color, gradient, Icon, side, details, isExpanded, onToggle, mobile }: StepCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.3 },
      }}
      className={cn(
        'group relative rounded-2xl bg-surface border border-border cursor-pointer w-full',
        'transition-all duration-300',
        'hover:border-primary/30',
        mobile && 'max-w-full',
      )}
      style={{ boxShadow: 'none' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 40px ${color}15, 0 0 80px ${color}08`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
      }}
      onClick={onToggle}
    >
      {/* Glow accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border relative flex-shrink-0"
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
            <div>
              <h3 className="text-foreground font-semibold text-lg group-hover:text-foreground transition-colors">
                {step.title}
              </h3>
              <span
                className="text-xs font-mono font-semibold tracking-wider"
                style={{ color: `${color}80` }}
              >
                Step {String(step.step).padStart(2, '0')} of {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-text-muted group-hover:text-foreground/80 transition-colors"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed group-hover:text-text-muted transition-colors duration-300 mb-4">
          {step.description}
        </p>

        {/* Expanded details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-border">
                <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                  {details.longDescription}
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" style={{ color }} />
                    <span className="text-text-muted">Duration:</span>
                    <span className="text-foreground/80">{details.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5" style={{ color }} />
                    <span className="text-text-muted">Agent:</span>
                    <span className="text-foreground/80">{details.agent}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mt-4">
          <div className="flex-1 h-1 rounded-full bg-surface overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${((index + 1) / total) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{ background: gradient }}
            />
          </div>
          <span className="text-xs font-mono text-text-muted">
            {Math.round(((index + 1) / total) * 100)}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function JourneyPage() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  })
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm mb-6"
            >
              <Sparkles className="w-4 h-4" />
              12-Step Automated Flow
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
              Your{' '}
              <span className="bg-gradient-to-r from-primary via-[#7b8cff] to-secondary bg-clip-text text-transparent">
                Customer Journey
              </span>
            </h1>

            <p className="text-xl text-text-muted max-w-3xl mx-auto mb-10">
              From first touch to loyal advocate, AI guides every step.
              See how CTAL AI automates the entire customer lifecycle
              with specialised agents working in harmony.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-text-muted mb-8">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span>12 Stages</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span>8 AI Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span>Zero Manual Work</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center justify-center gap-2"
              >
                Start Your Journey
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
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section ref={timelineRef} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground/80">
                <Sparkles className="w-4 h-4 text-primary" />
                Interactive Timeline
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 font-[family-name:var(--font-space-grotesk)]"
            >
              <span className="text-foreground">The Complete </span>
              <span className="gradient-text">Automated Flow</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="max-w-2xl mx-auto text-lg text-text-muted leading-relaxed"
            >
              Click any step to reveal detailed information about what happens at each stage
              of the customer journey.
            </motion.p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Scroll progress indicator (desktop) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-surface">
              <motion.div
                className="w-full rounded-full origin-top"
                style={{
                  height: progressHeight,
                  background: `linear-gradient(to bottom, ${COLORS.primary}, ${COLORS.secondary})`,
                }}
              />
            </div>

            {/* Scroll progress indicator (mobile) */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-surface">
              <motion.div
                className="w-full rounded-full origin-top"
                style={{
                  height: progressHeight,
                  background: `linear-gradient(to bottom, ${COLORS.primary}, ${COLORS.secondary})`,
                }}
              />
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-4 md:gap-6">
              {CUSTOMER_JOURNEY.map((step, index) => (
                <JourneyStep
                  key={step.step}
                  step={step}
                  index={index}
                  total={CUSTOMER_JOURNEY.length}
                  expandedStep={expandedStep}
                  setExpandedStep={setExpandedStep}
                />
              ))}
            </div>
          </div>

          {/* Progress summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-surface shadow-sm px-8 py-5">
              <div className="flex items-center gap-1">
                {CUSTOMER_JOURNEY.map((_, i) => {
                  const color = getStepColor(i, CUSTOMER_JOURNEY.length)
                  return (
                    <motion.div
                      key={i}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
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
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Why This <span className="gradient-text">Journey</span> Works
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Every stage is designed to maximise engagement, conversion, and lifetime value
              through intelligent automation.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {BENEFITS.map((benefit, i) => {
              const BenefitIcon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group relative rounded-2xl bg-surface border border-border p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border"
                    style={{
                      background: `${benefit.color}12`,
                      borderColor: `${benefit.color}25`,
                    }}
                  >
                    <BenefitIcon className="w-6 h-6" style={{ color: benefit.color }} />
                  </div>
                  <h3 className="text-foreground font-semibold text-lg mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed group-hover:text-text-muted transition-colors duration-300">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-surface border border-border p-8 md:p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '12', label: 'Journey Steps' },
                { value: '8', label: 'AI Agents' },
                { value: '100%', label: 'Automated' },
                { value: '< 30s', label: 'Avg. Response' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
              Ready to <span className="gradient-text">Automate</span> Your Customer Journey?
            </h2>
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              Start using CTAL AI today. Connect your entire business with AI-powered
              workflows that guide every customer from first touch to loyal advocate.
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
                href="/pricing"
                className="px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-surface transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                View Pricing
                <Sparkles className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-text-muted mt-6">
              No credit card required · 14-day free trial · Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
