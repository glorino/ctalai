const XLSX = require('xlsx');
const path = require('path');

const wb = XLSX.utils.book_new();
const NAVY = '1A3C6D';
const BLUE = '2E75B6';
const LTBLUE = 'D6E4F0';
const GREEN = 'C6EFCE';
const GOLD = 'FFF2CC';
const WHITE = 'FFFFFF';
const DARK = '333333';
const GRAY = '777777';
const LIME = 'E2EFDA';
const PEACH = 'FCE4D6';
const LAVENDER = 'E2D1F0';

function hdr(h) {
  return h.map(v => ({
    t: 's', v: v,
    s: { font: { bold: true, color: { rgb: WHITE }, sz: 10 }, fill: { fgColor: { rgb: BLUE } }, alignment: { horizontal: 'center', vertical: 'center', wrapText: true } }
  }));
}

function c(val, o) {
  o = o || {};
  var isN = typeof val === 'number';
  var s = { font: { color: { rgb: o.fc || DARK }, bold: !!o.bold, sz: 10 } };
  s.alignment = { horizontal: isN ? 'right' : (o.center ? 'center' : 'left'), vertical: 'center', wrapText: true };
  if (o.fill) s.fill = { fgColor: { rgb: o.fill } };
  if (o.grn) { s.fill = { fgColor: { rgb: GREEN } }; s.font.color = { rgb: '006100' }; s.font.bold = true; }
  if (o.gld) { s.fill = { fgColor: { rgb: GOLD } }; s.font.color = { rgb: '9C6500' }; s.font.bold = true; }
  if (isN) s.numFmt = '#,##0';
  return { t: isN ? 'n' : 's', v: val, s: s };
}

function sec(text) {
  return [{ t: 's', v: text, s: { font: { bold: true, sz: 11, color: { rgb: NAVY } } } }];
}

var d = [];
var sn = 0;

// Title
d.push([{ t: 's', v: 'CTAL AI - Complete Feature & Pricing Breakdown', s: { font: { bold: true, sz: 14, color: { rgb: NAVY } }, alignment: { horizontal: 'center' } } }]);
d.push([{ t: 's', v: 'CoreSkills Transformational Academy Limited | All prices in NGN | VAT 7.5% included | Exchange rate: NGN 1,500/USD', s: { font: { italic: true, sz: 9, color: { rgb: GRAY } }, alignment: { horizontal: 'center' } } }]);
d.push([null]);

// ======== SECTION 1: PRICING PLANS ========
d.push(sec('1. PRICING PLANS'));
d.push(hdr(['S/N', 'DESCRIPTION', 'PRICE (NGN)', 'TOTAL COST (NGN)']));

sn=1; d.push([c(sn, {center:true}), c('Starter Plan - Monthly (500 contacts, 1 AI agent, Basic CRM, Email support)', {bold:true}), c(50000), c(50000)]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Growth Plan - Monthly (5,000 contacts, 4 AI agents, Full CRM, Priority support, Analytics)', {bold:true, fill:LTBLUE}), c(150000, {fill:LTBLUE}), c(150000, {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Enterprise Plan - Monthly (Unlimited contacts, 8 AI agents, Dedicated manager, SLA 99.9%)', {bold:true}), c('Custom'), c('Custom')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Starter Plan - Annual (20% savings)', {fill:LTBLUE}), c(40000, {fill:LTBLUE}), c(480000, {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Growth Plan - Annual (20% savings)'), c(120000), c(1440000)]);
d.push([null]);

// ======== SECTION 2: 8 AI AGENTS ========
d.push(sec('2. AI AGENTS (Included in Plans)'));
d.push(hdr(['S/N', 'DESCRIPTION', 'PRICE (NGN)', 'TOTAL COST (NGN)']));

sn++; d.push([c(sn, {center:true}), c('Growth Agent - Lead scoring, campaign optimization, sales forecasting, conversion tracking'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Customer Success Agent - Churn prediction, onboarding automation, support routing, health scoring', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Learning Agent - Adaptive learning, progress tracking, content recommendations, assessments'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Community Agent - Skill matching, opportunity matching, engagement analysis, referrals', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Operations Agent - Task prioritization, bottleneck detection, resource optimization, SOP compliance'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Finance Agent - Cash flow prediction, invoice automation, anomaly detection, budget optimization', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('People Agent - CV screening, performance analysis, workload balancing, leave optimization'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('CEO Intelligence Agent - Executive summaries, decision support, trend analysis, priority alerts', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
d.push([null]);

// ======== SECTION 3: PLATFORM MODULES ========
d.push(sec('3. PLATFORM MODULES (22 Modules)'));
d.push(hdr(['S/N', 'DESCRIPTION', 'PRICE (NGN)', 'TOTAL COST (NGN)']));

// Marketing
sn++; d.push([c(sn, {center:true}), c('Lead Generation & Marketing - Automated lead capture, scoring, segmentation across all channels'), c('Included'), c('Included')]);
// Sales
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Sales & Conversion - Pipeline management, automated follow-ups, opportunity detection', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
// CRM
sn++; d.push([c(sn, {center:true}), c('CRM - 360-degree customer profiles, single source of truth'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Customer Onboarding - Automated welcome sequences, forms, orientation workflows', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Customer Retention - Re-engagement campaigns, churn alerts, lifetime value tracking'), c('Included'), c('Included')]);
// Learning
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Training Programme Management - Cohort management, attendance tracking, certificates', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Coaching & Mentoring - Client matching, scheduling, action plans, progress tracking'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Course Development - Training needs assessment, curriculum design, QA workflows', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
// Support
sn++; d.push([c(sn, {center:true}), c('Live Q&A & Customer Support - Automated FAQ, ticketing, escalation workflows'), c('Included'), c('Included')]);
// Community
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Alumni & Community - Alumni network, opportunities, AI-powered skill matching', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
// Analytics
sn++; d.push([c(sn, {center:true}), c('Feedback & Satisfaction - Surveys, sentiment analysis, performance monitoring'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Business Intelligence - Executive dashboards, trend detection, KPI alerts', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Marketing Analytics - Channel tracking, customer insights, campaign optimization'), c('Included'), c('Included')]);
// Operations
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Content & Knowledge - Central knowledge base, AI-powered content repurposing', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Project Management - Task assignment, milestones, risks, budget tracking'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('SOPs & Documents - Repository with AI retrieval and version control', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Risk & Exception Management - Alerts, monitoring, automated escalation'), c('Included'), c('Included')]);
// Finance
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Finance & Payments - Invoicing, payment tracking, revenue analytics, cash flow alerts', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
// HR
sn++; d.push([c(sn, {center:true}), c('HR & Staff Management - Recruitment, onboarding, KPIs, performance tracking'), c('Included'), c('Included')]);
// Intelligence
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('CEO & Executive Assistant - Daily briefings, meeting prep, executive dashboards', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
// Growth
sn++; d.push([c(sn, {center:true}), c('Partnerships - Partner database, MoU tracking, performance reporting'), c('Included'), c('Included')]);
d.push([null]);

// ======== SECTION 4: 12-STEP CUSTOMER JOURNEY ========
d.push(sec('4. AUTOMATED CUSTOMER JOURNEY (12 Steps)'));
d.push(hdr(['S/N', 'DESCRIPTION', 'PRICE (NGN)', 'TOTAL COST (NGN)']));

sn++; d.push([c(sn, {center:true}), c('Step 1: Lead Entry - Lead enters CTAL ecosystem (instant, Growth Agent)'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Step 2: AI Qualification - AI qualifies and segments the lead (<30 seconds)', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Step 3: CRM Profile - Customer profile created or updated (automatic)'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Step 4: AI Nurturing - AI nurtures and recommends next action (ongoing)', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Step 5: Registration - Customer registers and pays (<5 minutes)'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Step 6: Onboarding - Automated onboarding begins (1-3 days)', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Step 7: Programme Delivery - Delivery and engagement monitored'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Step 8: Human Support - Human team intervenes for high-touch support', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Step 9: Feedback - Feedback and satisfaction data collected'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Step 10: Alumni - Customer joins alumni/community ecosystem', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Step 11: AI Recommendation - AI recommends next opportunity'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Step 12: Growth - Customer returns, refers, collaborates, partners', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
d.push([null]);

// ======== SECTION 5: DASHBOARD MODULES ========
d.push(sec('5. DASHBOARD MODULES (15 Sections)'));
d.push(hdr(['S/N', 'DESCRIPTION', 'PRICE (NGN)', 'TOTAL COST (NGN)']));

sn++; d.push([c(sn, {center:true}), c('Dashboard Home - KPIs, activity feed, upcoming tasks, quick actions, AI agent status'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('CRM Dashboard - Customer list, search/filter, stats, customer types', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Leads Dashboard - Kanban pipeline, lead scoring, source tracking, team performance'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Programmes Dashboard - Program management, cohorts, attendance, certificates', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Coaching Dashboard - Coach directory, session scheduling, client progress'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Alumni Dashboard - Alumni directory, opportunity board, referrals, AI matching', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Finance Dashboard - Invoices, payments, expenses, revenue charts, cash flow alerts'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('HR Dashboard - Staff directory, leave management, recruitment pipeline, KPIs', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Projects Dashboard - Project cards, task list, milestones, risks, Gantt chart'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Support Dashboard - Ticket system, FAQ management, knowledge base, live Q&A', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Partners Dashboard - Partner directory, agreements, meeting logs, performance'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Content Dashboard - Article management, content calendar, AI repurposing', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('AI Agents Dashboard - Agent control center, health monitoring, activity logs'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Analytics Dashboard - KPIs, revenue, customer segments, marketing channels, alerts', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Settings Dashboard - Profile, notifications, API keys, 2FA, appearance'), c('Included'), c('Included')]);
d.push([null]);

// ======== SECTION 6: INTEGRATIONS ========
d.push(sec('6. INTEGRATIONS'));
d.push(hdr(['S/N', 'DESCRIPTION', 'PRICE (NGN)', 'TOTAL COST (NGN)']));

sn++; d.push([c(sn, {center:true}), c('OpenAI (GPT-4o-mini) - AI agents, content generation, analysis'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Paystack - Payment processing (cards, bank transfers, mobile money)', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Email Integration - Email interactions, drip campaigns, sequences'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('WhatsApp Integration - WhatsApp interaction tracking and messaging', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Phone Integration - Phone call logging and tracking'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Social Media Integration - Social media leads and campaigns', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Custom Integration (Enterprise) - API, Zapier, Slack, HubSpot, Salesforce, Google, Microsoft'), c(50000), c(50000)]);
d.push([null]);

// ======== SECTION 7: SECURITY ========
d.push(sec('7. SECURITY & COMPLIANCE'));
d.push(hdr(['S/N', 'DESCRIPTION', 'PRICE (NGN)', 'TOTAL COST (NGN)']));

sn++; d.push([c(sn, {center:true}), c('8 User Roles - SUPER_ADMIN, ADMIN, MANAGER, STAFF, TRAINER, COACH, STUDENT, ALUMNI'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Two-Factor Authentication (2FA) - Toggle-able in settings', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Password Management - Change password with 8-char minimum validation'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('API Key Security - AES-256 encryption at rest, server-side only', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Session Management - Active session tracking with device/location info'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Data Compliance - GDPR, SOC 2, Bank-level encryption', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('SLA Guarantee - 99.9% uptime (Enterprise plan)'), c('Included'), c('Included')]);
d.push([null]);

// ======== SECTION 8: OPENAI PLATFORM COSTS ========
d.push(sec('8. OPENAI PLATFORM COSTS (Included in Plans)'));
d.push(hdr(['S/N', 'DESCRIPTION', 'PRICE (NGN)', 'TOTAL COST (NGN)']));

sn++; d.push([c(sn, {center:true}), c('GPT-3.5 Turbo - Prompt (per 1K tokens)'), c(1.50), c(750)]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('GPT-3.5 Turbo - Completion (per 1K tokens)', {fill:LTBLUE}), c(3, {fill:LTBLUE}), c(150, {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('GPT-4 Turbo - Prompt (per 1K tokens)'), c(15), c(3000)]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('GPT-4 Turbo - Completion (per 1K tokens)', {fill:LTBLUE}), c(45, {fill:LTBLUE}), c(2250, {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Embeddings (per 1K tokens)'), c(0.15), c(7.50)]);
d.push([null]);

// ======== SECTION 9: ADD-ONS ========
d.push(sec('9. ADD-ONS & EXTRAS'));
d.push(hdr(['S/N', 'DESCRIPTION', 'PRICE (NGN)', 'TOTAL COST (NGN)']));

sn++; d.push([c(sn, {center:true}), c('Extra AI Agent (per agent per month) - Includes OpenAI costs'), c(25000), c(25000)]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Additional 1,000 Contacts (per month)', {fill:LTBLUE}), c(5000, {fill:LTBLUE}), c(5000, {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Priority Support Upgrade - 4-hour response SLA (per month)'), c(20000), c(20000)]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Custom Integration (one-time) - API, Zapier, webhooks', {fill:LTBLUE}), c(50000, {fill:LTBLUE}), c(50000, {fill:LTBLUE})]);
d.push([null]);

// ======== SECTION 10: OVERAGES ========
d.push(sec('10. OVERAGE CHARGES'));
d.push(hdr(['S/N', 'DESCRIPTION', 'PRICE (NGN)', 'TOTAL COST (NGN)']));

sn++; d.push([c(sn, {center:true}), c('GPT-3.5 Token Overage (per 1K tokens over plan limit)'), c(90), c(90)]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('GPT-4 Token Overage (per 1K tokens over plan limit)', {fill:LTBLUE}), c(300, {fill:LTBLUE}), c(300, {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('Contact Overage (per additional contact)'), c(10), c(10)]);
d.push([null]);

// ======== SECTION 11: ANNUAL SAVINGS ========
d.push(sec('11. ANNUAL SAVINGS'));
d.push(hdr(['S/N', 'DESCRIPTION', 'PRICE (NGN)', 'TOTAL COST (NGN)']));

sn++; d.push([c(sn, {center:true}), c('Starter Annual Savings - You save per year'), c(20000, {gld:true}), c(20000, {gld:true})]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Growth Annual Savings - You save per year', {fill:LTBLUE}), c(30000, {gld:true, fill:LTBLUE}), c(30000, {gld:true, fill:LTBLUE})]);
d.push([null]);

// ======== SECTION 12: TECHNOLOGY STACK ========
d.push(sec('12. TECHNOLOGY STACK'));
d.push(hdr(['S/N', 'DESCRIPTION', 'PRICE (NGN)', 'TOTAL COST (NGN)']));

sn++; d.push([c(sn, {center:true}), c('Next.js 16.3.4 - React 19.2.8, TypeScript 5.x'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Tailwind CSS 4.x, Framer Motion 13.2.0, Lucide Icons', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('PostgreSQL + Prisma 7.10.0 ORM'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('OpenAI GPT-4o-mini + Vercel AI SDK 7.0.93', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
sn++; d.push([c(sn, {center:true}), c('NextAuth.js 4.24.15 - Authentication & sessions'), c('Included'), c('Included')]);
sn++; d.push([c(sn, {center:true, fill:LTBLUE}), c('Vercel Deployment - Global CDN, auto-scaling', {fill:LTBLUE}), c('Included', {fill:LTBLUE}), c('Included', {fill:LTBLUE})]);
d.push([null]);

// Footer
d.push([{ t: 's', v: '14-day free trial | 30-day money-back guarantee | Exchange rate: NGN 1,500/USD | OpenAI costs included', s: { font: { italic: true, sz: 9, color: { rgb: GRAY } }, alignment: { horizontal: 'center' } } }]);

var ws = XLSX.utils.aoa_to_sheet(d);
ws['!cols'] = [{ wch: 5 }, { wch: 70 }, { wch: 16 }, { wch: 18 }];
var lastRow = d.length - 1;
ws['!merges'] = [
  { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
  { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } },
  { s: { r: lastRow, c: 0 }, e: { r: lastRow, c: 3 } },
];

XLSX.utils.book_append_sheet(wb, ws, 'CTAL AI Full Breakdown');

XLSX.writeFile(wb, path.join(__dirname, '..', 'CTAL_Pricing_Final.xlsx'));
console.log('Done -', d.length, 'rows, S/N up to', sn);
