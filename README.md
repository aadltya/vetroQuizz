#  Online Quiz Application

A full-stack TypeScript monorepo implementing an interactive quiz application with Express.js backend and NextJs frontend.


## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies for the monorepo (run at root level)
npm run install:all
```

### 2. Database Setup - Using Neon (Recommended)

1. Go to [NeonDB Console](https://console.neon.tech/)
2. Create a new project
3. Copy the connection string

### 3. Environment Configuration

Create a `.env` file in `packages/backend/`:

```bash
# Database connection string
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Server port (optional)
PORT=3001
```
Create a `.env` file in `packages/frontend/`:

```bash
# Backend URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### 4. Database Migration & Seeding

```bash
# Generate Prisma client
cd packages/backend
npx prisma generate

# Run database migrations
npm run db:migrate

# Seed the database with sample questions
npm run db:seed
```

### 5. Start Development Servers

```bash
# From the root directory - starts both frontend and backend
npm run dev
```

## Testing

```bash
# Run backend tests

cd packages/backend
npm run test

```

This will start:
- **Backend API**: http://localhost:3001
- **Frontend App**: http://localhost:3000


## Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend
- `npm run test` - Run all tests
- `npm run install:all` - Install dependencies for all packages

### Backend (`packages/backend/`)
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run test` - Run unit tests
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

### Frontend (`packages/frontend/`)
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production

## Project Structure 

```
packages/
├── backend/                           # Backend API server
│   ├── src/
│   │   ├── index.ts                   # Main server entry point
│   │   └── seed.ts                    # Database seeding script
│   ├── prisma/
│   │   ├── schema.prisma              # Database schema
│   │   └── migrations/                # Database migrations
│   ├── _tests_/
│   │   └── scoring.test.ts            # Test files
│   ├── package.json
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   └── env.example
│
└── frontend/                          # Next.js frontend application
    ├── src/
    │   ├── app/                       # Next.js App Router
    │   │   ├── globals.css            # Global styles
    │   │   ├── layout.tsx             # Root layout component
    │   │   ├── page.tsx               # Home page
    │   │   └── quizz/                 # Quiz application pages
    │   │       ├── page.tsx           # Main quiz page
    │   │       └── loading.tsx        # Loading component
    │   ├── components/                # Reusable UI components
    │   │   ├── quiz/                  # Quiz-specific components
    │   │   │   ├── QuizStart.tsx      # Quiz start screen
    │   │   │   ├── QuizQuestion.tsx   # Individual question component
    │   │   │   ├── QuizResults.tsx    # Results display component
    │   │   │   └── QuizError.tsx      # Error handling component
    │   │   └── ui/                    # UI utility components
    │   ├── hooks/                     # Custom React hooks
    │   │   └── useQuiz.ts             # Quiz logic and state management
    │   └── lib/                       # Utility functions
    │       └── utils.ts               # Common utilities
    ├── public/                        # Static assets
    ├── package.json
    ├── next.config.ts                 # Next.js configuration
    └── env.example                    # Environment variables template
```


## Features

### Backend Features
-  Express.js with TypeScript
-  Prisma ORM with PostgreSQL
-  API endpoints
-  Database seeding with sample questions
-  Unit tests for scoring logic
-  CORS and security middleware
-  Error handling

### Frontend Features
-  NextJs with TypeScript
-  Responsive design
-  Question navigation (Next/Previous)
-  Progress indicator
-  Answer persistence across navigation
-  Countdown timer (5 minutes)
-  Results page with detailed feedback
-  Loading and error states

### Bonus Features
-  Configurable countdown timer
-  Results page highlights correct/incorrect answers
-  Modern, responsive UI design
-  Auto-submit when timer expires

## Database Schema

```prisma
model Question {
  id                Int      @id @default(autoincrement())
  text              String
  options           Json     // Array of strings
  correctOptionIndex Int
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

## Development

### Adding New Questions

1. Edit `packages/backend/src/seed.ts`
2. Add your question to the `sampleQuestions` array
3. Run `npm run db:seed` to update the database

### API Development

The backend uses Express.js with TypeScript. Main server logic is in `packages/backend/src/index.ts`.

## Deployment

### Backend Deployment

1. Build the backend: `npm run build:backend`
2. Set environment variables
3. Run database migrations: `npm run db:migrate`
4. Start the server: `npm run start`

### Frontend Deployment

1. Build the frontend: `npm run build:frontend`
2. Deploy the `dist` folder to your hosting service
