import { MongoHelper as sut } from '../../../../../src/infra/database/mongodb/helpers/MongoHelper';

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  it('should reconnect if mongodb connection is down', async () => {
    const accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
    await sut.disconnect();
    expect(await sut.getCollection('accounts')).toBeTruthy();
  });
});
