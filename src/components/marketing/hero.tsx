'use client'

import { ArrowRight, Play, Sparkles, Zap, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const stats = [
  { value: '500+', label: 'Businesses', icon: Sparkles },
  { value: '10x', label: 'Growth', icon: Zap },
  { value: '24/7', label: 'AI Support', icon: Shield },
]

const headlineWords = 'AI-Powered Operating System for Growth'.split(' ')

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--background)',
      }}
    >
      {/* Gradient background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, var(--background), var(--surface-light), var(--background))' }} />
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 800, height: 800, borderRadius: '50%', background: 'rgba(52,82,255,0.03)', filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 600, height: 600, borderRadius: '50%', background: 'rgba(255,16,83,0.03)', filter: 'blur(100px)' }} />
      </div>

      {/* Grid overlay */}
      <div className="grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '128px 24px 80px', textAlign: 'center', width: '100%' }}>
        {/* Badge */}
        <div style={{ marginBottom: 32 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 9999, border: '1px solid var(--border)', background: 'var(--surface)', padding: '8px 16px', fontSize: 14, color: 'var(--text-muted)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
              <span style={{ position: 'absolute', display: 'inline-flex', width: '100%', height: '100%', borderRadius: '50%', background: 'var(--primary)', opacity: 0.75, animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite' }} />
              <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} />
            </span>
            Powered by Next-Gen AI
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 32, fontFamily: 'var(--font-space-grotesk)' }}>
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className={cn(
                'mr-3 sm:mr-4',
                i === headlineWords.length - 1
                  ? 'gradient-text'
                  : 'text-foreground'
              )}
              style={{ display: 'inline-block' }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p style={{ maxWidth: 640, margin: '0 auto 48px', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Transform from founder-dependent to system-driven. Automate marketing,
          sales, CRM, learning, and operations into one scalable ecosystem.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 80 }}>
          <a
            href="/contact"
            className="btn-gradient"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 12, padding: '16px 32px', color: '#fff', fontWeight: 600, fontSize: 18, textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(52,82,255,0.2)' }}
          >
            Get Started
            <ArrowRight style={{ width: 20, height: 20 }} />
          </a>

          <a
            href="/dashboard"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, borderRadius: 12, padding: '16px 32px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--foreground)', fontWeight: 600, fontSize: 18, textDecoration: 'none', transition: 'all 0.3s' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: 'rgba(52,82,255,0.1)' }}>
              <Play style={{ width: 14, height: 14, fill: 'var(--primary)', color: 'var(--primary)' }} />
            </div>
            Watch Demo
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 32px', borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 8, background: 'rgba(52,82,255,0.1)', border: '1px solid rgba(52,82,255,0.2)' }}>
                <stat.icon style={{ width: 20, height: 20, color: 'var(--primary)' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--foreground)' }}>{stat.value}</div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 128, background: 'linear-gradient(to top, var(--surface-light), transparent)' }} />
    </section>
  )
}
