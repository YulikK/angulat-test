import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {
  WorkerInfo,
  ClientMessage,
  ServerMessage,
  MESSAGE,
  WORKER_STATUS,
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
      console.log(CLIENT_MESSAGES.CONNECTION_ESTABLISHED);
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

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.connectionStatus.set(SOCKET_EVENT.DISCONNECT);
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
    console.log(CLIENT_MESSAGES.WORKER_LIST_UPDATED, this.workers().length);

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
        this.updateWorkerStatus(data.workerId, WORKER_STATUS.TERMINATED);
        break;
    }
  }

  private updateWorkersList(workers: WorkerInfo[]) {
    this.workers.set(workers);
  }

  private addWorker(worker: WorkerInfo) {
    this.workers.set([...this.workers(), { ...worker }]);
  }

  private updateWorkerStatus(workerId: string, status: WORKER_STATUS) {
    const workers = this.workers();
    const worker = workers.find((w) => w.id === workerId);
    if (worker) {
      worker.status = status;
      this.workers.set([...workers]);
    }
  }

  private addWorkerLog(
    workerId: string,
    log: { timestamp: Date; message: string },
  ) {
    const workers = this.workers();
    const worker = workers.find((w) => w.id === workerId);
    if (worker) {
      if (!worker.logs) {
        worker.logs = [];
      }
      worker.logs.push(log);
      this.workers.set([...workers]);
    }
  }
}
