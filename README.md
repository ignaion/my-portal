# My Personal Portal

A full-stack personal portfolio and blog website built with:
- **Frontend**: Nuxt 3 + Vue 3 + Tailwind CSS
- **Backend**: NestJS + Drizzle ORM
- **Database**: PostgreSQL
- **Containerization**: Docker + Docker Compose

## Features

- 🎓 Professional portfolio showcase
- 📝 Blog system with CRUD operations
- 📱 Responsive design
- 🌙 Dark mode support
- 🐳 Fully containerized

## Quick Start

### 1. Copy environment variables
```bash
cp .env.example .env
```

### 2. Start the services
```bash
docker-compose up -d
```

### 3. Run database migrations
```bash
docker-compose exec backend npm run db:push
```

### 4. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Database: localhost:5432

## Deployment

The site is configured to deploy to `https://devion.my.id/` with your pre-configured Nginx and SSL setup.

## Push to GitHub

```bash
# Initialize git repository
git init

# Add remote
git remote add origin git@github.com:ignaion/my-portal.git

# Commit and push
git add .
git commit -m "Initial project setup"
git push -u origin main
```

## Tech Stack Details

### Backend
- NestJS: Progressive Node.js framework
- Drizzle ORM: Type-safe ORM for PostgreSQL
- PostgreSQL: Relational database

### Frontend
- Nuxt 3: Vue 3 full-stack framework
- Tailwind CSS: Utility-first CSS framework
- @nuxt/ui: Vue UI component library
