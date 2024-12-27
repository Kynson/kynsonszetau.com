import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,svelte,ts}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
    },
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      black: colors.black,
      gray: colors.gray,
      blue: {
        '50': '#f0f7fe',
        '100': '#dcedfd',
        '200': '#c1e0fc',
        '300': '#90caf9',
        '400': '#65b2f5',
        '500': '#4192f0',
      },
    },
  },
  plugins: [],
} satisfies Config;
