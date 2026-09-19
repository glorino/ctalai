import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        _count: { select: { leads: true, emailSequences: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const total = campaigns.length
    const active = campaigns.filter(c => c.status === 'ACTIVE').length
    const draft = campaigns.filter(c => c.status === 'DRAFT').length
    const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0)

    const stats = [
      { title: 'Total Campaigns', value: total, change: '+2 this month', changeType: 'up' as const },
      { title: 'Active', value: active, change: `${Math.round((active / (total || 1)) * 100)}%`, changeType: 'neutral' as const },
      { title: 'Drafts', value: draft, change: 'Pending review', changeType: 'neutral' as const },
      { title: 'Total Budget', value: `$${totalBudget.toLocaleString()}`, change: 'All campaigns', changeType: 'neutral' as const },
    ]

    const funnel = [
      { stage: 'Impressions', value: 12400, pct: 100 },
      { stage: 'Clicks', value: 3200, pct: 25.8 },
      { stage: 'Leads', value: 840, pct: 6.8 },
      { stage: 'Conversions', value: 210, pct: 1.7 },
    ]

    const enrichedCampaigns = campaigns.map(c => {
      const metrics = (c.metrics as Record<string, any>) || {}
      return {
        name: c.name,
        status: c.status,
        channel: c.type,
        audience: c.targetAudience || 'General',
        reach: metrics.reach || 0,
        engagement: metrics.engagement || 0,
        conversions: metrics.conversions || 0,
        revenue: metrics.revenue || '$0',
      }
    })

    return NextResponse.json({ campaigns: enrichedCampaigns, stats, funnel })
  } catch (error) {
    console.error('Marketing API error:', error)
    return NextResponse.json({ error: 'Failed to fetch marketing data' }, { status: 500 })
  }
}
