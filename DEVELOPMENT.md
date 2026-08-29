# Development Note

## When to use TailwindCSS
Using TailwindCSS is convinent, but this also increases the bundle size for ALL pages. Hence it should be used with caution. The following rules should be used:

1. For animation, unless it is shared acrossed all the pages, use inline CSS or a shared CSS module instead
2. Do not use custom one off value, either inline it if it is one time use, or declare a custom TailwindCSS utility if it is shared across pages
3. If the custom one off value is dynamic, e.g. grid templates column, use a CSS variable utility instead.
4. Try to reuse the utility classes if possible, if the utility class is unlikely be reused across pages, inline it instead.
5. If most of the instances of the element should have the same set of styles, e.g. `a`, `ol`, `li` etc, define them in the global base layer instead.