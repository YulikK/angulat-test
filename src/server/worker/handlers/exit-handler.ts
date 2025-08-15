import { Server as SocketServer } from 'socket.io';
import {
  MESSAGE,
  ServerMessage,
  ServerWorkersMap,
  SOCKET_EVENT,
  WORKER_STATUS,
  WorkerInfo,
} from '../../../shared/types';
import { SERVER_MESSAGES } from '../../../shared/constants/messages.js';

export function handleWorkerExit(
  io: SocketServer,
  workerId: string,
  workerInfo: WorkerInfo,
  workers: ServerWorkersMap,
  code: number | null,
): void {
  console.log(SERVER_MESSAGES.WORKER_EXIT(workerId, code));
  workerInfo.status = WORKER_STATUS.TERMINATED;

  const serverMessage: ServerMessage = {
    type: MESSAGE.WORKER_TERMINATED,
    workerId: workerId,
  };
  io.emit(SOCKET_EVENT.MESSAGE, serverMessage);

  workers.delete(workerId);
}
