import { decode } from "./decode.js";

/**
 * Decode sequentially packed varints.
 *
 * @param buffer - Should contain varints following each other.
 * @return number[] Decoded numbers.
 */
export function decodePack(buffer: Uint8Array): number[] {
  const result: number[] = [];
  let offset = 0;
  while (offset < buffer.length) {
    const [num, bytesRead] = decode(buffer, offset);
    result.push(num);
    offset += bytesRead;
  }

  return result;
}
