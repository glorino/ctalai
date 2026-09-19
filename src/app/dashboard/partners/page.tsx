'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Handshake, Plus, TrendingUp, Calendar, FileText, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { formatCurrency } from '@/lib/utils'
import { PageHeader, StatCard } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import Avatar from '@/components/ui/avatar'
import Card from '@/components/ui/card'
import AIInsight from '@/components/ui/ai-insight'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'

interface PartnerData {
  id: string
  name: string
  type: string
  status: string
  agreements: number
  meetings: number
  createdAt: string
  _count: { agreements: number; meetings: number }
}

const statusVariant: Record<string, 'success' | 'warning' | 'primary' | 'neutral' | 'error'> = {
  ACTIVE: 'success',
  PROSPECT: 'primary',
  INACTIVE: 'neutral',
  TERMINATED: 'error',
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<PartnerData[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', type: 'ACADEMIC', contactPerson: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const fetchData = () => {
    setLoading(true)
    fetch('/api/partners')
      .then((res) => res.json())
      .then((d) => setPartners(d.partners || d.data || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast('Created successfully', 'success')
        setShowForm(false)
        setFormData({ name: '', type: 'ACADEMIC', contactPerson: '', email: '', phone: '' })
        fetchData()
      } else {
        const data = await res.json()
        toast(data.error || 'Failed to create', 'error')
      }
    } catch {
      toast('Failed to create', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const totalPartners = partners.length
  const activePartners = partners.filter(p => p.status === 'ACTIVE').length
  const totalAgreements = partners.reduce((sum, p) => sum + (p._count?.agreements || p.agreements || 0), 0)
  const totalMeetings = partners.reduce((sum, p) => sum + (p._count?.meetings || p.meetings || 0), 0)

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Partnerships"
          description="Partner management, agreements, and opportunities"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Partners' }]}
          actions={<Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowForm(true)}>Add Partner</Button>}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Partners" value={loading ? '...' : totalPartners.toString()} change="+3" changeType="up" icon={<Handshake className="w-5 h-5" />} />
        <StatCard title="Active Agreements" value={loading ? '...' : totalAgreements.toString()} change="+2" changeType="up" icon={<FileText className="w-5 h-5" />} />
        <StatCard title="Active Partners" value={loading ? '...' : activePartners.toString()} change="+1" changeType="up" icon={<TrendingUp className="w-5 h-5" />} />
        <StatCard title="Total Meetings" value={loading ? '...' : totalMeetings.toString()} change="+6" changeType="up" icon={<Calendar className="w-5 h-5" />} />
      </motion.div>

      <motion.div variants={staggerItem}>
        <AIInsight title="AI Partnership Insight">
          {loading ? (
            <p>Loading partnership insights...</p>
          ) : (
            <p>You have {activePartners} active partners with {totalAgreements} agreements. Focus on deepening relationships with your most engaged partners.</p>
          )}
        </AIInsight>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card padding="none">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold">Partners</h3>
          </div>
          {loading ? (
            <div className="p-6 space-y-3">{[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 rounded-lg" />)}</div>
          ) : (
            <div className="divide-y divide-border-light">
              {partners.map((partner) => (
                <div key={partner.id} className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-surface-light transition-colors cursor-pointer">
                  <Avatar name={partner.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{partner.name}</p>
                      <Badge variant={statusVariant[partner.status] || 'neutral'} dot size="sm">{partner.status}</Badge>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{partner.type} | {partner._count?.agreements || partner.agreements || 0} agreements | {partner._count?.meetings || partner.meetings || 0} meetings</p>
                  </div>
                  <div className="flex sm:flex-col sm:items-end gap-2 sm:gap-0">
                    <p className="text-xs text-text-muted">Created: {new Date(partner.createdAt).toLocaleDateString('en-NG')}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted shrink-0 hidden sm:block" />
                </div>
              ))}
              {partners.length === 0 && (
                <div className="px-6 py-8 text-center text-sm text-text-muted">No partners found</div>
              )}
            </div>
          )}
        </Card>
      </motion.div>

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Add Partner</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              <Select label="Type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} options={[
                { value: 'ACADEMIC', label: 'Academic' },
                { value: 'CORPORATE', label: 'Corporate' },
                { value: 'GOVERNMENT', label: 'Government' },
              ]} />
              <Input label="Contact Person" value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} />
              <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <Input label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" isLoading={submitting}>Create</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  )
}
