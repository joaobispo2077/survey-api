import supertest from 'supertest';

import { MongoHelper } from '../../../../../src/infra/database/mongodb/helpers/MongoHelper';
import { app } from '../../../../../src/main/config/app';

describe('SignAUp routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountColecction = await MongoHelper.getCollection('accounts');
    await accountColecction.deleteMany({});
  });

  it('should return 201 when create account with success', async () => {
    await supertest(app)
      .post('/api/signup')
      .send({
        name: 'test',
        email: 'test@example.com',
        password: '123456',
        passwordConfirmation: '123456',
      })
      .expect(201);
  });
});
