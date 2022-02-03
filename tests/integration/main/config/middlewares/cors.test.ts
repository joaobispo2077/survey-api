import supertest from 'supertest';

import { app } from '../../../../../src/main/config/app';

describe('Cors middleware', () => {
  it('should be able to enable cors', async () => {
    app.post('/test_body_parser', (_, res) => res.send());

    await supertest(app)
      .get('/test_body_parser')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*');
  });
});
