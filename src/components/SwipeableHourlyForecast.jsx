'use client';

import { useRef, useState } from 'react';
import { getWeatherIcon } from '@/services/weatherService';

const SwipeableHourlyForecast = ({ hourlyData, formatTime }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {hourlyData.slice(0, 24).map((hour, i) => (
        <div
          key={i}
          className="flex-shrink-0 p-6 rounded-3xl glass-premium backdrop-blur-2xl text-white text-center min-w-[130px] hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 cursor-pointer border border-white/30 group"
          style={{ animation: `slideIn 0.5s ease-out ${i * 0.03}s both` }}
        >
          <div className="text-sm font-bold text-white/90 mb-3 group-hover:text-cyan-300 transition-colors">
            {i === 0 ? 'Now' : formatTime(hour.time)}
          </div>
          <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
            {getWeatherIcon(hour.condition)}
          </div>
          <div className="text-4xl font-black bg-gradient-to-br from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
            {hour.temperature}°
          </div>
          <div className="mt-2 text-xs text-white/60">{hour.condition}</div>
        </div>
      ))}
    </div>
  );
};

export default SwipeableHourlyForecast;
