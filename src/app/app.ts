import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterService } from './services/counter.service';
import { CounterButton } from './shared/components/counter-button/counter-button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CounterButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.counter-container]': 'true',
  },
})
export class App {
  private readonly counterService = inject(CounterService);

  protected readonly count = this.counterService.count;

  protected onIncrement(): void {
    this.counterService.increment();
  }

  protected onDecrement(): void {
    this.counterService.decrement();
  }
}
