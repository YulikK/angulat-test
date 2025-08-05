import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-counter-button',
  standalone: true,
  imports: [],
  template: '{{ label() }}',
  styleUrl: './counter-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.type]': '"button"',
    '[attr.aria-label]': 'label()',
    '[class.danger]': 'variant() === "danger"',
    '[class.success]': 'variant() === "success"',
    '(click)': 'onClick()',
  },
})
export class CounterButton {
  public readonly label = input.required<string>();
  public readonly variant = input<'danger' | 'success'>('success');

  public readonly buttonClick = output<void>();

  onClick(): void {
    this.buttonClick.emit();
  }
}
