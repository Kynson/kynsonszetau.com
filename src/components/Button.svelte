<script lang="ts">
  let clazz = '';
  export { clazz as class };

  export let id = '';
</script>

<button
  id={id}
  class="text-ice-blue uppercase text-sm flex flex-row items-center bg-ice-blue bg-opacity-10 hover:bg-opacity-20 transition-colors border-ice-blue border-solid border-2 rounded-md px-6 py-2 min-w-min h-9 {clazz}"

  on:click
>
  <span>
    <slot></slot>
  </span>
</button>