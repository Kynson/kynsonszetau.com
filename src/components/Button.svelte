<script lang="ts">
  let clazz = '';
  export { clazz as class };
</script>

<button
  class="text-ice-blue uppercase text-sm flex flex-row items-center border-ice-blue border-2 rounded-full px-6 py-2 min-w-min h-9 {clazz}"
  on:click
  >
  <span>
    <slot></slot>
  </span>
</button>