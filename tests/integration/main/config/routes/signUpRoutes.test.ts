import supertest from 'supertest';

import { app } from '../../../../../src/main/config/app';

describe('SignAUp routes', () => {
  it('should return an account on success', async () => {
    await supertest(app)
      .post('/api/signup')
      .send({
        name: 'test',
        email: 'test@example.com',
        password: '123456',
        passwordConfirmation: '123456',
      })
      .expect(200);
  });
});
