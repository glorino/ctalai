'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Bell,
  Key,
  Shield,
  Palette,
  Eye,
  EyeOff,
  Save,
  Check,
  AlertCircle,
  Mail,
  Phone,
  Building,
  Globe,
  Lock,
  Smartphone,
  MessageSquare,
  Sun,
  Moon,
  Monitor,
  Trash2,
  Copy,
  Plus,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from 'lucide-react'

type Tab = 'profile' | 'notifications' | 'apikeys' | 'security' | 'appearance'

interface FormData {
  profile: {
    firstName: string
    lastName: string
    email: string
    phone: string
    company: string
    website: string
    bio: string
  }
  notifications: {
    emailNotifications: boolean
    pushNotifications: boolean
    smsNotifications: boolean
    weeklyDigest: boolean
    marketingEmails: boolean
    securityAlerts: boolean
    projectUpdates: boolean
    teamMentions: boolean
  }
  apiKeys: {
    openaiKey: string
  }
  security: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
    twoFactorEnabled: boolean
  }
  appearance: {
    theme: 'dark' | 'light' | 'system'
    accentColor: string
    sidebarCollapsed: boolean
    compactMode: boolean
    animations: boolean
  }
}

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'apikeys', label: 'API Keys', icon: Key },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [apiKeyStatus, setApiKeyStatus] = useState<'configured' | 'not_configured' | 'invalid'>('not_configured')
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<FormData>({
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@ctalai.com',
      phone: '+234 801 234 5678',
      company: 'CTAL AI',
      website: 'https://ctalai.com',
      bio: 'Passionate about leveraging AI to transform businesses.',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      weeklyDigest: true,
      marketingEmails: false,
      securityAlerts: true,
      projectUpdates: true,
      teamMentions: true,
    },
    apiKeys: {
      openaiKey: '',
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: true,
    },
    appearance: {
      theme: 'dark',
      accentColor: '#3452ff',
      sidebarCollapsed: false,
      compactMode: false,
      animations: true,
    },
  })

  const updateProfile = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }))
  }

  const updateNotification = (field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value },
    }))
  }

  const updateAppearance = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      appearance: { ...prev.appearance, [field]: value },
    }))
  }

  const updateSecurity = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      security: { ...prev.security, [field]: value },
    }))
  }

  const validateProfile = (): boolean => {
    const errors: Record<string, string> = {}
    if (!formData.profile.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.profile.lastName.trim()) errors.lastName = 'Last name is required'
    if (!formData.profile.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.profile.email)) errors.email = 'Invalid email format'
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateSecurity = (): boolean => {
    const errors: Record<string, string> = {}
    if (!formData.security.currentPassword) errors.currentPassword = 'Current password is required'
    if (!formData.security.newPassword) errors.newPassword = 'New password is required'
    else if (formData.security.newPassword.length < 8) errors.newPassword = 'Password must be at least 8 characters'
    if (formData.security.newPassword !== formData.security.confirmPassword)
      errors.confirmPassword = 'Passwords do not match'
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = async () => {
    let isValid = true
    if (activeTab === 'profile') isValid = validateProfile()
    if (activeTab === 'security') isValid = validateSecurity()
    if (!isValid) return

    setSaveStatus('saving')
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setSaveStatus('success')
    setTimeout(() => setSaveStatus('idle'), 3000)
  }

  const handleSaveApiKey = async () => {
    if (!formData.apiKeys.openaiKey.trim()) {
      setApiKeyStatus('invalid')
      return
    }
    setSaveStatus('saving')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setApiKeyStatus('configured')
    setSaveStatus('success')
    setTimeout(() => setSaveStatus('idle'), 3000)
  }

  const handleRemoveApiKey = async () => {
    setSaveStatus('saving')
    await new Promise((resolve) => setTimeout(resolve, 800))
    setFormData((prev) => ({ ...prev, apiKeys: { openaiKey: '' } }))
    setApiKeyStatus('not_configured')
    setSaveStatus('success')
    setTimeout(() => setSaveStatus('idle'), 3000)
  }

  const toggleSwitch = (field: string, value: boolean) => {
    if (activeTab === 'notifications') updateNotification(field, value)
    else if (activeTab === 'appearance') updateAppearance(field, value)
    else if (activeTab === 'security') updateSecurity(field, value)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-text-muted text-sm">Manage your account preferences and configurations</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-6"
      >
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-surface rounded-2xl border border-white/5 p-2">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setActiveTab(tab.id)
                  setValidationErrors({})
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-muted hover:text-white hover:bg-surface-light'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-surface rounded-2xl border border-white/5 p-6"
            >
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">Profile Settings</h2>
                      <p className="text-text-muted text-sm mt-1">Update your personal information</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {formData.profile.firstName[0]}
                          {formData.profile.lastName[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-text-muted mb-2">First Name</label>
                      <input
                        type="text"
                        value={formData.profile.firstName}
                        onChange={(e) => updateProfile('firstName', e.target.value)}
                        className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                      {validationErrors.firstName && (
                        <p className="text-error text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {validationErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-text-muted mb-2">Last Name</label>
                      <input
                        type="text"
                        value={formData.profile.lastName}
                        onChange={(e) => updateProfile('lastName', e.target.value)}
                        className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                      {validationErrors.lastName && (
                        <p className="text-error text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {validationErrors.lastName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-text-muted mb-2">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" />
                          Email
                        </span>
                      </label>
                      <input
                        type="email"
                        value={formData.profile.email}
                        onChange={(e) => updateProfile('email', e.target.value)}
                        className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                      {validationErrors.email && (
                        <p className="text-error text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {validationErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-text-muted mb-2">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5" />
                          Phone
                        </span>
                      </label>
                      <input
                        type="tel"
                        value={formData.profile.phone}
                        onChange={(e) => updateProfile('phone', e.target.value)}
                        className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-muted mb-2">
                        <span className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5" />
                          Company
                        </span>
                      </label>
                      <input
                        type="text"
                        value={formData.profile.company}
                        onChange={(e) => updateProfile('company', e.target.value)}
                        className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-muted mb-2">
                        <span className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5" />
                          Website
                        </span>
                      </label>
                      <input
                        type="url"
                        value={formData.profile.website}
                        onChange={(e) => updateProfile('website', e.target.value)}
                        className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-text-muted mb-2">Bio</label>
                    <textarea
                      value={formData.profile.bio}
                      onChange={(e) => updateProfile('bio', e.target.value)}
                      rows={3}
                      className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold">Notification Preferences</h2>
                    <p className="text-text-muted text-sm mt-1">Choose how you want to be notified</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">Channels</h3>
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email', icon: Mail },
                      { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications', icon: Bell },
                      { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Text message alerts', icon: Smartphone },
                    ].map((item, index) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 bg-surface-light rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <item.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-xs text-text-muted">{item.desc}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSwitch(item.key, !formData.notifications[item.key as keyof typeof formData.notifications])}
                          className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                            formData.notifications[item.key as keyof typeof formData.notifications]
                              ? 'bg-primary'
                              : 'bg-surface-light border border-white/10'
                          }`}
                        >
                          <motion.div
                            animate={{
                              x: formData.notifications[item.key as keyof typeof formData.notifications] ? 26 : 2,
                            }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full"
                          />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">Types</h3>
                    {[
                      { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of your weekly activity', icon: Mail },
                      { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Product updates and offers', icon: MessageSquare },
                      { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important security notifications', icon: Shield },
                      { key: 'projectUpdates', label: 'Project Updates', desc: 'Changes to your projects', icon: RefreshCw },
                      { key: 'teamMentions', label: 'Team Mentions', desc: 'When someone mentions you', icon: User },
                    ].map((item, index) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + index * 0.05 }}
                        className="flex items-center justify-between p-4 bg-surface-light rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-secondary/10 rounded-lg">
                            <item.icon className="w-4 h-4 text-secondary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-xs text-text-muted">{item.desc}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSwitch(item.key, !formData.notifications[item.key as keyof typeof formData.notifications])}
                          className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                            formData.notifications[item.key as keyof typeof formData.notifications]
                              ? 'bg-primary'
                              : 'bg-surface-light border border-white/10'
                          }`}
                        >
                          <motion.div
                            animate={{
                              x: formData.notifications[item.key as keyof typeof formData.notifications] ? 26 : 2,
                            }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full"
                          />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* API Keys Tab */}
              {activeTab === 'apikeys' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold">API Key Management</h2>
                    <p className="text-text-muted text-sm mt-1">Manage your external API integrations</p>
                  </div>

                  <div className="p-5 bg-surface-light rounded-xl border border-white/5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4091-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0974-2.3616l2.603-1.5006 2.6029 1.5006v3.0012l-2.6029 1.5006-2.603-1.5006z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold">OpenAI API Key</h3>
                          <p className="text-xs text-text-muted">Required for AI agent functionality</p>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                          apiKeyStatus === 'configured'
                            ? 'bg-success/20 text-success'
                            : apiKeyStatus === 'invalid'
                            ? 'bg-error/20 text-error'
                            : 'bg-warning/20 text-warning'
                        }`}
                      >
                        {apiKeyStatus === 'configured' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : apiKeyStatus === 'invalid' ? (
                          <XCircle className="w-3.5 h-3.5" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5" />
                        )}
                        {apiKeyStatus === 'configured'
                          ? 'Configured'
                          : apiKeyStatus === 'invalid'
                          ? 'Invalid Key'
                          : 'Not Configured'}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="relative">
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          value={formData.apiKeys.openaiKey}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              apiKeys: { openaiKey: e.target.value },
                            }))
                            if (apiKeyStatus !== 'not_configured') setApiKeyStatus('not_configured')
                          }}
                          placeholder="sk-..."
                          className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 pr-24 text-sm focus:outline-none focus:border-primary transition-colors font-mono"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <button
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="p-1.5 text-text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
                          >
                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(formData.apiKeys.openaiKey)
                            }}
                            className="p-1.5 text-text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-text-muted">
                        Your API key is encrypted and stored securely. It is never exposed in client-side code.
                      </p>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSaveApiKey}
                        disabled={saveStatus === 'saving'}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-light rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        {saveStatus === 'saving' ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Save Key
                      </motion.button>
                      {apiKeyStatus === 'configured' && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleRemoveApiKey}
                          className="flex items-center gap-2 px-4 py-2.5 bg-error/10 text-error hover:bg-error/20 border border-error/20 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove Key
                        </motion.button>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">About API Keys</p>
                        <p className="text-xs text-text-muted mt-1">
                          API keys are used to authenticate requests to external services. Your keys are encrypted at
                          rest using AES-256 and are only accessible by the server. Never share your API keys or
                          commit them to version control.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold">Account Security</h2>
                    <p className="text-text-muted text-sm mt-1">Manage your password and security settings</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 bg-surface-light rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-success/10 rounded-lg">
                          <Shield className="w-4 h-4 text-success" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Two-Factor Authentication</p>
                          <p className="text-xs text-text-muted">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSwitch('twoFactorEnabled', !formData.security.twoFactorEnabled)}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                          formData.security.twoFactorEnabled
                            ? 'bg-success'
                            : 'bg-surface-light border border-white/10'
                        }`}
                      >
                        <motion.div
                          animate={{
                            x: formData.security.twoFactorEnabled ? 26 : 2,
                          }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-text-muted mb-2">
                          <span className="flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5" />
                            Current Password
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.security.currentPassword}
                            onChange={(e) => updateSecurity('currentPassword', e.target.value)}
                            className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:border-primary transition-colors"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {validationErrors.currentPassword && (
                          <p className="text-error text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {validationErrors.currentPassword}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm text-text-muted mb-2">
                          <span className="flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5" />
                            New Password
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={formData.security.newPassword}
                            onChange={(e) => updateSecurity('newPassword', e.target.value)}
                            className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:border-primary transition-colors"
                          />
                          <button
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {validationErrors.newPassword && (
                          <p className="text-error text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {validationErrors.newPassword}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm text-text-muted mb-2">
                          <span className="flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5" />
                            Confirm New Password
                          </span>
                        </label>
                        <input
                          type="password"
                          value={formData.security.confirmPassword}
                          onChange={(e) => updateSecurity('confirmPassword', e.target.value)}
                          className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                        {validationErrors.confirmPassword && (
                          <p className="text-error text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {validationErrors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">Active Sessions</h3>
                    <div className="p-4 bg-surface-light rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Monitor className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Current Session</p>
                            <p className="text-xs text-text-muted">Windows Chrome - Lagos, Nigeria</p>
                          </div>
                        </div>
                        <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold">Appearance Settings</h2>
                    <p className="text-text-muted text-sm mt-1">Customize the look and feel of your dashboard</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">Theme</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'dark', label: 'Dark', icon: Moon },
                        { value: 'light', label: 'Light', icon: Sun },
                        { value: 'system', label: 'System', icon: Monitor },
                      ].map((theme) => (
                        <motion.button
                          key={theme.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateAppearance('theme', theme.value)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                            formData.appearance.theme === theme.value
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-white/10 bg-surface-light text-text-muted hover:text-white hover:border-white/20'
                          }`}
                        >
                          <theme.icon className="w-6 h-6" />
                          <span className="text-sm font-medium">{theme.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">Accent Color</h3>
                    <div className="flex items-center gap-3">
                      {['#3452ff', '#ff1053', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'].map((color) => (
                        <button
                          key={color}
                          onClick={() => updateAppearance('accentColor', color)}
                          className={`w-10 h-10 rounded-full transition-all ${
                            formData.appearance.accentColor === color
                              ? 'ring-2 ring-offset-2 ring-offset-surface'
                              : 'hover:scale-110'
                          }`}
                          style={{
                            backgroundColor: color,
                            boxShadow: formData.appearance.accentColor === color ? `0 0 0 2px var(--background), 0 0 0 4px ${color}` : undefined,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">Preferences</h3>
                    {[
                      { key: 'sidebarCollapsed', label: 'Collapsed Sidebar', desc: 'Start with sidebar collapsed' },
                      { key: 'compactMode', label: 'Compact Mode', desc: 'Reduce spacing and padding' },
                      { key: 'animations', label: 'Animations', desc: 'Enable interface animations' },
                    ].map((item, index) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 bg-surface-light rounded-xl"
                      >
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-text-muted">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => toggleSwitch(item.key, !formData.appearance[item.key as keyof typeof formData.appearance])}
                          className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                            formData.appearance[item.key as keyof typeof formData.appearance]
                              ? 'bg-primary'
                              : 'bg-background border border-white/10'
                          }`}
                        >
                          <motion.div
                            animate={{
                              x: formData.appearance[item.key as keyof typeof formData.appearance] ? 26 : 2,
                            }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full"
                          />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                <AnimatePresence>
                  {saveStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-2 text-success text-sm"
                    >
                      <Check className="w-4 h-4" />
                      Settings saved successfully
                    </motion.div>
                  )}
                  {saveStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-2 text-error text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      Failed to save settings
                    </motion.div>
                  )}
                  {saveStatus === 'idle' && <div />}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={saveStatus === 'saving'}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
                >
                  {saveStatus === 'saving' ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}
