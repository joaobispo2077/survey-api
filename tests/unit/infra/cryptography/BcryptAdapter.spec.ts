import bcrypt from 'bcryptjs';

import { BcryptAdapter } from '../../../../src/infra/cryptography/BcryptAdapter';

jest.mock('bcryptjs', () => ({
  hash: async (): Promise<string> => 'hash',
}));

const salt = 12;

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('BcryptAdapter', () => {
  it('should call bcrypt with received values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('value_example');

    expect(hashSpy).toHaveBeenCalledWith('value_example', salt);
  });

  it('should return a hash on success', async () => {
    const sut = makeSut();
    const hash = await sut.encrypt('value_example');

    expect(hash).toBe('hash');
  });

  // it('should throw if bcrypt throws', async () => {
  //   const sut = makeSut();

  //   jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error());

  //   await expect(sut.encrypt('any_value')).rejects.toThrow();
  // });
});
