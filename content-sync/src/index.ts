import fetchHandler from './handlers/fetchHandler';
import errorHandler from './handlers/errorHandler';

export default {
  async fetch(request, environment) {
    return fetchHandler(request, environment).catch(errorHandler);
  },
} satisfies ExportedHandler<Env>;
