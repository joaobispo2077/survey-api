import { MissingParamError } from '../errors/MissingParamError';
import { unprocessableEntity } from '../helpers/http';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
  }
}
