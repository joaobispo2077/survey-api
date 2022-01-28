import { Encrypter } from '../../../src/data/protocols/encrypter';
import { DbCreateAccount } from '../../../src/data/useCases/DbCreateAccount';

interface SutResponsePayload {
  encrypterStub: Encrypter;
  sut: DbCreateAccount;
}

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
  const sut = new DbCreateAccount(encrypterStub);

  return {
    sut,
    encrypterStub,
  };
};

describe('DbACreateAccount', () => {
  it('should calls Encrypter with received password', async () => {
    const { encrypterStub, sut } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const account = {
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'valid_password',
    };

    await sut.create(account);
    expect(encryptSpy).toHaveBeenCalledWith(account.password);
  });

  it('should throw if Encrypter throws an error', async () => {
    const { encrypterStub, sut } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error());

    const account = {
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'valid_password',
    };

    await expect(sut.create(account)).rejects.toThrow();
  });
});
