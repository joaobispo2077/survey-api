import bcrypt from 'bcryptjs';

import { BcryptAdapter } from '../../../src/infra/cryptography/BcryptAdapter';

jest.mock('bcryptjs', () => ({
  hash: async (): Promise<string> => 'hash',
}));

describe('BcryptAdapter', () => {
  it('should call bcrypt with received values', async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('value_example');

    expect(hashSpy).toHaveBeenCalledWith('value_example', salt);
  });

  it('should return a hash on success', async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hash = await sut.encrypt('value_example');

    expect(hash).toBe('hash');
  });
});
