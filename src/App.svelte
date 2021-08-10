<!-- Logic for App -->
<script lang="ts">
  import { Router } from '@roxi/routify';
  import { routes } from './.routify/routes';
</script>

<!-- Style for App -->
<style>
  @import "./App.css";
</style>

<!-- Content for App -->
<Router {routes} />