import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterService } from './services/counter.service';
import { CounterButton } from './shared/components/counter-button/counter-button';
import { RandomBackground } from './shared/directives/random-background';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CounterButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RandomBackground,
      inputs: [],
      outputs: [],
    },
  ],
  host: {
    '[class.counter-container]': 'true',
  },
})
export class App {
  private readonly counterService = inject(CounterService);
  private readonly randomBackground = inject(RandomBackground);

  protected readonly count = this.counterService.count;

  constructor() {
    effect(() => {
      this.count();
      this.randomBackground.changeBackground();
    });
  }

  protected onIncrement(): void {
    this.counterService.increment();
  }

  protected onDecrement(): void {
    this.counterService.decrement();
  }
}
