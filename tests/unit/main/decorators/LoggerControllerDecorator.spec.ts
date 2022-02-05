import { LoggerControllerDecorator } from '../../../../src/main/decorators/LoggerControllerDecorator';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../../../src/presentation/protocols';

describe('LoggerControllerDecorator', () => {
  it('should call controller handle', async () => {
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
