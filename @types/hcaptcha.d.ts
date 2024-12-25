interface Window {
  hcaptcha: IHcaptcha
}

interface IHcaptchaOptions {
  sitekey: string,
  size?: 'normal' | 'compact' | 'invisible',
  theme?: 'light' | 'dark'
}

interface IHcaptchaAsyncExecuteOptions {
  async: true
}

interface IHcaptchaSyncExecuteOptions {
  async: true
}

interface IHcaptcha {
  render(container: string | HTMLElement, options: IHcaptchaOptions): string,
  reset(widgetID?: string): void,
  execute(widgeID?: string, options?: IHcaptchaAsyncExecuteOptions): Promise<void>
  execute(widgeID?: string, options?: IHcaptchaSyncExecuteOptions): Promise<void>
  execute(widgetID?: string): void
}
