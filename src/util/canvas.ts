export function random(min: number, max: number) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

export function getDistance(x1: number, y1: number, x2: number, y2: number) {
  const a = x1 - x2;
  const b = y1 - y2;

  const c = Math.sqrt(a * a + b * b);
  return c;
}

/// Calculation function converted from processing

/* Re-maps a number from one range to another. In the example above,
   * the number '25' is converted from a value in the range 0..100 into
   * a value that ranges from the left edge (0) to the right edge (width)
   * of the screen.
   *
   * Numbers outside the range are not clamped to 0 and 1, because
   * out-of-range values are often intentional and useful.
   *
   * @param value the incoming value to be converted
   * @param start1 lower bound of the value's current range
   * @param stop1 upper bound of the value's current range
   * @param start2 lower bound of the value's target range
   * @param stop2 upper bound of the value's target range
*/

export function mapRange(value: number, start1: number, stop1: number, start2: number, stop2: number) {
  var NewValue = start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  return NewValue;
}

export function rgbValueFromRange(value: number, rangeStart: number, rangeEnd: number) {
  return mapRange(value, rangeStart, rangeEnd, 0, 0.5);
}

export const colourGradientOne = {
  red1: '#E74C3C',
  red2: '#C0392B',
  orange1: '#E67E22',
  orange2: '#D35400',
  yellow1: '#F1C40F',
  yellow2: '#F39C12',
  green1: '#2ECC71',
  green2: '#27AE60',
  mint1: '#1ABC9C',
  mint2: '#16A085',
  blue1: '#3498DB',
  blue2: '#2980B9',
  purple1: '#9B59B6',
  purple2: '#8E44AD',
  light1: '#ECF0F1',
  light2: '#BDC3C7',
  grey1: '#95A5A6',
  grey2: '#7F8C8D',
  dark1: '#34495E',
  dark2: '#2C3E50',
};
