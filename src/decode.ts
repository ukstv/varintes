const MSB = 0x80;
const REST = 0x7f;

/**
 * Decode varint from input `buffer`. Return a decoded number and an amount of bytes read while decoding.
 *
 * @param buffer - input that contains an encoded varint.
 * @return [decoded-varint, bytes-read]
 */
export function decode(buffer: ArrayLike<number>): [number, number] {
  let result = 0;
  let bytesRead = 0;
  let byte = 0;
  let shift = 0;
  do {
    if (bytesRead >= buffer.length || shift > 49) {
      throw new RangeError("Could not decode varint");
    }
    byte = buffer[bytesRead++];
    result += shift < 28 ? (byte & REST) << shift : (byte & REST) * Math.pow(2, shift);
    shift += 7;
  } while (byte >= MSB);

  return [result, bytesRead];
}
