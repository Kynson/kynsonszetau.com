import computeColorBrightness from '../../src/handlers/pushHandler/color';

import { test, expect } from 'vitest';

test('computeColorBrightness should return 1 for white', () => {
  const color = '#ffffff';

  expect(computeColorBrightness(color)).toBe(1);
});

test('computeColorBrightness should return 0 for black', () => {
  const color = '#000000';

  expect(computeColorBrightness(color)).toBe(0);
});

test.for(['#00ffgg', '#ff2dee230', '#FF00EE'])(
  'computeColorBrightness should throw for %s',
  (color) => {
    expect(() => computeColorBrightness(color)).toThrow(
      `The color ${color} is either malformed or not in hex`
    );
  }
);
