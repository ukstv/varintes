import { encode } from "../encode.js";
import { decode } from "../decode.js";
import { encodingLength } from "../encoding-length.js";
import { randInt } from "./test-util";

test("fuzz test", () => {
  for (let i = 0, len = 100; i < len; ++i) {
    const original = randInt(0x7fffffff);
    const encoded = encode(original);
    const [decoded, length] = decode(encoded);
    expect(decoded).toEqual(original);
    expect(length).toEqual(encoded.length);
  }
});

test("big integers", () => {
  const bigs = [];
  for (let i = 32; i <= 53; i++) {
    bigs.push(Math.pow(2, i) - 1);
  }
  bigs.forEach((n) => {
    const encoded = encode(n);
    const [decoded] = decode(encoded);
    expect(decoded).toEqual(n);
    expect(decoded).not.toEqual(n - 1);
  });
});

test("fuzz test - big", () => {
  const MAX_SAFE = Number.MAX_SAFE_INTEGER;
  const MAX_INT = Math.pow(2, 31);

  for (let i = 0, len = 100; i < len; ++i) {
    const expected = randInt(MAX_SAFE - MAX_INT) + MAX_INT;
    const encoded = encode(expected);
    const [data, decodedLength] = decode(encoded);
    expect(expected).toEqual(data);
    expect(decodedLength).toEqual(encoded.byteLength);
  }
});

test("buffer too short", function () {
  const buffer = encode(9812938912312);
  let l = buffer.length;
  while (l--) {
    expect(() => {
      decode(buffer.slice(0, l));
    }).toThrow(RangeError);
  }
});

test("buffer too long", () => {
  const buffer = Uint8Array.from(Array.from({ length: 150 }, () => 0xff).concat(Array.from({ length: 1 }, () => 0x1)));
  expect(() => {
    decode(buffer);
  }).toThrow(RangeError);
});
