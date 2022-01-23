import { MissingParamError } from '../errors/MissingParamError';
import { unprocessableEntity } from '../helpers/http';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return unprocessableEntity(new MissingParamError('name'));
    }

    if (!httpRequest.body.email) {
      return unprocessableEntity(new MissingParamError('email'));
    }
  }
}
