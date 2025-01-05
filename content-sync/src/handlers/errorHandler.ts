import { BadRequestError, UnauthorizedError } from '../lib/errors';
import { createResponseFromError } from 'cf-workers-utils';

export default function errorHandler(error: Error): Response {
  if (error instanceof AggregateError) {
    return createResponseFromError(
      new UnauthorizedError('Required crediential(s) is/are missing'),
      401
    );
  }

  if (error instanceof BadRequestError) {
    return createResponseFromError(
      new Error('Required crediential(s) is/are missing'),
      400
    );
  }

  return createResponseFromError(error);
}
