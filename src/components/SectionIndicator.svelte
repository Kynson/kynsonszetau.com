<script lang="ts">
  import { currentSection } from '@stores/sectionStore';

  let clazz = '';
  export { clazz as class };

  export let sections = [''];

  function setCurrentSection(event: MouseEvent) {
    const { target } = event;
    const targetSection = (target as HTMLDivElement).dataset.forSection;

    if (targetSection === $currentSection) {
      return;
    }

    $currentSection = targetSection;
  }
</script>

<div class="flex flex-col {clazz}">
  {#each sections as section}
    <div
      data-for-section="{section}"
      class="h-3 w-3 mt-8 first:mt-0 rounded-full border-gray-500 border-2 transition-colors duration-200 {section === $currentSection ? 'bg-gray-500' : 'cursor-pointer'}"

      on:click={setCurrentSection}
    ></div>
  {/each}
</div>