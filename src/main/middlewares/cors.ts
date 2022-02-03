import { RequestHandler } from 'express';

export const cors: RequestHandler = (request, response, next) => {
  response.header('access-control-allow-origin', '*');
  response.header('access-control-allow-methods', '*');
  response.header('access-control-allow-headers', '*');

  next();
};
