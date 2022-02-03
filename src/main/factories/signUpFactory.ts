import { DbCreateAccount } from '../../data/useCases/DbCreateAccount';
import { BcryptAdapter } from '../../infra/cryptography/BcryptAdapter';
import { AccountMongoRepository } from '../../infra/database/mongodb/AccountMongoRepository';
import { SignUpController } from '../../presentation/controllers/signUp/signup';
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter';

export const makeSignUpController = (): SignUpController => {
  const ENCRYPTION_SALT = 12;

  const bcryptAdapter = new BcryptAdapter(ENCRYPTION_SALT);
  const accountRepository = new AccountMongoRepository();
  const dbCreateAccount = new DbCreateAccount(bcryptAdapter, accountRepository);
  const emailValidatorAdapter = new EmailValidatorAdapter();

  return new SignUpController(emailValidatorAdapter, dbCreateAccount);
};
