interface QuizStartProps {
  onStart: () => void;
  timeLimit: number;
  formatTime: (seconds: number) => string;
}

export function QuizStart({ onStart, timeLimit, formatTime }: QuizStartProps) {
  return (
    <div className="min-h-screen bg-neutral-800 flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 max-w-2xl w-full min-h-96 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Quiz App</h1>
          <p className="text-xl text-gray-600 mb-2">
            Test your knowledge with our interactive quiz!
          </p>
          <p className="text-lg text-gray-500 mb-8">
            You'll have {formatTime(timeLimit)} minutes to complete all questions.
          </p>
          <button 
            className="bg-neutral-900 text-white cursor-pointer text-xl font-bold py-5 px-10 rounded-xl"
            onClick={onStart}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
