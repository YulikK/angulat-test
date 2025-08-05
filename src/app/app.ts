import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
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
  private readonly shouldSwap = signal(false);

  private readonly buttonsArray = [
    {
      label: '-',
      variant: 'danger' as const,
      action: () => this.onDecrement(),
    },
    {
      label: '+',
      variant: 'success' as const,
      action: () => this.onIncrement(),
    },
  ];

  protected readonly count = this.counterService.count;

  protected readonly buttons = computed(() => {
    return this.shouldSwap()
      ? [...this.buttonsArray].reverse()
      : this.buttonsArray;
  });

  constructor() {
    effect(() => {
      this.count();
      this.randomBackground.changeBackground();
    });

    effect(() => {
      if (this.count() === 10) {
        this.shouldSwap.update((current) => !current);
      }
    });
  }

  protected onIncrement(): void {
    this.counterService.increment();
  }

  protected onDecrement(): void {
    this.counterService.decrement();
  }
}
