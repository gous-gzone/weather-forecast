import { Search } from 'lucide-react';

export default function SearchBar({ city, setCity, onSearch, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name (e.g., London, New York, Mumbai)..."
          disabled={loading}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-14 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 disabled:opacity-50 transition-all"
        />
        <button
          onClick={onSearch}
          disabled={loading || !city.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/30 hover:bg-white/40 rounded-lg sm:rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Search weather"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
