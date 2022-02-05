import { DbCreateAccount } from '../../data/useCases/DbCreateAccount';
import { BcryptAdapter } from '../../infra/cryptography/BcryptAdapter';
import { AccountMongoRepository } from '../../infra/database/mongodb/AccountMongoRepository';
import { LoggerMongoRepository } from '../../infra/database/mongodb/LoggerMongoRepository';
import { SignUpController } from '../../presentation/controllers/signUp/signup';
import { Controller } from '../../presentation/protocols';
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter';
import { LoggerControllerDecorator } from '../decorators/LoggerControllerDecorator';

export const makeSignUpController = (): Controller => {
  const ENCRYPTION_SALT = 12;

  const bcryptAdapter = new BcryptAdapter(ENCRYPTION_SALT);
  const accountRepository = new AccountMongoRepository();
  const dbCreateAccount = new DbCreateAccount(bcryptAdapter, accountRepository);
  const emailValidatorAdapter = new EmailValidatorAdapter();

  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbCreateAccount,
  );

  const loggerMongoRepository = new LoggerMongoRepository();

  return new LoggerControllerDecorator(signUpController, loggerMongoRepository);
};
