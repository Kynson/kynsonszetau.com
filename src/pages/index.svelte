<script lang="ts">
  import { onMount } from 'svelte';

  import { currentSection } from '@stores/sectionStore';

  import SectionIndicator from '@components/SectionIndicator.svelte';
  import Button from '@components/Button.svelte';

  import LazySection from '@components/LazySection.svelte';

  let scrollWrapper: HTMLDivElement;

  let sections: Map<string, Element> = new Map();
  let sectionIds: string[] = [];
  let sectionsIntersectionStatus = {};


  function nextSectionOf(currentSection: string): string | null {
    const nextIndex = sectionIds.indexOf(currentSection) + 1;

    if (nextIndex >= sectionIds.length) {
      return null;
    }
  
    return sectionIds[nextIndex];
  }

  function previousSectionOf(currentSection: string): string | null {
    const previousIndex = sectionIds.indexOf(currentSection) - 1;

    if (previousIndex < 0) {
      return null;
    }

    return sectionIds[previousIndex];
  }

  /**
   * Scrolls the content to a target which is above the middle of the screen
   */
  function scrollToMiddle() {
    const isLargeScreen = window.innerWidth >= 768;

    // The maxium scrollable pixels before the text being covered
    // It is essentially the difference between the text and the screen top
    // const scrollMaxPixels = isLargeScreen ? 200 : 150;
    const scrollMaxPixels = isLargeScreen ? 125 : 100;
    // scrollPixels is computed with the formula: scrollMaxPixels - (middle of the screen - offset)
    // scrollStart is the sum of scrollMaxPixels and offset
    // const scrollStart = isLargeScreen ? 382 : 296;
    const scrollStart = isLargeScreen ? 300 : 275;
    // Clamp the value between scrollMaxPixels and 0
    // So only scroll when the content is below the target
    const scrollPixels = Math.min(
        scrollMaxPixels,
        Math.max(0, scrollStart - window.innerHeight / 2)
      );

    scrollWrapper
      .scrollTo(0, scrollPixels);
  }

  function onIntersectionChange(entries: IntersectionObserverEntry[]) {
    const nextSection = nextSectionOf($currentSection);
    const previousSection = previousSectionOf($currentSection);

    entries.forEach((entry) => {
      const { isIntersecting, target } = entry;
      sectionsIntersectionStatus[target.id] = isIntersecting;
    });

    const isCurrentSectionIntersecting = sectionsIntersectionStatus[$currentSection];

    if (
      !isCurrentSectionIntersecting
      && sectionsIntersectionStatus[nextSection]
    ) {
      $currentSection = nextSection;
    }

    if (
      sectionsIntersectionStatus[previousSection]
    ) {
      $currentSection = previousSection;
    }
  }

  function observeIntersection(): IntersectionObserver {
    const observer = new IntersectionObserver(onIntersectionChange, { root: scrollWrapper, rootMargin: '-80px 0px 0px 0px' });

    sections.forEach((section) => {
      observer.observe(section);
    });

    return observer;
  }

  function onSectionSelect(event: CustomEvent) {
    const { detail } = event;
    const { section } = detail;

    const { top } = sections.get(section).getBoundingClientRect();
    const scrollTarget = top + scrollWrapper.scrollTop - 79;

    $currentSection = section;
    scrollWrapper.scrollTo(
      0,
      scrollTarget
    );
  }

  onMount(() => {
    scrollToMiddle();

    for (const child of scrollWrapper.children) {
      const { id, tagName } = child;
      if (tagName !== 'SECTION') {
        continue;
      }

      sections.set(id, child);
    }

    sectionIds = [...sections.keys()];

    const observer = observeIntersection();

    // Disconnect the observer when the page is destoryed
    return () => {
      observer.disconnect();
    }
  });
</script>

<style lang="postcss">
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
    #container {
      grid-template-columns: 3rem auto;
      grid-template-rows: repeat(12, 1fr);
    }
    #hero {
      grid-template-columns: repeat(12, 1fr);
    }
  }
</style>

<!-- Content for index -->
<div id="container" class="grid h-full">
  <SectionIndicator
    class="row-span-full col-start-1 col-span-1 self-center hidden md:flex md:pl-6"
    sections={sectionIds}
    on:sectionSelect={onSectionSelect}
  ></SectionIndicator>
  <div
    class="overflow-y-scroll md:col-start-2 md:col-end-last md:row-span-full"
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
      <svg class="text-thirty-gray col-start-3 md:col-start-10 col-end-last row-start-7 max-w-full max-h-60 xs:max-h-64 sm:max-h-72 md:max-h-80" viewBox="0 0 920 920" xmlns="http://www.w3.org/2000/svg">
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
    <section id="about">
      <div class="px-6 xs:px-10 sm:px-12 md:px-8">
        <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus feugiat massa tempus pellentesque. Sed vel leo vel lectus condimentum vehicula. Suspendisse eget luctus velit. Sed faucibus velit sollicitudin ante elementum, sed gravida risus consectetur. Vestibulum non leo magna. Nunc consequat quam in felis volutpat suscipit. Cras ultricies sagittis arcu in ornare. Praesent eu ligula placerat, luctus arcu eu, vehicula odio. Sed sodales ex a bibendum dapibus. Donec vitae quam eu dui finibus venenatis ac maximus felis. Ut sit amet laoreet elit. Etiam eleifend mattis augue sed commodo. Vestibulum non sapien sem. Sed congue arcu non ipsum molestie ornare. Nam vestibulum, tortor sed gravida varius, augue urna imperdiet tortor, at eleifend sapien nibh eu libero. Integer bibendum ultricies nunc at pellentesque. -->
        <LazySection section='about' placeholderComponent={Button}></LazySection>
      </div>
    </section>
    <section id="projects">
      <div class="px-6 xs:px-10 sm:px-12 md:px-8">
      Quisque dictum elementum vestibulum. Duis feugiat ultricies magna at pharetra. Proin eleifend mollis laoreet. Aenean tristique justo et finibus feugiat. Pellentesque nibh lectus, semper eget finibus tincidunt, aliquet tempus tellus. Duis nec dui et lectus pretium pellentesque. Aliquam volutpat, erat aliquet tincidunt consectetur, dolor lectus ullamcorper arcu, non egestas nulla nisl sed quam. Nulla scelerisque nibh nec ipsum tempor accumsan. Nam accumsan pharetra elementum. Nullam id commodo magna. Ut venenatis pulvinar arcu ac suscipit.

  Suspendisse eleifend, magna at imperdiet cursus, orci metus egestas magna, ut accumsan urna metus in neque. Vivamus non dictum eros, sit amet vulputate eros. Donec eget posuere elit, maximus porta sem. Donec et imperdiet leo, a luctus massa. Vivamus varius metus tempus est lobortis, a condimentum ligula laoreet. In euismod libero eu arcu dictum viverra. Cras a leo nisi. Quisque ullamcorper volutpat justo fermentum ultrices. Praesent efficitur risus ac rutrum dignissim. Ut ultricies gravida blandit. Maecenas tincidunt sapien ut nibh interdum, id lobortis risus convallis. Ut lacus eros, vulputate vitae purus sit amet, tincidunt pretium lectus. Aenean luctus tellus et lectus aliquam, sit amet luctus risus blandit.

  Aliquam pulvinar lorem a dictum sodales. Vestibulum congue nisi in consectetur imperdiet. Quisque volutpat odio consequat, accumsan ligula non, fringilla turpis. In vestibulum ipsum felis, vitae maximus augue feugiat vel. Maecenas eu nibh ac purus finibus bibendum in a risus. Quisque mollis mi mauris, eget viverra sem elementum sed. Sed tempus, tortor at semper commodo, lacus ligula tincidunt metus, in faucibus nisl mi in massa.
  ndisse eleifend, magna at imperdiet cursus, orci metus egestas magna, ut accumsan urna metus in neque. Vivamus non dictum eros, sit amet vulputate eros. Donec eget posuere elit, maximus porta sem. Donec et imperdiet leo, a luctus massa. Vivamus varius metus tempus est lobortis, a condimentum ligula laoreet. In euismod libero eu arcu dictum viverra. Cras a leo nisi. Quisque ullamcorper volutpat justo fermentum ultrices. Praesent efficitur risus ac rutrum dignissim. Ut ultricies gravida blandit. Maecenas tincidunt sapien ut nibh interdum, id lobortis risus convallis. Ut lacus eros, vulputate vitae purus sit amet, tincidunt pretium lectus. Aenean luctus tellus et lectus aliquam, sit amet luctus risus blandit.

  Aliquam pulvinar lorem a dictum sodales.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus feugiat massa tempus pellentesque. Sed vel leo vel lectus condimentum vehicula. Suspendisse eget luctus velit. Sed faucibus velit sollicitudin ante elementum, sed gravida risus consectetur. Vestibulum non leo magna. Nunc consequat quam in felis volutpat suscipit. Cras ultricies sagittis arcu in ornare. Praesent eu ligula placerat, luctus arcu eu, vehicula odio. Sed sodales ex a bibendum dapibus. Donec vitae quam eu dui finibus venenatis ac maximus felis. Ut sit amet laoreet elit. Etiam eleifend mattis augue sed commodo. Vestibulum non sapien sem. Sed congue arcu non ipsum molestie ornare. Nam vestibulum, tortor sed gravida varius, augue urna imperdiet tortor, at eleifend sapien nibh eu libero. Integer bibendum ultricies nunc at pellentesque.
      </div>
    </section>
  </div>
</div>