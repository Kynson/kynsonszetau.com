function parseHexAsRGBColor(color: string) {
  const parsedRGB = color.match(/[0-9a-f]{2}/g);

  if (!parsedRGB || parsedRGB.length !== 3) {
    throw new Error(`The color ${color} is either malformed or not in hex`);
  }

  return parsedRGB.map((value) => parseInt(value, 16)) as [
    number,
    number,
    number
  ];
}

export default function computeColorBrightness(color: string) {
  const [red, green, blue] = parseHexAsRGBColor(color);

  // HSP value
  return (
    Math.sqrt(0.241 * red ** 2 + 0.691 * green ** 2 + 0.068 * blue ** 2) / 255
  );
}
