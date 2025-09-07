import { Component, Input, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideService } from '../../services/slide.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sectionId!: string;
  @Input() sectionTitle?: string;
  @Input() animationClass: string = 'fade-in';
  @Input() backgroundTheme?: string;
  
  isInView = false;
  presentationMode = true;
  isCurrentSlide = false;
  private observer!: IntersectionObserver;
  private subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private slideService: SlideService
  ) {}

  ngOnInit() {
    // Subscribe to presentation mode changes
    this.subscriptions.push(
      this.slideService.presentationMode$.subscribe(mode => {
        this.presentationMode = mode;
      })
    );

    // Subscribe to current slide changes
    this.subscriptions.push(
      this.slideService.currentSlide$.subscribe(index => {
        const currentSlide = this.slideService.getSlides()[index];
        this.isCurrentSlide = currentSlide?.id === this.sectionId;
      })
    );
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
    
    // Check if content overflows in presentation mode
    setTimeout(() => {
      if (this.presentationMode && this.slideService.checkContentOverflow(this.sectionId)) {
        // Content is too large, might need subsections
        console.log(`Section ${this.sectionId} content might be too large for single slide`);
      }
    }, 1000);
  }

  private setupIntersectionObserver() {
    const options = {
      threshold: 0.3,
      rootMargin: '0px 0px -10% 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isInView = true;
          // Notify navigation component about active section
          window.dispatchEvent(new CustomEvent('section-active', { 
            detail: { sectionId: this.sectionId } 
          }));
        }
      });
    }, options);

    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
