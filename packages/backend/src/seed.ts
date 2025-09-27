import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleQuestions = [
  {
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctOptionIndex: 2
  },
  {
    text: "Which programming language is known for its use in web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    correctOptionIndex: 1
  },
  {
    text: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language"
    ],
    correctOptionIndex: 0
  },
  {
    text: "Which of the following is NOT a JavaScript framework?",
    options: ["React", "Vue", "Angular", "Django"],
    correctOptionIndex: 3
  },
  {
    text: "What is the result of 2 + 2 * 3?",
    options: ["8", "10", "12", "6"],
    correctOptionIndex: 0
  }
];

async function main() {
  console.log('Starting database seed...');

  // Clear existing questions
  await prisma.question.deleteMany();
  console.log(' Cleared existing questions');

  // Create sample questions
  for (const question of sampleQuestions) {
    await prisma.question.create({
      data: {
        text: question.text,
        options: question.options,
        correctOptionIndex: question.correctOptionIndex
      }
    });
  }

  console.log('Database seeded successfully!');
  console.log(`Created ${sampleQuestions.length} questions`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
