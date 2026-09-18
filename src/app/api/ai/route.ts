import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { prisma } from '@/lib/prisma'

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

async function getBusinessContext() {
  try {
    const [customerCount, leadCount, programCount, staffCount, ticketCount, revenue, recentLeads, activePrograms, openTickets] = await Promise.all([
      prisma.customer.count(),
      prisma.lead.count({ where: { status: { notIn: ['WON', 'LOST', 'UNQUALIFIED'] } } }),
      prisma.program.count({ where: { isActive: true } }),
      prisma.staff.count({ where: { status: 'ACTIVE' } }),
      prisma.supportTicket.count({ where: { status: { in: ['OPEN', 'IN_PROGRESS'] } } }),
      prisma.payment.aggregate({ where: { status: 'SUCCESSFUL' }, _sum: { amount: true } }),
      prisma.lead.findMany({ take: 5, orderBy: { createdAt: 'desc' }, select: { name: true, source: true, score: true, status: true } }),
      prisma.program.findMany({ where: { isActive: true }, select: { name: true, _count: { select: { enrollments: true } } } }),
      prisma.supportTicket.findMany({ where: { status: { in: ['OPEN', 'IN_PROGRESS'] } }, take: 5, select: { subject: true, priority: true, status: true } }),
    ])

    return `
CURRENT BUSINESS DATA (Live from database):
- Total Customers: ${customerCount}
- Active Leads: ${leadCount}
- Active Programmes: ${programCount}
- Active Staff: ${staffCount}
- Open Support Tickets: ${ticketCount}
- Total Revenue: ₦${(revenue._sum.amount || 0).toLocaleString()}

Recent Leads: ${recentLeads.map(l => `${l.name} (${l.source}, Score: ${l.score}, ${l.status})`).join('; ') || 'None'}

Active Programmes: ${activePrograms.map(p => `${p.name} (${p._count.enrollments} enrolled)`).join('; ') || 'None'}

Open Tickets: ${openTickets.map(t => `${t.subject} [${t.priority}]`).join('; ') || 'None'}
`
  } catch {
    return 'Business data unavailable at this time.'
  }
}

export async function POST(request: Request) {
  try {
    const { message, context, agent } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' },
        { status: 500 }
      )
    }

    const businessContext = await getBusinessContext()

    const systemPrompts: Record<string, string> = {
      growth: `You are the Growth Agent for CTAL (CoreSkills Transformational Academy). 
        You specialize in marketing, lead generation, qualification, sales and conversion.
        You have access to live business data. Use it to provide specific, actionable insights.
        Help users with lead scoring, campaign optimization, sales forecasting, and conversion tracking.
        Be concise, professional, and focused on growth metrics. Always reference specific numbers from the data.`,
      
      'customer-success': `You are the Customer Success Agent for CTAL.
        You specialize in CRM, onboarding, support, customer experience and retention.
        You have access to live customer data. Use it to identify at-risk customers and suggest actions.
        Help users with customer health scoring, churn prediction, onboarding automation, and support routing.
        Be empathetic, solution-oriented, and customer-focused.`,
      
      learning: `You are the Learning Agent for CTAL.
        You specialize in training programmes, participant engagement, assessments and learning workflows.
        You have access to live programme data. Use it to track progress and suggest improvements.
        Help users with adaptive learning, progress tracking, content recommendations, and assessment analysis.
        Be educational, supportive, and focused on learning outcomes.`,
      
      community: `You are the Community Agent for CTAL.
        You specialize in alumni engagement, networking, opportunities and referrals.
        Help users with skill matching, opportunity matching, engagement analysis, and referral tracking.
        Be networking-focused, collaborative, and community-oriented.`,
      
      operations: `You are the Operations Agent for CTAL.
        You specialize in tasks, projects, SOPs, deadlines and operational coordination.
        You have access to live project and task data. Use it to identify bottlenecks and suggest optimizations.
        Be organized, efficient, and process-oriented.`,
      
      finance: `You are the Finance Agent for CTAL.
        You specialize in payments, invoices, revenue tracking, financial alerts and reporting.
        You have access to live financial data. Use it to provide accurate revenue insights and cash flow analysis.
        Be precise, analytical, and financially focused. Always reference specific amounts.`,
      
      people: `You are the People Agent for CTAL.
        You specialize in recruitment, onboarding, staff records, KPIs, performance and workload.
        You have access to live staff data. Use it to provide workforce insights.
        Be people-oriented, fair, and development-focused.`,
      
      'ceo-intelligence': `You are the CEO Intelligence Agent for CTAL.
        You specialize in executive dashboards, insights, alerts, summaries and decision support.
        You have access to ALL live business data. Synthesize it into executive-level insights.
        Be strategic, insightful, and executive-focused. Always lead with the most important numbers.`,
    }

    const systemPrompt = systemPrompts[agent] || systemPrompts['ceo-intelligence']

    const messages: Array<{ role: 'system' | 'user'; content: string }> = [
      { role: 'system', content: systemPrompt },
      { role: 'system', content: businessContext },
    ]
    
    if (context) {
      messages.push({ role: 'system', content: `Additional Context: ${context}` })
    }
    
    messages.push({ role: 'user', content: message })

    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 1500,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.'

    // Log the AI interaction
    try {
      const defaultAgent = await prisma.aIAgent.findFirst({ where: { name: `${agent || 'CEO Intelligence'} Agent` } })
      if (defaultAgent) {
        await prisma.agentLog.create({
          data: {
            agentId: defaultAgent.id,
            action: 'chat',
            input: { message, agent },
            output: { response: response.substring(0, 500) },
            tokenUsage: completion.usage?.total_tokens || 0,
            duration: 0,
            status: 'SUCCESS',
          },
        })
      }
    } catch {
      // Don't fail the request if logging fails
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('AI API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    )
  }
}
