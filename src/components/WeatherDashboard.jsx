'use client';

import { useState } from 'react';
import { MapPin, Droplets, Wind, Eye, Gauge, Sun, Moon, Loader2, Navigation, TrendingUp, Calendar } from 'lucide-react';
import WeatherAnimations from './WeatherAnimations';
import SearchComponent from './SearchComponent';
import { fetchWeatherData, getWeatherIcon } from '@/services/weatherService';
import { useDarkMode, useGeolocation } from '@/hooks/useWeatherHooks';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useDarkMode();
  const [view, setView] = useState('hourly');
  const { location, loading: geoLoading, getCurrentLocation } = useGeolocation();

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(query);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocation = async () => {
    if (location) {
      handleSearch(`${location.latitude},${location.longitude}`);
    } else {
      getCurrentLocation();
    }
  };

  const bgClass = weatherData ? weatherData.theme.bgClass : (darkMode ? 'from-slate-900 via-slate-800 to-slate-900' : 'from-blue-400 via-blue-500 to-blue-600');

  const indianCities = [
    { name: 'Mumbai', icon: '🏙️' },
    { name: 'Delhi', icon: '🏛️' },
    { name: 'Bangalore', icon: '💻' },
    { name: 'Hyderabad', icon: '🕌' },
    { name: 'Chennai', icon: '🏖️' },
    { name: 'Kolkata', icon: '🎭' },
    { name: 'Pune', icon: '🎓' },
    { name: 'Ahmedabad', icon: '🏭' }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgClass} relative overflow-hidden transition-all duration-1000`}>
      {weatherData && <WeatherAnimations weatherType={weatherData.theme.particles} isVisible={true} />}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 min-h-screen p-3 sm:p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Compact Header */}
          <header className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Weather Forecast</h1>
              <p className="text-white/70 text-sm hidden sm:block">Real-time updates worldwide</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleLocation} disabled={geoLoading} className="p-2.5 rounded-xl glass text-white hover:bg-white/20 transition-all" title="Use location">
                {geoLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5" />}
              </button>
              <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl glass text-white hover:bg-white/20 transition-all" title="Toggle theme">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </header>

          <SearchComponent onSearch={handleSearch} loading={loading} />

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-white backdrop-blur-xl">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {loading && (
            <div className="mt-12 text-center text-white">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-3" />
              <p className="text-lg">Loading...</p>
            </div>
          )}

          {weatherData && !loading && (
            <div className="mt-4 sm:mt-6 space-y-4">
              {/* Main Weather */}
              <div className="glass backdrop-blur-2xl rounded-2xl p-5 sm:p-6 border border-white/20">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-white/80" />
                      <h2 className="text-lg sm:text-xl font-bold text-white">{weatherData.location.name}, {weatherData.location.country}</h2>
                    </div>
                    <div className="text-5xl sm:text-6xl font-light text-white mb-2">{weatherData.current.temperature}°</div>
                    <div className="text-lg text-white/90">{weatherData.current.weather_descriptions[0]}</div>
                    <div className="text-sm text-white/70 mt-1">Feels {weatherData.current.feelslike}° • H:{weatherData.current.temperature + 3}° L:{weatherData.current.temperature - 5}°</div>
                  </div>
                  <div className="text-6xl sm:text-7xl">{getWeatherIcon(weatherData.current.weather_descriptions[0])}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { icon: Droplets, label: 'Humidity', value: `${weatherData.current.humidity}%`, color: 'from-blue-500 to-cyan-500' },
                  { icon: Wind, label: 'Wind', value: `${weatherData.current.wind_speed} km/h`, color: 'from-green-500 to-emerald-500' },
                  { icon: Eye, label: 'Visibility', value: `${weatherData.current.visibility} km`, color: 'from-purple-500 to-pink-500' },
                  { icon: Gauge, label: 'Pressure', value: `${weatherData.current.pressure} mb`, color: 'from-orange-500 to-red-500' }
                ].map((stat, i) => (
                  <div key={i} className="glass backdrop-blur-2xl rounded-xl p-4 border border-white/20 hover:scale-105 transition-all">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xs text-white/70 mb-1">{stat.label}</div>
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-2 p-1.5 glass backdrop-blur-2xl rounded-xl border border-white/20">
                <button onClick={() => setView('hourly')} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${view === 'hourly' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`}>
                  <TrendingUp className="w-4 h-4" />
                  Hourly
                </button>
                <button onClick={() => setView('weekly')} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${view === 'weekly' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`}>
                  <Calendar className="w-4 h-4" />
                  7-Day
                </button>
              </div>

              {/* Hourly */}
              {view === 'hourly' && (
                <div className="glass backdrop-blur-2xl rounded-2xl p-4 sm:p-5 border border-white/20">
                  <h3 className="text-base font-bold text-white mb-3">Next 24 Hours</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {weatherData.hourlyForecast.slice(0, 24).map((hour, i) => (
                      <div key={i} className="flex-shrink-0 text-center p-3 rounded-xl hover:bg-white/10 transition-all min-w-[70px]">
                        <div className="text-xs text-white/70 mb-2">{i === 0 ? 'Now' : `${hour.time}:00`}</div>
                        <div className="text-3xl mb-2">{getWeatherIcon(hour.condition)}</div>
                        <div className="text-base font-bold text-white">{hour.temperature}°</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weekly */}
              {view === 'weekly' && (
                <div className="glass backdrop-blur-2xl rounded-2xl p-4 sm:p-5 border border-white/20">
                  <h3 className="text-base font-bold text-white mb-3">7-Day Forecast</h3>
                  <div className="space-y-2">
                    {weatherData.weeklyForecast.map((day, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{day.icon}</div>
                          <div>
                            <div className="font-bold text-white text-sm">{day.day}</div>
                            <div className="text-xs text-white/70">{day.condition}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-xs text-blue-300">{day.precipitation}%</div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-white">{day.high}°</div>
                            <div className="text-sm text-white/70">{day.low}°</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Welcome */}
          {!weatherData && !loading && !error && (
            <div className="mt-8 sm:mt-12">
              <div className="text-center text-white mb-8">
                <div className="text-7xl mb-4">🌤️</div>
                <h2 className="text-3xl font-bold mb-2">Discover Weather</h2>
                <p className="text-white/70">Search any city worldwide</p>
              </div>

              {/* Indian Cities */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🇮🇳</span> Indian Cities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {indianCities.map((city) => (
                    <button key={city.name} onClick={() => handleSearch(city.name)} className="p-4 rounded-xl glass backdrop-blur-2xl border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all">
                      <div className="text-3xl mb-2">{city.icon}</div>
                      <div className="font-bold text-sm">{city.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* International */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🌍</span> International
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {['New York', 'London', 'Tokyo', 'Paris', 'Dubai', 'Singapore'].map((city) => (
                    <button key={city} onClick={() => handleSearch(city)} className="p-4 rounded-xl glass backdrop-blur-2xl border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all font-bold text-sm">
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;