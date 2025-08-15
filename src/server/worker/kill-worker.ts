import {
  MESSAGE,
  ServerWorkersMap,
  WORKER_STATUS,
  WorkerThreadMessage,
} from '../../shared/types';

export function killWorker(
  workers: ServerWorkersMap,
  workerId: string,
): boolean {
  const worker = workers.get(workerId);
  if (worker && worker.info.status === WORKER_STATUS.RUNNING) {
    const terminateMessage: WorkerThreadMessage = { type: MESSAGE.TERMINATE };
    worker.thread.postMessage(terminateMessage);
    worker.info.status = WORKER_STATUS.TERMINATED;
    return true;
  }
  return false;
}
