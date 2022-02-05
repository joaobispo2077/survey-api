import { CreateAccountRepository } from '../../../../src/data/protocols/CreateAccountRepository';
import { DbCreateAccount } from '../../../../src/data/useCases/DbCreateAccount';
import {
  AccountModel,
  CreateAccountModel,
  Encrypter,
} from '../../../../src/data/useCases/DbCreateAccount/protocols';

interface SutResponsePayload {
  encrypterStub: Encrypter;
  sut: DbCreateAccount;
  createAccountRepositoryStub: CreateAccountRepository;
}

const makeFakeAccountValid = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid@gmail.com',
  password: 'hashed_password',
});

const makeFakeAccountToCreate = (): CreateAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@gmail.com',
  password: 'valid_password',
});

const makeCreateAccountRepository = (): CreateAccountRepository => {
  class CreateAccountRepositoryStub implements CreateAccountRepository {
    async create(account: CreateAccountModel): Promise<AccountModel> {
      return makeFakeAccountValid();
    }
  }

  return new CreateAccountRepositoryStub();
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(password: string): Promise<string> {
      return 'hashed_password';
    }
  }

  return new EncrypterStub();
};

const makeSut = (): SutResponsePayload => {
  const encrypterStub = makeEncrypter();
  const createAccountRepositoryStub = makeCreateAccountRepository();
  const sut = new DbCreateAccount(encrypterStub, createAccountRepositoryStub);

  return {
    sut,
    encrypterStub,
    createAccountRepositoryStub,
  };
};

describe('DbACreateAccount', () => {
  it('should calls Encrypter with received password', async () => {
    const { encrypterStub, sut } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const account = makeFakeAccountToCreate();

    await sut.create(account);
    expect(encryptSpy).toHaveBeenCalledWith(account.password);
  });

  it('should throw if Encrypter throws an error', async () => {
    const { encrypterStub, sut } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error());

    await expect(sut.create(makeFakeAccountToCreate())).rejects.toThrow();
  });

  it('should call CreateAccountRepository with account data', async () => {
    const { createAccountRepositoryStub, sut } = makeSut();
    const createAccountRepositorySpy = jest.spyOn(
      createAccountRepositoryStub,
      'create',
    );

    const account = makeFakeAccountToCreate();

    await sut.create(account);

    expect(createAccountRepositorySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: account.name,
        email: account.email,
        password: expect.any(String),
      }),
    );
  });

  it('should throw if CreateAccoountRepository throws an error', async () => {
    const { createAccountRepositoryStub, sut } = makeSut();
    jest
      .spyOn(createAccountRepositoryStub, 'create')
      .mockRejectedValueOnce(new Error());

    await expect(sut.create(makeFakeAccountToCreate())).rejects.toThrow();
  });

  it('should return a new account on success', async () => {
    const { sut } = makeSut();

    const newAccount = await sut.create(makeFakeAccountToCreate());
    expect(newAccount).toEqual(expect.objectContaining(makeFakeAccountValid()));
  });
});
