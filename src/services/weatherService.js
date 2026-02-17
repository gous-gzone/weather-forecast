import axios from 'axios';

const BASE_URL = 'http://api.weatherstack.com/current';
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

// Weather condition mappings for UI theming with vibrant colors
export const getWeatherTheme = (condition, isDay = true) => {
  const conditionLower = condition?.toLowerCase() || '';
  
  if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
    return {
      theme: 'sunny',
      bgClass: isDay ? 'from-amber-400 via-orange-500 to-rose-500' : 'from-indigo-600 via-purple-700 to-pink-600',
      accentColor: isDay ? 'text-yellow-300' : 'text-purple-300',
      particles: isDay ? 'sun' : 'stars',
      emoji: '☀️'
    };
  }
  
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower')) {
    return {
      theme: 'rain',
      bgClass: 'from-cyan-500 via-blue-600 to-indigo-700',
      accentColor: 'text-cyan-300',
      particles: 'rain',
      emoji: '🌧️'
    };
  }
  
  if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
    return {
      theme: 'snow',
      bgClass: 'from-sky-300 via-blue-400 to-indigo-500',
      accentColor: 'text-blue-100',
      particles: 'snow',
      emoji: '❄️'
    };
  }
  
  if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
    return {
      theme: 'storm',
      bgClass: 'from-gray-800 via-purple-900 to-indigo-900',
      accentColor: 'text-purple-300',
      particles: 'storm',
      emoji: '⛈️'
    };
  }
  
  if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
    return {
      theme: 'cloudy',
      bgClass: 'from-gray-500 via-blue-400 to-slate-600',
      accentColor: 'text-blue-200',
      particles: 'clouds',
      emoji: '☁️'
    };
  }
  
  if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
    return {
      theme: 'fog',
      bgClass: 'from-gray-400 via-slate-500 to-gray-600',
      accentColor: 'text-gray-200',
      particles: 'fog',
      emoji: '🌫️'
    };
  }
  
  // Default theme
  return {
    theme: 'default',
    bgClass: isDay ? 'from-sky-400 via-blue-500 to-purple-600' : 'from-indigo-700 via-purple-800 to-pink-700',
    accentColor: 'text-sky-300',
    particles: 'default',
    emoji: '🌤️'
  };
};

// Generate hourly forecast data (mock data since Weatherstack free tier doesn't provide hourly)
export const generateHourlyForecast = (currentTemp, condition) => {
  const hours = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const hour = new Date(now.getTime() + i * 60 * 60 * 1000);
    const tempVariation = Math.random() * 6 - 3; // ±3 degrees variation
    const temp = Math.round(currentTemp + tempVariation);
    
    hours.push({
      time: hour.getHours(),
      temperature: temp,
      condition: condition,
      icon: getWeatherIcon(condition)
    });
  }
  
  return hours;
};

// Generate weekly forecast data (mock data)
export const generateWeeklyForecast = (currentTemp, condition) => {
  const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const forecast = [];
  
  for (let i = 0; i < 7; i++) {
    const tempVariation = Math.random() * 10 - 5; // ±5 degrees variation
    const high = Math.round(currentTemp + tempVariation + Math.random() * 5);
    const low = Math.round(high - Math.random() * 10 - 5);
    
    forecast.push({
      day: days[i] || `Day ${i + 1}`,
      high,
      low,
      condition: condition,
      icon: getWeatherIcon(condition),
      precipitation: Math.round(Math.random() * 100)
    });
  }
  
  return forecast;
};

// Get weather icon based on condition
export const getWeatherIcon = (condition) => {
  const conditionLower = condition?.toLowerCase() || '';
  
  if (conditionLower.includes('sunny') || conditionLower.includes('clear')) return '☀️';
  if (conditionLower.includes('rain')) return '🌧️';
  if (conditionLower.includes('snow')) return '❄️';
  if (conditionLower.includes('storm') || conditionLower.includes('thunder')) return '⛈️';
  if (conditionLower.includes('cloud')) return '☁️';
  if (conditionLower.includes('fog') || conditionLower.includes('mist')) return '🌫️';
  if (conditionLower.includes('wind')) return '💨';
  
  return '🌤️';
};

export const fetchWeatherData = async (city, units = 'm') => {
  if (!API_KEY) {
    throw new Error('API key is missing. Please configure NEXT_PUBLIC_WEATHER_API_KEY in .env.local');
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        access_key: API_KEY,
        query: city,
        units: units
      }
    });

    if (response.data.error) {
      const errorInfo = response.data.error;
      console.error('Weatherstack API error:', errorInfo);
      
      if (errorInfo.code === 615 || errorInfo.type === 'request_failed') {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
      }
      if (errorInfo.code === 101 || errorInfo.type === 'missing_access_key') {
        throw new Error('API key is missing. Please configure your API key.');
      }
      if (errorInfo.code === 103 || errorInfo.type === 'invalid_access_key') {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      if (errorInfo.code === 105 || errorInfo.type === 'https_access_restricted') {
        throw new Error('HTTPS access requires a paid plan. The app uses HTTP which should work on the free tier.');
      }
      throw new Error(errorInfo.info || 'Failed to fetch weather data');
    }

    // Enhance the response with additional data
    const enhancedData = {
      ...response.data,
      hourlyForecast: generateHourlyForecast(response.data.current.temperature, response.data.current.weather_descriptions[0]),
      weeklyForecast: generateWeeklyForecast(response.data.current.temperature, response.data.current.weather_descriptions[0]),
      theme: getWeatherTheme(response.data.current.weather_descriptions[0], response.data.current.is_day === 'yes')
    };

    return enhancedData;
  } catch (error) {
    console.error('Weather fetch error:', error);
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error.info || 'Server error occurred');
    }
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      throw new Error('Network error. Please check your internet connection and try again.');
    }
    if (error.message.includes('City') || error.message.includes('API') || error.message.includes('Network') || error.message.includes('HTTPS')) {
      throw error;
    }
    throw new Error(`Failed to fetch weather data: ${error.message || 'Unknown error'}`);
  }
};
