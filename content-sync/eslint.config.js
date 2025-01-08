import { generateTSESLintConfigurations } from '@kynsonszetau/lint';

/** @type { import('eslint').Linter.Config } */
export default [
  ...generateTSESLintConfigurations(
    ['{src,test}/**/*.ts'],
  ),
  {
    files: ['test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': {
        allowInterfaces: 'with-single-extends',
      },
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    }
  }
];
