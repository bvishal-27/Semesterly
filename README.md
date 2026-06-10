# Semesterly 📚
Engineering resource hub — notes, Q-papers, solved papers for every semester.

## Structure
```
semesterly/
├── frontend/    # React + Vite + Tailwind
└── backend/     # Node.js + Express + MongoDB
```

## Quick start

### Backend
```bash
cd backend
cp .env.example .env   # fill in MONGODB_URI and JWT_SECRET
npm install
node src/utils/seed.js  # create admin + sample data
npm run dev             # runs on :5001
```

### Frontend
```bash
cd frontend
npm install
npm run dev             # runs on :5173
```

### Default admin credentials (after seed)
- Email: 
- Password: 

## Deployment
- Frontend → Vercel (`vercel deploy`)
- Backend  → Render (connect GitHub repo, set env vars)
- Database → MongoDB Atlas (free M0 cluster)
