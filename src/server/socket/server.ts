import { Server as SocketServer } from 'socket.io';
import { METHODS, ServerWorkersMap, SOCKET_EVENT } from '../../shared/types.js';
import { ENV } from '../../shared/constants/general.js';
import { handleConnection } from './handlers/connection-handler.js';
import { SERVER_MESSAGES } from '../../shared/constants/messages.js';

export function createSocketServer(workers: ServerWorkersMap): SocketServer {
  const io = new SocketServer(ENV.SOCKET_PORT, {
    cors: {
      origin: ['http://localhost:4200', 'http://localhost:8080', 'null'], // null для file:// протокола
      methods: [METHODS.GET, METHODS.POST],
      credentials: false,
    },
  });

  console.log(SERVER_MESSAGES.SERVER_SOCKET_RUNNING(ENV.SOCKET_PORT));
  console.log(
    SERVER_MESSAGES.SERVER_ENVIRONMENT(ENV.PROD ? 'production' : 'development'),
  );

  io.on(SOCKET_EVENT.CONNECTION, (socket) => {
    handleConnection(socket, io, workers);
  });

  return io;
}
