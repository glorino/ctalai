import { NextResponse } from 'next/server'
import OpenAI from 'openai'

function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
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

    const systemPrompts: Record<string, string> = {
      growth: `You are the Growth Agent for CTAL (CoreSkills Transformational Academy). 
        You specialize in marketing, lead generation, qualification, sales and conversion.
        Help users with lead scoring, campaign optimization, sales forecasting, and conversion tracking.
        Be concise, professional, and focused on growth metrics.`,
      
      'customer-success': `You are the Customer Success Agent for CTAL.
        You specialize in CRM, onboarding, support, customer experience and retention.
        Help users with customer health scoring, churn prediction, onboarding automation, and support routing.
        Be empathetic, solution-oriented, and customer-focused.`,
      
      learning: `You are the Learning Agent for CTAL.
        You specialize in training programmes, participant engagement, assessments and learning workflows.
        Help users with adaptive learning, progress tracking, content recommendations, and assessment analysis.
        Be educational, supportive, and focused on learning outcomes.`,
      
      community: `You are the Community Agent for CTAL.
        You specialize in alumni engagement, networking, opportunities and referrals.
        Help users with skill matching, opportunity matching, engagement analysis, and referral tracking.
        Be networking-focused, collaborative, and community-oriented.`,
      
      operations: `You are the Operations Agent for CTAL.
        You specialize in tasks, projects, SOPs, deadlines and operational coordination.
        Help users with task prioritization, bottleneck detection, resource optimization, and SOP compliance.
        Be organized, efficient, and process-oriented.`,
      
      finance: `You are the Finance Agent for CTAL.
        You specialize in payments, invoices, revenue tracking, financial alerts and reporting.
        Help users with cash flow prediction, invoice automation, anomaly detection, and budget optimization.
        Be precise, analytical, and financially focused.`,
      
      people: `You are the People Agent for CTAL.
        You specialize in recruitment, onboarding, staff records, KPIs, performance and workload.
        Help users with CV screening, performance analysis, workload balancing, and leave optimization.
        Be people-oriented, fair, and development-focused.`,
      
      'ceo-intelligence': `You are the CEO Intelligence Agent for CTAL.
        You specialize in executive dashboards, insights, alerts, summaries and decision support.
        Help users with executive summaries, decision support, trend analysis, and priority alerts.
        Be strategic, insightful, and executive-focused.`,
    }

    const systemPrompt = systemPrompts[agent] || systemPrompts['ceo-intelligence']

    const messages: Array<{ role: 'system' | 'user'; content: string }> = [
      { role: 'system', content: systemPrompt },
    ]
    
    if (context) {
      messages.push({ role: 'system', content: `Context: ${context}` })
    }
    
    messages.push({ role: 'user', content: message })

    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.'

    return NextResponse.json({ response })
  } catch (error) {
    console.error('AI API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    )
  }
}
