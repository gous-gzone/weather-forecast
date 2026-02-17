'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Clock, X, Loader2, TrendingUp } from 'lucide-react';
import { useDebounce, useLocalStorage } from '@/hooks/useWeatherHooks';

const SearchComponent = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage('weather-recent-searches', []);
  const searchRef = useRef(null);
  const debouncedQuery = useDebounce(query, 300);

  const popularCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
    'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi', 'Goa', 'Surat', 'Indore', 'Bhopal',
    'Nagpur', 'Visakhapatnam', 'Vadodara', 'Coimbatore', 'Mysore', 'Agra', 'Varanasi',
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Singapore',
    'Los Angeles', 'Berlin', 'Toronto', 'Moscow', 'Beijing', 'Cairo', 'Rio de Janeiro'
  ];

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const filtered = popularCities.filter(city =>
        city.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;
    const updatedRecent = [searchQuery, ...recentSearches.filter(item => item !== searchQuery)].slice(0, 5);
    setRecentSearches(updatedRecent);
    onSearch(searchQuery);
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/70 w-6 h-6 group-hover:scale-110 transition-transform" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search any city worldwide..."
          className="relative w-full pl-14 pr-16 py-5 rounded-3xl glass backdrop-blur-2xl text-white text-lg placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all border border-white/20 shadow-2xl"
          disabled={loading}
        />
        <button
          onClick={() => handleSearch()}
          disabled={loading || !query.trim()}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-110 transition-all disabled:opacity-50 shadow-lg hover:shadow-blue-500/50"
        >
          {loading ? <Loader2 className="w-5 h-5 text-white animate-spin" /> : <Search className="w-5 h-5 text-white" />}
        </button>
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-4 glass backdrop-blur-2xl rounded-3xl border border-white/20 z-[9999] max-h-96 overflow-y-auto shadow-2xl animate-[slideIn_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
          {recentSearches.length > 0 && query.length === 0 && (
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent Searches
                </h4>
                <button onClick={() => setRecentSearches([])} className="text-xs text-white/60 hover:text-white transition-colors font-medium">
                  Clear All
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((city, i) => (
                  <div key={i} className="group flex items-center justify-between hover:bg-white/20 rounded-2xl p-3 cursor-pointer transition-all hover:scale-105" onClick={(e) => { e.stopPropagation(); handleSearch(city); }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-medium">{city}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setRecentSearches(recentSearches.filter(c => c !== city)); }} className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/20 rounded-xl transition-all">
                      <X className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="p-5">
              {query.length > 0 && (
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Suggestions
                </h4>
              )}
              <div className="grid grid-cols-2 gap-2">
                {suggestions.map((city, i) => (
                  <div key={i} className="flex items-center gap-3 hover:bg-white/20 rounded-2xl p-3 cursor-pointer transition-all hover:scale-105" onClick={(e) => { e.stopPropagation(); handleSearch(city); }} style={{animation: `fadeIn 0.3s ease-out ${i * 0.05}s both`}}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-medium">{city}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query.length === 0 && recentSearches.length === 0 && (
            <div className="p-5">
              <h4 className="text-sm font-bold text-white mb-4">🔥 Trending Cities</h4>
              <div className="grid grid-cols-2 gap-2">
                {popularCities.slice(0, 10).map((city, i) => (
                  <div key={i} className="flex items-center gap-3 hover:bg-white/20 rounded-2xl p-3 cursor-pointer transition-all hover:scale-105" onClick={(e) => { e.stopPropagation(); handleSearch(city); }}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-medium text-sm">{city}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query.length > 1 && suggestions.length === 0 && (
            <div className="p-8 text-center text-white/60">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-medium">No cities found matching "{query}"</p>
              <p className="text-sm mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
