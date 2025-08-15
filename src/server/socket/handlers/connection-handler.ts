import { Server as SocketServer, Socket } from 'socket.io';
import {
  MESSAGE,
  ServerMessage,
  ServerWorkersMap,
  SOCKET_EVENT,
} from '../../../shared/types.js';
import { handleClientMessage } from './client-message-handler.js';
import { SERVER_MESSAGES } from '../../../shared/constants/messages.js';

export function handleConnection(
  socket: Socket,
  io: SocketServer,
  workers: ServerWorkersMap,
): void {
  console.log(SERVER_MESSAGES.CLIENT_CONNECTED(socket.id));

  const workersArray = Array.from(workers.values()).map((w) => w.info);
  const welcomeMessage: ServerMessage = {
    type: MESSAGE.WORKERS_LIST,
    workers: workersArray,
  };
  socket.emit(SOCKET_EVENT.MESSAGE, welcomeMessage);

  socket.on(SOCKET_EVENT.MESSAGE, (message) => {
    handleClientMessage(socket, io, workers, message);
  });

  socket.on(SOCKET_EVENT.DISCONNECT, () => {
    console.log(SERVER_MESSAGES.CLIENT_DISCONNECTED(socket.id));
  });
}
