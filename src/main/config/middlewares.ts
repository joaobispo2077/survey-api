import express, { Express } from 'express';

import { bodyParser } from '../middlewares/bodyParser';

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser);
  app.use(express.urlencoded({ extended: true }));
};
