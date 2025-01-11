import { initializeOctokit } from '../../lib/octokit';
import parseRequestAsVerifyAndReceiveOptions from './parseRequestAsVerifyAndReceiveOptions';
import { createResponse } from 'cf-workers-utils';

import pushHandler from '../pushHandler';
import repositoryHandler from '../repositoryHandler';

export default async function fetchHandler(
  request: Request,
  environment: Env
): Promise<Response> {
  const { APP_ID, PRIVATE_KEY, WEBHOOK_SECRET, INSTALLATION_ID } = environment;

  const octokit = initializeOctokit({
    appID: APP_ID,
    privateKey: PRIVATE_KEY,
    webhookSecret: WEBHOOK_SECRET,
    installationID: INSTALLATION_ID,
    webhookHandlerMappings: {
      push: (event) => pushHandler(event, environment),
      repository: (event) => repositoryHandler(event, environment),
    },
  });

  const verifyAndReceiveOptions = await parseRequestAsVerifyAndReceiveOptions(
    request
  );

  await octokit.webhooks.verifyAndReceive(verifyAndReceiveOptions);

  return createResponse(null, 204);
}
