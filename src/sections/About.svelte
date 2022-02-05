<!-- Logic for About -->
<script lang="ts">
  import { getContext, onMount } from 'svelte';

  const { sectionReady } = getContext('about');

  let aboutText = '';

  onMount(() => {
    setTimeout(() => {
      console.log('hi')
      sectionReady();
      aboutText = 'This is a test'
    }, 2000)
  })

</script>

<p>{aboutText || ''}</p>