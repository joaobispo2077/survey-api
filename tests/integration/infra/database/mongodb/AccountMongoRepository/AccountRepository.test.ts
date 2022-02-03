import { AccountMongoRepository } from '../../../../../../src/infra/database/mongodb/AccountMongoRepository';
import { MongoHelper } from '../../../../../../src/infra/database/mongodb/helpers/MongoHelper';

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

describe('Account Mongo Repository', () => {
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

  it('should return an account on success', async () => {
    const sut = makeSut();

    const account = await sut.create({
      name: 'any_name',
      email: 'any@gmail.com',
      password: 'any_password',
    });

    expect(account).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'any_name',
        email: 'any@gmail.com',
        password: 'any_password',
      }),
    );
  });
});
