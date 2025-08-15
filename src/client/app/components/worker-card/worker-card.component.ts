import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { WORKER_STATUS, WorkerInfo } from '../../../../shared/types';
import {
  UptimePipe,
  StatusColorPipe,
  StatusIconPipe,
  StatusTextPipe,
  RecentLogsPipe,
} from '../../shared/pipes';

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
    UptimePipe,
    StatusColorPipe,
    StatusIconPipe,
    StatusTextPipe,
    RecentLogsPipe,
  ],
  templateUrl: './worker-card.component.html',
  styleUrl: './worker-card.component.scss',
})
export class WorkerCardComponent {
  worker = input.required<WorkerInfo>();
  shortId = computed(() => this.worker().id.substring(0, 8));
  isTerminated = computed(
    () => this.worker().status === WORKER_STATUS.TERMINATED,
  );
  totalPredictions = computed(() => this.worker().logs?.length || 0);
}
