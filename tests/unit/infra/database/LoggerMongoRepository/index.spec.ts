import { MongoHelper } from '../../../../../src/infra/database/mongodb/helpers/MongoHelper';
import { LoggerMongoRepository } from '../../../../../src/infra/database/mongodb/LoggerMongoRepository';

describe('LoggerMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const errorColecction = await MongoHelper.getCollection('errors');
    await errorColecction.deleteMany({});
  });

  it('should create an error log on success', async () => {
    const sut = new LoggerMongoRepository();
    await sut.logError('any_error');
    const count = await (
      await MongoHelper.getCollection('errors')
    ).countDocuments();

    expect(count).toBe(1);
  });
});
