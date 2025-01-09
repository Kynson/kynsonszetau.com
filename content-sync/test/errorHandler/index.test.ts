import errorHandler from '../../src/handlers/errorHandler';

import { createResponseFromError } from 'cf-workers-utils';
import { BadRequestError } from '../../src/lib/errors';

import { test, expect } from 'vitest';
import { faker } from '@faker-js/faker';

test.for([
  {
    // The message is dependent on @octokit/webhooks
    error: new AggregateError([
      new Error(
        '[@octokit/webhooks] signature does not match event payload and secret'
      ),
    ]),
    expectedStatus: 401,
  },
  {
    error: new BadRequestError(faker.lorem.sentence()),
    expectedStatus: 400,
  },
  {
    error: new AggregateError([new Error(faker.lorem.sentence())]),
    expectedStatus: 500,
  },
])(
  'errorHandler should return $expectedStatus for $error',
  ({ error, expectedStatus }) => {
    expect(error).toBe(createResponseFromError(error, expectedStatus));
  }
);
