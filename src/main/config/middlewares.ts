import express, { Express } from 'express';

import { bodyParser, contentType, cors } from '../middlewares';

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser);
  app.use(express.urlencoded({ extended: true }));
  app.use(cors);
  app.use(contentType);
};
