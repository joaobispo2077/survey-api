/* eslint-disable no-console */

import { Router } from 'express';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export default (router: Router) => {
  router.post('/signup', (req, res) => res.json({ message: 'Hello World' }));
};
