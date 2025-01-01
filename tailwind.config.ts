import type { Config } from 'tailwindcss';

import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

import formsPlugin from '@tailwindcss/forms';
import typewriterAnimationPlugin from './plugins/tailwind/typewriterAnimation';
import userInvalidVariantPlugin from './plugins/tailwind/userInvalidVariant';

export default {
  content: ['./src/**/*.{astro,html,js,svelte,ts}'],
  theme: {
    extend: {
      transitionProperty: {
        border: 'border',
        display: 'display',
      },
      maxWidth: {
        prose: '70ch',
        'half-prose': '35ch',
      },
    },
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
    },
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      blue: {
        '50': '#f0f7fe',
        '100': '#dcedfd',
        '200': '#c1e0fc',
        '300': '#90caf9',
        '400': '#65b2f5',
        '500': '#4192f0',
        '600': '#2c75e4',
        '700': '#235fd2',
        '800': '#234eaa',
        '900': '#224486',
        '950': '#192b52',
      },
    },
  },
  plugins: [typewriterAnimationPlugin, userInvalidVariantPlugin, formsPlugin],
} satisfies Config;
