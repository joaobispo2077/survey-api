/* eslint-disable no-console */

import { LoggerErrorRepository } from '../../data/protocols/LoggerErrorRepository';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../presentation/protocols';

export class LoggerControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly loggerErrorRepository: LoggerErrorRepository,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);

    if (httpResponse.statusCode === 500) {
      await this.loggerErrorRepository.log(httpResponse.body.stack);
    }

    console.log(httpResponse.body);
    return httpResponse;
  }
}
