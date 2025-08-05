import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private readonly _count = signal(0);

  public readonly count = this._count.asReadonly();

  public increment(): void {
    this._count.update((current) => current + 1);
  }

  public decrement(): void {
    this._count.update((current) => current - 1);
  }
}
