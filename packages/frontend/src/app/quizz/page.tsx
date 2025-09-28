'use client';

import React from 'react';
import { useQuiz } from '../../hooks/useQuiz';
import { QuizStart } from '../../components/quiz/QuizStart';
import { QuizError } from '../../components/quiz/QuizError';
import { QuizQuestion } from '../../components/quiz/QuizQuestion';
import { QuizResults } from '../../components/quiz/QuizResults';
import Loading from './loading';

export default function QuizApp() {
  const {
    state,
    questions,
    currentQuestionIndex,
    quizResults,
    timeLeft,
    error,
    QUIZ_TIME_LIMIT,
    loadQuestions,
    handleAnswerSelect,
    handleNext,
    handlePrevious,
    handleSubmit,
    handleRestart,
    getCurrentAnswer,
    formatTime
  } = useQuiz();

  // Render based on state
  if (state === 'start') {
    return (
      <QuizStart 
        onStart={loadQuestions}
        timeLimit={QUIZ_TIME_LIMIT}
        formatTime={formatTime}
      />
    );
  }

  if (state === 'loading') {
    return <Loading message="Loading..." />;
  }

  if (state === 'error') {
    return (
      <QuizError 
        error={error}
        onRetry={handleRestart}
      />
    );
  }

  if (state === 'quiz') {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = getCurrentAnswer();

    return (
      <QuizQuestion
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={currentAnswer}
        onAnswerSelect={handleAnswerSelect}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
        onSubmit={handleSubmit}
        timeLeft={timeLeft}
        formatTime={formatTime}
      />
    );
  }

  if (state === 'results' && quizResults) {
    return (
      <QuizResults
        results={quizResults}
        questions={questions}
        onRestart={handleRestart}
      />
    );
  }

  return null;
}
