const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
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

  // Create staff users
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

  // Create staff records
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

  // Create customers
  const customers = [
    { name: 'Adebayo Ogundimu', email: 'adebayo@techcorp.ng', phone: '+234 803 456 7890', customerType: 'CORPORATE', status: 'ACTIVE', organisation: 'TechCorp Nigeria', ownerId: createdStaff[0].id },
    { name: 'Fatima Al-Rashid', email: 'fatima@greenenergy.ng', phone: '+234 805 123 4567', customerType: 'ORGANISATION', status: 'ACTIVE', organisation: 'Green Energy Co', ownerId: createdStaff[1].id },
    { name: 'Chukwuma Eze', email: 'chukwuma@startup.ng', phone: '+234 807 890 1234', customerType: 'INDIVIDUAL', status: 'ACTIVE', ownerId: createdStaff[0].id },
    { name: 'Ngozi Okafor', email: 'ngozi@consult.ng', phone: '+234 809 234 5678', customerType: 'INDIVIDUAL', status: 'INACTIVE', ownerId: createdStaff[1].id },
    { name: 'Ibrahim Musa', email: 'ibrahim@corp.ng', phone: '+234 812 345 6789', customerType: 'CORPORATE', status: 'ACTIVE', organisation: 'Meridian Holdings', ownerId: createdStaff[0].id },
    { name: 'Blessing Okoro', email: 'blessing@ngo.ng', phone: '+234 814 567 8901', customerType: 'NGO', status: 'ACTIVE', organisation: 'Hope Foundation', ownerId: createdStaff[1].id },
    { name: 'Tunde Bakare', email: 'tunde@fin.ng', phone: '+234 816 789 0123', customerType: 'CORPORATE', status: 'PROSPECT', organisation: 'FinEdge Solutions', ownerId: createdStaff[0].id },
    { name: 'Amina Bello', email: 'amina@edu.ng', phone: '+234 818 901 2345', customerType: 'ORGANISATION', status: 'ACTIVE', organisation: 'EduVentures Africa', ownerId: createdStaff[1].id },
  ]

  const createdCustomers = []
  for (const c of customers) {
    const customer = await prisma.customer.create({ data: c })
    createdCustomers.push(customer)
  }
  console.log('Created', createdCustomers.length, 'customers')

  // Create leads
  const leads = [
    { name: 'TechStart Nigeria', email: 'contact@techstart.ng', source: 'WEBINAR', score: 87, status: 'QUALIFIED', assignedToId: createdStaff[0].id },
    { name: 'Lagos Business School', email: 'partnerships@lbs.edu.ng', source: 'REFERRAL', score: 82, status: 'CONTACTED', assignedToId: createdStaff[1].id },
    { name: 'Green Energy Co', email: 'info@greenenergy.ng', source: 'WEBSITE', score: 76, status: 'NEW', assignedToId: createdStaff[0].id },
    { name: 'FinEdge Solutions', email: 'hello@finedge.ng', source: 'PAID_AD', score: 65, status: 'NEW', assignedToId: createdStaff[1].id },
    { name: 'EduVentures Africa', email: 'team@eduventures.africa', source: 'SOCIAL_MEDIA', score: 58, status: 'CONTACTED', assignedToId: createdStaff[0].id },
    { name: 'Meridian Holdings', email: 'info@meridian.ng', source: 'PARTNER', score: 91, status: 'PROPOSAL_SENT', assignedToId: createdStaff[1].id },
    { name: 'Nigerian Ports Authority', email: 'training@npa.gov.ng', source: 'EVENT', score: 72, status: 'NEGOTIATING', assignedToId: createdStaff[0].id },
    { name: 'DataVault Analytics', email: 'sales@datavault.ng', source: 'LANDING_PAGE', score: 54, status: 'NEW', assignedToId: createdStaff[1].id },
  ]

  for (const l of leads) {
    await prisma.lead.create({ data: l })
  }
  console.log('Created', leads.length, 'leads')

  // Create programmes
  const programs = [
    { name: 'Advanced Valuation', description: 'Master business valuation techniques', category: 'Finance', duration: '12 weeks', price: 250000, capacity: 40 },
    { name: 'Digital Marketing Mastery', description: 'Complete digital marketing training', category: 'Marketing', duration: '8 weeks', price: 180000, capacity: 50 },
    { name: 'Leadership Academy', description: 'Develop leadership skills', category: 'Management', duration: '16 weeks', price: 350000, capacity: 30 },
    { name: 'Business Analytics', description: 'Data-driven decision making', category: 'Technology', duration: '10 weeks', price: 200000, capacity: 35 },
  ]

  const createdPrograms = []
  for (const p of programs) {
    const program = await prisma.program.create({ data: p })
    createdPrograms.push(program)
  }
  console.log('Created', createdPrograms.length, 'programmes')

  // Create invoices
  const invoices = [
    { invoiceNumber: 'CTAL-2408-0001', customerId: createdCustomers[0].id, amount: 250000, tax: 37500, total: 287500, status: 'PAID', paidAt: new Date('2024-08-01') },
    { invoiceNumber: 'CTAL-2408-0002', customerId: createdCustomers[1].id, amount: 180000, tax: 27000, total: 207000, status: 'PAID', paidAt: new Date('2024-08-05') },
    { invoiceNumber: 'CTAL-2408-0003', customerId: createdCustomers[2].id, amount: 350000, tax: 52500, total: 402500, status: 'SENT', dueDate: new Date('2024-09-01') },
    { invoiceNumber: 'CTAL-2408-0004', customerId: createdCustomers[4].id, amount: 200000, tax: 30000, total: 230000, status: 'PAID', paidAt: new Date('2024-08-10') },
    { invoiceNumber: 'CTAL-2408-0005', customerId: createdCustomers[5].id, amount: 350000, tax: 52500, total: 402500, status: 'OVERDUE', dueDate: new Date('2024-07-15') },
  ]

  for (const inv of invoices) {
    await prisma.invoice.create({ data: inv })
  }
  console.log('Created', invoices.length, 'invoices')

  // Create support tickets
  const tickets = [
    { customerId: createdCustomers[0].id, subject: 'Cannot access course materials', category: 'PROGRAMME', priority: 'HIGH', status: 'OPEN' },
    { customerId: createdCustomers[1].id, subject: 'Invoice discrepancy', category: 'PAYMENT', priority: 'MEDIUM', status: 'IN_PROGRESS' },
    { customerId: createdCustomers[2].id, subject: 'Schedule change request', category: 'SCHEDULE', priority: 'LOW', status: 'OPEN' },
    { customerId: createdCustomers[3].id, subject: 'Certificate not received', category: 'CERTIFICATE', priority: 'MEDIUM', status: 'WAITING' },
    { customerId: createdCustomers[4].id, subject: 'Payment failed', category: 'PAYMENT', priority: 'URGENT', status: 'OPEN' },
  ]

  for (const t of tickets) {
    await prisma.supportTicket.create({ data: t })
  }
  console.log('Created', tickets.length, 'support tickets')

  // Create AI agents
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

  // Create projects
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
