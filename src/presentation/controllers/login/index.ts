import { MissingParamError } from '../../errors';
import { unprocessableEntity } from '../../helpers/http';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return unprocessableEntity(new MissingParamError('email'));
    }

    if (!httpRequest.body.password) {
      return unprocessableEntity(new MissingParamError('password'));
    }
  }
}
