<!-- Logic for App -->
<script lang="ts">
  import { Router } from '@roxi/routify';
  import { routes } from '../.routify/routes';

  import TailwindCSS from '@components/TailwindCSS.svelte';
</script>

<!-- Inject global style here -->
<TailwindCSS />

<!-- Style for App -->
<style lang="scss">
  @import "./App.scss";
</style>

<Router {routes} />