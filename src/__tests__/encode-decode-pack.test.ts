import { test } from "uvu";
import * as assert from "uvu/assert";
import { fromString } from "uint8arrays/from-string";
import { toString } from "uint8arrays/to-string";
import { concat } from "uint8arrays/concat";
import { decodePack } from "../decode-pack.js";
import { randInt } from "./test-util.js";
import { encode } from "../encode.js";
import { encodePack } from "../encode-pack.js";

const handcraftedCases = {
  "05": [5],
  "000A": [0, 10],
  "0B0C03": [11, 12, 3],
  C801: [200],
  "96130208B90A": [2454, 2, 8, 1337],
};

const handcraftedCasesTable = Object.entries(handcraftedCases).map((row) => ({
  hex: row[0].toLowerCase(),
  bytes: fromString(row[0].toLowerCase(), "base16"),
  values: row[1],
}));

handcraftedCasesTable.forEach((row) => {
  test(`handcrafted decodePack(0x${row.hex})`, () => {
    const encoded = encodePack(row.values);
    assert.equal(encoded, row.bytes);
    const decoded = decodePack(row.bytes);
    assert.equal(decoded, row.values);
  });
});

handcraftedCasesTable.forEach((row) => {
  test(`handcrafted decodePack(0x${row.hex})`, () => {
    const encoded = encodePack(row.values);
    assert.equal(encoded, row.bytes);
    const decoded = decodePack(row.bytes);
    assert.equal(decoded, row.values);
  });
});

const fuzzyCasesTable = Array.from({ length: 30 }).map(() => {
  const numbers = Array.from({ length: randInt(10) + 1 }).map(() => {
    const byteLength = randInt(7) + 1;
    // Random number that is encoded in `byteLength` bytes, and is less than `Number.MAX_SAFE_INTEGER`.
    return randInt(Math.pow(2, 7 * byteLength), Math.pow(2, 7 * (byteLength - 1)));
  });
  const encoded = new Uint8Array(concat(numbers.map(encode)));
  return {
    hex: toString(encoded, "hex"),
    bytes: encoded,
    values: numbers,
  };
});

fuzzyCasesTable.forEach((row) => {
  test(`fuzzy decodePack(0x${row.hex})`, () => {
    const encoded = encodePack(row.values);
    assert.equal(encoded, row.bytes);
    const decoded = decodePack(row.bytes);
    assert.equal(decoded, row.values);
  });
});

test.run();
