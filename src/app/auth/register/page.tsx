'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Building2, Sparkles } from 'lucide-react'
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'
import Select from '@/components/ui/select'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#1a237e]">
        <div className="absolute inset-0">
          <div className="absolute top-32 left-16 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-16 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 max-w-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">CTAL AI</span>
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Start Your<br />Transformation
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              Join hundreds of businesses using CTAL AI to automate operations and scale efficiently.
            </p>
            <div className="space-y-3">
              {['Free 14-day trial', 'No credit card required', 'Cancel anytime'].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80">
                  <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Register Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]">CTAL AI</span>
          </div>

          <h2 className="text-2xl font-bold mb-1">Create your account</h2>
          <p className="text-sm text-text-muted mb-8">Get started with CTAL AI in minutes</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="First name" placeholder="John" leftIcon={<User className="w-4 h-4" />} />
              <Input label="Last name" placeholder="Doe" />
            </div>
            <Input label="Work email" type="email" placeholder="john@company.com" leftIcon={<Mail className="w-4 h-4" />} />
            <Input label="Organisation" placeholder="Company name" leftIcon={<Building2 className="w-4 h-4" />} />
            <Select
              label="I am a"
              options={[
                { value: 'business-owner', label: 'Business Owner' },
                { value: 'operations', label: 'Operations Manager' },
                { value: 'training', label: 'Training Provider' },
                { value: 'consultant', label: 'Consultant' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Select your role"
            />
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-text-muted hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />
            <Button type="submit" isLoading={loading} className="w-full">
              Create Account
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-text-muted mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary hover:text-primary-dark font-medium">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
