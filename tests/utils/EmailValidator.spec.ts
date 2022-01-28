import validator from 'validator';

import { EmailValidatorAdapter } from '../../src/utils/EmailValidator';

jest.mock('validator', () => ({
  isEmail: jest.fn().mockReturnValue(true),
}));

describe('EmailValidator Adapter', () => {
  it('should returns false if email received is not valid', () => {
    const sut = new EmailValidatorAdapter();

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);

    const isEmailIvalid = sut.isValid('invalidEmail');
    expect(isEmailIvalid).toBe(false);
  });

  it('should returns true if email received is valid', () => {
    const sut = new EmailValidatorAdapter();
    const isEmailIvalid = sut.isValid('example@gmail.com');
    expect(isEmailIvalid).toBe(true);
  });

  it('should calls validator.isEmail with received value', () => {
    const sut = new EmailValidatorAdapter();
    const email = 'example@gmail.com';

    const isEmailSpyOn = jest.spyOn(validator, 'isEmail');
    sut.isValid(email);

    expect(isEmailSpyOn).toHaveBeenCalledWith(email);
  });
});
