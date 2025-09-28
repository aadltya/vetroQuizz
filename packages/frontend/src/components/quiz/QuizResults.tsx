import React from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
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

interface QuizResultsProps {
  results: SubmitResponse;
  questions: Question[];
  onRestart: () => void;
}

export function QuizResults({ results, questions, onRestart }: QuizResultsProps) {
  const percentage = Math.round((results.score / results.total) * 100);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Quiz Complete</h1>
          
          <div className="text-6xl font-bold text-gray-800 mb-4">
            {results.score}/{results.total}
          </div>
          
          <p className="text-2xl text-gray-600 mb-8">
            You scored {percentage}%
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Question Results:</h3>
          <div className="space-y-4">
            {results.results.map((result, index) => {
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
            onClick={onRestart}
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
}
