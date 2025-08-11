import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Character } from '../../models/character';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    DragDropModule,
  ],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent {
  public readonly character = input.required<Character>();
  public readonly isDragActive = input<boolean>(false);
}
