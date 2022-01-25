import { ServerError } from '../errors/ServerError';
import { HttpResponse } from '../protocols/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const unprocessableEntity = (error: Error): HttpResponse => ({
  statusCode: 422,
  body: error,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});
