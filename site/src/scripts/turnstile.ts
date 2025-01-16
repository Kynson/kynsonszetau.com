import { TURNSTILE_SITEKEY } from 'astro:env/client';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
// All scripts are loaded as modules, the elements must be available
const turnstileStatusCheckbox = document.querySelector<HTMLInputElement>(
  '#turnstile-status-checkbox',
)!;
const turnstileSpinner = document.querySelector('#turnstile-spinner')!;
/* eslint-enable @typescript-eslint/no-non-null-assertion */

function markTurnstileVerified() {
  turnstileStatusCheckbox.checked = true;

  turnstileStatusCheckbox.dispatchEvent(
    new InputEvent('input', { bubbles: true }),
  );
}

export function resetTurnstileStatus() {
  turnstileStatusCheckbox.checked = false;

  turnstileStatusCheckbox.dispatchEvent(
    new InputEvent('input', { bubbles: true }),
  );
}

// Creating side effects in modules are not recommended.
// Therefore, we wrap the initialization code inside a function
export function initializeTurnstile() {
  // Inject turnstile script
  const scriptElement = document.createElement('script');
  scriptElement.src =
    'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=turnstileLoadHandler';
  document.head.appendChild(scriptElement);

  window.turnstileLoadHandler = () => {
    turnstileSpinner.classList.add('hidden');

    window.turnstile.render('#turnstile-widget', {
      sitekey: TURNSTILE_SITEKEY,
      callback: markTurnstileVerified,
      'expired-callback': resetTurnstileStatus,
      'error-callback': resetTurnstileStatus,
      theme: 'dark',
      size: 'flexible',
    });
  };
}
