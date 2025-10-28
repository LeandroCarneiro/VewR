import React, { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { useSlides } from '../context/SlideContext';

type SectionProps = PropsWithChildren<{
  sectionId: string;
  sectionTitle?: string;
  animationClass?: string;
  backgroundTheme?: string;
}>;

export const Section: React.FC<SectionProps> = ({ sectionId, sectionTitle, animationClass = 'fade-in', backgroundTheme, children }) => {
  const { slides, currentSlideIndex } = useSlides();
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const isCurrent = slides[currentSlideIndex]?.id === sectionId;
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setInView(true);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px 0% 0px' });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Detect print mode
  useEffect(() => {
    const beforePrint = () => setIsPrinting(true);
    const afterPrint = () => setIsPrinting(false);
    
    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);
    
    return () => {
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', afterPrint);
    };
  }, []);

  // Show all slides when printing, otherwise only current slide
  if (!isCurrent && !isPrinting) {
    return null;
  }

  return (
    <section 
      id={sectionId} 
      ref={ref} 
      className={`relative h-screen overflow-hidden ${inView || isCurrent ? 'opacity-100' : 'opacity-0'} transition-all duration-500 ${animationClass}`}
      style={{
        backgroundColor: 'var(--breast-cancer-bg)'
      }}
    >
      {/* Background decorative elements */}
      {backgroundTheme && (
        <div className="pointer-events-none absolute inset-0 -z-10 select-none">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-br from-pink-100/30 to-transparent" />
          <div className="absolute right-12 top-16 text-6xl opacity-20">🎗️</div>
          <div className="absolute right-32 bottom-20 text-4xl opacity-15">🌸</div>
          <div className="absolute left-16 bottom-32 text-3xl opacity-15">💖</div>
        </div>
      )}
      
      <div className="container mx-auto px-8 h-full flex flex-col">
        {sectionTitle && (
          <div className="flex-shrink-0 py-4">
            <h2 
              className="text-4xl font-bold mb-2" 
              style={{ color: isCurrent ? 'var(--breast-cancer-accent)' : 'var(--breast-cancer-text)' }}
            >
              {sectionTitle}
            </h2>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="min-h-0 flex flex-col justify-center py-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};
