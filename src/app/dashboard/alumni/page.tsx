'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Users, TrendingUp, Award, Handshake, ChevronRight, MapPin, Briefcase } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import Card from '@/components/ui/card'
import AIInsight from '@/components/ui/ai-insight'

const alumni = [
  { name: 'Adebayo Ogundimu', programme: 'Advanced Valuation', year: 2024, role: 'CEO', company: 'TechCorp Nigeria', skills: ['Finance', 'Leadership', 'Valuation'], location: 'Lagos', referrals: 5, available: true },
  { name: 'Fatima Al-Rashid', programme: 'Digital Marketing', year: 2024, role: 'Marketing Director', company: 'Green Energy Co', skills: ['Marketing', 'Strategy', 'Analytics'], location: 'Abuja', referrals: 3, available: true },
  { name: 'Chukwuma Eze', programme: 'Leadership Academy', year: 2023, role: 'COO', company: 'Startup Labs', skills: ['Operations', 'Leadership', 'Innovation'], location: 'Lagos', referrals: 2, available: false },
  { name: 'Ngozi Okafor', programme: 'Digital Marketing', year: 2024, role: 'Founder', company: 'Ngozi Consult', skills: ['Marketing', 'Consulting', 'Training'], location: 'Port Harcourt', referrals: 8, available: true },
  { name: 'Ibrahim Musa', programme: 'Advanced Valuation', year: 2023, role: 'Finance Manager', company: 'Meridian Holdings', skills: ['Finance', 'Analytics', 'Risk'], location: 'Lagos', referrals: 4, available: true },
]

const stats = [
  { title: 'Total Alumni', value: '1,247', change: '+142', changeType: 'up' as const, icon: GraduationCap },
  { title: 'Active Alumni', value: '892', change: '+68', changeType: 'up' as const, icon: Users },
  { title: 'Referrals Made', value: '324', change: '+45', changeType: 'up' as const, icon: Handshake },
  { title: 'Avg Engagement', value: '78%', change: '+5%', changeType: 'up' as const, icon: TrendingUp },
]

export default function AlumniPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Alumni & Community"
          description="Alumni network, opportunities, and engagement"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Alumni' }]}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<stat.icon className="w-5 h-5" />} />
        ))}
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Matching Insight">
          <p>3 alumni may be suitable for the NPA partnership opportunity. Ngozi Okafor has made 8 referrals this year - consider featuring her as a brand ambassador. Alumni engagement is highest among Advanced Valuation graduates.</p>
        </AIInsight>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold">Alumni Directory</h3>
          </div>
          <div className="divide-y divide-border-light">
            {alumni.map((person) => (
              <div key={person.name} className="px-6 py-4 flex items-center gap-4 hover:bg-surface-light transition-colors cursor-pointer">
                <Avatar name={person.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{person.name}</p>
                    {person.available && <Badge variant="success" size="sm">Available</Badge>}
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">{person.role} at {person.company}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" />{person.programme} ({person.year})</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{person.location}</span>
                    <span className="flex items-center gap-1"><Handshake className="w-3 h-3" />{person.referrals} referrals</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {person.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="neutral" size="sm">{skill}</Badge>
                  ))}
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
