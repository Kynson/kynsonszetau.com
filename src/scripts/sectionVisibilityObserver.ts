export type SectionChangeEvent = CustomEvent<{ newSection: HTMLElement }>;
// Not necessary here, but added for future extensibility
interface SectionVisibilityObserverEventMap {
  change: SectionChangeEvent;
}

interface SectionVisibilityObserverEventTarget extends EventTarget {
  new (): SectionVisibilityObserverEventTarget;

  addEventListener<K extends keyof SectionVisibilityObserverEventMap>(
    type: K,
    listener: (event: SectionVisibilityObserverEventMap[K]) => void,
    options?: EventListenerOptions | boolean,
  ): void;

  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean,
  ): void;

  removeEventListener<K extends keyof SectionVisibilityObserverEventMap>(
    type: K,
    listener: (event: SectionVisibilityObserverEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;

  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean,
  ): void;
}

class SectionVisibilityObserver extends (EventTarget as SectionVisibilityObserverEventTarget) {
  #rootContainer = document.querySelector('main');
  #sections = document.querySelectorAll('section');

  #observer: IntersectionObserver;

  #currentSection: HTMLElement | null = this.#sections[0];
  #previousSection: HTMLElement | null = null;

  constructor(intersectionThreshold: number) {
    super();

    this.#observer = new IntersectionObserver(
      this.#intersectionHandler.bind(this),
      {
        root: this.#rootContainer,
        threshold: intersectionThreshold,
      },
    );

    for (let i = 0; i < this.#sections.length; i++) {
      this.#observer.observe(this.#sections[i]);
    }
  }

  /**
   * This function should be called after the current section is updated
   */
  #dispatchSectionChangedEvent() {
    const sectionChangedEventDetails = {
      newSection: this.#currentSection,
    };
    const sectionChangedEvent = new CustomEvent('change', {
      detail: sectionChangedEventDetails,
    });

    this.dispatchEvent(sectionChangedEvent);
  }

  #intersectionHandler(
    entries: IntersectionObserverEntry[],
    _observer: IntersectionObserver,
  ) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        this.#previousSection = this.#currentSection;
        this.#currentSection = entries[i].target as HTMLElement;

        this.#dispatchSectionChangedEvent();

        continue;
      }

      if (
        !entries[i].isIntersecting &&
        entries[i].target.isSameNode(this.#currentSection)
      ) {
        [this.#currentSection, this.#previousSection] = [
          this.#previousSection,
          this.#currentSection,
        ];

        this.#dispatchSectionChangedEvent();
      }
    }
  }
}

const INTERSECTION_THRESHOLD = 0.3;
const sectionVisibilityObserver = new SectionVisibilityObserver(
  INTERSECTION_THRESHOLD,
);

export { sectionVisibilityObserver };
