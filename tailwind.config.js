const isProduction = !process.env.ROLLUP_WATCH;

module.exports = {
  purge: {
    content: [
      "./src/**/*.svelte",
    ],
    options: {
      // Override the default extractor for purge css,
      // preventing the dynamically added classes being removed
      // Reference: https://github.com/tailwindlabs/tailwindcss/discussions/1731#discussioncomment-294774
      defaultExtractor: (content) => {
        return [
          ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
          ...(content.match(/(?<=class:)[^=>\/\s]*/g) || [])
        ];
      }
    },
    enabled: isProduction
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: []
};