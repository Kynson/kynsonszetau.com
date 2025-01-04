class AboutElementRewriter {
  element(aboutElement: Element) {
    aboutElement.removeAndKeepContent();
  }
}

class GeneralElementRewriter {
  element(element: Element) {
    if (!element.removed) {
      element.remove();
    }
  }
}

class DocumentRewriter {
  comments(comment: Comment) {
    if (!comment.removed) {
      comment.remove();
    }
  }
}

const htmlRewriter = new HTMLRewriter()
  .on('about', new AboutElementRewriter())
  .on('*', new GeneralElementRewriter())
  .onDocument(new DocumentRewriter());

/**
 * Parses the rawAboutResponse by removing all the unnecessary elements, and extract the content of the about element
 * @param rawReadmeResponse The raw HTML of the readme page fetched from GitHub
 */
async function parseAboutResponse(
  rawReadmeResponse: Response
): Promise<string> {
  const parsedResponse = htmlRewriter.transform(rawReadmeResponse);

  // Get the text from the response and remove whitespace and newlines
  // Errors should be handled outside of this function
  return (await parsedResponse.text()).trim();
}

export default parseAboutResponse;
