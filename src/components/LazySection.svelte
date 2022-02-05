<!-- Logic for Lazy Section -->
<script lang="ts">
  import { setContext } from 'svelte';

  import { currentSection } from '@stores/sectionStore';

  export let section: string;
  export let placeholderComponent: any;

  let isSectionLoading = false;
  let isSectionLoaded = false;
  let loadedSectionModule: any = null;

  let isSectionReady = false;

  setContext(section, {
    sectionReady: () => isSectionReady = true
  });


  const sectionsMap = {
    about: () => import('@sections/About.svelte')
  }

  async function importSectionModule() {
    isSectionLoading = true;

    try {
      ({ default: loadedSectionModule } = await sectionsMap[section]());
    } catch (error) {
      return;
    } finally {
      isSectionLoading = false;
    }

    isSectionLoaded = true;
  }

  $: {
    if (!isSectionLoading && !isSectionLoaded && $currentSection === section) {
      importSectionModule()
    }
  }

</script>

<!-- Content for Lazy Section -->
{#if !isSectionReady}
    <svelte:component this={placeholderComponent}></svelte:component>
{/if}

<svelte:component this={loadedSectionModule}></svelte:component>