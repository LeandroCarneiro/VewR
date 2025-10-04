import React from 'react';
import { useSlides } from '../context/SlideContext';

export const SlideControls: React.FC = () => {
  const { currentSlideIndex, getTotalSlides, nextSlide, previousSlide, goToSlide, presentationMode } = useSlides();
  const total = getTotalSlides();
  const canPrev = currentSlideIndex > 0;
  const canNext = currentSlideIndex < total - 1;
  const progress = ((currentSlideIndex + 1) / total) * 100;

  // Only show controls when NOT in presentation mode
  if (presentationMode) {
    return null;
  }

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 space-y-4">
      {/* Progress indicator showing current slide/total slides */}
      <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg">
        <div className="text-center">
          <div className="text-sm font-medium" style={{ color: 'var(--breast-cancer-text)' }}>
            Slide <span className="font-bold" style={{ color: 'var(--breast-cancer-accent)' }}>{currentSlideIndex + 1}</span> of {total}
          </div>
          <div className="h-1 w-48 mt-2 overflow-hidden rounded-full" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)' }}>
            <div 
              className="h-full transition-all duration-300" 
              style={{ 
                width: `${progress}%`,
                backgroundColor: 'var(--breast-cancer-accent)'
              }} 
            />
          </div>
        </div>
      </div>
      
      {/* Previous/Next buttons to navigate between slides */}
      <div className="flex items-center justify-center gap-3">
        <button 
          className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg font-bold disabled:opacity-40" 
          disabled={!canPrev} 
          onClick={() => goToSlide(0)} 
          title="First slide"
          style={{
            backgroundColor: canPrev ? 'var(--breast-cancer-accent)' : '#ccc',
            color: 'white'
          }}
        >
          ⏮
        </button>
        
        <button 
          className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-xl font-bold disabled:opacity-40" 
          disabled={!canPrev} 
          onClick={previousSlide} 
          title="Previous slide"
          style={{
            backgroundColor: canPrev ? 'var(--breast-cancer-accent)' : '#ccc',
            color: 'white'
          }}
        >
          ←
        </button>
        
        <div 
          className="rounded-full px-6 py-3 text-sm font-medium shadow-lg min-w-20 text-center"
          style={{
            backgroundColor: 'white',
            color: 'var(--breast-cancer-text)',
            border: '2px solid var(--breast-cancer-accent)'
          }}
        >
          <span className="tabular-nums font-bold">{currentSlideIndex + 1}</span>
          <span className="opacity-60"> / </span>
          <span className="opacity-80">{total}</span>
        </div>
        
        <button 
          className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-xl font-bold disabled:opacity-40" 
          disabled={!canNext} 
          onClick={nextSlide} 
          title="Next slide"
          style={{
            backgroundColor: canNext ? 'var(--breast-cancer-accent)' : '#ccc',
            color: 'white'
          }}
        >
          →
        </button>
        
        <button 
          className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg font-bold disabled:opacity-40" 
          disabled={!canNext} 
          onClick={() => goToSlide(total - 1)} 
          title="Last slide"
          style={{
            backgroundColor: canNext ? 'var(--breast-cancer-accent)' : '#ccc',
            color: 'white'
          }}
        >
          ⏭
        </button>
      </div>
    </div>
  );
};
