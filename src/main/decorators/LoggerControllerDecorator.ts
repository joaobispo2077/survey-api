/* eslint-disable no-console */

import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../presentation/protocols';

export class LoggerControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);

    console.log(httpResponse.body);
    return httpResponse;
  }
}
