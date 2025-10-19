import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type SlideData = {
  id: string;
  title: string;
  isSubslide?: boolean;
  parentSlideId?: string;
  subsectionIndex?: number;
};

type SlideContextValue = {
  slides: SlideData[];
  currentSlideIndex: number;
  presentationMode: boolean;
  goToSlide: (index: number) => void;
  goToSlideById: (id: string) => void;
  nextSlide: () => void;
  previousSlide: () => void;
  togglePresentationMode: () => void;
  getTotalSlides: () => number;
};

const SlideContext = createContext<SlideContextValue | undefined>(undefined);

const defaultSlides: SlideData[] = [
  { id: 'home', title: 'Home' },
  { id: 'introduction', title: 'Introduction' },
  { id: 'related-work', title: 'Related Work' },
  { id: 'methodology', title: 'Methodology' },
  { id: 'pipeline-process', title: 'Pipeline Process' },
  { id: 'metaheuristics', title: 'Metaheuristics' },
  { id: 'tree-methods', title: 'Tree Methods' },
  { id: 'classification-strategy', title: 'Classification Strategy' },
  { id: 'results-models', title: 'Results - Models' },
  { id: 'results-optimizers', title: 'Results - Optimizers' },
  { id: 'conclusion', title: 'Conclusion' },
  { id: 'acknowledgments', title: 'Acknowledgments' }
];

export const SlideProvider: React.FC<{ children: React.ReactNode; initialSlides?: SlideData[] }> = ({ children, initialSlides }) => {
  const [slides] = useState<SlideData[]>(() => initialSlides ?? defaultSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [presentationMode, setPresentationMode] = useState<boolean>(true);

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= slides.length) return;
    setCurrentSlideIndex(index);
  }, [slides.length]);

  const goToSlideById = useCallback((id: string) => {
    const idx = slides.findIndex(s => s.id === id);
    if (idx !== -1) goToSlide(idx);
  }, [slides, goToSlide]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlideIndex + 1);
  }, [currentSlideIndex, goToSlide]);

  const previousSlide = useCallback(() => {
    goToSlide(currentSlideIndex - 1);
  }, [currentSlideIndex, goToSlide]);

  const togglePresentationMode = useCallback(() => {
    setPresentationMode(prev => !prev);
  }, []);

  const getTotalSlides = useCallback(() => slides.length, [slides.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Only handle keys if not typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': {
          event.preventDefault();
          nextSlide();
          break;
        }
        case 'ArrowLeft':
        case 'ArrowUp': {
          event.preventDefault();
          previousSlide();
          break;
        }
        case 'Home': {
          event.preventDefault();
          goToSlide(0);
          break;
        }
        case 'End': {
          event.preventDefault();
          goToSlide(slides.length - 1);
          break;
        }
        case 'Escape': {
          event.preventDefault();
          togglePresentationMode();
          break;
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [nextSlide, previousSlide, goToSlide, slides.length, togglePresentationMode]);

  // No need for body class toggling since we're always in full-screen mode

  const value = useMemo<SlideContextValue>(() => ({
    slides,
    currentSlideIndex,
    presentationMode,
    goToSlide,
    goToSlideById,
    nextSlide,
    previousSlide,
    togglePresentationMode,
    getTotalSlides
  }), [slides, currentSlideIndex, presentationMode, goToSlide, goToSlideById, nextSlide, previousSlide, togglePresentationMode, getTotalSlides]);

  return (
    <SlideContext.Provider value={value}>{children}</SlideContext.Provider>
  );
};

export const useSlides = (): SlideContextValue => {
  const ctx = useContext(SlideContext);
  if (!ctx) throw new Error('useSlides must be used within SlideProvider');
  return ctx;
};
