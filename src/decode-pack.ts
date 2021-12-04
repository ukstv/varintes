import { decode } from "./decode.js";

/**
 * Decode sequentially packed varints.
 *
 * @param buffer - Should contain varints following each other.
 * @return number[] Decoded numbers.
 */
export function decodePack(buffer: Uint8Array): number[] {
  const result: number[] = [];
  let index = 0;
  while (buffer.length > 0) {
    const [num, bytesRead] = decode(buffer);
    result[index++] = num;
    buffer = buffer.subarray(bytesRead);
  }

  return result;
}
