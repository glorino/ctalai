'use client'

import { useState, FormEvent } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  MessageSquare,
  Building2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Globe,
  ExternalLink,
} from 'lucide-react'
import Navbar from '@/components/marketing/navbar'
import Footer from '@/components/marketing/footer'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'hello@ctalai.com',
    href: 'mailto:hello@ctalai.com',
    description: 'We reply within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+234 800 123 4567',
    href: 'tel:+2348001234567',
    description: 'Mon-Fri, 9am-6pm WAT',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: 'Lagos, Nigeria',
    href: null,
    description: '42 Adeola Odeku, Victoria Island',
  },
]

const officeHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM WAT' },
  { day: 'Saturday', hours: '10:00 AM - 2:00 PM WAT' },
  { day: 'Sunday', hours: 'Closed' },
]

const socialLinks = [
  { icon: Globe, label: 'Twitter', href: 'https://twitter.com/ctalai' },
  { icon: Globe, label: 'LinkedIn', href: 'https://linkedin.com/company/ctalai' },
  { icon: Globe, label: 'Instagram', href: 'https://instagram.com/ctalai' },
  { icon: Globe, label: 'YouTube', href: 'https://youtube.com/@ctalai' },
]

const faqs = [
  {
    question: 'How do I get started with CTAL AI?',
    answer:
      'Getting started is simple. Click the "Get Started" button, fill out the contact form, and our team will reach out within 24 hours to schedule a personalized demo tailored to your business needs.',
  },
  {
    question: 'Do you offer free trials?',
    answer:
      'Yes! We offer a 14-day free trial on all our plans. No credit card required. You can explore all features of your chosen plan before committing to a subscription.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'CTAL AI is designed for businesses across all industries including technology, finance, healthcare, education, retail, and more. Our AI agents are customizable to fit your specific industry needs.',
  },
  {
    question: 'Can I integrate CTAL AI with my existing tools?',
    answer:
      'Absolutely. CTAL AI integrates seamlessly with popular tools like Slack, HubSpot, Salesforce, Google Workspace, and many more. Enterprise plans also include custom integrations.',
  },
  {
    question: 'What support options are available?',
    answer:
      'We offer email support on all plans, priority support with 4-hour response times on Growth plans, and dedicated account management on Enterprise plans. Our help center and documentation are also available 24/7.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Security is our top priority. We use bank-level encryption, comply with GDPR and SOC 2 standards, and undergo regular third-party security audits to ensure your data is always protected.',
  },
]

const subjects = [
  'General Inquiry',
  'Sales & Pricing',
  'Technical Support',
  'Partnership',
  'Media & Press',
  'Other',
]

interface FormData {
  name: string
  email: string
  company: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  company?: string
  subject?: string
  message?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', company: '', subject: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

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
              <MessageSquare className="w-4 h-4" />
              Get in touch
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display">
              We&apos;d Love to{' '}
              <span className="gradient-text">Hear From You</span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Have a question, want to partner, or ready to transform your business?
              Our team is here to help you get started.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info) => (
              <div key={info.title} className="relative group">
                <div className="rounded-2xl border border-border bg-surface p-6 hover:border-primary/50 transition-all duration-300 card-hover h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <info.icon className="w-6 h-6 text-primary-light" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{info.title}</h3>
                  <p className="text-text-muted text-sm mb-3">{info.description}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-primary-light font-medium hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-foreground font-medium">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Form + Sidebar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-surface p-8">
                <h2 className="text-2xl font-bold mb-2 font-display">Send Us a Message</h2>
                <p className="text-text-muted mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                {submitStatus === 'success' ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-success" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-text-muted mb-6">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="btn-gradient px-6 py-3 rounded-xl text-white font-semibold"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name + Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Full Name <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="John Doe"
                            className={`input-field w-full ${
                              errors.name ? 'border-error' : focusedField === 'name' ? 'border-primary' : ''
                            }`}
                          />
                          {errors.name && (
                            <p className="text-error text-xs mt-1.5 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email Address <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="john@company.com"
                            className={`input-field w-full ${
                              errors.email ? 'border-error' : focusedField === 'email' ? 'border-primary' : ''
                            }`}
                          />
                          {errors.email && (
                            <p className="text-error text-xs mt-1.5 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Company + Subject Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Company <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => handleChange('company', e.target.value)}
                            onFocus={() => setFocusedField('company')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Acme Inc."
                            className={`input-field w-full pl-10 ${
                              errors.company ? 'border-error' : focusedField === 'company' ? 'border-primary' : ''
                            }`}
                          />
                          {errors.company && (
                            <p className="text-error text-xs mt-1.5 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.company}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Subject <span className="text-secondary">*</span>
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                          className={`input-field w-full appearance-none ${
                            errors.subject ? 'border-error' : focusedField === 'subject' ? 'border-primary' : ''
                          }`}
                        >
                          <option value="">Select a subject</option>
                          {subjects.map((subject) => (
                            <option key={subject} value={subject} className="bg-surface">
                              {subject}
                            </option>
                          ))}
                        </select>
                        {errors.subject && (
                          <p className="text-error text-xs mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.subject}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message <span className="text-secondary">*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell us about your project or question..."
                        rows={5}
                        className={`input-field w-full resize-none ${
                          errors.message ? 'border-error' : focusedField === 'message' ? 'border-primary' : ''
                        }`}
                      />
                      {errors.message && (
                        <p className="text-error text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </p>
                      )}
                      <p className="text-text-muted text-xs mt-1.5">
                        {formData.message.length}/500 characters
                      </p>
                    </div>

                    {/* Error Alert */}
                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Something went wrong. Please try again later.
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-gradient py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map Placeholder */}
              <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                <div className="relative h-48 bg-surface-light flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                  <div className="text-center relative z-10">
                    <MapPin className="w-8 h-8 text-primary-light mx-auto mb-2" />
                    <p className="text-sm text-text-muted">42 Adeola Odeku, Victoria Island</p>
                    <p className="text-sm text-text-muted">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary-light" />
                  <h3 className="text-lg font-semibold text-foreground">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map((item) => (
                    <div key={item.day} className="flex items-center justify-between text-sm">
                      <span className="text-text-muted">{item.day}</span>
                      <span className={item.hours === 'Closed' ? 'text-error' : 'text-foreground'}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Follow Us</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                    >
                      <social.icon className="w-5 h-5 text-text-muted group-hover:text-primary-light transition-colors" />
                      <span className="text-sm text-text-muted group-hover:text-foreground transition-colors">
                        {social.label}
                      </span>
                      <ExternalLink className="w-3 h-3 text-text-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/50 to-background" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-text-muted">
              Can&apos;t find what you&apos;re looking for? Contact our support team.
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
            Join hundreds of businesses already using CTAL AI to automate their operations
            and scale without increasing costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/pricing"
              className="btn-gradient px-8 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center justify-center gap-2"
            >
              View Pricing
            </a>
            <a
              href="/dashboard"
              className="px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-surface transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              View Demo
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
