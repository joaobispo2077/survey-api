import { SignUpController } from '../../../src/presentation/controllers/signup';
import { MissingParamError } from '../../../src/presentation/errors/MissingParamError';

describe('SignUp Controller', () => {
  it('should be able to return 422 if no name is provided', async () => {
    const sut = new SignUpController();

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
    const sut = new SignUpController();

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
    const sut = new SignUpController();

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
    const sut = new SignUpController();

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
});
