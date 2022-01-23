import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return {
        statusCode: 422,
        body: new Error('Missing param: name'),
      };
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 422,
        body: new Error('Missing param: email'),
      };
    }
  }
}
