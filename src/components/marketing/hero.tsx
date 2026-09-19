'use client'

import Link from 'next/link'
import { ArrowRight, Play, Sparkles, Zap, Shield, BarChart3 } from 'lucide-react'
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
      {/* Animated gradient background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <div
          className="animate-gradient-shift"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--background) 0%, rgba(52,82,255,0.04) 25%, var(--surface-light) 50%, rgba(255,16,83,0.04) 75%, var(--background) 100%)',
            backgroundSize: '400% 400%',
          }}
        />
        <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 1000, height: 1000, borderRadius: '50%', background: 'rgba(52,82,255,0.05)', filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', bottom: -100, right: -100, width: 700, height: 700, borderRadius: '50%', background: 'rgba(255,16,83,0.04)', filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', top: '40%', left: -200, width: 500, height: 500, borderRadius: '50%', background: 'rgba(52,82,255,0.03)', filter: 'blur(80px)' }} />
      </div>

      {/* Grid overlay */}
      <div className="grid-pattern animate-fade-in-scale" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '128px 24px 80px', textAlign: 'center', width: '100%' }}>
        {/* Badge */}
        <div className="animate-fade-in-up" style={{ marginBottom: 32 }}>
          <span
            className="badge-gradient-border shimmer-border"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              borderRadius: 9999,
              padding: '8px 18px',
              fontSize: 14,
              color: 'var(--text-muted)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
              <span style={{ position: 'absolute', display: 'inline-flex', width: '100%', height: '100%', borderRadius: '50%', background: 'var(--primary)', opacity: 0.75, animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite' }} />
              <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} />
            </span>
            Powered by Next-Gen AI
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up-delay-1"
          style={{ fontSize: 'clamp(2.75rem, 6vw, 5.25rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 32, fontFamily: 'var(--font-space-grotesk)' }}
        >
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
        <p
          className="animate-fade-in-up-delay-2"
          style={{ maxWidth: 640, margin: '0 auto 48px', fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', color: 'var(--text-muted)', lineHeight: 1.75 }}
        >
          Transform from founder-dependent to system-driven. Automate marketing,
          sales, CRM, learning, and operations into one scalable ecosystem.
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in-up-delay-3"
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 80 }}
        >
          <Link
            href="/contact"
            className="btn-gradient"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 14, padding: '16px 36px', color: '#fff', fontWeight: 600, fontSize: 18, textDecoration: 'none', boxShadow: '0 10px 20px -3px rgba(52,82,255,0.25)' }}
          >
            Get Started
            <ArrowRight style={{ width: 20, height: 20 }} />
          </Link>

          <Link
            href="/dashboard"
            className="group"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, borderRadius: 14, padding: '16px 36px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--foreground)', fontWeight: 600, fontSize: 18, textDecoration: 'none', transition: 'all 0.3s' }}
          >
            <div className="group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: 'rgba(52,82,255,0.1)' }}>
              <Play style={{ width: 14, height: 14, fill: 'var(--primary)', color: 'var(--primary)' }} />
            </div>
            Watch Demo
          </Link>
        </div>

        {/* Stats */}
        <div
          className="animate-fade-in-up-delay-4"
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 24 }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group"
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 32px', borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none', transition: 'all 0.3s' }}
            >
              <div className="group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 10, background: 'rgba(52,82,255,0.1)', border: '1px solid rgba(52,82,255,0.2)' }}>
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

      {/* Floating dashboard preview mockup */}
      <div
        className="hidden lg:block animate-float"
        style={{
          position: 'absolute',
          right: 80,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 280,
          height: 200,
          borderRadius: 16,
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(52,82,255,0.15)',
          boxShadow: '0 20px 60px rgba(52,82,255,0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
          padding: 20,
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
        </div>
        <div style={{ height: 8, width: '70%', borderRadius: 4, background: 'linear-gradient(90deg, rgba(52,82,255,0.3), rgba(255,16,83,0.3))', marginBottom: 10 }} />
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {[40, 65, 50, 80, 45, 70, 55].map((h, i) => (
            <div key={i} style={{ flex: 1, height: h, borderRadius: 4, background: `linear-gradient(to top, rgba(52,82,255,0.2), rgba(52,82,255,${0.05 + i * 0.03}))` }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(52,82,255,0.1)' }} />
          <div style={{ width: 60, height: 6, borderRadius: 3, background: 'rgba(16,185,129,0.2)' }} />
        </div>
        {/* Glow effect */}
        <div style={{ position: 'absolute', bottom: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(52,82,255,0.08)', filter: 'blur(30px)' }} />
      </div>

      {/* Bottom gradient fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 128, background: 'linear-gradient(to top, var(--surface-light), transparent)' }} />
    </section>
  )
}
