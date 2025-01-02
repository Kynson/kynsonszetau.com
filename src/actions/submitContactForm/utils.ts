export function logError(action: string, error: unknown) {
  console.error({
    action,
    error: error?.toString?.() || 'unknown',
  });
}

export function postJSON(endpoint: string, rawBody: any) {
  return fetch(endpoint, {
    body: JSON.stringify(rawBody),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
