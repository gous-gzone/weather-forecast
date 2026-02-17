'use client';

const ClimateImage = ({ weatherType, className = '' }) => {
  const getClimateEmoji = () => {
    const type = weatherType?.toLowerCase() || '';
    
    if (type.includes('sun')) return '☀️';
    if (type.includes('rain')) return '🌧️';
    if (type.includes('snow')) return '❄️';
    if (type.includes('storm')) return '⛈️';
    if (type.includes('cloud')) return '☁️';
    if (type.includes('fog')) return '🌫️';
    if (type.includes('star')) return '✨';
    
    return '🌤️';
  };

  const getBackgroundPattern = () => {
    const type = weatherType?.toLowerCase() || '';
    
    if (type.includes('sun')) {
      return 'radial-gradient(circle at 30% 30%, rgba(255, 193, 7, 0.3) 0%, transparent 50%)';
    }
    if (type.includes('rain')) {
      return 'linear-gradient(180deg, rgba(59, 130, 246, 0.2) 0%, transparent 100%)';
    }
    if (type.includes('snow')) {
      return 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)';
    }
    if (type.includes('storm')) {
      return 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%)';
    }
    if (type.includes('cloud')) {
      return 'radial-gradient(ellipse at 50% 30%, rgba(148, 163, 184, 0.4) 0%, transparent 60%)';
    }
    
    return 'linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)';
  };

  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{
        background: getBackgroundPattern(),
        zIndex: 0
      }}
    >
      {/* Decorative climate emoji */}
      <div className="absolute top-10 right-10 text-9xl opacity-10 animate-pulse">
        {getClimateEmoji()}
      </div>
      <div className="absolute bottom-20 left-10 text-7xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>
        {getClimateEmoji()}
      </div>
      <div className="absolute top-1/2 left-1/4 text-6xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}>
        {getClimateEmoji()}
      </div>
    </div>
  );
};

export default ClimateImage;
