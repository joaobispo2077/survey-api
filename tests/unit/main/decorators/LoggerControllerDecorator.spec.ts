import { LoggerErrorRepository } from '../../../../src/data/protocols/LoggerErrorRepository';
import { LoggerControllerDecorator } from '../../../../src/main/decorators/LoggerControllerDecorator';
import { serverError } from '../../../../src/presentation/helpers/http';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../../../src/presentation/protocols';
LoggerControllerDecorator;

interface SutResponsePayload {
  sut: LoggerControllerDecorator;
  controllerStub: Controller;
  loggerErrorRepositoryStub: LoggerErrorRepository;
}

const makeController = (): Controller => {
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

  return new ControllerStub();
};

const makeLoggerErrorRepository = (): LoggerErrorRepository => {
  class LoggerErrorRepositoryStub implements LoggerErrorRepository {
    async log(stack: string): Promise<void> {
      return;
    }
  }

  return new LoggerErrorRepositoryStub();
};

const makeSut = (): SutResponsePayload => {
  const controllerStub = makeController();
  const loggerErrorRepositoryStub = makeLoggerErrorRepository();

  const sut = new LoggerControllerDecorator(
    controllerStub,
    loggerErrorRepositoryStub,
  );

  return {
    sut,
    controllerStub,
    loggerErrorRepositoryStub,
  };
};

describe('LoggerControllerDecorator', () => {
  it('should call controller.handle', async () => {
    const { sut, controllerStub } = makeSut();
    const controllerStubHandleSpy = jest.spyOn(controllerStub, 'handle');

    const httpRequest = {
      body: {
        name: 'any_name',
      },
    };

    await sut.handle(httpRequest);

    expect(controllerStubHandleSpy).toHaveBeenCalledWith(httpRequest);
  });

  it('should return same payload from received controller', async () => {
    const { sut } = makeSut();

    const httoRequest = {
      body: {
        name: 'any_name',
      },
    };

    const httpResponse = await sut.handle(httoRequest);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'any_name',
      },
    });
  });

  it('should call LoggerErrorRepository with correct error if controller returns a Server error', async () => {
    const { sut, controllerStub, loggerErrorRepositoryStub } = makeSut();

    const logSpy = jest.spyOn(loggerErrorRepositoryStub, 'log');

    const fakeError = new Error();
    fakeError.stack = 'any_stack';
    const error = serverError(fakeError);

    jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce(error);

    const httoRequest = {
      body: {
        name: 'any_name',
      },
    };

    await sut.handle(httoRequest);
    expect(logSpy).toHaveBeenCalledWith(fakeError.stack);
  });
});
