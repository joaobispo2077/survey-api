import {
  AccountModel,
  CreateAccountModel,
} from '../useCases/DbCreateAccount/protocols';

export interface CreateAccountRepository {
  create(account: CreateAccountModel): Promise<AccountModel>;
}
