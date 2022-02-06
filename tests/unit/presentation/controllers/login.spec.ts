import { LoginController } from '../../../../src/presentation/controllers/login';
import {
  InvalidParamError,
  MissingParamError,
} from '../../../../src/presentation/errors';
import { unprocessableEntity } from '../../../../src/presentation/helpers/http';
import { HttpRequest } from '../../../../src/presentation/protocols';
import { EmailValidator } from '../../../../src/presentation/protocols/EmailValidator';

interface SutResponsePayload {
  sut: LoginController;
  emailValidatorStub: EmailValidator;
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'valid_email@gmail.com',
    password: 'valid_password123',
  },
});

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

    const httpRequest = makeFakeRequest();

    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });

  it('should return 422 with InvalidParamError if receive Invalid email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      unprocessableEntity(new InvalidParamError('email')),
    );
  });
});
