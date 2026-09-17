'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Plus,
  Users,
  Calendar,
  Award,
  BookOpen,
  TrendingUp,
  Clock,
  ChevronRight,
  BarChart3,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Tabs from '@/components/ui/tabs'
import Progress from '@/components/ui/progress'
import AIInsight from '@/components/ui/ai-insight'

const programmes = [
  {
    id: '1',
    name: 'Advanced Valuation',
    category: 'Finance',
    duration: '12 weeks',
    price: '₦250,000',
    capacity: 40,
    enrolled: 32,
    cohorts: 7,
    completion: 82,
    attendance: 91,
    satisfaction: 4.7,
    revenue: '₦8.2M',
    status: 'ACTIVE',
  },
  {
    id: '2',
    name: 'Digital Marketing Mastery',
    category: 'Marketing',
    duration: '8 weeks',
    price: '₦180,000',
    capacity: 50,
    enrolled: 45,
    cohorts: 12,
    completion: 92,
    attendance: 88,
    satisfaction: 4.8,
    revenue: '₦6.4M',
    status: 'ACTIVE',
  },
  {
    id: '3',
    name: 'Leadership Academy',
    category: 'Management',
    duration: '16 weeks',
    price: '₦350,000',
    capacity: 30,
    enrolled: 28,
    cohorts: 3,
    completion: 65,
    attendance: 94,
    satisfaction: 4.6,
    revenue: '₦5.1M',
    status: 'ACTIVE',
  },
  {
    id: '4',
    name: 'Business Analytics',
    category: 'Technology',
    duration: '10 weeks',
    price: '₦200,000',
    capacity: 35,
    enrolled: 30,
    cohorts: 4,
    completion: 78,
    attendance: 89,
    satisfaction: 4.5,
    revenue: '₦3.2M',
    status: 'ACTIVE',
  },
]

const stats = [
  { title: 'Active Programmes', value: '24', change: '+3', changeType: 'up' as const, icon: GraduationCap },
  { title: 'Total Participants', value: '1,247', change: '+142', changeType: 'up' as const, icon: Users },
  { title: 'Avg Completion', value: '82%', change: '+5%', changeType: 'up' as const, icon: Award },
  { title: 'Avg Satisfaction', value: '4.7/5', change: '+0.2', changeType: 'up' as const, icon: TrendingUp },
]

export default function ProgrammesPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Programmes"
          description="Manage training programmes and cohorts"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Programmes' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />}>New Programme</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} changeType={stat.changeType} icon={<stat.icon className="w-5 h-5" />} />
        ))}
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Programme Insight">
          <p>Participants who miss the first two sessions are 2.4x more likely to disengage. Leadership Academy has the highest satisfaction (4.6/5) but needs better onboarding. Recommend targeted outreach for 12 at-risk participants.</p>
        </AIInsight>
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {programmes.map((prog) => (
          <Card key={prog.id} hover padding="md">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold">{prog.name}</h3>
                <p className="text-xs text-text-muted mt-0.5">{prog.category} • {prog.duration} • {prog.price}</p>
              </div>
              <Badge variant="success" dot>Active</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">Enrolled</p>
                <p className="text-sm font-semibold">{prog.enrolled}/{prog.capacity}</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">Completion</p>
                <p className="text-sm font-semibold">{prog.completion}%</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">Satisfaction</p>
                <p className="text-sm font-semibold">{prog.satisfaction}/5</p>
              </div>
            </div>
            <Progress value={prog.enrolled} max={prog.capacity} showLabel size="sm" />
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-semibold gradient-text">{prog.revenue}</span>
              <button className="text-xs text-primary hover:text-primary-dark flex items-center gap-1">
                View Details <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  )
}
