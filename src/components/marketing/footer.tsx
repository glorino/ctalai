'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'
import { COMPANY, SOCIAL_LINKS } from '@/lib/constants'

const footerLinks = {
  product: [
    { label: 'Features', href: '/#features' },
    { label: 'AI Agents', href: '/#agents' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ],
  platform: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'CRM', href: '/dashboard/crm' },
    { label: 'Programmes', href: '/dashboard/programs' },
    { label: 'AI Agents', href: '/dashboard/ai' },
  ],
  company: [
    { label: 'About', href: '/contact' },
    { label: 'Contact', href: '/contact' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Support', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/contact' },
    { label: 'Terms of Service', href: '/contact' },
  ],
}

const socialLinks = [
  { label: 'Twitter', href: SOCIAL_LINKS.twitter },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram },
  { label: 'YouTube', href: SOCIAL_LINKS.youtube },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)] text-foreground">
            Ready to Transform Your Business?
          </h3>
          <p className="text-text-muted mb-6 max-w-md mx-auto">
            Join hundreds of businesses already using CTAL AI to scale their operations.
          </p>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="input-field flex-1"
            />
            <button
              type="submit"
              className="btn-gradient px-6 py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Subscribed!
                </>
              ) : (
                <>
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-foreground">
                CTAL AI
              </span>
            </Link>
            <p className="text-text-muted text-sm mb-4">
              AI-powered operating system for business growth across Nigeria and Africa.
            </p>
            <div className="flex flex-col gap-2 text-sm text-text-muted">
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                {COMPANY.email}
              </a>
              <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                {COMPANY.phone}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Lagos, Nigeria
              </span>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 capitalize text-foreground">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-text-muted hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-foreground transition-colors text-sm"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
