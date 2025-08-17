import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { WORKER_STATUS, WorkerInfo } from '../../../../shared/types';
import { RecentLogsPipe } from '../../shared/pipes';

@Component({
  selector: 'app-worker-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RecentLogsPipe,
  ],
  templateUrl: './worker-card.component.html',
  styleUrl: './worker-card.component.scss',
})
export class WorkerCardComponent {
  worker = input.required<WorkerInfo>();
  killWorker = input.required<(id: string) => void>();

  shortId = computed(() => this.worker().id.substring(0, 8));
  isTerminated = computed(
    () => this.worker().status === WORKER_STATUS.TERMINATED,
  );
  private readonly now = signal(Date.now());
  private intervalId?: number | undefined;

  elapsedTime = computed(() => {
    const start = this.worker().startTime
      ? new Date(this.worker().startTime).getTime()
      : 0;
    const diffMs = this.now() - start;
    const seconds = Math.floor(diffMs / 1000) % 60;
    const minutes = Math.floor(diffMs / 1000 / 60);
    return `${minutes}m ${seconds}s`;
  });

  constructor() {
    this.intervalId = window.setInterval(() => {
      if (!this.isTerminated()) {
        this.now.set(Date.now());
      } else if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = undefined;
      }
    }, 1000);
  }
}
