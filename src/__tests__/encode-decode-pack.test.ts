import { fromString } from "uint8arrays/from-string";
import { concat } from "uint8arrays/concat";
import { decodePack } from "../decode-pack.js";
import { randInt } from "./test-util.js";
import { encode } from "../encode.js";
import { encodePack } from "../encode-pack";

const handcraftedCases = {
  "05": [5],
  "000A": [0, 10],
  "0B0C03": [11, 12, 3],
  C801: [200],
  "96130208B90A": [2454, 2, 8, 1337],
};

const handcraftedCasesTable = Object.entries(handcraftedCases).map((row) => ({
  bytes: fromString(row[0].toLowerCase(), "base16"),
  values: row[1],
}));

test.each(handcraftedCasesTable)("handcrafted decodePack(0x$hex)", (knownCase) => {
  const encoded = encodePack(knownCase.values);
  expect(encoded).toEqual(knownCase.bytes);
  const decoded = decodePack(knownCase.bytes);
  expect(decoded).toEqual(knownCase.values);
});

const fuzzyCasesTable = Array.from({ length: 30 }).map(() => {
  const numbers = Array.from({ length: randInt(10) + 1 }).map(() => {
    const byteLength = randInt(7) + 1;
    // Random number that is encoded in `byteLength` bytes, and is less than `Number.MAX_SAFE_INTEGER`.
    return randInt(Math.pow(2, 7 * byteLength), Math.pow(2, 7 * (byteLength - 1)));
  });
  const encoded = concat(numbers.map(encode));
  return {
    bytes: encoded,
    values: numbers,
  };
});

test.each(fuzzyCasesTable)("fuzzy decodePack(0x$hex)", (knownCase) => {
  const encoded = encodePack(knownCase.values);
  expect(encoded).toEqual(knownCase.bytes);
  const decoded = decodePack(knownCase.bytes);
  expect(decoded).toEqual(knownCase.values);
});
