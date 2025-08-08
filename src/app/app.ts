import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterService } from './services/character.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CharacterCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly characterService = inject(CharacterService);
  private readonly _dragMode = signal(false);

  protected readonly title = 'My Personal Top Characters';
  protected readonly characters = this.characterService.characters;
  protected readonly dragMode = this._dragMode.asReadonly();

  protected onDragModeToggled(characterId: number): void {
    console.log(`Drag mode toggled for character ${characterId}`);
  }
}
