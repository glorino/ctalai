'use client'

import { useState } from 'react'
import { Check, X, ChevronDown, Zap, ArrowRight, Star } from 'lucide-react'
import Navbar from '@/components/marketing/navbar'
import Footer from '@/components/marketing/footer'

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses getting started',
    monthlyPrice: 50000,
    annualPrice: 42000,
    popular: false,
    features: [
      { text: 'Up to 500 customers', included: true },
      { text: 'Basic CRM', included: true },
      { text: 'Email support', included: true },
      { text: '1 AI agent', included: true },
      { text: 'Lead generation', included: false },
      { text: 'Analytics dashboard', included: false },
      { text: 'Priority support', included: false },
      { text: 'Custom integrations', included: false },
    ],
  },
  {
    name: 'Growth',
    description: 'Best for growing businesses that need more power',
    monthlyPrice: 150000,
    annualPrice: 126000,
    popular: true,
    features: [
      { text: 'Up to 5,000 customers', included: true },
      { text: 'Full CRM + Lead Gen', included: true },
      { text: 'Priority support', included: true },
      { text: '4 AI agents', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Advanced reporting', included: true },
      { text: 'Custom integrations', included: false },
      { text: 'Dedicated account manager', included: false },
    ],
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    monthlyPrice: null,
    annualPrice: null,
    popular: false,
    features: [
      { text: 'Unlimited customers', included: true },
      { text: 'Full platform access', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'All 8 AI agents', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'SLA guarantee', included: true },
      { text: 'Onboarding & training', included: true },
    ],
  },
]

const faqs = [
  {
    question: 'Can I switch plans at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, the price difference will be prorated. When downgrading, the new price will apply at the start of your next billing cycle.',
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes! We offer a 14-day free trial on all plans. No credit card required. You can explore all features of your chosen plan before committing.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, bank transfers, and mobile money payments. For Enterprise plans, we also offer invoice-based billing with NET-30 terms.',
  },
  {
    question: 'What happens when I reach my customer limit?',
    answer: "You'll receive a notification when you reach 80% of your customer limit. You can then choose to upgrade your plan or purchase additional customer slots as an add-on.",
  },
  {
    question: 'Do you offer refunds?',
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our service within the first 30 days, we'll provide a full refund, no questions asked.",
  },
  {
    question: 'What does priority support include?',
    answer: 'Priority support includes guaranteed response within 4 hours during business days, dedicated support channel, and access to our senior support team for complex issues.',
  },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <Zap className="w-4 h-4" />
              Simple, transparent pricing
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display">
              Choose the Right Plan for{' '}
              <span className="gradient-text">Your Business</span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10">
              Start free and scale as you grow. No hidden fees, no surprises.
              Cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span
                className={`text-sm font-medium transition-colors ${
                  !isAnnual ? 'text-foreground' : 'text-text-muted'
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  isAnnual ? 'bg-primary' : 'bg-surface-light'
                }`}
              >
                <div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300"
                  style={{ left: isAnnual ? 32 : 4 }}
                />
              </button>
              <span
                className={`text-sm font-medium transition-colors ${
                  isAnnual ? 'text-foreground' : 'text-text-muted'
                }`}
              >
                Annual
              </span>
              {isAnnual && (
                <span className="text-sm text-success font-medium">
                  Save 20%
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-primary/20 to-surface border-2 border-primary/50 scale-105 shadow-lg'
                    : 'bg-surface border border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-full">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-text-muted text-sm">{plan.description}</p>
                </div>

                <div className="mb-8">
                  {plan.monthlyPrice ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        {formatPrice(isAnnual ? plan.annualPrice! : plan.monthlyPrice)}
                      </span>
                      <span className="text-text-muted">/month</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold">Custom</div>
                  )}
                  {isAnnual && plan.monthlyPrice && (
                    <p className="text-sm text-text-muted mt-2">
                      Billed annually ({formatPrice(plan.annualPrice! * 12)}/year)
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3 text-text-muted" />
                        </div>
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? 'text-foreground' : 'text-text-muted'
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    plan.popular
                      ? 'btn-gradient text-white'
                      : 'bg-surface border border-border text-foreground hover:border-primary/50 hover:bg-primary/10'
                  }`}
                >
                  {plan.monthlyPrice ? 'Get Started' : 'Contact Sales'}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/50 to-background" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              Compare <span className="gradient-text">All Features</span>
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              See exactly what you get with each plan to make the best choice for
              your business.
            </p>
          </div>

          <div className="rounded-2xl border border-border overflow-hidden bg-surface">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-6 text-text-muted font-medium">
                      Feature
                    </th>
                    {plans.map((plan) => (
                      <th
                        key={plan.name}
                        className={`text-center py-4 px-6 font-semibold ${
                          plan.popular ? 'text-primary' : 'text-foreground'
                        }`}
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Customers', starter: '500', growth: '5,000', enterprise: 'Unlimited' },
                    { feature: 'AI Agents', starter: '1', growth: '4', enterprise: '8' },
                    { feature: 'CRM', starter: 'Basic', growth: 'Full', enterprise: 'Full' },
                    { feature: 'Lead Generation', starter: false, growth: true, enterprise: true },
                    { feature: 'Analytics', starter: false, growth: true, enterprise: true },
                    { feature: 'Priority Support', starter: false, growth: true, enterprise: true },
                    { feature: 'Custom Integrations', starter: false, growth: false, enterprise: true },
                    { feature: 'Dedicated Manager', starter: false, growth: false, enterprise: true },
                    { feature: 'SLA Guarantee', starter: false, growth: false, enterprise: true },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-border last:border-0 table-row"
                    >
                      <td className="py-4 px-6 text-sm text-foreground">{row.feature}</td>
                      {[row.starter, row.growth, row.enterprise].map((value, j) => (
                        <td key={j} className="text-center py-4 px-6">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center mx-auto">
                                <Check className="w-3 h-3 text-success" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center mx-auto">
                                <X className="w-3 h-3 text-text-muted" />
                              </div>
                            )
                          ) : (
                            <span className="text-sm text-foreground">{value}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-text-muted">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-border overflow-hidden bg-surface"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-light transition-colors"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-text-muted text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Ready to <span className="gradient-text">Get Started</span>?
          </h2>
          <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already using CTAL AI to automate
            their operations and scale without increasing costs.
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
              href="/demo"
              className="px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-surface transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Book a Demo
            </a>
          </div>
          <p className="text-sm text-text-muted mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
