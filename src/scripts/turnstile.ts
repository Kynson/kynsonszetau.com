// Creating side effects in modules are not recommended.
// Therefore, we wrap the initialization code inside a function
export default function initializeTurnstile() {
  const turnstileSpinner = document.querySelector('#turnstile-spinner')!;
  const turnstileStatusCheckbox = document.querySelector(
    '#turnstile-status-checkbox',
  )! as HTMLInputElement;

  // Inject turnstile script
  const scriptElement = document.createElement('script');
  scriptElement.src =
    'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=turnstileLoadHandler';
  document.head.appendChild(scriptElement);

  function markTurnstileVerified() {
    turnstileStatusCheckbox.checked = true;

    turnstileStatusCheckbox.dispatchEvent(
      new InputEvent('input', { bubbles: true }),
    );
  }

  function resetTurnstileStatus() {
    turnstileStatusCheckbox.checked = false;

    turnstileStatusCheckbox.dispatchEvent(
      new InputEvent('input', { bubbles: true }),
    );
  }

  window.turnstileLoadHandler = () => {
    turnstileSpinner.classList.add('hidden');

    window.turnstile.render('#turnstile-widget', {
      sitekey: '3x00000000000000000000FF',
      callback: markTurnstileVerified,
      'expired-callback': resetTurnstileStatus,
      'error-callback': resetTurnstileStatus,
      theme: 'dark',
      size: 'flexible',
    });
  };
}
