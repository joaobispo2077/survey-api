import { SignUpController } from '../../../src/presentation/controllers/signup';
import { InvalidParamError } from '../../../src/presentation/errors/InvalidParamError';
import { MissingParamError } from '../../../src/presentation/errors/MissingParamError';
import { EmailValidator } from '../../../src/presentation/protocols/EmailValidator';

interface SutResponsePayload {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
}

const makeSut = (): SutResponsePayload => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe('SignUp Controller', () => {
  it('should be able to return 422 if no name is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: 'john.doe@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(422);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should be able to return 422 if no email is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'John Doe',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(422);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('should be able to return 422 if no password is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(422);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('should be able to return 422 if no password is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(422);
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation'),
    );
  });

  it('should be able to return 422 if invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'invalid_email',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(422);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('should be able to call EmailValidator with received email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidEmailSpy = jest.spyOn(emailValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await sut.handle(httpRequest);
    expect(isValidEmailSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });
});
