import { Encrypter } from '../../../src/data/protocols/encrypter';
import { DbCreateAccount } from '../../../src/data/useCases/DbCreateAccount';

describe('DbACreateAccount', () => {
  it('should calls Encrypter with received password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt(password: string): Promise<string> {
        return 'hashed_password';
      }
    }

    const encrypterStub = new EncrypterStub();
    const sut = new DbCreateAccount(encrypterStub);
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const account = {
      name: 'valid_name',
      email: 'valid_email@gmail.com',
      password: 'valid_password',
    };

    await sut.create(account);
    expect(encryptSpy).toHaveBeenCalledWith(account.password);
  });
});
