'use client'

import {
  Sparkles,
  Target,
  Eye,
  Heart,
  Lightbulb,
  Users,
  Shield,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Globe,
  Award,
  TrendingUp,
  Building2,
} from 'lucide-react'
import Navbar from '@/components/marketing/navbar'
import Footer from '@/components/marketing/footer'

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description:
      'We push the boundaries of what AI can do, constantly exploring new ways to solve business challenges with cutting-edge technology.',
    color: '#3452ff',
  },
  {
    icon: Users,
    title: 'People Centered',
    description:
      'Technology serves people. We design AI agents that augment human potential, not replace it — empowering teams to do their best work.',
    color: '#ff1053',
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description:
      'Your data is sacred. We maintain the highest standards of security, transparency, and compliance in everything we build.',
    color: '#10b981',
  },
  {
    icon: Rocket,
    title: 'Speed to Value',
    description:
      'We deliver results fast. Our platform is built for rapid deployment so businesses can start seeing ROI from day one.',
    color: '#f59e0b',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description:
      'Born in Africa, built for the world. We are committed to democratizing AI access for businesses everywhere.',
    color: '#8b5cf6',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We hold ourselves to the highest standards — in code quality, customer experience, and the outcomes we deliver for our clients.',
    color: '#ec4899',
  },
]

const team = [
  {
    name: 'Adaeze Nwosu',
    role: 'CEO & Co-Founder',
    bio: 'Former McKinsey consultant with 12+ years in AI strategy. Passionate about leveraging technology to unlock Africa\'s business potential.',
    initials: 'AN',
    gradient: 'from-primary to-primary-light',
  },
  {
    name: 'Tunde Bakare',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Google engineer and ML specialist. Has built AI systems serving millions of users across three continents.',
    initials: 'TB',
    gradient: 'from-secondary to-secondary-light',
  },
  {
    name: 'Chioma Obi',
    role: 'Head of Product',
    bio: 'Product leader with experience at Stripe and Flutterwave. Obsessed with creating intuitive experiences that solve real problems.',
    initials: 'CO',
    gradient: 'from-[#10b981] to-[#34d399]',
  },
  {
    name: 'Emeka Okoro',
    role: 'Head of Engineering',
    bio: 'Full-stack architect with deep expertise in distributed systems. Leads a world-class team building scalable AI infrastructure.',
    initials: 'EO',
    gradient: 'from-[#f59e0b] to-[#fbbf24]',
  },
  {
    name: 'Fatima El-Amin',
    role: 'Head of Growth',
    bio: 'Growth strategist who has scaled three startups from zero to Series A. Expert in building go-to-market engines across emerging markets.',
    initials: 'FA',
    gradient: 'from-[#8b5cf6] to-[#a78bfa]',
  },
  {
    name: 'Olumide Adebayo',
    role: 'Head of AI Research',
    bio: 'PhD in Machine Learning from Oxford. Published researcher focused on practical applications of LLMs in business automation.',
    initials: 'OA',
    gradient: 'from-[#ec4899] to-[#f472b6]',
  },
]

const stats = [
  { value: '2022', label: 'Founded' },
  { value: '50+', label: 'Team Members' },
  { value: '500+', label: 'Businesses Served' },
  { value: '98%', label: 'Client Retention' },
]

const timeline = [
  {
    year: '2022',
    title: 'The Spark',
    description:
      'CTAL AI was born from a simple observation: African businesses were being left behind in the AI revolution. Our founders set out to change that.',
  },
  {
    year: '2023',
    title: 'Building the Foundation',
    description:
      'Launched our first AI agents for marketing and sales automation. Secured seed funding and grew our engineering team to 20+ talented developers.',
  },
  {
    year: '2024',
    title: 'Scaling Across Africa',
    description:
      'Expanded to serve 200+ businesses across Nigeria, Kenya, Ghana, and South Africa. Launched our full platform with 15+ automation modules.',
  },
  {
    year: '2025',
    title: 'Global Ambitions',
    description:
      'Reached 500+ businesses, launched enterprise features, and began expansion into Europe and North America. Introduced 8 specialized AI agents.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Our Story
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
              Powering the Future of{' '}
              <span className="gradient-text">African Business</span>
            </h1>

            <p className="text-xl text-text-muted max-w-3xl mx-auto mb-10">
              We&apos;re on a mission to democratize AI for every business in Africa and beyond.
              CTAL AI connects your marketing, sales, CRM, and operations into one
              intelligent, automated ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center justify-center gap-2"
              >
                Join Our Mission
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/features"
                className="px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-surface transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Explore the Platform
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl bg-surface border border-border p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              What <span className="gradient-text">Drives Us</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Our mission and vision guide every decision we make, every feature we build,
              and every relationship we nurture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="rounded-2xl border border-border bg-surface p-8 md:p-10 h-full hover:border-primary/50 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Target className="w-8 h-8 text-primary-light" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
                  Our Mission
                </h3>
                <p className="text-text-muted leading-relaxed text-lg">
                  To empower every African business with intelligent AI automation that
                  drives growth, efficiency, and competitive advantage — making
                  world-class technology accessible to organizations of all sizes.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  {[
                    'Democratize AI access for African businesses',
                    'Automate repetitive tasks to free human potential',
                    'Connect fragmented business processes into one system',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-text-muted text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary-light flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="rounded-2xl border border-border bg-surface p-8 md:p-10 h-full hover:border-secondary/50 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <Eye className="w-8 h-8 text-secondary-light" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
                  Our Vision
                </h3>
                <p className="text-text-muted leading-relaxed text-lg">
                  To become the leading AI-powered operating system for businesses across
                  Africa — a future where every company, from startups to enterprises,
                  has the intelligence to thrive in the global economy.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  {[
                    'A continent where AI levels the playing field',
                    'Every business running on intelligent automation',
                    'Africa as a global leader in AI innovation',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-text-muted text-sm">
                      <CheckCircle2 className="w-5 h-5 text-secondary-light flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story / Timeline */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              From a bold idea to a platform serving hundreds of businesses — this is the
              story of CTAL AI.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30 hidden md:block" />

            <div className="space-y-12 md:space-y-0">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative md:grid md:grid-cols-2 md:gap-16 md:items-center ${
                    index % 2 === 0 ? '' : 'md:direction-rtl'
                  }`}
                >
                  {/* Year badge - center on desktop */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-surface border-2 border-primary flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-light">
                        {item.year.slice(2)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`rounded-2xl border border-border bg-surface p-6 md:p-8 ${
                      index % 2 === 0 ? 'md:text-right' : 'md:order-2'
                    }`}
                  >
                    <span className="md:hidden inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2 font-[family-name:var(--font-space-grotesk)]">
                      {item.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Spacer for alternate layout */}
                  <div className={`hidden md:block ${index % 2 === 0 ? 'md:order-2' : ''}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              The principles that guide our team, shape our product, and define the
              experience we create for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="group relative rounded-2xl bg-surface border border-border p-7 hover:border-border transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300" style={{ backgroundColor: `${value.color}12`, border: `1px solid ${value.color}25` }}>
                  <value.icon className="w-7 h-7" style={{ color: value.color }} />
                </div>
                <h3 className="text-foreground font-semibold text-xl mb-3">
                  {value.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {value.description}
                </p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to right, transparent, ${value.color}50, transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              A diverse group of engineers, designers, and strategists united by a
              shared vision: making AI work for every African business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="group relative rounded-2xl bg-surface border border-border p-7 hover:border-border transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-lg">{member.initials}</span>
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold text-lg leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-primary-light text-sm font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className="text-text-muted text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CTAL AI Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-space-grotesk)]">
              Why <span className="gradient-text">CTAL AI</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              We&apos;re not just building software. We&apos;re building the infrastructure for
              Africa&apos;s next economic leap.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Built for Scale',
                description:
                  'From a 5-person startup to a 5,000-person enterprise, our platform grows with you — no re-architecture required.',
              },
              {
                icon: Building2,
                title: 'Africa-First Design',
                description:
                  'We understand the unique challenges of African markets — from connectivity to payment systems — and build solutions that work on the ground.',
              },
              {
                icon: Heart,
                title: 'Partnership, Not Vendor',
                description:
                  'We succeed when you succeed. Every client gets a dedicated success team committed to delivering measurable business outcomes.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl bg-surface border border-border p-8 hover:border-primary/30 transition-all duration-300 text-center hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-8 h-8 text-primary-light" />
                </div>
                <h3 className="text-foreground font-semibold text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            Be Part of the <span className="gradient-text">Future</span>
          </h2>
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a business looking to automate or a talented individual
            wanting to make an impact — we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center justify-center gap-2"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/pricing"
              className="px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-surface transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              View Pricing
            </a>
          </div>
          <p className="text-sm text-text-muted mt-6">
            No credit card required · 14-day free trial · Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
