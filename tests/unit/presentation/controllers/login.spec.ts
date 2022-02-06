import { LoginController } from '../../../../src/presentation/controllers/login';
import { MissingParamError } from '../../../../src/presentation/errors';
import { unprocessableEntity } from '../../../../src/presentation/helpers/http';

describe('Login Controller', () => {
  it('should return 400  if no email is provided', async () => {
    const sut = new LoginController();

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
});
