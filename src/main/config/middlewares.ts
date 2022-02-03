import express, { Express } from 'express';

import { bodyParser } from '../middlewares/bodyParser';
import { contentType } from '../middlewares/contentType';
import { cors } from '../middlewares/cors';

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser);
  app.use(express.urlencoded({ extended: true }));
  app.use(cors);
  app.use(contentType);
};
