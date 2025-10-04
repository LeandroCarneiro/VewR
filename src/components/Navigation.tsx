import React from 'react';
import { useSlides } from '../context/SlideContext';

export const Navigation: React.FC = () => {
  const { slides, currentSlideIndex, presentationMode, goToSlideById, togglePresentationMode } = useSlides();
  const progress = ((currentSlideIndex + 1) / slides.length) * 100;

  return (
    <nav 
      className="navigation fixed top-0 left-0 right-0 z-50 h-16"
      style={{
        backgroundColor: presentationMode 
          ? 'rgba(255, 107, 157, 0.1)' 
          : 'rgba(255, 255, 255, 0.95)'
      }}
    >
      {/* Progress bar at the top */}
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)' }}>
        <div 
          className="h-1 transition-all duration-300" 
          style={{ 
            width: `${progress}%`, 
            backgroundColor: 'var(--breast-cancer-accent)' 
          }} 
        />
      </div>

      <div className="flex items-center justify-between h-full px-6">
        {/* Left side: Navigation links */}
        <div className="flex items-center space-x-6">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToSlideById(s.id)}
              className={`nav-item px-4 py-2 rounded-lg font-medium text-sm transition-all ${i === currentSlideIndex ? 'active' : ''}`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Right side: Slide counter and presentation toggle */}
        <div className="flex items-center space-x-4">
          {/* Presentation mode indicator */}
          {presentationMode && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--breast-cancer-accent)', color: 'white' }}>
              <span className="text-xs font-medium">▶ PRESENTING</span>
              <span className="text-xs opacity-75">(Use ←→ keys)</span>
            </div>
          )}
          
          {/* Slide counter */}
          <div className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <div className="text-sm font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>
              {currentSlideIndex + 1}
            </div>
            <div className="opacity-60 text-sm">/</div>
            <div className="opacity-80 text-sm">{slides.length}</div>
          </div>

          {/* Presentation mode toggle */}
          <button
            onClick={togglePresentationMode}
            className="px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
            title={presentationMode ? "Exit presentation mode - Show navigation controls" : "Enter presentation mode - Hide navigation controls"}
            style={{ 
              backgroundColor: presentationMode ? 'var(--breast-cancer-accent)' : 'white',
              color: presentationMode ? 'white' : 'var(--breast-cancer-text)',
              border: `2px solid var(--breast-cancer-accent)`,
              transform: presentationMode ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            {presentationMode ? '⨉ Exit Presentation' : '▶ Start Presentation'}
          </button>
        </div>
      </div>
    </nav>
  );
};
