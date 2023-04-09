import chroma from 'chroma-js';

type HexColor = string & { __brand: 'hex' };
type RgbColor = string & { __brand: 'rgb' };
type HslColor = string & { __brand: 'hsl' };
type Color = HexColor | RgbColor | HslColor;

const isRgb = (color: string): color is RgbColor =>
  /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/.test(color);
const isHsl = (color: string): color is HslColor =>
  /^hsl\((\d{1,3}), (\d{1,3})%, (\d{1,3})%\)$/.test(color);
const isHex = (color: string): color is HexColor =>
  /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
const isColor = (color: string): color is Color => isRgb(color) || isHsl(color) || isHex(color);

// an array of exactly 10 colors (strings)
type Shades = [Color, Color, Color, Color, Color, Color, Color, Color, Color, Color];

const isShades = (shades: any): shades is Shades =>
  Array.isArray(shades) && shades.every((item) => typeof item === 'string') && shades.length === 10;

export const generateShades = (baseColor: string): Shades => {
  if (!isColor(baseColor)) throw new Error('Invalid color');
  const baseColorChroma = chroma(baseColor);
  const lightnessMap: number[] = [0.95, 0.86, 0.77, 0.68, 0.59, 0.5, 0.41, 0.32, 0.23, 0.14];
  const saturationMap: number[] = [0.32, 0.16, 0.08, 0.04, 0, 0, 0.04, 0.08, 0.16, 0.32];

  const lightnessGoal = baseColorChroma.get('hsl.l');
  const closestLightness = lightnessMap.reduce((prev, curr) =>
    Math.abs(curr - lightnessGoal) < Math.abs(prev - lightnessGoal) ? curr : prev
  );
  const baseColorIndex = lightnessMap.findIndex((l) => l === closestLightness);

  const shades = lightnessMap
    .map((l) => baseColorChroma.set('hsl.l', l))
    .map((color) => chroma(color))
    .map((color, i) => {
      const saturationDelta = saturationMap[i] - saturationMap[baseColorIndex];
      return saturationDelta >= 0
        ? color.saturate(saturationDelta)
        : color.desaturate(saturationDelta * -1);
    });

  const hexShades = shades.map((color) => color.hex());
  if (!isShades(hexShades)) throw new Error('Invalid shades');

  return hexShades;
};

export default generateShades;
