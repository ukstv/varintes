const MSB = 0x80; // 1000 0000
const REST = 0x7f; // 0111 1111

const SHIFTS = {
  0: Math.pow(2, 0),
  7: Math.pow(2, 7),
  14: Math.pow(2, 14),
  21: Math.pow(2, 21),
  28: Math.pow(2, 28),
  35: Math.pow(2, 35),
  42: Math.pow(2, 42),
  49: Math.pow(2, 49),
  56: Math.pow(2, 56),
  63: Math.pow(2, 63),
};

/**
 * Decode varint from input `buffer`. Return a decoded number and an amount of bytes read while decoding.
 *
 * @param buffer - input that contains an encoded varint.
 * @return [decoded-varint, bytes-read]
 */
export function decode(buffer: Uint8Array): [number, number] {
  let result = 0;
  let bytesRead = 0;
  let byte = 0;
  let shift: keyof typeof SHIFTS = 0;

  do {
    byte = buffer[bytesRead++];
    // @ts-ignore
    result += shift < 28 ? (byte & REST) << shift : (byte & REST) * SHIFTS[shift];
    shift += 7;
  } while (byte >= MSB && shift <= 56);

  if (shift > 56 || bytesRead > buffer.length) {
    throw new RangeError("Could not decode varint");
  }

  return [result, bytesRead];
}
