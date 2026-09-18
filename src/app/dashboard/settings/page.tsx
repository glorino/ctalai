'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Settings,
  User,
  Shield,
  Bell,
  CreditCard,
  Globe,
  Mail,
  MessageSquare,
  Database,
  Key,
  FileText,
  AlertTriangle,
} from 'lucide-react'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Card from '@/components/ui/card'
import Select from '@/components/ui/select'
import { COMPANY } from '@/lib/constants'

const settingsSections = [
  { id: 'organisation', label: 'Organisation', icon: Globe },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'users', label: 'Users & Roles', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'ai', label: 'AI Settings', icon: AlertTriangle },
  { id: 'integrations', label: 'Integrations', icon: Database },
  { id: 'security', label: 'Security', icon: Key },
  { id: 'audit', label: 'Audit Logs', icon: FileText },
]

interface UserData {
  id: string
  name: string | null
  email: string
  role: string
  department: string | null
  isActive: boolean
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('organisation')
  const [users, setUsers] = useState<UserData[]>([])

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .catch(() => {})
  }, [])

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={staggerItem}>
        <PageHeader
          title="Settings"
          description="Manage your organisation and system settings"
          breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]}
        />
      </motion.div>

      <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card padding="sm">
            <nav className="space-y-0.5">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left',
                    activeSection === section.id
                      ? 'bg-primary/8 text-primary font-medium'
                      : 'text-text-muted hover:text-foreground hover:bg-surface-light'
                  )}
                >
                  <section.icon className="w-4 h-4 shrink-0" />
                  {section.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {activeSection === 'organisation' && (
            <Card padding="lg">
              <h3 className="text-base font-semibold mb-6">Organisation Settings</h3>
              <div className="space-y-5 max-w-2xl">
                <Input label="Organisation Name" defaultValue={COMPANY.name} />
                <Input label="Trade Name" defaultValue={COMPANY.shortName + ' AI'} />
                <Input label="Email" type="email" defaultValue={COMPANY.email} />
                <Input label="Phone" defaultValue={COMPANY.phone} />
                <Input label="Website" defaultValue={COMPANY.website} />
                <Input label="Address" defaultValue={COMPANY.address} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select label="Currency" options={[{ value: 'NGN', label: '\u20a6 NGN' }, { value: 'USD', label: '$ USD' }]} defaultValue="NGN" />
                  <Select label="Timezone" options={[{ value: 'Africa/Lagos', label: 'WAT (Africa/Lagos)' }, { value: 'UTC', label: 'UTC' }]} defaultValue="Africa/Lagos" />
                </div>
                <Button>Save Changes</Button>
              </div>
            </Card>
          )}

          {activeSection === 'users' && (
            <Card padding="lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold">Users & Roles</h3>
                <Button size="sm">Add User</Button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Admin User', email: 'admin@ctalai.com', role: 'Super Admin', status: 'Active' },
                  { name: 'Chioma Nwosu', email: 'chioma@ctalai.com', role: 'CS Manager', status: 'Active' },
                  { name: 'Emeka Okonkwo', email: 'emeka@ctalai.com', role: 'Sales Lead', status: 'Active' },
                  { name: 'Aisha Abdullahi', email: 'aisha@ctalai.com', role: 'Marketing Manager', status: 'Active' },
                  { name: 'Tunde Bakare', email: 'tunde@ctalai.com', role: 'Ops Coordinator', status: 'Active' },
                ].map((user) => (
                  <div key={user.email} className="flex items-center justify-between p-3 rounded-xl bg-surface-light">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-xs font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-text-muted">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="badge badge-primary">{user.role}</span>
                      <Button variant="ghost" size="xs">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeSection === 'ai' && (
            <Card padding="lg">
              <h3 className="text-base font-semibold mb-6">AI Settings</h3>
              <div className="space-y-5 max-w-2xl">
                <Input label="OpenAI API Key" type="password" placeholder="sk-..." helperText="Add your OpenAI API key to enable AI features" />
                <Select label="Default AI Model" options={[{ value: 'gpt-4o', label: 'GPT-4o' }, { value: 'gpt-4o-mini', label: 'GPT-4o Mini' }]} defaultValue="gpt-4o-mini" />
                <Input label="Max Tokens" type="number" defaultValue="2000" />
                <Button>Save AI Settings</Button>
              </div>
            </Card>
          )}

          {activeSection === 'security' && (
            <Card padding="lg">
              <h3 className="text-base font-semibold mb-6">Security Settings</h3>
              <div className="space-y-5 max-w-2xl">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Two-Factor Authentication</label>
                  <p className="text-xs text-text-muted">Require 2FA for all admin accounts</p>
                  <Button variant="outline" size="sm">Enable 2FA</Button>
                </div>
                <Input label="Session Timeout (minutes)" type="number" defaultValue="60" />
                <Input label="Max Login Attempts" type="number" defaultValue="5" />
                <Button>Save Security Settings</Button>
              </div>
            </Card>
          )}

          {activeSection === 'integrations' && (
            <Card padding="lg">
              <h3 className="text-base font-semibold mb-6">Integrations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Paystack', description: 'Payment processing', connected: !!process.env?.PAYSTACK_SECRET_KEY },
                  { name: 'OpenAI', description: 'AI-powered features', connected: false },
                  { name: 'Termii', description: 'SMS notifications', connected: false },
                  { name: 'WhatsApp Business', description: 'Messaging integration', connected: false },
                ].map((integration) => (
                  <div key={integration.name} className="p-4 rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold">{integration.name}</h4>
                      <span className={cn('text-xs font-medium', integration.connected ? 'text-emerald-600' : 'text-text-muted')}>
                        {integration.connected ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mb-3">{integration.description}</p>
                    <Button variant={integration.connected ? 'outline' : 'primary'} size="xs" className="w-full">
                      {integration.connected ? 'Configure' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {!['organisation', 'users', 'ai', 'security', 'integrations'].includes(activeSection) && (
            <Card padding="lg">
              <div className="text-center py-12">
                <Settings className="w-12 h-12 text-text-muted mx-auto mb-3" />
                <h3 className="text-lg font-semibold">{settingsSections.find(s => s.id === activeSection)?.label} Settings</h3>
                <p className="text-sm text-text-muted mt-1">Configure your {settingsSections.find(s => s.id === activeSection)?.label.toLowerCase()} settings here.</p>
              </div>
            </Card>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
