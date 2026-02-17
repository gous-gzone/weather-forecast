# Weather App

A modern, responsive weather application built with Next.js and Tailwind CSS. Get real-time weather information for any city worldwide.

## Features

- 🌤️ Real-time weather data
- 🌍 Search weather for any city worldwide
- 🇮🇳 Quick access to major Indian cities
- 🌡️ Multiple temperature units (Celsius, Fahrenheit, Kelvin)
- 📱 Fully responsive design
- ✨ Beautiful gradient UI with glassmorphism effects
- 📊 Detailed weather statistics

## Quick Start

1. **Run the setup script:**
   ```bash
   setup.bat
   ```

2. **Or manually install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Configuration

The app uses Weatherstack API. Your API key is already configured in `.env.local`:
```
NEXT_PUBLIC_WEATHER_API_KEY=b2230ef08963b31756fb86dfbafe3dbc
```

## Usage

1. Enter a city name in the search bar
2. Click search or press Enter
3. Use quick select buttons for major Indian cities
4. Switch between temperature units (°C, °F, K)
5. View detailed weather information including:
   - Current temperature and conditions
   - Feels like temperature
   - Humidity and pressure
   - Wind speed and direction
   - Visibility and UV index

## Technology Stack

- **Framework:** Next.js 16
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **API:** Weatherstack

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── ErrorMessage.jsx
│   ├── IndianCities.jsx
│   ├── LoadingSpinner.jsx
│   ├── SearchBar.jsx
│   ├── UnitSwitcher.jsx
│   └── WeatherCard.jsx
└── services/
    └── weatherService.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

This app works on all modern browsers including:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## License

MIT License - feel free to use this project for learning and development.