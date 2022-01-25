import { MissingParamError, InvalidParamError } from '../../errors';
import { serverError, unprocessableEntity } from '../../helpers/http';
import {
  HttpRequest,
  HttpResponse,
  EmailValidator,
  Controller,
  CreateAccount,
} from './signUpProtocols';

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly createAccount: CreateAccount,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return unprocessableEntity(new MissingParamError(field));
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body;

      const hasDifferentPasswords = password !== passwordConfirmation;

      if (hasDifferentPasswords) {
        return unprocessableEntity(
          new InvalidParamError('passwordConfirmation'),
        );
      }

      const isEmailValid = this.emailValidator.isValid(email);

      if (!isEmailValid) {
        return unprocessableEntity(new InvalidParamError('email'));
      }

      const account = await this.createAccount.create({
        name,
        email,
        password,
      });

      return {
        statusCode: 201,
        body: {
          ...account,
        },
      };
    } catch (error) {
      return serverError();
    }
  }
}
