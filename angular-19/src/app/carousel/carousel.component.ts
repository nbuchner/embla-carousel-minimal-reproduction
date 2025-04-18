import { Component, HostListener, ViewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { EmblaCarouselDirective, EmblaCarouselType, EmblaEventType } from 'embla-carousel-angular';

@Component({
  selector: 'app-carousel',
  imports: [
    NgOptimizedImage,
    EmblaCarouselDirective
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @ViewChild(EmblaCarouselDirective) emblaRef!: EmblaCarouselDirective;

  currentIndex: number = 0;

  galleryData = [
    { alt: 'Image 1', url: 'white_black.svg', width: 600, height: 400 },
    { alt: 'Image 2', url: 'red_white.svg', width: 600, height: 400 },
    { alt: 'Image 3', url: 'white_yellow.svg', width: 600, height: 400 },
  ];
  totalImageCount: number = this.galleryData.length;

  // Carousel config
  private emblaApi?: EmblaCarouselType;
  protected options = { loop: true };

  // Icons
  // Image count
  protected displayIndex = this.currentIndex;
  private lastSlideIndex = -1; // Store the last slide index to prevent double changes

  ngAfterViewInit() {
    this.emblaApi = this.emblaRef.emblaApi;
    this.emblaRef.scrollTo(this.currentIndex, true);
  }

  // Keyboard navigation
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.emblaRef.scrollPrev();
    }
    if (event.key === 'ArrowRight') {
      this.emblaRef.scrollNext();
    }
  }

  // Update image number
  public readonly eventSubscriptions: EmblaEventType[] = ['slidesInView'];

  onImageChanged() {
    const currentSlideIndex = this.emblaApi?.selectedScrollSnap();

    if (typeof currentSlideIndex === 'undefined') {
      console.error('Cannot get current slide index:', currentSlideIndex);
      this.displayIndex = 0;
      return;
    }

    // Only update if the current slide index has actually changed
    if (currentSlideIndex !== this.lastSlideIndex) {
      this.displayIndex = currentSlideIndex + 1;
      this.lastSlideIndex = currentSlideIndex;
    }
  }
}
