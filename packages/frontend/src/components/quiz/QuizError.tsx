interface QuizErrorProps {
  error: string;
  onRetry: () => void;
}

export function QuizError({ error, onRetry }: QuizErrorProps) {
  return (
    <div className="min-h-screen bg-neutral-800 to-pink-500 flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-2xl p-10 max-w-2xl w-full min-h-96 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-lg text-gray-600 mb-8">{error}</p>
          <button 
            className="bg-neutral-800 text-white text-xl font-bold py-5 px-10 rounded-xl cursor-pointer"
            onClick={onRetry}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
