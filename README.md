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
npm run dev             # runs on :5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev             # runs on :5173
```

### Default admin credentials (after seed)
- Email: admin@semesterly.com
- Password: Admin@1234

## Deployment
- Frontend → Vercel (`vercel deploy`)
- Backend  → Render (connect GitHub repo, set env vars)
- Database → MongoDB Atlas (free M0 cluster)


<!-- <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Semesterly — Engineering Resource Hub</title>
  <meta name="description" content="Free notes, question papers and solved papers for engineering students." />
  <meta name="theme-color" content="#6366f1" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html> --> -->
