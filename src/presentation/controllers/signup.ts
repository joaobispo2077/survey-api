import { InvalidParamError } from '../errors/InvalidParamError';
import { MissingParamError } from '../errors/MissingParamError';
import { ServerError } from '../errors/ServerError';
import { unprocessableEntity } from '../helpers/http';
import { Controller } from '../protocols/Controller';
import { EmailValidator } from '../protocols/EmailValidator';
import { HttpRequest, HttpResponse } from '../protocols/http';

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

      const { email } = httpRequest.body;

      const isEmailValid = this.emailValidator.isValid(email);

      if (!isEmailValid) {
        return unprocessableEntity(new InvalidParamError('email'));
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}
