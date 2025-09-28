import React from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswerSelect: (optionIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLastQuestion: boolean;
  onSubmit: () => void;
  timeLeft: number | null;
  formatTime: (seconds: number) => string;
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  isLastQuestion,
  onSubmit,
  timeLeft,
  formatTime
}: QuizQuestionProps) {
  const progress = ((questionNumber - 1) / totalQuestions) * 100;

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
            Question {questionNumber} of {totalQuestions}
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">{question.text}</p>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all cursor-pointer duration-200 ${
                  selectedAnswer === index
                    ? 'border-neutral-800 bg-neutral-700 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-neutral-400 hover:bg-gray-50'
                }`}
                onClick={() => onAnswerSelect(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            className="px-6 py-3 bg-gray-200 cursor-pointer text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onPrevious}
            disabled={questionNumber === 1}
          >
            Previous
          </button>

          {isLastQuestion ? (
            <button
              className="px-6 py-3 bg-neutral-800 cursor-pointer text-white rounded-lg font-semibold"
              onClick={onSubmit}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              className="px-6 py-3 bg-neutral-800 cursor-pointer text-white rounded-lg font-semibold"
              onClick={onNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
