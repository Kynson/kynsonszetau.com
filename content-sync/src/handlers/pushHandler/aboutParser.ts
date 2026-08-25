import computeColorBrightness from './color';
import { remoteAboutContentSchema } from 'common';

/**
 * Parses the rawAboutResponse by first parsing the JSON response and then inject necessary keys into the JSON object
 * @param rawAboutResponse The raw JSON response fetched from Github
 */
async function parseAboutResponse(rawAboutResponse: Response): Promise<string> {
  if (rawAboutResponse.status !== 200 && rawAboutResponse.status !== 304) {
    throw new Error(`Unexpected response status: ${rawAboutResponse.status}`);
  }

  // Errors should be handled outside of this function
  const { introduction, languages } = remoteAboutContentSchema.parse(
    await rawAboutResponse.json()
  );

  const aboutContent = {
    introduction,
    languages: languages.map((language) => ({
      ...language,
      iconColor: `#${language.iconColor}`,
      iconColorBrightness: computeColorBrightness(language.iconColor)
    }))
  };

  return JSON.stringify(aboutContent);
}

export default parseAboutResponse;
