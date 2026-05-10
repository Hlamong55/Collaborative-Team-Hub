# TeamHub 🚀

A modern full-stack collaborative workspace platform built with **Next.js, Node.js, Express, Prisma, and PostgreSQL**.

TeamHub helps teams manage goals, tasks, milestones, announcements, and workspace collaboration in a clean SaaS-style interface.

---

# 🌐 Live Demo

## Frontend
https://your-vercel-url.vercel.app

## Backend API
https://your-railway-url.up.railway.app

---

# ✨ Features

## 🔐 Authentication
- User registration
- User login
- JWT authentication
- Protected routes
- Cookie-based session management

---

## 🏢 Workspace Management
- Create workspaces
- Workspace descriptions
- Dynamic accent colors
- Workspace-based collaboration
- Workspace switching

---

## 🎯 Goals & Milestones
- Create goals
- Goal status tracking
- Due dates
- Milestones per goal
- Milestone completion tracking

---

## 📋 Task Management
- Create tasks
- Priority levels
- Goal-linked tasks
- Status updates
- Task assignment structure

---

## 🧩 Kanban Board
- Drag & drop task management
- TODO / IN_PROGRESS / DONE columns
- Instant UI updates
- Persistent status changes

---

## 📢 Announcements
- Create announcements
- Pin important announcements
- Announcement comments
- Workspace announcement feed

---

## 📊 Analytics Dashboard
- Task statistics
- Goal statistics
- Progress visualization
- Responsive charts

---

## 🎨 Modern UI/UX
- Glassmorphism UI
- Responsive layout
- Dynamic workspace theming
- Interactive sidebar
- Smooth animations

---

# 🛠️ Tech Stack

## Frontend
- Next.js 16
- React
- Tailwind CSS
- Zustand
- Axios
- Recharts
- @hello-pangea/dnd

## Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

---

# 📂 Monorepo Structure

```bash
team-hub/
│
├── apps/
│   ├── web/      # Next.js frontend
│   └── api/      # Express backend
│
└── README.md
```

---

# ⚙️ Environment Variables

## Frontend (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Backend (`apps/api/.env`)

```env
DATABASE_URL=your_database_url

JWT_ACCESS_SECRET=your_secret

CLIENT_URL=http://localhost:3000

PORT=5000
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/team-hub.git

cd team-hub
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Setup Backend

```bash
cd apps/api

npm install
```

---

## 4️⃣ Prisma Setup

```bash
npx prisma generate

npx prisma db push
```

---

## 5️⃣ Run Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 6️⃣ Run Frontend

```bash
cd ../web

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🧪 Demo Credentials

```bash
Email: demo@gmail.com
Password: 123456
```

---

# 📸 Screenshots

## Dashboard
- Workspace management UI
- Dynamic accent themes

## Goals
- Goal and milestone tracking

## Tasks
- Kanban task management

## Announcements
- Team communication system

## Analytics
- Charts and statistics dashboard

---

# 🔒 Security

- Password hashing using bcrypt
- JWT authentication
- Protected API routes
- Workspace role-based access structure

---

# 📈 Future Improvements

- Real-time collaboration with Socket.io
- File uploads
- Rich text editor
- Notification system
- Activity logs
- Team invitations via email

---

# 👨‍💻 Author

## Hlamong Sing Marma

**MERN Stack Developer**

📧 Email: bijoymarma55@gmail.com

🐙 GitHub: https://github.com/Hlamong55/

💼 LinkedIn: https://www.linkedin.com/in/hlamong-sing/

---

Built as a full-stack collaborative workspace platform assignment project.

---

# ⭐ Final Notes

This project demonstrates:
- Full-stack architecture
- Scalable workspace structure
- Modern React patterns
- REST API design
- Prisma relational modeling
- SaaS-style UI/UX
- State management
- Authentication flow
- Real-world collaboration features

---

# 📄 License

This project is for educational and assignment purposes.