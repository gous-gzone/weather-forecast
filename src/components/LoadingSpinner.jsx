import { Cloud } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="relative">
        <Cloud className="w-16 h-16 text-white animate-pulse" />
        <div className="absolute inset-0 animate-spin">
          <div className="h-full w-full border-4 border-white/30 border-t-white rounded-full"></div>
        </div>
      </div>
      <p className="text-white text-lg">Fetching weather data...</p>
    </div>
  );
}
