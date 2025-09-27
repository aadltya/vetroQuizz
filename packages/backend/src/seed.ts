import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleQuestions = [
  {
    text: "What is the center of a black hole called?",
    options: ["Singularity", "Event Horizon", "Quasar", "Neutron Star"],
    correctOptionIndex: 0
  },
  {
    text: "Which theory combines quantum mechanics and general relativity?",
    options: ["String Theory", "Big Bang Theory", "Chaos Theory", "Quantum Electrodynamics"],
    correctOptionIndex: 0
  },
  {
    text: "What is the term for a boundary around a black hole beyond which nothing can escape?",
    options: ["Singularity", "Event Horizon", "Cosmic Horizon", "Photon Sphere"],
    correctOptionIndex: 1
  },
  {
    text: "What does the Heisenberg Uncertainty Principle state?",
    options: [
      "You cannot measure both position and momentum precisely at the same time",
      "Energy cannot be created or destroyed",
      "Time slows down near massive objects",
      "Light can act as both a particle and a wave"
    ],
    correctOptionIndex: 0
  },
  {
    text: "Which particle is considered the 'force carrier' of gravity in quantum physics?",
    options: ["Photon", "Gluon", "Graviton", "Higgs Boson"],
    correctOptionIndex: 2
  },
  {
    text: "What is thought to be responsible for the accelerated expansion of the universe?",
    options: ["Dark Matter", "Dark Energy", "Black Holes", "Cosmic Strings"],
    correctOptionIndex: 1
  },
  {
    text: "Which concept in physics suggests the existence of multiple universes?",
    options: ["String Theory", "Many-Worlds Interpretation", "Loop Quantum Gravity", "Special Relativity"],
    correctOptionIndex: 1
  },
  {
    text: "What is the smallest unit of a quantum of light called?",
    options: ["Photon", "Quark", "Neutrino", "Boson"],
    correctOptionIndex: 0
  },
  {
    text: "Which famous equation relates energy and mass?",
    options: ["E=mc²", "F=ma", "E=hv", "p=mv"],
    correctOptionIndex: 0
  },
  {
    text: "What is the hypothetical tunnel-like structure connecting two distant points in spacetime?",
    options: ["Black Hole", "Wormhole", "Quasar", "Pulsar"],
    correctOptionIndex: 1
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
