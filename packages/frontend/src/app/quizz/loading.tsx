interface LoadingProps {
  message?: string;
  className?: string;
}

export default function Loading({ message = "Loading...", className = "" }: LoadingProps) {
  return (
    <div className={`min-h-screen bg-neutral-800 flex items-center justify-center p-5 ${className}`}>
      <div className="bg-white rounded-xl shadow-2xl p-10 max-w-2xl w-full min-h-96 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-600">{message}</h2>
        </div>
      </div>
    </div>
  );
}