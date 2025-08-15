const isProduction = false;

export const CLIENT_ENV = {
  PROD: isProduction,
  SOCKET_URL: isProduction ? 'server-url' : 'http://localhost:3000',
};
