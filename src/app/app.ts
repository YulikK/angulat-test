import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
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
  private readonly _characters = signal<Character[]>(
    this.characterService.characters(),
  );

  protected dropTargetIndex = signal<number | null>(null);
  protected draggedItemIndex = signal<number | null>(null);
  protected isDragging = signal<boolean>(false);

  protected readonly title = 'My Personal Top Characters';
  protected readonly characters = this._characters.asReadonly();

  protected onDragStarted(index: number): void {
    this.draggedItemIndex.set(index);
    this.isDragging.set(true);
  }

  protected onDragEnded(): void {
    document.body.classList.remove('dropping-to-separator');

    const allDragElements = document.querySelectorAll(
      '.cdk-drag, .cdk-drag-animating',
    );
    allDragElements.forEach((el) => {
      (el as HTMLElement).style.transition = '';
      (el as HTMLElement).style.transform = '';
    });

    this.dropTargetIndex.set(null);
    this.draggedItemIndex.set(null);
    this.isDragging.set(false);
  }

  protected onDragMoved(event: CdkDragMove): void {
    const previewY = event.pointerPosition.y;

    const separators = document.querySelectorAll('.drop-separator.visible');
    let targetIndex: number | null = null;
    let minDistance = Infinity;

    separators.forEach((separator, index) => {
      const sepRect = separator.getBoundingClientRect();
      const sepCenterY = sepRect.top + sepRect.height / 2;
      const distance = Math.abs(previewY - sepCenterY);

      if (distance < 40 && distance < minDistance) {
        minDistance = distance;
        targetIndex = index;
      }
    });

    this.dropTargetIndex.set(targetIndex);
  }

  protected onDragReleased(): void {
    const targetIndex = this.dropTargetIndex();

    if (targetIndex !== null) {
      const preview = document.querySelector('.cdk-drag-preview');
      if (preview) {
        (preview as HTMLElement).style.opacity = '0';
        (preview as HTMLElement).style.transition = 'opacity 0.1s ease-out';
      }

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
    } else {
      console.log('No active separator, item stays in place');
    }
  }
}
