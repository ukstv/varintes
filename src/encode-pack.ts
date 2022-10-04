import { encodingLength } from "./encoding-length.js";
import { encode } from "./encode.js";

/**
 * Encode numbers as varints packed as bytes sequentially.
 *
 * @param numbers - Input numbers
 */
export function encodePack(numbers: number[]): Uint8Array {
  const totalLength = numbers.reduce((acc, n) => acc + encodingLength(n), 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  numbers.forEach((n) => {
    const [bytes] = encode(n);
    result.set(bytes, offset);
    offset += bytes.byteLength;
  });
  return result;
}
