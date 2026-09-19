'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { NAVIGATION } from '@/lib/constants'
import Button from '@/components/ui/button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo/Coreskills_logo.png" alt="CTAL AI" className="w-10 h-10 rounded-xl object-contain" />
            <span className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-foreground">
              CTAL AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAVIGATION.marketing.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text-muted hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-text-muted hover:text-foreground transition-colors duration-200"
            >
              Sign In
            </button>
            <Button onClick={() => router.push('/contact')}>
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 glass rounded-2xl p-4">
            {NAVIGATION.marketing.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 px-4 text-text-muted hover:text-foreground hover:bg-surface-light rounded-lg transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border">
              <button
                onClick={() => { router.push('/dashboard'); setIsOpen(false) }}
                className="block w-full py-3 px-4 text-text-muted hover:text-foreground hover:bg-surface-light transition-colors text-left"
              >
                Sign In
              </button>
              <Button onClick={() => { router.push('/contact'); setIsOpen(false) }} className="mt-2 w-full">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
