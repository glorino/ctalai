import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'NGN') {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string) {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function generateInvoiceNumber() {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `CTAL-${year}${month}-${random}`
}

export function calculateLeadScore(lead: {
  source?: string
  interactions?: number
  openedEmail?: boolean
  clickedLink?: boolean
  visitedPage?: boolean
}) {
  let score = 0
  
  // Source scoring
  const sourceScores: Record<string, number> = {
    REFERRAL: 30,
    WEBINAR: 25,
    WEBSITE: 20,
    LANDING_PAGE: 20,
    SOCIAL_MEDIA: 15,
    ORGANIC: 15,
    PAID_AD: 10,
    OTHER: 5,
  }
  
  if (lead.source && sourceScores[lead.source]) {
    score += sourceScores[lead.source]
  }
  
  // Engagement scoring
  if (lead.interactions) score += Math.min(lead.interactions * 5, 30)
  if (lead.openedEmail) score += 10
  if (lead.clickedLink) score += 15
  if (lead.visitedPage) score += 15
  
  return Math.min(score, 100)
}
