import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="w-full max-w-2xl bg-red-500/20 backdrop-blur-md border border-red-300/30 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-red-200 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-2">Error</h3>
          <p className="text-red-100 mb-4">{message}</p>
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-white/30 hover:bg-white/40 text-white rounded-xl transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
