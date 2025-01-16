/**
 * Escapes any special characters by placing a '\', and escape '\' with '[&#92]'
 * @param input [Optional] The string to escaped
 * @returns The escaped string
 */
export function escape(input = ''): string {
  const specialCharactersRegex = /[_*~/`>|]/gm;

  return input.replace(/\\/g, '[&#92]').replace(specialCharactersRegex, '\\$&');
}

/**
 * Sends a POST request to the endpoint with the specified body
 * @param endpoint The endpoint which the request will be sent to
 * @param rawBody The unencoded body to be attached in the request
 */
export function postJSON(endpoint: string, rawBody: unknown) {
  return fetch(endpoint, {
    body: JSON.stringify(rawBody),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
