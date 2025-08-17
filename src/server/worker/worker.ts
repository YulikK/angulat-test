import { parentPort } from 'worker_threads';
import {
  MESSAGE,
  PROCESS_SIGNAL,
  WORKER_EVENT,
  WorkerThreadMessage,
} from '../../shared/types.js';
import { getRandomFortune } from './mocks/fortune-messages.js';
import { SERVER_MESSAGES } from '../../shared/constants/messages.js';

const WORKER_LIFETIME = {
  MIN: 5000,
  MAX: 20000,
} as const;

const LOG_INTERVAL = {
  MIN: 500,
  MAX: 3000,
} as const;

let isRunning = true;
let logInterval: NodeJS.Timeout;

const lifetime =
  Math.random() * (WORKER_LIFETIME.MAX - WORKER_LIFETIME.MIN) +
  WORKER_LIFETIME.MIN;

const lifetimeTimeout: NodeJS.Timeout = setTimeout(() => {
  isRunning = false;
  process.exit(0);
}, lifetime);

const getLogInterval = () =>
  Math.random() * (LOG_INTERVAL.MAX - LOG_INTERVAL.MIN) + LOG_INTERVAL.MIN;

function sendLog(message: string) {
  if (parentPort && isRunning) {
    const logMessage: WorkerThreadMessage = {
      type: MESSAGE.LOG,
      message,
      timestamp: new Date(),
    };
    parentPort.postMessage(logMessage);
  }
}

function scheduleNextLog() {
  if (isRunning) {
    logInterval = setTimeout(() => {
      sendLog(getRandomFortune());
      scheduleNextLog();
    }, getLogInterval());
  }
}

scheduleNextLog();

if (parentPort) {
  parentPort.on(WORKER_EVENT.MESSAGE, (message: WorkerThreadMessage) => {
    if (message.type === MESSAGE.TERMINATE) {
      sendLog(SERVER_MESSAGES.WORKER_TERMINATED);
      isRunning = false;
      clearTimeout(logInterval);
      clearTimeout(lifetimeTimeout);
      process.exit(0);
    }
  });
}

process.on(PROCESS_SIGNAL.SIGTERM, () => {
  sendLog(SERVER_MESSAGES.WORKER_TERMINATED);
  isRunning = false;
  clearTimeout(logInterval);
  clearTimeout(lifetimeTimeout);
  process.exit(0);
});
