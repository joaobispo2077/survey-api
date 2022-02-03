/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
import { Router, Express } from 'express';
import fastGlob from 'fast-glob';

export const setupRoutes = (app: Express): void => {
  const router = Router();

  app.use('/api', router);

  fastGlob.sync('**/src/main/routes/**/*.ts').map(async (filename) => {
    const setupRoute = (await import(`../../../${filename}`)).default;

    setupRoute(router);
  });
};
