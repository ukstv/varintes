const MSB = 0x80;
const REST = 0x7f;
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
  const buffer = [];
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

  return new Uint8Array(buffer);
}
