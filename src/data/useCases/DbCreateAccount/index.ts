import {
  Encrypter,
  CreateAccount,
  CreateAccountModel,
  AccountModel,
  CreateAccountRepository,
} from './protocols';

export class DbCreateAccount implements CreateAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly createAccountRepository: CreateAccountRepository,
  ) {}

  async create(account: CreateAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password);

    const newAccount = await this.createAccountRepository.create({
      ...account,
      password: hashedPassword,
    });

    return newAccount;
  }
}
