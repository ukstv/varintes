import { encodingLength } from "./encoding-length.js";

const MSB = 0x80; // 1000 0000
const REST = 0x7f; // 0111 1111
const MSBALL = ~REST;
const INT = Math.pow(2, 31);

/**
 * Encode number as varint bytes.
 *
 * @param num - Number to encode
 * @return Uint8Array - `num` encoded as bytes according to varint spec.
 */
export function encode(num: number): Uint8Array {
  if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
    throw new RangeError(`Could not encode ${num} as varint`);
  }
  const buffer = new Uint8Array(encodingLength(num));
  let bytes = 0;
  while (num >= INT) {
    buffer[bytes++] = (num & 0xff) | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    buffer[bytes++] = (num & 0xff) | MSB;
    num >>>= 7;
  }
  buffer[bytes] = num | 0;

  return buffer;
}
