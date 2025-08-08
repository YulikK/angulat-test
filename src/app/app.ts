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
  CdkDragDrop,
  moveItemInArray,
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

  protected readonly title = 'My Personal Top Characters';
  protected readonly characters = this._characters.asReadonly();

  protected onDrop(event: CdkDragDrop<Character[]>): void {
    const characters = this._characters();
    moveItemInArray(characters, event.previousIndex, event.currentIndex);
    this._characters.set([...characters]);
  }
}
