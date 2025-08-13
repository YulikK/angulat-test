import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ElementRef,
  effect,
  viewChildren,
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
import { DragDropService } from './services/drag-drop.service';
import type { Character } from './models/character';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CharacterCardComponent,
    DragDropModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly characterService = inject(CharacterService);
  private readonly dragDropService = inject(DragDropService);
  private readonly _characters = signal<Character[]>(
    this.characterService.characters(),
  );

  private readonly separators =
    viewChildren<ElementRef<HTMLDivElement>>('dropSeparator');

  protected draggedItemIndex = signal<number | null>(null);

  protected readonly title = 'My Personal Top Characters';
  protected readonly characters = this._characters.asReadonly();

  protected get dropTargetIndex() {
    return this.dragDropService.dropTargetIndex;
  }

  protected get isDragging() {
    return this.draggedItemIndex() !== null;
  }

  constructor() {
    effect(() => {
      const separatorElements = this.separators();
      if (separatorElements.length > 0) {
        this.dragDropService.initializeSeparators([...separatorElements]);
      }
    });
  }

  protected onDragStarted(index: number): void {
    this.draggedItemIndex.set(index);
  }

  protected onDragMoved(event: CdkDragMove): void {
    this.dragDropService.updateDragPosition(
      event.pointerPosition.x,
      event.pointerPosition.y,
    );
  }

  protected onDragEnded(): void {
    this.draggedItemIndex.set(null);
    this.dragDropService.dropTargetIndex.set(null);
  }

  protected onDragReleased(): void {
    const targetIndex = this.dragDropService.dropTargetIndex();

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
