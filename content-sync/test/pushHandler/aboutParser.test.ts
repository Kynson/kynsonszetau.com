import parseAboutResponse from '../../src/handlers/pushHandler/aboutParser';

import { test, expect } from 'vitest';

test('parseAboutResponse should extracts the introduction and languages correctly', () => {
  // These can be set to anything by the user
  const introduction = `This is a test message: ${Math.random()}`;
  const javascriptDisplayName = `Javascript-${Math.random()}`;
  const rustDisplayName = `Rust-${Math.random()}`;

  const response = new Response(
    `
			## Hello
			<introduction>
			${introduction}
			</introduction>
			# An image
			<img src="http://example.com"/>
      <!-- This is a comment -->
			# Language
			<img class="language-badge" src="http://example.com" display-name="${javascriptDisplayName}" icon-slug="js" icon-color="#e8d502">
			<img class="language-badge" src="http://example.com" display-name="${rustDisplayName}" icon-slug="rust" icon-color="#f46623">
			`
  );

  expect(parseAboutResponse(response)).resolves.toBe(
    JSON.stringify({
      introduction,
      languages: [
        {
          iconSlug: 'js',
          displayName: javascriptDisplayName,
          iconColor: '#e8d502',
          iconColorBrightness: 0.8255981020247668,
        },
        {
          iconSlug: 'rust',
          displayName: rustDisplayName,
          iconColor: '#f46623',
          iconColorBrightness: 0.5766258294372216,
        },
      ],
    })
  );
});
