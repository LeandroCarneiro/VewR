import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideService } from '../../services/slide.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slide-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-controls.component.html',
  styleUrls: ['./slide-controls.component.scss']
})
export class SlideControlsComponent implements OnInit, OnDestroy {
  currentSlideIndex = 0;
  totalSlides = 0;
  presentationMode = false;
  
  private subscriptions: Subscription[] = [];

  constructor(private slideService: SlideService) {}

  ngOnInit(): void {
    this.totalSlides = this.slideService.getTotalSlides();
    
    // Subscribe to slide changes
    this.subscriptions.push(
      this.slideService.currentSlide$.subscribe(index => {
        this.currentSlideIndex = index;
      })
    );

    // Subscribe to presentation mode changes
    this.subscriptions.push(
      this.slideService.presentationMode$.subscribe(mode => {
        this.presentationMode = mode;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  previousSlide(): void {
    this.slideService.previousSlide();
  }

  nextSlide(): void {
    this.slideService.nextSlide();
  }

  togglePresentationMode(): void {
    this.slideService.togglePresentationMode();
  }

  goToFirstSlide(): void {
    this.slideService.goToSlide(0);
  }

  goToLastSlide(): void {
    this.slideService.goToSlide(this.totalSlides - 1);
  }

  get canGoPrevious(): boolean {
    return this.currentSlideIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentSlideIndex < this.totalSlides - 1;
  }

  get slideProgress(): number {
    return ((this.currentSlideIndex + 1) / this.totalSlides) * 100;
  }
}
