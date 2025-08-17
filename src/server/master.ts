import { ServerWorkersMap } from '../shared/types.js';
import { createSocketServer } from './socket/server.js';
import { SERVER_MESSAGES } from '../shared/constants/messages.js';

const workers: ServerWorkersMap = new Map();

createSocketServer(workers);

console.log(SERVER_MESSAGES.SERVER_WEBSOCKET_READY);
console.log(SERVER_MESSAGES.SERVER_DASHBOARD_STARTED);
