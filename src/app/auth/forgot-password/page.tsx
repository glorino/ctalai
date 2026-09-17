'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]">CTAL AI</span>
        </div>

        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Check your email</h2>
            <p className="text-sm text-text-muted mb-6">
              We&apos;ve sent a password reset link to your email address. Please check your inbox.
            </p>
            <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
              Didn&apos;t receive it? Try again
            </Button>
          </motion.div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-1">Forgot password?</h2>
            <p className="text-sm text-text-muted mb-8">
              Enter your email and we&apos;ll send you a reset link
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                placeholder="john@company.com"
                leftIcon={<Mail className="w-4 h-4" />}
              />
              <Button type="submit" isLoading={loading} className="w-full">
                Send Reset Link
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </>
        )}

        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-2 text-sm text-text-muted hover:text-foreground mt-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </motion.div>
    </div>
  )
}
