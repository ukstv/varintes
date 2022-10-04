import { encodingLength } from "./encoding-length.js";

const MSB = 0x80; // 1000 0000
const REST = 0x7f; // 0111 1111
const MSBALL = ~REST;
const INT = Math.pow(2, 31);

/**
 * Encode number as varint bytes.
 *
 * @param num - Number to encode.
 * @param out - Uint8Array bytes to write to. If not specified, empty buffer is used.
 * @param offset - Offset to use for the `out` buffer.
 * @return [Uint8Array, number] - Uint8Array with`num` encoded as bytes according to varint spec, and number of bytes written.
 */
export function encode(
  num: number,
  out: Uint8Array = new Uint8Array(encodingLength(num)),
  offset: number = 0
): [Uint8Array, number] {
  if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
    throw new RangeError(`Could not encode ${num} as varint`);
  }
  let bytes = offset;
  while (num >= INT) {
    out[bytes++] = (num & 0xff) | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[bytes++] = (num & 0xff) | MSB;
    num >>>= 7;
  }
  out[bytes] = num | 0;

  return [out, bytes - offset + 1];
}
