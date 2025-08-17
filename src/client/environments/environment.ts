const isProduction = false;

export const CLIENT_ENV = {
  PROD: isProduction,
  SOCKET_URL: isProduction
    ? 'https://predicts.onrender.com'
    : 'http://localhost:3000',
};
