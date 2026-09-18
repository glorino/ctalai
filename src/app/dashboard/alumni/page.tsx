'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Users, TrendingUp, Award, Handshake, ChevronRight, MapPin } from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Avatar from '@/components/ui/avatar'
import Card from '@/components/ui/card'
import AIInsight from '@/components/ui/ai-insight'

interface AlumniPerson {
  id: string
  graduationYear: number | null
  programme: string | null
  currentRole: string | null
  company: string | null
  skills: string[]
  isAvailableForMentoring: boolean
  _count: { connections: number }
  opportunities: { type: string; title: string }[]
}

export default function AlumniPage() {
  const [alumni, setAlumni] = useState<AlumniPerson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/alumni')
      .then((res) => res.json())
      .then((d) => setAlumni(d.alumni || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

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
        <StatCard title="Total Alumni" value={loading ? '...' : alumni.length.toString()} change="+142" changeType="up" icon={<GraduationCap className="w-5 h-5" />} />
        <StatCard title="Available for Mentoring" value={loading ? '...' : alumni.filter(a => a.isAvailableForMentoring).length.toString()} change="+8" changeType="up" icon={<Users className="w-5 h-5" />} />
        <StatCard title="Total Connections" value={loading ? '...' : alumni.reduce((s, a) => s + a._count.connections, 0).toString()} change="+45" changeType="up" icon={<Handshake className="w-5 h-5" />} />
        <StatCard title="Opportunities" value={loading ? '...' : alumni.reduce((s, a) => s + a.opportunities.length, 0).toString()} change="+12" changeType="up" icon={<Award className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Matching Insight">
          <p>Alumni data is synced from the database. {alumni.length} alumni registered, {alumni.filter(a => a.isAvailableForMentoring).length} available for mentoring.</p>
        </AIInsight>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold">Alumni Directory</h3>
          </div>
          {loading ? (
            <div className="p-6 space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="divide-y divide-border-light">
              {alumni.map((person) => (
                <div key={person.id} className="px-6 py-4 flex items-center gap-4 hover:bg-surface-light transition-colors cursor-pointer">
                  <Avatar name={person.currentRole || 'Alumni'} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{person.currentRole || 'Alumni'}</p>
                      {person.isAvailableForMentoring && <Badge variant="success" size="sm">Available</Badge>}
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{person.company || 'N/A'}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                      {person.programme && <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" />{person.programme}</span>}
                      {person.graduationYear && <span>{person.graduationYear}</span>}
                      <span className="flex items-center gap-1"><Handshake className="w-3 h-3" />{person._count.connections} connections</span>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {person.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="neutral" size="sm">{skill}</Badge>
                    ))}
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
                </div>
              ))}
              {alumni.length === 0 && (
                <div className="px-6 py-8 text-center text-sm text-text-muted">No alumni found</div>
              )}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
