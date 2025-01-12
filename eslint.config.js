import { generateTSESLintConfigurations } from '@kynsonszetau/lint';

/** @type { import('eslint').Linter.Config } */
export default [
  ...generateTSESLintConfigurations([
    '{content-sync,site,common}/{src,test}/**/*.ts',
  ]),
  {
    files: ['content-sync/test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'with-single-extends',
        },
      ],
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
