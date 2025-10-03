import { useState, useEffect } from 'react';
import axios from 'axios';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface Answer {
  questionId: number;
  selectedOptionIndex: number;
}

interface QuizResult {
  questionId: number;
  correct: boolean;
  correctOptionIndex: number;
}

interface SubmitResponse {
  score: number;
  total: number;
  results: QuizResult[];
}

type QuizState = 'start' | 'quiz' | 'results' | 'loading' | 'error';

export function useQuiz() {
  const [state, setState] = useState<QuizState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [quizResults, setQuizResults] = useState<SubmitResponse | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  // Timer configuration (in seconds)
  const QUIZ_TIME_LIMIT = 300;

  // Load questions from API
  const loadQuestions = async () => {
    try {
      setState('loading');
      setError('');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quiz/questions`);
      setQuestions(response.data);
      setState('quiz');
      setTimeLeft(QUIZ_TIME_LIMIT);
    } catch (err) {
      setError('Failed to load questions. Please make sure the backend is running on port 3001.');
      setState('error');
    }
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          // Auto-submit when time runs out
          handleSubmit();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle answer selection
  const handleAnswerSelect = (optionIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedOptionIndex: optionIndex
    };

    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== currentQuestion.id);
      return [...filtered, newAnswer];
    });
  };

  // Handle navigation
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    try {
      setState('loading');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quiz/submit`,
        { answers }
      );
      setQuizResults(response.data);
      setState('results');
      setTimeLeft(null);
    } catch (err) {
      setError('Failed to submit quiz. Please make sure the backend is running on port 3001.');
      setState('error');
    }
  };

  // Reset quiz
  const handleRestart = () => {
    setState('start');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizResults(null);
    setTimeLeft(null);
    setError('');
  };

  // Get current answer for the current question
  const getCurrentAnswer = (): number | null => {
    const currentQuestion = questions[currentQuestionIndex];
    const answer = answers.find(a => a.questionId === currentQuestion.id);
    return answer ? answer.selectedOptionIndex : null;
  };

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    state,
    questions,
    currentQuestionIndex,
    answers,
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
  };
}