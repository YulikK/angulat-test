import {
  Component,
  signal,
  computed,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { WorkerCardComponent } from '../worker-card/worker-card.component';
import { WorkerService } from '../../services/worker.service';
import {
  SOCKET_EVENT,
  WORKER_STATUS,
  WorkerInfo,
} from '../../../../shared/types';
import {
  StatusConnectionIconPipe,
  StatusConnectionTextPipe,
} from '../../shared/pipes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    WorkerCardComponent,
    StatusConnectionIconPipe,
    StatusConnectionTextPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly workerService = inject(WorkerService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly workersData = signal<WorkerInfo[]>([]);

  workers = computed(() => this.workerService.workers());
  readonly connectionStatus = computed(() =>
    this.workerService.connectionStatus(),
  );
  isConnected = computed(
    () => this.workerService.connectionStatus() === SOCKET_EVENT.CONNECT,
  );
  totalWorkers = computed(() => this.workers().length);
  activeWorkers = computed(
    () =>
      this.workers().filter((w) => w.status === WORKER_STATUS.RUNNING).length,
  );
  terminatedWorkers = computed(
    () =>
      this.workers().filter((w) => w.status === WORKER_STATUS.TERMINATED)
        .length,
  );

  createWorker() {
    if (this.isConnected()) {
      this.workerService.createWorker();
      this.snackBar.open('🔮 Start new session', 'Close', {
        duration: 2000,
        panelClass: ['info-snackbar'],
      });
    }
  }

  killWorker = (id: string) => this.workerService.killWorker(id);
}
