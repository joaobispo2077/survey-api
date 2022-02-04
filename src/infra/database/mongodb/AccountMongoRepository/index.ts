import { CreateAccountRepository } from '../../../../data/protocols/CreateAccountRepository';
import { AccountModel } from '../../../../domain/models/Account';
import { CreateAccountModel } from '../../../../domain/useCases/CreateAccount';
import { MongoHelper } from '../helpers/MongoHelper';

export class AccountMongoRepository implements CreateAccountRepository {
  async create(account: CreateAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(account);

    return {
      id: result.insertedId.toString(),
      ...account,
    };
  }
}
