import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {
  WorkerInfo,
  ClientMessage,
  ServerMessage,
  MESSAGE,
  SOCKET_EVENT,
  WORKER_EVENT,
} from '../../../shared/types';
import { CLIENT_ENV } from '../../environments/environment';
import { CLIENT_MESSAGES } from '../../../shared/constants/messages';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  private socket: Socket | null = null;

  public readonly connectionStatus = signal<SOCKET_EVENT>(
    SOCKET_EVENT.CONNECTING,
  );

  public readonly workers = signal<WorkerInfo[]>([]);

  constructor() {
    this.connect();
  }

  connect() {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(CLIENT_ENV.SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    this.socket.on(SOCKET_EVENT.CONNECT, () => {
      this.connectionStatus.set(SOCKET_EVENT.CONNECT);
    });

    this.socket.on(SOCKET_EVENT.DISCONNECT, () => {
      console.log(CLIENT_MESSAGES.CONNECTION_LOST);
      this.connectionStatus.set(SOCKET_EVENT.DISCONNECT);
    });

    this.socket.on(SOCKET_EVENT.MESSAGE, (data: ServerMessage) => {
      this.handleServerMessage(data);
    });

    this.socket.on(SOCKET_EVENT.CONNECT_ERROR, (error) => {
      console.error(CLIENT_MESSAGES.CONNECTION_ERROR, error);
      this.connectionStatus.set(SOCKET_EVENT.CONNECT_ERROR);
    });
  }

  createWorker() {
    if (this.socket?.connected) {
      const message: ClientMessage = { type: MESSAGE.START_WORKER };
      this.socket.emit(WORKER_EVENT.MESSAGE, message);
    }
  }

  killWorker(workerId: string) {
    if (this.socket?.connected) {
      const message: ClientMessage = { type: MESSAGE.KILL_WORKER, workerId };
      this.socket.emit(WORKER_EVENT.MESSAGE, message);
    }
  }

  private handleServerMessage(data: ServerMessage) {
    switch (data.type) {
      case MESSAGE.WORKERS_LIST:
        this.updateWorkersList(data.workers);
        break;
      case MESSAGE.WORKER_STARTED:
        this.addWorker(data.worker);
        break;
      case MESSAGE.WORKER_LOG:
        this.addWorkerLog(data.workerId, data.log);
        break;
      case MESSAGE.WORKER_TERMINATED:
        this.updateWorkerStatus(data.worker);
        break;
    }
  }

  private updateWorkersList(workers: WorkerInfo[]) {
    this.workers.set(workers);
  }

  private addWorker(worker: WorkerInfo) {
    this.workers.set([...this.workers(), { ...worker }]);
  }

  private updateWorkerStatus(workerInfo: WorkerInfo) {
    const workers = this.workers();
    const updated = workers.map((w) =>
      w.id === workerInfo.id ? { ...w, ...workerInfo } : w,
    );
    this.workers.set(updated);
  }

  private addWorkerLog(
    workerId: string,
    log: { timestamp: Date; message: string },
  ) {
    const workers = this.workers();
    const updated = workers.map((w) =>
      w.id === workerId ? { ...w, logs: [...(w.logs ?? []), log] } : w,
    );
    this.workers.set(updated);
  }
}
