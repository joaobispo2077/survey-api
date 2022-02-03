/* eslint-disable no-console */

import { Router } from 'express';

import { adaptRoute } from '../adapters/expressRouteAdapter';
import { makeSignUpController } from '../factories/signUpFactory';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export default (router: Router) => {
  router.post('/signup', adaptRoute(makeSignUpController()));
};
