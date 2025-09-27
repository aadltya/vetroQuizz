import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// GET /api/quiz/questions - returns all quiz questions WITHOUT correct answers
app.get('/api/quiz/questions', async (req, res) => {
  try {
    const questions = await prisma.question.findMany({
      select: {
        id: true,
        text: true,
        options: true,
        // Exclude correctOptionIndex from response
      },
      orderBy: {
        id: 'asc'
      }
    });

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// POST /api/quiz/submit - accepts answers and returns score
app.post('/api/quiz/submit', async (req, res) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: 'Answers must be an array' });
    }

    // Get all questions with correct answers
    const questions = await prisma.question.findMany({
      select: {
        id: true,
        correctOptionIndex: true
      },
      orderBy: {
        id: 'asc'
      }
    });

    // Create a map for quick lookup
    const questionMap = new Map(questions.map((q: { id: number; correctOptionIndex: number }) => [q.id, q.correctOptionIndex]));

    // Calculate results
    const results = answers.map((answer: { questionId: number; selectedOptionIndex: number }) => {
      const correctOptionIndex = questionMap.get(answer.questionId);
      const isCorrect = correctOptionIndex === answer.selectedOptionIndex;
      
      return {
        questionId: answer.questionId,
        correct: isCorrect,
        correctOptionIndex: correctOptionIndex
      };
    });

    const score = results.filter(r => r.correct).length;
    const total = results.length;

    res.json({
      score,
      total,
      results
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
