import 'dotenv/config'
import mongoose from 'mongoose'
import User from '../models/User.js'
import Resource from '../models/Resource.js'

const ARCHIVE_URL = 'https://archive.org/details/sample'

const RESOURCES = [
  // CSE Sem 3
  { title: 'Data Structures — Complete Notes', subject: 'Data Structures', branch: 'CSE', semester: 3, type: 'notes',  fileUrl: ARCHIVE_URL, description: 'Arrays, Linked Lists, Trees, Graphs, Sorting algorithms.' },
  { title: 'Data Structures Q-Paper 2023',     subject: 'Data Structures', branch: 'CSE', semester: 3, type: 'qpaper', fileUrl: ARCHIVE_URL, year: '2023' },
  { title: 'Data Structures Q-Paper 2023 — Solved', subject: 'Data Structures', branch: 'CSE', semester: 3, type: 'solved', fileUrl: ARCHIVE_URL, year: '2023' },
  { title: 'Data Structures Q-Paper 2022',     subject: 'Data Structures', branch: 'CSE', semester: 3, type: 'qpaper', fileUrl: ARCHIVE_URL, year: '2022' },
  // CSE Sem 5
  { title: 'DBMS Complete Notes',              subject: 'DBMS',             branch: 'CSE', semester: 5, type: 'notes',  fileUrl: ARCHIVE_URL, description: 'ER diagrams, SQL, normalization, transactions.' },
  { title: 'DBMS Q-Paper 2023',                subject: 'DBMS',             branch: 'CSE', semester: 5, type: 'qpaper', fileUrl: ARCHIVE_URL, year: '2023' },
  { title: 'DBMS Q-Paper 2023 — Solved',       subject: 'DBMS',             branch: 'CSE', semester: 5, type: 'solved', fileUrl: ARCHIVE_URL, year: '2023' },
  { title: 'Operating Systems Notes',          subject: 'Operating Systems', branch: 'CSE', semester: 5, type: 'notes',  fileUrl: ARCHIVE_URL, description: 'Processes, threads, scheduling, memory management.' },
  { title: 'OS Q-Paper 2022',                  subject: 'Operating Systems', branch: 'CSE', semester: 5, type: 'qpaper', fileUrl: ARCHIVE_URL, year: '2022' },
  // CSE Sem 6
  { title: 'Computer Networks Notes',          subject: 'Computer Networks', branch: 'CSE', semester: 6, type: 'notes',  fileUrl: ARCHIVE_URL, description: 'OSI model, TCP/IP, routing, subnetting.' },
  { title: 'Computer Networks Q-Paper 2023',   subject: 'Computer Networks', branch: 'CSE', semester: 6, type: 'qpaper', fileUrl: ARCHIVE_URL, year: '2023' },
  { title: 'Computer Networks Solved 2022',    subject: 'Computer Networks', branch: 'CSE', semester: 6, type: 'solved', fileUrl: ARCHIVE_URL, year: '2022' },
  // Common Sem 1
  { title: 'Engineering Mathematics Unit 1–4', subject: 'Engineering Mathematics', branch: 'CSE', semester: 1, type: 'notes',  fileUrl: ARCHIVE_URL },
  { title: 'Engg. Maths Q-Paper 2023',         subject: 'Engineering Mathematics', branch: 'CSE', semester: 1, type: 'qpaper', fileUrl: ARCHIVE_URL, year: '2023' },
  // ECE
  { title: 'Signals & Systems Notes',          subject: 'Signals & Systems',   branch: 'ECE', semester: 4, type: 'notes',  fileUrl: ARCHIVE_URL },
  { title: 'Signals & Systems Q-Paper 2023',   subject: 'Signals & Systems',   branch: 'ECE', semester: 4, type: 'qpaper', fileUrl: ARCHIVE_URL, year: '2023' },
  { title: 'Digital Electronics Notes',        subject: 'Digital Electronics', branch: 'ECE', semester: 3, type: 'notes',  fileUrl: ARCHIVE_URL },
  // ME
  { title: 'Thermodynamics Notes',             subject: 'Thermodynamics',       branch: 'ME',  semester: 4, type: 'notes',  fileUrl: ARCHIVE_URL },
  { title: 'Thermodynamics Q-Paper 2022',      subject: 'Thermodynamics',       branch: 'ME',  semester: 4, type: 'qpaper', fileUrl: ARCHIVE_URL, year: '2022' },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('✅ Connected to DB')

  const existing = await User.findOne({ email: 'admin@semesterly.com' })
  if (!existing) {
    await User.create({ email: 'admin@semesterly.com', password: 'Admin@1234', role: 'admin' })
    console.log('✅ Admin created  →  admin@semesterly.com  /  Admin@1234')
  } else {
    console.log('ℹ️  Admin already exists')
  }

  const count = await Resource.countDocuments()
  if (count === 0) {
    await Resource.insertMany(RESOURCES)
    console.log(`✅ Inserted ${RESOURCES.length} sample resources`)
  } else {
    console.log(`ℹ️  ${count} resources already exist — skipping seed`)
  }

  await mongoose.disconnect()
  console.log('🏁 Done!')
}

seed().catch(e => { console.error(e); process.exit(1) })
