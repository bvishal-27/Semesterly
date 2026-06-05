import 'dotenv/config'
import mongoose from 'mongoose'
import User from '../models/User.js'
import Resource from '../models/Resource.js'

const ARCHIVE_URL = 'https://archive.org/details/sample'

const RESOURCES = [
  { title: 'Data Structures — Complete Notes', subject: 'Data Structures', branch: 'CSE', semester: 3, type: 'notes',  fileUrl: ARCHIVE_URL, description: 'Arrays, Linked Lists, Trees, Graphs, Sorting algorithms.' },
  { title: 'Data Structures Q-Paper 2023',     subject: 'Data Structures', branch: 'CSE', semester: 3, type: 'qpaper', fileUrl: ARCHIVE_URL, year: '2023' },
  { title: 'Data Structures Q-Paper 2023 — Solved', subject: 'Data Structures', branch: 'CSE', semester: 3, type: 'solved', fileUrl: ARCHIVE_URL, year: '2023' },
  { title: 'DBMS Complete Notes',              subject: 'DBMS',            branch: 'CSE', semester: 5, type: 'notes',  fileUrl: ARCHIVE_URL, description: 'ER diagrams, SQL, normalization, transactions.' },
  { title: 'DBMS Q-Paper 2023',                subject: 'DBMS',            branch: 'CSE', semester: 5, type: 'qpaper', fileUrl: ARCHIVE_URL, year: '2023' },
  { title: 'DBMS Q-Paper 2023 — Solved',       subject: 'DBMS',            branch: 'CSE', semester: 5, type: 'solved', fileUrl: ARCHIVE_URL, year: '2023' },
  { title: 'Operating Systems Notes',          subject: 'Operating Systems', branch: 'CSE', semester: 5, type: 'notes',  fileUrl: ARCHIVE_URL },
  { title: 'Computer Networks Notes',          subject: 'Computer Networks', branch: 'CSE', semester: 6, type: 'notes',  fileUrl: ARCHIVE_URL },
  { title: 'Computer Networks Q-Paper 2023',   subject: 'Computer Networks', branch: 'CSE', semester: 6, type: 'qpaper', fileUrl: ARCHIVE_URL, year: '2023' },
  { title: 'Engineering Mathematics Unit 1-4', subject: 'Engineering Mathematics', branch: 'CSE', semester: 1, type: 'notes', fileUrl: ARCHIVE_URL },
  { title: 'Signals & Systems Notes',          subject: 'Signals & Systems',   branch: 'ECE', semester: 4, type: 'notes',  fileUrl: ARCHIVE_URL },
  { title: 'Digital Electronics Notes',        subject: 'Digital Electronics', branch: 'ECE', semester: 3, type: 'notes',  fileUrl: ARCHIVE_URL },
  { title: 'Thermodynamics Notes',             subject: 'Thermodynamics',      branch: 'ME',  semester: 4, type: 'notes',  fileUrl: ARCHIVE_URL },
]

async function seed() {
  const adminEmail    = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    console.error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGODB_URI)
  console.log('✅ Connected to DB')

  const existing = await User.findOne({ email: adminEmail })
  if (!existing) {
    await User.create({ email: adminEmail, password: adminPassword, role: 'admin' })
    console.log(`✅ Admin created → ${adminEmail}`)
  } else {
    console.log('ℹ️  Admin already exists')
  }

  const count = await Resource.countDocuments()
  if (count === 0) {
    await Resource.insertMany(RESOURCES)
    console.log(`✅ Inserted ${RESOURCES.length} sample resources`)
  } else {
    console.log(`ℹ️  ${count} resources already exist — skipping`)
  }

  await mongoose.disconnect()
  console.log('🏁 Done!')
}

seed().catch(e => { console.error(e); process.exit(1) })
