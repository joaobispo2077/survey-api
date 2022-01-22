import { SignUpController } from '../../../src/presentation/controllers/signup';

describe('SignUp Controller', () => {
  it('should be able to return 422 if no name is provided', async () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(422);
    expect(httpResponse.body).toEqual(new Error('Missing param: name'));
  });
});
