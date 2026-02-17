'use client';

import { useEffect, useRef } from 'react';

const FullScreenWeatherBackground = ({ weatherType }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId;
    const particles = [];

    // Particle system
    class Particle {
      constructor(type) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.type = type;
        
        if (type === 'rain') {
          this.speed = Math.random() * 15 + 10;
          this.length = Math.random() * 20 + 10;
          this.opacity = Math.random() * 0.5 + 0.3;
        } else if (type === 'snow') {
          this.speed = Math.random() * 2 + 1;
          this.size = Math.random() * 4 + 2;
          this.opacity = Math.random() * 0.8 + 0.2;
          this.drift = Math.random() * 2 - 1;
        } else if (type === 'sun') {
          this.speed = Math.random() * 0.5 + 0.2;
          this.size = Math.random() * 3 + 1;
          this.opacity = Math.random() * 0.4 + 0.2;
        } else if (type === 'stars') {
          this.speed = Math.random() * 0.1 + 0.05;
          this.size = Math.random() * 2 + 1;
          this.opacity = Math.random() * 0.8 + 0.2;
          this.twinkle = Math.random() * 0.02;
        }
      }

      update() {
        if (this.type === 'rain') {
          this.y += this.speed;
          if (this.y > canvas.height) {
            this.y = -this.length;
            this.x = Math.random() * canvas.width;
          }
        } else if (this.type === 'snow') {
          this.y += this.speed;
          this.x += this.drift;
          if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
          }
        } else if (this.type === 'sun') {
          this.y += this.speed;
          if (this.y > canvas.height) this.y = 0;
        } else if (this.type === 'stars') {
          this.opacity += this.twinkle;
          if (this.opacity > 1 || this.opacity < 0.2) this.twinkle *= -1;
        }
      }

      draw() {
        ctx.save();
        if (this.type === 'rain') {
          ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x, this.y + this.length);
          ctx.stroke();
        } else if (this.type === 'snow') {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === 'sun') {
          ctx.fillStyle = `rgba(255, 220, 100, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === 'stars') {
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Initialize particles based on weather
    const initParticles = () => {
      particles.length = 0;
      const type = weatherType?.toLowerCase() || '';
      let count = 0;
      let particleType = '';

      if (type.includes('rain')) {
        count = 150;
        particleType = 'rain';
      } else if (type.includes('snow')) {
        count = 100;
        particleType = 'snow';
      } else if (type.includes('sun') || type.includes('clear')) {
        count = 50;
        particleType = 'sun';
      } else if (type.includes('star') || type.includes('night')) {
        count = 80;
        particleType = 'stars';
      }

      for (let i = 0; i < count; i++) {
        particles.push(new Particle(particleType));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [weatherType]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default FullScreenWeatherBackground;
