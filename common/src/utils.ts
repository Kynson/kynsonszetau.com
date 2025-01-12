/**
 * Logs error to the console
 * @param action The action/ function that the error occurred at
 * @param error The error occurred
 */
export function logError(action: string, error: unknown) {
  console.error({
    action,
    error: error?.toString?.() ?? 'unknown',
  });
}
