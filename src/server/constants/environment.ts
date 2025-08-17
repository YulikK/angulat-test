const isDevelopment =
  process.env['NODE_ENV'] === 'development' ||
  process.env['NODE_ENV'] === undefined ||
  process.env['NODE_ENV'] === '';

const isProduction = process.env['NODE_ENV'] === 'production';

const socketPort = Number(process.env['SOCKET_PORT']) || 3000;

export const SERVER_ENV = {
  PROD: isProduction,
  SOCKET_PORT: socketPort,
  CLIENT_URL: isDevelopment
    ? process.env['DEV_CLIENT_URL'] || 'http://localhost:4200'
    : process.env['PROD_CLIENT_URL'],

  SOCKET_URL: isDevelopment
    ? `${process.env['DEV_SOCKET_URL'] || 'http://localhost'}:${socketPort}`
    : process.env['PROD_SOCKET_URL'],
};
