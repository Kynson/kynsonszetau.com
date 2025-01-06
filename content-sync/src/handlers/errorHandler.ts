import { BadRequestError, UnauthorizedError } from '../lib/errors';
import { createResponseFromError } from 'cf-workers-utils';

export default function errorHandler(error: Error): Response {
  // The full error message is "[@octokit/webhooks] signature does not match event payload and secret"
  // This will break if the message changes
  if (error instanceof AggregateError && error.message.includes('signature')) {
    return createResponseFromError(
      new UnauthorizedError('Required crediential(s) is/are missing'),
      401
    );
  }

  const status = error instanceof BadRequestError ? 400 : 500;

  return createResponseFromError(error, status);
}
