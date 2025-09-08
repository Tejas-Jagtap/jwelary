# Jwelary Shop - Modern E-commerce Platform

A modern, responsive jewelry shop built with Next.js 15, featuring a separated frontend and backend architecture.

## 🏗️ Architecture

- **Frontend**: Next.js 15 with React, TypeScript, and Tailwind CSS (Port 3000)
- **Backend**: Express.js API server with TypeScript (Port 5000)
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT tokens with HTTP-only cookies

## 🚀 Quick Start

### Option 1: Run Both Servers Simultaneously
```bash
# Install all dependencies and setup
npm run setup:full

# Start both frontend and backend
npm run dev:full
```

### Option 2: Run Servers Separately

**Backend (Port 5000):**
```bash
cd backend
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

**Frontend (Port 3000):**
```bash
npm install
npm run dev:frontend
```

### Option 3: Use the Setup Script
```bash
./start-dev.sh
```

## 📍 URLs

- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

## 🔐 Admin Access

- **Email**: admin@jwelary.com
- **Password**: admin123

## ✨ Features

### Customer Website
- 🏠 Modern homepage with featured products
- 📱 Responsive product catalog with filtering
- 🔍 Advanced search functionality
- 📋 Detailed product pages with specifications
- 🎨 Beautiful UI with Tailwind CSS

### Admin Panel
- 👤 Secure authentication system
- 📊 Dashboard with business overview
- ➕ Add new jewelry products
- ✏️ Edit existing products
- 🗑️ Delete products
- 📋 Product management with search/filter

### Backend API
- 🔒 JWT-based authentication
- 🛡️ Role-based authorization (Admin/User)
- 📝 RESTful API endpoints
- 🗄️ Database operations with Prisma
- 🔄 CORS configured for frontend communication

## 📁 Project Structure

```
jwelary/
├── backend/              # Express.js API server
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── routes/       # API routes  
│   │   ├── middleware/   # Auth middleware
│   │   ├── lib/         # Utilities
│   │   └── index.ts     # Server entry point
│   ├── prisma/          # Database schema
│   └── package.json     # Backend dependencies
├── src/                 # Next.js frontend
│   ├── app/            # App router pages
│   ├── components/     # React components
│   ├── contexts/       # React contexts
│   └── lib/           # Frontend utilities
├── package.json        # Frontend dependencies
└── README.md          # This file
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icons

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/register` - Register new user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

## 🗄️ Database Schema

- **Users** - Authentication and roles
- **Products** - Jewelry items with specifications
- **Categories** - Product categorization
- **Orders** - Customer orders (future feature)

## 🔧 Development Scripts

### Root Package Scripts
```bash
npm run dev:full        # Start both servers
npm run dev:frontend    # Start only frontend
npm run dev:backend     # Start only backend
npm run setup:full      # Setup everything
npm run setup:backend   # Setup only backend
```

### Backend Scripts
```bash
npm run dev            # Development server
npm run build          # Build for production
npm run db:generate    # Generate Prisma client
npm run db:push        # Apply schema changes
npm run db:seed        # Seed sample data
```

## 🌟 Key Features Implemented

- ✅ **Separated Architecture** - Independent frontend/backend
- ✅ **Modern Design** - Responsive, mobile-first approach
- ✅ **Authentication** - Secure JWT-based auth system
- ✅ **Admin Panel** - Complete product management
- ✅ **API First** - RESTful backend ready for expansion
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Database ORM** - Prisma for type-safe queries
- ✅ **CORS Support** - Proper cross-origin configuration

## 📈 Future Enhancements

- 🛒 Shopping cart functionality
- 💳 Payment integration
- 📧 Email notifications
- 📱 Mobile app support
- 🔍 Advanced search with filters
- 📊 Analytics dashboard
- 🎨 Theme customization

---

**Built with ❤️ using Next.js, Express.js, and modern web technologies**
