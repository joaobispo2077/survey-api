import supertest from 'supertest';

import { app } from '../../../../../src/main/config/app';

describe('Body Parser Middleware', () => {
  it('should be able to parse request body', async () => {
    app.post('/test_body_parser', (req, res) => res.send(req.body));

    await supertest(app)
      .post('/test_body_parser')
      .send({ name: 'test' })
      .expect({ name: 'test' });
  });
});
