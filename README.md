# 🌦️ Advanced Weather Application

A beautiful, feature-rich weather application built with Next.js, featuring real-time weather data, stunning animations, and a colorful user interface.

## ✨ Features

### 🎨 Stylish & Colorful UI
- **Dynamic Gradient Backgrounds**: Changes based on weather conditions
- **Glass Morphism Design**: Modern frosted glass effects throughout
- **Vibrant Color Schemes**: Each weather condition has unique colorful gradients
- **Smooth Animations**: Fade-in, slide-in, bounce, and glow effects
- **Responsive Design**: Works perfectly on all devices

### 🇮🇳 Indian Cities Support
- **23+ Indian Cities**: Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Lucknow, Chandigarh, Kochi, Goa, Surat, Indore, Bhopal, Nagpur, Visakhapatnam, Vadodara, Coimbatore, Mysore, Agra, Varanasi
- **Quick Access**: One-click weather for popular Indian cities
- **Smart Search**: Auto-suggestions for Indian and international cities

### 🌡️ Weather Features
- **Real-time Weather Data**: Current temperature, conditions, and more
- **24-Hour Forecast**: Hourly weather predictions
- **7-Day Forecast**: Weekly weather outlook
- **Detailed Metrics**: 
  - Temperature & Feels Like
  - Humidity & Pressure
  - Wind Speed & Direction
  - Visibility & Cloud Cover
  - UV Index

### 🎭 Weather-Based Theming
Each weather condition has unique visual styling:
- ☀️ **Sunny**: Yellow-orange-pink gradients with sun particles
- 🌧️ **Rainy**: Blue-cyan-teal gradients with rain animations
- ❄️ **Snowy**: Light blue gradients with snowflakes
- ⛈️ **Stormy**: Dark purple-indigo gradients with storm effects
- ☁️ **Cloudy**: Gray-blue gradients with cloud animations
- 🌫️ **Foggy**: Gray gradients with mist effects

### 🎬 Advanced Animations
- **Weather Particles**: Rain drops, snowflakes, sun rays
- **Climate Images**: Weather-themed background patterns
- **Interactive Cards**: Hover effects with scale and rotation
- **Staggered Animations**: Sequential fade-in effects
- **Smooth Transitions**: All state changes are animated

### 🔍 Smart Search
- **Auto-suggestions**: As you type
- **Recent Searches**: Quick access to previous searches
- **Popular Cities**: Pre-populated suggestions
- **Location Detection**: Use current GPS location

### 📱 User Experience
- **4 View Modes**: Current, Hourly, Weekly, Details
- **Dark/Light Mode**: Toggle between themes
- **Loading States**: Beautiful skeleton loaders
- **Error Handling**: User-friendly error messages
- **Offline Support**: Graceful degradation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Weather API key from [Weatherstack](https://weatherstack.com/)

### Installation

1. **Clone the repository**
   ```bash
   cd weatherapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🎨 Color Schemes

### Sunny Weather
- Gradient: `yellow-400 → orange-500 → pink-500`
- Accent: Yellow-300
- Particles: Sun rays

### Rainy Weather
- Gradient: `blue-600 → cyan-600 → teal-700`
- Accent: Cyan-300
- Particles: Rain drops

### Snowy Weather
- Gradient: `blue-200 → cyan-300 → blue-400`
- Accent: Blue-100
- Particles: Snowflakes

### Stormy Weather
- Gradient: `gray-800 → purple-900 → indigo-900`
- Accent: Purple-300
- Particles: Storm effects

### Cloudy Weather
- Gradient: `gray-500 → blue-400 → slate-600`
- Accent: Blue-200
- Particles: Clouds

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: Weatherstack
- **HTTP Client**: Axios
- **Language**: JavaScript

## 🌟 Key Components

### WeatherDashboard
Main component with 4 view modes and dynamic theming

### SearchComponent
Smart search with auto-suggestions and recent searches

### ClimateImage
Weather-themed background patterns and decorative elements

### WeatherAnimations
Particle effects for different weather conditions

### SkeletonLoader
Beautiful loading states

## 🎯 Features Breakdown

### Current Weather View
- Large temperature display with gradient text
- Animated weather emoji (9xl size)
- Feels like temperature
- High/Low indicators
- 4 colorful stat cards with gradients

### Hourly Forecast
- 24-hour scrollable timeline
- Large weather icons
- Temperature for each hour
- Smooth slide-in animations

### Weekly Forecast
- 7-day outlook
- High/Low temperatures
- Precipitation probability
- Weather condition icons
- Interactive hover effects

### Weather Details
- 8 detailed metrics
- Colorful gradient cards
- Icon rotation on hover
- Organized grid layout

## 🔧 Customization

### Adding More Cities
Edit `SearchComponent.jsx`:
```javascript
const popularCities = [
  'YourCity1', 'YourCity2', ...
];
```

### Changing Color Schemes
Edit `weatherService.js`:
```javascript
export const getWeatherTheme = (condition, isDay) => {
  // Customize gradients here
};
```

### Adjusting Animations
Edit `globals.css`:
```css
@keyframes yourAnimation {
  /* Custom animation */
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🐛 Troubleshooting

### Port Already in Use
```bash
netstat -ano | findstr :3000
taskkill /F /PID <process_id>
```

### Build Errors
```bash
npm run build
```
Check for parsing errors in component files

### API Issues
- Verify API key in `.env.local`
- Check API quota limits
- Ensure HTTP (not HTTPS) for free tier

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ using Next.js and Tailwind CSS
