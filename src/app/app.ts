import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  DragDropModule,
  moveItemInArray,
  CdkDragMove,
} from '@angular/cdk/drag-drop';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterService } from './services/character.service';
import { VisibilityTrackerDirective } from './directives/visibility-tracker.directive';
import type { Character } from './models/character';

const DROP_TARGET_DISTANCE_THRESHOLD = 40;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CharacterCardComponent,
    DragDropModule,
    VisibilityTrackerDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly characterService = inject(CharacterService);
  private readonly _characters = signal<Character[]>(
    this.characterService.characters(),
  );

  @ViewChildren('dropSeparator') separators!: QueryList<
    ElementRef<HTMLDivElement>
  >;

  protected dropTargetIndex = signal<number | null>(null);
  protected draggedItemIndex = signal<number | null>(null);
  protected isDragging = signal(false);
  protected visibleSeparatorIndices = signal<Set<number>>(new Set());

  protected readonly title = 'My Personal Top Characters';
  protected readonly characters = this._characters.asReadonly();

  protected onSeparatorVisibilityChanged(
    index: number,
    isVisible: boolean,
  ): void {
    const currentVisible = new Set(this.visibleSeparatorIndices());

    if (isVisible) {
      currentVisible.add(index);
    } else {
      currentVisible.delete(index);
    }

    this.visibleSeparatorIndices.set(currentVisible);
  }

  protected onDragStarted(index: number): void {
    this.draggedItemIndex.set(index);
    this.isDragging.set(true);
  }

  protected onDragEnded(): void {
    this.dropTargetIndex.set(null);
    this.draggedItemIndex.set(null);
    this.isDragging.set(false);
  }

  protected onDragMoved(event: CdkDragMove): void {
    const previewY = event.pointerPosition.y;
    const visibleIndices = this.visibleSeparatorIndices();
    const allSeparators = this.separators.toArray();

    let targetIndex: number | null = null;
    let minDistance = Infinity;

    visibleIndices.forEach((separatorIndex) => {
      const separatorRef = allSeparators[separatorIndex];
      if (!separatorRef) return;

      const separator = separatorRef.nativeElement;

      const sepRect = separator.getBoundingClientRect();
      const sepCenterY = sepRect.top + sepRect.height / 2;
      const distance = Math.abs(previewY - sepCenterY);

      if (distance < DROP_TARGET_DISTANCE_THRESHOLD && distance < minDistance) {
        minDistance = distance;
        targetIndex = separatorIndex;
      }
    });

    this.dropTargetIndex.set(targetIndex);
  }

  protected onDragReleased(): void {
    const targetIndex = this.dropTargetIndex();

    if (targetIndex !== null) {
      const characters = this._characters();
      const draggedIndex = this.draggedItemIndex();

      if (draggedIndex !== null) {
        let insertIndex = targetIndex;
        if (targetIndex > draggedIndex) {
          insertIndex = targetIndex - 1;
        }

        insertIndex = Math.max(0, Math.min(insertIndex, characters.length));

        if (insertIndex !== draggedIndex) {
          moveItemInArray(characters, draggedIndex, insertIndex);
          this._characters.set([...characters]);
        }
      }
    }
  }
}
