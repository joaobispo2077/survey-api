import { InvalidParamError, MissingParamError } from '../../errors';
import { unprocessableEntity } from '../../helpers/http';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { EmailValidator } from '../signUp/signUpProtocols';

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return unprocessableEntity(new MissingParamError('email'));
    }

    if (!httpRequest.body.password) {
      return unprocessableEntity(new MissingParamError('password'));
    }

    this.emailValidator.isValid(httpRequest.body.email);
  }
}
