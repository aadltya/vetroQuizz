'use client';

import React, { useState, useEffect } from 'react';
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

export default function QuizApp() {
  const [state, setState] = useState<QuizState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [quizResults, setQuizResults] = useState<SubmitResponse | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  // Timer configuration (in seconds)
  const QUIZ_TIME_LIMIT = 300; // 5 minutes

  // Load questions from API
  const loadQuestions = async () => {
    try {
      setState('loading');
      setError('');
      const response = await axios.get('http://localhost:3001/api/quiz/questions');
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
      const response = await axios.post('http://localhost:3001/api/quiz/submit', { answers });
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

  // Render start screen
  if (state === 'start') {
    return (
      <div className="min-h-screen bg-neutral-800 flex items-center justify-center p-5">
        <div className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 max-w-2xl w-full min-h-96 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Quiz App</h1>
            <p className="text-xl text-gray-600 mb-2">
              Test your knowledge with our interactive quiz!
            </p>
            <p className="text-lg text-gray-500 mb-8">
              You'll have {formatTime(QUIZ_TIME_LIMIT)} minutes to complete all questions.
            </p>
            <button 
              className="bg-neutral-900 text-white cursor-pointer text-xl font-bold py-5 px-10 rounded-xl"
              onClick={loadQuestions}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render loading screen
  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-neutral-800 flex items-center justify-center p-5">
        <div className="bg-white rounded-xl shadow-2xl p-10 max-w-2xl w-full min-h-96 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl text-gray-600">Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Render error screen
  if (state === 'error') {
    return (
      <div className="min-h-screen bg-neutral-800 to-pink-500 flex items-center justify-center p-5">
        <div className="bg-white rounded-xl shadow-2xl p-10 max-w-2xl w-full min-h-96 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-lg text-gray-600 mb-8">{error}</p>
            <button 
              className="bg-neutral-800 text-white text-xl font-bold py-5 px-10 rounded-xl cursor-pointer"
              onClick={handleRestart}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render quiz screen
  if (state === 'quiz') {
    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = getCurrentAnswer();
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-5">
        <div className="bg-neutral-50 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 max-h-4/5 max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Time!</h1>
            {timeLeft !== null && (
              <div className={`inline-block px-6 py-3 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] font-semibold text-lg ${
                timeLeft < 60 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                Time Left: {formatTime(timeLeft)}
              </div>
            )}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div 
              className="bg-neutral-700 h-2 rounded-full transition-all duration-400"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">{currentQuestion.text}</p>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all cursor-pointer duration-200 ${
                    currentAnswer === index
                      ? 'border-neutral-800 bg-neutral-700 text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-neutral-400 hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              className="px-6 py-3 bg-gray-200 cursor-pointer text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                className="px-6 py-3 bg-neutral-800 cursor-pointer text-white rounded-lg font-semibold"
                onClick={handleSubmit}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                className="px-6 py-3 bg-neutral-800 cursor-pointer text-white rounded-lg font-semibold"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render results screen
  if (state === 'results' && quizResults) {
    const percentage = Math.round((quizResults.score / quizResults.total) * 100);

    return (
      <div className="min-h-screen bg-neutral-800 flex items-center justify-center p-5">
        <div className="bg-white rounded-xl shadow-2xl p-10 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Quiz Complete</h1>
            
            <div className="text-6xl font-bold text-gray-800 mb-4">
              {quizResults.score} / {quizResults.total}
            </div>
            
            <p className="text-2xl text-gray-600 mb-8">
              You scored {percentage}%
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Question Results:</h3>
            <div className="space-y-4">
              {quizResults.results.map((result, index) => {
                const question = questions.find(q => q.id === result.questionId);
                return (
                  <div
                    key={result.questionId}
                    className={`p-4 rounded-lg flex justify-between items-center ${
                      result.correct 
                        ? 'bg-green-100' 
                        : 'bg-red-100'
                    }`}
                  >
                    <div className="flex-1">
                      <strong className="text-gray-800">Question {index + 1}:</strong> 
                      <span className="text-gray-700 ml-2">{question?.text}</span>
                    </div>
                    <div className={`font-semibold text-sm ${
                      result.correct ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.correct ? 'Correct' : 'Incorrect'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <button 
              className="bg-neutral-800 text-white text-xl cursor-pointer font-bold py-5 px-10 rounded-xl"
              onClick={handleRestart}
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}







