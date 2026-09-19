'use client'

import { useRouter } from 'next/navigation'
import Navbar from '@/components/marketing/navbar'
import Hero from '@/components/marketing/hero'
import Features from '@/components/marketing/features'
import Agents from '@/components/marketing/agents'
import Journey from '@/components/marketing/journey'
import Footer from '@/components/marketing/footer'
import { Sparkles } from 'lucide-react'
import Button from '@/components/ui/button'

export default function Home() {
  const router = useRouter()
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Agents />
      <Journey />
      
      {/* CTA Section */}
      <section className="py-28 relative overflow-hidden">
        <div className="cta-mesh-bg absolute inset-0" />
        {/* Decorative orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
        {/* Grid overlay */}
        <div className="grid-pattern absolute inset-0 opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary mb-8">
            <Sparkles className="w-4 h-4" />
            Limited spots available
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)] tracking-tight">
            Ready to <span className="gradient-text">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of businesses already using CTAL AI to automate their operations 
            and scale without increasing costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => router.push('/contact')}>Start Your Transformation</Button>
            <Button variant="outline" onClick={() => router.push('/dashboard')}>View Demo</Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
