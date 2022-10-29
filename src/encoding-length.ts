export const N1 = Math.pow(2, 7);
export const N2 = Math.pow(2, 7 * 2);
export const N3 = Math.pow(2, 7 * 3);
export const N4 = Math.pow(2, 7 * 4);
export const N5 = Math.pow(2, 7 * 5);
export const N6 = Math.pow(2, 7 * 6);
export const N7 = Math.pow(2, 7 * 7);
export const N8 = Math.pow(2, 7 * 8);
export const N9 = Math.pow(2, 7 * 9);

/**
 * Calculate amount of bytes that it takes to represent a `value` as varint, in bytes.
 *
 * @param value - Number to represent as varint.
 * @return number - Amount of bytes in the varint representation.
 */
export function encodingLength(value: number): number {
  return value < N1
    ? 1
    : value < N2
    ? 2
    : value < N3
    ? 3
    : value < N4
    ? 4
    : value < N5
    ? 5
    : value < N6
    ? 6
    : value < N7
    ? 7
    : value < N8
    ? 8
    : value < N9
    ? 9
    : 10;
}
