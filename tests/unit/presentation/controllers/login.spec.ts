import { LoginController } from '../../../../src/presentation/controllers/login';
import { MissingParamError } from '../../../../src/presentation/errors';
import { unprocessableEntity } from '../../../../src/presentation/helpers/http';

interface SutResponsePayload {
  sut: LoginController;
}

const makeSut = (): SutResponsePayload => {
  const sut = new LoginController();
  return {
    sut,
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
});
