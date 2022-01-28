import validator from 'validator';

import { EmailValidator } from '../../src/presentation/protocols/EmailValidator';
import { EmailValidatorAdapter } from '../../src/utils/EmailValidatorAdapter';

jest.mock('validator', () => ({
  isEmail: jest.fn().mockReturnValue(true),
}));

const makeSut = (): EmailValidator => {
  return new EmailValidatorAdapter();
};

describe('EmailValidator Adapter', () => {
  it('should returns false if email received is not valid', () => {
    const sut = makeSut();

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);

    const isEmailIvalid = sut.isValid('invalidEmail');
    expect(isEmailIvalid).toBe(false);
  });

  it('should returns true if email received is valid', () => {
    const sut = makeSut();
    const isEmailIvalid = sut.isValid('example@gmail.com');
    expect(isEmailIvalid).toBe(true);
  });

  it('should calls validator.isEmail with received value', () => {
    const sut = makeSut();
    const email = 'example@gmail.com';

    const isEmailSpyOn = jest.spyOn(validator, 'isEmail');
    sut.isValid(email);

    expect(isEmailSpyOn).toHaveBeenCalledWith(email);
  });
});
