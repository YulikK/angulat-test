import { Directive, ElementRef, inject, output } from '@angular/core';

const INTERSECTION_OPTIONS = {
  root: null,
  threshold: 0.1,
  rootMargin: '50px',
};

@Directive({
  selector: '[appVisibilityTracker]',
  standalone: true,
})
export class VisibilityTrackerDirective {
  private readonly elementRef = inject(ElementRef);

  visibilityChanged = output<boolean>();

  constructor() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === this.elementRef.nativeElement) {
          this.visibilityChanged.emit(entry.isIntersecting);
        }
      });
    }, INTERSECTION_OPTIONS);

    observer.observe(this.elementRef.nativeElement);
  }
}
