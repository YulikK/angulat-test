import {
  Injectable,
  ElementRef,
  signal,
  computed,
  OnDestroy,
} from '@angular/core';

const DISTANCE_THRESHOLD = 40;
const INTERSECTION_OPTIONS: IntersectionObserverInit = {
  root: null,
  threshold: 0.1,
  rootMargin: '50px',
};

@Injectable({
  providedIn: 'root',
})
export class DragDropService implements OnDestroy {
  private readonly separators = signal<Map<number, ElementRef<HTMLDivElement>>>(
    new Map(),
  );
  private readonly visibleSeparators = signal<Set<number>>(new Set());

  readonly dropTargetIndex = signal<number | null>(null);

  private separatorObserver: IntersectionObserver | undefined;

  readonly visibleSeparatorsList = computed(() => {
    const visible = this.visibleSeparators();
    const all = this.separators();
    return Array.from(visible)
      .map((index) => ({ index, element: all.get(index)! }))
      .filter((item) => item.element);
  });

  initializeSeparators(separators: ElementRef<HTMLDivElement>[]): void {
    this.cleanup();

    const separatorMap = new Map<number, ElementRef<HTMLDivElement>>();
    separators.forEach((separator, index) =>
      separatorMap.set(index, separator),
    );
    this.separators.set(separatorMap);

    this.setupSeparatorVisibilityObserver(separators);
  }

  updateDragPosition(x: number, y: number): void {
    const visibleSeparatorsList = this.visibleSeparatorsList();
    let closestIndex: number | null = null;
    let minDistance = Infinity;

    visibleSeparatorsList.forEach(({ index, element }) => {
      const rect = element.nativeElement.getBoundingClientRect();

      const separatorCenterY = rect.top + rect.height / 2;
      const distance = Math.abs(y - separatorCenterY);

      if (
        x >= rect.left &&
        x <= rect.right &&
        distance < DISTANCE_THRESHOLD &&
        distance < minDistance
      ) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    this.dropTargetIndex.set(closestIndex);
  }

  private setupSeparatorVisibilityObserver(
    separators: ElementRef<HTMLDivElement>[],
  ): void {
    this.separatorObserver = new IntersectionObserver((entries) => {
      const currentVisible = new Set(this.visibleSeparators());

      entries.forEach((entry) => {
        const index = separators.findIndex(
          (ref) => ref.nativeElement === entry.target,
        );

        if (index !== -1) {
          if (entry.isIntersecting) {
            currentVisible.add(index);
          } else {
            currentVisible.delete(index);
          }
        }
      });

      this.visibleSeparators.set(currentVisible);
    }, INTERSECTION_OPTIONS);

    separators.forEach((separator) => {
      this.separatorObserver!.observe(separator.nativeElement);
    });
  }

  private cleanup(): void {
    if (this.separatorObserver) {
      this.separatorObserver.disconnect();
      this.separatorObserver = undefined;
    }
    this.separators.set(new Map());
    this.visibleSeparators.set(new Set());
  }

  ngOnDestroy(): void {
    this.cleanup();
  }
}
