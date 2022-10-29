const MSB = 0x80; // 1000 0000
const REST = 0x7f; // 0111 1111

const SHIFT_4 = Math.pow(2, 7 * 4);
const SHIFT_5 = Math.pow(2, 7 * 5);
const SHIFT_6 = Math.pow(2, 7 * 6);
const SHIFT_7 = Math.pow(2, 7 * 7);

/**
 * Decode varint from input `buffer`. Return a decoded number and an amount of bytes read while decoding.
 *
 * @param buffer - input that contains an encoded varint.
 * @param offset
 * @return [decoded-varint, bytes-read]
 */
export function decode(buffer: Uint8Array, offset: number = 0): [number, number] {
  let byte = buffer[offset];

  let result = byte & REST;
  if (byte < MSB) {
    return [result, 1];
  }

  byte = buffer[offset + 1];
  result += (byte & REST) << 7;
  if (byte < MSB) {
    return [result, 2];
  }

  byte = buffer[offset + 2];
  result += (byte & REST) << 14;
  if (byte < MSB) {
    return [result, 3];
  }

  byte = buffer[offset + 3];
  result += (byte & REST) << 21;
  if (byte < MSB) {
    return [result, 4];
  }

  byte = buffer[offset + 4];
  result += (byte & REST) * SHIFT_4;
  if (byte < MSB) {
    return [result, 5];
  }

  byte = buffer[offset + 5];
  result += (byte & REST) * SHIFT_5;
  if (byte < MSB) {
    return [result, 6];
  }

  byte = buffer[offset + 6];
  result += (byte & REST) * SHIFT_6;
  if (byte < MSB) {
    return [result, 7];
  }

  byte = buffer[offset + 7];
  result += (byte & REST) * SHIFT_7;
  if (byte < MSB) {
    return [result, 8];
  }

  throw new RangeError("Could not decode varint");
}
