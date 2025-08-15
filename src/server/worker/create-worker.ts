import { randomUUID } from 'node:crypto';
import { Worker } from 'worker_threads';
import { Server as SocketServer } from 'socket.io';
import {
  ServerWorkersMap,
  WORKER_EVENT,
  WORKER_STATUS,
  WorkerInfo,
} from '../../shared/types';
import { handleWorkerMessage } from './handlers/message-handler';
import { handleWorkerExit } from './handlers/exit-handler';

import path from 'node:path';

export function createWorker(
  io: SocketServer,
  workers: ServerWorkersMap,
): WorkerInfo {
  const workerId = randomUUID();
  const workerInfo: WorkerInfo = {
    id: workerId,
    startTime: new Date(),
    status: WORKER_STATUS.RUNNING,
    logs: [],
  };

  const workerPath = path.resolve(__dirname, 'worker.js');
  const worker = new Worker(workerPath);

  worker.on(WORKER_EVENT.MESSAGE, (message) => {
    handleWorkerMessage(io, workerId, workerInfo, message);
  });

  worker.on(WORKER_EVENT.EXIT, (code) => {
    handleWorkerExit(io, workerId, workerInfo, workers, code);
  });

  workers.set(workerId, { info: workerInfo, thread: worker });
  return workerInfo;
}
