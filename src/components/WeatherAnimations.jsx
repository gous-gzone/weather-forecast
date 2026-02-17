'use client';

import { useEffect, useState } from 'react';

const WeatherAnimations = ({ weatherType, isVisible = true }) => {
  const [particles, setParticles] = useState([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || !isVisible) {
      setParticles([]);
      return;
    }

    const generateParticles = () => {
      const newParticles = [];
      let count = 0;

      switch (weatherType) {
        case 'rain':
          count = 50;
          for (let i = 0; i < count; i++) {
            newParticles.push({
              id: i,
              left: Math.random() * 100,
              animationDelay: Math.random() * 2,
              animationDuration: 0.5 + Math.random() * 0.5,
            });
          }
          break;

        case 'snow':
          count = 30;
          for (let i = 0; i < count; i++) {
            newParticles.push({
              id: i,
              left: Math.random() * 100,
              animationDelay: Math.random() * 3,
              animationDuration: 2 + Math.random() * 2,
            });
          }
          break;

        case 'sun':
          count = 20;
          for (let i = 0; i < count; i++) {
            newParticles.push({
              id: i,
              left: Math.random() * 100,
              top: Math.random() * 100,
              animationDelay: Math.random() * 4,
              animationDuration: 3 + Math.random() * 2,
            });
          }
          break;

        case 'clouds':
          count = 3;
          for (let i = 0; i < count; i++) {
            newParticles.push({
              id: i,
              top: 10 + Math.random() * 30,
              animationDelay: Math.random() * 20,
              animationDuration: 15 + Math.random() * 10,
              width: 60 + Math.random() * 40,
              height: 20 + Math.random() * 15,
            });
          }
          break;

        default:
          break;
      }

      setParticles(newParticles);
    };

    generateParticles();
  }, [weatherType, isVisible, reducedMotion]);

  if (reducedMotion || !isVisible) {
    return null;
  }

  const renderRainParticles = () => (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="rain-drop"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
    </>
  );

  const renderSnowParticles = () => (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="snow-flake"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
    </>
  );

  const renderSunParticles = () => (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="sun-ray"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
    </>
  );

  const renderCloudParticles = () => (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="cloud-drift"
          style={{
            top: `${particle.top}%`,
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
    </>
  );

  return (
    <div className="weather-particles">
      {weatherType === 'rain' && renderRainParticles()}
      {weatherType === 'snow' && renderSnowParticles()}
      {weatherType === 'sun' && renderSunParticles()}
      {weatherType === 'clouds' && renderCloudParticles()}
    </div>
  );
};

export default WeatherAnimations;