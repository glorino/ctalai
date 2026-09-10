'use client'

import Navbar from '@/components/marketing/navbar'
import Hero from '@/components/marketing/hero'
import Features from '@/components/marketing/features'
import Agents from '@/components/marketing/agents'
import Journey from '@/components/marketing/journey'
import Footer from '@/components/marketing/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Agents />
      <Journey />
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            Ready to <span className="gradient-text">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already using CTAL AI to automate their operations 
            and scale without increasing costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center justify-center gap-2"
            >
              Start Your Transformation
            </a>
            <a
              href="/dashboard"
              className="px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-surface transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              View Demo
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
