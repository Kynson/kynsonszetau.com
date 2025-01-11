export function generateNotificationMessageFromTemplate(
  name: string,
  incomingMessage: string,
  email?: string | null,
  ip?: string | null,
  location?: string | null,
) {
  return `
  Recevied new message from ${name} **(${email || 'N/A'})**
  Location: _${location || 'N/A'}_
  IP address: _${ip || 'N/A'}_

  >>> ${incomingMessage}
  `
    .replaceAll(/^[ ]{4}/gm, '')
    .trim();
}
