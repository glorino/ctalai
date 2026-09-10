'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  UserPlus,
  Search,
  Filter,
  ChevronDown,
  Plus,
  Calendar,
  Award,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Eye,
  Edit,
  BarChart3,
  Target,
  Handshake,
  Heart,
  Briefcase,
  Star,
  Zap,
  Brain,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Share2,
  MessageCircle,
  Bookmark,
  TrendingDown,
  AlertCircle,
  Download,
} from 'lucide-react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Alumni {
  id: string
  name: string
  initials: string
  program: string
  graduationYear: number
  currentRole: string
  company: string
  location: string
  skills: string[]
  email: string
  phone: string
  status: 'Active' | 'Inactive' | 'Mentor'
  engagementScore: number
  referralCount: number
  profileViews: number
  lastActive: string
  isAvailableForHire: boolean
  bio: string
}

interface Opportunity {
  id: string
  title: string
  company: string
  type: 'Job' | 'Internship' | 'Freelance' | 'Mentorship' | 'Partnership'
  location: string
  skills: string[]
  postedDate: string
  deadline: string
  applicants: number
  status: 'Open' | 'Closed' | 'Urgent'
  salary?: string
  description: string
}

interface SuccessStory {
  id: string
  alumniName: string
  alumniInitials: string
  program: string
  graduationYear: number
  title: string
  content: string
  achievement: string
  company: string
  role: string
  rating: number
  date: string
}

interface Referral {
  id: string
  referrerName: string
  referrerInitials: string
  candidateName: string
  position: string
  status: 'Pending' | 'Interviewing' | 'Hired' | 'Rejected'
  date: string
  reward?: string
}

interface SkillMatch {
  id: string
  alumniName: string
  alumniInitials: string
  opportunityTitle: string
  matchScore: number
  matchingSkills: string[]
  missingSkills: string[]
  status: 'Pending' | 'Matched' | 'Applied'
}

interface EngagementMetric {
  label: string
  value: number
  change: number
  icon: React.ElementType
  color: string
}

const sampleAlumni: Alumni[] = [
  {
    id: 'AL-001',
    name: 'Chidinma Eze',
    initials: 'CE',
    program: 'Full-Stack Development',
    graduationYear: 2023,
    currentRole: 'Senior Software Engineer',
    company: 'TechCorp Nigeria',
    location: 'Lagos, Nigeria',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    email: 'chidinma.eze@email.com',
    phone: '+234 801 234 5678',
    status: 'Active',
    engagementScore: 95,
    referralCount: 8,
    profileViews: 234,
    lastActive: '2026-09-07',
    isAvailableForHire: false,
    bio: 'Passionate full-stack developer with 5+ years experience building scalable web applications.',
  },
  {
    id: 'AL-002',
    name: 'Tunde Afolabi',
    initials: 'TA',
    program: 'Digital Marketing',
    graduationYear: 2022,
    currentRole: 'Marketing Director',
    company: 'Brandify Africa',
    location: 'Abuja, Nigeria',
    skills: ['SEO', 'Content Strategy', 'Google Ads', 'Analytics', 'Social Media'],
    email: 'tunde.afolabi@email.com',
    phone: '+234 802 345 6789',
    status: 'Mentor',
    engagementScore: 88,
    referralCount: 12,
    profileViews: 189,
    lastActive: '2026-09-06',
    isAvailableForHire: false,
    bio: 'Digital marketing strategist helping brands scale across Africa through data-driven campaigns.',
  },
  {
    id: 'AL-003',
    name: 'Fatima Bello',
    initials: 'FB',
    program: 'Data Science',
    graduationYear: 2024,
    currentRole: 'Data Analyst',
    company: 'DataInsights Ltd',
    location: 'Port Harcourt, Nigeria',
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau', 'TensorFlow'],
    email: 'fatima.bello@email.com',
    phone: '+234 803 456 7890',
    status: 'Active',
    engagementScore: 82,
    referralCount: 5,
    profileViews: 156,
    lastActive: '2026-09-05',
    isAvailableForHire: true,
    bio: 'Data scientist passionate about turning raw data into actionable business insights.',
  },
  {
    id: 'AL-004',
    name: 'Emeka Nwosu',
    initials: 'EN',
    program: 'UI/UX Design',
    graduationYear: 2023,
    currentRole: 'Lead Product Designer',
    company: 'DesignHub Studios',
    location: 'Lagos, Nigeria',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'CSS'],
    email: 'emeka.nwosu@email.com',
    phone: '+234 804 567 8901',
    status: 'Active',
    engagementScore: 91,
    referralCount: 7,
    profileViews: 298,
    lastActive: '2026-09-07',
    isAvailableForHire: false,
    bio: 'Product designer creating intuitive digital experiences that users love.',
  },
  {
    id: 'AL-005',
    name: 'Aisha Abdullahi',
    initials: 'AA',
    program: 'Business Management',
    graduationYear: 2021,
    currentRole: 'Startup Founder & CEO',
    company: 'GreenTech Solutions',
    location: 'Kano, Nigeria',
    skills: ['Entrepreneurship', 'Business Strategy', 'Fundraising', 'Leadership', 'Marketing'],
    email: 'aisha.abdullahi@email.com',
    phone: '+234 805 678 9012',
    status: 'Mentor',
    engagementScore: 97,
    referralCount: 15,
    profileViews: 412,
    lastActive: '2026-09-08',
    isAvailableForHire: false,
    bio: 'Serial entrepreneur building sustainable tech solutions for African markets.',
  },
  {
    id: 'AL-006',
    name: 'Yusuf Mohammed',
    initials: 'YM',
    program: 'Cloud Computing',
    graduationYear: 2024,
    currentRole: 'DevOps Engineer',
    company: 'CloudScale Africa',
    location: 'Remote',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    email: 'yusuf.mohammed@email.com',
    phone: '+234 806 789 0123',
    status: 'Active',
    engagementScore: 76,
    referralCount: 3,
    profileViews: 145,
    lastActive: '2026-09-04',
    isAvailableForHire: true,
    bio: 'Cloud infrastructure specialist focused on building reliable and scalable systems.',
  },
  {
    id: 'AL-007',
    name: 'Grace Okonkwo',
    initials: 'GO',
    program: 'Project Management',
    graduationYear: 2022,
    currentRole: 'Senior Project Manager',
    company: 'BuildRight Construction',
    location: 'Enugu, Nigeria',
    skills: ['Agile', 'Scrum', 'Risk Management', 'Stakeholder Management', 'PMP'],
    email: 'grace.okonkwo@email.com',
    phone: '+234 807 890 1234',
    status: 'Active',
    engagementScore: 85,
    referralCount: 6,
    profileViews: 178,
    lastActive: '2026-09-06',
    isAvailableForHire: false,
    bio: 'Certified PMP with 8 years experience managing complex technology projects.',
  },
  {
    id: 'AL-008',
    name: 'Oluwaseun Adeyemi',
    initials: 'OA',
    program: 'Cybersecurity',
    graduationYear: 2023,
    currentRole: 'Security Analyst',
    company: 'CyberGuard Nigeria',
    location: 'Lagos, Nigeria',
    skills: ['Penetration Testing', 'SIEM', 'Incident Response', 'Python', 'CEH'],
    email: 'oluwaseun.adeyemi@email.com',
    phone: '+234 808 901 2345',
    status: 'Inactive',
    engagementScore: 45,
    referralCount: 2,
    profileViews: 89,
    lastActive: '2026-07-15',
    isAvailableForHire: true,
    bio: 'Cybersecurity professional protecting organizations from evolving digital threats.',
  },
]

const sampleOpportunities: Opportunity[] = [
  {
    id: 'OP-001',
    title: 'Senior React Developer',
    company: 'TechStart Africa',
    type: 'Job',
    location: 'Lagos, Nigeria',
    skills: ['React', 'TypeScript', 'GraphQL', 'Testing'],
    postedDate: '2026-09-01',
    deadline: '2026-09-30',
    applicants: 24,
    status: 'Open',
    salary: '₦3.5M - ₦5M/year',
    description: 'Join our engineering team to build next-generation fintech solutions.',
  },
  {
    id: 'OP-002',
    title: 'UX Design Intern',
    company: 'DesignHub Studios',
    type: 'Internship',
    location: 'Lagos, Nigeria',
    skills: ['Figma', 'UI Design', 'User Research'],
    postedDate: '2026-09-05',
    deadline: '2026-10-15',
    applicants: 18,
    status: 'Open',
    description: '6-month paid internship with mentorship from senior designers.',
  },
  {
    id: 'OP-003',
    title: 'AI/ML Freelance Project',
    company: 'DataInsights Ltd',
    type: 'Freelance',
    location: 'Remote',
    skills: ['Python', 'TensorFlow', 'NLP'],
    postedDate: '2026-09-03',
    deadline: '2026-09-20',
    applicants: 8,
    status: 'Urgent',
    salary: '₦2M - ₦3M',
    description: 'Build a customer sentiment analysis model for e-commerce platform.',
  },
  {
    id: 'OP-004',
    title: 'Technical Mentor',
    company: 'CTAL Academy',
    type: 'Mentorship',
    location: 'Hybrid',
    skills: ['Full-Stack Development', 'Mentoring', 'Code Review'],
    postedDate: '2026-09-01',
    deadline: '2026-12-31',
    applicants: 12,
    status: 'Open',
    description: 'Guide the next cohort of developers through their learning journey.',
  },
  {
    id: 'OP-005',
    title: 'Strategic Partnership',
    company: 'GreenTech Solutions',
    type: 'Partnership',
    location: 'Kano, Nigeria',
    skills: ['Business Development', 'Partnerships', 'Strategy'],
    postedDate: '2026-09-07',
    deadline: '2026-10-31',
    applicants: 5,
    status: 'Open',
    description: 'Partner with us to scale sustainable tech solutions across West Africa.',
  },
]

const sampleSuccessStories: SuccessStory[] = [
  {
    id: 'SS-001',
    alumniName: 'Aisha Abdullahi',
    alumniInitials: 'AA',
    program: 'Business Management',
    graduationYear: 2021,
    title: 'From Classroom to CEO: Building GreenTech Solutions',
    content: 'After completing the CTAL programme, I launched GreenTech Solutions with a focus on sustainable energy. Within 18 months, we secured ₦50M in funding and now serve over 10,000 households with clean energy solutions.',
    achievement: 'Raised ₦50M Series A funding',
    company: 'GreenTech Solutions',
    role: 'Founder & CEO',
    rating: 5,
    date: '2026-08-15',
  },
  {
    id: 'SS-002',
    alumniName: 'Chidinma Eze',
    alumniInitials: 'CE',
    program: 'Full-Stack Development',
    graduationYear: 2023,
    title: 'Landing My Dream Job at TechCorp',
    content: 'CTAL connected me with TechCorp through their alumni network. The skills I gained in the programme directly prepared me for the role. I was promoted to Senior Engineer within 18 months.',
    achievement: 'Promoted to Senior Engineer in 18 months',
    company: 'TechCorp Nigeria',
    role: 'Senior Software Engineer',
    rating: 5,
    date: '2026-07-20',
  },
  {
    id: 'SS-003',
    alumniName: 'Emeka Nwosu',
    alumniInitials: 'EN',
    program: 'UI/UX Design',
    graduationYear: 2023,
    title: 'Designing Products That Matter',
    content: 'The CTAL programme taught me more than design tools - it taught me to think user-first. Now I lead a team of 5 designers at DesignHub, creating products used by millions.',
    achievement: 'Leading a team of 5 designers',
    company: 'DesignHub Studios',
    role: 'Lead Product Designer',
    rating: 5,
    date: '2026-06-10',
  },
  {
    id: 'SS-004',
    alumniName: 'Tunde Afolabi',
    alumniInitials: 'TA',
    program: 'Digital Marketing',
    graduationYear: 2022,
    title: 'Scaling Brands Across Africa',
    content: 'CTAL gave me the foundation to understand digital marketing at scale. I now lead marketing strategy for 20+ brands, helping them reach millions of customers across the continent.',
    achievement: 'Managing 20+ brand accounts',
    company: 'Brandify Africa',
    role: 'Marketing Director',
    rating: 5,
    date: '2026-05-05',
  },
]

const sampleReferrals: Referral[] = [
  {
    id: 'REF-001',
    referrerName: 'Chidinma Eze',
    referrerInitials: 'CE',
    candidateName: 'Bola Martins',
    position: 'Frontend Developer',
    status: 'Hired',
    date: '2026-08-20',
    reward: '₦50,000',
  },
  {
    id: 'REF-002',
    referrerName: 'Aisha Abdullahi',
    referrerInitials: 'AA',
    candidateName: 'Kemi Okafor',
    position: 'Marketing Manager',
    status: 'Interviewing',
    date: '2026-09-01',
  },
  {
    id: 'REF-003',
    referrerName: 'Emeka Nwosu',
    referrerInitials: 'EN',
    candidateName: 'Tolu Adekunle',
    position: 'UI Designer',
    status: 'Pending',
    date: '2026-09-05',
  },
  {
    id: 'REF-004',
    referrerName: 'Tunde Afolabi',
    referrerInitials: 'TA',
    candidateName: 'Femi Johnson',
    position: 'Content Strategist',
    status: 'Rejected',
    date: '2026-08-15',
  },
]

const sampleSkillMatches: SkillMatch[] = [
  {
    id: 'SM-001',
    alumniName: 'Chidinma Eze',
    alumniInitials: 'CE',
    opportunityTitle: 'Senior React Developer',
    matchScore: 92,
    matchingSkills: ['React', 'TypeScript', 'Node.js'],
    missingSkills: ['GraphQL'],
    status: 'Matched',
  },
  {
    id: 'SM-002',
    alumniName: 'Fatima Bello',
    alumniInitials: 'FB',
    opportunityTitle: 'AI/ML Freelance Project',
    matchScore: 88,
    matchingSkills: ['Python', 'TensorFlow', 'Machine Learning'],
    missingSkills: ['NLP'],
    status: 'Applied',
  },
  {
    id: 'SM-003',
    alumniName: 'Yusuf Mohammed',
    alumniInitials: 'YM',
    opportunityTitle: 'Senior React Developer',
    matchScore: 45,
    matchingSkills: ['TypeScript'],
    missingSkills: ['React', 'GraphQL', 'Testing'],
    status: 'Pending',
  },
]

const statusColors: Record<string, string> = {
  Active: 'bg-success/20 text-success',
  Inactive: 'bg-text-muted/20 text-text-muted',
  Mentor: 'bg-primary/20 text-primary',
  Open: 'bg-success/20 text-success',
  Closed: 'bg-text-muted/20 text-text-muted',
  Urgent: 'bg-secondary/20 text-secondary',
  Pending: 'bg-warning/20 text-warning',
  Interviewing: 'bg-primary/20 text-primary',
  Hired: 'bg-success/20 text-success',
  Rejected: 'bg-error/20 text-error',
  Matched: 'bg-success/20 text-success',
  Applied: 'bg-primary/20 text-primary',
}

const opportunityTypeColors: Record<string, string> = {
  Job: 'bg-primary/10 text-primary',
  Internship: 'bg-success/10 text-success',
  Freelance: 'bg-warning/10 text-warning',
  Mentorship: 'bg-secondary/10 text-secondary',
  Partnership: 'bg-purple-500/10 text-purple-400',
}

export default function AlumniPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [activeTab, setActiveTab] = useState<'directory' | 'opportunities' | 'stories' | 'referrals' | 'matching'>('directory')
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  const filteredAlumni = sampleAlumni.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === 'All' || alumni.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalAlumni = sampleAlumni.length
  const activeAlumni = sampleAlumni.filter((a) => a.status === 'Active').length
  const totalReferrals = sampleReferrals.length
  const hiredReferrals = sampleReferrals.filter((r) => r.status === 'Hired').length

  const nextStory = useCallback(() => {
    setCurrentStoryIndex((prev) => (prev + 1) % sampleSuccessStories.length)
  }, [])

  const prevStory = useCallback(() => {
    setCurrentStoryIndex((prev) => (prev - 1 + sampleSuccessStories.length) % sampleSuccessStories.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextStory, 6000)
    return () => clearInterval(interval)
  }, [nextStory])

  const stats = [
    {
      title: 'Total Alumni',
      value: totalAlumni.toString(),
      change: '+12.5%',
      trend: 'up' as const,
      icon: Users,
      color: 'primary',
    },
    {
      title: 'Active This Month',
      value: activeAlumni.toString(),
      change: '+8.3%',
      trend: 'up' as const,
      icon: Heart,
      color: 'success',
    },
    {
      title: 'Referrals Made',
      value: totalReferrals.toString(),
      change: '+25%',
      trend: 'up' as const,
      icon: Share2,
      color: 'secondary',
    },
    {
      title: 'Partnerships',
      value: '8',
      change: '+2',
      trend: 'up' as const,
      icon: Handshake,
      color: 'warning',
    },
  ]

  const engagementMetrics: EngagementMetric[] = [
    { label: 'Profile Views', value: 1501, change: 15.3, icon: Eye, color: 'primary' },
    { label: 'Connections Made', value: 342, change: 22.1, icon: Users, color: 'success' },
    { label: 'Opportunities Shared', value: 89, change: 18.7, icon: Briefcase, color: 'secondary' },
    { label: 'Mentorship Sessions', value: 56, change: 10.5, icon: Brain, color: 'warning' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
            Alumni & Community Management
          </h1>
          <p className="text-text-muted">
            Connect with alumni, discover opportunities, and grow your professional network.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="primary" size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Alumni
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-muted text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-success" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-error" />
                    )}
                    <span
                      className={`text-sm ${
                        stat.trend === 'up' ? 'text-success' : 'text-error'
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-text-muted text-sm">vs last month</span>
                  </div>
                </div>
                <div
                  className={cn(
                    'p-3 rounded-xl',
                    stat.color === 'primary' && 'bg-primary/10',
                    stat.color === 'success' && 'bg-success/10',
                    stat.color === 'warning' && 'bg-warning/10',
                    stat.color === 'secondary' && 'bg-secondary/10'
                  )}
                >
                  <stat.icon
                    className={cn(
                      'w-6 h-6',
                      stat.color === 'primary' && 'text-primary',
                      stat.color === 'success' && 'text-success',
                      stat.color === 'warning' && 'text-warning',
                      stat.color === 'secondary' && 'text-secondary'
                    )}
                  />
                </div>
              </div>
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 h-1',
                  stat.color === 'primary' && 'bg-gradient-to-r from-primary to-primary-light',
                  stat.color === 'success' && 'bg-gradient-to-r from-success to-emerald-400',
                  stat.color === 'warning' && 'bg-gradient-to-r from-warning to-amber-400',
                  stat.color === 'secondary' && 'bg-gradient-to-r from-secondary to-secondary-light'
                )}
              />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs & Content */}
        <div className="lg:col-span-3">
          {/* Tab Buttons */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
            {[
              { key: 'directory' as const, label: 'Alumni Directory', icon: Users },
              { key: 'opportunities' as const, label: 'Opportunities', icon: Briefcase },
              { key: 'stories' as const, label: 'Success Stories', icon: Star },
              { key: 'referrals' as const, label: 'Referrals', icon: Share2 },
              { key: 'matching' as const, label: 'AI Matching', icon: Sparkles },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all relative whitespace-nowrap',
                  activeTab === tab.key
                    ? 'bg-primary text-white'
                    : 'bg-surface-light text-text-muted hover:text-white hover:bg-surface-light/80'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Alumni Directory Tab */}
          <AnimatePresence mode="wait">
            {activeTab === 'directory' && (
              <motion.div
                key="directory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Search & Filters */}
                <Card hover={false} className="mb-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type="text"
                        placeholder="Search alumni by name, role, company, or skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-surface-light border border-white/5 rounded-xl text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className={cn(showFilters && 'bg-primary/10 text-primary')}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 ml-2 transition-transform',
                          showFilters && 'rotate-180'
                        )}
                      />
                    </Button>
                  </div>

                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-4 pt-4 mt-4 border-t border-white/5">
                          <div className="flex-1 min-w-[200px]">
                            <label className="text-sm text-text-muted mb-2 block">Status</label>
                            <select
                              value={statusFilter}
                              onChange={(e) => setStatusFilter(e.target.value)}
                              className="w-full px-4 py-2.5 bg-surface-light border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                            >
                              <option value="All">All Status</option>
                              <option value="Active">Active</option>
                              <option value="Mentor">Mentor</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          </div>
                          <div className="flex items-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSearchQuery('')
                                setStatusFilter('All')
                              }}
                            >
                              Clear Filters
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>

                {/* Alumni Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAlumni.map((alumni, index) => (
                    <motion.div
                      key={alumni.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card>
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {alumni.initials}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold">{alumni.name}</h3>
                                <p className="text-sm text-text-muted">{alumni.currentRole}</p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {alumni.isAvailableForHire && (
                                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-success/20 text-success">
                                    Available
                                  </span>
                                )}
                                <span
                                  className={cn(
                                    'px-3 py-1 rounded-full text-xs font-medium',
                                    statusColors[alumni.status]
                                  )}
                                >
                                  {alumni.status}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 mt-2 text-sm text-text-muted flex-wrap">
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-3.5 h-3.5" />
                                {alumni.company}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {alumni.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                Class of {alumni.graduationYear}
                              </span>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {alumni.skills.slice(0, 4).map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary"
                                >
                                  {skill}
                                </span>
                              ))}
                              {alumni.skills.length > 4 && (
                                <span className="px-2 py-0.5 rounded-full text-xs bg-surface-light text-text-muted">
                                  +{alumni.skills.length - 4}
                                </span>
                              )}
                            </div>

                            {/* Engagement Metrics */}
                            <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {alumni.profileViews} views
                              </span>
                              <span className="flex items-center gap-1">
                                <Share2 className="w-3 h-3" />
                                {alumni.referralCount} referrals
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                {alumni.engagementScore}%
                              </span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-4">
                              <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                                <Eye className="w-4 h-4 text-text-muted hover:text-primary" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                                <Edit className="w-4 h-4 text-text-muted hover:text-primary" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                                <Mail className="w-4 h-4 text-text-muted hover:text-primary" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-surface-light transition-colors">
                                <MessageCircle className="w-4 h-4 text-text-muted hover:text-primary" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {filteredAlumni.length === 0 && (
                  <Card hover={false} className="text-center py-12">
                    <Users className="w-12 h-12 text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No alumni found</h3>
                    <p className="text-text-muted">Try adjusting your search or filter criteria.</p>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Opportunities Tab */}
            {activeTab === 'opportunities' && (
              <motion.div
                key="opportunities"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Opportunity Board
                    </h2>
                    <Button variant="primary" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Post Opportunity
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {sampleOpportunities.map((opportunity, index) => (
                      <motion.div
                        key={opportunity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-surface-light hover:bg-surface-light/80 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-medium">{opportunity.title}</h3>
                              <span
                                className={cn(
                                  'px-2 py-0.5 rounded-full text-xs font-medium',
                                  opportunityTypeColors[opportunity.type]
                                )}
                              >
                                {opportunity.type}
                              </span>
                              <span
                                className={cn(
                                  'px-2 py-0.5 rounded-full text-xs font-medium',
                                  statusColors[opportunity.status]
                                )}
                              >
                                {opportunity.status}
                              </span>
                            </div>
                            <p className="text-sm text-text-muted mt-1">{opportunity.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-text-muted flex-wrap">
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-3.5 h-3.5" />
                                {opportunity.company}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {opportunity.location}
                              </span>
                              {opportunity.salary && (
                                <span className="flex items-center gap-1 text-success">
                                  <TrendingUp className="w-3.5 h-3.5" />
                                  {opportunity.salary}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" />
                                {opportunity.applicants} applicants
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                Deadline: {opportunity.deadline}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {opportunity.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button className="p-2 rounded-lg hover:bg-surface-light transition-colors shrink-0">
                            <Eye className="w-4 h-4 text-text-muted hover:text-primary" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Success Stories Tab */}
            {activeTab === 'stories' && (
              <motion.div
                key="stories"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* Main Featured Story */}
                <Card className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Star className="w-5 h-5 text-warning" />
                        Success Stories
                      </h2>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevStory}
                          className="p-2 rounded-lg hover:bg-surface-light transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5 text-text-muted" />
                        </button>
                        <span className="text-sm text-text-muted">
                          {currentStoryIndex + 1} / {sampleSuccessStories.length}
                        </span>
                        <button
                          onClick={nextStory}
                          className="p-2 rounded-lg hover:bg-surface-light transition-colors"
                        >
                          <ChevronRight className="w-5 h-5 text-text-muted" />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStoryIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shrink-0">
                            {sampleSuccessStories[currentStoryIndex].alumniInitials}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-xl font-semibold">
                                {sampleSuccessStories[currentStoryIndex].title}
                              </h3>
                              <div className="flex gap-0.5">
                                {[...Array(sampleSuccessStories[currentStoryIndex].rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-text-muted mt-1">
                              {sampleSuccessStories[currentStoryIndex].alumniName} •{' '}
                              {sampleSuccessStories[currentStoryIndex].program} •{' '}
                              Class of {sampleSuccessStories[currentStoryIndex].graduationYear}
                            </p>
                            <p className="mt-4 text-white/90 leading-relaxed">
                              {sampleSuccessStories[currentStoryIndex].content}
                            </p>
                            <div className="mt-4 p-3 rounded-xl bg-primary/10 inline-block">
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-primary">
                                  {sampleSuccessStories[currentStoryIndex].achievement}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 mt-3 text-sm text-text-muted">
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-3.5 h-3.5" />
                                {sampleSuccessStories[currentStoryIndex].role} at{' '}
                                {sampleSuccessStories[currentStoryIndex].company}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {sampleSuccessStories[currentStoryIndex].date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </Card>

                {/* Story Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sampleSuccessStories.map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shrink-0">
                            {story.alumniInitials}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{story.title}</h3>
                            <p className="text-xs text-text-muted mt-1">
                              {story.alumniName} • {story.company}
                            </p>
                            <p className="text-sm text-white/80 mt-2 line-clamp-3">
                              {story.content}
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              <div className="flex gap-0.5">
                                {[...Array(story.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-warning fill-warning" />
                                ))}
                              </div>
                              <span className="text-xs text-text-muted">{story.date}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Referrals Tab */}
            {activeTab === 'referrals' && (
              <motion.div
                key="referrals"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-secondary" />
                      Referral Tracking
                    </h2>
                    <Button variant="primary" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      New Referral
                    </Button>
                  </div>

                  {/* Referral Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'Total Referrals', value: totalReferrals, color: 'primary' },
                      { label: 'Hired', value: hiredReferrals, color: 'success' },
                      { label: 'Success Rate', value: `${Math.round((hiredReferrals / totalReferrals) * 100)}%`, color: 'warning' },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-surface-light text-center"
                      >
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {sampleReferrals.map((referral, index) => (
                      <motion.div
                        key={referral.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-surface-light hover:bg-surface-light/80 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shrink-0">
                              {referral.referrerInitials}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-medium text-sm">{referral.candidateName}</h3>
                                <span
                                  className={cn(
                                    'px-2 py-0.5 rounded-full text-xs font-medium',
                                    statusColors[referral.status]
                                  )}
                                >
                                  {referral.status}
                                </span>
                              </div>
                              <p className="text-xs text-text-muted mt-1">
                                Referred by {referral.referrerName} for {referral.position}
                              </p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            {referral.reward && (
                              <p className="text-sm text-success font-medium">{referral.reward}</p>
                            )}
                            <p className="text-xs text-text-muted">{referral.date}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* AI Matching Tab */}
            {activeTab === 'matching' && (
              <motion.div
                key="matching"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* AI Matching Header */}
                <Card className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-secondary/10 to-transparent rounded-bl-full" />
                  <div className="relative flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">AI Skill Matching</h2>
                      <p className="text-sm text-text-muted mt-1">
                        Our AI analyzes alumni skills, experience, and preferences to match them with the best opportunities.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Match Cards */}
                <div className="space-y-3">
                  {sampleSkillMatches.map((match, index) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {match.alumniInitials}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-semibold">{match.alumniName}</h3>
                                  <span
                                    className={cn(
                                      'px-2 py-0.5 rounded-full text-xs font-medium',
                                      statusColors[match.status]
                                    )}
                                  >
                                    {match.status}
                                  </span>
                                </div>
                                <p className="text-sm text-text-muted mt-1">
                                  Matched with: {match.opportunityTitle}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <div className="text-2xl font-bold text-primary">{match.matchScore}%</div>
                                <p className="text-xs text-text-muted">Match Score</p>
                              </div>
                            </div>

                            {/* Match Score Bar */}
                            <div className="mt-3">
                              <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${match.matchScore}%` }}
                                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                                  className={cn(
                                    'h-full rounded-full',
                                    match.matchScore >= 80
                                      ? 'bg-gradient-to-r from-success to-emerald-400'
                                      : match.matchScore >= 60
                                      ? 'bg-gradient-to-r from-primary to-primary-light'
                                      : 'bg-gradient-to-r from-warning to-amber-400'
                                  )}
                                />
                              </div>
                            </div>

                            {/* Skills */}
                            <div className="mt-3 space-y-2">
                              <div className="flex flex-wrap gap-1.5">
                                <span className="text-xs text-text-muted mr-1">Matching:</span>
                                {match.matchingSkills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-2 py-0.5 rounded-full text-xs bg-success/10 text-success"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                              {match.missingSkills.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                  <span className="text-xs text-text-muted mr-1">Missing:</span>
                                  {match.missingSkills.map((skill) => (
                                    <span
                                      key={skill}
                                      className="px-2 py-0.5 rounded-full text-xs bg-warning/10 text-warning"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: 'Add Alumni', icon: UserPlus, color: 'text-primary', bg: 'bg-primary/10' },
                { label: 'View Opportunities', icon: Briefcase, color: 'text-success', bg: 'bg-success/10' },
                { label: 'Match Skills', icon: Sparkles, color: 'text-secondary', bg: 'bg-secondary/10' },
                { label: 'Send Newsletter', icon: Mail, color: 'text-warning', bg: 'bg-warning/10' },
                { label: 'Schedule Event', icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
                { label: 'Generate Report', icon: BarChart3, color: 'text-success', bg: 'bg-success/10' },
              ].map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-light hover:bg-primary/10 transition-all duration-200 group text-left"
                >
                  <div className={cn('p-2 rounded-lg', action.bg)}>
                    <action.icon className={cn('w-4 h-4', action.color)} />
                  </div>
                  <span className="text-sm text-text-muted group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </Card>

          {/* Engagement Metrics */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Engagement Metrics</h2>
            <div className="space-y-4">
              {engagementMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'p-2 rounded-lg',
                        metric.color === 'primary' && 'bg-primary/10',
                        metric.color === 'success' && 'bg-success/10',
                        metric.color === 'secondary' && 'bg-secondary/10',
                        metric.color === 'warning' && 'bg-warning/10'
                      )}
                    >
                      <metric.icon
                        className={cn(
                          'w-4 h-4',
                          metric.color === 'primary' && 'text-primary',
                          metric.color === 'success' && 'text-success',
                          metric.color === 'secondary' && 'text-secondary',
                          metric.color === 'warning' && 'text-warning'
                        )}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">{metric.label}</p>
                      <p className="font-semibold">{metric.value.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3 text-success" />
                    <span className="text-xs text-success">{metric.change}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Top Alumni */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Top Alumni</h2>
            <div className="space-y-3">
              {sampleAlumni
                .sort((a, b) => b.engagementScore - a.engagementScore)
                .slice(0, 4)
                .map((alumni, index) => (
                  <motion.div
                    key={alumni.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-light transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {alumni.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{alumni.name}</p>
                      <p className="text-xs text-text-muted truncate">{alumni.currentRole}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-primary">{alumni.engagementScore}%</p>
                      <div className="flex gap-0.5 justify-end">
                        {[...Array(Math.floor(alumni.engagementScore / 20))].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 text-warning fill-warning" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </Card>

          {/* Skills Distribution */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Top Skills</h2>
            <div className="space-y-3">
              {[
                { skill: 'React', count: 8, color: 'bg-primary' },
                { skill: 'Python', count: 6, color: 'bg-success' },
                { skill: 'TypeScript', count: 5, color: 'bg-secondary' },
                { skill: 'Node.js', count: 5, color: 'bg-warning' },
                { skill: 'Figma', count: 4, color: 'bg-purple-500' },
                { skill: 'AWS', count: 4, color: 'bg-cyan-500' },
              ].map((skill, index) => (
                <motion.div
                  key={skill.skill}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-muted">{skill.skill}</span>
                    <span className="font-medium">{skill.count}</span>
                  </div>
                  <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(skill.count / 10) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className={cn('h-full rounded-full', skill.color)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
