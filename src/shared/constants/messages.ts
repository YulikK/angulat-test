/**
 * Server messages constants
 * All system messages used by workers and server
 */

export const SERVER_MESSAGES = {
  // Worker lifecycle messages
  WORKER_CONNECTED: '🔮 Fortune teller connected and ready to predict!',
  WORKER_SLEEPING: '🌙 Fortune teller is tired and going to sleep... Goodbye!',
  WORKER_TERMINATED: '🛑 Termination signal received. See you later!',

  // Server startup messages
  SERVER_SOCKET_RUNNING: (port: number) =>
    `🚀 Socket.IO server running on port ${port}`,
  SERVER_ENVIRONMENT: (env: string) => `🌍 Environment: ${env}`,
  SERVER_WEBSOCKET_READY: '✨ WebSocket server ready for connections',
  SERVER_DASHBOARD_STARTED: '📊 Worker dashboard backend started',

  // Connection messages
  CLIENT_CONNECTED: (socketId: string) => `Client connected: ${socketId}`,
  CLIENT_DISCONNECTED: (socketId: string) => `Client disconnected: ${socketId}`,

  // Worker management messages
  WORKER_KILL_SUCCESS: (workerId: string) => `Worker ${workerId} terminated`,
  WORKER_KILL_FAILED: (workerId: string) => `Worker ${workerId} not found`,
  WORKER_KILL_ATTEMPT_FAILED: (workerId: string) =>
    `Failed to kill worker ${workerId}`,
  WORKER_EXIT: (workerId: string, code: number | null) =>
    `Worker ${workerId} exited with code ${code}`,

  // Debug messages
  MESSAGE_RECEIVED: 'Received message:',
  MESSAGE_UNKNOWN: 'Unknown message type:',
} as const;

/**
 * Client-side messages constants
 * Messages used by Angular client for logging and UI
 */
export const CLIENT_MESSAGES = {
  // Connection status messages
  CONNECTION_ESTABLISHED: 'Connected to server',
  CONNECTION_LOST: 'Disconnected from server',
  CONNECTION_ERROR: 'Connection error:',

  // Worker management messages
  WORKER_CREATE_REQUEST: 'Creating new worker...',
  WORKER_KILL_REQUEST: (workerId: string) =>
    `Terminating worker ${workerId}...`,
  WORKER_LIST_UPDATED: 'Workers updated:',

  // Debug messages
  SERVER_MESSAGE_RECEIVED: 'Received message:',
} as const;
