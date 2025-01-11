type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface Window {
  turnstile: Turnstile.Turnstile;
  turnstileLoadHandler(): void;
}
