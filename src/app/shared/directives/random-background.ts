import { Directive, inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appRandomBackground]',
  standalone: true,
  exportAs: 'randomBackground',
})
export class RandomBackground {
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  public changeBackground(): void {
    this.setRandomBackground();
  }

  private setRandomBackground(): void {
    const gradient = this.generateRandomGradient();

    this.renderer.setStyle(this.document.body, 'background', gradient);
  }

  private generateRandomGradient(): string {
    const color1 = this.generateRandomHexColor();
    const color2 = this.generateRandomHexColor();
    const angle = Math.floor(Math.random() * 360);

    return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  }

  private generateRandomHexColor(): string {
    const hex = Math.floor(Math.random() * 16777215).toString(16);
    return `#${hex.padStart(6, '0')}`;
  }
}
