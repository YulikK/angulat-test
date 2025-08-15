import { Server as SocketServer } from 'socket.io';
import {
  MESSAGE,
  ServerMessage,
  SOCKET_EVENT,
  WorkerInfo,
  WorkerThreadMessage,
} from '../../../shared/types';

export function handleWorkerMessage(
  io: SocketServer,
  workerId: string,
  workerInfo: WorkerInfo,
  message: WorkerThreadMessage,
): void {
  if (message.type === MESSAGE.LOG) {
    const log = {
      timestamp: message.timestamp,
      message: message.message,
    };

    workerInfo.logs.push(log);

    const serverMessage: ServerMessage = {
      type: MESSAGE.WORKER_LOG,
      workerId: workerId,
      log: log,
    };
    io.emit(SOCKET_EVENT.MESSAGE, serverMessage);
  }
}
