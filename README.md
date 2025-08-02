# DeskFlow

DeskFlow is a simple, easy-to-use help desk solution that allows users to raise support tickets, and support staff to manage and resolve them efficiently. The goal is to streamline communication between users and support teams — **without unnecessary complexity**.

---

## ✨ Features

✅ Users can raise and track tickets  
✅ Support staff can view, update, and resolve tickets  
✅ Role-based dashboards for users and support staff  
✅ Ticket statuses (open, in-progress, resolved)  
✅ Built with Next.js + TypeScript + Tailwind CSS + Prisma  
✅ Database support with Prisma ORM

---

## 📚 Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS  
- **Backend:** Next.js API routes  
- **Database:** SQL database (e.g., MySQL or PostgreSQL) managed by  Postgres
- **Styling:** Tailwind CSS

---

## 🚀 Quick Installation

Follow these steps to set up QuickDesk on your local machine:

### # 1. Clone the repository
git clone https://github.com/suhaniavasthy/DeskFlow.git
cd DeskFlow

# 2. Install all dependencies
npm install

# 3. Create your .env file with database credentials
# (Replace username, password, host, port, dbname with your details)
echo 'DATABASE_URL="mysql://username:password@localhost:3306/quickdesk"' > .env

# 4. Apply Prisma database migrations to set up tables
npx prisma migrate dev

# 5. Start the development server
npm run dev


```bash
git clone https://github.com/suhaniavasthy/DeskFlow.git
cd DeskFlow
