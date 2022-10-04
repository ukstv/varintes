import { test } from "uvu";
import * as assert from "uvu/assert";
import { encode } from "../encode.js";
import { decode } from "../decode.js";
import { randInt } from "./test-util.js";

test("fuzz test", () => {
  for (let i = 0, len = 100; i < len; ++i) {
    const original = randInt(0x7fffffff);
    const [encoded, encodedLength] = encode(original);
    const [decoded, decodedLength] = decode(encoded);
    assert.equal(decoded, original);
    assert.equal(decodedLength, encoded.length);
    assert.equal(encodedLength, encoded.length);
  }
});

test("big integers", () => {
  const bigs = [];
  for (let i = 32; i <= 53; i++) {
    bigs.push(Math.pow(2, i) - 1);
  }
  bigs.forEach((n) => {
    const [encoded] = encode(n);
    const [decoded] = decode(encoded);
    assert.equal(decoded, n);
    assert.not.equal(decoded, n - 1);
  });
});

test("fuzz test - big", () => {
  const MAX_SAFE = Number.MAX_SAFE_INTEGER;
  const MAX_INT = Math.pow(2, 31);

  for (let i = 0, len = 100; i < len; ++i) {
    const expected = randInt(MAX_SAFE - MAX_INT) + MAX_INT;
    const [encoded, encodedLength] = encode(expected);
    try {
      const [data, decodedLength] = decode(encoded);
      assert.equal(expected, data);
      assert.equal(decodedLength, encodedLength);
    } catch (e: any) {
      console.log("expected", expected);
      assert.unreachable(e);
    }
  }
});

test("buffer too short", function () {
  const [buffer, encodedLength] = encode(9812938912312);
  let l = encodedLength;
  while (l--) {
    assert.throws(() => {
      decode(buffer.slice(0, l));
    }, RangeError);
  }
});

test("buffer too long", () => {
  const buffer = Uint8Array.from(Array.from({ length: 150 }, () => 0xff).concat(Array.from({ length: 1 }, () => 0x1)));
  assert.throws(() => decode(buffer), RangeError);
});

test.run();
