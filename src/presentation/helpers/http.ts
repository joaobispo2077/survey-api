import { HttpResponse } from '../protocols/Http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const unprocessableEntity = (error: Error): HttpResponse => ({
  statusCode: 422,
  body: error,
});
