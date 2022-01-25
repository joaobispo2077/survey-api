import { SignUpController } from '../../../src/presentation/controllers/signup';
import {
  InvalidParamError,
  MissingParamError,
  ServerError,
} from '../../../src/presentation/errors';
import { EmailValidator } from '../../../src/presentation/protocols';

interface SutResponsePayload {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
}

const makeEmailValidatorWithError = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      throw new Error();
    }
  }

  return new EmailValidatorStub();
};

const mekeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeSut = (): SutResponsePayload => {
  const emailValidatorStub = mekeEmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe('SignUp Controller', () => {
  describe('Success cases', () => {
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

  describe('Error cases', () => {
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

    it('should be able to return 500 if EmailValidator throws', async () => {
      const emailValidatorStub = makeEmailValidatorWithError();
      const sut = new SignUpController(emailValidatorStub);

      const httpRequest = {
        body: {
          name: 'John Doe',
          email: 'john.doe@gmail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password',
        },
      };

      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body).toEqual(new ServerError());
    });
  });
});
