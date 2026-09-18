const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // ==================== USERS ====================
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ctalai.com' },
    update: {},
    create: {
      email: 'admin@ctalai.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'SUPER_ADMIN',
    },
  })
  console.log('Created admin user:', admin.email)

  const staffPassword = await hash('staff123', 12)
  const staffUsers = [
    { email: 'chioma@ctalai.com', name: 'Chioma Nwosu', department: 'Customer Success', position: 'CS Manager' },
    { email: 'emeka@ctalai.com', name: 'Emeka Okonkwo', department: 'Sales', position: 'Sales Lead' },
    { email: 'aisha@ctalai.com', name: 'Aisha Abdullahi', department: 'Marketing', position: 'Marketing Manager' },
    { email: 'tunde@ctalai.com', name: 'Tunde Bakare', department: 'Operations', position: 'Ops Coordinator' },
  ]

  const createdStaff = []
  for (const s of staffUsers) {
    const user = await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: {
        email: s.email,
        name: s.name,
        password: staffPassword,
        role: 'STAFF',
        department: s.department,
        position: s.position,
      },
    })
    createdStaff.push(user)
    console.log('Created staff:', user.email)
  }

  for (let i = 0; i < createdStaff.length; i++) {
    const s = staffUsers[i]
    await prisma.staff.upsert({
      where: { userId: createdStaff[i].id },
      update: {},
      create: {
        userId: createdStaff[i].id,
        employeeId: `CTAL-EMP-${String(i + 1).padStart(3, '0')}`,
        department: s.department,
        position: s.position,
        hireDate: new Date('2023-01-15'),
        salary: 350000,
        employmentType: 'FULL_TIME',
        status: 'ACTIVE',
      },
    })
  }
  console.log('Created staff records')

  // ==================== CUSTOMERS (20) ====================
  const customers = [
    { name: 'Adebayo Ogundimu', email: 'adebayo@techcorp.ng', phone: '+234 803 456 7890', customerType: 'CORPORATE', status: 'ACTIVE', organisation: 'TechCorp Nigeria', ownerId: createdStaff[0].id, source: 'REFERRAL' },
    { name: 'Fatima Al-Rashid', email: 'fatima@greenenergy.ng', phone: '+234 805 123 4567', customerType: 'ORGANISATION', status: 'ACTIVE', organisation: 'Green Energy Co', ownerId: createdStaff[1].id, source: 'WEBSITE' },
    { name: 'Chukwuma Eze', email: 'chukwuma@startup.ng', phone: '+234 807 890 1234', customerType: 'INDIVIDUAL', status: 'ACTIVE', ownerId: createdStaff[0].id, source: 'WEBINAR' },
    { name: 'Ngozi Okafor', email: 'ngozi@consult.ng', phone: '+234 809 234 5678', customerType: 'INDIVIDUAL', status: 'INACTIVE', ownerId: createdStaff[1].id, source: 'SOCIAL_MEDIA' },
    { name: 'Ibrahim Musa', email: 'ibrahim@meridian.ng', phone: '+234 812 345 6789', customerType: 'CORPORATE', status: 'ACTIVE', organisation: 'Meridian Holdings', ownerId: createdStaff[0].id, source: 'EVENT' },
    { name: 'Blessing Okoro', email: 'blessing@hope.ng', phone: '+234 814 567 8901', customerType: 'NGO', status: 'ACTIVE', organisation: 'Hope Foundation', ownerId: createdStaff[1].id, source: 'PARTNER' },
    { name: 'Tunde Bakare', email: 'tunde@finedge.ng', phone: '+234 816 789 0123', customerType: 'CORPORATE', status: 'PROSPECT', organisation: 'FinEdge Solutions', ownerId: createdStaff[0].id, source: 'PAID_AD' },
    { name: 'Amina Bello', email: 'amina@eduventures.africa', phone: '+234 818 901 2345', customerType: 'ORGANISATION', status: 'ACTIVE', organisation: 'EduVentures Africa', ownerId: createdStaff[1].id, source: 'LANDING_PAGE' },
    { name: 'Olumide Adesanya', email: 'olumide@lagosbs.edu.ng', phone: '+234 802 111 2222', customerType: 'ORGANISATION', status: 'ACTIVE', organisation: 'Lagos Business School', ownerId: createdStaff[0].id, source: 'REFERRAL' },
    { name: 'Yusuf Abdullahi', email: 'yusuf@npa.gov.ng', phone: '+234 803 333 4444', customerType: 'GOVERNMENT', status: 'ACTIVE', organisation: 'Nigerian Ports Authority', ownerId: createdStaff[1].id, source: 'EVENT' },
    { name: 'Nneka Obi', email: 'nneka@stanbic.ng', phone: '+234 804 555 6666', customerType: 'CORPORATE', status: 'ACTIVE', organisation: 'Stanbic IBTC', ownerId: createdStaff[0].id, source: 'WEBSITE' },
    { name: 'Segun Adeyemi', email: 'segun@mtn.ng', phone: '+234 805 777 8888', customerType: 'CORPORATE', status: 'INACTIVE', organisation: 'MTN Nigeria', ownerId: createdStaff[1].id, source: 'SOCIAL_MEDIA' },
    { name: 'Funke Adebayo', email: 'funke@dangote.com', phone: '+234 806 999 0000', customerType: 'CORPORATE', status: 'ACTIVE', organisation: 'Dangote Group', ownerId: createdStaff[0].id, source: 'PARTNER' },
    { name: 'Emeka Okonkwo', email: 'emeka@flutterwave.com', phone: '+234 807 111 3333', customerType: 'CORPORATE', status: 'ACTIVE', organisation: 'Flutterwave', ownerId: createdStaff[1].id, source: 'WEBINAR' },
    { name: 'Chioma Nwosu', email: 'chioma@paystack.com', phone: '+234 808 222 4444', customerType: 'CORPORATE', status: 'PROSPECT', organisation: 'Paystack', ownerId: createdStaff[0].id, source: 'LANDING_PAGE' },
    { name: 'Aisha Bello', email: 'aisha@interswitch.com', phone: '+234 809 333 5555', customerType: 'CORPORATE', status: 'ACTIVE', organisation: 'Interswitch', ownerId: createdStaff[1].id, source: 'WEBSITE' },
    { name: 'Ibrahim Musa Jr', email: 'ibrahim.jr@andela.com', phone: '+234 810 444 6666', customerType: 'CORPORATE', status: 'ACTIVE', organisation: 'Andela Nigeria', ownerId: createdStaff[0].id, source: 'REFERRAL' },
    { name: 'Blessing Eno', email: 'blessing.eno@hapt.ng', phone: '+234 811 555 7777', customerType: 'NGO', status: 'INACTIVE', organisation: 'Health Awareness Programme Trust', ownerId: createdStaff[1].id, source: 'EVENT' },
    { name: 'Chukwuma Okafor II', email: 'chukwuma2@valuechain.ng', phone: '+234 812 666 8888', customerType: 'INDIVIDUAL', status: 'ACTIVE', ownerId: createdStaff[0].id, source: 'PAID_AD' },
    { name: 'Ngozi Adichie', email: 'ngozi.a@writers.ng', phone: '+234 813 777 9999', customerType: 'INDIVIDUAL', status: 'ACTIVE', ownerId: createdStaff[1].id, source: 'SOCIAL_MEDIA' },
  ]

  const createdCustomers = []
  for (const c of customers) {
    const customer = await prisma.customer.create({ data: c })
    createdCustomers.push(customer)
  }
  console.log('Created', createdCustomers.length, 'customers')

  // ==================== LEADS (15) ====================
  const leads = [
    { name: 'TechStart Nigeria', email: 'contact@techstart.ng', source: 'WEBINAR', score: 87, status: 'QUALIFIED', assignedToId: createdStaff[0].id },
    { name: 'Lagos Business School', email: 'partnerships@lbs.edu.ng', source: 'REFERRAL', score: 82, status: 'CONTACTED', assignedToId: createdStaff[1].id },
    { name: 'Green Energy Co', email: 'info@greenenergy.ng', source: 'WEBSITE', score: 76, status: 'NEW', assignedToId: createdStaff[0].id },
    { name: 'FinEdge Solutions', email: 'hello@finedge.ng', source: 'PAID_AD', score: 65, status: 'NEW', assignedToId: createdStaff[1].id },
    { name: 'EduVentures Africa', email: 'team@eduventures.africa', source: 'SOCIAL_MEDIA', score: 58, status: 'CONTACTED', assignedToId: createdStaff[0].id },
    { name: 'Meridian Holdings', email: 'info@meridian.ng', source: 'PARTNER', score: 91, status: 'NEGOTIATING', assignedToId: createdStaff[1].id },
    { name: 'Nigerian Ports Authority', email: 'training@npa.gov.ng', source: 'EVENT', score: 72, status: 'NEGOTIATING', assignedToId: createdStaff[0].id },
    { name: 'DataVault Analytics', email: 'sales@datavault.ng', source: 'LANDING_PAGE', score: 54, status: 'NEW', assignedToId: createdStaff[1].id },
    { name: 'Stanbic IBTC Training', email: 'learning@stanbic.ng', source: 'WEBSITE', score: 88, status: 'WON', assignedToId: createdStaff[0].id },
    { name: 'MTN Enterprise Academy', email: 'academy@mtn.ng', source: 'PARTNER', score: 79, status: 'PROPOSAL_SENT', assignedToId: createdStaff[1].id },
    { name: 'Dangote Foundation', email: 'csr@dangote.com', source: 'REFERRAL', score: 95, status: 'WON', assignedToId: createdStaff[0].id },
    { name: 'Interswitch Learning Hub', email: 'hub@interswitch.com', source: 'WEBINAR', score: 71, status: 'QUALIFIED', assignedToId: createdStaff[1].id },
    { name: 'Flutterwave Skills', email: 'skills@flutterwave.com', source: 'SOCIAL_MEDIA', score: 63, status: 'CONTACTED', assignedToId: createdStaff[0].id },
    { name: 'Paystack Academy', email: 'academy@paystack.com', source: 'WEBSITE', score: 74, status: 'LOST', assignedToId: createdStaff[1].id },
    { name: 'Andela Nigeria Programs', email: 'programs@andela.com', source: 'EVENT', score: 83, status: 'QUALIFIED', assignedToId: createdStaff[0].id },
  ]

  for (const l of leads) {
    await prisma.lead.create({ data: l })
  }
  console.log('Created', leads.length, 'leads')

  // ==================== PROGRAMMES (6) ====================
  const programs = [
    { name: 'Advanced Valuation', description: 'Master business valuation techniques for emerging markets', category: 'Finance', duration: '12 weeks', price: 250000, capacity: 40 },
    { name: 'Digital Marketing Mastery', description: 'Complete digital marketing training for the African market', category: 'Marketing', duration: '8 weeks', price: 180000, capacity: 50 },
    { name: 'Leadership Academy', description: 'Develop transformative leadership skills for the modern era', category: 'Management', duration: '16 weeks', price: 350000, capacity: 30 },
    { name: 'Financial Modelling', description: 'Build robust financial models for strategic decision-making', category: 'Finance', duration: '10 weeks', price: 220000, capacity: 35 },
    { name: 'Data Analytics Bootcamp', description: 'Hands-on data analytics with Python, SQL, and Power BI', category: 'Technology', duration: '8 weeks', price: 200000, capacity: 45 },
    { name: 'Business Strategy Intensive', description: 'Strategic planning and execution for competitive advantage', category: 'Strategy', duration: '12 weeks', price: 300000, capacity: 25 },
  ]

  const createdPrograms = []
  for (const p of programs) {
    const program = await prisma.program.create({ data: p })
    createdPrograms.push(program)
  }
  console.log('Created', createdPrograms.length, 'programmes')

  // ==================== COHORTS (8) ====================
  const cohorts = [
    { programId: createdPrograms[0].id, name: 'Valuation Cohort A - 2024', startDate: new Date('2024-06-01'), endDate: new Date('2024-08-24'), maxStudents: 40, status: 'COMPLETED' },
    { programId: createdPrograms[1].id, name: 'Digital Marketing Sprint Q3', startDate: new Date('2024-07-15'), endDate: new Date('2024-09-10'), maxStudents: 50, status: 'COMPLETED' },
    { programId: createdPrograms[2].id, name: 'Leadership Academy 2024', startDate: new Date('2024-08-01'), endDate: new Date('2024-11-15'), maxStudents: 30, status: 'ACTIVE' },
    { programId: createdPrograms[3].id, name: 'Financial Modelling Bootcamp', startDate: new Date('2024-09-01'), endDate: new Date('2024-11-10'), maxStudents: 35, status: 'ACTIVE' },
    { programId: createdPrograms[4].id, name: 'Data Analytics Cohort 1', startDate: new Date('2024-09-15'), endDate: new Date('2024-11-10'), maxStudents: 45, status: 'ACTIVE' },
    { programId: createdPrograms[0].id, name: 'Valuation Cohort B - 2024', startDate: new Date('2024-10-01'), endDate: new Date('2024-12-24'), maxStudents: 40, status: 'UPCOMING' },
    { programId: createdPrograms[5].id, name: 'Strategy Intensive Q4', startDate: new Date('2024-10-15'), endDate: new Date('2025-01-07'), maxStudents: 25, status: 'UPCOMING' },
    { programId: createdPrograms[1].id, name: 'Digital Marketing Sprint Q1 2025', startDate: new Date('2025-01-10'), endDate: new Date('2025-03-05'), maxStudents: 50, status: 'UPCOMING' },
  ]

  const createdCohorts = []
  for (const c of cohorts) {
    const cohort = await prisma.cohort.create({ data: c })
    createdCohorts.push(cohort)
  }
  console.log('Created', createdCohorts.length, 'cohorts')

  // ==================== ENROLLMENTS (20) ====================
  const enrollments = [
    { customerId: createdCustomers[0].id, programId: createdPrograms[0].id, cohortId: createdCohorts[0].id, status: 'COMPLETED', enrolledAt: new Date('2024-06-01') },
    { customerId: createdCustomers[1].id, programId: createdPrograms[1].id, cohortId: createdCohorts[1].id, status: 'COMPLETED', enrolledAt: new Date('2024-07-15') },
    { customerId: createdCustomers[2].id, programId: createdPrograms[2].id, cohortId: createdCohorts[2].id, status: 'IN_PROGRESS', enrolledAt: new Date('2024-08-01') },
    { customerId: createdCustomers[4].id, programId: createdPrograms[0].id, cohortId: createdCohorts[0].id, status: 'COMPLETED', enrolledAt: new Date('2024-06-01') },
    { customerId: createdCustomers[5].id, programId: createdPrograms[3].id, cohortId: createdCohorts[3].id, status: 'IN_PROGRESS', enrolledAt: new Date('2024-09-01') },
    { customerId: createdCustomers[7].id, programId: createdPrograms[1].id, cohortId: createdCohorts[1].id, status: 'COMPLETED', enrolledAt: new Date('2024-07-15') },
    { customerId: createdCustomers[8].id, programId: createdPrograms[4].id, cohortId: createdCohorts[4].id, status: 'IN_PROGRESS', enrolledAt: new Date('2024-09-15') },
    { customerId: createdCustomers[9].id, programId: createdPrograms[2].id, cohortId: createdCohorts[2].id, status: 'IN_PROGRESS', enrolledAt: new Date('2024-08-01') },
    { customerId: createdCustomers[10].id, programId: createdPrograms[5].id, cohortId: createdCohorts[5].id, status: 'ENROLLED', enrolledAt: new Date('2024-10-01') },
    { customerId: createdCustomers[11].id, programId: createdPrograms[0].id, cohortId: createdCohorts[5].id, status: 'ENROLLED', enrolledAt: new Date('2024-10-01') },
    { customerId: createdCustomers[12].id, programId: createdPrograms[5].id, cohortId: createdCohorts[6].id, status: 'ENROLLED', enrolledAt: new Date('2024-10-15') },
    { customerId: createdCustomers[13].id, programId: createdPrograms[1].id, cohortId: createdCohorts[7].id, status: 'ENROLLED', enrolledAt: new Date('2025-01-10') },
    { customerId: createdCustomers[14].id, programId: createdPrograms[4].id, cohortId: createdCohorts[4].id, status: 'IN_PROGRESS', enrolledAt: new Date('2024-09-15') },
    { customerId: createdCustomers[15].id, programId: createdPrograms[2].id, cohortId: createdCohorts[2].id, status: 'IN_PROGRESS', enrolledAt: new Date('2024-08-01') },
    { customerId: createdCustomers[16].id, programId: createdPrograms[3].id, cohortId: createdCohorts[3].id, status: 'ENROLLED', enrolledAt: new Date('2024-09-01') },
    { customerId: createdCustomers[17].id, programId: createdPrograms[0].id, cohortId: createdCohorts[0].id, status: 'COMPLETED', enrolledAt: new Date('2024-06-01') },
    { customerId: createdCustomers[18].id, programId: createdPrograms[5].id, cohortId: createdCohorts[6].id, status: 'ENROLLED', enrolledAt: new Date('2024-10-15') },
    { customerId: createdCustomers[19].id, programId: createdPrograms[1].id, cohortId: createdCohorts[7].id, status: 'ENROLLED', enrolledAt: new Date('2025-01-10') },
    { customerId: createdCustomers[3].id, programId: createdPrograms[4].id, cohortId: createdCohorts[4].id, status: 'DROPPED', enrolledAt: new Date('2024-09-15') },
    { customerId: createdCustomers[6].id, programId: createdPrograms[3].id, cohortId: createdCohorts[3].id, status: 'ENROLLED', enrolledAt: new Date('2024-09-01') },
  ]

  for (const e of enrollments) {
    await prisma.enrollment.create({ data: e })
  }
  console.log('Created', enrollments.length, 'enrollments')

  // ==================== INVOICES (15) ====================
  const invoices = [
    { invoiceNumber: 'CTAL-2408-0001', customerId: createdCustomers[0].id, amount: 250000, tax: 37500, total: 287500, status: 'PAID', paidAt: new Date('2024-08-01'), dueDate: new Date('2024-08-15') },
    { invoiceNumber: 'CTAL-2408-0002', customerId: createdCustomers[1].id, amount: 180000, tax: 27000, total: 207000, status: 'PAID', paidAt: new Date('2024-08-05'), dueDate: new Date('2024-08-19') },
    { invoiceNumber: 'CTAL-2408-0003', customerId: createdCustomers[2].id, amount: 350000, tax: 52500, total: 402500, status: 'SENT', dueDate: new Date('2024-09-01') },
    { invoiceNumber: 'CTAL-2408-0004', customerId: createdCustomers[4].id, amount: 250000, tax: 37500, total: 287500, status: 'PAID', paidAt: new Date('2024-08-10'), dueDate: new Date('2024-08-24') },
    { invoiceNumber: 'CTAL-2408-0005', customerId: createdCustomers[5].id, amount: 220000, tax: 33000, total: 253000, status: 'OVERDUE', dueDate: new Date('2024-07-15') },
    { invoiceNumber: 'CTAL-2409-0001', customerId: createdCustomers[7].id, amount: 180000, tax: 27000, total: 207000, status: 'PAID', paidAt: new Date('2024-09-02'), dueDate: new Date('2024-09-16') },
    { invoiceNumber: 'CTAL-2409-0002', customerId: createdCustomers[8].id, amount: 200000, tax: 30000, total: 230000, status: 'PAID', paidAt: new Date('2024-09-10'), dueDate: new Date('2024-09-24') },
    { invoiceNumber: 'CTAL-2409-0003', customerId: createdCustomers[9].id, amount: 350000, tax: 52500, total: 402500, status: 'SENT', dueDate: new Date('2024-10-01') },
    { invoiceNumber: 'CTAL-2410-0001', customerId: createdCustomers[10].id, amount: 300000, tax: 45000, total: 345000, status: 'DRAFT', dueDate: new Date('2024-11-01') },
    { invoiceNumber: 'CTAL-2410-0002', customerId: createdCustomers[11].id, amount: 250000, tax: 37500, total: 287500, status: 'OVERDUE', dueDate: new Date('2024-09-15') },
    { invoiceNumber: 'CTAL-2410-0003', customerId: createdCustomers[12].id, amount: 300000, tax: 45000, total: 345000, status: 'PARTIALLY_PAID', paidAt: new Date('2024-10-10'), dueDate: new Date('2024-10-25') },
    { invoiceNumber: 'CTAL-2410-0004', customerId: createdCustomers[13].id, amount: 200000, tax: 30000, total: 230000, status: 'SENT', dueDate: new Date('2024-11-01') },
    { invoiceNumber: 'CTAL-2410-0005', customerId: createdCustomers[14].id, amount: 350000, tax: 52500, total: 402500, status: 'DRAFT', dueDate: new Date('2024-11-15') },
    { invoiceNumber: 'CTAL-2410-0006', customerId: createdCustomers[15].id, amount: 220000, tax: 33000, total: 253000, status: 'SENT', dueDate: new Date('2024-11-01') },
    { invoiceNumber: 'CTAL-2411-0001', customerId: createdCustomers[16].id, amount: 180000, tax: 27000, total: 207000, status: 'DRAFT', dueDate: new Date('2024-12-01') },
  ]

  for (const inv of invoices) {
    await prisma.invoice.upsert({
      where: { invoiceNumber: inv.invoiceNumber },
      update: { ...inv },
      create: { ...inv },
    })
  }
  console.log('Created', invoices.length, 'invoices')

  // ==================== SUPPORT TICKETS (10) ====================
  const tickets = [
    { customerId: createdCustomers[0].id, subject: 'Cannot access course materials', category: 'PROGRAMME', priority: 'HIGH', status: 'OPEN' },
    { customerId: createdCustomers[1].id, subject: 'Invoice discrepancy', category: 'PAYMENT', priority: 'MEDIUM', status: 'IN_PROGRESS' },
    { customerId: createdCustomers[2].id, subject: 'Schedule change request', category: 'SCHEDULE', priority: 'LOW', status: 'OPEN' },
    { customerId: createdCustomers[3].id, subject: 'Certificate not received', category: 'CERTIFICATE', priority: 'MEDIUM', status: 'WAITING' },
    { customerId: createdCustomers[4].id, subject: 'Payment failed', category: 'PAYMENT', priority: 'URGENT', status: 'OPEN' },
    { customerId: createdCustomers[7].id, subject: 'Platform login issue', category: 'TECHNICAL', priority: 'HIGH', status: 'IN_PROGRESS' },
    { customerId: createdCustomers[8].id, subject: 'Cohort schedule conflict', category: 'SCHEDULE', priority: 'MEDIUM', status: 'RESOLVED' },
    { customerId: createdCustomers[10].id, subject: 'Refund request', category: 'PAYMENT', priority: 'HIGH', status: 'OPEN' },
    { customerId: createdCustomers[12].id, subject: 'Training material update', category: 'PROGRAMME', priority: 'LOW', status: 'CLOSED' },
    { customerId: createdCustomers[14].id, subject: 'Certificate name error', category: 'CERTIFICATE', priority: 'MEDIUM', status: 'WAITING' },
  ]

  for (const t of tickets) {
    await prisma.supportTicket.create({ data: t })
  }
  console.log('Created', tickets.length, 'support tickets')

  // ==================== CAMPAIGNS (10) ====================
  const campaigns = [
    { name: 'Welcome Series - New Enrollees', type: 'EMAIL', status: 'ACTIVE', startDate: new Date('2024-08-01'), endDate: new Date('2024-12-31'), budget: 250000, channel: 'Email', targetAudience: 'New enrollees' },
    { name: 'Q4 Leadership Webinar', type: 'WEBINAR', status: 'ACTIVE', startDate: new Date('2024-10-01'), endDate: new Date('2024-10-15'), budget: 150000, channel: 'Zoom', targetAudience: 'Corporate managers' },
    { name: 'End of Year Promo', type: 'EMAIL', status: 'DRAFT', startDate: new Date('2024-11-15'), endDate: new Date('2024-12-31'), budget: 100000, channel: 'Email', targetAudience: 'All contacts' },
    { name: 'Instagram Thought Leadership', type: 'SOCIAL_MEDIA', status: 'ACTIVE', startDate: new Date('2024-09-01'), endDate: new Date('2024-12-31'), budget: 300000, channel: 'Instagram', targetAudience: 'Young professionals' },
    { name: 'LinkedIn B2B Outreach', type: 'SOCIAL_MEDIA', status: 'COMPLETED', startDate: new Date('2024-07-01'), endDate: new Date('2024-09-30'), budget: 200000, channel: 'LinkedIn', targetAudience: 'HR directors' },
    { name: 'Google Ads - Data Analytics', type: 'EMAIL', status: 'ACTIVE', startDate: new Date('2024-10-01'), endDate: new Date('2025-01-31'), budget: 500000, channel: 'Google Ads', targetAudience: 'Data professionals' },
    { name: 'SMS Re-engagement Campaign', type: 'EMAIL', status: 'PAUSED', startDate: new Date('2024-09-15'), endDate: new Date('2024-10-31'), budget: 80000, channel: 'SMS', targetAudience: 'Inactive customers' },
    { name: 'Partner Co-marketing', type: 'SOCIAL_MEDIA', status: 'SCHEDULED', startDate: new Date('2025-01-01'), endDate: new Date('2025-03-31'), budget: 400000, channel: 'Multi-channel', targetAudience: 'Partner networks' },
    { name: 'Webinar: Financial Modelling Tips', type: 'WEBINAR', status: 'COMPLETED', startDate: new Date('2024-08-15'), endDate: new Date('2024-08-15'), budget: 50000, channel: 'Zoom', targetAudience: 'Finance professionals' },
    { name: 'Alumni Referral Programme', type: 'EMAIL', status: 'ACTIVE', startDate: new Date('2024-10-01'), endDate: new Date('2025-06-30'), budget: 150000, channel: 'Email', targetAudience: 'Alumni' },
  ]

  for (const c of campaigns) {
    await prisma.campaign.create({ data: c })
  }
  console.log('Created', campaigns.length, 'campaigns')

  // ==================== COACHING SESSIONS (10) ====================
  // Create coach users first
  const coachUser1 = await prisma.user.upsert({
    where: { email: 'coach.emeka@ctalai.com' },
    update: {},
    create: {
      email: 'coach.emeka@ctalai.com',
      name: 'Emeka Coach',
      password: staffPassword,
      role: 'COACH',
    },
  })

  const coach1 = await prisma.coach.upsert({
    where: { userId: coachUser1.id },
    update: {},
    create: {
      userId: coachUser1.id,
      speciality: ['Leadership', 'Strategy'],
      bio: 'Executive leadership coach with 15 years experience',
      maxClients: 10,
    },
  })

  const coachingSessions = [
    { customerId: createdCustomers[0].id, coachId: coach1.id, scheduledAt: new Date('2024-09-01T10:00:00'), duration: 60, status: 'COMPLETED', notes: 'Discussed leadership growth plan' },
    { customerId: createdCustomers[2].id, coachId: coach1.id, scheduledAt: new Date('2024-09-05T14:00:00'), duration: 60, status: 'COMPLETED', notes: 'Career transition coaching' },
    { customerId: createdCustomers[4].id, coachId: coach1.id, scheduledAt: new Date('2024-09-10T11:00:00'), duration: 90, status: 'COMPLETED', notes: 'Executive presence workshop' },
    { customerId: createdCustomers[5].id, coachId: coach1.id, scheduledAt: new Date('2024-09-15T09:00:00'), duration: 60, status: 'CANCELLED', notes: 'Client rescheduled' },
    { customerId: createdCustomers[8].id, coachId: coach1.id, scheduledAt: new Date('2024-09-20T15:00:00'), duration: 60, status: 'COMPLETED', notes: 'Strategic thinking session' },
    { customerId: createdCustomers[10].id, coachId: coach1.id, scheduledAt: new Date('2024-09-25T10:00:00'), duration: 60, status: 'SCHEDULED', notes: 'Goal setting for Q4' },
    { customerId: createdCustomers[12].id, coachId: coach1.id, scheduledAt: new Date('2024-09-28T13:00:00'), duration: 60, status: 'SCHEDULED', notes: 'Performance review prep' },
    { customerId: createdCustomers[14].id, coachId: coach1.id, scheduledAt: new Date('2024-10-01T11:00:00'), duration: 60, status: 'SCHEDULED', notes: 'Team leadership development' },
    { customerId: createdCustomers[16].id, coachId: coach1.id, scheduledAt: new Date('2024-10-05T14:00:00'), duration: 90, status: 'SCHEDULED', notes: 'Conflict resolution coaching' },
    { customerId: createdCustomers[18].id, coachId: coach1.id, scheduledAt: new Date('2024-10-08T10:00:00'), duration: 60, status: 'SCHEDULED', notes: 'Personal branding session' },
  ]

  for (const s of coachingSessions) {
    await prisma.coachingSession.create({ data: s })
  }
  console.log('Created', coachingSessions.length, 'coaching sessions')

  // ==================== PARTNERS (5) ====================
  const partners = [
    { name: 'Lagos Business School', contactName: 'Prof. Olumide Adesanya', email: 'olumide@lbs.edu.ng', phone: '+234 802 111 2222', type: 'ACADEMIC', status: 'ACTIVE', notes: 'Joint programme delivery' },
    { name: 'Stanbic IBTC', contactName: 'Nneka Obi', email: 'nneka@stanbic.ng', phone: '+234 804 555 6666', type: 'CORPORATE', status: 'ACTIVE', notes: 'Employee training partnership' },
    { name: 'MTN Nigeria', contactName: 'Segun Adeyemi', email: 'segun@mtn.ng', phone: '+234 805 777 8888', type: 'CORPORATE', status: 'PROSPECT', notes: 'Enterprise training proposal pending' },
    { name: 'Lagos State Government', contactName: 'Mrs. Abimbola Johnson', email: 'abimbola@lagosstate.gov.ng', phone: '+234 801 222 3333', type: 'GOVERNMENT', status: 'ACTIVE', notes: 'Public sector capacity building' },
    { name: 'Nigerian Bottling Company', contactName: 'Chidi Okoli', email: 'chidi@nbc.com', phone: '+234 806 444 5555', type: 'CORPORATE', status: 'ACTIVE', notes: 'Leadership development programme' },
  ]

  for (const p of partners) {
    await prisma.partner.create({ data: p })
  }
  console.log('Created', partners.length, 'partners')

  // ==================== INTERACTIONS (10) ====================
  const interactions = [
    { customerId: createdCustomers[0].id, type: 'MEETING', subject: 'Quarterly review meeting', content: 'Reviewed programme progress and upcoming opportunities', channel: 'In-person', direction: 'INBOUND' },
    { customerId: createdCustomers[1].id, type: 'EMAIL', subject: 'Welcome email', content: 'Sent welcome materials and onboarding guide', channel: 'Email', direction: 'OUTBOUND' },
    { customerId: createdCustomers[2].id, type: 'WHATSAPP', subject: 'Schedule confirmation', content: 'Confirmed next coaching session date', channel: 'WhatsApp', direction: 'INBOUND' },
    { customerId: createdCustomers[4].id, type: 'PHONE', subject: 'Payment follow-up', content: 'Discussed payment plan options', channel: 'Phone', direction: 'OUTBOUND' },
    { customerId: createdCustomers[7].id, type: 'EMAIL', subject: 'Programme feedback request', content: 'Requested NPS feedback on completed programme', channel: 'Email', direction: 'OUTBOUND' },
    { customerId: createdCustomers[8].id, type: 'MEETING', subject: 'Partnership discussion', content: 'Explored collaboration opportunities', channel: 'Zoom', direction: 'INBOUND' },
    { customerId: createdCustomers[10].id, type: 'NOTE', subject: 'Internal note - VIP client', content: 'Mark as high priority for Q4 follow-up', channel: 'Internal', direction: 'INBOUND' },
    { customerId: createdCustomers[12].id, type: 'EMAIL', subject: 'Invoice reminder', content: 'Sent polite reminder for outstanding invoice', channel: 'Email', direction: 'OUTBOUND' },
    { customerId: createdCustomers[14].id, type: 'MEETING', subject: 'Onboarding call', content: 'Walked through platform and resources', channel: 'Google Meet', direction: 'OUTBOUND' },
    { customerId: createdCustomers[16].id, type: 'WHATSAPP', subject: 'Quick check-in', content: 'Checked on experience with current cohort', channel: 'WhatsApp', direction: 'OUTBOUND' },
  ]

  for (const i of interactions) {
    await prisma.interaction.create({ data: i })
  }
  console.log('Created', interactions.length, 'interactions')

  // ==================== AI AGENTS ====================
  const agentTypes = ['GROWTH', 'CUSTOMER_SUCCESS', 'LEARNING', 'COMMUNITY', 'OPERATIONS', 'FINANCE', 'PEOPLE', 'CEO_INTELLIGENCE']
  const agentNames = ['Growth Agent', 'Customer Success Agent', 'Learning Agent', 'Community Agent', 'Operations Agent', 'Finance Agent', 'People Agent', 'CEO Intelligence Agent']

  for (let i = 0; i < agentTypes.length; i++) {
    await prisma.aIAgent.upsert({
      where: { name: agentNames[i] },
      update: {},
      create: {
        name: agentNames[i],
        type: agentTypes[i],
        isActive: true,
      },
    })
  }
  console.log('Created AI agents')

  // ==================== PROJECTS ====================
  const projects = [
    { name: 'Website Redesign', status: 'ACTIVE', progress: 65, startDate: new Date('2024-07-01'), endDate: new Date('2024-09-30'), budget: 2500000, spent: 1625000 },
    { name: 'CRM Integration', status: 'ACTIVE', progress: 40, startDate: new Date('2024-08-01'), endDate: new Date('2024-10-15'), budget: 1800000, spent: 720000 },
    { name: 'Mobile App Development', status: 'PLANNING', progress: 15, startDate: new Date('2024-09-01'), endDate: new Date('2024-12-31'), budget: 5200000, spent: 780000 },
  ]

  for (const p of projects) {
    await prisma.project.create({ data: p })
  }
  console.log('Created', projects.length, 'projects')

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
