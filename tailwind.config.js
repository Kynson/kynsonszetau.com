module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.svelte'
  ],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: []
};