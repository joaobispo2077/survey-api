import { LoggerControllerDecorator } from '../../../../src/main/decorators/LoggerControllerDecorator';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../../../src/presentation/protocols';
LoggerControllerDecorator;

interface SutResponsePayload {
  sut: LoggerControllerDecorator;
  controllerStub: Controller;
}

const makeSut = (): SutResponsePayload => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return {
        statusCode: 200,
        body: {
          name: 'any_name',
        },
      };
    }
  }

  const controllerStub = new ControllerStub();
  const sut = new LoggerControllerDecorator(controllerStub);
  return {
    sut,
    controllerStub,
  };
};

describe('LoggerControllerDecorator', () => {
  it('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();
    const controllerStubHandleSpy = jest.spyOn(controllerStub, 'handle');

    const httoRequest = {
      body: {
        name: 'any_name',
      },
    };

    await sut.handle(httoRequest);

    expect(controllerStubHandleSpy).toHaveBeenCalledWith(httoRequest);
  });
});
