import { Droplets, Wind, Gauge, Eye, Thermometer, Clock } from 'lucide-react';

export default function WeatherCard({ data, units }) {
  const { location, current } = data;
  
  const getUnitSymbol = () => {
    if (units === 'f') return '°F';
    if (units === 's') return 'K';
    return '°C';
  };

  const weatherStats = [
    { icon: Thermometer, label: 'Feels Like', value: `${current.feelslike}${getUnitSymbol()}`, color: 'text-orange-300' },
    { icon: Droplets, label: 'Humidity', value: `${current.humidity}%`, color: 'text-blue-300' },
    { icon: Wind, label: 'Wind Speed', value: `${current.wind_speed} km/h`, color: 'text-cyan-300' },
    { icon: Wind, label: 'Wind Direction', value: current.wind_dir, color: 'text-cyan-300' },
    { icon: Gauge, label: 'Pressure', value: `${current.pressure} mb`, color: 'text-purple-300' },
    { icon: Eye, label: 'Visibility', value: `${current.visibility} km`, color: 'text-green-300' },
    { icon: Eye, label: 'UV Index', value: current.uv_index, color: 'text-yellow-300' },
    { icon: Clock, label: 'Local Time', value: location.localtime.split(' ')[1], color: 'text-pink-300' }
  ];

  return (
    <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
      {/* Location Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          {location.name}, {location.country}
        </h2>
        <p className="text-white/70 text-sm sm:text-base">{location.localtime}</p>
      </div>

      {/* Main Weather Display */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <img 
            src={current.weather_icons[0]} 
            alt={current.weather_descriptions[0]}
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
          />
          <div className="text-center sm:text-left">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              {current.temperature}{getUnitSymbol()}
            </div>
            <div className="text-lg sm:text-xl text-white/80 capitalize">
              {current.weather_descriptions[0]}
            </div>
          </div>
        </div>
      </div>

      {/* Weather Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {weatherStats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color} flex-shrink-0`} />
              <div className="min-w-0 flex-1">
                <div className="text-white/60 text-xs sm:text-sm">{stat.label}</div>
                <div className="text-white font-semibold text-sm sm:text-base truncate">{stat.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
