'use client';

import { useState, useEffect } from 'react';
import { 
  MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Sun, Moon, CloudRain, Loader2, 
  Navigation, Sunrise, Sunset, TrendingUp, TrendingDown, Zap, Cloud, Star, Sparkles
} from 'lucide-react';
import WeatherAnimations from './WeatherAnimations';
import ClimateImage from './ClimateImage';
import SearchComponent from './SearchComponent';
import { WeatherSkeleton } from './SkeletonLoader';
import { fetchWeatherData, getWeatherIcon } from '@/services/weatherService';
import { useDarkMode, useGeolocation } from '@/hooks/useWeatherHooks';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useDarkMode();
  const [activeView, setActiveView] = useState('current');
  const { location, error: geoError, loading: geoLoading, getCurrentLocation } = useGeolocation();

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

  const handleLocationSearch = async () => {
    if (location) {
      handleSearch(`${location.latitude},${location.longitude}`);
    } else {
      getCurrentLocation();
    }
  };

  useEffect(() => {
    if (location && !weatherData) {
      handleSearch(`${location.latitude},${location.longitude}`);
    }
  }, [location]);

  const formatTime = (hour) => hour === 0 ? '12 AM' : hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;

  const getBackgroundClass = () => {
    if (!weatherData) return darkMode ? 'from-slate-900 via-purple-900 to-slate-900' : 'from-blue-400 via-purple-500 to-pink-500';
    return weatherData.theme.bgClass;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundClass()} relative overflow-hidden transition-all duration-1000`}>
      {/* Dark overlay for text visibility */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      {weatherData && (
        <>
          <WeatherAnimations weatherType={weatherData.theme.particles} isVisible={true} />
          <ClimateImage weatherType={weatherData.theme.particles} />
        </>
      )}

      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-1"></div>
      
      {/* Animated Background Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse z-0"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse z-0" style={{animationDelay: '1s'}}></div>

      <div className="relative z-10 min-h-screen">
        {/* Modern Header */}
        <header className="p-6 backdrop-blur-xl bg-black/30 border-b border-white/20 shadow-2xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50 animate-pulse">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-white bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    WeatherPro
                  </h1>
                  <p className="text-xs text-white/60">Advanced Forecast System</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLocationSearch}
                  disabled={geoLoading}
                  className="group relative p-3 rounded-2xl glass hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                >
                  {geoLoading ? <Loader2 className="w-5 h-5 text-white animate-spin" /> : <Navigation className="w-5 h-5 text-white group-hover:rotate-45 transition-transform" />}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">My Location</span>
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="group relative p-3 rounded-2xl glass hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50"
                >
                  {darkMode ? <Sun className="w-5 h-5 text-yellow-300 group-hover:rotate-180 transition-transform duration-500" /> : <Moon className="w-5 h-5 text-blue-300 group-hover:-rotate-12 transition-transform" />}
                </button>
              </div>
            </div>
            <SearchComponent onSearch={handleSearch} loading={loading} />
          </div>
        </header>

        <main className="px-6 pb-6 pt-8">
          <div className="max-w-7xl mx-auto">
            {error && (
              <div className="mb-6 p-5 rounded-3xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-white backdrop-blur-xl animate-[slideIn_0.5s_ease-out]">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  <div>
                    <p className="font-semibold">{error}</p>
                    <button onClick={() => setError(null)} className="text-sm text-white/80 hover:text-white mt-1">Dismiss</button>
                  </div>
                </div>
              </div>
            )}

            {loading && <WeatherSkeleton />}

            {weatherData && !loading && (
              <div className="space-y-6">
                {/* Modern Tab Navigation */}
                <nav className="flex gap-2 p-2 rounded-3xl glass backdrop-blur-xl shadow-2xl">
                  {[
                    { id: 'current', label: 'Now', icon: Zap },
                    { id: 'hourly', label: 'Hourly', icon: Cloud },
                    { id: 'weekly', label: 'Weekly', icon: Star },
                    { id: 'details', label: 'Details', icon: Sparkles }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveView(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-bold text-sm transition-all duration-300 ${
                        activeView === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>

                {/* Current Weather - Ultra Modern */}
                {activeView === 'current' && (
                  <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                    {/* Hero Card */}
                    <div className="relative p-8 rounded-[2.5rem] glass backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative text-center text-white space-y-6">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <MapPin className="w-7 h-7 animate-bounce" />
                          <h2 className="text-3xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                            {weatherData.location.name}, {weatherData.location.country}
                          </h2>
                        </div>
                        
                        <div className="text-[10rem] leading-none mb-6 animate-[bounce_2s_ease-in-out_infinite]" style={{textShadow: '0 0 60px rgba(255,255,255,0.5)'}}>
                          {weatherData.theme.emoji}
                        </div>
                        
                        <div className="relative inline-block">
                          <div className="text-[8rem] font-black mb-4 bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent animate-pulse">
                            {weatherData.current.temperature}°
                          </div>
                          <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
                          <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="text-3xl font-bold">{weatherData.current.weather_descriptions[0]}</div>
                          <div className="text-xl text-white/90 flex items-center justify-center gap-2">
                            <Thermometer className="w-5 h-5" />
                            Feels like {weatherData.current.feelslike}°
                          </div>
                          <div className="flex items-center justify-center gap-6 text-lg">
                            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 backdrop-blur-sm">
                              <TrendingUp className="w-5 h-5 text-red-300" /> {weatherData.current.temperature + 3}°
                            </span>
                            <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm">
                              <TrendingDown className="w-5 h-5 text-blue-300" /> {weatherData.current.temperature - 5}°
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid - 3D Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { icon: Droplets, label: 'Humidity', value: `${weatherData.current.humidity}%`, color: 'from-blue-500 via-cyan-500 to-teal-500', shadow: 'shadow-blue-500/50' },
                        { icon: Wind, label: 'Wind Speed', value: `${weatherData.current.wind_speed} km/h`, color: 'from-green-500 via-emerald-500 to-teal-500', shadow: 'shadow-green-500/50' },
                        { icon: Eye, label: 'Visibility', value: `${weatherData.current.visibility} km`, color: 'from-purple-500 via-pink-500 to-rose-500', shadow: 'shadow-purple-500/50' },
                        { icon: Gauge, label: 'Pressure', value: `${weatherData.current.pressure} mb`, color: 'from-orange-500 via-red-500 to-pink-500', shadow: 'shadow-orange-500/50' }
                      ].map((stat, i) => (
                        <div key={i} className={`group relative p-6 rounded-3xl glass backdrop-blur-xl hover:scale-105 transition-all duration-500 cursor-pointer ${stat.shadow} hover:shadow-2xl`} style={{animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`}}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                          <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                            <stat.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="relative text-white/80 text-sm mb-2 font-medium">{stat.label}</div>
                          <div className="relative text-white text-3xl font-black">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hourly Forecast - Modern Cards */}
                {activeView === 'hourly' && (
                  <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                    <h3 className="text-3xl font-black text-white flex items-center gap-3">
                      <Cloud className="w-8 h-8" />
                      24-Hour Forecast
                    </h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                      {weatherData.hourlyForecast.slice(0, 24).map((hour, i) => (
                        <div key={i} className="flex-shrink-0 p-6 rounded-3xl glass backdrop-blur-xl text-white text-center min-w-[120px] hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 cursor-pointer border border-white/20" style={{animation: `slideIn 0.5s ease-out ${i * 0.03}s both`}}>
                          <div className="text-sm font-bold text-white/80 mb-3">{i === 0 ? 'Now' : formatTime(hour.time)}</div>
                          <div className="text-5xl mb-4">{getWeatherIcon(hour.condition)}</div>
                          <div className="text-3xl font-black bg-gradient-to-br from-white to-blue-200 bg-clip-text text-transparent">{hour.temperature}°</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Weekly Forecast - Premium Cards */}
                {activeView === 'weekly' && (
                  <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                    <h3 className="text-3xl font-black text-white flex items-center gap-3">
                      <Star className="w-8 h-8" />
                      7-Day Forecast
                    </h3>
                    <div className="space-y-4">
                      {weatherData.weeklyForecast.map((day, i) => (
                        <div key={i} className="group p-6 rounded-3xl glass backdrop-blur-xl text-white hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 cursor-pointer border border-white/20" style={{animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`}}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 flex-1">
                              <div className="text-6xl group-hover:scale-125 transition-transform duration-500">{day.icon}</div>
                              <div>
                                <div className="font-black text-2xl mb-1">{day.day}</div>
                                <div className="text-white/70">{day.condition}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-8">
                              <div className="flex items-center gap-3 px-5 py-2 rounded-2xl bg-gradient-to-r from-blue-500/30 to-cyan-500/30 backdrop-blur-sm">
                                <Droplets className="w-5 h-5" />
                                <span className="font-bold text-lg">{day.precipitation}%</span>
                              </div>
                              <div className="text-right">
                                <div className="text-4xl font-black">{day.high}°</div>
                                <div className="text-xl text-white/60">{day.low}°</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Details - Premium Grid */}
                {activeView === 'details' && (
                  <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                    <h3 className="text-3xl font-black text-white flex items-center gap-3">
                      <Sparkles className="w-8 h-8" />
                      Weather Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: 'Wind Speed', value: `${weatherData.current.wind_speed} km/h`, icon: Wind, color: 'from-green-500 to-emerald-600', shadow: 'shadow-green-500/50' },
                        { label: 'Wind Direction', value: weatherData.current.wind_dir, icon: Navigation, color: 'from-teal-500 to-cyan-600', shadow: 'shadow-teal-500/50' },
                        { label: 'Pressure', value: `${weatherData.current.pressure} mb`, icon: Gauge, color: 'from-orange-500 to-red-600', shadow: 'shadow-orange-500/50' },
                        { label: 'Humidity', value: `${weatherData.current.humidity}%`, icon: Droplets, color: 'from-blue-500 to-cyan-600', shadow: 'shadow-blue-500/50' },
                        { label: 'Visibility', value: `${weatherData.current.visibility} km`, icon: Eye, color: 'from-purple-500 to-pink-600', shadow: 'shadow-purple-500/50' },
                        { label: 'UV Index', value: weatherData.current.uv_index || 'N/A', icon: Sun, color: 'from-yellow-500 to-orange-600', shadow: 'shadow-yellow-500/50' },
                        { label: 'Cloud Cover', value: `${weatherData.current.cloudcover}%`, icon: CloudRain, color: 'from-gray-500 to-slate-600', shadow: 'shadow-gray-500/50' },
                        { label: 'Feels Like', value: `${weatherData.current.feelslike}°`, icon: Thermometer, color: 'from-red-500 to-pink-600', shadow: 'shadow-red-500/50' }
                      ].map((detail, i) => (
                        <div key={i} className={`group p-6 rounded-3xl glass backdrop-blur-xl text-white hover:scale-105 transition-all duration-500 cursor-pointer ${detail.shadow} hover:shadow-2xl border border-white/20`} style={{animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`}}>
                          <div className="flex items-center gap-5">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${detail.color} flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                              <detail.icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-white/70 text-sm mb-1 font-medium">{detail.label}</div>
                              <div className="text-3xl font-black">{detail.value}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Welcome Screen - Ultra Modern */}
            {!weatherData && !loading && !error && (
              <div className="text-center text-white py-16 animate-[fadeIn_0.5s_ease-out]">
                <div className="text-[10rem] mb-8 animate-[bounce_2s_ease-in-out_infinite]">🌤️</div>
                <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Welcome to WeatherPro
                </h2>
                <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
                  Experience weather like never before with stunning visuals and real-time data
                </p>
                
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                    🇮🇳 Indian Cities
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur'].map((city) => (
                      <button key={city} onClick={() => handleSearch(city)} className="group px-8 py-4 rounded-2xl glass backdrop-blur-xl text-white hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-bold border border-white/20">
                        <span className="group-hover:animate-pulse">{city}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                    🌍 Global Cities
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {['New York', 'London', 'Tokyo', 'Paris', 'Dubai', 'Singapore'].map((city) => (
                      <button key={city} onClick={() => handleSearch(city)} className="group px-8 py-4 rounded-2xl glass backdrop-blur-xl text-white hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 font-bold border border-white/20">
                        <span className="group-hover:animate-pulse">{city}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default WeatherDashboard;
