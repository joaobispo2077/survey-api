import { MissingParamError, InvalidParamError } from '../errors';
import { serverError, unprocessableEntity } from '../helpers/http';
import {
  HttpRequest,
  HttpResponse,
  EmailValidator,
  Controller,
} from '../protocols';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

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

      const { email, password, passwordConfirmation } = httpRequest.body;

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
    } catch (error) {
      return serverError();
    }
  }
}
