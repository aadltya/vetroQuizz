import { describe, it, expect } from 'vitest';

function calculateScore(
  answers: Array<{ questionId: number; selectedOptionIndex: number }>,
  questions: Array<{ id: number; correctOptionIndex: number }>
) {
  const questionMap = new Map(questions.map(q => [q.id, q.correctOptionIndex]));

  const results = answers.map((answer) => {
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

  return {
    score,
    total,
    results
  };
}

describe('Quiz Scoring Logic', () => {
  const mockQuestions = [
    { id: 1, correctOptionIndex: 2 },
    { id: 2, correctOptionIndex: 1 },
    { id: 3, correctOptionIndex: 0 },
    { id: 4, correctOptionIndex: 3 },
    { id: 5, correctOptionIndex: 0 }
  ];

  it('should calculate perfect score correctly', () => {
    const answers = [
      { questionId: 1, selectedOptionIndex: 2 },
      { questionId: 2, selectedOptionIndex: 1 },
      { questionId: 3, selectedOptionIndex: 0 },
      { questionId: 4, selectedOptionIndex: 3 },
      { questionId: 5, selectedOptionIndex: 0 }
    ];

    const result = calculateScore(answers, mockQuestions);

    expect(result.score).toBe(5);
    expect(result.total).toBe(5);
    expect(result.results).toHaveLength(5);
    expect(result.results.every(r => r.correct)).toBe(true);
  });

  it('should calculate partial score correctly', () => {
    const answers = [
      { questionId: 1, selectedOptionIndex: 2 }, // correct
      { questionId: 2, selectedOptionIndex: 0 }, // wrong
      { questionId: 3, selectedOptionIndex: 0 }, // correct
      { questionId: 4, selectedOptionIndex: 1 }, // wrong
      { questionId: 5, selectedOptionIndex: 0 }  // correct
    ];

    const result = calculateScore(answers, mockQuestions);

    expect(result.score).toBe(3);
    expect(result.total).toBe(5);
    expect(result.results).toHaveLength(5);
    
    // Check individual results
    expect(result.results[0].correct).toBe(true);
    expect(result.results[1].correct).toBe(false);
    expect(result.results[2].correct).toBe(true);
    expect(result.results[3].correct).toBe(false);
    expect(result.results[4].correct).toBe(true);
  });

  it('should handle zero score correctly', () => {
    const answers = [
      { questionId: 1, selectedOptionIndex: 0 },
      { questionId: 2, selectedOptionIndex: 0 },
      { questionId: 3, selectedOptionIndex: 1 },
      { questionId: 4, selectedOptionIndex: 0 },
      { questionId: 5, selectedOptionIndex: 1 }
    ];

    const result = calculateScore(answers, mockQuestions);

    expect(result.score).toBe(0);
    expect(result.total).toBe(5);
    expect(result.results.every(r => !r.correct)).toBe(true);
  });

  it('should handle empty answers array', () => {
    const answers: Array<{ questionId: number; selectedOptionIndex: number }> = [];

    const result = calculateScore(answers, mockQuestions);

    expect(result.score).toBe(0);
    expect(result.total).toBe(0);
    expect(result.results).toHaveLength(0);
  });

  it('should handle missing question IDs gracefully', () => {
    const answers = [
      { questionId: 999, selectedOptionIndex: 0 }, // non-existent question
      { questionId: 1, selectedOptionIndex: 2 }    // correct answer
    ];

    const result = calculateScore(answers, mockQuestions);

    expect(result.score).toBe(1);
    expect(result.total).toBe(2);
    expect(result.results[0].correct).toBe(false);
    expect(result.results[0].correctOptionIndex).toBeUndefined();
    expect(result.results[1].correct).toBe(true);
  });

  it('should preserve correct option indices in results', () => {
    const answers = [
      { questionId: 1, selectedOptionIndex: 2 },
      { questionId: 2, selectedOptionIndex: 0 }
    ];

    const result = calculateScore(answers, mockQuestions);

    expect(result.results[0].correctOptionIndex).toBe(2);
    expect(result.results[1].correctOptionIndex).toBe(1);
  });
});