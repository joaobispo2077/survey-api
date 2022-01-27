import { EmailValidatorAdapter } from '../../src/utils/EmailValidator';

describe('EmailValidator Adapter', () => {
  it('should returns false if email received is not valid', () => {
    const sut = new EmailValidatorAdapter();
    const isEmailIvalid = sut.isValid('invalidEmail');
    expect(isEmailIvalid).toBe(false);
  });
});
