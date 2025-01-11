/**
 * Logs error to the console
 * This functions logs message in plain objects which is recommended by
 * https://developers.cloudflare.com/workers/observability/logs/workers-logs/#best-practices
 *
 * @param action The action/ function that the error occurred at
 * @param error The error occurred
 */
export default function logError(action: string, error: unknown) {
  console.error({
    action,
    error: error?.toString?.() ?? 'unknown',
  });
}
