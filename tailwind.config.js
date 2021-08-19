/** @type { import('@types/tailwindcss/tailwind-config').TailwindConfig } */
module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.svelte'
  ],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    extend: {
      colors: {
        'twelve-back': '#121212',
        'thirty-gray': '#303030',

        'ice-blue': '#90caf9'
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', '-apple-system', 'sans-serif'],
        mono: ['Inconsolata', 'ui-monospace', 'monospace']
      },
      gridColumnEnd: {
        'last': '-1'
      },
      screens: {
        'xs': {
          min: '475px',
          max: '639px'
        }
      }
    }
  },
  plugins: []
};