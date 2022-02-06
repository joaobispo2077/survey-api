import { InvalidParamError, MissingParamError } from '../../errors';
import { unprocessableEntity } from '../../helpers/http';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { EmailValidator } from '../signUp/signUpProtocols';

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;

    if (!email) {
      return unprocessableEntity(new MissingParamError('email'));
    }

    if (!password) {
      return unprocessableEntity(new MissingParamError('password'));
    }

    const isEmailValid = this.emailValidator.isValid(email);
    if (!isEmailValid) {
      return unprocessableEntity(new InvalidParamError('email'));
    }
  }
}
