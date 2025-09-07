import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideService, SlideData } from '../../services/slide.service';
import { Subscription } from 'rxjs';

interface NavItem {
  id: string;
  title: string;
  isActive: boolean;
  slideIndex: number;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  navItems: NavItem[] = [];
  currentSlideIndex = 0;
  totalSlides = 0;
  presentationMode = false;
  progressPercentage = 0;
  
  private subscriptions: Subscription[] = [];

  constructor(private slideService: SlideService) {}

  ngOnInit() {
    this.initializeNavItems();
    this.setupSubscriptions();
    this.updateProgress();
    
    // Keep the original section-active listener for backward compatibility
    window.addEventListener('section-active', this.onSectionActive.bind(this));
    window.addEventListener('scroll', this.updateProgress.bind(this));
  }
  
  private initializeNavItems() {
    const slides = this.slideService.getSlides();
    this.totalSlides = slides.length;
    
    this.navItems = slides.map((slide, index) => ({
      id: slide.id,
      title: slide.title,
      isActive: index === 0,
      slideIndex: index
    }));
  }
  
  private setupSubscriptions() {
    // Subscribe to current slide changes
    this.subscriptions.push(
      this.slideService.currentSlide$.subscribe(index => {
        this.currentSlideIndex = index;
        this.updateActiveNavItem(index);
        this.updateProgress();
      })
    );
    
    // Subscribe to presentation mode changes
    this.subscriptions.push(
      this.slideService.presentationMode$.subscribe(mode => {
        this.presentationMode = mode;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    window.removeEventListener('section-active', this.onSectionActive.bind(this));
    window.removeEventListener('scroll', this.updateProgress.bind(this));
  }
  
  private updateActiveNavItem(slideIndex: number) {
    this.navItems.forEach((item, index) => {
      item.isActive = index === slideIndex;
    });
  }

  onSectionActive(event: any) {
    if (!this.presentationMode) {
      const activeId = event.detail.sectionId;
      this.navItems.forEach(item => {
        item.isActive = item.id === activeId;
      });
    }
  }

  updateProgress() {
    if (this.presentationMode) {
      // In presentation mode, progress is based on slide number
      this.progressPercentage = ((this.currentSlideIndex + 1) / this.totalSlides) * 100;
    } else {
      // In scroll mode, progress is based on scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.progressPercentage = (scrollTop / scrollHeight) * 100;
    }
  }

  scrollToSection(sectionId: string) {
    if (this.presentationMode) {
      // Use slide service to navigate to slide
      this.slideService.goToSlideById(sectionId);
    } else {
      // Use normal scrolling
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
  
  navigateToSlide(slideIndex: number) {
    this.slideService.goToSlide(slideIndex);
  }
  
  togglePresentationMode() {
    this.slideService.togglePresentationMode();
  }
}
