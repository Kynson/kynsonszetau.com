<!-- Logic for Captcha -->
<script lang="ts">
  import { onMount } from 'svelte';

  let captchaContainer: HTMLDivElement;
  let captchaId: string;

  export async function execute() {
    if (!captchaId) {
      // No captcha is loaded, exit directly
      return;
    }
  
    return await window.hcaptcha.execute(
      captchaId,
      {
        async: true
      }
    );
  }

  onMount(() => {
    if (!window.hcaptcha) {
      console.log('load fail')
      return;
    }

    captchaId = window.hcaptcha
      .render(
        captchaContainer,
        {
          sitekey: 'a21d0666-b103-430d-a6f4-185e0d978de8',
          size: 'invisible',
          theme: 'dark'
        }
      );
  });
</script>

<!-- Content for Captcha -->
<div bind:this={captchaContainer}></div>