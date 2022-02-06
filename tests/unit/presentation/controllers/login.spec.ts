import { LoginController } from '../../../../src/presentation/controllers/login';
import { MissingParamError } from '../../../../src/presentation/errors';
import { unprocessableEntity } from '../../../../src/presentation/helpers/http';
import { EmailValidator } from '../../../../src/presentation/protocols/EmailValidator';

interface SutResponsePayload {
  sut: LoginController;
  emailValidatorStub: EmailValidator;
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeSut = (): SutResponsePayload => {
  const emailValidatorStub = makeEmailValidator();
  return {
    sut: new LoginController(emailValidatorStub),
    emailValidatorStub,
  };
};

describe('Login Controller', () => {
  it('should return 422  if no email is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      unprocessableEntity(new MissingParamError('email')),
    );
  });

  it('should return 422  if no password is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: 'any_email@gmai.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      unprocessableEntity(new MissingParamError('password')),
    );
  });

  it('should call EmailValidator with received email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        email: 'valid_email@gmail.com',
        password: 'valid_password123',
      },
    };

    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });
});
