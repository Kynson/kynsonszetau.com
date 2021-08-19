<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">

  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;600&family=Montserrat:wght@400;500&display=swap">
</svelte:head>

<!-- Style for global -->
<style global>
  @import "./tailwindcss.css";
</style>

<!-- Logic for App -->
<script lang="ts">
  import { Router } from '@roxi/routify';
  import { routes } from './.routify/routes';
</script>

<!-- Content for App -->
<Router {routes} />