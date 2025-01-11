// class AboutElementRewriter {
//   element(aboutElement: Element) {
//     aboutElement.removeAndKeepContent();
//   }
// }

// class GeneralElementRewriter {
//   element(element: Element) {
//     if (!element.removed) {
//       element.remove();
//     }
//   }
// }

// class DocumentRewriter {
//   comments(comment: Comment) {
//     if (!comment.removed) {
//       comment.remove();
//     }
//   }
// }

// const htmlRewriter = new HTMLRewriter()
//   .on('about', new AboutElementRewriter())
//   .on('*', new GeneralElementRewriter())
//   .onDocument(new DocumentRewriter());

interface Language {
  displayName: string;
  iconSlug: string;
  iconColor: string;
  iconColorBrightness: number;
}

import computeColorBrightness from './color';

class AboutParser {
  #introduction = '';
  #languages: Language[] = [];

  introductionElementHandler: HTMLRewriterElementContentHandlers = {
    element(introductionElement) {
      // Remove the element from the final result
      introductionElement.remove();
    },

    text: ({ text }) => {
      this.#introduction += text;
    },
  };

  languageBadgeElementHandler: HTMLRewriterElementContentHandlers = {
    element: (languageBadgeElement) => {
      const displayName = languageBadgeElement.getAttribute('display-name');
      const iconSlug = languageBadgeElement.getAttribute('icon-slug');
      const iconColor = languageBadgeElement.getAttribute('icon-color');

      if (!iconSlug || !displayName || !iconColor) {
        throw new Error('Language badge element is malformed');
      }

      const iconColorBrightness = computeColorBrightness(iconColor);

      this.#languages.push({
        iconSlug,
        displayName,
        iconColor,
        iconColorBrightness,
      });

      // Remove the element from the final result
      languageBadgeElement.remove();
    },
  };

  generalElementHandler: HTMLRewriterElementContentHandlers = {
    element(element) {
      if (element.removed) {
        return;
      }

      element.remove();
    },
  };

  documentHandler: HTMLRewriterDocumentContentHandlers = {
    text(chunk) {
      if (chunk.removed) {
        return;
      }

      chunk.remove();
    },

    comments(comment) {
      if (comment.removed) {
        return;
      }

      comment.remove();
    },

    end: (documentEnd) => {
      documentEnd.append(
        JSON.stringify({
          introduction: this.#introduction.trim(),
          languages: this.#languages,
        })
      );
    },
  };
}

/**
 * Parses the rawAboutResponse by removing all the unnecessary elements, and extract the content of the about element
 * @param rawAboutResponse The raw HTML of the readme page fetched from GitHub
 */
async function parseAboutResponse(rawAboutResponse: Response): Promise<string> {
  const aboutParser = new AboutParser();
  const htmlRewriter = new HTMLRewriter()
    .on('introduction', aboutParser.introductionElementHandler)
    .on('img.language-badge', aboutParser.languageBadgeElementHandler)
    .on('*', aboutParser.generalElementHandler)
    .onDocument(aboutParser.documentHandler);

  const parsedResponse = htmlRewriter.transform(rawAboutResponse);

  // Get the text from the response and remove whitespace and newlines
  // Errors should be handled outside of this function
  return (await parsedResponse.text()).trim();
}

export default parseAboutResponse;
