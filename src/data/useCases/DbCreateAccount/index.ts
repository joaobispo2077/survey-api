import { AccountModel } from '../../../domain/models/Account';
import {
  CreateAccount,
  CreateAccountModel,
} from '../../../domain/useCases/CreateAccount';
import { Encrypter } from '../../protocols/encrypter';

export class DbCreateAccount implements CreateAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async create(account: CreateAccountModel): Promise<AccountModel> {
    const hashPassword = await this.encrypter.encrypt(account.password);

    return {
      id: 'valid_id',
      name: account.name,
      email: account.email,
      password: hashPassword,
    };
  }
}
