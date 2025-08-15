import { Server as SocketServer } from 'socket.io';
import { METHODS, ServerWorkersMap, SOCKET_EVENT } from '../../shared/types.js';
import { SERVER_ENV } from '../constants/environment.js';
import { handleConnection } from './handlers/connection-handler.js';
import { SERVER_MESSAGES } from '../../shared/constants/messages.js';

export function createSocketServer(workers: ServerWorkersMap): SocketServer {
  const io = new SocketServer(SERVER_ENV.SOCKET_PORT, {
    cors: {
      origin: SERVER_ENV.CLIENT_URL,
      methods: [METHODS.GET, METHODS.POST],
      credentials: true,
    },
  });

  console.log(SERVER_MESSAGES.SERVER_SOCKET_RUNNING(SERVER_ENV.SOCKET_PORT));
  console.log(
    SERVER_MESSAGES.SERVER_ENVIRONMENT(
      SERVER_ENV.PROD ? 'production' : 'development',
    ),
  );

  io.on(SOCKET_EVENT.CONNECT, (socket) => {
    handleConnection(socket, io, workers);
  });

  return io;
}
