import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface SlideData {
  id: string;
  title: string;
  isSubslide?: boolean;
  parentSlideId?: string;
  subsectionIndex?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private slides: SlideData[] = [
    { id: 'presentation', title: 'Presentation' },
    { id: 'introduction', title: 'Introduction' },
    { id: 'problematic', title: 'Problematic' },
    { id: 'related-work', title: 'Related Work' },
    { id: 'research-diagram', title: 'Research Diagram' },
    { id: 'datasets', title: 'Datasets' },
    { id: 'results', title: 'Results' },
    { id: 'discussion', title: 'Discussion' },
    { id: 'future-work', title: 'Future Work' },
    { id: 'conclusion', title: 'Conclusion' },
    { id: 'thanks', title: 'Acknowledgments' }
  ];

  private currentSlideIndex = 0;
  private presentationMode = true;

  // Observables
  private currentSlideSubject = new BehaviorSubject<number>(0);
  private presentationModeSubject = new BehaviorSubject<boolean>(true);
  private slideChangeSubject = new Subject<{ direction: 'next' | 'prev' | 'goto', index: number }>();

  currentSlide$ = this.currentSlideSubject.asObservable();
  presentationMode$ = this.presentationModeSubject.asObservable();
  slideChange$ = this.slideChangeSubject.asObservable();

  constructor() {
    this.setupKeyboardNavigation();
    // Initialize presentation mode
    document.body.classList.add('presentation-mode');
  }

  private setupKeyboardNavigation(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (!this.presentationMode) return;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          event.preventDefault();
          this.nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          this.previousSlide();
          break;
        case 'Home':
          event.preventDefault();
          this.goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          this.goToSlide(this.slides.length - 1);
          break;
        case 'Escape':
          event.preventDefault();
          this.togglePresentationMode();
          break;
      }
    });
  }

  nextSlide(): void {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex++;
      this.currentSlideSubject.next(this.currentSlideIndex);
      this.slideChangeSubject.next({ direction: 'next', index: this.currentSlideIndex });
      this.scrollToCurrentSlide();
    }
  }

  previousSlide(): void {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.currentSlideSubject.next(this.currentSlideIndex);
      this.slideChangeSubject.next({ direction: 'prev', index: this.currentSlideIndex });
      this.scrollToCurrentSlide();
    }
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlideIndex = index;
      this.currentSlideSubject.next(this.currentSlideIndex);
      this.slideChangeSubject.next({ direction: 'goto', index: this.currentSlideIndex });
      this.scrollToCurrentSlide();
    }
  }

  goToSlideById(slideId: string): void {
    const index = this.slides.findIndex(slide => slide.id === slideId);
    if (index !== -1) {
      this.goToSlide(index);
    }
  }

  togglePresentationMode(): void {
    this.presentationMode = !this.presentationMode;
    this.presentationModeSubject.next(this.presentationMode);
    
    if (this.presentationMode) {
      document.body.classList.add('presentation-mode');
      this.scrollToCurrentSlide();
    } else {
      document.body.classList.remove('presentation-mode');
    }
  }

  private scrollToCurrentSlide(): void {
    if (!this.presentationMode) return;
    
    const currentSlide = this.slides[this.currentSlideIndex];
    const element = document.getElementById(currentSlide.id);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  getCurrentSlide(): SlideData {
    return this.slides[this.currentSlideIndex];
  }

  getCurrentSlideIndex(): number {
    return this.currentSlideIndex;
  }

  getTotalSlides(): number {
    return this.slides.length;
  }

  getSlides(): SlideData[] {
    return [...this.slides];
  }

  isPresentationMode(): boolean {
    return this.presentationMode;
  }

  // Method to add subsections/subslides dynamically
  addSubslide(parentId: string, title: string, subsectionIndex: number): void {
    const parentIndex = this.slides.findIndex(slide => slide.id === parentId);
    if (parentIndex !== -1) {
      const subslideId = `${parentId}-sub-${subsectionIndex}`;
      const subslide: SlideData = {
        id: subslideId,
        title: title,
        isSubslide: true,
        parentSlideId: parentId,
        subsectionIndex: subsectionIndex
      };
      
      // Insert subslide after the parent slide
      this.slides.splice(parentIndex + 1, 0, subslide);
    }
  }

  // Method to check if content overflows and needs subslides
  checkContentOverflow(elementId: string): boolean {
    const element = document.getElementById(elementId);
    if (!element) return false;
    
    const elementHeight = element.scrollHeight;
    const viewportHeight = window.innerHeight;
    
    // If content is more than 90% of viewport height, it might need subslides
    return elementHeight > viewportHeight * 0.9;
  }
}
