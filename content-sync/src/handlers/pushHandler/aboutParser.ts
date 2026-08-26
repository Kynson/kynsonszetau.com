import type { About } from 'common';

import computeColorBrightness from './color';
import { remoteAboutSchema } from 'common';

/**
 * Parses the rawAboutResponse by first parsing the JSON response and then inject necessary keys into the JSON object
 * @param rawAboutResponse The raw JSON response fetched from Github
 */
async function parseAboutResponse(rawAboutResponse: Response): Promise<string> {
  if (rawAboutResponse.status !== 200 && rawAboutResponse.status !== 304) {
    throw new Error(`Unexpected response status: ${rawAboutResponse.status}`);
  }

  // Errors should be handled outside of this function
  const { introduction, languages, setup } = remoteAboutSchema.parse(
    await rawAboutResponse.json()
  );

  const aboutContent: About = {
    introduction,
    languages: languages.map((language) => ({
      ...language,
      iconColorBrightness: computeColorBrightness(language.iconColor)
    })),
    setup: Object.values(setup)
  };

  return JSON.stringify(aboutContent);
}

export default parseAboutResponse;
