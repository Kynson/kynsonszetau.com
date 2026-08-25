import parseAboutResponse from '../../src/handlers/pushHandler/aboutParser';

import { test, expect } from 'vitest';
import { faker } from '@faker-js/faker';

test('parseAboutResponse should extracts the introduction and languages correctly', async () => {
  // These can be set to anything by the user
  const introduction = faker.lorem.paragraph();
  const javascriptDisplayName = faker.internet.displayName();
  const rustDisplayName = faker.internet.displayName();

  const response = new Response(
    JSON.stringify({
      introduction,
      languages: [
        {
          iconSlug: 'js',
          displayName: javascriptDisplayName,
          iconColor: 'e8d502'
        },
        {
          iconSlug: 'rust',
          displayName: rustDisplayName,
          iconColor: 'f46623'
        }
      ]
    })
  );

  await expect(parseAboutResponse(response).then((result) => JSON.parse(result))).resolves.toEqual(
    {
      introduction,
      languages: [
        {
          iconSlug: 'js',
          displayName: javascriptDisplayName,
          iconColor: '#e8d502',
          iconColorBrightness: 0.8255981020247668
        },
        {
          iconSlug: 'rust',
          displayName: rustDisplayName,
          iconColor: '#f46623',
          iconColorBrightness: 0.5766258294372216
        }
      ]
    }
  );
});
