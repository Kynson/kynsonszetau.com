<script lang="ts">
  import { onMount } from 'svelte';

  import Button from '@components/Button.svelte';

  let scrollWrapper: HTMLDivElement;

  onMount(() => {
    // 382 is computed from 200 + half height of section indicator + 30 delta
    const scrollStart = window.innerWidth >= 768 ? 382 : 296;
    const scrollMaxPixels = window.innerWidth >= 768 ? 200 : 150;
    const scrollPixels = Math.min(scrollMaxPixels, Math.max(0, scrollStart - window.innerHeight / 2));

    scrollWrapper
      .scrollTo(0, scrollPixels);
  })
</script>

<style>
  section {
    @apply grid;
    @apply pb-32;
  }

  #hero {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }

  /* Styles for medium (md) sized device */
  @media (min-width: 768px) {
    #hero {
      grid-template-columns: repeat(12, 1fr);
    }
  }
</style>

<!-- Content for index -->
<div 
  class="overflow-y-scroll md:col-start-2 md:col-end-last md:row-start-2 md:row-span-full"
  bind:this={scrollWrapper}
  >
  <section id="hero">
    <div class="row-start-3 row-end-6 col-start-1 lg:col-start-2 col-end-last px-6 xs:px-10 sm:px-12 md:px-8">
      <div class="flex flex-row font-mono mb-2 sm:mb-3 text-sm sm:text-base md:text-xl">
        <span class="text-ice-blue text-opacity-75 font-semibold mr-2 hidden sm:block">root@kynsonszetau:~#</span>
        <span class="text-ice-blue text-opacity-75 font-semibold mr-2 sm:hidden">~#</span>
        <span class="text-opacity-75">./hello_world</span>
      </div>
      <h1 class="tranking-wide font-medium text-2xl xs:text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8">
        I am Kynson Szetau
        <br>
        A self-taught developer
      </h1>
      <Button>contact me</Button>
    </div>
    <svg class="text-thirty-gray col-start-3 md:col-start-10 col-end-last row-start-7 max-h-60 xs:max-h-64 sm:max-h-72 md:max-h-80" viewBox="0 0 920 920" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
        <path d="M319.71 252.536C321.662 250.583 324.828 250.583 326.781 252.536L434.615 360.369C436.567 362.322 436.567 365.488 434.615 367.44L226.018 576.037L114.649 464.668C112.696 462.715 112.696 459.549 114.649 457.596L319.71 252.536Z" fill="currentColor"/>
        <path d="M114.649 464.44C112.696 462.488 112.696 459.322 114.649 457.369L226.018 346L434.615 554.596C436.567 556.549 436.567 559.715 434.615 561.668L326.781 669.501C324.828 671.454 321.662 671.454 319.71 669.501L114.649 464.44Z" fill="currentColor"/>
        <path d="M567.198 4.53553C569.15 2.58291 572.316 2.58291 574.269 4.53553L682.103 112.369C684.055 114.322 684.055 117.488 682.103 119.44L455.829 345.715L344.459 234.345C342.507 232.393 342.507 229.227 344.459 227.274L567.198 4.53553Z" fill="currentColor"/>
        <path d="M682.103 801.798C684.055 803.751 684.055 806.917 682.103 808.869L574.269 916.703C572.316 918.656 569.15 918.656 567.198 916.703L340.924 690.429L455.828 575.524L682.103 801.798Z" fill="currentColor"/>
        <path d="M797.008 457.084C798.96 459.036 798.96 462.202 797.008 464.155L685.638 575.524L455.829 345.715L570.734 230.81L797.008 457.084Z" fill="currentColor"/>
        <path d="M685.638 345.715L797.007 457.084C798.96 459.036 798.96 462.202 797.007 464.155L570.733 690.429L455.828 575.524L685.638 345.715Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="920" height="920" fill="none"/>
        </clipPath>
      </defs>
    </svg>
  </section>
  <section>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Consequat interdum
      varius sit amet mattis. Posuere ac ut consequat semper viverra nam.
      Sodales ut etiam sit amet nisl. Fringilla est ullamcorper eget nulla.
      Scelerisque felis imperdiet proin fermentum leo. Volutpat est velit
      egestas dui id ornare. At auctor urna nunc id cursus metus aliquam. At
      auctor urna nunc id. Sed vulputate odio ut enim. Faucibus in ornare quam
      viverra orci sagittis eu volutpat. Vestibulum mattis ullamcorper velit
      sed ullamcorper. Massa tincidunt dui ut ornare lectus sit amet est
      placerat. At elementum eu facilisis sed odio morbi. Urna nec tincidunt
      praesent semper feugiat nibh sed pulvinar proin. Et netus et malesuada
      fames ac turpis egestas sed. Id leo in vitae turpis massa sed elementum
      tempus. Cursus risus at ultrices mi tempus imperdiet nulla. Est
      ullamcorper eget nulla facilisi. Malesuada fames ac turpis egestas
      integer eget. Pellentesque pulvinar pellentesque habitant morbi
      tristique senectus et. Senectus et netus et malesuada fames ac turpis.
      Ullamcorper morbi tincidunt ornare massa eget egestas purus. Odio ut sem
      nulla pharetra. Vehicula ipsum a arcu cursus. Viverra justo nec ultrices
      dui sapien. Metus aliquam eleifend mi in nulla posuere sollicitudin. In
      arcu cursus euismod quis viverra nibh cras. Placerat duis ultricies
      lacus sed. Feugiat in fermentum posuere urna nec tincidunt praesent
      semper. Faucibus nisl tincidunt eget nullam non nisi. Orci nulla
      pellentesque dignissim enim sit amet venenatis. Dignissim enim sit amet
      venenatis urna. Pellentesque pulvinar pellentesque habitant morbi
      tristique senectus. Bibendum at varius vel pharetra vel turpis nunc eget
      lorem. Sed enim ut sem viverra. Habitasse platea dictumst vestibulum
      rhoncus est pellentesque elit. Vitae tortor condimentum lacinia quis vel
      eros. Urna cursus eget nunc scelerisque viverra mauris in aliquam.
      Consectetur adipiscing elit ut aliquam. Ornare aenean euismod elementum
      nisi quis eleifend quam adipiscing. Integer malesuada nunc vel risus
      commodo. Dui ut ornare lectus sit amet est placerat in egestas.
      Consectetur lorem donec massa sapien faucibus et molestie. Ut ornare
      lectus sit amet. Donec adipiscing tristique risus nec feugiat in
      fermentum. Lectus proin nibh nisl condimentum id. Tincidunt nunc
      pulvinar sapien et. Scelerisque fermentum dui faucibus in ornare quam
      viverra orci. Tristique risus nec feugiat in fermentum posuere urna nec
      tincidunt. Sapien faucibus et molestie ac feugiat sed lectus vestibulum
      mattis. Egestas integer eget aliquet nibh praesent tristique. Amet justo
      donec enim diam vulputate ut pharetra. Tincidunt augue interdum velit
      euismod in pellentesque. Sed egestas egestas fringilla phasellus. At
      urna condimentum mattis pellentesque. Massa id neque aliquam vestibulum
      morbi blandit cursus. Ut venenatis tellus in metus vulputate eu
      scelerisque felis. At varius vel pharetra vel turpis nunc. Elementum
      nibh tellus molestie nunc non blandit massa. Tempor commodo ullamcorper
      a lacus. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum.
      Tristique nulla aliquet enim tortor at auctor urna nunc. Laoreet
      suspendisse interdum consectetur libero id faucibus nisl tincidunt. Vel
      eros donec ac odio tempor orci. Pellentesque nec nam aliquam sem et
      tortor. Libero nunc consequat interdum varius sit. Dictumst vestibulum
      rhoncus est pellentesque elit ullamcorper dignissim. Odio tempor orci
      dapibus ultrices in. Nibh mauris cursus mattis molestie a iaculis at
      erat pellentesque. Massa tempor nec feugiat nisl pretium fusce. Diam
      sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Posuere urna nec
      tincidunt praesent. In est ante in nibh mauris cursus mattis. Pretium
      fusce id velit ut tortor pretium viverra. Praesent semper feugiat nibh
      sed pulvinar proin gravida hendrerit. Nulla aliquet enim tortor at
      auctor urna. Sit amet consectetur adipiscing elit duis tristique. Risus
      ultricies tristique nulla aliquet enim. Mattis molestie a iaculis at
      erat pellentesque adipiscing commodo. Sodales ut eu sem integer. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Consequat interdum varius
      sit amet mattis. Posuere ac ut consequat semper viverra nam. Sodales ut
      etiam sit amet nisl. Fringilla est ullamcorper eget nulla. Scelerisque
      felis imperdiet proin fermentum leo. Volutpat est velit egestas dui id
      ornare. At auctor urna nunc id cursus metus aliquam. At auctor urna nunc
      id. Sed vulputate odio ut enim. Faucibus in ornare quam viverra orci
      sagittis eu volutpat. Vestibulum mattis ullamcorper velit sed
      ullamcorper. Massa tincidunt dui ut ornare lectus sit amet est placerat.
      At elementum eu facilisis sed odio morbi. Urna nec tincidunt praesent
      semper feugiat nibh sed pulvinar proin. Et netus et malesuada fames ac
      turpis egestas sed. Id leo in vitae turpis massa sed elementum tempus.
      Cursus risus at ultrices mi tempus imperdiet nulla. Est ullamcorper eget
      nulla facilisi. Malesuada fames ac turpis egestas integer eget.
      Pellentesque pulvinar pellentesque habitant morbi tristique senectus et.
      Senectus et netus et malesuada fames ac turpis. Ullamcorper morbi
      tincidunt ornare massa eget egestas purus. Odio ut sem nulla pharetra.
      Vehicula ipsum a arcu cursus. Viverra justo nec ultrices dui sapien.
      Metus aliquam eleifend mi in nulla posuere sollicitudin. In arcu cursus
      euismod quis viverra nibh cras. Placerat duis ultricies lacus sed.
      Feugiat in fermentum posuere urna nec tincidunt praesent semper.
      Faucibus nisl tincidunt eget nullam non nisi. Orci nulla pellentesque
      dignissim enim sit amet venenatis. Dignissim enim sit amet venenatis
      urna. Pellentesque pulvinar pellentesque habitant morbi tristique
      senectus. Bibendum at varius vel pharetra vel turpis nunc eget lorem.
      Sed enim ut sem viverra. Habitasse platea dictumst vestibulum rhoncus
      est pellentesque elit.
    </div>
  </section>
</div>