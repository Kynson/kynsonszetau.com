import plugin from 'tailwindcss/plugin';

const typewriterAnimationPlugin = plugin(
  ({ matchComponents, matchUtilities, theme }) => {
    matchUtilities(
      {
        ['animate-typewriter-duration'](value) {
          return {
            '--animate-typewriter-duration': value,
          };
        },
      },
      {
        values: theme('transitionDuration'),
      },
    );

    matchUtilities({
      'animate-typewriter-start': (value) => {
        return {
          '--animate-typewriter-start': value,
        };
      },
      'animate-typewriter-end': (value) => {
        return {
          '--animate-typewriter-end': value,
        };
      },
    });

    matchComponents(
      {
        'animate-typewriter': () => {
          return {
            '@keyframes typing': {
              from: {
                width: 'calc(var(--animate-typewriter-start) * 1ch + 2px)',
              },
              to: {
                width: 'calc(var(--animate-typewriter-end) * 1ch + 2px)',
              },
            },
            '@keyframes cursor-blink': {
              from: {
                borderRightColor: '#fff',
              },
              to: {
                borderRightColor: 'transparent',
              },
            },
            animation:
              'var(--animate-typewriter-duration, 1s) steps(calc(var(--animate-typewriter-end) - var(--animate-typewriter-start))) typing, .8s steps(2, jump-none) var(--animate-typewriter-duration, 1s) infinite cursor-blink',
            overflow: 'hidden',
            textOverflow: 'clip',
            textWrap: 'nowrap',
            width: 'calc(var(--animate-typewriter-end) * 1ch + 2px)',
            borderRight: '2px solid #fff',
          };
        },
      },
      { values: { DEFAULT: '' } },
    );
  },
);

export default typewriterAnimationPlugin;
