export type SectionChangeEvent = CustomEvent<{ newSection: HTMLElement }>;
// Not necessary here, but added for future extensibility
interface SectionVisibilityObserverEventMap {
  change: SectionChangeEvent;
}

interface SectionVisibilityObserverEventTarget extends EventTarget {
  // EventTarget is a constructable class
  // eslint-disable-next-line @typescript-eslint/no-misused-new
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
  #sections = document.querySelectorAll('section');

  #observer: IntersectionObserver;

  #currentSection: HTMLElement | null = null;
  #previousSection: HTMLElement | null = null;

  constructor(intersectionThreshold: number) {
    super();

    this.#observer = new IntersectionObserver(
      this.#intersectionHandler.bind(this),
      {
        threshold: intersectionThreshold,
      },
    );

    for (const section of this.#sections) {
      this.#observer.observe(section);
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

  #intersectionHandler(entries: IntersectionObserverEntry[]) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.#previousSection = this.#currentSection;
        this.#currentSection = entry.target as HTMLElement;

        this.#dispatchSectionChangedEvent();

        continue;
      }

      if (
        entry.target.isSameNode(this.#currentSection) &&
        !!this.#previousSection
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
