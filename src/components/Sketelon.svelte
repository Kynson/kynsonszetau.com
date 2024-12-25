<!-- Logic for Sketelon -->
<script lang="ts">
  type Variant = 'p' | 'h1' | 'block';

  export let variant: Variant = 'p';

  let clazz = '';
  export { clazz as class };

  // Warning this will be removed by the JIT engine
  const variantClasses: { [key in Variant]: string } = {
    p: 'h-6 mb-4',
    h1: 'h-9 mb-5',
    block: 'h-32 mb-8',
  }
</script>

<!-- Style for Sketelon -->
<style>
  div {
    animation: slide 2.5s ease-in-out .5s infinite;
  }

  @keyframes slide {
    0% {
      background-position: -1000% 0, center;
    }
    100% {
      background-position: 1000% 0, center;
    }
  }
</style>

<!-- Content for Sketelon -->
<div class="
  rounded bg-gradient-to-r from-transparent via-zinc-700 bg-[position:-1000%] bg-[length:80%] bg-[height:100%] bg-no-repeat bg-thirty-gray w-full
  {variantClasses[variant]} {clazz}
"></div>