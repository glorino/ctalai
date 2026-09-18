'use client'

import { motion } from 'framer-motion'
import { HelpCircle, BookOpen, MessageSquare, Mail, ExternalLink } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader } from '@/components/ui/card'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

export default function HelpPage() {
  const { toast } = useToast()

  const helpItems = [
    { title: 'Documentation', description: 'Browse our knowledge base', icon: BookOpen, action: () => window.open('https://docs.ctalai.com', '_blank') },
    { title: 'AI Assistant', description: 'Ask the AI for help', icon: MessageSquare, action: () => toast('AI Assistant coming soon — configure OpenAI API key in Settings', 'info') },
    { title: 'Contact Support', description: 'Email support@ctalai.com', icon: Mail, action: () => window.open('mailto:support@ctalai.com?subject=CTAL%20AI%20Support%20Request') },
  ]

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader title="Help & Support" description="Get help with CTAL AI" breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Help' }]} />
      </motion.div>
      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {helpItems.map((item) => (
          <button key={item.title} onClick={item.action} className="text-left">
            <Card hover padding="md" className="text-center h-full">
              <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
              <p className="text-xs text-text-muted">{item.description}</p>
            </Card>
          </button>
        ))}
      </motion.div>
    </motion.div>
  )
}
