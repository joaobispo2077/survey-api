import {
  Encrypter,
  CreateAccount,
  CreateAccountModel,
  AccountModel,
} from './protocols';

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
