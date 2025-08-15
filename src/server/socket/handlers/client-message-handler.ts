import { Server as SocketServer, Socket } from 'socket.io';
import {
  ClientMessage,
  MESSAGE,
  ServerMessage,
  ServerWorkersMap,
  SOCKET_EVENT,
} from '../../../shared/types.js';
import { createWorker } from '../../worker/actions/create-worker.js';
import { killWorker } from '../../worker/actions/kill-worker.js';
import { SERVER_MESSAGES } from '../../../shared/constants/messages.js';

export function handleClientMessage(
  socket: Socket,
  io: SocketServer,
  workers: ServerWorkersMap,
  message: ClientMessage,
): void {
  console.log(SERVER_MESSAGES.MESSAGE_RECEIVED, message);

  switch (message.type) {
    case MESSAGE.START_WORKER: {
      const newWorker = createWorker(io, workers);
      const response: ServerMessage = {
        type: MESSAGE.WORKER_STARTED,
        worker: newWorker,
      };
      io.emit(SOCKET_EVENT.MESSAGE, response);
      break;
    }

    case MESSAGE.KILL_WORKER: {
      const success = killWorker(workers, message.workerId);
      if (!success) {
        console.log(
          SERVER_MESSAGES.WORKER_KILL_ATTEMPT_FAILED(message.workerId),
        );
      }
      break;
    }

    default:
      console.log(SERVER_MESSAGES.MESSAGE_UNKNOWN, message);
  }
}
