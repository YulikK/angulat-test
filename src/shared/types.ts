import { Worker } from 'worker_threads';

export enum WORKER_STATUS {
  RUNNING = 'running',
  TERMINATED = 'terminated',
}

export interface WorkerInfo {
  id: string;
  startTime: Date;
  endTime?: Date;
  status: WORKER_STATUS;
  logs: WorkerLog[];
}

export interface WorkerLog {
  timestamp: Date;
  message: string;
}

export interface ServerWorkerThread {
  info: WorkerInfo;
  thread: Worker;
}

export type ServerWorkersMap = Map<string, ServerWorkerThread>;

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
}

export enum MESSAGE {
  START_WORKER = 'START_WORKER',
  KILL_WORKER = 'KILL_WORKER',
  WORKER_LOG = 'WORKER_LOG',
  WORKER_TERMINATED = 'WORKER_TERMINATED',
  WORKER_STARTED = 'WORKER_STARTED',
  WORKERS_LIST = 'WORKERS_LIST',
  TERMINATE = 'TERMINATE',
  LOG = 'LOG',
}

export enum SOCKET_EVENT {
  CONNECTING = 'connecting',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
  CONNECT_ERROR = 'connect error',
}

export enum WORKER_EVENT {
  MESSAGE = 'message',
  EXIT = 'exit',
}

export enum PROCESS_SIGNAL {
  SIGTERM = 'SIGTERM',
}

export type ClientMessage =
  | { type: MESSAGE.START_WORKER }
  | { type: MESSAGE.KILL_WORKER; workerId: string };

export type ServerMessage =
  | { type: MESSAGE.WORKER_STARTED; worker: WorkerInfo }
  | { type: MESSAGE.WORKER_LOG; workerId: string; log: WorkerLog }
  | { type: MESSAGE.WORKER_TERMINATED; worker: WorkerInfo }
  | { type: MESSAGE.WORKERS_LIST; workers: WorkerInfo[] };

export type WorkerThreadMessage =
  | { type: MESSAGE.TERMINATE }
  | { type: MESSAGE.LOG; message: string; timestamp: Date };
